"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { XCircle, TrendingUp, TrendingDown, RefreshCw } from "lucide-react";
import { toast } from "react-hot-toast";

interface OpenOrder {
  id: string;
  asset: "BTC" | "SOL" | "ETH";
  side: "buy" | "sell"; // long/short,
  kind?: string;
  qty: number;
  entryPrice: number;
  userName: string;
  positionValue?: number;
  currentPnl?: number;
}

const OrdersPage = () => {
  const ws = useRef<WebSocket | null>(null);
  const [openOrders, setOpenOrders] = useState<OpenOrder[]>([]);
  const [isClosing, setIsClosing] = useState<string | null>(null);

  useEffect(() => {
    const wsUrl = process.env.NEXT_PUBLIC_ENGINE_URL || "ws://localhost:5002";
    console.log("[OrdersPage] Connecting to WebSocket:", wsUrl);
    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      console.log("[OrdersPage] WebSocket connected");
    };

    if (ws.current) {
      ws.current.onmessage = (event: MessageEvent) => {
        console.log("order", JSON.stringify(event));
        try {
          const data = JSON.parse(event?.data);
          const type = data.type;
          const order = data.data;

          if (type === "open-orders") {
            console.log("Open-order", JSON.parse(event.data));
            setOpenOrders((prevData) => {
              if (prevData.some((o) => o.id === order.id)) return prevData;
              return [...prevData, order];
            });
          }
          if (type === "close-orders") {
            setOpenOrders((prevData) =>
              prevData.filter((o) => o.id !== order.id),
            );
          }

          if (type === "positions-update") {
            setOpenOrders((prevData) => {
              const prevIndex = prevData.findIndex((o) => o.id === order.id);
              if (prevIndex === -1) return prevData;
              return prevData.map((o, index) =>
                prevIndex === index
                  ? {
                      ...o,
                      currentPnl: order.currentPnl,
                      positionValue: order.positionValue,
                    }
                  : o,
              );
            });
          }
        } catch (error) {
          console.error("[OrdersPage] Error parsing websocket message:", error);
        }
      };

      ws.current.onerror = (event) => {
        console.error("[OrdersPage] WebSocket error:", event.type);
      };

      ws.current.onclose = () => {
        console.log("[OrdersPage] WebSocket closed");
      };
    }

    return () => {
      if (ws.current) ws.current.close();
    };
  }, []);

  async function closeTrade(id: string) {
    setIsClosing(id);
    try {
      console.log("[v0] Attempting to close trade:", id);
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/trade/close`, {
        id: id,
      });
      setOpenOrders((prev) => prev.filter((order) => order.id !== id));
      toast.success("Trade Closed Successfully!");
    } catch (error) {
      console.error("[v0] Error closing trade:", error);
      toast.error("Failed to Close Trade!");
    } finally {
      setIsClosing(null);
    }
  }

  return (
    <div className="w-full bg-zinc-950/20 rounded-xl border border-zinc-900/50 p-6 font-sans mt-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex flex-col gap-1">
          <h2 className="text-xl font-bold tracking-tight text-white">
            Open Positions
          </h2>
          <p className="text-zinc-500 text-xs">
            Real-time monitoring and management of your active market trades.
          </p>
        </header>

        <Card className="border-zinc-900 bg-zinc-950/50 backdrop-blur-md shadow-xl overflow-hidden mt-4">
          <CardHeader className="border-b border-zinc-900 py-4 px-6 flex flex-row items-center justify-between bg-zinc-950">
            <CardTitle className="text-base font-semibold flex items-center gap-3 text-white">
              Market Positions
              <Badge
                variant="outline"
                className="rounded-full bg-zinc-900 text-zinc-300 border-zinc-800 px-3"
              >
                {openOrders.length}
              </Badge>
            </CardTitle>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 bg-zinc-900/40 px-3 py-1.5 rounded-full border border-zinc-900">
              <RefreshCw className="h-3 w-3 animate-spin text-emerald-500" />
              Live Feed
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-zinc-900/40">
                  <TableRow className="border-zinc-900 hover:bg-transparent">
                    <TableHead className="font-semibold py-3 text-zinc-400">Asset</TableHead>
                    <TableHead className="font-semibold text-zinc-400">Side</TableHead>
                    <TableHead className="font-semibold text-zinc-400">Quantity</TableHead>
                    <TableHead className="font-semibold text-zinc-400">Entry Price</TableHead>
                    <TableHead className="font-semibold text-zinc-400">Current PnL</TableHead>
                    <TableHead className="font-semibold text-zinc-400">Position</TableHead>
                    <TableHead className="text-right font-semibold pr-8 text-zinc-400">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {openOrders.length === 0 ? (
                    <TableRow className="border-zinc-900">
                      <TableCell
                        colSpan={7}
                        className="h-48 text-center text-zinc-500"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <p>No open positions found</p>
                          <p className="text-xs text-zinc-600">
                            New trades will appear here automatically
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    openOrders.map((order) => (
                      <TableRow
                        key={order.id}
                        className="border-zinc-900 hover:bg-zinc-900/20 transition-colors group"
                      >
                        <TableCell className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-zinc-900 flex items-center justify-center font-bold text-xs text-zinc-300 border border-zinc-800">
                              {order.asset[0]}
                            </div>
                            <div className="font-semibold text-white">{order.asset}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={`uppercase px-2.5 py-0.5 font-semibold border rounded ${
                              order.side === "buy"
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                            }`}
                          >
                            {order.side === "buy" ? (
                              <span className="flex items-center gap-1">
                                <TrendingUp className="h-3 w-3" /> LONG
                              </span>
                            ) : (
                              <span className="flex items-center gap-1">
                                <TrendingDown className="h-3 w-3" /> SHORT
                              </span>
                            )}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono tabular-nums text-zinc-300">
                          {order.qty}
                        </TableCell>
                        <TableCell className="font-mono tabular-nums text-zinc-300">
                          ${order.entryPrice.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div
                            className={`font-mono tabular-nums flex items-center gap-1 font-semibold ${
                              (order.currentPnl || 0) >= 0
                                ? "text-emerald-400"
                                : "text-rose-400"
                            }`}
                          >
                            {(order.currentPnl || 0) >= 0 ? "+" : ""}
                            {order.currentPnl?.toFixed(2) || "0.00"}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div
                            className={`font-mono tabular-nums flex items-center gap-1 font-semibold ${
                              (order.currentPnl || 0) >= 0
                                ? "text-emerald-400"
                                : "text-rose-400"
                            }`}
                          >
                            ${order.positionValue?.toLocaleString()}
                          </div>
                        </TableCell>

                        <TableCell className="text-right pr-8">
                          <Button
                            variant="destructive"
                            size="sm"
                            className="h-8 px-4 font-bold shadow-lg shadow-rose-950/20 hover:scale-105 active:scale-95 transition-all bg-rose-600 hover:bg-rose-500 text-white rounded cursor-pointer"
                            onClick={() => closeTrade(order.id)}
                            disabled={isClosing === order.id}
                          >
                            {isClosing === order.id ? (
                              <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                            ) : (
                              <XCircle className="h-4 w-4 mr-2" />
                            )}
                            Close Position
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <footer className="pt-4 border-t border-zinc-900 flex justify-between items-center text-xs text-zinc-500">
          <div>
            Logged in as:{" "}
            <span className="text-zinc-300 font-semibold">
              {openOrders[0]?.userName || "Active User"}
            </span>
          </div>
          <div>All trades are subject to market volatility.</div>
        </footer>
      </div>
    </div>
  );
};

export default OrdersPage;
