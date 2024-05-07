import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiRequestHandler, toastHandler } from "./apiUtils";
import { backendUrl } from "../../axios/axiosInstance";
import axios from "axios";

export const register = createAsyncThunk(
  "registerUser",
  async (credentials) => {
    try {
      const response = await apiRequestHandler(
        `${backendUrl}/user/register`,
        "POST",
        credentials
      );
      toastHandler("User registered successfully!","success");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const login = createAsyncThunk("authLogin", async (credentials) => {
  try {
    const response = await apiRequestHandler(
      `${backendUrl}/user/login`,
      "POST",
      credentials
    );

    toastHandler("User logged in successfully!","success");
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const getUser = createAsyncThunk("getUser", async () => {
  const username = localStorage.getItem("username");
  try {
    const response = await apiRequestHandler(`${backendUrl}/user/getUser/${username}`,'GET',{withCredentials:false});
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const removeAuthUser = createAsyncThunk(
  "authLogout",
  async (_, { dispatch }) => {
    try {
      window.localStorage.clear();
      await axios.post("/api/user/logout");
      dispatch({ type: "RESET_STATE" });
    } catch (error) {
      toastHandler(error?.response?.data?.message,"error");
    }
  }
);

const authUserSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    isAuthenticated: false,
    username: null,
    token: null,
    userId: null,
  },
  reducers: {
    RESET_STATE: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.username = action.payload.username;
        localStorage.setItem("username",action.payload.username);
        state.token = action.payload.token;
        state.userId = action.payload.userId;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.username = null;
        state.token = null;
        state.userId = null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.username = action.payload.username;
        localStorage.setItem("username",action.payload.username);
        state.token = action.payload.token;
        state.userId = action.payload.userId;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.username = null;
        state.token = null;
        state.userId = null;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.username = action.payload.username;
        state.userId = action.payload.userId;
        state.user = action.payload.user;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.username = null;
        state.token = null;
      })
      .addCase(removeAuthUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeAuthUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.username = null;
        state.token = null;
      })
      .addCase(removeAuthUser.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default authUserSlice.reducer;
