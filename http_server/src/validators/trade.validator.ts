import z from "zod";

export const openTradeValidator = z.object({
  asset: z.enum(["BTC", "ETH", "SOL"]),
  side: z.enum(["buy", "sell"]),
  qty: z.number().positive("Quantity must be > 0"),
  entryPrice: z.number().positive("Entry price must be > 0"),
  userName: z.string().min(1, "Username is required"),
  leverage: z.number().min(1).max(2000),
});
