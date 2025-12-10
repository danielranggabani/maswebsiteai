import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { name: "PT Maju Bersama", tokens: 85000 },
  { name: "PT ABC Corp", tokens: 72000 },
  { name: "CV Teknologi Maju", tokens: 65000 },
  { name: "UD Sinar Terang", tokens: 52000 },
  { name: "Toko Online Jaya", tokens: 45000 },
  { name: "PT Delta Raya", tokens: 38000 },
  { name: "CV Sukses Mandiri", tokens: 32000 },
];

export function TopClientsChart() {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="mb-4 font-semibold text-foreground">
        Top Clients by Token Usage
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <XAxis
            type="number"
            stroke="hsl(210 20% 65%)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
          />
          <YAxis
            type="category"
            dataKey="name"
            stroke="hsl(210 20% 65%)"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            width={100}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(220 26% 9%)",
              border: "1px solid hsl(217 19% 17%)",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "hsl(210 40% 96%)" }}
            formatter={(value: number) => [`${value.toLocaleString()} tokens`]}
          />
          <Bar
            dataKey="tokens"
            fill="hsl(153 67% 55%)"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
