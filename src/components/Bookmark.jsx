import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getBookmarks } from '../store/slices/bookmarkSlice';
import Loader from './Loader';
import { StyledText } from '../assets/styled-components/global/style';

const Bookmark = () => {
    const navigate = useNavigate();
    const { bookmarks ,bookmarksLoading} = useSelector((state) => state?.story);
    const { userId, isAuthenticated } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getBookmarks(userId));
    }, []);

    if(bookmarksLoading){
        return <Loader/>
      }
  return (
    <div style={{marginTop:"5rem",textAlign:"center"}}>
      <StyledText fontSize="22px" fontWeight="600">Your Bookmarks</StyledText>
      <div>
      {bookmarks?.map((bookmark, index) => (
            <Story story={bookmark} key={bookmark._id} />
          ))}

        {bookmarks?.length === 0 || bookmarks===null && (
          <div>
          <StyledText>You have no bookmarks!</StyledText>
          <Button width="200px" height="2.5rem" border="1px solid black" onClick={() => navigate("/")} > Back To Home</Button>
          </div>
            )}
      </div>
    </div>
  )
}

export default Bookmark
