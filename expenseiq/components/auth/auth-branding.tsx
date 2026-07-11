import React from "react";
import { Sparkles, Shield, BarChart3 } from "lucide-react";
import { AuthLogo } from "./auth-logo";

export function AuthBranding() {
  const highlights = [
    {
      icon: Sparkles,
      title: "AI-Powered Advisory",
      desc: "Instant suggestions and financial forecast queries using state-of-the-art AI Advisor modules.",
    },
    {
      icon: BarChart3,
      title: "Real-time Cash Ledgers",
      desc: "Track incomes, automated expenses, and budget thresholds in real time.",
    },
    {
      icon: Shield,
      title: "Enterprise Grade Security",
      desc: "Fully encrypted tokens and cookie session states backed by Supabase Auth architecture.",
    },
  ];

  return (
    <div className="hidden lg:flex flex-col justify-between w-[40%] xl:w-[45%] bg-neutral-secondary-bg border-r border-neutral-border p-12 relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-brand-primary/5 via-transparent to-transparent pointer-events-none" />

      {/* Top Branding Section */}
      <div className="relative z-10">
        <AuthLogo />
      </div>

      {/* Center Highlights */}
      <div className="relative z-10 space-y-8 my-auto">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary">
            The Financial Operating System for Builders.
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            Manage ledger balances, allocate real-time budgets, and optimize capital flows with contextual AI workspace insights.
          </p>
        </div>

        <div className="space-y-6 pt-4">
          {highlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <div key={i} className="flex gap-4 items-start">
                <div className="flex items-center justify-center size-8 rounded-lg bg-white border border-neutral-border text-brand-primary shrink-0 shadow-xs">
                  <Icon className="size-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-text-primary">{h.title}</h4>
                  <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">{h.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="relative z-10 text-[11px] text-text-muted flex justify-between">
        <span>© 2026 ExpenseIQ Corp.</span>
        <span>Secure Session Gate</span>
      </div>
    </div>
  );
}
