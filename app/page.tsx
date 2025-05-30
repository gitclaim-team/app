"use client";

import { useSession } from "next-auth/react";
import DashboardPage from "./dashboard/page";
import LoginPage from "./login/page";

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return <DashboardPage />;
  }
  return <LoginPage />;
}
