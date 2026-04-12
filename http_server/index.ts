import express from "express";
import users from "./src/routes/users.js";
import trade from "./src/routes/trade.js";
import cors from "cors";
import { storeTrade } from "./src/lib/poller.js";
import { start1SecPoller } from "./src/lib/poller_1sec.js";
import { createClient } from "redis";
import { initWebSocket } from "./src/lib/websocket.js";

const app = express();
const redisUrl = process.env.REDIS_URL!;

export const redisClient = createClient({ url: redisUrl });

const port = 5001;

app.use(cors());
app.use(express.json());

app.use("/api/v1", users);
app.use("/api/v1/trade", trade);
app.get("/api/v2", () => {
  console.log("jeesfdsf");
});

function startServer() {
  app.listen(port, () => {
    console.log(`Server started at port ${port}!!! `);
  });
}

async function startRedis() {
  try {
    await redisClient.connect();
    console.log("✅ Successfully connected to redis!");
    return { success: true };
  } catch (error) {
    console.log("❌ Failed to connect to redis server!");
    return { success: false };
  }
}

await startRedis();
initWebSocket(); //Starting websocket connection
// start1SecPoller();
startServer(); //Starting backend server
await storeTrade();
