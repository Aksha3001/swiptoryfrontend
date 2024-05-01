import React, { useEffect } from "react";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStoriesByUser } from "../store/slices/storySlice";
import { Button, FlexContainer, StyledText } from "../assets/styled-components/global/style";
import StoryCard from "./StoryCard";
import { StyleSheetManager } from "styled-components";

const DisplayStory = () => {
  const navigate = useNavigate();
  const { userStories, storiesLoading } = useSelector((state) => state.story);
  const { userId, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStoriesByUser(userId));
  }, []);

  if (!isAuthenticated) {
    return <StyledText>Please Login to see your Stories</StyledText>;
  }

  if (storiesLoading) {
    return <Loader />;
  }

  return (
   <StyleSheetManager
   shouldForwardProp={(prop) =>
    ![
      "fontSize",
      "fontWeight",
      "color",
      "mobileFontSize",
      "mobileWidth",
      "mobileHeight",
      "backgroundColor",
      "borderRadius",
      "justify",
      "padding",
      "align",
      "border"
    ].includes(prop)}
   >
     <div style={{textAlign:"center",marginTop:"4rem"}}>
      <StyledText fontSize="22px" fontWeight="600">Your Stories</StyledText>
      <div>
        {userStories &&
          userStories.map((story) => (
            <StoryCard story={story} key={story._id} />
          ))}

        {userStories?.length === 0 && (
          <FlexContainer direction="column" align="center" gap="0.5rem">
            <StyledText>You have not added any stories yet!</StyledText>
            <Button width="200px" height="2rem" border="1px solid black" borderRadius="10px" onClick={() => navigate("/")}>Back to Home</Button>
          </FlexContainer>
        )}
      </div>
    </div>
   </StyleSheetManager>
  );
};

export default DisplayStory;
