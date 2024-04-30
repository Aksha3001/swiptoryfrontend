import React, { useEffect, useState } from "react";
import {
    Buttons,
  PrevButton,
  SlideContainer,
} from "../assets/styled-components/SlidesContainer";
import { Image } from "../assets/styled-components/global/style";
import arrow from "../assets/icons/arrow.png";
import useWindowSize from "./useWindowResize";
import Progress from "./Progress";
import Slide from "./Slide";
import reloadImg from "../assets/icons/reload.png";

const StorySlides = ({ slides }) => {
    const [reload, setReload] = useState(false);
    const isMobile = useWindowSize();
  
    const images = slides && slides.map((slide) => slide.imageUrl);
  
    const progress = images && images.map((_, index) => {
        return { id: index, progress: 0, image: images[index], completed: false };
      });
  
    const [progressBars, setProgressBars] = useState(progress);
    const [imgIndex, setImgIndex] = useState(0);
  
    let interval;
  
    useEffect(() => {
      interval = setInterval(() => {
        updateProgress(imgIndex);
      }, 50);
  
      return () => clearInterval(interval);
    }, [imgIndex, images]);
  
    const updateProgress = (barIndex) => {
      setProgressBars((prevProgressBars) => {
        const newProgressBars = [...prevProgressBars];
        newProgressBars[barIndex].progress += 0.5;
  
        if (newProgressBars[barIndex].progress >= 100) {
          newProgressBars[barIndex].progress = 0;
          newProgressBars[barIndex].completed = true;
  
          if (barIndex !== images.length - 1) {
            setImgIndex((prevIndex) => (prevIndex + 1) % images.length);
            newProgressBars[barIndex + 1].completed = false;
          } else {
            clearInterval(interval);
          }
        }
        return newProgressBars;
      });
    };
  
    const handleBtns = (value) => {
      setProgressBars(progress);
      progressBars[imgIndex].progress = 0;
  
      if (value === "next") {
        if (reload) {
          setImgIndex(0);
        }
        if (imgIndex === images.length - 1) {
          setReload(!reload);
        } else {
          setImgIndex((prevIndex) => (prevIndex + 1) % images.length);
        }
      } else {
        if (imgIndex === 0) {
          setImgIndex(0);
        } else {
          setImgIndex((prevIndex) => (prevIndex - 1) % images.length);
        }
      }
  
      updateProgress(imgIndex);
    };

  return (
    <SlideContainer>
      <Buttons>
        <PrevButton onClick={() => handleBtns("prev")}>
          <Image
            src={arrow}
            alt="<"
            style={{
              transform: "rotate(180deg)",
              width: isMobile ? "1rem" : "1.5rem",
            }}
          />
        </PrevButton>
        <PrevButton onClick={() => handleBtns("next")}>
        {reload ? (
            <Image src={reloadImg} alt="reload"/>
          ) : (
            <Image
              src={arrow}
              alt=">"
              style={{ width: isMobile ? "1rem" : "1.5rem" }}
            />
          )}
        </PrevButton>
      </Buttons>
      <Progress images={images} progressBars={progressBars} />
      <Slide slides={slides} imgIndex={imgIndex} />
    </SlideContainer>
  );
};

export default StorySlides;
