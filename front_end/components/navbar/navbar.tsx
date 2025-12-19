"use client";
import { AnimatedBackground } from "@/components/motion-primitives/animated-background";
import { getAuthToken, logout } from "@/lib/auth";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { clearCredentials, setCredentials } from "@/slices/userSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Store } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export function Navbar() {
  const user = useAppSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [token, setToken] = useState<string | null>("");

  async function fetchToken() {
    const token = await getAuthToken();
    if (!token) return setToken(null);

    setToken(token);
  }

  const TABS =
    !user.id || user.id === ""
      ? [
          {
            label: "Home",
            value: "/",
          },
          {
            label: "Dashboard",
            value: "/dashboard",
          },
          {
            label: "Login",
            value: "/login",
          },
        ]
      : [
          {
            label: "Home",
            value: "/",
          },
          {
            label: "Dashboard",
            value: "/dashboard",
          },
          {
            label: "Logout",
            value: "/logout",
          },
        ];

  useEffect(() => {
    async function fetchProfile(authToken: string) {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/me?authToken=${authToken}`
      );

      const profilerData = res.data.profile;
      console.log("profilerData", profilerData);
      dispatch(
        setCredentials({
          id: profilerData?.id,
          username: profilerData?.username,
          token: profilerData?.token,
          userBalance: profilerData?.userBalance,
        })
      );
    }
    fetchToken();
    if (token != null) fetchProfile(token);
  }, [user, dispatch, token]);

  // To find the current page
  function CurrentTab(): string {
    const tab = usePathname();
    return tab;
  }

  const handleLogout = () => {
    logout();
    dispatch({ type: "logout" });
    console.log("user", user);
    // window.location.href = "/";
  };

  return (
    <div className="flex flex-row justify-between w-[90vw]">
      <div>
        <h1 className="text-white text-2xl customize_text ">Trading Hub</h1>
      </div>
      <div className="flex justify-center items-center">
        {user?.userBalance && (
          <div>
            <h1 className="text-white text-md text-center customize_text mx-2 ">
              User Balance: {user.userBalance}
            </h1>
          </div>
        )}
        <AnimatedBackground
          defaultValue={CurrentTab()}
          className="rounded-lg bg-zinc-100 dark:bg-zinc-800"
          transition={{
            type: "spring",
            bounce: 0.2,
            duration: 0.3,
          }}
          enableHover
        >
          {TABS.map((tab, index) => (
            <button
              key={index}
              data-id={tab.value}
              type="button"
              onClick={() =>
                tab.label === "Logout" ? handleLogout() : router.push(tab.value)
              }
              className="px-4 py-0.5 text-zinc-600 transition-colors duration-300 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              {tab.label}
            </button>
          ))}
        </AnimatedBackground>
      </div>
    </div>
  );
}
