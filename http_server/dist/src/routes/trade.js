import express from "express";
import { prisma } from "../lib/prisma.js";
import { createClient } from "redis";
import { RedisSubscriber } from "../lib/redisSubscriber.js";
const client = createClient();
const redisSusbcriber = new RedisSubscriber();
client.connect();
const router = express.Router();
export const CREATE_ORDER_QUEUE = "trade-stream";
export const COMPLETED_ORDER_QUEUE = "trade-stream";
router.post("/open", async (req, res) => {
    const { asset, side, qty, entryPrice, userName } = req.body;
    const id = Math.random().toString();
    //Add the new order in queue
    await client.xAdd(CREATE_ORDER_QUEUE, "*", {
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
    try {
        const responseFromEngine = (await redisSusbcriber.waitForMessage(id));
        console.log("Response from Engine", responseFromEngine);
        return res.send({
            message: "Trade open successfully",
            tradeId: responseFromEngine.order.id,
            status: 201,
        });
    }
    catch (error) {
        console.error(error);
        res.send(error);
    }
});
router.post("/close", async (req, res) => {
    const { id } = req.body;
    //Add the new order in queue
    await client.xAdd(COMPLETED_ORDER_QUEUE, "*", {
        message: JSON.stringify({
            kind: "close-order",
            id,
        }),
    });
    try {
        const responseFromEngine = (await redisSusbcriber.waitForMessage(id));
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
    }
    catch (error) {
        console.error(error);
        res.send(error);
    }
});
router.get("/btc-klines", async (req, res) => {
    const { duration } = req.query;
    try {
        if (duration === "1d") {
            //   const data = await prisma.btc_1_min.findMany();
        }
        else if (duration === "1s") {
            //   const data = await prisma.btc_1_min.findMany();
        }
        else {
            const data = await prisma.btc_1_min.findMany();
            return res.status(201).json(data);
        }
    }
    catch (error) {
        console.error(error);
    }
});
router.get("/sol-klines", async (req, res) => {
    const { duration } = req.query;
    try {
        if (duration === "1d") {
            //   const data = await prisma.btc_1_min.findMany();
        }
        else if (duration === "1s") {
            //   const data = await prisma.btc_1_min.findMany();
        }
        else {
            const data = await prisma.sol_1_min.findMany();
            return res.status(201).json(data);
        }
    }
    catch (error) {
        console.error(error);
    }
});
router.get("/eth-klines", async (req, res) => {
    const { duration } = req.query;
    try {
        if (duration === "1d") {
            //   const data = await prisma.btc_1_min.findMany();
        }
        else if (duration === "1s") {
            //   const data = await prisma.btc_1_min.findMany();
        }
        else {
            const data = await prisma.eth_1_min.findMany();
            return res.status(201).json(data);
        }
    }
    catch (error) {
        console.error(error);
    }
});
export default router;
//# sourceMappingURL=trade.js.map