import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequestParams, postRequest, putRequest, deleteRequest } from "../../../services/api";

// fetch list categories

export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",
    async ({ searchName, searchCode }) => {
        const params = { searchName, searchCode };
        const response = await getRequestParams("/DanhMuc", params);

        return response.data;
    }
);

//create category
export const createCategory = createAsyncThunk(
    "categories/createCategory",
    async (data, { rejectWithValue }) => {
        try {
            const response = await postRequest("/DanhMuc", data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//update category
export const updateCategory = createAsyncThunk(
    "categories/updateCategory",
    async ({ id, ...data }, { rejectWithValue }) => {
        try {
            const response = await putRequest(`/DanhMuc/${id}`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//delete category
export const deleteCategory = createAsyncThunk(
    "categories/deleteCategory",
    async (id, { rejectWithValue }) => {
        try {
            const response = await deleteRequest(`/DanhMuc/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        categories: [],
        error: null,
        status: "idle",
        loading: null
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.error = action.error.message;
                state.status = "failed";
            })
            //create Category
            .addCase(createCategory.pending, (state) => {
                state.loading = true;
                state.status = "loading";
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.status = "succeeded";
                state.categories.push(action.payload);
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.loading = false;
                state.status = "failed";
                state.error = action.payload;
            })
            //update Categories
            .addCase(updateCategory.pending, (state) => {
                state.loading = true;
                state.status = "loading";
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.status = "succeeded";
                const index = state.categories.findIndex(
                    (category) => category.id === action.payload.id
                );
                if (index !== -1) {
                    state.categories[index] = action.payload;
                }
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.loading = false;
                state.status = "failed";
                state.error = action.payload;
            })
            //delete Categories
            .addCase(deleteCategory.pending, (state) => {
                state.loading = true;
                state.status = "loading";
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.status = "succeeded";
                state.categories = state.categories.filter(
                    (category) => category.id !== action.payload
                );
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.loading = false;
                state.status = "failed";
                state.error = action.payload;
            });

    },
});

export const { } = categoriesSlice.actions;

export default categoriesSlice.reducer;
