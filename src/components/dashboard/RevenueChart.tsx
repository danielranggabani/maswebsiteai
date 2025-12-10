import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "Jan", revenue: 45000000, costs: 8000000 },
  { month: "Feb", revenue: 52000000, costs: 10000000 },
  { month: "Mar", revenue: 48000000, costs: 9500000 },
  { month: "Apr", revenue: 61000000, costs: 12000000 },
  { month: "May", revenue: 55000000, costs: 11000000 },
  { month: "Jun", revenue: 67000000, costs: 13500000 },
  { month: "Jul", revenue: 72000000, costs: 14000000 },
  { month: "Aug", revenue: 78000000, costs: 15500000 },
  { month: "Sep", revenue: 85000000, costs: 16000000 },
  { month: "Oct", revenue: 92000000, costs: 17500000 },
  { month: "Nov", revenue: 98000000, costs: 18000000 },
  { month: "Dec", revenue: 110000000, costs: 20000000 },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
};

export function RevenueChart() {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Revenue vs API Costs</h3>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-primary" />
            <span className="text-muted-foreground">Revenue</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-destructive" />
            <span className="text-muted-foreground">API Costs</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(153 67% 55%)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(153 67% 55%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorCosts" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(0 84% 60%)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(0 84% 60%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 19% 17%)" />
          <XAxis
            dataKey="month"
            stroke="hsl(210 20% 65%)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="hsl(210 20% 65%)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => formatCurrency(value)}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(220 26% 9%)",
              border: "1px solid hsl(217 19% 17%)",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
            }}
            labelStyle={{ color: "hsl(210 40% 96%)" }}
            formatter={(value: number) => [formatCurrency(value)]}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="hsl(153 67% 55%)"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorRevenue)"
          />
          <Area
            type="monotone"
            dataKey="costs"
            stroke="hsl(0 84% 60%)"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorCosts)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
