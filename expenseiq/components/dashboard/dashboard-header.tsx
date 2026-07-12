"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Breadcrumb } from "./breadcrumb";
import { SearchBar } from "./search-bar";
import { NotificationBell } from "./notification-bell";
import { UserProfileMenu } from "./user-profile-menu";

export function DashboardHeader() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-35 flex h-16 w-full items-center justify-between border-b border-neutral-border bg-header-bg/80 px-6 backdrop-blur-md transition-all duration-200">
      {/* Left-side navigation indicators */}
      <div className="flex items-center gap-4">
        <Breadcrumb />
      </div>

      {/* Center search utilities */}
      <div className="hidden sm:block flex-1 max-w-xs md:max-w-sm mx-4">
        <SearchBar />
      </div>

      {/* Right-side quick tools */}
      <div className="flex items-center gap-3.5">
        {/* Header Search button wrapper for mobile */}
        <div className="sm:hidden">
          <SearchBar />
        </div>

        {/* System Alert Indicators */}
        <NotificationBell />

        {/* Global Color Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex items-center justify-center size-9 rounded-lg hover:bg-neutral-secondary-bg transition-colors duration-200 text-text-secondary hover:text-text-primary"
          aria-label="Toggle theme mode"
        >
          <Sun className="size-4.5 hidden dark:block" />
          <Moon className="size-4.5 dark:hidden" />
        </button>

        {/* Profile menu dropdown triggers */}
        <UserProfileMenu />
      </div>
    </header>
  );
}
