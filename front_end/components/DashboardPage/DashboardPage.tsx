"use client";
import React, { useEffect, useRef, useState } from "react";
import { Chart } from "@/components/Charts/tradingChart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hook";
import { FetchBtcTrade, FetchEthTrade, FetchSolTrade } from "@/lib/fetch";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import { Time } from "lightweight-charts";
import TradingComponent from "../TradingComponent/TradingComponent";
import TradingPanel from "../TradePanel/TradePanel";
import OrdersPage from "../OrdersPage/OrdersPage";

// 1. FIXED: Changed time from string to number to satisfy the Chart component types
interface chartProps {
  date?: string;
  time: Time;
  open: number;
  close: number;
  low: number;
  high: number;
}

type chartData = chartProps[];

interface formatedDateType {
  date: string;
  time: string;
}

const DashboardPage = () => {
  const ws = useRef<WebSocket | null>(null);
  const router = useRouter();
  const user = useAppSelector((state) => state.user);
  const [isConnected, setIsConnected] = useState(false);
  const [chartData, setChartData] = useState<chartProps[]>([]);
  const [livePrice, setLivePrice] = useState<number>(0);
  const [selectedCurrency, setSelectedCurrency] = useState<
    "SOLUSDT" | "BTCUSDT" | "ETHUSDT"
  >("BTCUSDT");
  const [isLoading, setIsLoading] = useState(false);
  const chartDataRef = useRef<chartProps[]>([]);
  const currencyRef = useRef(selectedCurrency);

  useEffect(() => {
    currencyRef.current = selectedCurrency;
  }, [selectedCurrency]);

  function FormatedDate(value: number | string): formatedDateType {
    const date = new Date(value).toISOString().slice(0, 10);
    const time = new Date(value).toTimeString();
    return { date, time };
  }

  useEffect(() => {
    async function fetchData(currency: string) {
      setIsLoading(true);
      let klines: any[] = [];

      if (currency === "BTCUSDT") {
        klines = await FetchBtcTrade("1m");
      } else if (currency === "SOLUSDT") {
        klines = await FetchSolTrade("1m");
      } else if (currency === "ETHUSDT") {
        klines = await FetchEthTrade("1m");
      }

      if (klines && klines.length > 0) {
        const formattedData: chartData = klines.map((item: any) => ({
          time: Number(item.time) as Time,
          open: Number(item.open),
          high: Number(item.high),
          low: Number(item.low),
          close: Number(item.close),
        }));
        // console.log("Formated data", formattedData);
        setChartData(formattedData);
      } else {
        setChartData([]);
      }
      setIsLoading(false);
    }

    fetchData(selectedCurrency);
  }, [selectedCurrency]);

  useEffect(() => {
    chartDataRef.current = chartData;
  }, [chartData]);

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 5;

    function connectWebSocket() {
      const wsUrl = process.env.NEXT_PUBLIC_ENGINE_URL || "ws://localhost:5002";
      console.log("🔌 Connecting to WebSocket:", wsUrl);
      const socket = new WebSocket(wsUrl);

      socket.onopen = () => {
        console.log("✅ Connected to Engine WebSocket");
        setIsConnected(true);
        retryCount = 0;
      };

      socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          const currentCurrency = currencyRef.current;
          // console.log(message);
          const currencyMap: Record<string, string> = {
            BTC_LIVE: "BTCUSDT",
            SOL_LIVE: "SOLUSDT",
            ETH_LIVE: "ETHUSDT",
          };

          const msgCurrency = currencyMap[message.type];
          if (!msgCurrency || msgCurrency !== currentCurrency) return;

          if (message.type.endsWith("_LIVE")) {
            setLivePrice(message.data.close);

            const liveData = message.data;
            const liveTime = liveData.time;

            setChartData((prev) => {
              if (prev.length === 0) return prev;
              const updated = [...prev];
              const lastIndex = updated.length - 1;
              const lastTime = Number(updated[lastIndex].time);

              if (lastTime === liveTime) {
                updated[lastIndex] = {
                  time: liveTime as Time,
                  open: liveData.open,
                  high: Math.max(liveData.high, updated[lastIndex].high),
                  low: Math.min(liveData.low, updated[lastIndex].low),
                  close: liveData.close,
                };
              } else if (liveTime > lastTime) {
                updated.push({
                  time: liveTime as Time,
                  open: liveData.open,
                  high: liveData.high,
                  low: liveData.low,
                  close: liveData.close,
                });
              }
              return updated;
            });
          }
        } catch (err) {
          console.error("WebSocket message error:", err);
        }
      };

      socket.onclose = () => {
        console.log("❌ Engine WebSocket disconnected");
        setIsConnected(false);
        ws.current = null;

        if (retryCount < maxRetries) {
          retryCount++;
          console.log(`Reconnecting in 2s... (attempt ${retryCount})`);
          setTimeout(connectWebSocket, 2000);
        }
      };

      socket.onerror = (event) => {
        console.error(
          "WebSocket error:",
          event.type,
          (event.target as WebSocket)?.readyState,
        );
      };

      ws.current = socket;
    }

    connectWebSocket();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  // console.log("ChartData", chartData);
  async function HandleTrades() {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/trade/open`,
      {
        userId: user.id,
      },
    );

    console.log(res);
  }

  function HandleSubscribe() {
    if (!ws.current) return;
    ws.current.send(
      JSON.stringify({ type: isConnected ? "Unsubscribe" : "Subscribe" }),
    );
    setIsConnected((prev) => !prev);
  }

  const currentPrice =
    chartData.length > 0 ? chartData[chartData.length - 1]?.close : livePrice;
  const previousPrice =
    chartData.length > 1
      ? chartData[chartData.length - 2]?.close
      : currentPrice;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercent =
    previousPrice && previousPrice > 0
      ? (priceChange / previousPrice) * 100
      : 0;
  const isPositive = priceChange >= 0;

  const getCurrencyName = (currency: string) => {
    switch (currency) {
      case "BTCUSDT":
        return "Bitcoin";
      case "ETHUSDT":
        return "Ethereum";
      case "SOLUSDT":
        return "Solana";
      default:
        return currency;
    }
  };

  const getCurrencySymbol = (currency: string) => {
    switch (currency) {
      case "BTCUSDT":
        return "BTC";
      case "ETHUSDT":
        return "ETH";
      case "SOLUSDT":
        return "SOL";
      default:
        return currency;
    }
  };

  return (
    <div className="min-h-screen dark bg-[#09090b] text-zinc-100 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl my-[8vh]">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white">
              Crypto Trading Dashboard
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              Real-time cryptocurrency market data and analysis
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="h-7 w-7 text-indigo-500 animate-pulse" />
            <span className="text-lg font-medium text-zinc-400">
              Live Market
            </span>
          </div>
        </div>

        <Card className="border-zinc-900 bg-zinc-950/40 backdrop-blur-md mb-6">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="lg"
                      className="min-w-[140px] font-semibold bg-zinc-900/50 border-zinc-800 text-zinc-100 hover:bg-zinc-800 hover:text-white"
                    >
                      {getCurrencySymbol(selectedCurrency)}
                      <svg
                        className="ml-2 h-4 w-4 text-zinc-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-zinc-950 border border-zinc-900 text-zinc-100">
                    <DropdownMenuLabel className="text-zinc-400">
                      Select Currency
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-zinc-900" />
                    <DropdownMenuRadioGroup
                      value={selectedCurrency}
                      onValueChange={(value: string) =>
                        setSelectedCurrency(
                          value as "SOLUSDT" | "BTCUSDT" | "ETHUSDT",
                        )
                      }
                    >
                      <DropdownMenuRadioItem
                        value="BTCUSDT"
                        className="cursor-pointer focus:bg-zinc-900 focus:text-white text-zinc-300"
                      >
                        <div className="flex flex-col">
                          <span className="font-semibold">Bitcoin</span>
                          <span className="text-xs text-zinc-500">
                            BTC/USDT
                          </span>
                        </div>
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem
                        value="ETHUSDT"
                        className="cursor-pointer focus:bg-zinc-900 focus:text-white text-zinc-300"
                      >
                        <div className="flex flex-col">
                          <span className="font-semibold">Ethereum</span>
                          <span className="text-xs text-zinc-500">
                            ETH/USDT
                          </span>
                        </div>
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem
                        value="SOLUSDT"
                        className="cursor-pointer focus:bg-zinc-900 focus:text-white text-zinc-300"
                      >
                        <div className="flex flex-col">
                          <span className="font-semibold">Solana</span>
                          <span className="text-xs text-zinc-500">
                            SOL/USDT
                          </span>
                        </div>
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>

                <span className="px-3 py-2 bg-zinc-900/60 text-zinc-300 border border-zinc-800 rounded-md text-sm font-medium">
                  1m
                </span>

                {chartData.length > 0 && (
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wide">
                      {getCurrencyName(selectedCurrency)}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-2xl font-bold text-white">
                        $
                        {currentPrice.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                      <div
                        className={`flex items-center gap-1 text-sm font-semibold ${
                          isPositive ? "text-emerald-500" : "text-rose-500"
                        }`}
                      >
                        {isPositive ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        <span>
                          {isPositive ? "+" : ""}
                          {priceChangePercent.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {chartData.length > 0 && (
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-zinc-500 text-xs mb-1">High</p>
                    <p className="font-semibold text-zinc-200">
                      ${chartData[chartData.length - 1]?.high.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-zinc-500 text-xs mb-1">Low</p>
                    <p className="font-semibold text-zinc-200">
                      ${chartData[chartData.length - 1]?.low.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-zinc-500 text-xs mb-1">Open</p>
                    <p className="font-semibold text-zinc-200">
                      ${chartData[chartData.length - 1]?.open.toFixed(2)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardHeader>
        </Card>

        {chartData.length > 2 && (
          <Card className="border-zinc-900 bg-zinc-950/40 backdrop-blur-md overflow-hidden mb-6">
            <CardContent className="p-6">
              {isLoading && (
                <div className="text-center py-4 text-zinc-400">
                  Loading chart data...
                </div>
              )}
              
              {/* Responsive Dashboard Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 rounded-lg items-start">
                <div className="lg:col-span-2 bg-zinc-950/50 border border-zinc-900 rounded-xl p-4 flex flex-col">
                  {/* Premium Chart Header Block */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 pb-4 border-b border-zinc-900/60">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center font-bold text-sm text-zinc-100 border border-zinc-800">
                        {getCurrencySymbol(selectedCurrency)[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-lg tracking-tight">
                            {getCurrencySymbol(selectedCurrency)} / USDT
                          </span>
                          <span className="text-2xl font-bold text-zinc-100 ml-3">
                            ${currentPrice.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className={`font-semibold ${isPositive ? "text-emerald-400" : "text-rose-400"}`}>
                            {isPositive ? "+" : ""}{priceChangePercent.toFixed(2)}%
                          </span>
                          <span className="text-zinc-500">Past 24 hours</span>
                        </div>
                      </div>
                    </div>
                    {/* Interval selector */}
                    <div className="flex items-center gap-1 bg-zinc-900/40 p-1 rounded-lg border border-zinc-900">
                      {["1H", "4H", "1D", "1W", "1M", "6M"].map((interval) => (
                        <button
                          key={interval}
                          className={`px-2.5 py-1 text-xs font-semibold rounded transition-all cursor-pointer ${
                            interval === "1D"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : "text-zinc-400 hover:text-zinc-200"
                          }`}
                        >
                          {interval}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="h-[320px] w-full min-h-0">
                    <Chart data={chartData} />
                  </div>

                  {/* Live order stream logs placed directly below chart */}
                  <TradingComponent asset={selectedCurrency} />
                </div>
                <div className="flex justify-center w-full">
                  <TradingPanel
                    assetPrice={Number(currentPrice.toFixed(2))}
                    selectedCurrency={getCurrencySymbol(selectedCurrency)}
                    userBalance={user.userBalance ? user.userBalance : 0}
                    userName={user.username}
                  />
                </div>
              </div>

              {/* Orders panel  */}
              <div className="mt-6">
                <OrdersPage />
              </div>
            </CardContent>
          </Card>
        )}

        {chartData.length <= 2 && (
          <Card className="border-zinc-900 bg-zinc-950/40 backdrop-blur-md">
            <CardContent className="p-12">
              <div className="flex flex-col items-center justify-center text-center gap-4">
                <Activity className="h-12 w-12 text-zinc-600 animate-pulse" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    Loading Market Data
                  </h3>
                  <p className="text-sm text-zinc-500">
                    Fetching real-time cryptocurrency prices...
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
