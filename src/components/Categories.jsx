import React from "react";
import { Button, FlexContainer } from "../assets/styled-components/global/style";
import food from "../assets/images/Fruits.png";
import travel from '../assets/images/World.png';
import movie from '../assets/images/movie.jpg';
import health from '../assets/images/Medical.png';
import education from '../assets/images/education.png';
import allImage from '../assets/images/ALL.png';
import useWindowSize from "./useWindowResize";
import { CategoryContainer } from "../assets/styled-components/CategoryContainer";

const Categories = ({ handleCategoryClick, categories, selectedCategory }) => {
    const isMobile = useWindowSize();
    return (
      <CategoryContainer>
      <FlexContainer gap="1.5rem" margin="1rem">
        <Button
          width="16%"
          height="10rem"
          borderRadius="1rem"
          fontSize="2rem"
          fontWeight="600"
          color="white"
          onClick={() => handleCategoryClick("All")}
          style={{
            backgroundImage: `url(${allImage})`,
            border: "All" === selectedCategory ? "0.3rem solid #73abff" : "none",
            minWidth:isMobile && '50%'
          }}
        >
          All
        </Button>
  
        {categories &&
          categories.map((category, index) => (
            <Button
              key={index}
              width="16%"
              height="10rem"
              borderRadius="1rem"
              fontSize="2rem"
              fontWeight="600"
              color="white"
              mobileWidth="35%"
              onClick={() => handleCategoryClick(category)}
              style={{
                backgroundImage: `linear-gradient(#00000099, #00000099),${
                    category === "Food"
                      ? `url(${food})`
                      : category === "Travel"
                      ? `url(${travel})`
                      : category === "Movies"
                      ? `url(${movie})`
                      : category === "Education"
                      ? `url(${education})`
                      : `url(${health})`
                  }`,
                border:
                  category === selectedCategory ? "0.3rem solid #73abff" : "none",
                minWidth:isMobile && '50%'
              }}
            >
            {category}
            </Button>
          ))}
      </FlexContainer>
      </CategoryContainer>
    );
  };
  
  export default Categories;
  