"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

interface MonthlyData {
  month: string
  label: string
  income: number
  expenses: number
}

interface MonthlySummaryChartProps {
  data: MonthlyData[]
}

export function MonthlySummaryChart({ data }: MonthlySummaryChartProps) {
  return (
    <div className="border border-dashed border-border p-3">
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <XAxis
            dataKey="label"
            tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${v}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px dashed hsl(var(--border))",
              borderRadius: "2px",
              fontSize: "12px",
            }}
            formatter={(value: number) => [`$${value}`, undefined]}
          />
          <Legend
            wrapperStyle={{ fontSize: "10px" }}
          />
          <Bar
            dataKey="income"
            name="In"
            fill="#16a34a"
            radius={[2, 2, 0, 0]}
          />
          <Bar
            dataKey="expenses"
            name="Out"
            fill="#ef4444"
            radius={[2, 2, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
