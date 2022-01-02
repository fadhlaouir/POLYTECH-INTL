import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT } from "../common/config";

export const fetchAlllevels = createAsyncThunk(
    "level/fetchAlllevels",
    async() => {
        const config = {
            method: "get",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            url: `${API_ENDPOINT}/levels`,
        };
        const payload = await axios(config);
        return payload.data;
    }
);

export const createLevel = createAsyncThunk(
    "level/createLevel",
    async(data, { rejectWithValue }) => {
        try {
            const config = {
                method: "post",
                url: `${API_ENDPOINT}/levels`,
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

export const updateLevel = createAsyncThunk(
    "level/updateLevel",
    async(data, { rejectWithValue }) => {
        try {
            const config = {
                method: "put",
                url: `${API_ENDPOINT}/levels/${data.id}`,
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

export const deleteLevel = createAsyncThunk(
    "level/deleteLevel",
    async(id, { rejectWithValue }) => {
        try {
            const config = {
                method: "delete",
                url: `${API_ENDPOINT}/levels/${id}`,
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

export const fetchLevel = createAsyncThunk(
    "level/fetchLevel",
    async(id, { rejectWithValue }) => {
        try {
            const config = {
                method: "get",
                url: `${API_ENDPOINT}/levels/${id}`,
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

const Level = createSlice({
    name: "Level",
    initialState: {
        levels: [],
        level: null,
        loading: false,
    },
    extraReducers: {
        [fetchAlllevels.fulfilled]: (state, action) => {
            state.levels = action.payload;
            state.loading = false;
        },
        [fetchAlllevels.pending]: (state) => {
            state.loading = true;
        },
        [fetchLevel.fulfilled]: (state, action) => {
            state.level = action.payload;
            state.loading = false;
        },
        [fetchLevel.pending]: (state) => {
            state.loading = true;
        },
    },
});

export default Level.reducer;

// Selectors
export const selectAlllevels = (state) => state.Level.levels;
export const selectlevel = (state) => state.Level.level;