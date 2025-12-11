"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pushToRedis = pushToRedis;
// func to create a redis server and use pub/sub
async function pushToRedis(redis, trades) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    redis.publish("BTC_TRADE", JSON.stringify(trades));
}
//# sourceMappingURL=redis.js.map