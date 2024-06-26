import React, { useContext, useEffect, useState } from "react";
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
import { createStory, getStories } from "../store/slices/storySlice";
import { colors } from "../assets/styled-components/global/theme";
import SlidesformFields from "./SlidesformFields";
import { ModalContext } from "../modalcontext/ModalProvider";

const StoryForm = () => {
  const dispatch = useDispatch();
  const { closeModal } = useContext(ModalContext);
  const { user } = useSelector((state) => state.auth);
  const isMobile = useWindowSize();
  const initialSlide = {
    heading: "",
    description: "",
    imageUrl: "",
    category: "",
  };

  const [slides, setSlides] = useState([
    initialSlide,
    initialSlide,
    initialSlide,
  ]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [error, setError] = useState("");

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

  useEffect(() => {
    if (slides.length < 3) {
      setError(`Please add at least 3 slides`);
    } else if (slides.length > 6) {
      setError(`Please remove slides`);
    } else {
      setError("");
    }
  }, [slides]);

  const handleValidate = (name, value) => {
    const validations = {
      category: "Please select a category",
      imageUrl: "Please add an image URL",
      description: "Please add a description",
      heading: "Please add a heading",
    };

    if (validations[name] && !value.trim()) {
      setError(validations[name]);
    } else {
      setError("");
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    handleValidate(name, value);
    const updatedSlides = [...slides];
    updatedSlides[index] = { ...updatedSlides[index], [name]: value };
    setSlides(updatedSlides);

    if (index > 0 && name === "category") {
      const firstCategory = updatedSlides[0].category;
      if (value !== firstCategory) {
        setError("Please select the same category for all slides");
        return;
      }
    }

    setSlides(updatedSlides);
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

    const firstCategory = slides[0].category;
    const hasDifferentCategory = slides.some(
      (slide) => slide.category !== firstCategory
    );

    if (hasDifferentCategory) {
      setError("Please select the same category for all slides");
      return;
    }
    
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
    const values = { slides, addedBy: user };
    dispatch(createStory(values));
    closeModal();
    dispatch(getStories());
  };

  const handleAddSlide = () => {
    if (slides.length < 6) {
      setSlides([...slides, initialSlide]);
      setCurrentSlide(slides.length);
    }
  };

  const handleRemoveSlide = (index) => {
    if (slides.length > 3) {
      const updatedSlides = slides.filter((_, i) => i !== index);
      setSlides(updatedSlides);
      setCurrentSlide(Math.min(index, updatedSlides.length - 1));
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
          <FlexContainer justify="space-between" align="center">
            <FlexContainer gap="0.5rem">
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
              Post
            </Button>
          </FlexContainer>
        </ButtonsContainer>
      )}
    </FlexContainer>
  );
};

export default StoryForm;
