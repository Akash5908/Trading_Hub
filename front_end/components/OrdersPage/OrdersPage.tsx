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
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:5002";
    ws.current = new WebSocket(wsUrl);

    if (ws.current) {
      ws.current.onmessage = (event: MessageEvent) => {
        try {
          const { type, order } = JSON.parse(event?.data);

          if (type === "open-orders") {
            setOpenOrders((prevData) => {
              if (prevData.some((o) => o.id === order.id)) return prevData;
              return [...prevData, order];
            });
          }
          if (type === "close-orders") {
            setOpenOrders((prevData) =>
              prevData.filter((o) => o.id !== order.id)
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
                  : o
              );
            });
          }
        } catch (error) {
          console.error("[v0] Error parsing websocket message:", error);
        }
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
    } catch (error) {
      console.error("[v0] Error closing trade:", error);
    } finally {
      setIsClosing(null);
    }
  }

  return (
    <div className="min-h-screen bg-background p-6 lg:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col gap-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Open Positions
          </h1>
          <p className="text-muted-foreground text-lg">
            Real-time monitoring and management of your active market trades.
          </p>
        </header>

        <Card className="border-border/50 bg-card/50 backdrop-blur-xl shadow-2xl overflow-hidden">
          <CardHeader className="border-b border-border/50 py-5 px-8 flex flex-row items-center justify-between bg-muted/20">
            <CardTitle className="text-xl font-semibold flex items-center gap-3">
              Market Positions
              <Badge
                variant="outline"
                className="rounded-full bg-primary/5 text-primary border-primary/20 px-3"
              >
                {openOrders.length}
              </Badge>
            </CardTitle>
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground bg-background/50 px-3 py-1.5 rounded-full border border-border/50">
              <RefreshCw className="h-3 w-3 animate-spin text-primary" />
              Live Feed
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="font-semibold py-4">Asset</TableHead>
                    <TableHead className="font-semibold">Side</TableHead>
                    <TableHead className="font-semibold">Quantity</TableHead>
                    <TableHead className="font-semibold">Entry Price</TableHead>
                    <TableHead className="font-semibold">Current PnL</TableHead>
                    <TableHead className="font-semibold">Position</TableHead>
                    <TableHead className="text-right font-semibold pr-8">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {openOrders.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="h-48 text-center text-muted-foreground"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <p>No open positions found</p>
                          <p className="text-xs">
                            New trades will appear here automatically
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    openOrders.map((order) => (
                      <TableRow
                        key={order.id}
                        className="border-border hover:bg-muted/30 transition-colors group"
                      >
                        <TableCell className="py-5">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-xs text-primary border border-primary/20">
                              {order.asset[0]}
                            </div>
                            <div className="font-bold">{order.asset}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={`uppercase px-2.5 py-0.5 font-medium border ${
                              order.side === "buy"
                                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                : "bg-rose-500/10 text-rose-500 border-rose-500/20"
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
                        <TableCell className="font-mono tabular-nums">
                          {order.qty}
                        </TableCell>
                        <TableCell className="font-mono tabular-nums">
                          ${order.entryPrice.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div
                            className={`font-mono tabular-nums flex items-center gap-1 ${
                              (order.currentPnl || 0) >= 0
                                ? "text-emerald-500"
                                : "text-rose-500"
                            }`}
                          >
                            {(order.currentPnl || 0) >= 0 ? "+" : ""}
                            {order.currentPnl?.toFixed(2) || "0.00"}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div
                            className={`font-mono tabular-nums flex items-center gap-1 ${
                              (order.currentPnl || 0) >= 0
                                ? "text-emerald-500"
                                : "text-rose-500"
                            }`}
                          >
                            ${order.positionValue?.toLocaleString()}
                          </div>
                        </TableCell>

                        <TableCell className="text-right pr-8">
                          <Button
                            variant="destructive"
                            size="sm"
                            className="h-9 px-5 font-bold shadow-lg shadow-destructive/20  hover:scale-105 active:scale-95 transition-all bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-md"
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

        <footer className="pt-4 border-t border-border flex justify-between items-center text-xs text-muted-foreground">
          <div>
            Logged in as:{" "}
            <span className="text-foreground font-medium">
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
