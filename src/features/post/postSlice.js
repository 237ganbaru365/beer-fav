import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    isFavorite: false,
  },
  reducers: {
    addFav: (state) => {
      state.isFavorite = true;
    },
    removeFav: (state) => {
      state.isFavorite = false;
    },
  },
});

export const { addFav, removeFav } = postSlice.actions;
export const postReducer = postSlice.reducer;
