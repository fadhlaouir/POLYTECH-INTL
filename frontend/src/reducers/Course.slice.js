import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT } from "../common/config";

export const fetchAllCourses = createAsyncThunk(
    "course/fetchAllCourses",
    async(id, { rejectWithValue }) => {
        try {
            const config = {
                method: "get",
                url: `${API_ENDPOINT}/courses`,
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

export const createCourse = createAsyncThunk(
    "course/createCourse",
    async(data, { rejectWithValue }) => {
        try {
            const config = {
                method: "post",
                url: `${API_ENDPOINT}/courses`,
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

export const updateCourse = createAsyncThunk(
    "course/updateCourse",
    async(data, { rejectWithValue }) => {
        try {
            const config = {
                method: "put",
                url: `${API_ENDPOINT}/courses/${data.id}`,
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

export const deleteCourse = createAsyncThunk(
    "course/deleteCourse",
    async(id, { rejectWithValue }) => {
        try {
            const config = {
                method: "delete",
                url: `${API_ENDPOINT}/courses/${id}`,
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

export const fetchCourse = createAsyncThunk(
    "course/fetchCourse",
    async(id, { rejectWithValue }) => {
        try {
            const config = {
                method: "get",
                url: `${API_ENDPOINT}/courses/${id}`,
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

const Course = createSlice({
    name: "Course",
    initialState: {
        courses: [],
        course: null,
        loading: false,
    },
    extraReducers: {
        [fetchAllCourses.fulfilled]: (state, action) => {
            state.courses = action.payload;
            state.loading = false;
        },
        [fetchAllCourses.pending]: (state) => {
            state.loading = true;
        },
        [fetchCourse.fulfilled]: (state, action) => {
            state.course = action.payload;
            state.loading = false;
        },
        [fetchCourse.pending]: (state) => {
            state.loading = true;
        },
    },
});

export default Course.reducer;

// Selectors
export const selectAllCourses = (state) => state.Course.courses;
export const selectCourse = (state) => state.Course.course;