const assetArray = {
  btc: "BTC_TRADE",
  sol: "SOL_TRADE",
  eth: "ETH_TRADE",
};

// func to create a redis server and use pub/sub
export async function pushToRedis(
  redis: any,
  trades: any,
  asset: keyof typeof assetArray
) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  redis.publish(assetArray[asset], JSON.stringify(trades));
}
