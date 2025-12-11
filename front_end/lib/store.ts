// store.ts
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../slices/userSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      user: authSlice.reducer,
    },
    devTools: process.env.NODE_ENV !== "production",
  });
}

export const store = makeStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
