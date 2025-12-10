import { Area, AreaChart, ResponsiveContainer } from "recharts";

interface MiniChartProps {
  data: { value: number }[];
  color?: "primary" | "destructive" | "chart-2";
  height?: number;
}

export function MiniChart({ data, color = "primary", height = 40 }: MiniChartProps) {
  const colorMap = {
    primary: "hsl(153 67% 55%)",
    destructive: "hsl(0 84% 60%)",
    "chart-2": "hsl(199 89% 48%)",
  };

  const strokeColor = colorMap[color];
  const fillColor = colorMap[color];

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={fillColor} stopOpacity={0.3} />
            <stop offset="100%" stopColor={fillColor} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="value"
          stroke={strokeColor}
          strokeWidth={2}
          fill={`url(#gradient-${color})`}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
