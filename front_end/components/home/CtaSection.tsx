"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="px-6 pb-32 bg-black text-white">
      <div className="mx-auto max-w-7xl">
        <div className="relative rounded-3xl border border-zinc-800 bg-zinc-900 p-12 md:p-24 overflow-hidden text-center shadow-2xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-ribbon/10 blur-[120px] pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold leading-tight text-white md:text-6xl tracking-tight">
              Ready to trade with <br />
              absolute precision?
            </h2>
            <p className="text-xl text-zinc-400">
              Join thousands of traders using our next-generation exchange infrastructure. Connect, deposit, and start trading now.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/dashboard">
                <Button size="lg" className="rounded-full px-12 h-16 text-lg font-bold w-full sm:w-auto bg-ribbon/10 text-ribbon hover:bg-ribbon/20 border border-ribbon/20 shadow-none">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" size="lg" className="rounded-full border-zinc-800 bg-zinc-950 px-12 h-16 text-lg font-bold w-full sm:w-auto hover:bg-zinc-900 text-white">
                  Explore Platform
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
