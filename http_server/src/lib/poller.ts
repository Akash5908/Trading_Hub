import { prisma } from "../lib/prisma.js";
import { redisSubscriberClient } from "./redis.js";
interface trade {
  open: number;
  high: number;
  low: number;
  close: number;
  time: number;
}

const redisClient = redisSubscriberClient;
// Func to correctly format the data before storing
const validData = (data: any) => {
  try {
    let parsedData = typeof data === "string" ? JSON.parse(data) : data;
    console.log("parsedData", parsedData);
    if (parsedData.x === true) {
      return {
        time: Math.floor(parsedData.time / 1000),
        open: parseFloat(parsedData.open),
        high: parseFloat(parsedData.high),
        low: parseFloat(parsedData.low),
        close: parseFloat(parsedData.close),
      };
    }

    return null;
  } catch (err) {
    console.error("Error parsing data:", err);
    return null;
  }
};
const StoreBtc1m = async (data: trade) => {
  console.log("Storing btc candles.....");
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

export const storeTrade = async () => {
  if (!redisClient) {
    console.log("REDIS_URL not set, skipping Redis subscription");
    return;
  }

  redisClient
    .subscribe("BTC_KLINES", (data: any) => {
      console.log("Connected to BTC Klines", JSON.stringify(data));

      const trade = validData(data);
      console.log(trade);
      if (trade) {
        console.log("Btc trades");
        StoreBtc1m(trade).catch((err) => {
          console.error(`[HTTP_SERVER] Error storing BTC data in DB:`, err);
        });
      }
    })
    .then((message) => {
      console.log("✅ Subscribed to BTC KLINES");
    })
    .catch((err) => console.error("❌ Failed to subscirbe to BTC_KLINES", err));

  redisClient
    .subscribe("SOL_KLINES", (data: any) => {
      const trade = validData(data);
      if (trade) {
        StoreSol1m(trade).catch((err) => {
          console.error(`[HTTP_SERVER] Error storing SOL data in DB:`, err);
        });
      }
    })
    .then((data) => console.log("✅ Subscribed to SOL KLINES"))
    .catch((err) => console.error("❌ Failed to subscirbe to SOL_KLINES", err));

  redisClient
    .subscribe("ETH_KLINES", (data: any) => {
      const trade = validData(data);
      if (trade) {
        StoreEth1m(trade).catch((err) => {
          console.error(`[HTTP_SERVER] Error storing ETH data in DB:`, err);
        });
      }
    })
    .then((data) => console.log("✅ Subscribed to ETH KLINES"))
    .catch((err) => console.error("❌ Failed to subscirbe to ETH_KLINES", err));
};
