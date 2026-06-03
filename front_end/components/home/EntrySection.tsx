"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Zap, BarChart3 } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

export function EntrySection() {
  const seamlessRef = useRef(null);
  const isSeamlessInView = useInView(seamlessRef, { once: true });

  const steps = [
    {
      step: "01",
      title: "Quick Account Creation",
      desc: "Register in under 3 minutes with our high-speed verification flow.",
      icon: <Users className="h-8 w-8 text-ribbon" />,
    },
    {
      step: "02",
      title: "Instant Wallet Funding",
      desc: "Connect your preferred gateway with zero-fee instant deposits.",
      icon: <Zap className="h-8 w-8 text-ribbon" />,
    },
    {
      step: "03",
      title: "Launch First Trade",
      desc: "Execute your strategy on our institutional-grade matching engine.",
      icon: <BarChart3 className="h-8 w-8 text-ribbon" />,
    },
  ];

  return (
    <motion.section className="px-6 py-32 md:py-56 relative overflow-hidden bg-black text-white">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-ribbon/5 blur-[150px] pointer-events-none" />

      <motion.div
        ref={seamlessRef}
        className="mx-auto max-w-7xl"
        initial={{ opacity: 0, y: 40 }}
        animate={isSeamlessInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="flex flex-col md:flex-row gap-24 lg:gap-40">
          <div className="max-w-xl space-y-10">
            <div className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] text-ribbon">
              <Zap className="h-6 w-6" /> Seamless Entry
            </div>
            <h2 className="text-6xl font-bold leading-[0.9] text-white md:text-8xl tracking-tighter">
              Scale your <br />
              precision.
            </h2>
            <p className="text-2xl text-zinc-400 leading-relaxed">
              The platform for rapid market entry. Let your strategy focus on
              winning trades instead of fighting latency with our optimized
              liquidity bridge.
            </p>
            <div className="pt-6">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="h-16 rounded-full px-12 text-xl font-bold bg-ribbon/10 text-ribbon hover:bg-ribbon/20 border border-ribbon/20 shadow-none"
                >
                  Go to Dashboard <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex-1 space-y-16">
            {steps.map((item, i) => (
              <div key={i} className="group relative flex gap-10 items-start">
                <div className="text-5xl font-black text-ribbon/30 transition-colors duration-500 group-hover:text-ribbon">
                  {item.step}
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-white tracking-tight group-hover:text-ribbon transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xl text-zinc-400 leading-relaxed max-w-md">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
