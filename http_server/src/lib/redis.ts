import { createClient } from "redis";
const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
export const redisClient = createClient({ url: redisUrl });
export const redisSubscriberClient = createClient({ url: redisUrl });
export async function connectRedis() {
  try {
    await Promise.all([redisClient.connect(), redisSubscriberClient.connect()]);
    console.log("✅ Redis clients connected!");
    return true;
  } catch (error) {
    console.log("❌ Failed to connect to redis server!");
    return false;
  }
}
