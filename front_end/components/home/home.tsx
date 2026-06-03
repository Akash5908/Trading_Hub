"use client";

import { HeroSection } from "./HeroSection";
import { StatsSection } from "./StatsSection";
import { MarketsSection } from "./MarketsSection";
import { EntrySection } from "./EntrySection";
import { FeaturesSection } from "./FeaturesSection";
import { SecuritySection } from "./SecuritySection";
import { FaqSection } from "./FaqSection";
import { CtaSection } from "./CtaSection";
import { FooterSection } from "./FooterSection";

export const HomePage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-background selection:bg-primary/30 selection:text-primary">
      <HeroSection />
      <StatsSection />
      <MarketsSection />
      <EntrySection />
      <FeaturesSection />
      <SecuritySection />
      <FaqSection />
      <CtaSection />
      <FooterSection />
    </main>
  );
};
