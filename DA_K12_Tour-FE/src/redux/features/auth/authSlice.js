import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postRequest } from "../../../services/api";

// Thunk cho đăng nhập
export const login = createAsyncThunk(
    "auth/login",
    async ({ userName, passWord }, { rejectWithValue }) => {
        try {
            const response = await postRequest("/Auth/login", {
                userName,
                passWord,
            });
            console.log(response);

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const register = createAsyncThunk(
    "auth/register",
    async ({ userName, passWord, fullName, email, phonenumber }, { rejectWithValue }) => {
        try {
            const response = await postRequest("/Users", {
                userName,
                passWord,
                fullName,
                email,
                phonenumber
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Slice cho auth
const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        role: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.role = null;
            localStorage.clear();
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                const { role } = action.payload;
                state.user = action.payload;
                state.role = role;
                localStorage.setItem("user", action.payload)
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
