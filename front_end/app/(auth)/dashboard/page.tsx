"use client";
import DashboardPage from "@/components/DashboardPage/DashbaordPage";
import TradingComponent from "@/components/TradingComponent/TradingComponent";
import { useAppSelector } from "@/lib/hook";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Dashboard = () => {
  const user = useAppSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    // Redirect to login page if not authenticated
    if (!user.id || user.id == "") router.push("/login");
  }, [user]);

  return (
    <div>
      <DashboardPage />
      {/* <TradingComponent /> */}
    </div>
  );
};

export default Dashboard;
