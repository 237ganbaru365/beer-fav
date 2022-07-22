import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: {
    isLogin: false,
    uid: "",
  },
  user: {
    username: "",
    email: "",
    password: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signup: (state, action) => {
      state.user = action.payload;
    },
    login: (state, action) => {
      state.auth = action.payload;
    },
    logout: (state, action) => {
      state.auth = action.payload;
    },
  },
});

export const { signup, login, logout } = userSlice.actions;

export const userReducer = userSlice.reducer;
