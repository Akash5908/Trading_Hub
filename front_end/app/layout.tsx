import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ReduxProvider } from "./redux-provider";
import { Navbar } from "@/components/navbar/navbar";
import DisableDevTools from "@/components/DevToolsDisable";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trading Hub",
  description:
    "A multi-service cryptocurrency trading platform featuring a real-time trading engine and price poller for BTC, SOL, and ETH. Integrated Binance API via WebSockets for live data streaming and implemented low-latency trade execution logic.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} antialiased `}
      >
        <ReduxProvider>
         
          {children}
          <DisableDevTools/>
          <Toaster />
        </ReduxProvider>
      </body>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bitcount+Prop+Single:wght@100..900&family=Cause:wght@100..900&family=Lilita+One&family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&family=Michroma&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Outfit:wght@100..900&family=Supermercado+One&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
    </html>
  );
}
