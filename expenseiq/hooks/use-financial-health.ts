"use client";

import { useDashboard } from "./use-dashboard";

export function useFinancialHealth() {
  const { data, loading, error } = useDashboard();

  return {
    health: data?.health || null,
    loading,
    error,
  };
}
