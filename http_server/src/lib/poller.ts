import { prisma } from "../lib/prisma.js";
import { createClient } from "redis";

const redis = createClient({ url: process.env.REDIS_URL! });

await redis.connect();

interface trade {
  open: number;
  high: number;
  low: number;
  close: number;
  time: number;
}

// Func to correctly format the data before storing
const validData = (data: any) => {
  const parsedData = JSON.parse(data);

  if (parsedData.k.x === true) {
    const k = parsedData.k; // shorter alias

    const labeled = {
      // Binance k.t is ms; most chart libs want seconds
      time: Math.floor(k.t / 1000),
      open: parseFloat(k.o),
      high: parseFloat(k.h),
      low: parseFloat(k.l),
      close: parseFloat(k.c),
      //   volume: parseFloat(k.v),
      //   closeTime: k.T,
      //   quoteVolume: parseFloat(k.q),
      //   tradeCount: k.n,
    };

    return labeled;
  }
};
const StoreBtc1m = async (data: trade) => {
  await prisma.btc_1_min.create({
    data: {
      time: data.time,
      open: data.open,
      high: data.high,
      low: data.low,
      close: data.close,
    },
  });
};

const StoreSol1m = async (data: trade) => {
  await prisma.sol_1_min.create({
    data: {
      time: data.time,
      open: data.open,
      high: data.high,
      low: data.low,
      close: data.close,
    },
  });
};

const StoreEth1m = async (data: trade) => {
  await prisma.eth_1_min.create({
    data: {
      time: data.time,
      open: data.open,
      high: data.high,
      low: data.low,
      close: data.close,
    },
  });
};

const StoreTrade = () => {
  redis.SUBSCRIBE("BTC_TRADE", (data) => {
    const trade = validData(data);
    if (trade) {
      StoreBtc1m(trade);
    }
  });

  redis.SUBSCRIBE("SOL_TRADE", (data) => {
    const trade = validData(data);
    if (trade) {
      StoreSol1m(trade);
    }
  });

  redis.SUBSCRIBE("ETH_TRADE", (data) => {
    const trade = validData(data);
    if (trade) {
      StoreEth1m(trade);
    }
  });
};

export default StoreTrade;
