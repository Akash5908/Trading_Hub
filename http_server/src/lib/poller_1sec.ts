// import { prisma } from "../lib/prisma.js";
// import { createClient } from "redis";

// let redis: any = null;

// if (process.env.REDIS_URL) {
//   redis = createClient({ url: process.env.REDIS_URL! });
//   await redis.connect();
// }

// interface CandleState {
//   time: number;
//   open: number;
//   high: number;
//   low: number;
//   close: number;
// }

// const btcCandle: CandleState = { time: 0, open: 0, high: 0, low: Infinity, close: 0 };
// const solCandle: CandleState = { time: 0, open: 0, high: 0, low: Infinity, close: 0 };
// const ethCandle: CandleState = { time: 0, open: 0, high: 0, low: Infinity, close: 0 };

// async function storeCandle(table: string, candle: CandleState) {
//   try {
//     await (prisma as any)[table].create({
//       data: {
//         time: candle.time,
//         open: candle.open,
//         high: candle.high,
//         low: candle.low,
//         close: candle.close,
//       },
//     });
//     console.log(`[1s Poller] Stored ${table}:`, candle);
//   } catch (err) {
//     console.error(`[1s Poller] Error storing ${table}:`, err);
//   }
// }

// async function processTrade(symbol: string, candleState: CandleState, tableName: string) {
//   let lastId = "0-0";

//   while (true) {
//     try {
//       const trades: any = await redis.xRead(
//         { key: `trade-${symbol.toLowerCase()}`, id: lastId },
//         { COUNT: 100, BLOCK: 100 },
//       );

//       if (trades?.[0]?.messages?.length) {
//         const msgs = trades[0].messages;
//         lastId = msgs[msgs.length - 1].id;

//         for (const msg of msgs) {
//           const price = parseFloat(msg.message.price as string);
//           const timestamp = Number(msg.message.timestamp);
//           const tickTime = Math.floor(timestamp / 1000);

//           if (candleState.time === 0) {
//             candleState.time = tickTime;
//             candleState.open = price;
//             candleState.high = price;
//             candleState.low = price;
//             candleState.close = price;
//           } else if (tickTime === candleState.time) {
//             candleState.high = Math.max(candleState.high, price);
//             candleState.low = Math.min(candleState.low, price);
//             candleState.close = price;
//           } else {
//             await storeCandle(tableName, { ...candleState });
//             candleState.time = tickTime;
//             candleState.open = price;
//             candleState.high = price;
//             candleState.low = price;
//             candleState.close = price;
//           }
//         }
//       }
//     } catch (err) {
//       console.error(`[1s Poller] Error reading ${symbol} trades:`, err);
//       await new Promise((r) => setTimeout(r, 1000));
//     }
//   }
// }

// export async function start1SecPoller() {
//   if (!redis) {
//     console.log("REDIS_URL not set, skipping 1s poller");
//     return;
//   }
//   console.log("[1s Poller] Starting 1-second candle poller...");

//   Promise.all([
//     processTrade("BTC", btcCandle, "btc_1_sec"),
//     processTrade("SOL", solCandle, "sol_1_sec"),
//     processTrade("ETH", ethCandle, "eth_1_sec"),
//   ]);
// }

// export default start1SecPoller;
