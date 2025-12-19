"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pushToRedis = pushToRedis;
const assetArray = {
    btc: "BTC_TRADE",
    sol: "SOL_TRADE",
    eth: "ETH_TRADE",
};
// func to create a redis server and use pub/sub
async function pushToRedis(redis, trades, asset) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    redis.publish(assetArray[asset], JSON.stringify(trades));
}
//# sourceMappingURL=redis.js.map