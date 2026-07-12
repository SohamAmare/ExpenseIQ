import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, ArrowRight } from "lucide-react";

export function InsightCard() {
  return (
    <Card className="border border-purple-100 dark:border-purple-900/30 bg-linear-to-br from-purple-50/50 via-card to-card dark:from-purple-950/10 dark:via-card dark:to-card shadow-2xs relative overflow-hidden group">
      {/* Visual background gradient decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />

      <CardContent className="p-6 space-y-4">
        {/* Widget Header badge */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center size-7 rounded-lg bg-purple-100 text-purple-700 shrink-0 shadow-3xs">
            <Sparkles className="size-3.5 fill-current animate-pulse" />
          </div>
          <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider">
            AI Advisor Recommendation
          </span>
        </div>

        {/* Insight content body */}
        <div className="space-y-1.5">
          <h4 className="text-sm font-bold text-text-primary leading-snug">
            Cloud infrastructure budget optimization suggestions loaded.
          </h4>
          <p className="text-[10px] text-text-secondary leading-relaxed font-semibold">
            AWS cloud server spending grew by 18% this month due to sandbox configurations. Consolidating inactive staging domains will save approximately <span className="text-purple-700 dark:text-purple-400 font-bold">₹1,200</span>.
          </p>
        </div>

        {/* Action link */}
        <div className="pt-2 border-t border-purple-100/50 flex items-center justify-between">
          <span className="text-[9px] font-bold text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-950/30 px-2 py-0.5 rounded-sm uppercase tracking-wider">
            Estimated Savings: ₹1,200/mo
          </span>
          <Link
            href="/ai-advisor"
            className="inline-flex items-center gap-1 text-[10px] font-bold text-purple-700 dark:text-purple-400 hover:text-purple-900 dark:hover:text-purple-300 transition-colors group-hover:translate-x-0.5 duration-250"
          >
            Review optimization
            <ArrowRight className="size-3 shrink-0" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
