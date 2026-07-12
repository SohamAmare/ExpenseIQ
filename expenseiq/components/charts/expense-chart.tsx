"use client";

import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { SpendingTrendPoint } from "@/types/dashboard";

interface ExpenseChartProps {
  data: SpendingTrendPoint[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
  }>;
  label?: string;
}

// Declared outside of render function to avoid react-hooks/static-components error
const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length >= 2) {
    return (
      <div className="bg-card border border-neutral-border p-3 rounded-lg shadow-sm text-[11px] font-semibold text-text-primary space-y-1">
        <p className="font-bold border-b border-neutral-border pb-1 mb-1">{label}</p>
        <p className="text-emerald-600">Income: ₹{payload[0].value.toLocaleString()}</p>
        <p className="text-status-error">Expense: ₹{payload[1].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export function ExpenseChart({ data }: ExpenseChartProps) {
  return (
    <div className="w-full h-64 md:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 5, left: -25, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.01}/>
            </linearGradient>
            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.15}/>
              <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.01}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--neutral-border)" />
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--text-muted)", fontSize: 10, fontWeight: 600 }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--text-muted)", fontSize: 10, fontWeight: 600 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            height={36}
            iconType="circle"
            iconSize={8}
            formatter={(value) => (
              <span className="text-[10px] font-semibold text-text-secondary pr-2 capitalize">
                {value}
              </span>
            )}
          />
          <Area
            type="monotone"
            dataKey="income"
            stroke="#10b981"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorIncome)"
          />
          <Area
            type="monotone"
            dataKey="expense"
            stroke="#f43f5e"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorExpense)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
