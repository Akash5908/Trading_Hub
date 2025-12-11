"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const redis_js_1 = require("./redis.js");
const redis_1 = require("redis");
const redis = (0, redis_1.createClient)();
const app = (0, express_1.default)();
const wss = new ws_1.WebSocket("wss://stream.binance.com:9443/ws/btcusdt@kline_1m");
console.log(wss);
async function startRedisServer() {
    try {
        await redis.connect();
        console.log("Successfully connected to redis!!");
    }
    catch (error) {
        console.error(error);
    }
}
// Checking if the websocket binance connection is completed.
wss.on("open", (ws) => {
    console.log("hello");
});
// This is when a message came from websocket connection.
wss.on("message", (data) => {
    const trades = JSON.parse(data);
    (0, redis_js_1.pushToRedis)(redis, trades);
});
startRedisServer();
//# sourceMappingURL=index.js.map