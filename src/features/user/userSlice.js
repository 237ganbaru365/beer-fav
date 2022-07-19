import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    //FIXME: ログインした時にユーザー名をだしたい
    username: "",
  },
  reducers: {
    signup: (state, action) => {
      state.username = action.payload;
    },
    login: (state, action) => {
      state = action.payload;
    },
    logout: (state) => {
      state = null;
      state.username = "";
    },
  },
});

export const { signup, login, logout } = userSlice.actions;

export const userReducer = userSlice.reducer;
