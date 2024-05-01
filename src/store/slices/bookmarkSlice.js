import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiRequestHandler, toastHandler } from "./apiUtils";
import { backendUrl } from "../../axios/axiosInstance";

export const getBookmarks = createAsyncThunk(
  "getBookmarks",
  async (userId) => {
    try {
      const response = await apiRequestHandler(
        `${backendUrl}/user/bookmarks/${userId}`,
        "GET",
        {withCredentials:true}
      );
      return response.data.bookmarks;
    } catch (error) {
      throw error;
    }
  }
);

export const bookmarkStory = createAsyncThunk(
  "bookmarkStory",
  async ({ id, userId }) => {
    try {
      const response = await apiRequestHandler(
        `${backendUrl}/user/bookmark/${id}`,
        "POST",
        {userId},
        {withCredentials:true}
      );
      return response.data.story;
    } catch (error) {
      throw error;
    }
  }
);

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState: {
    bookmarksLoading: false,
    bookmarks: [],
    bookmarked: false,  
    storyLoading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBookmarks.pending, (state) => {
        state.bookmarksLoading = true;
      })
      .addCase(getBookmarks.fulfilled, (state, action) => {
        state.bookmarksLoading = false;
        state.bookmarks = action.payload;
      })
      .addCase(getBookmarks.rejected, (state, action) => {
        state.bookmarksLoading = false;
      })
      .addCase(bookmarkStory.pending, (state) => {
        state.storyLoading=true;
      })
      .addCase(bookmarkStory.fulfilled, (state, action) => {
        state.storyLoading = false;
        state.bookmarked = true;
      })
      .addCase(bookmarkStory.rejected, (state, action) => {
        state.storyLoading = false;
      });
  },
});

export default bookmarkSlice.reducer;
