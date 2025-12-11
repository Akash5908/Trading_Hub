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

interface chartProps {
  date?: string;
  time?: string;
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
  const [isConnected, setIsConnected] = useState(false);
  const [chartData, setChartData] = useState<chartData>([]);
  const [selectedCurrency, setSelectedCurrency] = React.useState("BTCUSDT");

  function FormatedDate(value: string): formatedDateType {
    const date = new Date(value).toISOString().slice(0, 10);
    const time = new Date(value).toTimeString();
    return { date, time };
  }

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080");
    ws.current.onopen = (event) => {
      console.log(`Connected: WebSocket Server!!`, event);
      ws.current.onmessage = (event: any) => {
        const parsedData = JSON.parse(event.data);
        const formatedDate = FormatedDate(parsedData.k.T);

        // setChartData((prevData) => [
        //   ...prevData,
        //   {
        //     date: formatedDate.date,
        //     time: formatedDate.date,
        //     open: parsedData.k.o,
        //     close: parsedData.k.c,
        //     high: parsedData.k.h,
        //     low: parsedData.k.l,
        //   },
        // ]);
      };
    };
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `https://api.binance.com/api/v3/klines?symbol=${selectedCurrency}&interval=1d&limit=100`
        );
        const data = res.data;

        data.forEach((e) => {
          const kline = e;
          const labeled = {
            time: FormatedDate(kline[0]).date,
            open: parseFloat(kline[1]),
            high: parseFloat(kline[2]),
            low: parseFloat(kline[3]),
            close: parseFloat(kline[4]),
            volume: parseFloat(kline[5]),
            closeTime: kline[6],
            quoteVolume: parseFloat(kline[7]),
            tradeCount: kline[8],
          };
          setChartData((prevData) => [
            ...prevData,
            {
              time: labeled.time,
              open: labeled.open,
              close: labeled.close,
              high: labeled.high,
              low: labeled.low,
            },
          ]);
        });
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [selectedCurrency]);

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
        <div>
          {chartData.length > 2 && <Chart data={chartData} />}
          <Button onClick={HandleSubscribe}>
            {isConnected ? "Unsubscribe" : "Subscribe"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
