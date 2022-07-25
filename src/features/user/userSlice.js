import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  uid: "",
  username: "",
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state = action.payload;
    },
    logout: (state, action) => {
      state = action.payload;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const userReducer = userSlice.reducer;
