import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  auth: null,
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
      state.auth = action.payload;
    },
    logout: (state, action) => {
      state.isLogin = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout, setUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
