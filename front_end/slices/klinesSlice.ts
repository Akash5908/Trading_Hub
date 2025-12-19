import { createSlice } from "@reduxjs/toolkit";

interface klines {
  time?: number;
  open: number;
  close: number;
  low: number;
  high: number;
}
const initialState = {
  btc_1m: [],
  btc_1s: [],
  btc_5s: [],
};

type assets = {
  btc_1m: klines[];
  btc_1s: klines[];
  btc_5s: klines[];
  sol_1m: klines[];
  sol_1s: klines[];
  sol_5s: klines[];
};

export const klinesSlice = createSlice({
  name: "klines",
  initialState,
  reducers: {
    setKlines: (state, action) => {
      state.btc_1m = action.payload.id;
    },
  },
});
