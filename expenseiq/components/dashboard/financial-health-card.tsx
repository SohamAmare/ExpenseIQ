import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Heart, Activity } from "lucide-react";
import { FinancialHealth } from "@/types/dashboard";

interface FinancialHealthCardProps {
  data: FinancialHealth;
}

export function FinancialHealthCard({ data }: FinancialHealthCardProps) {
  const getStatusColor = (status: FinancialHealth["status"]) => {
    switch (status) {
      case "excellent":
        return {
          text: "text-emerald-700 dark:text-emerald-400",
          border: "border-emerald-200 dark:border-emerald-900/30",
          bg: "bg-emerald-50/50 dark:bg-emerald-950/20",
          ring: "stroke-emerald-600 dark:stroke-emerald-500",
          track: "stroke-emerald-100 dark:stroke-emerald-900/20",
        };
      case "good":
        return {
          text: "text-brand-primary dark:text-emerald-400",
          border: "border-brand-primary/20 dark:border-emerald-900/30",
          bg: "bg-brand-primary/5 dark:bg-emerald-950/20",
          ring: "stroke-brand-primary dark:stroke-emerald-500",
          track: "stroke-brand-primary/10 dark:stroke-emerald-900/20",
        };
      case "fair":
        return {
          text: "text-status-warning dark:text-amber-400",
          border: "border-status-warning/20 dark:border-amber-900/30",
          bg: "bg-status-warning/5 dark:bg-amber-950/20",
          ring: "stroke-status-warning dark:stroke-amber-500",
          track: "stroke-status-warning/10 dark:stroke-amber-900/20",
        };
      default:
        return {
          text: "text-status-error dark:text-rose-400",
          border: "border-status-error/20 dark:border-rose-900/30",
          bg: "bg-status-error/5 dark:bg-rose-950/20",
          ring: "stroke-status-error dark:stroke-rose-500",
          track: "stroke-status-error/10 dark:stroke-rose-900/20",
        };
    }
  };

  const colors = getStatusColor(data.status);
  
  // Calculate SVG stroke offset for progress circle (Radius = 36, Circumference = 226)
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (data.score / 100) * circumference;

  return (
    <Card className="border border-neutral-border bg-card shadow-2xs h-full flex flex-col justify-between">
      <CardHeader className="pb-3 pt-5">
        <CardTitle className="text-xs font-bold text-text-secondary tracking-wider uppercase flex items-center justify-between">
          <span>Financial Health</span>
          <Activity className="size-4 text-text-muted" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pb-6 flex-grow flex flex-col justify-between">
        {/* Score Ring */}
        <div className="flex items-center justify-center pt-2">
          <div className="relative size-28 flex items-center justify-center">
            {/* SVG Ring */}
            <svg className="size-full -rotate-90">
              {/* Backing track circle */}
              <circle
                cx="56"
                cy="56"
                r={radius}
                className={`${colors.track} fill-transparent`}
                strokeWidth="8"
              />
              {/* Active animated indicator */}
              <circle
                cx="56"
                cy="56"
                r={radius}
                className={`${colors.ring} fill-transparent transition-all duration-500 ease-out`}
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute text-center">
              <span className="block text-2xl font-extrabold text-text-primary tracking-tight leading-none">
                {data.score}
              </span>
              <span className="block text-[9px] font-bold text-text-muted uppercase tracking-wider mt-1">
                Score
              </span>
            </div>
          </div>
        </div>

        {/* Rating and Description Box */}
        <div className={`p-4 rounded-xl border ${colors.border} ${colors.bg} space-y-1.5`}>
          <div className="flex items-center gap-1.5">
            <Heart className={`size-3.5 fill-current ${colors.text}`} />
            <span className={`text-xs font-extrabold capitalize ${colors.text}`}>
              {data.status} Rating
            </span>
          </div>
          <p className="text-[10px] text-text-secondary leading-relaxed font-semibold">
            {data.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
