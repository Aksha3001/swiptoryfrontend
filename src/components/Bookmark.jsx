import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import {
  FlexContainer,
  StyledText,
} from "../assets/styled-components/global/style";
import { getBookmarks } from "../store/slices/bookmarkSlice";
import StoryCard from "./StoryCard";
import useWindowSize from "./useWindowResize";

const Bookmark = () => {
  const isMobile = useWindowSize();
  const navigate = useNavigate();
  const { bookmarks, bookmarksLoading } = useSelector(
    (state) => state.bookmark
  );

  const { userId, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getBookmarks(userId));
    }
  }, [userId]);

  useEffect(() => {}, [bookmarks]);

  if (!isAuthenticated) {
    return <h1>Please Login to see your Bookmarks</h1>;
  }

  if (bookmarksLoading) {
    return <Loader />;
  }

  return (
    <div style={{ marginTop: "5rem", textAlign: "center" }}>
      <StyledText fontSize="22px" fontWeight="600">
        Your Bookmarks
      </StyledText>
      <FlexContainer direction={isMobile?"column":"row"} justify="center" align="center">
        {bookmarks?.map((bookmark, index) => (
          <StoryCard story={bookmark} key={bookmark._id} />
        ))}

        {bookmarks?.length === 0 ||
          (bookmarks === null && (
            <div>
              <StyledText>You have no bookmarks!</StyledText>
              <Button
                width="200px"
                height="2.5rem"
                border="1px solid black"
                onClick={() => navigate("/")}
              >
                Back To Home
              </Button>
            </div>
          ))}
      </FlexContainer>
    </div>
  );
};

export default Bookmark;
