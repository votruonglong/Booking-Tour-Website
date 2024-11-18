import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequestParams, postRequest, putRequest, deleteRequest, getRequest } from "@services/api";

// fetch list bookings

export const fetchDashboard = createAsyncThunk(
    "dashboard/fetchDashboard",
    async () => {
        const response = await getRequest("/dashboard/tour-stats");

        return response.data;
    }
);

const dashBoardSlice = createSlice({
    name: "dashboard",
    initialState: {
        dashboards: [],
        error: null,
        status: "idle",
        loading: null
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboard.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchDashboard.fulfilled, (state, action) => {
                state.dashboards = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchDashboard.rejected, (state, action) => {
                state.error = action.error.message;
                state.status = "failed";
            })

    },
});

export const { } = dashBoardSlice.actions;

export default dashBoardSlice.reducer;
