import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Calendar, CreditCard } from "lucide-react";
import { TodayOverview } from "@/types/dashboard";

interface TodaySummaryProps {
  data: TodayOverview;
}

export function TodaySummary({ data }: TodaySummaryProps) {
  const items = [
    {
      label: "Spent Today",
      value: `₹${data.moneySpentToday.toLocaleString()}`,
      icon: ArrowDown,
      color: "text-status-error bg-status-error/5 border-status-error/10",
    },
    {
      label: "Earned Today",
      value: `₹${data.moneyEarnedToday.toLocaleString()}`,
      icon: ArrowUp,
      color: "text-emerald-700 bg-emerald-50 border-emerald-100",
    },
    {
      label: "Bills Due Today",
      value: `${data.billsDueTodayCount} Pending`,
      icon: Calendar,
      color: "text-status-warning bg-status-warning/5 border-status-warning/10",
    },
    {
      label: "Remaining Daily Budget",
      value: `₹${data.budgetRemainingToday.toLocaleString()}`,
      icon: CreditCard,
      color: "text-text-primary bg-neutral-secondary-bg border-neutral-border",
    },
  ];

  return (
    <Card className="border border-neutral-border bg-white shadow-2xs">
      <CardHeader className="pb-3 pt-5">
        <CardTitle className="text-sm font-extrabold text-text-primary flex items-center gap-2">
          <span className="size-2 rounded-full bg-brand-primary animate-pulse" />
          Today&apos;s Financial Pulse
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-5">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className={`p-3.5 rounded-xl border flex items-center gap-3.5 ${item.color} hover:scale-[1.01] transition-all duration-200`}
            >
              <div className="flex items-center justify-center size-8 rounded-lg bg-white/70 border border-neutral-border/10 shrink-0 shadow-3xs">
                <Icon className="size-4" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <span className="block text-[10px] font-bold text-text-secondary uppercase tracking-wider truncate">
                  {item.label}
                </span>
                <span className="block text-sm font-extrabold text-text-primary truncate">
                  {item.value}
                </span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
