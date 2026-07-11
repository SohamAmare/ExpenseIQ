"use client";

import { useState, useEffect, useCallback } from "react";
import { DashboardData } from "@/types/dashboard";
import { getDashboardDataAction } from "@/lib/dashboard/actions";
import { toast } from "sonner";

export function useDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [syncMessage, setSyncMessage] = useState("Never synced");

  // Load telemetry from server action (used for manual refresh clicks)
  const refreshDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getDashboardDataAction();
      if (result.success && result.data) {
        setData(result.data);
        setLastSync(new Date());
      } else {
        setError(result.error || "Failed to load dashboard statistics");
        toast.error(result.error || "Failed to load dashboard data");
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  // Set up initial load asynchronously on mount
  useEffect(() => {
    let active = true;

    async function initFetch() {
      try {
        const result = await getDashboardDataAction();
        if (!active) return;

        if (result.success && result.data) {
          setData(result.data);
          setLastSync(new Date());
        } else {
          setError(result.error || "Failed to load dashboard statistics");
          toast.error(result.error || "Failed to load dashboard data");
        }
      } catch (err: unknown) {
        if (!active) return;
        const errMsg = err instanceof Error ? err.message : "An unexpected error occurred.";
        setError(errMsg);
        toast.error(errMsg);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    initFetch();

    return () => {
      active = false;
    };
  }, []);

  // Update last synced counter message every minute
  useEffect(() => {
    if (!lastSync) return;

    const updateMessage = () => {
      const diffMs = new Date().getTime() - lastSync.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      
      if (diffMins === 0) {
        setSyncMessage("Just now");
      } else if (diffMins === 1) {
        setSyncMessage("1 minute ago");
      } else {
        setSyncMessage(`${diffMins} minutes ago`);
      }
    };

    updateMessage();
    const interval = setInterval(updateMessage, 60000); // every minute
    return () => clearInterval(interval);
  }, [lastSync]);

  // Compute greeting message based on local time
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good Morning";
    if (hours < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return {
    data,
    loading,
    error,
    syncMessage,
    greeting: getGreeting(),
    refresh: refreshDashboard,
  };
}
