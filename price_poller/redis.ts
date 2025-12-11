// func to create a redis server and use pub/sub
export async function pushToRedis(redis: any, trades: any) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  redis.publish("BTC_TRADE", JSON.stringify(trades));
}
