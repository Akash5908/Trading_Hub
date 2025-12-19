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

export function Chart(props: { data: chartData }) {
  const data = props.data;
  return <ChartComponent data={data}></ChartComponent>;
}
