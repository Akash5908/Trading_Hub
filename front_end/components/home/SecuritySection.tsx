"use client";

import { Lock, ShieldCheck, CheckCircle2 } from "lucide-react";

export function SecuritySection() {
  const points = [
    "Multi-Signature Cold Storage Wallets",
    "AES-256 Client-side Data Encryption",
    "Advanced DDoS Protection Shields",
    "Real-time Automated Threat Audits",
  ];

  return (
    <section className="px-6 py-24 md:py-32 bg-zinc-950 text-white border-y border-zinc-900 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-ribbon/5 blur-[100px] pointer-events-none" />
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-ribbon">
              <Lock className="h-4 w-4" /> Bank-grade Safeguards
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
              Your security is <br />our core priority.
            </h2>
            <p className="text-lg text-zinc-400 leading-relaxed">
              We employ defense-in-depth methodologies to protect client funds and personal data. Every trade and interaction is monitored and validated.
            </p>
            <div className="space-y-4">
              {points.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-ribbon flex-shrink-0" />
                  <span className="text-zinc-300 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative rounded-3xl border border-zinc-800 bg-zinc-900 p-10 md:p-12 overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-4">
              <ShieldCheck className="h-24 w-24 text-ribbon/10" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-6">Security Compliance</h3>
            <div className="space-y-6">
              <div className="border-b border-zinc-800 pb-4">
                <span className="text-xs text-ribbon uppercase font-bold tracking-wider">Zero-trust Architecture</span>
                <p className="text-sm text-zinc-400 mt-1">Strict identity verification and access permissions for every internal operation.</p>
              </div>
              <div className="border-b border-zinc-800 pb-4">
                <span className="text-xs text-ribbon uppercase font-bold tracking-wider">Automated Risk Audits</span>
                <p className="text-sm text-zinc-400 mt-1">Continuous algorithmic analysis on all active trade routes to detect anomalous market activities.</p>
              </div>
              <div>
                <span className="text-xs text-ribbon uppercase font-bold tracking-wider">Key Custody Protocol</span>
                <p className="text-sm text-zinc-400 mt-1">Multi-party computation (MPC) ensuring key shards are never held in a single central server.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
