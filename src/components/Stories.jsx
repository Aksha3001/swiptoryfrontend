import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useWindowSize from "./useWindowResize";
import {
  getStories,
  getStoriesByCategory,
  getStoriesByUser,
} from "../store/slices/storySlice";
import { Button, StyledText } from "../assets/styled-components/global/style";
import { Container, StoriesContainer } from "../assets/styled-components/StoriesContainer";
import StoryCard from "./StoryCard";
import { colors } from "../assets/styled-components/global/theme";
import Loader from "./Loader";

const Stories = ({ category }) => {
  const dispatch = useDispatch();
  const {
    stories,
    categoryStories,
    userStories,
    newStory,
    userStoriesPage,
    categoryLoading,
    storiesLoading,
  } = useSelector((state) => state.story);
  const isMobile = useWindowSize();
  let catLimit = {
    food: 4,
    travel: 4,
    health: 4,
    movie: 4,
    education: 4,
  };
  const { userId, isAuthenticated } = useSelector((state) => state.auth);
  const page = useSelector((state) => state.story.page) || 1;

  useEffect(() => {
    if (!stories && category === "All") {
      dispatch(getStories({page}));
    }
    if (!stories && category !== "All") {
      dispatch(getStoriesByCategory({category,page}));
    }
  }, [category]);

  useEffect(() => {
    if (newStory) {
      dispatch(getStories({page}));
    }
  }, [newStory, page, stories]);

  useEffect(() => {
    if (isAuthenticated && !userStories && userId) {
      dispatch(getStoriesByUser({userId, userStoriesPage}));
    }
  }, [isAuthenticated, userId, userStories, userStoriesPage]);

  const renderStories = (storyArray, isLoading, pageFunction) => (
    <div style={{marginTop:"1rem"}}>
      <StoriesContainer ismobile={isMobile}>
        {storyArray &&
          storyArray.map((story) =>
            isLoading ? (
              <Loader key={story._id} />
            ) : (
              <StoryCard key={story._id} story={story} />
            )
          )}
      </StoriesContainer>
      {storyArray && storyArray.length > 0 && (
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Button width="100px" height="2rem" backgroundColor={colors.seemoreandregister} borderRadius="10px" fontWeight="600" onClick={pageFunction} >See more</Button>
        </div>
      )}
    </div>
  );

  const renderUserStories = () => (
    <>
      {userStories && userStories.length > 0 && (
        <StyledText fontSize="22px" fontWeight="600">
          Your Stories
        </StyledText>
      )}
      {renderStories(userStories, false, () =>
        dispatch(getStoriesByUser({userId, userStoriesPage:userStoriesPage + 1}))
      )}
    </>
  );
  return (
    <Container>
      {category === "All" && (
        <>
          {isAuthenticated && renderUserStories()}
          <>
            {Object.keys(stories).map(
              (key) =>
                stories[key].length > 0 && (
                  <div key={key} style={{textAlign:"center"}}>
                    <StyledText fontSize="22px" fontWeight="600">
                      Top Stories About {key}
                    </StyledText>
                    {renderStories(stories[key], storiesLoading, () =>
                      Object.keys(catLimit).forEach((cat) => {
                        if (cat === key) {
                          catLimit[cat] = catLimit[cat] + 4;
                          dispatch(getStories({page:page + 1, catLimit:catLimit[cat],cat}));
                        }
                      })
                    )}
                  </div>
                )
            )}
          </>
        </>
      )}

      {category !== "All" && (
        <div style={{textAlign:"center", marginTop:isMobile?"4rem":"0rem"}}>
          <StyledText fontSize="22px" fontWeight="600">
            Top Stories About {category}
          </StyledText>
          {renderStories(categoryStories, categoryLoading, () =>
            dispatch(getStoriesByCategory({category,page:page + 1}))
          )}
          {categoryStories.length <= 0 && (
            <StyledText fontSize="18px" fontWeight="500">No stories found!</StyledText>
          )}
        </div>
      )}
    </Container>
  );
};

export default Stories;
