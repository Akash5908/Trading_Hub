export const assetArray = {
  btc: "BTC_TRADE",
  sol: "SOL_TRADE",
  eth: "ETH_TRADE",
};

// func to create a redis server and use pub/sub
export async function pushToRedis(
  redis: any,
  trades: any,
  asset: keyof typeof assetArray,
) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const channel = assetArray[asset];
  console.log(`[PRICE_POLLER] Publishing to Redis channel: ${channel}`, {
    time: trades.k?.t,
    open: trades.k?.o,
    close: trades.k?.c,
  });
  redis.publish(channel, JSON.stringify(trades));
  console.log(`[PRICE_POLLER] Successfully published ${asset} data to Redis`);
}
