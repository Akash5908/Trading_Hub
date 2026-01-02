import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart3,
  Globe,
  Zap,
  Users,
  ShieldCheck,
  Cpu,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-background selection:bg-primary/30 selection:text-primary">
      {/* Hero Section */}
      <section className="relative flex min-h-[90vh] flex-col justify-center overflow-hidden px-6 pt-32 pb-24 md:pt-48">
        {/* Vercel-style background grid */}
        <div className="absolute inset-0 z-0 opacity-[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        {/* Floating glow effects */}
        <div className="absolute -top-24 right-0 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />

        <div className="mx-auto w-full max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div className="max-w-4xl space-y-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary backdrop-blur-md">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                Next Generation Trading Engine
              </div>

              <h1 className="text-balance text-7xl font-semibold leading-[0.95] tracking-tighter text-white md:text-[140px]">
                The complete <br />
                <span className="text-primary italic">trading hub.</span>
              </h1>

              <div className="flex flex-col gap-6 md:flex-row md:items-center">
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="h-16 rounded-full px-12 text-xl font-bold shadow-2xl shadow-primary/20 transition-all hover:scale-105 active:scale-95"
                  >
                    Go to Dashboard
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-16 rounded-full border-white/10 bg-white px-12 text-xl font-bold backdrop-blur-sm hover:bg-white/10 transition-all hover:scale-105 "
                  >
                    Explore Platform
                  </Button>
                </Link>
              </div>
            </div>

            <div className="max-w-md space-y-8 md:pb-6">
              <p className="text-2xl leading-relaxed text-muted-foreground font-medium">
                Your portal to stop guessing and start innovating. Securely
                trade, analyze, and scale with the industry's most powerful
                matching engine.
              </p>
              <div className="flex items-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                <ShieldCheck className="h-10 w-10 text-white" />
                <Globe className="h-10 w-10 text-white" />
                <Cpu className="h-10 w-10 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats Section */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4">
            {[
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
            ].map((stat, i) => (
              <div
                key={i}
                className="group border-white/10 p-12 last:border-r-0 md:border-r hover:bg-primary/[0.03] transition-colors"
              >
                <div className="space-y-4">
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    {stat.value}
                  </div>
                  <div className="text-3xl font-bold text-white tracking-tight">
                    {stat.label}{" "}
                    <span className="block text-xl font-normal text-muted-foreground mt-1">
                      {stat.sub}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Start Trading Section */}
      <section className="px-6 py-32 md:py-56 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[150px] pointer-events-none" />

        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row gap-24 lg:gap-40">
            <div className="max-w-xl space-y-10">
              <div className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] text-primary">
                <Zap className="h-6 w-6" /> Seamless Entry
              </div>
              <h2 className="text-6xl font-bold leading-[0.9] text-white md:text-8xl tracking-tighter">
                Scale your <br />
                precision.
              </h2>
              <p className="text-2xl text-muted-foreground leading-relaxed">
                The platform for rapid market entry. Let your strategy focus on
                winning trades instead of fighting latency with our optimized
                liquidity bridge.
              </p>
              <div className="pt-6">
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="h-16 rounded-full px-12 text-xl font-bold"
                  >
                    Go to Dashboard <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex-1 space-y-16">
              {[
                {
                  step: "01",
                  title: "Quick Account Creation",
                  desc: "Register in under 3 minutes with our high-speed verification flow.",
                  icon: <Users className="h-8 w-8 text-primary" />,
                },
                {
                  step: "02",
                  title: "Instant Wallet Funding",
                  desc: "Connect your preferred gateway with zero-fee instant deposits.",
                  icon: <Zap className="h-8 w-8 text-primary" />,
                },
                {
                  step: "03",
                  title: "Launch First Trade",
                  desc: "Execute your strategy on our institutional-grade matching engine.",
                  icon: <BarChart3 className="h-8 w-8 text-primary" />,
                },
              ].map((item, i) => (
                <div key={i} className="group relative flex gap-10 items-start">
                  <div className="text-5xl font-black text-primary/30 transition-colors duration-500 group-hover:text-primary">
                    {item.step}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-bold text-white tracking-tight group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-md">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-24 px-6 bg-black">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-12 md:flex-row">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-10 w-10 text-primary" />
              <span className="text-3xl font-bold tracking-tighter text-white">
                Trading Hub
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-12 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              <Link href="#" className="hover:text-primary transition-colors">
                Risk Disclosure
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Terms
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Support
              </Link>
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              © 2026 Trading Hub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
