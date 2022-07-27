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
    addMyPostId: (state, action) => {
      const { myPostId } = action.payload;

      if (state.user.myPostIdList && state.user.myPostIdList.length > 0) {
        state.user.myPostIdList.push(myPostId);
      } else {
        const myPostIdList = [myPostId];
        state.user.myPostIdList = myPostIdList;
      }
    },
  },
});

export const { signup, login, logout, setUser, addMyPostId } =
  userSlice.actions;

export const userReducer = userSlice.reducer;
