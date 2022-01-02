/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT } from "../common/config";

export const fetchAllRooms = createAsyncThunk(
    "room/fetchAllRooms",
    async() => {
        const config = {
            method: "get",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            url: `${API_ENDPOINT}/rooms`,
        };
        const payload = await axios(config);
        return payload.data;
    }
);

export const createRoom = createAsyncThunk(
    "room/createRoom",
    async(data, { rejectWithValue }) => {
        try {
            const config = {
                method: "post",
                url: `${API_ENDPOINT}/rooms`,
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

export const updateRoom = createAsyncThunk(
    "room/updateRoom",
    async(data, { rejectWithValue }) => {
        try {
            const config = {
                method: "put",
                url: `${API_ENDPOINT}/rooms/${data.id}`,
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

export const deleteRoom = createAsyncThunk(
    "room/deleteRoom",
    async(id, { rejectWithValue }) => {
        try {
            const config = {
                method: "delete",
                url: `${API_ENDPOINT}/rooms/${id}`,
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

export const fetchRoom = createAsyncThunk(
    "room/fetchRoom",
    async(id, { rejectWithValue }) => {
        try {
            const config = {
                method: "get",
                url: `${API_ENDPOINT}/rooms/${id}`,
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

const Room = createSlice({
    name: "Room",
    initialState: {
        rooms: [],
        room: null,
        loading: false,
    },
    extraReducers: {
        [fetchAllRooms.fulfilled]: (state, action) => {
            state.rooms = action.payload;
            state.loading = false;
        },
        [fetchAllRooms.pending]: (state) => {
            state.loading = true;
        },
        [fetchRoom.fulfilled]: (state, action) => {
            state.room = action.payload;
            state.loading = false;
        },
        [fetchRoom.pending]: (state) => {
            state.loading = true;
        },
    },
});

export default Room.reducer;

// Selectors
export const selectAllRooms = (state) => state.Room.rooms;
export const selectRoom = (state) => state.Room.room;