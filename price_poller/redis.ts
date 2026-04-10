export const assetArray = {
  btc: "BTC_KLINES",
  sol: "SOL_KLINES",
  eth: "ETH_KLINES",
};

// func to create a redis server and use pub/sub
export async function pushToRedis(
  redis: any,
  trades: any,
  asset: keyof typeof assetArray,
) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const channel = assetArray[asset];
  const klinesTrade = {
    time: String(Math.floor(trades.k.t / 1000)),
    open: trades.k?.o,
    high: trades.k.h,
    close: trades.k?.c,
    quantity: trades.k.q,
    low: trades.k.l,
    x: trades.k.x,
  };

  console.log(
    `[PRICE_POLLER] Publishing to Redis channel: ${channel}`,
    klinesTrade,
  );
  redis
    .publish(channel, JSON.stringify(klinesTrade))
    .then(() =>
      console.log(
        `[PRICE_POLLER] Successfully published ${asset} data to Redis ✅`,
      ),
    )
    .catch((err: any) =>
      console.error(
        `[PRICE_POLLER] Failed to publish ${asset} data to redis ❌`,
        err,
      ),
    );
}
