import express from "express";
import users from "./src/routes/users.js";
import trade from "./src/routes/trade.js";
import cors from "cors";
import { storeTrade } from "./src/lib/poller.js";
import { createClient } from "redis";
import { initWebSocket } from "./src/lib/websocket.js";
import { connectRedis } from "./src/lib/redis.js";
const app = express();

const port = 5001;
app.use(
  cors({
    origin: [
      "https://trading-hub.akashfullstack.site",
      "http://localhost:3000",
    ],
    credentials: true,
  }),
);
app.use(express.json());

async function startServer() {
  app.listen(port, () => {
    console.log(`Server started at port ${port}!!!`);
  });
}
async function init() {
  // Step 1: Connect to Redis FIRST
  await connectRedis();

  // Step 2: NOW import and initialize trade router (with connected redisClient)
  // The subscriber will be created with an already-connected client
  app.use("/api/v1", users);
  app.use("/api/v1/trade", trade);

  initWebSocket();
  startServer();
  await storeTrade();
}
init();
