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
          mobileImageWidth="100vw" 
          mobileImageHeight="100vh"
          // style={{ display: index === imgIndex ? "block" : "none"}}
          src={slide?.imageUrl}
          alt={`Slide ${index}`}
        />
      <SlideText style={{ display: index === imgIndex ? "block" : "none" }} >
          <StyledText fontSize="18px" fontWeight="600">{slide?.heading}</StyledText><br/>
          <StyledText fontWeight="600">{slide?.description}</StyledText>
        </SlideText>
        </div>
      ))}
    </StyledSlide>
  );
};

export default Slide;
