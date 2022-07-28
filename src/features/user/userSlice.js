import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  user: {
    username: "",
    userId: "",
    myPostIdList: [],
    favPostIdList: [],
  },
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
    logout: (state) => {
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
    addFavPostId: (state, action) => {
      const { postId } = action.payload;
      if (state.user.favPostIdList && state.user.favPostIdList.length > 0) {
        state.user.favPostIdList.push(postId);
      } else {
        const favPostIdList = [postId];
        state.user.favPostIdList = favPostIdList;
      }
    },
    removeFavPostId: (state, action) => {
      const { postId } = action.payload;
      if (state.user.favPostIdList && state.user.favPostIdList.length > 0) {
        const newFavPostIdList = state.user.favPostIdList.filter(
          (id) => id !== postId
        );
        state.user.favPostIdList = newFavPostIdList;
      } else {
        return;
      }
    },
  },
});

export const {
  signup,
  login,
  logout,
  addMyPostId,
  addFavPostId,
  removeFavPostId,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
