import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  username: "",
  userBalance: null,
  token: "",
};

type User = {
  id: string;
  username: string;
  userBalance: number;
  token: string;
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.userBalance = action.payload.userBalance;
      state.token = action.payload.token;
    },
    clearCredentials: (state) => {
      ((state.id = ""), (state.token = "")),
        (state.username = ""),
        (state.userBalance = null);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer; // EXPORT Slice reducer
