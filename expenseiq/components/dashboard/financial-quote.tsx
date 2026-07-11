import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { DailyQuote } from "@/types/dashboard";

interface FinancialQuoteProps {
  data: DailyQuote;
}

export function FinancialQuote({ data }: FinancialQuoteProps) {
  return (
    <Card className="border border-neutral-border bg-neutral-secondary-bg/30 shadow-2xs relative overflow-hidden h-full flex items-center justify-center">
      {/* Background watermarked Quote decoration */}
      <Quote className="absolute -right-4 -bottom-4 size-24 text-neutral-secondary-bg pointer-events-none opacity-50" />

      <CardContent className="p-6 space-y-3 relative z-10 text-center max-w-sm mx-auto">
        <div className="inline-flex items-center justify-center size-7 rounded-full bg-brand-primary/10 text-brand-primary mb-1">
          <Quote className="size-3.5 fill-current" />
        </div>
        <blockquote className="text-xs font-semibold italic text-text-primary leading-relaxed">
          &ldquo;{data.text}&rdquo;
        </blockquote>
        <div className="space-y-0.5">
          <cite className="block text-[10px] font-bold text-text-primary not-italic">
            — {data.author}
          </cite>
          <span className="inline-block text-[9px] font-bold text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded-sm uppercase tracking-wider">
            {data.category}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
