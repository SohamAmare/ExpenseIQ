import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: number;
  description: string;
  trend?: number; // e.g. 12.5 represents +12.5%, -4.2 represents -4.2%
  icon: React.ComponentType<{ className?: string }>;
}

export function SummaryCard({ title, value, description, trend, icon: Icon }: SummaryCardProps) {
  const isPositive = trend !== undefined && trend > 0;
  const isNegative = trend !== undefined && trend < 0;

  return (
    <Card className="border border-neutral-border bg-white shadow-2xs hover:shadow-xs transition-all duration-200 overflow-hidden group">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-text-secondary tracking-wider uppercase leading-none">
            {title}
          </span>
          <div className="flex items-center justify-center size-8 rounded-lg bg-neutral-secondary-bg/50 border border-neutral-border group-hover:bg-brand-primary/10 group-hover:border-brand-primary/20 group-hover:text-brand-primary text-text-secondary transition-all duration-200">
            <Icon className="size-4 shrink-0" />
          </div>
        </div>

        <div className="mt-4 space-y-1">
          <h3 className="text-2xl font-extrabold text-text-primary tracking-tight leading-none">
            ₹{value.toLocaleString()}
          </h3>
          
          <div className="flex items-center gap-1.5 pt-1">
            {trend !== undefined && (
              <span
                className={`inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-sm ${
                  isPositive
                    ? "text-emerald-700 bg-emerald-50 border border-emerald-100"
                    : isNegative
                    ? "text-status-error bg-status-error/5 border border-status-error/10"
                    : "text-text-secondary bg-neutral-secondary-bg border border-neutral-border"
                }`}
              >
                {isPositive ? (
                  <ArrowUpRight className="size-3" />
                ) : (
                  <ArrowDownRight className="size-3" />
                )}
                {Math.abs(trend)}%
              </span>
            )}
            <span className="text-[10px] text-text-muted font-medium truncate">
              {description}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
