import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequestParams, postRequest, putRequest, deleteRequest } from "@services/api";

// fetch list categories

export const fetchSchedule = createAsyncThunk(
    "schedule/fetchSchedule",
    async ({ searchName, searchCode }) => {
        const params = { searchName, searchCode };
        const response = await getRequestParams("/schedule", params);

        return response.data;
    }
);

//create category
export const createSchedule = createAsyncThunk(
    "schedule/createSchedule",
    async (data, { rejectWithValue }) => {
        try {
            const response = await postRequest("/schedule", data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//update category
export const updateSchedule = createAsyncThunk(
    "schedule/updateSchedule",
    async ({ id, ...data }, { rejectWithValue }) => {
        try {
            const response = await putRequest(`/schedule/${id}`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//delete category
export const deleteSchedule = createAsyncThunk(
    "schedule/deleteSchedule",
    async (id, { rejectWithValue }) => {
        try {
            const response = await deleteRequest(`/schedule/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const scheduleSlice = createSlice({
    name: "schedule",
    initialState: {
        schedules: [],
        error: null,
        status: "idle",
        loading: null
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchSchedule.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchSchedule.fulfilled, (state, action) => {
                state.schedules = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchSchedule.rejected, (state, action) => {
                state.error = action.error.message;
                state.status = "failed";
            })
            //create Category
            .addCase(createSchedule.pending, (state) => {
                state.loading = true;
                state.status = "loading";
            })
            .addCase(createSchedule.fulfilled, (state, action) => {
                state.loading = false;
                state.status = "succeeded";
                state.schedules.push(action.payload);
            })
            .addCase(createSchedule.rejected, (state, action) => {
                state.loading = false;
                state.status = "failed";
                state.error = action.payload;
            })
            //update Categories
            .addCase(updateSchedule.pending, (state) => {
                state.loading = true;
                state.status = "loading";
            })
            .addCase(updateSchedule.fulfilled, (state, action) => {
                state.loading = false;
                state.status = "succeeded";
                const index = state.schedules.findIndex(
                    (schedule) => schedule.id === action.payload.id
                );
                if (index !== -1) {
                    state.schedules[index] = action.payload;
                }
            })
            .addCase(updateSchedule.rejected, (state, action) => {
                state.loading = false;
                state.status = "failed";
                state.error = action.payload;
            })
            //delete Categories
            .addCase(deleteSchedule.pending, (state) => {
                state.loading = true;
                state.status = "loading";
            })
            .addCase(deleteSchedule.fulfilled, (state, action) => {
                state.loading = false;
                state.status = "succeeded";
                state.schedules = state.schedules.filter(
                    (schedule) => schedule.id !== action.payload
                );
            })
            .addCase(deleteSchedule.rejected, (state, action) => {
                state.loading = false;
                state.status = "failed";
                state.error = action.payload;
            });

    },
});

export const { } = scheduleSlice.actions;

export default scheduleSlice.reducer;
