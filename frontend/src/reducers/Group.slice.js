/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT } from "../common/config";

export const fetchAllGroups = createAsyncThunk(
    "group/fetchAllGroups",
    async() => {
        const config = {
            method: "get",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            url: `${API_ENDPOINT}/groups`,
        };
        const payload = await axios(config);
        return payload.data;
    }
);

export const createGroup = createAsyncThunk(
    "group/createGroup",
    async(data, { rejectWithValue }) => {
        try {
            const config = {
                method: "post",
                url: `${API_ENDPOINT}/groups`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
                data,
            };

            const payload = await axios(config);
            return payload.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateGroup = createAsyncThunk(
    "group/updateGroup",
    async(data, { rejectWithValue }) => {
        try {
            const config = {
                method: "put",
                url: `${API_ENDPOINT}/groups/${data.id}`,
                data: data.fields,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            };
            const payload = await axios(config);
            return payload.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteGroup = createAsyncThunk(
    "group/deleteGroup",
    async(id, { rejectWithValue }) => {
        try {
            const config = {
                method: "delete",
                url: `${API_ENDPOINT}/groups/${id}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            };
            const payload = await axios(config);
            return payload.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const fetchGroup = createAsyncThunk(
    "group/fetchGroup",
    async(id, { rejectWithValue }) => {
        try {
            const config = {
                method: "get",
                url: `${API_ENDPOINT}/groups/${id}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            };

            const payload = await axios(config);
            return payload.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const Group = createSlice({
    name: "Group",
    initialState: {
        groups: [],
        group: null,
        loading: false,
    },
    extraReducers: {
        [fetchAllGroups.fulfilled]: (state, action) => {
            state.groups = action.payload;
            state.loading = false;
        },
        [fetchAllGroups.pending]: (state) => {
            state.loading = true;
        },
        [fetchGroup.fulfilled]: (state, action) => {
            state.group = action.payload;
            state.loading = false;
        },
        [fetchGroup.pending]: (state) => {
            state.loading = true;
        },
    },
});

export default Group.reducer;

// Selectors
export const selectAllGroups = (state) => state.Group.groups;
export const selectGroup = (state) => state.Group.group;