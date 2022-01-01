/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT } from "../common/config";

/* -------------------------------------------------------------------------- */
/*                                specialities                                */
/* -------------------------------------------------------------------------- */

export const fetchAllSpecialities = createAsyncThunk(
    "user/fetchAllSpecialities",
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
    "user/createSpeciality",
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
    "user/updateSpeciality",
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
    "user/deleteSpeciality",
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
    "user/fetchSpeciality",
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

/* -------------------------------------------------------------------------- */
/*                                 departments                                */
/* -------------------------------------------------------------------------- */

export const fetchDepartments = createAsyncThunk(
    "user/fetchDepartments",
    async(id, { rejectWithValue }) => {
        try {
            const config = {
                method: "get",
                url: `${API_ENDPOINT}/departments`,
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

/* -------------------------------------------------------------------------- */
/*                                  subjects                                  */
/* -------------------------------------------------------------------------- */

export const fetchAllSubjects = createAsyncThunk(
    "user/fetchAllSubjects",
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
    "user/createSubject",
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
    "user/updateSubject",
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
    "user/deleteSubject",
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

// Login Slice
const Speciality = createSlice({
    name: "Speciality",
    initialState: {
        specialities: [],
        departments: null,
        subjects: [],
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
        [fetchDepartments.fulfilled]: (state, action) => {
            state.departments = action.payload;
            state.loading = false;
        },
        [fetchDepartments.pending]: (state) => {
            state.loading = true;
        },
        [fetchAllSubjects.fulfilled]: (state, action) => {
            state.subjects = action.payload;
            state.loading = false;
        },
        [fetchAllSubjects.pending]: (state) => {
            state.loading = true;
        },
    },
});

export default Speciality.reducer;

// Selectors
export const selectAllSpecialities = (state) => state.Speciality.specialities;
export const selectDepartments = (state) => state.Speciality.departments;
export const selectAllSubjects = (state) => state.Speciality.subjects;