import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT } from "../common/config";

export const fetchAllEvents = createAsyncThunk(
    "event/fetchAllEvents",
    async(id, { rejectWithValue }) => {
        try {
            const config = {
                method: "get",
                url: `${API_ENDPOINT}/events`,
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

export const createEvent = createAsyncThunk(
    "event/createEvent",
    async(data, { rejectWithValue }) => {
        try {
            const config = {
                method: "post",
                url: `${API_ENDPOINT}/events`,
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

export const updateEvent = createAsyncThunk(
    "event/updateEvent",
    async(data, { rejectWithValue }) => {
        try {
            const config = {
                method: "put",
                url: `${API_ENDPOINT}/events/${data.id}`,
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

export const deleteEvent = createAsyncThunk(
    "event/deleteEvent",
    async(id, { rejectWithValue }) => {
        try {
            const config = {
                method: "delete",
                url: `${API_ENDPOINT}/events/${id}`,
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

export const fetchEvent = createAsyncThunk(
    "event/fetchEvent",
    async(id, { rejectWithValue }) => {
        try {
            const config = {
                method: "get",
                url: `${API_ENDPOINT}/events/${id}`,
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

const Event = createSlice({
    name: "Event",
    initialState: {
        events: [],
        event: null,
        loading: false,
    },
    extraReducers: {
        [fetchAllEvents.fulfilled]: (state, action) => {
            state.events = action.payload;
            state.loading = false;
        },
        [fetchAllEvents.pending]: (state) => {
            state.loading = true;
        },
        [fetchEvent.fulfilled]: (state, action) => {
            state.event = action.payload;
            state.loading = false;
        },
        [fetchEvent.pending]: (state) => {
            state.loading = true;
        },
    },
});

export default Event.reducer;

// Selectors
export const selectAllEvents = (state) => state.Event.events;
export const selectEvent = (state) => state.Event.event;