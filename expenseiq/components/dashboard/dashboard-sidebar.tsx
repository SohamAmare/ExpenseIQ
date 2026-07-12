"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Icons from "lucide-react";
import { useUIStore } from "@/lib/store";
import { NAV_ITEMS } from "@/constants/dashboard";

export function DashboardSidebar() {
  const pathname = usePathname();
  const sidebarOpen = useUIStore((state) => state.sidebarOpen);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const [mobileOpen, setMobileOpen] = useState(false);

  const renderIcon = (iconName: string, active: boolean) => {
    const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[iconName];
    if (!IconComponent) return <Icons.HelpCircle className="size-5" />;
    return (
      <IconComponent
        className={`size-5 transition-colors duration-200 shrink-0 ${
          active ? "text-brand-primary" : "text-text-secondary group-hover:text-text-primary"
        }`}
      />
    );
  };

  const navContent = (
    <div className="flex flex-col h-full bg-sidebar-bg border-r border-sidebar-border py-6 px-4">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-2 mb-8">
        <div className="flex items-center justify-center size-9 rounded-lg bg-brand-primary text-white shadow-xs shrink-0">
          <Icons.TrendingUp className="size-5" />
        </div>
        {(sidebarOpen || mobileOpen) && (
          <div className="animate-in fade-in duration-200">
            <span className="font-bold text-sm tracking-tight text-text-primary">ExpenseIQ</span>
            <span className="block text-[9px] font-semibold text-text-muted leading-none uppercase tracking-wider">
              FinTech OS
            </span>
          </div>
        )}
      </div>

      {/* Navigation List */}
      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 ${
                isActive
                  ? "bg-brand-primary/10 text-brand-primary font-bold shadow-2xs"
                  : "text-text-secondary hover:bg-neutral-secondary-bg hover:text-text-primary"
              }`}
            >
              {renderIcon(item.iconName, isActive)}
              {(sidebarOpen || mobileOpen) && (
                <span className="animate-in fade-in duration-200 shrink-0">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse Trigger Footer */}
      <div className="pt-4 border-t border-neutral-border">
        <button
          onClick={toggleSidebar}
          className="hidden lg:flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold text-text-secondary hover:bg-neutral-secondary-bg hover:text-text-primary transition-all duration-200"
        >
          {sidebarOpen ? (
            <>
              <Icons.ChevronLeft className="size-5 shrink-0" />
              <span>Collapse Sidebar</span>
            </>
          ) : (
            <Icons.ChevronRight className="size-5 mx-auto shrink-0" />
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Sticky Side-fixed panel) */}
      <aside
        className={`hidden lg:block fixed inset-y-0 left-0 z-40 h-screen transition-all duration-250 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        {navContent}
      </aside>

      {/* Mobile Drawer Trigger (Hamburger in Header communicates here) */}
      <div className="lg:hidden">
        {/* Mobile Sidebar overlay backdrop */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Mobile absolute sliding drawer */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 h-screen transform transition-transform duration-300 ease-out ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {navContent}
        </aside>

        {/* Mobile floating toggle button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="fixed bottom-6 left-6 z-40 p-3 rounded-full bg-brand-primary text-white shadow-lg hover:bg-brand-primary/95 transition-all duration-200 flex items-center justify-center border border-brand-primary/20"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <Icons.X className="size-5" /> : <Icons.Menu className="size-5" />}
        </button>
      </div>
    </>
  );
}
