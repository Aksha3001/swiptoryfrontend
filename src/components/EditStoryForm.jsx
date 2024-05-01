import React, { useEffect, useState } from "react";
import useWindowSize from "./useWindowResize";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  FlexContainer,
  StyledText,
} from "../assets/styled-components/global/style";
import {
  ButtonsContainer,
  SlideBox,
} from "../assets/styled-components/StoryForm";
import { updateStory } from "../store/slices/storySlice";
import { colors } from "../assets/styled-components/global/theme";
import SlidesformFields from "./SlidesformFields";
import Loader from "./Loader";

const EditStoryForm = () => {
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.auth);
  const { story, storyLoading } = useSelector((state) => state.story);
  const initialSlide = story?.slides ? story.slides : [{}, {}, {}];
  const [slides, setSlides] = useState(initialSlide);
  const isMobile = useWindowSize();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!storyLoading) {
      setSlides(story.slides);
    }
  }, [storyLoading]);

  useEffect(() => {
    setCurrentSlide(currentSlide);
  }, [currentSlide]);

  useEffect(() => {
    if (slides.length > 6) {
      alert("Please remove slides");
    }
    if (slides.length < 3) {
      alert("Please add slides");
    }
  }, [slides]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setSlides((prevSlides) =>
      prevSlides.map((slide, i) =>
        i === index ? { ...slide, [name]: value } : slide
      )
    );
  };

  const handleSubmit = async () => {
    const isValid = slides.some((slide, index) => {
      if (
        Object.keys(slide).length === 0 ||
        slide.heading?.trim() === "" ||
        slide.description?.trim() === "" ||
        slide.imageUrl?.trim() === "" ||
        slide.category?.trim() === ""
      ) {
        setError(slide, index);
      }
      return (
        Object.keys(slide).length === 0 ||
        slide.heading?.trim() === "" ||
        slide.description?.trim() === "" ||
        slide.imageUrl?.trim() === "" ||
        slide.category?.trim() === ""
      );
    });

    if (isValid) {
      setError("Please fill out all fields");
      return;
    }
    if (slides.length < 3) {
      setError(`Please add at least 3 slides`);
      return;
    } else if (slides.length > 6) {
      setError("Please remove slides");
      return;
    }
    const values = { slides, addedBy: username };
    await dispatch(updateStory(values));
  };

  const handleAddSlide = () => {
    if (slides.length < 6) {
      setSlides((prevSlides) => [...prevSlides, {}]);
      setCurrentSlide(slides.length);
    }
  };

  const handleRemoveSlide = (index) => {
    if (slides.length > 3) {
      setSlides((prevSlides) => prevSlides.filter((_, i) => i !== index));
      index > 0 && setCurrentSlide(index - 1);
    }
  };

  const handlePrevClick = () => {
    setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : 0);
  };

  const handleNextClick = () => {
    setCurrentSlide(
      currentSlide < slides.length - 1 ? currentSlide + 1 : slides.length - 1
    );
  };

  if (storyLoading) {
    return <Loader />;
  }

  return (
    <FlexContainer direction={isMobile && "column"}>
      <FlexContainer
        direction={isMobile ? "row" : "column"}
        align="center"
        gap="1rem"
        padding={isMobile ? "0 1.5rem 0 0" : "1rem"}
      >
        <FlexContainer
          direction={isMobile ? "column" : "row"}
          justify="center"
          align="center"
          gap="1rem"
        >
          {console.log(isMobile)}
          {slides.map((slide, index) => (
            <SlideBox
              key={index}
              onClick={() => setCurrentSlide(index)}
              style={{
                border: currentSlide === index ? "2px solid #73ABFF" : "none",
              }}
            >
              slide {index + 1}
            </SlideBox>
          ))}
          <SlideBox onClick={handleAddSlide}>Add +</SlideBox>
        </FlexContainer>
        <div>
          {slides.map((slide, slideIndex) => (
            <>
              {slideIndex === currentSlide && (
                <SlidesformFields
                  key={slideIndex}
                  slide={slide}
                  slideIndex={slideIndex}
                  handleChange={(e) => handleChange(e, slideIndex)}
                  handleRemoveSlide={() => handleRemoveSlide(slideIndex)}
                />
              )}
            </>
          ))}
        </div>
        <StyledText color="red">{error}</StyledText>
        {!isMobile && (
          <ButtonsContainer>
            <FlexContainer justify="space-between" align="center">
              <FlexContainer gap="1rem">
                <Button
                  width="100px"
                  height="2rem"
                  borderRadius="10px"
                  backgroundColor={colors.previous}
                  onClick={handlePrevClick}
                >
                  Previous
                </Button>
                <Button
                  width="100px"
                  height="2rem"
                  borderRadius="10px"
                  backgroundColor={colors.next}
                  onClick={handleNextClick}
                >
                  Next
                </Button>
                {slides.length > 3 && (
                  <Button
                    width="100px"
                    height="2rem"
                    borderRadius="10px"
                    backgroundColor={colors.remove}
                    onClick={() => handleRemoveSlide(currentSlide)}
                  >
                    Remove
                  </Button>
                )}
              </FlexContainer>
              <Button
                width="100px"
                height="2rem"
                borderRadius="10px"
                backgroundColor={colors.seemoreandregister}
                onClick={handleSubmit}
              >
                Post
              </Button>
            </FlexContainer>
          </ButtonsContainer>
        )}
      </FlexContainer>
      {isMobile && (
        <ButtonsContainer>
          <FlexContainer justify="space-between" align="center" gap="0.2rem" >
            <FlexContainer gap="0.2rem">
              <Button
                width="60px"
                height="2rem"
                borderRadius="10px"
                mobileFontSize="14px"
                backgroundColor={colors.previous}
                onClick={handlePrevClick}
              >
                Previous
              </Button>
              <Button
                width="60px"
                height="2rem"
                borderRadius="10px"
                mobileFontSize="14px"
                backgroundColor={colors.next}
                onClick={handleNextClick}
              >
                Next
              </Button>
              {slides.length > 3 && (
                <Button
                  width="60px"
                  height="2rem"
                  borderRadius="10px"
                  mobileFontSize="14px"
                  backgroundColor={colors.remove}
                  onClick={() => handleRemoveSlide(currentSlide)}
                >
                  Remove
                </Button>
              )}
            </FlexContainer>
            <Button
              width="60px"
              height="2rem"
              borderRadius="10px"
              mobileFontSize="14px"
              backgroundColor={colors.seemoreandregister}
              onClick={handleSubmit}
            >
              Update
            </Button>
          </FlexContainer>
        </ButtonsContainer>
      )}
    </FlexContainer>
  );
};

export default EditStoryForm;
