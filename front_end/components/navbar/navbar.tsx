"use client";
import {
  LogOut,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Navbar() {
  const user = useAppSelector((state) => state.user);
  const router = useRouter();
  const pathname = usePathname();
  const isDashboard = pathname === "/dashboard";
  const dispatch = useAppDispatch();
  const [token, setToken] = useState<string | null>("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/me?authToken=${authToken}`,
        );
        const profilerData = res.data.profile;
        dispatch(
          setCredentials({
            id: profilerData?.id,
            username: profilerData?.username,
            token: profilerData?.token,
            userBalance: profilerData?.userBalance,
          }),
        );
      } catch (error) {
        console.error("[v0] Error fetching profile:", error);
      }
    }
    fetchToken();
    if (token) fetchProfile(token);
  }, [dispatch, token]);

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
          ? isDashboard
            ? "bg-zinc-950/85 backdrop-blur-xl border-b border-zinc-900 py-3"
            : "bg-white/80 backdrop-blur-xl border-b border-zinc-200/50 py-3"
          : "bg-transparent py-6",
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo - Financial Identity */}
        <div
          className="flex items-center gap-2.5 cursor-pointer group"
          onClick={() => router.push("/")}
        >
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-indigo-500/10 blur-lg rounded-full group-hover:bg-indigo-500/20 transition-all" />
            <div className="relative w-full h-full bg-ribbon rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-500 shadow-[0_0_20px_rgba(99,102,241,0.25)]">
              <TrendingUp className="text-white w-5 h-5 stroke-[2.5px]" />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h1 className={cn(
              "text-sm font-bold tracking-tight leading-snug uppercase",
              isDashboard ? "text-white" : "text-zinc-900"
            )}>
              Trading <span className="text-ribbon italic font-black">Hub</span>
            </h1>
            <span className={cn(
              "text-[9px] font-medium tracking-[0.2em] uppercase leading-none",
              isDashboard ? "text-zinc-500" : "text-zinc-500"
            )}>
              Premium Asset Mgmt
            </span>
          </div>
        </div>

        {/* User Balance & Actions */}
        <div className="flex items-center gap-5">
          {user?.id ? (
            <div className="flex items-center gap-4">
              <div className={cn(
                "hidden lg:flex flex-col justify-center items-end px-4 rounded-xl border h-10 transition-colors",
                isDashboard
                  ? "bg-zinc-900/60 border-zinc-800 text-white"
                  : "bg-zinc-100/50 border-zinc-200 text-zinc-800"
              )}>
                <div className="flex items-center gap-1.5">
                  <Wallet className="w-3 h-3 text-ribbon" />
                  <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold">
                    Live Portfolio
                  </span>
                </div>
                <span className={cn(
                  "font-mono text-sm font-bold tracking-tighter leading-none mt-0.5",
                  isDashboard ? "text-zinc-200" : "text-zinc-800"
                )}>
                  ${(Number(user.userBalance) || 0).toLocaleString() || "0.00"}
                </span>
              </div>
              <div className="relative group avatar-dropdown-container">
                <div 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={cn(
                    "hidden md:flex items-center gap-3 border backdrop-blur-md px-4 rounded-xl cursor-pointer h-10 transition-colors",
                    isDashboard
                      ? "bg-zinc-900/60 border-zinc-800 text-white hover:bg-zinc-850/60"
                      : "bg-zinc-100/60 border-zinc-200 text-zinc-900 hover:bg-zinc-200/60"
                  )}
                >
                  <Avatar className="w-6 h-6 border border-zinc-800">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback className="bg-primary/10 text-primary font-mono text-[10px]">
                      {user.username ? user.username.slice(0, 2).toUpperCase() : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className={cn(
                      "text-xs font-bold leading-tight",
                      isDashboard ? "text-zinc-100" : "text-zinc-900"
                    )}>
                      {user.username}
                    </span>
                  </div>
                </div>

                {/* Dropdown dialog */}
                <div className={cn(
                  "absolute right-0 top-full pt-2 w-48 transition-all duration-200 z-50 pointer-events-none opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto",
                  isDropdownOpen && "opacity-100 translate-y-0 pointer-events-auto"
                )}>
                  <div className={cn(
                    "rounded-xl border shadow-2xl flex flex-col gap-1 p-2 pointer-events-auto",
                    isDashboard
                      ? "bg-zinc-950 border-zinc-900 text-zinc-100"
                      : "bg-white border-zinc-200 text-zinc-800"
                  )}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start rounded-lg font-bold text-xs py-2 px-3 cursor-pointer",
                        isDashboard
                          ? "text-zinc-300 hover:bg-zinc-900 hover:text-white"
                          : "text-zinc-800 hover:bg-zinc-100 hover:text-zinc-900"
                      )}
                      onClick={() => {
                        router.push("/dashboard");
                        setIsDropdownOpen(false);
                      }}
                    >
                      Go to Dashboard
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start rounded-lg text-rose-500 hover:bg-rose-500/10 hover:text-rose-600 font-bold text-xs py-2 px-3 cursor-pointer"
                      onClick={() => {
                        handleLogout();
                        setIsDropdownOpen(false);
                      }}
                    >
                      <LogOut className="w-3.5 h-3.5 mr-2" />
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Button
              className={cn(
                "rounded-xl px-8 py-5 font-black text-xs uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] shadow-none cursor-pointer",
                isDashboard
                  ? "bg-indigo-600 hover:bg-indigo-500 text-white border-none"
                  : "bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20"
              )}
              onClick={() => router.push("/login")}
            >
              Get Started
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "md:hidden transition-colors cursor-pointer",
              isDashboard ? "text-zinc-400 hover:text-white hover:bg-zinc-900" : "text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100"
            )}
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </header>
  );
}
