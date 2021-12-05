/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { API_ENDPOINT } from "../common/config";
/**
 * Helper for the redundant initial state
 */
const getInitialState = () => ({ user: null, roles: [], loadig: false });

/**
 * Creates a login session
 */
export const $login = createAsyncThunk("Session/login", async (data) => {
  const request = {
    method: "post",
    url: `${API_ENDPOINT}/auth/local`,
    data,
  };
  const payload = await axios(request);
  return payload.data;
});

// Session Slice
const Session = createSlice({
  name: "Session",
  initialState: getInitialState(),
  reducers: {
    $logout() {
      const stateUpdate = getInitialState();
      localStorage.removeItem("access_token");
      return stateUpdate;
    },
  },
  extraReducers: {
    // Login ($login)
    [$login.fulfilled]: (state, action) => {
      const stateUpdate = { ...state };
      const { jwt, ...userData } = action.payload;
      // Persist auth token
      localStorage.setItem("access_token", jwt);
      stateUpdate.user = userData.user;
      stateUpdate.loading = false;
      return stateUpdate;
    },
    [$login.pending]: (state) => {
      const stateUpdate = { ...state };
      stateUpdate.loading = true;
      return stateUpdate;
    },
    [$login.rejected]: (state) => {
      const stateUpdate = { ...state };
      stateUpdate.loading = false;
      return stateUpdate;
    },
  },
});

export default Session.reducer;

// Simple actions
export const { $logout } = Session.actions;

// Selectors
export const selectSessionUser = (state) => state.Session.user;
export const selectSessionRoles = (state) => state.Session.roles;
export const selectSessionLoading = (state) => state.Session.loading;
