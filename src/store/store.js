import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authUserReducer from './slices/authSlice';
import storyReducer from './slices/storySlice';
import bookmarkReducer from './slices/bookmarkSlice';
import likeReducer from './slices/likeSlice';

const rootReducer = combineReducers({
  auth: authUserReducer,
  story: storyReducer,
  bookmark: bookmarkReducer,
  like: likeReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export default store;
