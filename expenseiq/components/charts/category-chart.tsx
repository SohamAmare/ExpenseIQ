"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { CategoryData } from "@/types/dashboard";

interface CategoryChartProps {
  data: CategoryData[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload?: CategoryData;
  }>;
}

// Declared outside of render function to avoid react-hooks/static-components error
const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-neutral-border p-3 rounded-lg shadow-sm text-[11px] font-semibold text-text-primary">
        <p className="font-bold mb-1">{payload[0].name}</p>
        <p className="text-brand-primary">Allocation: ₹{payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export function CategoryChart({ data }: CategoryChartProps) {
  // Safe fallback colors if none are configured in dataset
  const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ec4899"];

  return (
    <div className="w-full h-64 md:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color || COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            iconSize={8}
            formatter={(value) => (
              <span className="text-[10px] font-semibold text-text-secondary pr-1">
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
