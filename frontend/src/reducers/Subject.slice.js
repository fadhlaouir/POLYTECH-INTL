import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT } from "../common/config";

export const fetchAllSubjects = createAsyncThunk(
    "subject/fetchAllSubjects",
    async(id, { rejectWithValue }) => {
        try {
            const config = {
                method: "get",
                url: `${API_ENDPOINT}/subjects`,
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

export const createSubject = createAsyncThunk(
    "subject/createSubject",
    async(data, { rejectWithValue }) => {
        try {
            const config = {
                method: "post",
                url: `${API_ENDPOINT}/subjects`,
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

export const updateSubject = createAsyncThunk(
    "subject/updateSubject",
    async(data, { rejectWithValue }) => {
        try {
            const config = {
                method: "put",
                url: `${API_ENDPOINT}/subjects/${data.id}`,
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

export const deleteSubject = createAsyncThunk(
    "subject/deleteSubject",
    async(id, { rejectWithValue }) => {
        try {
            const config = {
                method: "delete",
                url: `${API_ENDPOINT}/subjects/${id}`,
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

export const fetchSubject = createAsyncThunk(
    "subject/fetchSubject",
    async(id, { rejectWithValue }) => {
        try {
            const config = {
                method: "get",
                url: `${API_ENDPOINT}/subjects/${id}`,
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

const Subject = createSlice({
    name: "Subject",
    initialState: {
        subjects: [],
        subject: null,
        loading: false,
    },
    extraReducers: {
        [fetchAllSubjects.fulfilled]: (state, action) => {
            state.subjects = action.payload;
            state.loading = false;
        },
        [fetchAllSubjects.pending]: (state) => {
            state.loading = true;
        },
        [fetchSubject.fulfilled]: (state, action) => {
            state.subject = action.payload;
            state.loading = false;
        },
        [fetchSubject.pending]: (state) => {
            state.loading = true;
        },
    },
});

export default Subject.reducer;

// Selectors
export const selectAllSubjects = (state) => state.Subject.subjects;
export const selectSubject = (state) => state.Subject.subject;