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
    console.log(`[HTTP_SERVER] Received BTC data from Redis`);
    const trade = validData(data);
    if (trade) {
      console.log(`[HTTP_SERVER] Valid BTC trade data:`, trade);
      StoreBtc1m(trade).then(() => {
        console.log(`[HTTP_SERVER] Successfully stored BTC data in DB:`, trade);
      }).catch((err) => {
        console.error(`[HTTP_SERVER] Error storing BTC data in DB:`, err);
      });
    }
  });

  redis.SUBSCRIBE("SOL_TRADE", (data) => {
    console.log(`[HTTP_SERVER] Received SOL data from Redis`);
    const trade = validData(data);
    if (trade) {
      console.log(`[HTTP_SERVER] Valid SOL trade data:`, trade);
      StoreSol1m(trade).then(() => {
        console.log(`[HTTP_SERVER] Successfully stored SOL data in DB:`, trade);
      }).catch((err) => {
        console.error(`[HTTP_SERVER] Error storing SOL data in DB:`, err);
      });
    }
  });

  redis.SUBSCRIBE("ETH_TRADE", (data) => {
    console.log(`[HTTP_SERVER] Received ETH data from Redis`);
    const trade = validData(data);
    if (trade) {
      console.log(`[HTTP_SERVER] Valid ETH trade data:`, trade);
      StoreEth1m(trade).then(() => {
        console.log(`[HTTP_SERVER] Successfully stored ETH data in DB:`, trade);
      }).catch((err) => {
        console.error(`[HTTP_SERVER] Error storing ETH data in DB:`, err);
      });
    }
  });
};

export default StoreTrade;
