import { prisma } from "../lib/prisma.js";
import { createClient } from "redis";

let redis: any = null;

if (process.env.REDIS_URL) {
  redis = createClient({ url: process.env.REDIS_URL! });
  await redis.connect();
}

interface trade {
  open: number;
  high: number;
  low: number;
  close: number;
  time: number;
}

// Func to correctly format the data before storing
const validData = (data: any) => {
  try {
    let parsedData = typeof data === "string" ? JSON.parse(data) : data;

    if (parsedData.x === true) {
      return {
        time: Math.floor(parsedData.t / 1000),
        open: parseFloat(parsedData.o),
        high: parseFloat(parsedData.h),
        low: parseFloat(parsedData.l),
        close: parseFloat(parsedData.c),
      };
    }

    return null;
  } catch (err) {
    console.error("Error parsing data:", err);
    return null;
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
  if (!redis) {
    console.log("REDIS_URL not set, skipping Redis subscription");
    return;
  }
  redis.SUBSCRIBE("BTC_KLINES", (data: any) => {
    const trade = validData(data);
    if (trade) {
      StoreBtc1m(trade).catch((err) => {
        console.error(`[HTTP_SERVER] Error storing BTC data in DB:`, err);
      });
    }
  });

  redis.SUBSCRIBE("SOL_KLINES", (data: any) => {
    const trade = validData(data);
    if (trade) {
      StoreSol1m(trade).catch((err) => {
        console.error(`[HTTP_SERVER] Error storing SOL data in DB:`, err);
      });
    }
  });

  redis.SUBSCRIBE("ETH_KLINES", (data: any) => {
    const trade = validData(data);
    if (trade) {
      StoreEth1m(trade).catch((err) => {
        console.error(`[HTTP_SERVER] Error storing ETH data in DB:`, err);
      });
    }
  });
};

export default StoreTrade;
