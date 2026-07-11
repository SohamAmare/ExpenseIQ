import React from "react";
import { AppLayout } from "@/components/layout/app-layout";

export const metadata = {
  title: "Dashboard - ExpenseIQ",
  description: "Manage balance sheets, track transaction categories, and review AI advice.",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppLayout>{children}</AppLayout>
  );
}
