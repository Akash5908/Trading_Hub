"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

export function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const stats = [
    {
      label: "20ms average",
      sub: "execution speed",
      value: "Ultra-fast",
    },
    {
      label: "99.99% uptime",
      sub: "since inception",
      value: "Reliable",
    },
    {
      label: "$4.2T volume",
      sub: "traded annually",
      value: "Trusted",
    },
    {
      label: "24/7 priority",
      sub: "global assistance",
      value: "Support",
    },
  ];

  return (
    <motion.section
      ref={ref}
      className="border-y border-zinc-900 bg-black text-white"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="group border-zinc-900 p-12 last:border-r-0 md:border-r hover:bg-zinc-900/30 transition-colors"
            >
              <div className="space-y-4">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-ribbon">
                  {stat.value}
                </div>
                <div className="text-3xl font-bold text-white tracking-tight">
                  {stat.label}{" "}
                  <span className="block text-xl font-normal text-zinc-400 mt-1">
                    {stat.sub}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
