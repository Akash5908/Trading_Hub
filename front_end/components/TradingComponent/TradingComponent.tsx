"use client";
import { useRef, useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

interface tradeProps {
  pair: string;
  price: number;
  quantity: number;
  tradeTime: number;
  side: boolean;
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
  const MenuArray = ["Price (USD)", "Trade (ID)", `Total (${assets[asset]})`];
  const ws = useRef<WebSocket>(null);
  const [tradeData, setTradeData] = useState<tradeProps[]>([]);
  const TradingRef = useRef<tradeProps[]>([]);
  const tradeArray = [];

  useEffect(() => {
    if (asset === "BTCUSDT") {
      ws.current = new WebSocket("wss://stream.binance.com/ws/btcusdt@trade");
    } else if (asset === "SOLUSDT") {
      ws.current = new WebSocket("wss://stream.binance.com/ws/solusdt@trade");
    } else {
      ws.current = new WebSocket("wss://stream.binance.com/ws/ethusdt@trade");
    }

    ws.current.onopen = (wss) => {
      ws.current!.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);

        setTradeData((prevData) =>
          [
            {
              pair: parsedData.s,
              price: Math.round(parsedData.p * 100) / 100,
              quantity: parsedData.q,
              tradeTime: parsedData.T,
              side: parsedData.m,
              tradeId: parsedData.t,
            },
            ...prevData,
          ].slice(0, 100)
        );
      };
    };
  }, [tradeData]);

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="flex flex-col w-full max-w-7xl mx-auto p-6 gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Live Trading Terminal
              </h1>
              <p className="text-sm text-slate-400">
                {assets[asset]}/USDT Market Stream
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700/50">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-slate-300">Live</span>
          </div>
        </div>

        {/* Trading Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Buy Orders */}
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800/50 overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-b border-emerald-500/20 p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                </div>
                <h2 className="text-lg font-bold text-white">Buy Orders</h2>
              </div>
              <div className="grid grid-cols-3 gap-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {MenuArray.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
            <div className="overflow-y-auto h-[calc(100vh-280px)] custom-scrollbar">
              <div className="p-2 space-y-1">
                {tradeData
                  .filter((fil) => fil.side === false)
                  .map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-3 gap-4 p-3 bg-emerald-500/5 hover:bg-emerald-500/10 rounded-lg border border-emerald-500/10 transition-all duration-200 animate-fade-in"
                    >
                      <span className="text-emerald-400 font-mono font-semibold text-sm">
                        ${item.price.toLocaleString()}
                      </span>
                      <span className="text-slate-300 font-mono text-sm">
                        #{item.tradeId}
                      </span>
                      <span className="text-slate-400 font-mono text-sm">
                        {parseFloat(item.quantity.toString()).toFixed(5)}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Sell Orders */}
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800/50 overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-rose-500/10 to-red-500/10 border-b border-rose-500/20 p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-rose-500/20 rounded-lg flex items-center justify-center">
                  <TrendingDown className="w-4 h-4 text-rose-400" />
                </div>
                <h2 className="text-lg font-bold text-white">Sell Orders</h2>
              </div>
              <div className="grid grid-cols-3 gap-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {MenuArray.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
            <div className="overflow-y-auto h-[calc(100vh-280px)] custom-scrollbar">
              <div className="p-2 space-y-1">
                {tradeData
                  .filter((fil) => fil.side === true)
                  .map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-3 gap-4 p-3 bg-rose-500/5 hover:bg-rose-500/10 rounded-lg border border-rose-500/10 transition-all duration-200 animate-fade-in"
                    >
                      <span className="text-rose-400 font-mono font-semibold text-sm">
                        ${item.price.toLocaleString()}
                      </span>
                      <span className="text-slate-300 font-mono text-sm">
                        #{item.tradeId}
                      </span>
                      <span className="text-slate-400 font-mono text-sm">
                        {parseFloat(item.quantity.toString()).toFixed(5)}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.3);
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(71, 85, 105, 0.5);
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(71, 85, 105, 0.7);
        }
      `}</style>
    </div>
  );
};

export default TradingComponent;
