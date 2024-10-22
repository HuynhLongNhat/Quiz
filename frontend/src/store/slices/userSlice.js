import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  postLogin,
  postSignUp,
  postCreateNewUser,
  putUpdateUser,
  deleteUser,
  getListUser,
  getUserWithPaginate,
} from "../../services/apiService";
import { toast } from "react-toastify";
export const LIMIT_USER = 5;
export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await postLogin(email, password);
      if (res && res.EC === 0) {
        toast.success(res.EM);
      } else {
        toast.error(res.EM);
      }
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signUpUser = createAsyncThunk(
  "user/signup",
  async ({ email, username, password }, { rejectWithValue }) => {
    try {
      const res = await postSignUp(email, username, password);
      console.log("res redux", res);
      if (res && res.EC === 0) {
        toast.success(res.EM);
      } else {
        toast.error(res.EM);
      }
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createNewUser = createAsyncThunk(
  "user/createNewUser",
  async (
    { email, password, username, role, image },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await postCreateNewUser(
        email,
        password,
        username,
        role,
        image
      );

      if (res && res.EC === 0) {
        toast.success(res.EM);
        dispatch(fetchListUserWithPaginate({ page: 1, limit: LIMIT_USER }));
      } else {
        toast.error(res.EM);
      }
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, username, role, image }, { rejectWithValue, dispatch }) => {
    try {
      const res = await putUpdateUser(id, username, role, image);

      if (res && res.EC === 0) {
        toast.success(res.EM);
        dispatch(fetchListUserWithPaginate({ page: 1, limit: LIMIT_USER })); // Hiển thị thông báo thành công
      } else {
        toast.error(res.EM); // Hiển thị thông báo lỗi
      }

      return res;
    } catch (error) {
      return rejectWithValue(error.response.data); // Quản lý lỗi trả về
    }
  }
);

// Tạo async thunk để xóa người dùng
export const removeUser = createAsyncThunk(
  "user/deleteUser",
  async (userId, { rejectWithValue, dispatch }) => {
    try {
      const res = await deleteUser(userId);

      if (res && res.EC === 0) {
        toast.success(res.EM);
        dispatch(fetchListUserWithPaginate({ page: 1, limit: LIMIT_USER }));
      } else {
        toast.error(res.EM); // Hiển thị thông báo lỗi
      }

      return res;
    } catch (error) {
      return rejectWithValue(error.response.data); // Quản lý lỗi trả về
    }
  }
);

export const fetchListUser = createAsyncThunk(
  "user/fetchListUser",
  async ({ rejectWithValue }) => {
    try {
      const res = await getListUser();

      if (res && res.EC === 0) {
        return res.data;
      } else {
        toast.error(res.EM);
        return rejectWithValue(res.EM);
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchListUserWithPaginate = createAsyncThunk(
  "user/fetchUserWithPaginate",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const res = await getUserWithPaginate(page, limit);
      if (res && res.EC === 0) {
        return res.DT;
      } else {
        toast.error(res.EM);
        return rejectWithValue(res.EM);
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    totalUsers: 0,
    totalPages: 1,
    userInfo: null,
    loading: false,
    error: null,
  },
  reducers: {
    // logout: (state) => {
    //   state.userInfo = null;
    // },
    updateTotalUsers: (state, action) => {
      // Thêm action mới
      state.totalUsers = action.payload.totalRows;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;

        state.userInfo = action.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Thêm case cho createNewUser
      .addCase(createNewUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(createNewUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Khi gọi cập nhật người dùng
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Khi cập nhật thành công
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      // Khi cập nhật thất bại
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Khi xóa thành công
      .addCase(removeUser.fulfilled, (state) => {
        state.loading = false;
      })
      // Khi xóa thất bại
      .addCase(removeUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // .addCase(fetchListUser.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // // Khi lấy danh sách người dùng thành công
      // .addCase(fetchListUser.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.users = action.payload; // Lưu danh sách người dùng vào state
      // })
      // // Khi lấy danh sách người dùng thất bại
      // .addCase(fetchListUser.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload; // Lưu lỗi nếu có
      // });
      // Khi bắt đầu gọi API phân trang
      .addCase(fetchListUserWithPaginate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Khi gọi API thành công
      .addCase(fetchListUserWithPaginate.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.totalUsers = action.payload.totalRows;
        state.totalPages = action.payload.totalPages;
      })
      // Khi gọi API thất bại
      .addCase(fetchListUserWithPaginate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Lưu lỗi nếu có
      });
  },
});

export const { updateTotalUsers } = userSlice.actions;
export default userSlice.reducer;
