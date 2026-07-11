"use server";

import { getDashboardData } from "./dashboard-service";

export async function getDashboardDataAction() {
  try {
    const data = await getDashboardData();
    return { success: true, data };
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Failed to load dashboard data";
    return { success: false, error: errMsg };
  }
}
