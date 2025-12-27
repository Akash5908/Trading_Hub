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
import TradingComponent from "../TradingComponent/TradingComponent";
import TradingPanel from "../TradePanel/TradePanel";
import OrdersPage from "../OrdersPage/OrdersPage";

interface chartProps {
  date?: string;
  time?: number;
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
  const ws = useRef<WebSocket>();
  const router = useRouter();
  const user = useAppSelector((state) => state.user);
  const [isConnected, setIsConnected] = useState(false);
  const [chartData, setChartData] = useState<chartData>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<
    "SOLUSDT" | "BTCUSDT" | "ETHUSDT"
  >("BTCUSDT");

  function FormatedDate(value: string): formatedDateType {
    const date = new Date(value).toISOString().slice(0, 10);
    const time = new Date(value).toTimeString();
    return { date, time };
  }

  useEffect(() => {
    async function fetchData(selectedCurrency: string) {
      if (selectedCurrency === "BTCUSDT") {
        const klines = await FetchBtcTrade();
        setChartData([]);
        klines.map((item: chartProps) => {
          setChartData((prevData) => [
            ...prevData,
            {
              time: item.time,
              open: item.open,
              high: item.high,
              low: item.low,
              close: item.close,
            },
          ]);
        });
      }
      if (selectedCurrency === "SOLUSDT") {
        const klines = await FetchSolTrade();
        setChartData([]);
        klines.map((item: chartProps) => {
          setChartData((prevData) => [
            ...prevData,
            {
              time: item.time,
              open: item.open,
              high: item.high,
              low: item.low,
              close: item.close,
            },
          ]);
        });
      }
      if (selectedCurrency === "ETHUSDT") {
        const klines = await FetchEthTrade();
        setChartData([]);
        klines.map((item: chartProps) => {
          //Adding new trade, slice to keep only last 100 trade
          setChartData((prevData) => [
            ...prevData,
            {
              time: item.time,
              open: item.open,
              high: item.high,
              low: item.low,
              close: item.close,
            },
          ]);
        });
      }
    }
    fetchData(selectedCurrency);
  }, [selectedCurrency]);

  async function HandleTrades() {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/trade/open`,
      {
        userId: user.id,
      }
    );

    console.log(res);
  }

  function HandleSubscribe() {
    ws.current.send(
      JSON.stringify({ type: isConnected ? "Unsubscribe" : "Subscribe" })
    );
    setIsConnected((prev) => !prev);
  }

  const currentPrice =
    chartData.length > 0 ? chartData[chartData.length - 1]?.close : 0;
  const previousPrice =
    chartData.length > 1
      ? chartData[chartData.length - 2]?.close
      : currentPrice;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = previousPrice
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
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl my-[8vh]">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold tracking-tight text-foreground text-white">
              Crypto Trading Dashboard
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Real-time cryptocurrency market data and analysis
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="h-7 w-7 text-blue-600 animate-pulse" />
            <span className="text-lg font-medium text-muted-foreground">
              Live Market
            </span>
          </div>
        </div>

        <Card className="border-border bg-card mb-6">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="lg"
                      className="min-w-[140px] font-semibold bg-transparent"
                    >
                      {getCurrencySymbol(selectedCurrency)}
                      <svg
                        className="ml-2 h-4 w-4"
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
                  <DropdownMenuContent className="w-56 bg-popover">
                    <DropdownMenuLabel className="text-popover-foreground">
                      Select Currency
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                      value={selectedCurrency}
                      onValueChange={setSelectedCurrency}
                    >
                      <DropdownMenuRadioItem
                        value="BTCUSDT"
                        className="cursor-pointer"
                      >
                        <div className="flex flex-col">
                          <span className="font-semibold">Bitcoin</span>
                          <span className="text-xs text-muted-foreground">
                            BTC/USDT
                          </span>
                        </div>
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem
                        value="ETHUSDT"
                        className="cursor-pointer"
                      >
                        <div className="flex flex-col">
                          <span className="font-semibold">Ethereum</span>
                          <span className="text-xs text-muted-foreground">
                            ETH/USDT
                          </span>
                        </div>
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem
                        value="SOLUSDT"
                        className="cursor-pointer"
                      >
                        <div className="flex flex-col">
                          <span className="font-semibold">Solana</span>
                          <span className="text-xs text-muted-foreground">
                            SOL/USDT
                          </span>
                        </div>
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>

                {chartData.length > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      {getCurrencyName(selectedCurrency)}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-2xl font-bold text-foreground">
                        $
                        {currentPrice.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                      <div
                        className={`flex items-center gap-1 text-sm font-semibold ${
                          isPositive ? "text-accent" : "text-destructive"
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
                    <p className="text-muted-foreground text-xs mb-1">High</p>
                    <p className="font-semibold text-foreground">
                      ${chartData[chartData.length - 1]?.high.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Low</p>
                    <p className="font-semibold text-foreground">
                      ${chartData[chartData.length - 1]?.low.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Open</p>
                    <p className="font-semibold text-foreground">
                      ${chartData[chartData.length - 1]?.open.toFixed(2)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardHeader>
        </Card>

        {chartData.length > 2 && (
          <Card className="border-border bg-card overflow-hidden">
            <CardContent className="p-6 ">
              <div className=" flex flex-1/2  justify-center rounded-lg overflow-hidden">
                <Chart data={chartData} />

                <div>
                  <TradingPanel
                    assetPrice={Number(
                      chartData[chartData.length - 1]?.open.toFixed(2)
                    )}
                    selectedCurrency={getCurrencySymbol(selectedCurrency)}
                    userBalance={user.userBalance ? user.userBalance : 0}
                    userName={user.username}
                  />
                </div>
              </div>

              {/* Orders panel  */}
              <div>
                <OrdersPage />
              </div>

              {/* Ask/sell Trade section */}
              <div className="rounded-lg overflow-hidden my-4">
                <TradingComponent asset={selectedCurrency} />
              </div>
            </CardContent>
          </Card>
        )}

        {chartData.length <= 2 && (
          <Card className="border-border bg-card">
            <CardContent className="p-12">
              <div className="flex flex-col items-center justify-center text-center gap-4">
                <Activity className="h-12 w-12 text-muted-foreground animate-pulse" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    Loading Market Data
                  </h3>
                  <p className="text-sm text-muted-foreground">
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
