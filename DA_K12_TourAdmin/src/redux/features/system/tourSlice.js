import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequestParams, postRequest, putRequest, deleteRequest, postRequestMultipartFormData } from "@services/api";

// fetch list tour

export const fetchTour = createAsyncThunk(
    "tours/fetchTour",
    async ({ searchName, searchCode, categoriesSearch }) => {
        const params = { searchName, searchCode, categoriesSearch };
        const response = await getRequestParams("/tours", params);

        return response.data;
    }
);

//create Tour
export const createTour = createAsyncThunk(
    "tours/createTour",
    async (data, { rejectWithValue }) => {
        try {
            const response = await postRequest("/tours", data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//update Tour
export const updateTour = createAsyncThunk(
    "tours/updateTour",
    async ({ id, ...data }, { rejectWithValue }) => {
        try {
            const response = await putRequest(`/tours/${id}`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//delete Tour
export const deleteTour = createAsyncThunk(
    "tours/deleteTour",
    async (id, { rejectWithValue }) => {
        try {
            const response = await deleteRequest(`/tours/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const toursSlice = createSlice({
    name: "tours",
    initialState: {
        tours: [],
        error: null,
        status: "idle",
        loading: null
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchTour.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchTour.fulfilled, (state, action) => {
                state.tours = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchTour.rejected, (state, action) => {
                state.error = action.error.message;
                state.status = "failed";
            })
            //create Category
            .addCase(createTour.pending, (state) => {
                state.loading = true;
                state.status = "loading";
            })
            .addCase(createTour.fulfilled, (state, action) => {
                state.loading = false;
                state.status = "succeeded";
                state.tours.push(action.payload);
            })
            .addCase(createTour.rejected, (state, action) => {
                state.loading = false;
                state.status = "failed";
                state.error = action.payload;
            })
            //update Categories
            .addCase(updateTour.pending, (state) => {
                state.loading = true;
                state.status = "loading";
            })
            .addCase(updateTour.fulfilled, (state, action) => {
                state.loading = false;
                state.status = "succeeded";
                const index = state.tours.findIndex(
                    (tour) => tour.id === action.payload.id
                );
                if (index !== -1) {
                    state.tours[index] = action.payload;
                }
            })
            .addCase(updateTour.rejected, (state, action) => {
                state.loading = false;
                state.status = "failed";
                state.error = action.payload;
            })
            //delete Categories
            .addCase(deleteTour.pending, (state) => {
                state.loading = true;
                state.status = "loading";
            })
            .addCase(deleteTour.fulfilled, (state, action) => {
                state.loading = false;
                state.status = "succeeded";
                state.tours = state.tours.filter(
                    (tour) => tour.id !== action.payload
                );
            })
            .addCase(deleteTour.rejected, (state, action) => {
                state.loading = false;
                state.status = "failed";
                state.error = action.payload;
            });

    },
});

export const { } = toursSlice.actions;

export default toursSlice.reducer;
