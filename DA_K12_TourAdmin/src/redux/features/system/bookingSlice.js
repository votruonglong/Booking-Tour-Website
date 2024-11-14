import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequestParams, postRequest, putRequest, deleteRequest } from "@services/api";

// fetch list bookings

export const fetchBooking = createAsyncThunk(
    "booking/fetchBooking",
    async ({ searchName, searchCode }) => {
        const params = { searchName, searchCode };
        const response = await getRequestParams("/booking", params);

        return response.data;
    }
);

const bookingSlice = createSlice({
    name: "booking",
    initialState: {
        bookings: [],
        error: null,
        status: "idle",
        loading: null
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchBooking.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchBooking.fulfilled, (state, action) => {
                state.bookings = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchBooking.rejected, (state, action) => {
                state.error = action.error.message;
                state.status = "failed";
            })

    },
});

export const { } = bookingSlice.actions;

export default bookingSlice.reducer;
