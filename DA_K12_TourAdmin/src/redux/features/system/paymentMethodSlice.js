import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequestParams, postRequest, putRequest, deleteRequest } from "@services/api";

// fetch list categories

export const fetchPaymentMethods = createAsyncThunk(
    "paymentMethod/fetchPaymentMethods",
    async ({ searchName, searchCode }) => {
        const params = { searchName, searchCode };
        const response = await getRequestParams("/paymentMethod", params);

        return response.data;
    }
);

//create category
export const createPaymentMethod = createAsyncThunk(
    "paymentMethod/createPaymentMethod",
    async (data, { rejectWithValue }) => {
        try {
            const response = await postRequest("/paymentMethod", data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//update category
export const updatePaymentMethod = createAsyncThunk(
    "paymentMethod/updatePaymentMethod",
    async ({ id, ...data }, { rejectWithValue }) => {
        try {
            const response = await putRequest(`/paymentMethod/${id}`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//delete category
export const deletePaymentMethod = createAsyncThunk(
    "paymentMethod/deletePaymentMethod",
    async (id, { rejectWithValue }) => {
        try {
            const response = await deleteRequest(`/paymentMethod/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const paymentMethodsSlice = createSlice({
    name: "paymentMethod",
    initialState: {
        paymentMethods: [],
        error: null,
        status: "idle",
        loading: null
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchPaymentMethods.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPaymentMethods.fulfilled, (state, action) => {
                state.paymentMethods = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchPaymentMethods.rejected, (state, action) => {
                state.error = action.error.message;
                state.status = "failed";
            })
            //create Category
            .addCase(createPaymentMethod.pending, (state) => {
                state.loading = true;
                state.status = "loading";
            })
            .addCase(createPaymentMethod.fulfilled, (state, action) => {
                state.loading = false;
                state.status = "succeeded";
                state.paymentMethods.push(action.payload);
            })
            .addCase(createPaymentMethod.rejected, (state, action) => {
                state.loading = false;
                state.status = "failed";
                state.error = action.payload;
            })
            //update Categories
            .addCase(updatePaymentMethod.pending, (state) => {
                state.loading = true;
                state.status = "loading";
            })
            .addCase(updatePaymentMethod.fulfilled, (state, action) => {
                state.loading = false;
                state.status = "succeeded";
                const index = state.paymentMethods.findIndex(
                    (method) => method.id === action.payload.id
                );
                if (index !== -1) {
                    state.categories[index] = action.payload;
                }
            })
            .addCase(updatePaymentMethod.rejected, (state, action) => {
                state.loading = false;
                state.status = "failed";
                state.error = action.payload;
            })
            //delete Categories
            .addCase(deletePaymentMethod.pending, (state) => {
                state.loading = true;
                state.status = "loading";
            })
            .addCase(deletePaymentMethod.fulfilled, (state, action) => {
                state.loading = false;
                state.status = "succeeded";
                state.paymentMethods = state.paymentMethods.filter(
                    (method) => method.id !== action.payload
                );
            })
            .addCase(deletePaymentMethod.rejected, (state, action) => {
                state.loading = false;
                state.status = "failed";
                state.error = action.payload;
            });

    },
});

export const { } = paymentMethodsSlice.actions;

export default paymentMethodsSlice.reducer;
