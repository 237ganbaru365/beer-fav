import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    favorite: [],
  },
  reducers: {
    addFav: (state, action) => {
      state.favorite.push(action.payload);
    },
    removeFav: (state, action) => {
      // FIXME: これ、removeできてないです！
      state.favorite.filter((item) => item !== action.payload);
    },
  },
});

export const { addFav, removeFav } = postSlice.actions;
export const postReducer = postSlice.reducer;
