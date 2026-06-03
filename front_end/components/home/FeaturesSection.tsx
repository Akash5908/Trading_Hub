"use client";

import { Terminal, Cpu, Globe, BarChart3 } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      title: "Sub-millisecond Engine",
      desc: "Our high-concurrency matching engine handles up to 500,000 transactions per second with microsecond latency.",
      icon: <Cpu className="h-10 w-10 text-ribbon" />,
    },
    {
      title: "Deep Liquidity Bridge",
      desc: "Aggregate market-making liquidity sources from top-tier institutional providers for minimal slippage.",
      icon: <Globe className="h-10 w-10 text-ribbon" />,
    },
    {
      title: "Advanced Charts",
      desc: "Integrated real-time candles and analytical indicators to plan and track complex entry/exit points.",
      icon: <BarChart3 className="h-10 w-10 text-ribbon" />,
    },
    {
      title: "Developer First APIs",
      desc: "Robust REST and WebSocket endpoints designed for algorithmic trading bots and custom integrations.",
      icon: <Terminal className="h-10 w-10 text-ribbon" />,
    },
  ];

  return (
    <section className="px-6 py-24 md:py-32 border-t border-zinc-900 bg-zinc-950 text-white relative overflow-hidden">
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-ribbon/5 blur-[120px] pointer-events-none" />
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl space-y-4 mb-20">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-ribbon">
            <Terminal className="h-4 w-4" /> Core Capabilities
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
            Engineered for demanding traders.
          </h2>
          <p className="text-xl text-zinc-400">
            A comprehensive suite of institutional-grade tools built on high-performance infrastructure.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="group relative rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8 hover:border-ribbon hover:bg-zinc-900 hover:shadow-xl transition-all duration-300"
            >
              <div className="mb-6 rounded-2xl bg-zinc-800 p-4 w-fit group-hover:bg-ribbon/10 transition-colors duration-300">
                {feat.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-ribbon transition-colors">
                {feat.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed text-sm">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
