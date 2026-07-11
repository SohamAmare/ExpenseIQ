"use client";

import React, { useState, useRef, useEffect } from "react";
import { Bell, AlertTriangle, Sparkles, X } from "lucide-react";

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Mock notifications representing actual system telemetry
  const [notifications, setNotifications] = useState([
    {
      id: "n-1",
      title: "Budget Threshold Warning",
      desc: "Cloud infrastructure budget has reached 83% of allocated limits.",
      time: "5m ago",
      icon: AlertTriangle,
      color: "text-status-warning bg-status-warning/10 border-status-warning/15",
    },
    {
      id: "n-2",
      title: "AI Optimizer Insight",
      desc: "Figma plan optimization suggestions loaded: save up to ₹1,200.",
      time: "1h ago",
      icon: Sparkles,
      color: "text-brand-primary bg-brand-primary/10 border-brand-primary/15",
    },
  ]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleClear = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const handleMarkAllRead = () => {
    setUnreadCount(0);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="relative flex items-center justify-center size-9 rounded-lg hover:bg-neutral-secondary-bg transition-colors duration-200"
        aria-label="View notifications"
      >
        <Bell className="size-4.5 text-text-secondary hover:text-text-primary" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 size-4 bg-status-error text-white font-bold text-[9px] flex items-center justify-center rounded-full animate-pulse border border-white">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-neutral-border rounded-xl shadow-lg z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-border bg-neutral-secondary-bg/20">
            <span className="font-bold text-xs text-text-primary">System Notifications</span>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-[10px] font-semibold text-brand-primary hover:underline"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-72 overflow-y-auto divide-y divide-neutral-border">
            {notifications.length > 0 ? (
              notifications.map((n) => {
                const Icon = n.icon;
                return (
                  <div key={n.id} className="p-4 hover:bg-neutral-secondary-bg/20 transition-colors duration-150 flex gap-3 relative group">
                    <div className={`flex items-center justify-center size-8 rounded-lg border ${n.color} shrink-0`}>
                      <Icon className="size-4" />
                    </div>
                    <div className="space-y-0.5 flex-1 pr-4">
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="text-xs font-bold text-text-primary leading-tight">{n.title}</h4>
                        <span className="text-[9px] text-text-muted shrink-0 mt-0.5">{n.time}</span>
                      </div>
                      <p className="text-[10px] text-text-secondary leading-relaxed">{n.desc}</p>
                    </div>
                    <button
                      onClick={(e) => handleClear(n.id, e)}
                      className="absolute right-3 top-4 text-text-muted hover:text-text-primary size-5 flex items-center justify-center rounded-md hover:bg-neutral-secondary-bg/50 opacity-0 group-hover:opacity-100 transition-all duration-200"
                      aria-label="Remove notification"
                    >
                      <X className="size-3" />
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="py-8 px-4 text-center text-text-muted flex flex-col items-center justify-center">
                <Bell className="size-8 mb-2 text-text-disabled" />
                <p className="text-xs font-medium">All caught up! No notifications.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
