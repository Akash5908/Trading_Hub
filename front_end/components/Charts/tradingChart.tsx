"use client";
import {
  AreaSeries,
  createChart,
  ColorType,
  CandlestickSeries,
} from "lightweight-charts";
import React, { useEffect, useRef, useState } from "react";

interface chartData {
  // date?: Date;
  time: string;
  open: number;
  close: number;
  low: number;
  high: number;
}

export const ChartComponent = (props) => {
  const {
    data,
    colors: {
      backgroundColor = "white",
      lineColor = "#2962FF",
      textColor = "black",
      areaTopColor = "#2962FF",
      areaBottomColor = "rgba(41, 98, 255, 0.28)",
    } = {},
  } = props;

  const chartContainerRef = useRef();
  const [chartData, setChartData] = useState<chartData>();

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      width: 1200,
      height: 600,
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });
    console.log("newSeries", data);
    newSeries.setData(data);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [
    data,
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
  ]);

  return <div ref={chartContainerRef} />;
};

// {
//     "e": "kline",
//     "E": 1764403000038,
//     "s": "BTCUSDT",
//     "k": {
//         "t": 1764402960000,
//         "T": 1764403019999,
//         "s": "BTCUSDT",
//         "i": "1m",
//         "f": 5580993125,
//         "L": 5580995354,
//         "o": "90499.98000000",
//         "c": "90567.40000000",
//         "h": "90567.40000000",
//         "l": "90499.98000000",
//         "v": "7.71688000",
//         "n": 2230,
//         "x": false,
//         "q": "698576.68616690",
//         "V": "6.60797000",
//         "Q": "598201.83413260",
//         "B": "0"
//     }
// }
const initialData = [
  { open: 10, high: 10.63, low: 9.49, close: 9.55, time: 1642427876 },
  { open: 9.55, high: 10.3, low: 9.42, close: 9.94, time: 1642427878 },
  { open: 9.94, high: 10.17, low: 9.92, close: 9.78, time: 1642600676 },
  { open: 9.78, high: 10.59, low: 9.18, close: 9.51, time: 1642687076 },
  { open: 9.51, high: 10.46, low: 9.1, close: 10.17, time: 1642773476 },
  { open: 10.17, high: 10.96, low: 10.16, close: 10.47, time: 1642859876 },
  { open: 10.47, high: 11.39, low: 10.4, close: 10.81, time: 1642946276 },
  { open: 10.81, high: 11.6, low: 10.3, close: 10.75, time: 1643032676 },
  { open: 10.75, high: 11.6, low: 10.49, close: 10.93, time: 1643119076 },
  { open: 10.93, high: 11.53, low: 10.76, close: 10.96, time: 1643205476 },
];

export function Chart(props: { data: chartData }) {
  const data = props.data;
  return <ChartComponent data={data}></ChartComponent>;
}
