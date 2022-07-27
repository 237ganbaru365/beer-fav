import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  auth: null, // { token?, email?, uid? }
  user: null, // { username, userId, myPosts, favPosts}
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signup: (state, action) => {
      const { auth, user } = action.payload;
      state.isLogin = true;
      state.auth = auth;
      state.user = user;
    },
    login: (state, action) => {
      const { auth, user } = action.payload;
      state.isLogin = true;
      state.auth = auth;
      state.user = user;
    },
    logout: (state, action) => {
      state.isLogin = false;
      state.auth = null;
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { signup, login, logout, setUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
