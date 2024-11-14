import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteRequest,
  getRequestParams,
  postRequest,
  putRequest,
} from "@services/api";

// Lấy tất cả người dùng
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ usernameSearch, fullnameSearch, phoneNumberSearch }) => {
    const params = {
      usernameSearch,
      fullnameSearch,
      phoneNumberSearch,
    };
    const response = await getRequestParams("/Users", params);
    return response.data;
  }
);

// Lấy người dùng theo ID
export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getRequestParams(`/Users/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Tạo người dùng
export const createUser = createAsyncThunk(
  "users/createUser",
  async (data, { rejectWithValue }) => {
    try {
      console.log("Creating user with data:", data);
      data.phoneNumber = data.phoneNumber.replace(/\s+/g, "");
      const response = await postRequest("/Users", data);
      console.log("Create user response:", response);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      console.error("Error response:", error.response);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Cập nhật người dùng theo ID
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      // Chỉ fetch vai trò nếu dữ liệu role tồn tại
      if (data.role) {
        const rolesResponse = await getRequestParams("/roles");
        const role = rolesResponse.data.data.find(
          (role) => role.fullName === data.role
        );
        if (role) {
          data.role = role.normalizedName;
        }
      }
      data.phoneNumber = data.phoneNumber.replace(/\s+/g, ""); // Xóa tất cả khoảng trắng trong số điện thoại
      const response = await putRequest(`/users/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Xóa người dùng theo ID
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteRequest(`/users/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Đổi mật khẩu người dùng
export const changePassword = createAsyncThunk(
  "users/changePassword",
  async ({ id, newPassword }, { rejectWithValue }) => {
    try {
      const response = await putRequest(`/users/changepassword/${id}`, { newPassword });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    error: null,
    status: "idle",
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Lấy tất cả người dùng
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Lấy người dùng theo ID
      .addCase(fetchUserById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Tạo người dùng
      .addCase(createUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Cập nhật người dùng
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Xóa người dùng
      .addCase(deleteUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Đổi mật khẩu người dùng
      .addCase(changePassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

  },
});

export const { setPage, setPageSize } = userSlice.actions;

export default userSlice.reducer;
