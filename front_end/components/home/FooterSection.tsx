"use client";

import Link from "next/link";
import { TrendingUp } from "lucide-react";

export function FooterSection() {
  return (
    <footer className="relative bg-black text-zinc-400 py-24 px-6 md:px-12 overflow-hidden border-t border-zinc-900">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-12 md:gap-8 pb-20">
          {/* Logo & Copyright */}
          <div className="col-span-2 space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 bg-ribbon rounded-lg flex items-center justify-center">
                <TrendingUp className="text-white w-4 h-4 stroke-[2.5px]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white uppercase">
                Trading <span className="text-ribbon italic font-black">Hub</span>
              </span>
            </div>
            <p className="text-xs text-zinc-600 max-w-xs leading-relaxed">
              © copyright Trading Hub 2026. All rights reserved.
            </p>
          </div>

          {/* Column 1: Pages */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white tracking-wider">Pages</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Studio
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Clients
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Socials */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white tracking-wider">Socials</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white tracking-wider">Legal</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Register */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white tracking-wider">Register</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Forgot Password
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Giant Watermark Text */}
      <div className="absolute bottom-[-4rem] left-0 right-0 pointer-events-none select-none text-center">
        <h2 className="text-[14vw] font-black text-[#141419] leading-none tracking-tighter uppercase whitespace-nowrap opacity-100">
          Trading Hub
        </h2>
      </div>
    </footer>
  );
}
