/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT } from "../common/config";

export const fetchLevels = createAsyncThunk("level/fetchLevels", async () => {
  const config = {
    method: "get",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    url: `${API_ENDPOINT}/levels`,
  };
  const payload = await axios(config);
  return payload.data;
});

export const fetchGroups = createAsyncThunk("level/fetchGroups", async () => {
  const config = {
    method: "get",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    url: `${API_ENDPOINT}/groups`,
  };
  const payload = await axios(config);
  return payload.data;
});

const Level = createSlice({
  name: "Level",
  initialState: {
    levels: [],
    groups: [],
    loading: false,
  },
  extraReducers: {
    [fetchLevels.fulfilled]: (state, action) => {
      state.levels = action.payload;
      state.loading = false;
    },
    [fetchLevels.pending]: (state) => {
      state.loading = true;
    },
    [fetchGroups.fulfilled]: (state, action) => {
      state.groups = action.payload;
      state.loading = false;
    },
    [fetchGroups.pending]: (state) => {
      state.loading = true;
    },
  },
});

export default Level.reducer;

// Selectors
export const selectLevels = (state) => state.Level.levels;
export const selectGroups = (state) => state.Level.groups;
