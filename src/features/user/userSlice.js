import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  user: {
    username: "",
    userId: "",
    myPostIdList: [],
    favPostIdList: [],
  }, // { username, userId, myPosts, favPosts} // firestore user table
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signup: (state, action) => {
      const { user } = action.payload;
      state.isLogin = true;
      state.user = user;
    },
    login: (state, action) => {
      const { user } = action.payload;
      state.isLogin = true;
      state.user = user;
    },
    logout: (state, action) => {
      state.isLogin = false;
      state.user = initialState.user;
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
