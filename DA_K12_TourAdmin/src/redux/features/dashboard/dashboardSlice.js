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

export const fetchCategoryRevenue = createAsyncThunk(
    "dashboard/fetchCategoryRevenue",
    async () => {
        const response = await getRequest("/dashboard/RevenueByCategory");

        return response.data;
    }
);

export const fetchTotalTour = createAsyncThunk(
    "dashboard/fetchTotalTour",
    async () => {
        const response = await getRequest("/dashboard/BookingsByTour");

        return response.data;
    }
);

const dashBoardSlice = createSlice({
    name: "dashboard",
    initialState: {
        dashboards: [],
        categoryRevenue: [],
        bookingsTour: [],
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
            .addCase(fetchCategoryRevenue.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCategoryRevenue.fulfilled, (state, action) => {
                state.categoryRevenue = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchCategoryRevenue.rejected, (state, action) => {
                state.error = action.error.message;
                state.status = "failed";
            })
            .addCase(fetchTotalTour.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchTotalTour.fulfilled, (state, action) => {
                state.bookingsTour = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchTotalTour.rejected, (state, action) => {
                state.error = action.error.message;
                state.status = "failed";
            })
    },
});

export const { } = dashBoardSlice.actions;

export default dashBoardSlice.reducer;
