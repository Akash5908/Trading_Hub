"use client";
import {
  createChart,
  ColorType,
  CandlestickSeries,
  Time,
  IChartApi,
  ISeriesApi,
} from "lightweight-charts";
import React, { useEffect, useRef } from "react";

interface chartData {
  time: Time;
  open: number;
  close: number;
  low: number;
  high: number;
}

export const ChartComponent = (props: {
  data: chartData[];
  timeframe?: "1m" | "1s";
  colors?: {
    backgroundColor?: string;
    lineColor?: string;
    textColor?: string;
    areaTopColor?: string;
    areaBottomColor?: string;
  };
}) => {
  const {
    data,
    timeframe = "1m",
    colors: { backgroundColor = "white", textColor = "black" } = {},
  } = props;

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const lastCandleTimeRef = useRef<Time | null>(null);
  const windowWidth = typeof window !== "undefined" ? window.innerWidth : 800;

  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      width: windowWidth > 1000 ? 800 : 1200,
      height: 600,
      timeScale: {
        timeVisible: true,
        secondsVisible: timeframe === "1s",
        tickMarkFormatter: (time: number) => {
          const date = new Date(time * 1000);
          if (timeframe === "1s") {
            return date.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            });
          }
          return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });
        },
      },
    });
    chart.timeScale().fitContent();

    const series = chart.addSeries(CandlestickSeries, {
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    const sortedData = [...data]
      .sort((a, b) => Number(a.time) - Number(b.time))
      .filter(
        (item, index, arr) => index === 0 || arr[index - 1].time !== item.time,
      );
    series.setData(sortedData);

    chartRef.current = chart;
    seriesRef.current = series;
    lastCandleTimeRef.current = null;

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
      lastCandleTimeRef.current = null;
    };
  }, [timeframe]);

  useEffect(() => {
    console.log("[Chart] useEffect triggered, data length:", data.length, "seriesRef:", !!seriesRef.current);
    
    if (!seriesRef.current) {
      console.log("[Chart] seriesRef.current is null!");
      return;
    }
    
    if (data.length === 0) {
      console.log("[Chart] data is empty");
      return;
    }

    const sortedData = [...data]
      .sort((a, b) => Number(a.time) - Number(b.time))
      .filter(
        (item, index, arr) =>
          index === 0 || arr[index - 1].time !== item.time,
      );

    const lastCandle = sortedData[sortedData.length - 1];
    const lastCandleTime = Number(lastCandle.time);
    const currentSeriesData = seriesRef.current.data();
    console.log("[Chart] current series data length:", currentSeriesData.length, "lastCandleTime:", lastCandleTime);
    
    if (currentSeriesData.length === 0) {
      console.log("[Chart] setData called");
      seriesRef.current.setData(sortedData);
      chartRef.current?.timeScale().fitContent();
      lastCandleTimeRef.current = lastCandleTime;
    } else {
      const lastSeriesCandle = currentSeriesData[currentSeriesData.length - 1];
      const lastSeriesTime = Number(lastSeriesCandle.time);
      console.log("[Chart] lastSeriesTime:", lastSeriesTime);
      
      if (lastCandleTime > lastSeriesTime) {
        console.log("[Chart] update - new candle");
        seriesRef.current.update(lastCandle);
        lastCandleTimeRef.current = lastCandleTime;
      } else if (lastCandleTime === lastSeriesTime) {
        console.log("[Chart] update - same candle");
        seriesRef.current.update(lastCandle);
      } else {
        console.log("[Chart] Skipping - candle is older");
      }
    }
  }, [data]);

  return <div ref={chartContainerRef} />;
};

export function Chart(props: { data: chartData[]; timeframe?: "1m" | "1s" }) {
  return <ChartComponent data={props.data} timeframe={props.timeframe} />;
}
