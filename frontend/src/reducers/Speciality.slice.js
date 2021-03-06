import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT } from "../common/config";

export const fetchAllSpecialities = createAsyncThunk(
    "speciality/fetchAllSpecialities",
    async() => {
        const config = {
            method: "get",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            url: `${API_ENDPOINT}/specialities`,
        };
        const payload = await axios(config);
        return payload.data;
    }
);

export const createSpeciality = createAsyncThunk(
    "speciality/createSpeciality",
    async(data, { rejectWithValue }) => {
        try {
            const config = {
                method: "post",
                url: `${API_ENDPOINT}/specialities`,
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

export const updateSpeciality = createAsyncThunk(
    "speciality/updateSpeciality",
    async(data, { rejectWithValue }) => {
        try {
            const config = {
                method: "put",
                url: `${API_ENDPOINT}/specialities/${data.id}`,
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

export const deleteSpeciality = createAsyncThunk(
    "speciality/deleteSpeciality",
    async(id, { rejectWithValue }) => {
        try {
            const config = {
                method: "delete",
                url: `${API_ENDPOINT}/specialities/${id}`,
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

export const fetchSpeciality = createAsyncThunk(
    "speciality/fetchSpeciality",
    async(id, { rejectWithValue }) => {
        try {
            const config = {
                method: "get",
                url: `${API_ENDPOINT}/specialities/${id}`,
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
const Speciality = createSlice({
    name: "Speciality",
    initialState: {
        specialities: [],
        speciality: null,
        loading: false,
    },
    extraReducers: {
        [fetchAllSpecialities.fulfilled]: (state, action) => {
            state.specialities = action.payload;
            state.loading = false;
        },
        [fetchAllSpecialities.pending]: (state) => {
            state.loading = true;
        },
        [fetchSpeciality.fulfilled]: (state, action) => {
            state.speciality = action.payload;
            state.loading = false;
        },
        [fetchSpeciality.pending]: (state) => {
            state.loading = true;
        },
    },
});

export default Speciality.reducer;

// Selectors
export const selectAllSpecialities = (state) => state.Speciality.specialities;
export const selectSpeciality = (state) => state.Speciality.speciality;