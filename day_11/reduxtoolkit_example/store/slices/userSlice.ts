import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User, UserState } from "@/type";

export const fectchUser = createAsyncThunk(
  "user/fectchUser",
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await new Promise<User>((resolve) =>
        setTimeout(
          () =>
            resolve({
              id: userId,
              name: "Jkaon Ooan",
              email: "josna@kfkj.com",
              avatar: "https://placehold.co/100",
            }),
          1000
        )
      );
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (userData: Partial<User>, { rejectWithValue }) => {
    try {
      const response = await new Promise<Partial<User>>((resolve) =>
        setTimeout(() => resolve(userData), 800)
      );
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const initialState: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fectchUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fectchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fectchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.currentUser) {
          state.currentUser = { ...state.currentUser, ...action.payload };
        }
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { login, logout, clearError } = userSlice.actions;
export default userSlice.reducer;
