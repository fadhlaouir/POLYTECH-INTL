/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT } from "../common/config";

export const login = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue }) => {
    try {
      const config = {
        method: "post",
        url: `${API_ENDPOINT}/auth/local`,
        data,
      };
      const payload = await axios(config);
      return payload.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchAllUsers = createAsyncThunk(
  "Users/fetchAllUsers",
  async () => {
    const config = {
      method: "get",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      url: `${API_ENDPOINT}/users`,
    };
    const payload = await axios(config);
    return payload.data;
  }
);

// Login Slice
const User = createSlice({
  name: "User",
  initialState: {
    user: null,
    users: [],
    authenticated: false,
    loading: false,
  },
  reducers: {
    logout(state) {
      state.user = null;
      localStorage.setItem("authenticated", false);
      localStorage.setItem("access_token", null);
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem("authenticated", true);
      localStorage.setItem("access_token", action.payload.jwt);
    },
    [fetchAllUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.loading = false;
    },
    [fetchAllUsers.pending]: (state) => {
      state.loading = true;
    },
  },
});

export default User.reducer;

// Selectors
export const selectUser = (state) => state.User.user;
export const selectAllUser = (state) => state.User.users;
export const selectAll = (state) => state;
