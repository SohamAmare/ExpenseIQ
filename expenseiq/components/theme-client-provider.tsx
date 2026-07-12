"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { AUTH_ROUTES } from "@/constants/auth";

export function ThemeClientProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Enforce light mode on all pre-authentication routes
  const isAuthRoute = pathname && (
    pathname.startsWith(AUTH_ROUTES.LOGIN) ||
    pathname.startsWith(AUTH_ROUTES.REGISTER) ||
    pathname.startsWith(AUTH_ROUTES.FORGOT_PASSWORD) ||
    pathname.startsWith(AUTH_ROUTES.RESET_PASSWORD) ||
    pathname === "/"
  );

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      forcedTheme={isAuthRoute ? "light" : undefined}
    >
      {children}
    </ThemeProvider>
  );
}
