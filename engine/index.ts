import { createClient } from "redis";
import express from "express";
import { WebSocketServer, WebSocket } from "ws";

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get("/health", (req, res) => {
  res.json({ status: "ok", clients: clients.size });
});
const httpServer = app.listen(5002);
const redis = createClient({ url: process.env.REDIS_URL! });
const clients = new Set<WebSocket>();
const wss = new WebSocketServer({ server: httpServer });

const Prices: Record<string, number> = {
  BTC: 0,
  SOL: 0,
  ETH: 0,
};

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

const openOrders: OpenOrder[] = [];

export function calculatePnL(order: OpenOrder, currentPrice: number): number {
  const direction = order.side === "buy" ? 1 : -1;
  const priceDiff = currentPrice - order.entryPrice;
  return direction * priceDiff * order.qty;
}

export function calculatePositionValue(order: OpenOrder): number {
  const currentPrice = Prices[order.asset] || 0;
  const rawValue = order.qty * currentPrice;
  return Math.round(rawValue * 100) / 100;
}

function broadcastToAll(type: string, data: any) {
  const message = JSON.stringify({ type, data });
  let sentCount = 0;
  clients.forEach((c) => {
    if (c.readyState === WebSocket.OPEN) {
      c.send(message);
      sentCount++;
    }
  });
  console.log(`Broadcast ${type} to ${sentCount} clients`);
}

function broadcastOpenOrder(order: OpenOrder) {
  broadcastToAll("open-orders", order);
}

function broadcastCloseOrder(order: OpenOrder) {
  broadcastToAll("close-orders", order);
}

function broadcastPosition(order: any) {
  broadcastToAll("positions-update", order);
}

function updatePosition() {
  openOrders.forEach((trade) => {
    trade.currentPnl = calculatePnL(trade, Prices[trade.asset] || 0);
    trade.positionValue = calculatePositionValue(trade);
    broadcastPosition(trade);
  });
}

const priceHandler = {
  set(target: any, prop: string | symbol, value: any) {
    target[prop as string] = value;
    updatePosition();
    return true;
  },
};

const watchedPrices = new Proxy(Prices, priceHandler);

wss.on("connection", (ws) => {
  clients.add(ws);
  console.log(`Client connected. Total clients: ${clients.size}`);
  ws.on("message", (message) => {
    JSON.parse(message.toString());
  });
  ws.on("close", () => {
    clients.delete(ws);
    console.log(`Client disconnected. Total clients: ${clients.size}`);
  });
});

async function startLivePriceReader() {
  console.log("Starting live price reader...");

  let btcLastId = "0";
  let solLastId = "0";
  let ethLastId = "0";

  while (true) {
    try {
      const [btcLive, solLive, ethLive]: any[] = await Promise.all([
        redis.xRead(
          { key: "live-btc", id: btcLastId },
          { COUNT: 10, BLOCK: 500 },
        ),
        redis.xRead(
          { key: "live-sol", id: solLastId },
          { COUNT: 10, BLOCK: 500 },
        ),
        redis.xRead(
          { key: "live-eth", id: ethLastId },
          { COUNT: 10, BLOCK: 500 },
        ),
      ]);

      if (btcLive?.[0]?.messages?.length) {
        const msgs = btcLive[0].messages;
        btcLastId = msgs[msgs.length - 1].id;
        console.log("BTC live data received:", msgs.length, "messages");
        const msg = msgs[msgs.length - 1].message;
        const data = {
          time: Number(msg.time),
          open: parseFloat(msg.open as string),
          high: parseFloat(msg.high as string),
          low: parseFloat(msg.low as string),
          close: parseFloat(msg.close as string),
        };
        Prices.BTC = data.close;
        watchedPrices.BTC = data.close;
        broadcastToAll("BTC_LIVE", data);
      }

      if (solLive?.[0]?.messages?.length) {
        const msgs = solLive[0].messages;
        solLastId = msgs[msgs.length - 1].id;
        console.log("SOL live data received:", msgs.length, "messages");
        const msg = msgs[msgs.length - 1].message;
        const data = {
          time: Number(msg.time),
          open: parseFloat(msg.open as string),
          high: parseFloat(msg.high as string),
          low: parseFloat(msg.low as string),
          close: parseFloat(msg.close as string),
        };
        Prices.SOL = data.close;
        watchedPrices.SOL = data.close;
        broadcastToAll("SOL_LIVE", data);
      }

      if (ethLive?.[0]?.messages?.length) {
        const msgs = ethLive[0].messages;
        ethLastId = msgs[msgs.length - 1].id;
        console.log("ETH live data received:", msgs.length, "messages");
        const msg = msgs[msgs.length - 1].message;
        const data = {
          time: Number(msg.time),
          open: parseFloat(msg.open as string),
          high: parseFloat(msg.high as string),
          low: parseFloat(msg.low as string),
          close: parseFloat(msg.close as string),
        };
        Prices.ETH = data.close;
        watchedPrices.ETH = data.close;
        broadcastToAll("ETH_LIVE", data);
      }
    } catch (err) {
      console.error("Live price reader error:", err);
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
}

async function startTradeReader() {
  console.log("Starting trade reader...");

  let btcLastId = "0-0";
  let solLastId = "0-0";
  let ethLastId = "0-0";

  while (true) {
    try {
      const [btcTrade, solTrade, ethTrade]: any[] = await Promise.all([
        redis.xRead(
          { key: "trade-btc", id: btcLastId },
          { COUNT: 10, BLOCK: 2000 },
        ),
        redis.xRead(
          { key: "trade-sol", id: solLastId },
          { COUNT: 10, BLOCK: 2000 },
        ),
        redis.xRead(
          { key: "trade-eth", id: ethLastId },
          { COUNT: 10, BLOCK: 2000 },
        ),
      ]);

      console.log("Trade reader tick - BTC:", btcTrade, "SOL:", solTrade, "ETH:", ethTrade);

      if (btcTrade?.[0]?.messages?.length) {
        const msgs = btcTrade[0].messages;
        console.log("BTC trade received:", msgs.length, "messages");
        btcLastId = msgs[msgs.length - 1].id;
        const msg = msgs[msgs.length - 1].message;
        broadcastToAll("BTC_TRADE", {
          price: parseFloat(msg.price as string),
          quantity: parseFloat(msg.quantity as string),
          timestamp: Number(msg.timestamp),
        });
      }

      if (solTrade?.[0]?.messages?.length) {
        const msgs = solTrade[0].messages;
        solLastId = msgs[msgs.length - 1].id;
        const msg = msgs[msgs.length - 1].message;
        broadcastToAll("SOL_TRADE", {
          price: parseFloat(msg.price as string),
          quantity: parseFloat(msg.quantity as string),
          timestamp: Number(msg.timestamp),
        });
      }

      if (ethTrade?.[0]?.messages?.length) {
        const msgs = ethTrade[0].messages;
        ethLastId = msgs[msgs.length - 1].id;
        const msg = msgs[msgs.length - 1].message;
        broadcastToAll("ETH_TRADE", {
          price: parseFloat(msg.price as string),
          quantity: parseFloat(msg.quantity as string),
          timestamp: Number(msg.timestamp),
        });
      }
    } catch (err) {
      console.error("Trade reader error:", err);
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
}

async function startOrderProcessor() {
  console.log("Starting order processor...");

  while (true) {
    try {
      const response: any = await redis.xRead(
        { key: "trade-stream", id: "$" },
        { BLOCK: 1000 },
      );

      if (!response || !Array.isArray(response as any[])) continue;

      const firstMessage = response[0];
      if (!firstMessage?.messages?.[0]?.message?.message) continue;

      const trade: OpenOrder = JSON.parse(
        firstMessage.messages[0].message.message,
      );

      const { id, asset, qty, kind } = trade;

      if (kind === "create-order") {
        trade.entryPrice = Prices[asset] || 0;
        openOrders.push({
          id: trade.id,
          asset: trade.asset,
          side: trade.side,
          entryPrice: trade.entryPrice,
          userName: trade.userName,
          qty: trade.qty,
        });

        await redis.xAdd("callback-queue", "*", {
          message: JSON.stringify({ id, asset, qty }),
        });

        broadcastOpenOrder(trade);
      } else {
        const closeOrder = openOrders.find((e) => e.id === id);
        if (!closeOrder) continue;

        const index = openOrders.findIndex((e) => e.id === id);
        if (index > -1) {
          openOrders.splice(index, 1);
          await redis.xAdd("callback-queue", "*", {
            message: JSON.stringify({
              id,
              asset: closeOrder.asset,
              qty: closeOrder.qty,
              userName: closeOrder.userName,
              currentPnl: calculatePnL(
                closeOrder,
                Prices[closeOrder.asset] || 0,
              ),
              positionValue: calculatePositionValue(closeOrder),
              entryPrice: closeOrder.entryPrice,
            }),
          });
          broadcastCloseOrder(closeOrder);
        }
      }
    } catch (err) {
      console.error("Order processor error:", err);
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
}

async function start() {
  try {
    await redis.connect();
    console.log("Engine Redis connected");

    startLivePriceReader();
    startTradeReader();
    startOrderProcessor();
  } catch (err) {
    console.error("Failed to start engine:", err);
  }
}

start();
