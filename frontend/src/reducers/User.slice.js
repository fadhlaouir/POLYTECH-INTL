/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT } from "../common/config";

export const login = createAsyncThunk(
    "user/login",
    async(data, { rejectWithValue }) => {
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
    "user/fetchAllUsers",
    async() => {
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

export const createUser = createAsyncThunk(
    "user/createUser",
    async(data, { rejectWithValue }) => {
        try {
            const config = {
                method: "post",
                url: `${API_ENDPOINT}/users`,
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

export const updateUSer = createAsyncThunk(
    "user/updateUSer",
    async(data, { rejectWithValue }) => {
        try {
            const config = {
                method: "put",
                url: `${API_ENDPOINT}/users/${data.id}`,
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

export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async(id, { rejectWithValue }) => {
        try {
            const config = {
                method: "delete",
                url: `${API_ENDPOINT}/users/${id}`,
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

export const fetchUser = createAsyncThunk(
    "user/fetchUser",
    async(id, { rejectWithValue }) => {
        try {
            const config = {
                method: "get",
                url: `${API_ENDPOINT}/users/${id}`,
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
export const selectAll = (state) => state;
export const selectAllUser = (state) => state.User.users;
export const selectUser = (state) => state.User.user;