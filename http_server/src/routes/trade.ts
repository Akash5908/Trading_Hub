import express from "express";
import { prisma } from "../lib/prisma.js";
import { error } from "console";
import { createClient, RedisClientType } from "redis";
import { RedisSubscriber } from "../lib/redisSubscriber.js";
import { redisSubscriberClient, redisClient } from "../lib/redis.js";

let redisSubscriber: RedisSubscriber | null = null;

if (redisSubscriberClient !== null) {
  redisSubscriber = new RedisSubscriber(redisClient as RedisClientType);
}

interface OpenOrder {
  id: string;
  asset: "BTC" | "SOL" | "ETH";
  side: "buy" | "sell";
  kind?: string;
  qty: number;
  entryPrice: number;
  positionValue?: number;
  userName: string;
  currentPnl?: number;
}

const router = express.Router();
export const CREATE_ORDER_QUEUE = "trade-stream";
export const COMPLETED_ORDER_QUEUE = "trade-stream";

router.post("/open", async (req, res) => {
  if (!redisClient || !redisSubscriber) {
    return res
      .status(503)
      .send({ message: "Trade service unavailable (Redis not configured)" });
  }
  const { asset, side, qty, entryPrice, userName } = req.body;
  const id = Math.random().toString();
  console.log("Order came");
  //Add the new order in queue
  redisClient.xAdd(CREATE_ORDER_QUEUE, "*", {
    message: JSON.stringify({
      kind: "create-order",
      asset,
      qty,
      side,
      entryPrice,
      userName,
      id,
    }),
  });
  console.log("Added order in callback queue!!");
  try {
    const responseFromEngine = (await redisSubscriber.waitForMessage(id)) as {
      order: OpenOrder;
    };
    console.log("Response from Engine", responseFromEngine);
    return res.send({
      message: "Trade open successfully",
      tradeId: responseFromEngine.order.id,
      status: 201,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
});

router.post("/close", async (req, res) => {
  if (!redisClient || !redisSubscriber) {
    return res
      .status(503)
      .send({ message: "Trade service unavailable (Redis not configured)" });
  }
  const { id } = req.body;

  //Add the new order in queue
  await redisClient.xAdd(COMPLETED_ORDER_QUEUE, "*", {
    message: JSON.stringify({
      kind: "close-order",
      id,
    }),
  });
  try {
    const responseFromEngine = (await redisSubscriber.waitForMessage(id)) as {
      order: OpenOrder;
    };
    console.log("Response from Engine", responseFromEngine);
    const userName = responseFromEngine.order.userName;
    const pnl = responseFromEngine.order.currentPnl || 0;
    // Update the user balance

    await prisma.user.updateMany({
      where: { username: userName },
      data: {
        userBalance: {
          increment: pnl, // +45.20 or -23.10
        },
      },
    });
    return res.send({
      message: "Trade closed successfully",
      tradeId: responseFromEngine.order.id,
      status: 201,
    });
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

router.get("/btc-klines", async (req, res) => {
  const { duration } = req.query;
  try {
    if (duration === "1m") {
      const data = await prisma.btc_1_min.findMany();
      return res.status(201).json(data);
    }
  } catch (error) {
    console.error(error);
  }
});

router.get("/sol-klines", async (req, res) => {
  const { duration } = req.query;
  try {
    if (duration === "1m") {
      const data = await prisma.sol_1_min.findMany();
      return res.status(201).json(data);
    }
  } catch (error) {
    console.error(error);
  }
});

router.get("/eth-klines", async (req, res) => {
  const { duration } = req.query;
  try {
    if (duration === "1m") {
      const data = await prisma.eth_1_min.findMany();
      return res.status(201).json(data);
    }
  } catch (error) {
    console.error(error);
  }
});

export default router;
