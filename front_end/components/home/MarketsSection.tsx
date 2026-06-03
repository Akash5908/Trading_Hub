"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Coins, TrendingUp } from "lucide-react";

export function MarketsSection() {
  const markets = [
    {
      pair: "BTC / USDT",
      price: "$67,051.14",
      change: "+2.45%",
      isPositive: true,
      volume: "$14.2B",
      icon: "🪙",
    },
    {
      pair: "ETH / USDT",
      price: "$1,881.08",
      change: "-0.87%",
      isPositive: false,
      volume: "$8.4B",
      icon: "💎",
    },
    {
      pair: "SOL / USDT",
      price: "$75.11",
      change: "+5.12%",
      isPositive: true,
      volume: "$3.1B",
      icon: "☀️",
    },
  ];

  return (
    <section className="px-6 py-20 relative overflow-hidden border-b border-zinc-900 bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-ribbon mb-2">
              <Coins className="h-4 w-4" /> Live Market Spotlights
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              Explore popular trading pairs.
            </h2>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" className="rounded-full border-zinc-800 text-white hover:bg-zinc-900 bg-transparent">
              View All Markets <TrendingUp className="ml-2 h-4 w-4 text-ribbon" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {markets.map((market, idx) => (
            <div
              key={idx}
              className="group relative rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 transition-all duration-300 hover:border-ribbon hover:bg-zinc-900 hover:shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{market.icon}</span>
                  <div>
                    <h3 className="font-bold text-white text-lg">{market.pair}</h3>
                    <span className="text-xs text-zinc-400">Vol: {market.volume}</span>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    market.isPositive ? "bg-emerald-950/50 text-emerald-400 border border-emerald-500/20" : "bg-rose-950/50 text-rose-400 border border-rose-500/20"
                  }`}
                >
                  {market.change}
                </span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-xs text-zinc-400 block mb-1">Last Price</span>
                  <span className="text-2xl font-bold text-white font-mono">{market.price}</span>
                </div>
                <Link href="/dashboard">
                  <Button size="sm" className="rounded-full bg-ribbon/10 text-ribbon font-bold hover:bg-ribbon/20 hover:scale-105 transition-all shadow-none">
                    Trade
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
