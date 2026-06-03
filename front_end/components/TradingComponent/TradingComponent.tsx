"use client";
import { useRef, useEffect, useState } from "react";
import { Activity } from "lucide-react";

interface tradeProps {
  pair: string;
  price: number;
  quantity: number;
  tradeTime: number;
  side: boolean; // false = buy (green), true = sell (red)
  tradeId: number;
}

const assets: { SOLUSDT: string; BTCUSDT: string; ETHUSDT: string } = {
  BTCUSDT: "BTC",
  SOLUSDT: "SOL",
  ETHUSDT: "ETH",
};

const TradingComponent = ({
  asset,
}: {
  asset: "SOLUSDT" | "BTCUSDT" | "ETHUSDT";
}) => {
  const ws = useRef<WebSocket | null>(null);
  const [tradeData, setTradeData] = useState<tradeProps[]>([]);

  useEffect(() => {
    const wsUrl = `wss://stream.binance.com/ws/${asset.toLowerCase()}@trade`;
    ws.current = new WebSocket(wsUrl);

    ws.current.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        setTradeData((prevData) =>
          [
            {
              pair: parsedData.s,
              price: Math.round(parsedData.p * 100) / 100,
              quantity: parsedData.q,
              tradeTime: parsedData.T,
              side: parsedData.m, // true if buyer is maker (sell), false if buyer is taker (buy)
              tradeId: parsedData.t,
            },
            ...prevData,
          ].slice(0, 50),
        );
      } catch (err) {
        console.error("Error parsing Binance stream data:", err);
      }
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [asset]);

  return (
    <div className="w-full bg-zinc-950/20 rounded-xl border border-zinc-900/50 p-4 font-sans mt-4">
      <div className="flex flex-col w-full gap-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center border border-zinc-800">
              <Activity className="w-4 h-4 text-indigo-500" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                Live Market Trades
              </h3>
              <p className="text-[10px] text-zinc-500 font-medium">
                Real-time {assets[asset]}/USDT transactions
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 bg-zinc-900/60 rounded-md border border-zinc-800">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-semibold text-zinc-400">Live Stream</span>
          </div>
        </div>

        {/* Trade Stream Table */}
        <div className="w-full">
          <div className="grid grid-cols-3 gap-4 text-[10px] font-bold text-zinc-500 uppercase tracking-wider px-2 pb-2">
            <span>Price (USD)</span>
            <span>Quantity ({assets[asset]})</span>
            <span className="text-right">Time</span>
          </div>
          <div className="overflow-y-auto h-[200px] custom-scrollbar space-y-0.5 pr-1">
            {tradeData.length === 0 ? (
              <div className="text-center py-10 text-xs text-zinc-600">
                Waiting for trade data...
              </div>
            ) : (
              tradeData.map((item, index) => {
                const timeString = new Date(item.tradeTime).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                });
                return (
                  <div
                    key={index}
                    className="grid grid-cols-3 gap-4 p-2 bg-zinc-900/10 hover:bg-zinc-900/30 rounded border border-zinc-900/30 transition-all duration-150 animate-fade-in"
                  >
                    <span
                      className={`font-mono font-bold text-xs ${
                        item.side ? "text-rose-500" : "text-emerald-500"
                      }`}
                    >
                      ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-zinc-300 font-mono text-xs">
                      {parseFloat(item.quantity.toString()).toFixed(5)}
                    </span>
                    <span className="text-zinc-500 font-mono text-xs text-right">
                      {timeString}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-2px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(63, 63, 70, 0.4);
          border-radius: 2px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(63, 63, 70, 0.6);
        }
      `}</style>
    </div>
  );
};

export default TradingComponent;
