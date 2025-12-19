// store.ts
import { configureStore, UnknownAction } from "@reduxjs/toolkit";
import { authSlice } from "../slices/userSlice";
import { combineReducers } from "@reduxjs/toolkit";

const combinedReducer = combineReducers({
  user: authSlice.reducer,
});

const rootReducer = (
  state:
    | Partial<{
        user:
          | { id: string; username: string; userBalance: null; token: string }
          | undefined;
      }>
    | undefined,
  action: UnknownAction
) => {
  if (action.type === "logout") {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export function makeStore() {
  return configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
  });
}

export const store = makeStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
