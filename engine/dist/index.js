import { createClient } from "redis";
import express from "express";
import { WebSocketServer } from "ws";
const app = express();
const httpServer = app.listen(5002);
const client = createClient();
const pubsubClient = createClient();
const clients = new Set();
const wss = new WebSocketServer({ server: httpServer });
client.connect();
pubsubClient.connect();
const Prices = {
    BTC: 0,
    SOL: 0,
    ETH: 0,
};
const priceHandler = {
    set(target, prop, value, receiver) {
        console.log(`✅ ${String(prop)} changed to: ${value}`);
        // update postion func
        updatePosition();
        target[prop] = value; // Update original
        return true;
    },
};
const watchedPrices = new Proxy(Prices, priceHandler);
const openOrders = [];
wss.on("connection", (ws) => {
    clients.add(ws);
    ws.on("message", (message) => {
        const data = JSON.parse(message.toString());
    });
});
client.on("connect", async () => {
    pubsubClient.subscribe("BTC_TRADE", (message) => {
        const parsedData = JSON.parse(message);
        Prices.BTC = parsedData.k.c;
        watchedPrices.BTC = parseFloat(parsedData.k.c);
    });
    pubsubClient.subscribe("SOL_TRADE", (message) => {
        const parsedData = JSON.parse(message);
        Prices.SOL = parsedData.k.c;
        watchedPrices.SOL = parsedData.k.c;
    });
    pubsubClient.subscribe("ETH_TRADE", (message) => {
        const parsedData = JSON.parse(message);
        Prices.ETH = parsedData.k.c;
        watchedPrices.ETH = parsedData.k.c;
    });
    while (1) {
        let response = await client.xRead({ key: "trade-stream", id: "$" }, {
            BLOCK: 0,
        });
        const trade = JSON.parse(
        //@ts-ignore
        response[0].messages[0].message.message);
        if (response === null || !Array.isArray(response))
            return;
        const { id, asset, qty, side, userName, entryPrice, kind } = trade;
        if (kind === "create-order") {
            trade.entryPrice = Prices[asset];
            openOrders.push({
                id: trade.id,
                asset: trade.asset,
                side: trade.side,
                entryPrice: trade.entryPrice,
                userName: trade.userName,
                qty: trade.qty,
            });
            console.log("sent message back to callback qeueue");
            client.xAdd("callback-queue", "*", {
                message: JSON.stringify({
                    id: id,
                    asset: asset,
                    qty: qty,
                }),
            });
            //Calling broad cast func
            broadcastOpenOrder(trade);
        }
        else {
            const closeOrder = openOrders.find((e) => e.id === trade.id);
            if (!closeOrder)
                return;
            const asset = closeOrder?.asset;
            const index = openOrders.findIndex((e) => e.id === id);
            if (index > -1) {
                openOrders.splice(index, 1);
                console.log("sent message back to callback qeueue");
                client.xAdd("callback-queue", "*", {
                    message: JSON.stringify({
                        id: id,
                        asset: closeOrder?.asset,
                        qty: closeOrder?.asset,
                        userName: closeOrder.userName,
                        currentPnl: calculatePnL(closeOrder, Prices[asset]),
                        positionValue: calculatePositionValue(closeOrder),
                        entryPrice: closeOrder?.entryPrice,
                    }),
                });
                // calling close broadcast func
                broadcastCloseOrder(closeOrder);
            }
        }
    }
});
export function calculatePnL(order, currentPrice) {
    const direction = order.side === "buy" ? 1 : -1;
    const priceDiff = currentPrice - order.entryPrice;
    return direction * priceDiff * order.qty;
}
// To calculate the exposure
export function calculatePositionValue(order) {
    const currentPrice = parseFloat(Prices[order.asset]);
    const rawValue = order.qty * currentPrice;
    return Math.round(rawValue * 100) / 100; // e.g. 8890.464 → 8890.46
}
//func to broadcast orders
function broadcastOpenOrder(order) {
    console.log("Open orders length", openOrders.length);
    const message = JSON.stringify({
        type: "open-orders",
        order,
    });
    console.log(clients);
    clients.forEach((client) => {
        if (client.readyState === client.OPEN)
            client.send(message);
    });
}
//Func to broadcast close orders
function broadcastCloseOrder(order) {
    const message = JSON.stringify({
        type: "close-orders",
        order,
    });
    clients.forEach((client) => {
        if (client.readyState === client.OPEN) {
            client.send(message);
        }
    });
}
function updatePosition() {
    console.log("Inside the function", openOrders.length);
    if (openOrders.length > 0) {
        console.log("loop running");
        openOrders.map((trade) => {
            if (trade.asset === "BTC") {
                trade.currentPnl = calculatePnL(trade, Prices["BTC"]);
                trade.positionValue = calculatePositionValue(trade);
                broadcastPosition(trade);
            }
            else if (trade.asset === "ETH") {
                trade.currentPnl = calculatePnL(trade, Prices["ETH"]);
                broadcastPosition(trade);
            }
            else {
                trade.currentPnl = calculatePnL(trade, Prices["SOL"]);
                broadcastPosition(trade);
            }
        });
    }
}
//Func to broadcast position change
function broadcastPosition(order) {
    const message = JSON.stringify({
        type: "positions-update",
        order,
    });
    clients.forEach((client) => {
        if (client.readyState === client.OPEN) {
            client.send(message);
        }
    });
}
//# sourceMappingURL=index.js.map