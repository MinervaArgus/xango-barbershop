import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userLoggedIn: false,
};

export const userStateSlice = createSlice({
  name: "userState",
  initialState,
  reducers: {
    updateUserStatus(state, action) {
      state.userLoggedIn = action.payload;
    },
    logout(state, action) {
        state.userLoggedIn = action.payload;
    },
  },
});

export const { updateUserStatus, logout } = userStateSlice.actions;
export default userStateSlice.reducer;