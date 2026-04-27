import express from "express";
import { WebSocket } from "ws";
import { createClient } from "redis";
import { pushToRedis } from "./redis";

const redis = createClient({ url: process.env.REDIS_URL! });
const app = express();

const PORT = process.env.PORT || 5000;

app.get("/health", (req, res) => {
  res.status(200).send("Poller is healthy");
});

app.listen(PORT, () => {
  console.log(`✅ Server successfully running on port ${PORT}`);
});

async function startRedisServer() {
  try {
    await redis.connect();
    console.log("✅ Successfully connected to redis!!");
  } catch (error) {
    console.error("❌ Redis connection failed:", error);
  }
}

function subscribeToKline(symbol: string, tickerName: string) {
  const ws = new WebSocket(
    `wss://stream.binance.us:9443/ws/${symbol}@kline_1m`,
  );

  ws.on("open", () => {
    console.log(`📡 Connected to ${tickerName} kline stream`);
  });

  ws.on("message", async (data: string) => {
    try {
      const kline = JSON.parse(data);
      const k = kline.k;
      pushToRedis(redis, kline, tickerName as "btc" | "sol" | "eth");
      // if (k.x) {
      //   await redis.xAdd(`klines-${tickerName.toLowerCase()}`, "*", {
      //     t: String(k.t),
      //     o: k.o,
      //     c: k.c,
      //     h: k.h,
      //     l: k.l,
      //     x: "1",
      //   });
      // } else {
      await redis.xAdd(`live-${tickerName.toLowerCase()}`, "*", {
        time: String(Math.floor(k.t / 1000)),
        open: k.o,
        high: k.h,
        low: k.l,
        close: k.c,
        x: k.c,
      });
      // }
    } catch (err) {
      console.error(`Error parsing ${tickerName} kline data:`, err);
    }
  });

  ws.on("error", (err) => {
    console.error(`⚠️ Kline WS Error [${tickerName}]:`, err.message);
  });

  ws.on("close", () => {
    console.warn(
      `🔄 Kline connection closed for ${tickerName}. Reconnecting in 5s...`,
    );
    setTimeout(() => subscribeToKline(symbol, tickerName), 5000);
  });
}

function subscribeToTrade(symbol: string, tickerName: string) {
  const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@trade`);

  ws.on("open", () => {
    console.log(`📡 Connected to ${tickerName} trade stream (binance.com)`);
  });

  ws.on("message", async (data: string) => {
    try {
      const trade = JSON.parse(data);
      await redis.xAdd(`trade-${tickerName.toLowerCase()}`, "*", {
        price: trade.p,
        quantity: trade.q,
        timestamp: String(trade.T),
      });
    } catch (err) {
      console.error(`Error parsing ${tickerName} trade data:`, err);
    }
  });

  ws.on("error", (err) => {
    console.error(`⚠️ Trade WS Error [${tickerName}]:`, err.message);
  });

  ws.on("close", () => {
    console.warn(
      `🔄 Trade connection closed for ${tickerName}. Reconnecting in 5s...`,
    );
    setTimeout(() => subscribeToTrade(symbol, tickerName), 5000);
  });
}

startRedisServer();

subscribeToKline("btcusdt", "btc");
subscribeToKline("solusdt", "sol");
subscribeToKline("ethusdt", "eth");

// subscribeToTrade("btcusdt", "btc");
// subscribeToTrade("solusdt", "sol");
// subscribeToTrade("ethusdt", "eth");
