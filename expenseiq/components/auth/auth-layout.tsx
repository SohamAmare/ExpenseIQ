import React from "react";
import { AuthBranding } from "./auth-branding";
import { AuthLogo } from "./auth-logo";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen w-full bg-neutral-bg overflow-x-hidden">
      {/* Left-side branding view (visible only on large layouts) */}
      <AuthBranding />

      {/* Right-side centered credentials panel */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-16 md:px-12 relative min-h-screen">
        {/* Mobile Header branding (rendered on smaller display viewports) */}
        <div className="lg:hidden absolute top-6 left-6">
          <AuthLogo />
        </div>

        <div className="w-full max-w-sm">
          {children}
        </div>
      </div>
    </div>
  );
}
