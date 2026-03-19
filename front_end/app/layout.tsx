import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ReduxProvider } from "./redux-provider";
import { Navbar } from "@/components/navbar/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trading Hub",
  description: "A multi-service cryptocurrency trading platform featuring a real-time trading engine and price poller for BTC, SOL, and ETH. Integrated Binance API via WebSockets for live data streaming and implemented low-latency trade execution logic.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <ReduxProvider>
          <div className=" absolute right-5  my-4">
            <Navbar />
          </div>
          {children}
          <Toaster />
        </ReduxProvider>
      </body>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bitcount+Prop+Single:wght@100..900&family=Outfit:wght@100..900&display=swap"
          rel="stylesheet"
        ></link>
      </head>
    </html>
  );
}
