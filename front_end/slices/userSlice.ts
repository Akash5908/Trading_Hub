import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  username: "",
  token: "",
};

type User = {
  id: string;
  username: string;
  token: string;
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.token = action.payload.token;
    },
    clearCredentials: (state) => {
      ((state.id = ""), (state.token = "")), (state.username = "");
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer; // EXPORT Slice reducer
