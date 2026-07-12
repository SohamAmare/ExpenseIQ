import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus, Wallet, PieChart, Target } from "lucide-react";

export function QuickActions() {
  const actions = [
    {
      label: "Add Income",
      desc: "Record incoming cash",
      href: "/income?action=new",
      icon: Wallet,
      color: "text-emerald-700 bg-emerald-50 border-emerald-100/50 hover:bg-emerald-100/20 dark:text-emerald-400 dark:bg-emerald-950/20 dark:border-emerald-900/30 dark:hover:bg-emerald-950/40",
    },
    {
      label: "Add Expense",
      desc: "Log new expenditure",
      href: "/expenses?action=new",
      icon: Plus,
      color: "text-status-error bg-status-error/5 border-status-error/10 hover:bg-status-error/10 dark:text-rose-400 dark:bg-rose-950/20 dark:border-rose-900/30 dark:hover:bg-rose-950/40",
    },
    {
      label: "Create Budget",
      desc: "Set monthly limit",
      href: "/budgets?action=new",
      icon: PieChart,
      color: "text-brand-primary bg-brand-primary/5 border-brand-primary/10 hover:bg-brand-primary/10 dark:text-emerald-400 dark:bg-emerald-950/20 dark:border-emerald-900/30 dark:hover:bg-emerald-950/40",
    },
    {
      label: "New Savings Goal",
      desc: "Track purchase target",
      href: "/savings?action=new",
      icon: Target,
      color: "text-status-warning bg-status-warning/5 border-status-warning/10 hover:bg-status-warning/10 dark:text-amber-400 dark:bg-amber-950/20 dark:border-amber-900/30 dark:hover:bg-amber-950/40",
    },
  ];

  return (
    <Card className="border border-neutral-border bg-card shadow-2xs">
      <CardHeader className="pb-3 pt-5">
        <CardTitle className="text-xs font-bold text-text-secondary tracking-wider uppercase">
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3.5 pb-5">
        {actions.map((act, index) => {
          const Icon = act.icon;
          return (
            <Link
              key={index}
              href={act.href}
              className={`p-3 rounded-xl border flex flex-col justify-between items-start gap-3 transition-all duration-200 text-left ${act.color}`}
            >
              <div className="flex items-center justify-center size-8 rounded-lg bg-card border border-neutral-border shrink-0 shadow-3xs">
                <Icon className="size-4.5" />
              </div>
              <div className="space-y-0.5">
                <span className="block text-xs font-bold text-text-primary leading-none">
                  {act.label}
                </span>
                <span className="block text-[9px] font-semibold text-text-muted leading-relaxed">
                  {act.desc}
                </span>
              </div>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}
