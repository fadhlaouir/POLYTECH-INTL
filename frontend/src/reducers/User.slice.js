/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ENDPOINT } from '../common/config';



// Create a new incubation measurment
export const login = createAsyncThunk(
    'user/login',
    async(data, { rejectWithValue }) => {
        try {
            const config = {
                method: 'post',
                url: `${API_ENDPOINT}/auth/local`,
                data,
            };
            const payload = await axios(config);
            return payload.data;
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    },
);

// Login Slice
const User = createSlice({
    name: 'User',
    initialState: {
        user: null,
        authenticated: false,
    },
    reducers: {
        logout(state) {
            state.user = null;
            localStorage.setItem('authenticated', false);
            localStorage.setItem('access_token', null);
        },
    },
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            state.user = action.payload.user;
            localStorage.setItem('authenticated', true);
            localStorage.setItem('access_token', action.payload.jwt)
        }
    },
});

export default User.reducer

// Selectors
export const selectUser = (state) => state.User.user;
export const selectAll = (state) => state