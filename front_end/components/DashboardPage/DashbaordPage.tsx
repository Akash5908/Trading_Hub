"use client";
import React, { useEffect, useRef, useState } from "react";
import { Chart } from "@/components/Charts/tradingChart";
import { Button } from "@/components/ui/button";
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
import { FetchBtcTrade } from "@/lib/fetch";

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
  const [selectedCurrency, setSelectedCurrency] = React.useState("BTCUSDT");

  function FormatedDate(value: string): formatedDateType {
    const date = new Date(value).toISOString().slice(0, 10);
    const time = new Date(value).toTimeString();
    return { date, time };
  }

  // useEffect(() => {
  //   ws.current = new WebSocket("ws://localhost:8080");
  //   ws.current.onopen = (event) => {
  //     console.log(`Connected: WebSocket Server!!`, event);
  //     ws.current.onmessage = (event: any) => {
  //       const parsedData = JSON.parse(event.data);
  //       const formatedDate = FormatedDate(parsedData.k.T);

  //       // setChartData((prevData) => [
  //       //   ...prevData,
  //       //   {
  //       //     date: formatedDate.date,
  //       //     time: formatedDate.date,
  //       //     open: parsedData.k.o,
  //       //     close: parsedData.k.c,
  //       //     high: parsedData.k.h,
  //       //     low: parsedData.k.l,
  //       //   },
  //       // ]);
  //       console.log(chartData);
  //       if (parsedData.k.x === true) {
  //         const k = parsedData.k; // shorter alias

  //         const labeled = {
  //           // Binance k.t is ms; most chart libs want seconds
  //           time: Math.floor(k.t / 1000),
  //           open: parseFloat(k.o),
  //           high: parseFloat(k.h),
  //           low: parseFloat(k.l),
  //           close: parseFloat(k.c),
  //           volume: parseFloat(k.v),
  //           closeTime: k.T,
  //           quoteVolume: parseFloat(k.q),
  //           tradeCount: k.n,
  //         };

  //         setChartData((prevData) => [
  //           ...prevData,
  //           {
  //             time: labeled.time,
  //             open: labeled.open,
  //             high: labeled.high,
  //             low: labeled.low,
  //             close: labeled.close,
  //           },
  //         ]);
  //       }
  //     };
  //   }
  // }, []);

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

  return (
    <div className=" flex justify-center items-center h-screen">
      <div className="flex flex-col  ">
        {/* Dropdown to select the Crypto */}
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Select Currency</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Selected Currency</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={selectedCurrency}
                onValueChange={setSelectedCurrency}
              >
                <DropdownMenuRadioItem value="BTCUSDT">
                  BTC
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="SOLUSDT">
                  SOL
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="ETHUSDT">
                  ETHEREUM
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="space-x-2 my-3">
          {chartData.length > 2 && <Chart data={chartData} />}
          <Button onClick={HandleSubscribe}>
            {isConnected ? "Unsubscribe" : "Subscribe"}
          </Button>

          <Button onClick={HandleTrades}>Open Trade</Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
