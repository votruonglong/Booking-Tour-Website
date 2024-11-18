import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { postRequest, postRequestParams } from '../../../services/api';

export const createMomoPayment = createAsyncThunk(
    'momo/createPayment',
    async (paymentData, { rejectWithValue }) => {
        try {
            const response = await postRequest('/payment', paymentData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const paymentSlice = createSlice({
    name: 'momo',
    initialState: { loading: false, paymentResponse: null },
    extraReducers: (builder) => {
        builder
            .addCase(createMomoPayment.pending, (state) => {
                state.loading = true;
            })
            .addCase(createMomoPayment.fulfilled, (state, action) => {
                state.loading = false;
                state.paymentResponse = action.payload;
            })
            .addCase(createMomoPayment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default paymentSlice.reducer;
