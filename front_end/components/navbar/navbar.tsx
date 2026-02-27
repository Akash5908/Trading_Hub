"use client";
import {
  LogOut,
  LayoutDashboard,
  Home,
  TrendingUp,
  Menu,
  Wallet,
} from "lucide-react";
import { getAuthToken, logout } from "@/lib/auth";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { setCredentials } from "@/slices/userSlice";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const user = useAppSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const [token, setToken] = useState<string | null>("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  async function fetchToken() {
    // Note: getAuthToken should be imported from your auth lib
    const token = await getAuthToken();
    if (!token) return setToken(null);
    setToken(token);
  }

  useEffect(() => {
    async function fetchProfile(authToken: string) {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/me?authToken=${authToken}`
        );
        const profilerData = res.data.profile;
        dispatch(
          setCredentials({
            id: profilerData?.id,
            username: profilerData?.username,
            token: profilerData?.token,
            userBalance: profilerData?.userBalance,
          })
        );
      } catch (error) {
        console.error("[v0] Error fetching profile:", error);
      }
    }
    fetchToken();
    if (token) fetchProfile(token);
  }, [dispatch, token]);

  const TABS = [
    { label: "Home", value: "/", icon: Home },
    { label: "Dashboard", value: "/dashboard", icon: LayoutDashboard },
  ];

  const handleLogout = () => {
    logout();
    dispatch({ type: "logout" });
    router.push("/");
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-black/60 backdrop-blur-xl border-b border-white/5 py-3"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo - Financial Identity */}
        <div
          className="flex items-center gap-2.5 cursor-pointer group"
          onClick={() => router.push("/")}
        >
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full group-hover:bg-primary/30 transition-all" />
            <div className="relative w-full h-full bg-primary rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-500 shadow-[0_0_20px_rgba(var(--primary),0.3)]">
              <TrendingUp className="text-black w-5 h-5 stroke-[2.5px]" />
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-white text-lg font-bold tracking-tight leading-none uppercase">
              Trading <span className="text-primary italic">Hub</span>
            </h1>
            <span className="text-[10px] text-zinc-500 font-medium tracking-[0.2em] uppercase">
              Premium Asset Mgmt
            </span>
          </div>
        </div>

        {/* Navigation - Glassmorphism Style */}
        <nav className="hidden md:flex items-center gap-1.5 bg-white/[0.03] border border-white/10 p-1.5 rounded-2xl backdrop-blur-md shadow-2xl">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => router.push(tab.value)}
              className={cn(
                "relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300",
                pathname === tab.value
                  ? "bg-primary text-black shadow-[0_0_15px_rgba(var(--primary),0.4)]"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              )}
            >
              <tab.icon
                className={cn(
                  "w-3.5 h-3.5",
                  pathname === tab.value ? "text-black" : "text-zinc-500"
                )}
              />
              {tab.label}
            </button>
          ))}
        </nav>

        {/* User Balance & Actions */}
        <div className="flex items-center gap-5">
          {user?.id ? (
            <div className="flex items-center gap-4">
              <div className="hidden lg:flex flex-col items-end px-4 py-1.5 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="flex items-center gap-1.5">
                  <Wallet className="w-3 h-3 text-primary" />
                  <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold">
                    Live Portfolio
                  </span>
                </div>
                <span className="text-primary font-mono text-sm font-bold tracking-tighter">
                  ${(Number(user.userBalance) || 0).toLocaleString() || "0.00"}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl border-white/10 text-primary bg-white/5 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all font-bold text-[10px] uppercase tracking-wider"
                onClick={handleLogout}
              >
                <LogOut className="w-3.5 h-3.5 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <Button
              className="bg-primary text-black hover:bg-primary/90 rounded-xl px-8 py-5 font-black text-xs uppercase tracking-widest shadow-[0_0_25px_rgba(var(--primary),0.3)] transition-all hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => router.push("/login")}
            >
              Get Started
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white/70 hover:text-white transition-colors"
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </header>
  );
}
