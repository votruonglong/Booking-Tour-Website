import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequestParams, postRequest, putRequest, deleteRequest, getRequest } from "../../../services/api"

// fetch list bookings

export const getCommentByTourId = createAsyncThunk(
    "comment/getCommentByTourId",
    async (tourId, { rejectWithValue }) => {
        try {
            const response = await getRequest(`/comment/GetCommentByTourId/${tourId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const createComment = createAsyncThunk(
    "comment/createComment",
    async (data, { rejectWithValue }) => {
        try {
            const response = await postRequest("/comment", data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const commentSlice = createSlice({
    name: "comment",
    initialState: {
        comments: [],
        error: null,
        status: "idle",
        loading: null
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(getCommentByTourId.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getCommentByTourId.fulfilled, (state, action) => {
                state.comments = action.payload;
                state.status = "succeeded";
            })
            .addCase(getCommentByTourId.rejected, (state, action) => {
                state.error = action.error.message;
                state.status = "failed";
            })
            .addCase(createComment.pending, (state) => {
                state.loading = true;
                state.status = "loading";
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.loading = false;
                state.status = "succeeded";
                state.comments.push(action.payload);
            })
            .addCase(createComment.rejected, (state, action) => {
                state.loading = false;
                state.status = "failed";
                state.error = action.payload;
            })

    },
});

export const { } = commentSlice.actions;

export default commentSlice.reducer;
