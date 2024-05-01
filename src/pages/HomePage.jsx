import React, { useEffect, useState } from 'react';
import { HomePageContainer } from '../assets/styled-components/HomePageContainer';
import { StyleSheetManager } from 'styled-components';
import Categories from '../components/Categories';
import { Image } from '../assets/styled-components/global/style';
import loading from '../assets/images/loading.gif';
import { useDispatch, useSelector } from 'react-redux';
import { getStories, getStoriesByCategory, getStoriesByUser } from '../store/slices/storySlice';
import { categories } from '../constants';
import Stories from '../components/Stories';

const HomePage = () => {
  const dispatch = useDispatch();

  const { userId } = useSelector((state) => state.auth);
   const [category, setCategory] = useState("All");
  const { storiesLoading , categoryLoading, newStory, userStoriesPage} = useSelector((state) => state.story);
  const {newLike} = useSelector((state)=>state.like);
   useEffect(() => {
    if(category!=='All'){
      dispatch(getStoriesByCategory({category,page:1}));
    }
    else{
      dispatch(getStories(1));
    }  }, [category]);

    useEffect(() => {
      if (newStory) {
        dispatch(getStories(1));  
        dispatch(getStoriesByUser(userId, userStoriesPage));
      }
    }, [newStory]);
    
    useEffect(() => {
      if(newLike){
        dispatch(endRequest());
      }
    }, [newLike]);
  
  const handleCategoryClick = (category) => {
    setCategory(category);
  };
  return(
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
      ].includes(prop)
    }>
    <HomePageContainer>

      <Categories 
              categories={categories}
              handleCategoryClick={handleCategoryClick}
              selectedCategory={category}
      />
      {!storiesLoading && <Stories category={category} />} 
      {storiesLoading && categoryLoading && <Image height="200px" width="200px" src={loading} alt="Loading"/>}
    </HomePageContainer>
    </StyleSheetManager>
  )
}

export default HomePage
