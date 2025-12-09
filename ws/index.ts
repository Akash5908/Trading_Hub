import express from "express";
import { WebSocket, WebSocketServer } from "ws";
import { createClient } from "redis";

const app = express();
const httpServer = app.listen(8080);
const redis = createClient();

const wss = new WebSocketServer({ server: httpServer });

async function startServer() {
  try {
    const res = await redis.connect();

    console.log("Successfully connected to Redis server!!!");
  } catch (error) {
    console.error(error);
  }
}

wss.on("connection", async function (ws) {
  console.log("Successfully connected to Websocket server!!");
  ws.on("message", function (data) {
    const message = JSON.parse(data);
    console.log(message);
    if (message.type === "Subscribe") {
      redis.SUBSCRIBE("BTC_TRADE", (data) => {
        wss.clients.forEach(function each(client) {
          if (client === ws && client.readyState === WebSocket.OPEN) {
            client.send(data);
          }
        });
      });
    } else if (message.type === "Unsubscribe") {
      redis.UNSUBSCRIBE("BTC_TRADE");
    }
  });
});

startServer();
