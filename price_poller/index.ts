import express from "express";
import { server } from "typescript";
import { WebSocket, WebSocketServer } from "ws";
import { pushToRedis } from "./redis.js";
import { createClient } from "redis";

const redis = createClient({ url: process.env.REDIS_URL! });
const app = express();
const wss = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@kline_1m");
const wss2 = new WebSocket("wss://stream.binance.com:9443/ws/solusdt@kline_1m");
const wss3 = new WebSocket("wss://stream.binance.com:9443/ws/ethusdt@kline_1m");

console.log(wss);

async function startRedisServer() {
  try {
    await redis.connect();
    console.log("Successfully connected to redis!!");
  } catch (error) {
    console.error(error);
  }
}
// Checking if the websocket binance connection is completed.
wss.on("open", (ws: WebSocket) => {
  console.log("hello");
});

// This is when a message came from websocket connection.
wss.on("message", (data: string) => {
  const trades = JSON.parse(data);
  pushToRedis(redis, trades, "btc");
});

wss2.on("open", (ws: WebSocket) => {
  console.log("hello");
});

wss2.on("message", (data: string) => {
  const trades = JSON.parse(data);
  pushToRedis(redis, trades, "sol");
});

wss3.on("open", (ws: WebSocket) => {
  console.log("hello");
});

wss3.on("message", (data: string) => {
  const trades = JSON.parse(data);
  pushToRedis(redis, trades, "eth");
});

startRedisServer();
