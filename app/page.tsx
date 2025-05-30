"use client";

import { LoginForm } from "@/components/login-form";
import { useSession } from "next-auth/react";
import DashboardPage from "./dashboard/page";

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return <DashboardPage />;
  }
  return <LoginForm />;
}
