"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Spinner } from "@/components/ui/spinner";
import z from "zod";

interface OrderProps {
  fees: number;
  leverage: number; // e.g. 10 => 1:10
  margin: number;
  swap: number;
  pipValue: number;
  volume: number; // units
  totalPrice: number;
  totalCost: number;
}

const tradeValidator = z.object({
  asset: z.enum(["BTC", "ETH", "SOL"]),
  side: z.enum(["buy", "sell"]),
  qty: z.number().positive("Quantity must be > 0"),
  entryPrice: z.number().positive("Entry price must be > 0"),
  userName: z.string().min(1, "Username is required"),
  leverage: z.number().min(1).max(2000),
});

const TradingPanel = ({
  assetPrice,
  userBalance,
  selectedCurrency,
  userName,
}: {
  assetPrice: number;
  userBalance: number;
  selectedCurrency: string;
  userName: string;
}) => {
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState<OrderProps>({
    fees: 0,
    leverage: 10,
    margin: 0,
    swap: 0,
    pipValue: 0,
    volume: 0,
    totalCost: 0,
    totalPrice: 0,
  });

  // 🔹 Helper: calculate margin = (price * volume) / leverage
  const calcMargin = (price: number, volume: number, leverage: number) => {
    if (!price || !volume || !leverage) return 0;
    const notional = price * volume; // position size in quote currency[web:278]
    return notional / leverage; // margin requirement[web:283]
  };

  // 🔹 Helper: very simple pip value approximation (for FX-style assets)
  const calcPipValue = (volume: number, price: number) => {
    if (!volume || !price) return 0;
    // Example: 1 pip = 0.0001 of price; pip value ≈ volume * 0.0001[web:276]
    return volume * 0.0001;
  };

  const calcTotalCost = (orderData: OrderProps) => {
    return orderData.margin + orderData.fees + orderData.swap;
  };

  // 🔹 Add Total Price (Notional Value)
  const calcTotalPrice = (price: number, volume: number) => {
    return price * volume; // Full position size[web:278]
  };

  useEffect(() => {
    setOrderData((prev) => {
      const margin = calcMargin(assetPrice, prev.volume, prev.leverage);
      const pipValue = calcPipValue(prev.volume, assetPrice);
      const totalPrice = calcTotalPrice(assetPrice, prev.volume);
      const totalCost = calcTotalCost({ ...prev, margin });

      return {
        ...prev,
        margin,
        pipValue,
        totalPrice,
        totalCost,
      };
    });
  }, [assetPrice, orderData.volume, orderData.leverage]);

  const orderArray = [
    { label: "Fees", value: `$${orderData.fees.toFixed(2)}` },
    { label: "Leverage", value: `${orderData.leverage}x` },
    { label: "Margin", value: `$${orderData.margin.toFixed(2)}` },
    { label: "Swap", value: `$${orderData.swap.toFixed(2)}` },
    { label: "Pip Value", value: `$${orderData.pipValue.toFixed(2)}` },
    {
      label: "**Total Cost**",
      value: `**$${orderData.totalCost?.toFixed(2)}**`,
    },
    { label: "Volume in Units", value: orderData.volume.toLocaleString() },
    {
      label: "Total Price",
      value: `$${orderData.totalPrice?.toLocaleString()}`,
    },
  ];

  async function openTrade() {
    const tradeData = {
      asset: selectedCurrency,
      side,
      qty: orderData.volume,
      entryPrice: assetPrice,
      userName,
      leverage: orderData.leverage,
    };

    const { success, data } = tradeValidator.safeParse(tradeData);
    if (!success) {
      const errors = tradeValidator.safeParse(tradeData).error?.issues;
      toast.error(errors?.[0]?.message || "Validation failed");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/trade/open`,
        tradeData,
      );
      if (res.data.status === 201) {
        toast.success("Order placed Successfully!");
        setOrderData({
          fees: 0,
          leverage: 10,
          margin: 0,
          swap: 0,
          pipValue: 0,
          volume: 0,
          totalCost: 0,
          totalPrice: 0,
        });
      }
    } catch (error) {
      toast.error("Failed to place Order!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md bg-zinc-950 border border-zinc-900 rounded-2xl shadow-xl overflow-hidden font-sans p-5 space-y-4">
      {/* Swap Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-zinc-400 font-semibold text-sm">Swap to:</span>
          <div className="bg-zinc-900 p-0.5 rounded-lg flex gap-1 border border-zinc-800">
            <button
              onClick={() => setSide("buy")}
              className={cn(
                "px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer",
                side === "buy"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200",
              )}
            >
              Crypto
            </button>
            <button
              onClick={() => setSide("sell")}
              className={cn(
                "px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer",
                side === "sell"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200",
              )}
            >
              Fiat
            </button>
          </div>
        </div>
        
        {/* Right side controls */}
        <div className="flex items-center gap-2.5 text-zinc-400">
          <svg className="w-4.5 h-4.5 cursor-pointer hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <svg className="w-4.5 h-4.5 cursor-pointer hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <svg className="w-4.5 h-4.5 cursor-pointer hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 10.742l5.176-2.588M12 12V3m0 9v9m0-9a3 3 0 110-6 3 3 0 010 6zm0 0a3 3 0 110 6 3 3 0 010-6z" />
          </svg>
          <svg className="w-4.5 h-4.5 cursor-pointer hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </div>
      </div>

      <p className="text-zinc-500 text-xs font-medium">
        Buy or sell any token instantly at the best price
      </p>

      {/* Search Input Bar */}
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <Input
          placeholder='Try typing "10 ETH to BTC"'
          className="bg-zinc-900/40 border-zinc-900 focus-visible:ring-zinc-800 text-zinc-300 placeholder-zinc-600 pl-9 pr-14 text-xs h-9 rounded-lg"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-zinc-600 font-mono font-bold">
          Ctrl+K
        </span>
      </div>

      {/* Token Boxes Container */}
      <div className="relative space-y-1.5">
        {/* Token Box 1 */}
        <div className="bg-zinc-900/30 border border-zinc-900 p-4 rounded-xl flex items-center justify-between">
          <div>
            <input
              type="number"
              value={orderData.volume || ""}
              onChange={(e) =>
                setOrderData((prev) => ({
                  ...prev,
                  volume: Number(e.target.value || 0),
                }))
              }
              placeholder="0"
              className="bg-transparent border-none focus:outline-none text-white text-xl font-bold font-mono w-full"
            />
            <span className="text-[10px] text-zinc-500 font-mono font-medium">
              ~${(orderData.volume * assetPrice).toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span className="text-[10px] text-zinc-500 flex items-center gap-1 font-semibold">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              0
            </span>
            <button className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs px-2.5 py-1.5 rounded-lg border border-zinc-800 flex items-center gap-1 cursor-pointer">
              <span className="w-4 h-4 bg-zinc-800 rounded-full flex items-center justify-center font-bold text-[8px] border border-zinc-700">
                {selectedCurrency[0]}
              </span>
              {selectedCurrency.replace("USDT", "")}
              <span className="text-[8px] text-zinc-400 font-bold">▼</span>
            </button>
          </div>
        </div>

        {/* Swapper Circle Icon */}
        <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 z-10">
          <button className="w-8 h-8 bg-zinc-950 border border-zinc-900 rounded-full flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer hover:border-zinc-800 transition-all shadow-md">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 12l-4-4m4 4l4-4m6-4v12m0-12l4 4m-4-4l-4 4" />
            </svg>
          </button>
        </div>

        {/* Token Box 2 */}
        <div className="bg-zinc-900/30 border border-zinc-900 p-4 rounded-xl flex items-center justify-between">
          <div>
            <div className="text-white text-xl font-bold font-mono">
              {(orderData.volume * assetPrice).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
            </div>
            <span className="text-[10px] text-zinc-500 font-mono font-medium">
              ~${(orderData.volume * assetPrice).toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span className="text-[10px] text-zinc-500 flex items-center gap-1 font-semibold">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              0
            </span>
            <button className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs px-2.5 py-1.5 rounded-lg border border-zinc-800 flex items-center gap-1 cursor-pointer">
              <span className="w-4 h-4 bg-teal-500/20 rounded-full flex items-center justify-center font-bold text-[8px] text-teal-400 border border-teal-500/30">
                $
              </span>
              USDT
              <span className="text-[8px] text-zinc-400 font-bold">▼</span>
            </button>
          </div>
        </div>
      </div>

      {/* Helper conversion rate */}
      <div className="flex items-center justify-between text-[11px] px-1 font-mono">
        <div className="flex items-center gap-1 text-zinc-500">
          <svg className="w-3 h-3 animate-spin text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 15H19" />
          </svg>
          <span>1 {selectedCurrency.replace("USDT", "")} = {assetPrice.toLocaleString()} USDT</span>
        </div>
        <svg className="w-3 h-3 text-zinc-500 cursor-pointer hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 15H19" />
        </svg>
      </div>

      {/* Slippage & Alert Controls */}
      <div className="flex items-center justify-between text-[10px] text-zinc-400 px-1 pt-1 font-medium">
        <div className="flex items-center gap-1">
          <span>Max Slippage</span>
          <svg className="w-3 h-3 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-zinc-300 font-bold ml-1 cursor-pointer">0.5% ▼</span>
        </div>
        <button className="flex items-center gap-1 text-zinc-400 hover:text-white cursor-pointer font-bold">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          Price Alert
        </button>
      </div>

      {/* Routing strategy tabs */}
      <div className="grid grid-cols-2 gap-2 bg-zinc-900/30 p-1 rounded-xl border border-zinc-900/60">
        <button className="bg-indigo-600 text-white py-2.5 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-indigo-950/20">
          <span className="w-3.5 h-3.5 bg-white/20 rounded-full flex items-center justify-center text-[8px] font-bold">
            $
          </span>
          Maximum Return
        </button>
        <button className="text-zinc-500 hover:text-zinc-400 py-2.5 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1.5 cursor-pointer">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          Lowest Gas
        </button>
      </div>

      {/* Expandable Information */}
      <div className="bg-zinc-900/20 border border-zinc-900/50 rounded-xl p-3 text-[10px] space-y-2">
        <div className="flex items-center justify-between text-zinc-500 font-bold border-b border-zinc-900 pb-1.5 uppercase tracking-wider">
          <span>More Information</span>
          <span className="cursor-pointer">▲</span>
        </div>
        <div className="flex items-center justify-between text-zinc-400">
          <span className="flex items-center gap-1">
            Minimum Received
            <svg className="w-3 h-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <span className="font-mono text-zinc-200">
            {(orderData.volume * assetPrice * 0.995).toLocaleString(undefined, { maximumFractionDigits: 2 })} USDT
          </span>
        </div>
        <div className="flex items-center justify-between text-zinc-400">
          <span className="flex items-center gap-1">
            Gas Fee
            <svg className="w-3 h-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <span className="font-mono text-zinc-200">$16.34</span>
        </div>
        <div className="flex items-center justify-between text-zinc-400">
          <span className="flex items-center gap-1">
            Price Impact
            <svg className="w-3 h-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <span className="font-mono text-zinc-200">&lt; 0.01%</span>
        </div>
      </div>

      {/* Connect Wallet Action Button */}
      <Button
        onClick={openTrade}
        disabled={loading}
        className="w-full py-6 bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-bold text-sm tracking-wide rounded-xl border-none cursor-pointer shadow-lg shadow-indigo-950/20 active:scale-98 transition-all uppercase"
      >
        {loading ? <Spinner /> : `Swap / Place Position`}
      </Button>
    </div>
  );
};

export default TradingPanel;
