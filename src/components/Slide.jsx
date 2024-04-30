import React from "react";
import useWindowSize from "./useWindowResize";
import { SlideText, StyledSlide } from "../assets/styled-components/Slide";
import { Image, StyledText } from "../assets/styled-components/global/style";

const Slide = ({ slides, imgIndex }) => {
  const isMobile = useWindowSize();
  return (
    <StyledSlide>
      {slides && slides.map((slide, index) => (
        <div key={index}>
        <Image 
          width="100%"
          height="80vh"
          // style={{ display: index === imgIndex ? "block" : "none"}}
          src={slide?.imageUrl}
          alt={`Slide ${index}`}
        />
      <SlideText style={{ display: index === imgIndex ? "block" : "none" }} >
          <StyledText fontSize="18px">{slide?.heading}</StyledText>
          <StyledText>{slide?.description}</StyledText>
        </SlideText>
        </div>
      ))}
    </StyledSlide>
  );
};

export default Slide;
