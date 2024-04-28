import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiRequestHandler, toastHandler } from "./apiUtils";
import { backendUrl } from "../../axios/axiosInstance";

export const likeStory = createAsyncThunk(
  "likeStory",
  async ({ id, userId }) => {
    try {
      const response = await apiRequestHandler(
        `${backendUrl}/story/like/${id}`,
        "PUT",
        userId
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const likeSlice = createSlice({
  name: "like",
  initialState: {
    liked: false,
    totalLikes: 0,
    newLike: false,
    storyLoading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(likeStory.pending, (state) => {
        state.storyLoading = true;
        state.newLike = false;
      })
      .addCase(likeStory.fulfilled, (state, action) => {
        state.storyLoading = false;
        state.liked = true;
        state.newLike = true;
      })
      .addCase(likeStory.rejected, (state) => {
        state.storyLoading = false;
        state.newLike = false;
      });
  },
});

export default likeSlice.reducer;
