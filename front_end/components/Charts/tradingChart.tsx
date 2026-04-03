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
    colors: { backgroundColor = "white", textColor = "black" } = {},
  } = props;

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const lastDataHashRef = useRef<string>("");
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
        secondsVisible: false,
        tickMarkFormatter: (time: number) => {
          const date = new Date(time * 1000);
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

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!seriesRef.current || data.length === 0) return;

    const sortedData = [...data]
      .sort((a, b) => Number(a.time) - Number(b.time))
      .filter(
        (item, index, arr) => index === 0 || arr[index - 1].time !== item.time,
      );

    const firstTime = Number(sortedData[0]?.time) || 0;
    const dataHash = `${firstTime}-${sortedData.length}`;
    
    if (dataHash === lastDataHashRef.current) {
      const lastCandle = sortedData[sortedData.length - 1];
      const lastCandleTime = Number(lastCandle.time);
      const currentSeriesData = seriesRef.current.data();
      
      if (currentSeriesData.length > 0) {
        const lastSeriesCandle = currentSeriesData[currentSeriesData.length - 1];
        const lastSeriesTime = Number(lastSeriesCandle.time);
        
        if (lastCandleTime > lastSeriesTime) {
          seriesRef.current.update(lastCandle);
        } else if (lastCandleTime === lastSeriesTime) {
          seriesRef.current.update(lastCandle);
        }
      }
    } else {
      seriesRef.current.setData(sortedData);
      chartRef.current?.timeScale().fitContent();
      lastDataHashRef.current = dataHash;
    }
  }, [data]);

  return <div ref={chartContainerRef} />;
};

export function Chart(props: { data: chartData[] }) {
  return <ChartComponent data={props.data} />;
}
