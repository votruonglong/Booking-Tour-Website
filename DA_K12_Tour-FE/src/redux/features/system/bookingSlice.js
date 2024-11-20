import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequestParams, postRequest, putRequest, deleteRequest, getRequest } from "../../../services/api"

// fetch list bookings

export const fetchBooking = createAsyncThunk(
    "booking/fetchBooking",
    async ({ searchName, searchCode, phoneNumberSearch }) => {
        const params = { searchName, searchCode, phoneNumberSearch };
        const response = await getRequestParams("/booking", params);

        return response.data;
    }
);

export const getBookingById = createAsyncThunk(
    "booking/getBookingById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await getRequest(`/booking/GetBookingId/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getBookingByPhoneNumber = createAsyncThunk(
    "booking/getBookingByPhoneNumber",
    async (phoneNumber, { rejectWithValue }) => {
        try {
            const response = await getRequest(`/booking/GetBookingByPhoneNumber/${phoneNumber}`);

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const createBooking = createAsyncThunk(
    "booking/createBooking",
    async (data, { rejectWithValue }) => {
        try {
            const response = await postRequest("/booking", data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const cancelBooking = createAsyncThunk(
    "booking/cancelBooking",
    async (id, { rejectWithValue }) => {
        try {
            const response = await putRequest(`/booking/CancelBooking/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const bookingSlice = createSlice({
    name: "booking",
    initialState: {
        bookings: [],
        selectedBooking: null,
        cancellationMessage: null,
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
            .addCase(getBookingById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getBookingById.fulfilled, (state, action) => {
                state.selectedBooking = action.payload;
                state.status = "succeeded";
            })
            .addCase(getBookingById.rejected, (state, action) => {
                state.error = action.error.message;
                state.status = "failed";
            })
            .addCase(getBookingByPhoneNumber.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getBookingByPhoneNumber.fulfilled, (state, action) => {
                state.selectedBooking = action.payload;
                state.status = "succeeded";
            })
            .addCase(getBookingByPhoneNumber.rejected, (state, action) => {
                state.error = action.error.message;
                state.status = "failed";
            })
            .addCase(createBooking.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createBooking.fulfilled, (state, action) => {
                state.loading = false;
                state.status = "succeeded";
                state.bookings.push(action.payload);
            })
            .addCase(createBooking.rejected, (state, action) => {
                state.error = action.error.message;
                state.status = "failed";
            })
            .addCase(cancelBooking.pending, (state) => {
                state.status = "loading";
            })
            .addCase(cancelBooking.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings = state.bookings.map((booking) =>
                    booking.id === action.payload.id ? { ...booking, Status: "Đã hủy" } : booking
                );
                state.cancellationMessage = action.payload;
            })
            .addCase(cancelBooking.rejected, (state, action) => {
                state.error = action.error.message;
                state.status = "failed";
            })

    },
});

export const { } = bookingSlice.actions;

export default bookingSlice.reducer;
