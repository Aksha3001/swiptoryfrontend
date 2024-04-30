import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getBookmarks } from '../store/slices/bookmarkSlice';
import Loader from './Loader';

const Bookmark = () => {
    const navigate = useNavigate();
    const { bookmarks ,bookmarksLoading} = useSelector((state) => state.story);
    const { userId, isAuthenticated } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getBookmarks(userId));
    }, []);

    if(bookmarksLoading){
        return <Loader/>
      }
  return (
    <div>
      
    </div>
  )
}

export default Bookmark
