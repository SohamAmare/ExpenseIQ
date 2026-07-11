"use client";

import React from "react";
import { useUIStore } from "@/lib/store";
import { DashboardSidebar } from "../dashboard/dashboard-sidebar";
import { DashboardHeader } from "../dashboard/dashboard-header";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const sidebarOpen = useUIStore((state) => state.sidebarOpen);

  return (
    <div className="min-h-screen flex bg-neutral-bg font-sans antialiased text-text-primary overflow-x-hidden">
      {/* Collapsible Sidebar Navigation */}
      <DashboardSidebar />

      {/* Main content frame containing header + body pages */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-250 ${
          sidebarOpen ? "lg:pl-64" : "lg:pl-20"
        }`}
      >
        {/* Sticky top navigation bar */}
        <DashboardHeader />

        {/* Scrollable page body */}
        <main className="flex-grow flex flex-col">
          {children}
        </main>
      </div>
    </div>
  );
}
