import React from "react";
import { TrendingUp } from "lucide-react";

export function AuthLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex items-center justify-center size-9 rounded-lg bg-brand-primary text-white shadow-sm">
        <TrendingUp className="size-5" />
      </div>
      <div>
        <span className="font-bold text-base tracking-tight text-text-primary">ExpenseIQ</span>
        <span className="block text-[10px] font-semibold text-text-muted leading-none uppercase tracking-wider">Auth Module</span>
      </div>
    </div>
  );
}
