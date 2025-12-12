"use client";
import { AnimatedBackground } from "@/components/motion-primitives/animated-background";
import { fetchProfile } from "@/lib/auth";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { setCredentials } from "@/slices/userSlice";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function Navbar() {
  const user = useAppSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const TABS = [
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
  ];

  useEffect(() => {
    const fetchUser = async () => {
      const user = await fetchProfile();

      console.log("User", user);
      dispatch(setCredentials(user));
    };

    fetchUser();
  }, [user]);

  // To find the current page
  function CurrentTab(): string {
    const tab = usePathname();

    return tab;
  }

  return (
    <div className="flex flex-row justify-between w-[90vw]">
      <div>
        <h1 className="text-white text-2xl customize_text ">Trading Hub</h1>
      </div>
      <div>
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
              onClick={() => router.push(tab.value)}
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
