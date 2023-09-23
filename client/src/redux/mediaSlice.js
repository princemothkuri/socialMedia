import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginStatus: false,
  user: null,
  username: null,
};

export const artisanSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    changeStatus: (state, action) => {
      state.loginStatus = action.payload.user;
    },
    user_id: (state, action) => {
      state.user = action.payload.userid;
    },
    user_name: (state, action) => {
      state.username = action.payload.username;
    },
  },
});

export const { changeStatus, user_id, user_name } = artisanSlice.actions;
export default artisanSlice.reducer;
