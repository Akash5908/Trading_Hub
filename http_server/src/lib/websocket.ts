import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
import express from "express";

const app = express();
const client: Map<string, WebSocket> = new Map();
const httpServer = app.listen(5005);
const ws = new WebSocketServer({ server: httpServer });

export function initWebSocket() {
  ws.on("connection", (wss) => {
    console.log("Client ");
    wss.on("message", (data) => {
      const message = JSON.parse(data.toString());
    });
  });
}
