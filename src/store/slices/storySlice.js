import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiRequestHandler } from "./apiUtils";
import { backendUrl } from "../../axios/axiosInstance";

export const createStory = createAsyncThunk("story/add", async (values) => {
  try {
    const response = await apiRequestHandler(
      `${backendUrl}/story/create`,
      "POST",
      values,
      {withCredentials:true}
    );
    toast.success("Story created successfully","success");
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const updateStory = createAsyncThunk("story/update", async ({ slides,
    addedBy}) => {
  try {
    const response = await apiRequestHandler(
      `${backendUrl}/story/updateStory/${story._id}`,
      "PUT",
    { slides,
      addedBy},
      {withCredentials:true}
    );
    toast.success("Story updated successfully","success");
    return response.data;
  } catch (error) {
    throw error;
  }
});


export const getStories = createAsyncThunk(
  "getallstories",
  async ({ page, catLimit, cat }) => {
    try {
      if (page === null) {
        page = 1;
      }
      if (catLimit === null) {
        catLimit = 4;
      }
      if (cat === null) {
        cat = "All";
      }
      const response = await apiRequestHandler(
        `${backendUrl}/story/getAllStories?category=All&page=${page}&catLimit=${catLimit}&cat=${cat}`,
        "GET",
        {withCredentials:false}
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getStory = createAsyncThunk(
    "getStory",
    async ({ storyId, userId }) => {
      try {
        if (userId === null || userId === undefined) {
            const response = await apiRequestHandler(
                `${backendUrl}/story/getStoryById/${storyId}`,
                "GET",
                {withCredentials:false}
              );
              return response.data;
        }
        else {
        const response = await apiRequestHandler(
          `${backendUrl}/story/getStoryById/${storyId}?userId=${userId}`,
          "GET",
          {withCredentials:true}
        );
        return response.data;
    }
      } catch (error) {
        throw error;
      }
    }
  );

export const getStoriesByUser = createAsyncThunk(
    "getStoriesByUser",
    async ({ userId, userStoriesPage }) => {
      try {
        if (userStoriesPage === null) {
            userStoriesPage = 1;
          }
        const response = await apiRequestHandler(
          `${backendUrl}/story/getAllStories?userId=${userId}&page=${userStoriesPage}`,
          "GET",
          false
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  );

export const getStoriesByCategory = createAsyncThunk(
    "getStoriesByCategory",
    async ({category, page}) => {
      try {
        if (page === null) {
            page = 1;
          }
        const response = await apiRequestHandler(
          `${backendUrl}/story/getAllStories?category=${category}&page=${page}`,
          "GET",
           false
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  );


const storySlice = createSlice({
  name: "story",
  initialState: {
    storyLoading: false,
    storiesLoading: false,
    categoryLoading: false,
    stories: [],
    categoryStories: [],
    userStories: null,
    story: null,
    newStory: false,
    page: 1,
    userStoriesPage: 1,
  },
  reducers: {
    RESET_STATE: () => initialState,
    endRequest: (state) => {
        state.newStory = false;
        state.newLike = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createStory.pending, (state) => {
        state.storiesLoading = true;
        state.newStory = false;
      })
      .addCase(createStory.fulfilled, (state, action) => {
        state.storiesLoading = false;
        state.newStory = true;
      })
      .addCase(createStory.rejected, (state, action) => {
        state.storiesLoading = false;
        state.newStory = false;
      })
      .addCase(updateStory.pending, (state) => {
        state.storiesLoading = true;
        state.newStory = false;
      })
      .addCase(updateStory.fulfilled, (state, action) => {
        state.storiesLoading = false;
        state.newStory = true;
      })
      .addCase(updateStory.rejected, (state, action) => {
        state.storiesLoading = false;
        state.newStory = false;
      })
      .addCase(getStories.pending, (state) => {
        state.storiesLoading = true;
      })
      .addCase(getStories.fulfilled, (state, action) => {
        state.storiesLoading = false;
        state.stories = action.payload.stories;
        state.page = action.payload.page;
      })
      .addCase(getStories.rejected, (state, action) => {
        state.storiesLoading = false;
      })
      .addCase(getStory.pending, (state) => {
        state.storyLoading = true;
     })
      .addCase(getStory.fulfilled, (state, action) => {
        state.storyLoading = false;
        state.story = action.payload.story;
        state.liked = action.payload.liked;
        state.totalLikes = action.payload.totalLikes;
        state.bookmarked = action.payload.bookmarked;
      })
      .addCase(getStory.rejected, (state, action) => {
        state.storyLoading = false;
      })
      .addCase(getStoriesByUser.pending, (state) => {
        state.storiesLoading = true;
     })
      .addCase(getStoriesByUser.fulfilled, (state, action) => {
        state.storiesLoading = false;
        state.userStories = action.payload.stories;
        state.userStoriesPage = action.payload.page;
      })
      .addCase(getStoriesByUser.rejected, (state, action) => {
        state.storiesLoading = false;
      })
      .addCase(getStoriesByCategory.pending, (state) => {
        state.categoryLoading = true;
     })
      .addCase(getStoriesByCategory.fulfilled, (state, action) => {
        state.categoryLoading = false;
        state.categoryStories = action.payload.stories;
        state.page = action.payload.page;
      })
      .addCase(getStoriesByCategory.rejected, (state, action) => {
        state.categoryLoading = false;
      })
  },
});

export default storySlice.reducer;
