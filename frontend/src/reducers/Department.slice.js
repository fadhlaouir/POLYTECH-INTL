/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT } from "../common/config";

export const fetchAllDepartments = createAsyncThunk(
    "department/fetchAllDepartments",
    async() => {
        const config = {
            method: "get",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            url: `${API_ENDPOINT}/departments`,
        };
        const payload = await axios(config);
        return payload.data;
    }
);

export const createDepartment = createAsyncThunk(
    "department/createDepartment",
    async(data, { rejectWithValue }) => {
        try {
            const config = {
                method: "post",
                url: `${API_ENDPOINT}/departments`,
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

export const updateDepartment = createAsyncThunk(
    "department/updateDepartment",
    async(data, { rejectWithValue }) => {
        try {
            const config = {
                method: "put",
                url: `${API_ENDPOINT}/departments/${data.id}`,
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

export const deleteDepartment = createAsyncThunk(
    "department/deleteDepartment",
    async(id, { rejectWithValue }) => {
        try {
            const config = {
                method: "delete",
                url: `${API_ENDPOINT}/departments/${id}`,
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

export const fetchDepartment = createAsyncThunk(
    "department/fetchDepartment",
    async(id, { rejectWithValue }) => {
        try {
            const config = {
                method: "get",
                url: `${API_ENDPOINT}/departments/${id}`,
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

const Department = createSlice({
    name: "Department",
    initialState: {
        departments: [],
        department: null,
        loading: false,
    },
    extraReducers: {
        [fetchAllDepartments.fulfilled]: (state, action) => {
            state.departments = action.payload;
            state.loading = false;
        },
        [fetchAllDepartments.pending]: (state) => {
            state.loading = true;
        },
        [fetchDepartment.fulfilled]: (state, action) => {
            state.department = action.payload;
            state.loading = false;
        },
        [fetchDepartment.pending]: (state) => {
            state.loading = true;
        },
    },
});

export default Department.reducer;

// Selectors
export const selectAllDepartments = (state) => state.Department.departments;
export const selectDepartment = (state) => state.Department.department;