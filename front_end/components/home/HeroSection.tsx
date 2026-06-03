"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RibbenGradient } from "../svgs/Ribben-svg";
import { LoopText } from "../text-animation/loop-text";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[100vh] flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-24 text-center">
      {/* Ribbon gradient */}
      <RibbenGradient />
      {/* Floating glow effects */}
      <div className="absolute -top-24 right-0 h-[600px] w-[600px] rounded-full bg-ribbon/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-ribbon/5 blur-[100px] pointer-events-none" />

      <div className="mx-auto w-full max-w-5xl relative z-10 flex flex-col items-center gap-8">
        {/* Top Badge */}
        <motion.div
          className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-4 py-1.5 text-sm font-medium text-zinc-600 shadow-sm backdrop-blur-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <span>Our Capital, Your</span>
          <span className="inline-flex items-center gap-1 rounded-full border border-ribbon/30 bg-ribbon/10 px-2.5 py-0.5 text-xs font-bold text-ribbon">
            + Success
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          className="text-balance text-5xl font-medium leading-[1.05] tracking-tight md:text-8xl bg-gradient-to-r from-[#6366f1] via-[#a78bfa] to-[#60a5fa] bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Institutional-Grade Zero-Latency Trading Engine
        </motion.h1>

        {/* Sub-heading */}
        <div className="max-w-2xl mx-auto h-[60px] md:h-[40px] flex items-center justify-center">
          <LoopText
            className="text-lg text-zinc-600 md:text-xl font-medium"
            value="Securely trade, analyze, and scale with the industry's most powerful matching engine. Stop guessing and start innovating."
          />
        </div>

        
      </div>
    </section>
  );
}
