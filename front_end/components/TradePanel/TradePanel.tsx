"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
interface OrderProps {
  fees: number;
  leverage: number;
  margin: number;
  swap: number;
  pipValue: number;
  volume: number;
}

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
  const [orderData, setOrderData] = useState<OrderProps>({
    fees: 1.25,
    leverage: 10,
    margin: 500,
    swap: 0.05,
    pipValue: 1.0,
    volume: 1000,
  });
  console.log("Selected Currency", selectedCurrency);
  const orderArray = [
    { label: "Fees", value: `$${orderData?.fees.toFixed(2)}` },
    { label: "Leverage", value: `${orderData?.leverage}x` },
    { label: "Margin", value: `$${orderData?.margin.toFixed(2)}` },
    { label: "Swap", value: `$${orderData?.swap.toFixed(2)}` },
    { label: "Pip Value", value: `$${orderData?.pipValue.toFixed(2)}` },
    { label: "Volume in Units", value: orderData?.volume.toLocaleString() },
  ];

  async function openTrade() {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/trade/open`,
        {
          asset: selectedCurrency,
          side: side,
          qty: orderData.volume,
          entryPrice: assetPrice,
          userName: userName,
        }
      );
      if (res.data.status === 201) {
        toast.success("Order placed Successfully!");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="w-full max-w-md bg-background border rounded-xl shadow-sm overflow-hidden font-sans">
      <div className="p-4 space-y-6">
        {/* Buy/Sell Tabs */}
        <div className="grid grid-cols-2 gap-2 bg-muted p-1 rounded-lg">
          <button
            onClick={() => setSide("buy")}
            className={cn(
              "py-2 text-sm font-medium rounded-md transition-all",
              side === "buy"
                ? "bg-background shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Buy
          </button>
          <button
            onClick={() => setSide("sell")}
            className={cn(
              "py-2 text-sm font-medium rounded-md transition-all",
              side === "sell"
                ? "bg-background shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Sell
          </button>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {/* Order Type Tabs */}
          <Tabs defaultValue="market" className="w-full">
            <TabsList className="w-full grid grid-cols-4 bg-transparent h-auto p-0 gap-2">
              {["Market", "Limit", "Stop", "Stop Limit"].map((type) => (
                <TabsTrigger
                  key={type}
                  value={type.toLowerCase()}
                  className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary border rounded-md py-1.5 text-xs font-medium transition-colors"
                >
                  {type}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Volume Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label
                htmlFor="quantity"
                className="text-xs font-medium text-muted-foreground"
              >
                Quantity
              </Label>
              <span className="text-[10px] text-muted-foreground">Units</span>
            </div>
            <div className="relative">
              <Input
                id="quantity"
                type="number"
                value={orderData.volume}
                onChange={(e) =>
                  setOrderData({ ...orderData, volume: Number(e.target.value) })
                }
                placeholder="0.00"
                className="bg-muted/30 border-muted focus-visible:ring-primary pr-12 font-mono"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted-foreground">
                MAX
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="space-y-2.5 pt-2">
            {orderArray.map((item) => (
              <div
                key={item.label}
                className="flex justify-between items-center text-xs"
              >
                <span className="text-muted-foreground flex items-center gap-1">
                  {item.label}
                  <Info className="w-3 h-3 opacity-40" />
                </span>
                <span className="font-medium text-foreground">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="pt-4 space-y-2">
            <Button
              className={cn(
                "w-full py-6 text-base font-bold transition-all shadow-md",
                side === "buy"
                  ? "bg-primary hover:bg-primary/90"
                  : "bg-destructive hover:bg-destructive/90"
              )}
              onClick={openTrade}
            >
              Confirm {side === "buy" ? "Buy" : "Sell"}
            </Button>
            <Button
              variant="ghost"
              className="w-full text-muted-foreground hover:text-foreground text-xs"
            >
              Cancel Order
            </Button>
          </div>
        </form>
      </div>

      {/* Footer Info */}
      <div className="bg-muted/30 px-4 py-3 border-t flex justify-between items-center">
        <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
          Avbl. Balance
        </span>
        <span className="text-sm font-mono font-bold">${userBalance}</span>
      </div>
    </div>
  );
};

export default TradingPanel;
