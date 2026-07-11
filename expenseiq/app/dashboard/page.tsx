"use client";

import React from "react";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  RefreshCw,
  TrendingUp,
  PieChart
} from "lucide-react";
import { useDashboard } from "@/hooks/use-dashboard";
import { PageContainer } from "@/components/layout/page-container";
import { SummaryCard } from "@/components/dashboard/summary-card";
import { TodaySummary } from "@/components/dashboard/today-summary";
import { ExpenseChart } from "@/components/charts/expense-chart";
import { CategoryChart } from "@/components/charts/category-chart";
import { FinancialHealthCard } from "@/components/dashboard/financial-health-card";
import { UpcomingPayments } from "@/components/dashboard/upcoming-payments";
import { InsightCard } from "@/components/dashboard/insight-card";
import { FinancialQuote } from "@/components/dashboard/financial-quote";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { FloatingAI } from "@/components/dashboard/floating-ai";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
  const { data, loading, syncMessage, greeting, refresh } = useDashboard();

  if (loading || !data) {
    return (
      <PageContainer>
        {/* Loading Skeleton Grid matching original layout */}
        <div className="space-y-6 animate-pulse">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-3 w-32" />
            </div>
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>

          <Skeleton className="h-24 w-full rounded-xl" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-28 rounded-xl" />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-80 rounded-xl" />
              <Skeleton className="h-80 rounded-xl" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-64 rounded-xl" />
              <Skeleton className="h-44 rounded-xl" />
            </div>
          </div>
        </div>
      </PageContainer>
    );
  }

  // Get current formatted calendar date
  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <PageContainer>
      {/* Greeting Banner */}
      <div className="flex justify-between items-end border-b border-neutral-border pb-4">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-text-primary">
            {greeting}, Soham 👋
          </h1>
          <p className="text-[11px] font-semibold text-text-secondary mt-1">
            {formattedDate}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-text-muted">
            Synced: {syncMessage}
          </span>
          <button
            onClick={refresh}
            className="flex items-center justify-center size-8 rounded-lg hover:bg-neutral-secondary-bg text-text-secondary hover:text-text-primary border border-neutral-border/50 bg-white transition-colors duration-200"
            aria-label="Refresh telemetry"
          >
            <RefreshCw className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Today's Brief Overview */}
      <TodaySummary data={data.today} />

      {/* Financial Snapshot Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SummaryCard
          title="Current Balance"
          value={data.summary.currentBalance}
          description="Net available cash flow"
          trend={8.3}
          icon={Wallet}
        />
        <SummaryCard
          title="Monthly Income"
          value={data.summary.monthlyIncome}
          description="Active client billings"
          trend={12.4}
          icon={ArrowUpRight}
        />
        <SummaryCard
          title="Monthly Expense"
          value={data.summary.monthlyExpense}
          description="Infrastructure expenditures"
          trend={-3.2}
          icon={ArrowDownRight}
        />
        <SummaryCard
          title="Current Savings"
          value={data.summary.currentSavings}
          description="Allocated emergency reserves"
          trend={15.0}
          icon={Target}
        />
      </div>

      {/* Main Grid: Left analytics graphs and Right informational indicators */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Side: Analytics Charts (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Spending Trend Area */}
          <Card className="border border-neutral-border bg-white shadow-2xs">
            <CardHeader className="pb-3 pt-5 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-bold text-text-secondary tracking-wider uppercase flex items-center gap-2 leading-none">
                <TrendingUp className="size-4 text-brand-primary" />
                Income vs Expense Flow
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ExpenseChart data={data.spendingTrend} />
            </CardContent>
          </Card>

          {/* Category Allocation */}
          <Card className="border border-neutral-border bg-white shadow-2xs">
            <CardHeader className="pb-3 pt-5 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-bold text-text-secondary tracking-wider uppercase flex items-center gap-2 leading-none">
                <PieChart className="size-4 text-brand-primary" />
                Budget Category Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CategoryChart data={data.categoryBreakdown} />
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Informational widgets (1/3 width) */}
        <div className="space-y-6">
          {/* Core rating */}
          <FinancialHealthCard data={data.health} />

          {/* AI Optimizer Recommendations */}
          <InsightCard />

          {/* Upcoming Bills Alert */}
          <UpcomingPayments data={data.upcomingPayments} />

          {/* Shortcuts Panel */}
          <QuickActions />

          {/* Daily financial quote */}
          <FinancialQuote data={data.quote} />
        </div>
      </div>

      {/* Floating AI Bubbles */}
      <FloatingAI />
    </PageContainer>
  );
}
