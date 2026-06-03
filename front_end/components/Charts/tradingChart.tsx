"use client";
import {
  createChart,
  ColorType,
  AreaSeries,
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
    colors: {
      backgroundColor = "#09090b",
      textColor = "#a1a1aa",
      lineColor = "#8b5cf6",
      areaTopColor = "rgba(139, 92, 246, 0.22)",
      areaBottomColor = "rgba(139, 92, 246, 0.0)",
    } = {},
  } = props;

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Area"> | null>(null);
  const lastDataHashRef = useRef<string>("");

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
        fontFamily: "Outfit, sans-serif",
      },
      grid: {
        vertLines: { color: "rgba(63, 63, 70, 0.08)" },
        horzLines: { color: "rgba(63, 63, 70, 0.08)" },
      },
      width: chartContainerRef.current.clientWidth || 700,
      height: 320,
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
        borderVisible: false,
      },
      rightPriceScale: {
        borderVisible: false,
      },
    });
    chart.timeScale().fitContent();

    const series = chart.addSeries(AreaSeries, {
      lineColor,
      topColor: areaTopColor,
      bottomColor: areaBottomColor,
      lineWidth: 2,
      priceFormat: {
        type: "price",
        precision: 2,
        minMove: 0.01,
      },
    });

    const sortedData = [...data]
      .sort((a, b) => Number(a.time) - Number(b.time))
      .filter(
        (item, index, arr) => index === 0 || arr[index - 1].time !== item.time,
      )
      .map((item) => ({
        time: item.time,
        value: item.close,
      }));
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
      )
      .map((item) => ({
        time: item.time,
        value: item.close,
      }));

    const firstTime = Number(sortedData[0]?.time) || 0;
    const dataHash = `${firstTime}-${sortedData.length}`;
    
    if (dataHash === lastDataHashRef.current) {
      const lastPoint = sortedData[sortedData.length - 1];
      const lastPointTime = Number(lastPoint.time);
      const currentSeriesData = seriesRef.current.data();
      
      if (currentSeriesData.length > 0) {
        const lastSeriesPoint = currentSeriesData[currentSeriesData.length - 1];
        const lastSeriesTime = Number(lastSeriesPoint.time);
        
        if (lastPointTime >= lastSeriesTime) {
          seriesRef.current.update(lastPoint);
        }
      }
    } else {
      seriesRef.current.setData(sortedData);
      chartRef.current?.timeScale().fitContent();
      lastDataHashRef.current = dataHash;
    }
  }, [data]);

  return <div ref={chartContainerRef} className="w-full" />;
};

export function Chart(props: { data: chartData[] }) {
  return <ChartComponent data={props.data} />;
}
