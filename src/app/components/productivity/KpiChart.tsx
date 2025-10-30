"use client";

import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ProductivityTimelinePoint } from "@/app/lib/productivity/types";

interface KpiChartProps {
  data: ProductivityTimelinePoint[];
}

/**
 * Simple area chart leveraging Recharts to visualise the projected productivity
 * uplift over time. The chart intentionally mirrors the blue palette defined in
 * the design brief.
 */
export function KpiChart({ data }: KpiChartProps) {
  return (
    <div className="h-64 w-full rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Projection de productivité
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorProductivity" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="label" stroke="#94a3b8" tick={{ fontSize: 12 }} />
          <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              borderRadius: 12,
              border: "none",
              color: "white",
            }}
            cursor={{ stroke: "#2563eb", strokeWidth: 1 }}
          />
          <Area
            type="monotone"
            dataKey="productivityIndex"
            stroke="#2563eb"
            strokeWidth={2}
            fill="url(#colorProductivity)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
