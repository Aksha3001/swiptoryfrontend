import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BottomStoryButtons, InlineFlex, StoryButtons, StoryModalContainer, ViewStory } from "../assets/styled-components/StoryModal";
import shareIcon from "../assets/icons/share.svg";
import { Button, FlexContainer, Image, StyledText } from "../assets/styled-components/global/style";
import StorySlides from "./StorySlides";
import Loader from "./Loader";
import { getStory } from "../store/slices/storySlice";
import { likeStory } from "../store/slices/likeSlice";
import { bookmarkStory } from "../store/slices/bookmarkSlice";
import { toast } from "react-toastify";

const StoryModal = () => {
  const dispatch = useDispatch();
  const { story, storyLoading, liked, bookmarked, totalLikes, newLike } =
    useSelector((state) => state.story);

  const { isAuthenticated, userId, loading } = useSelector(
    (state) => state.auth
  );

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      handleFetchStory();
    }
  }, [isAuthenticated,loading]);

  const handleFetchStory = async () => {
        dispatch(getStory({storyId:id, userId}));
  };

  const handleLike = () => {
    if (!isAuthenticated) {
      navigate("/");
    } else {
      dispatch(likeStory({storyId:id, userId}));
    }
  };

  const handleBookmark = () => {
    if (!isAuthenticated) {
      navigate("/");
    } else {
      dispatch(bookmarkStory({storyId:id, userId}));
    }
  };

  const handleShareStory = () => {
    const url = window.location.href;
    window.navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("Copied to clipboard successfully!");
      })
      .catch((error) => {
        alert(error);
        toast.error("Failed to copy to clipboard:");
      });
  };

  if (storyLoading || loading) {
    return <Loader />;
  }

  return (
    <StoryModalContainer>
      {/* <ToastContainer/> */}
      <ViewStory>
        <StoryButtons>
          <InlineFlex>            
          <div onClick={() => navigate("/")}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 17L-1 -1M17 -1L-1 17"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          {/* -------------------------- SHARE ICON ------------------------------------- */}

          <div onClick={handleShareStory}>
            <Image src={shareIcon} alt="share" />
          </div>
          
          </InlineFlex>
        </StoryButtons>

        {/* ------------------------------------------- | STORY IMAGE SLIDER | ------------------------------------------- */}

        <StorySlides slides={story && story.slides} />

        {/* -------------------------------------------------------------------------------------------------------------- */}

        <BottomStoryButtons>
          <InlineFlex>
          {/* --------------------------BOOKMARK ICON -------------------------- */}
          <div>
            <svg
              onClick={() => handleBookmark()}
              width="20"
              height="25"
              viewBox="0 0 20 25"
              fill={bookmarked ? "blue" : "white"}
              xmlns="http://www.w3.org/2000/svg"
              key={bookmarked ? "bookmarked" : "not-bookmarked"}
            >
              <path
                d="M19.1795 24.5071L9.58974 17.3148L0 24.5071V0H19.1795V24.5071Z"
                fill={bookmarked ? "blue" : "white"}
              />
            </svg>
          </div>
          
          <FlexContainer align="center">
            <svg
              onClick={() => handleLike()}
              width="36"
              height="27"
              viewBox="0 0 36 27"
              fill={liked ? "red" : "white"}
              xmlns="http://www.w3.org/2000/svg"
              key={liked ? "liked" : "not-liked"}
            >
              <path
                d="M14.207 26.0699L12.147 24.1946C4.83039 17.5599 0 13.1699 0 7.81387C0 3.42389 3.4381 0 7.81386 0C10.2859 0 12.6585 1.15077 14.207 2.95506C15.7556 1.15077 18.1282 0 20.6002 0C24.976 0 28.4141 3.42389 28.4141 7.81387C28.4141 13.1699 23.5837 17.5599 16.267 24.1946L14.207 26.0699Z"
                fill={liked ? "red" : "white"}
              />
            </svg>
            <StyledText>
              {story && console.log(story.likes.length)}
              {totalLikes + (newLike ? 1 : 0)}
            </StyledText>
          </FlexContainer>
          </InlineFlex>
        </BottomStoryButtons>
      </ViewStory>
    </StoryModalContainer>
  );
};

export default StoryModal;
