"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What makes the matching engine so fast?",
      a: "Our engine uses in-memory state replication and lock-free thread queues, running on bare-metal hardware. This structure enables processing trades with sub-millisecond execution speeds under high volume.",
    },
    {
      q: "How secure is my trading account?",
      a: "We mandate multi-factor authentication (2FA), employ IP-whitelisting for API requests, and secure all API keys with hardware security modules (HSM). Over 98% of digital assets are stored in air-gapped cold vaults.",
    },
    {
      q: "What deposit and withdrawal methods are supported?",
      a: "We support major cryptocurrencies (BTC, ETH, SOL, USDC, USDT) and direct fiat wire transfers depending on your jurisdiction. Deposits are processed instantly, and withdrawals are subject to safety checks.",
    },
    {
      q: "Are there fees for using the API endpoints?",
      a: "No, using our public REST and WebSocket endpoints is free of charge. Trading fees are calculated strictly on your monthly volume tier, with discounts available for market makers.",
    },
  ];

  return (
    <section className="px-6 py-24 md:py-32 relative overflow-hidden bg-black text-white">
      <div className="mx-auto max-w-4xl relative z-10">
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-ribbon">Got Questions?</span>
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4 text-white">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border-b border-zinc-900 last:border-b-0 py-6"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="flex w-full items-center justify-between text-left group"
              >
                <span className="text-xl font-bold text-white group-hover:text-ribbon transition-colors">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-zinc-500 transition-transform duration-300 ${
                    openFaq === idx ? "rotate-180 text-ribbon" : ""
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  openFaq === idx ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 pointer-events-none"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-zinc-400 leading-relaxed mt-2">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
