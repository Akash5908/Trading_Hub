import express from "express";
import { WebSocket } from "ws";
import { pushToRedis } from "./redis.js";
import { createClient } from "redis";
import { assetArray } from "./redis.js";

// Render automatically injects REDIS_URL
const redis = createClient({ url: process.env.REDIS_URL! });
const app = express();

// --- 1. RENDER PORT FIX ---
const PORT = process.env.PORT || 5000;

// --- 2. RENDER HEALTH CHECK ROUTE ---
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

// --- 3. PRODUCTION WEBSOCKET LOGIC ---
// Grouping this into a function ensures we can catch errors and reconnect
function subscribeToBinance(symbol: string, tickerName: string) {
  const ws = new WebSocket(
    `wss://stream.binance.us:9443/ws/${symbol}@kline_1m`,
  );

  ws.on("open", () => {
    console.log(`📡 Connected to ${tickerName} stream`);
  });

  ws.on("message", (data: string) => {
    try {
      const trades = JSON.parse(data);
      // Commented out to prevent Render log spam
      // console.log(`[PRICE_POLLER] Received ${tickerName} WebSocket message`);
      pushToRedis(redis, trades, tickerName as keyof typeof assetArray);
    } catch (err) {
      console.error(`Error parsing ${tickerName} data:`, err);
    }
  });

  // CRITICAL: Prevents Node.js from crashing if the internet blips
  ws.on("error", (err) => {
    console.error(`⚠️ WS Error [${tickerName}]:`, err.message);
  });

  // CRITICAL: Auto-reconnect if Binance drops the connection
  ws.on("close", () => {
    console.warn(
      `🔄 Connection closed for ${tickerName}. Reconnecting in 5s...`,
    );
    setTimeout(() => subscribeToBinance(symbol, tickerName), 5000);
  });
}

// Start everything up
startRedisServer();

subscribeToBinance("btcusdt", "btc");
subscribeToBinance("solusdt", "sol");
subscribeToBinance("ethusdt", "eth");
