import axios from "axios";

export const FetchBtcTrade = async (timeframe: string = "1m") => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/trade/btc-klines`,
      { params: { duration: timeframe } }
    );
    if (res.status === 201) {
      return res.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const FetchSolTrade = async (timeframe: string = "1m") => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/trade/sol-klines`,
      { params: { duration: timeframe } }
    );
    if (res.status === 201) {
      return res.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const FetchEthTrade = async (timeframe: string = "1m") => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/trade/eth-klines`,
      { params: { duration: timeframe } }
    );
    if (res.status === 201) {
      return res.data;
    }
  } catch (error) {
    console.error(error);
  }
};
