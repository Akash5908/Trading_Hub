import axios from "axios";

export const FetchBtcTrade = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/trade/btc-klines`,
    );
    if (res.status === 201) {
      return res.data;
    }
  } catch (error) {
    console.error(error);
  }
};
