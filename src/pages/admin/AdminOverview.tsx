import { DollarSign, Users, Cpu, TrendingUp, Calendar } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { MiniChart } from "@/components/dashboard/MiniChart";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { ClientsTable } from "@/components/dashboard/ClientsTable";
import { TopClientsChart } from "@/components/dashboard/TopClientsChart";
import { SystemHealth } from "@/components/dashboard/SystemHealth";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mrrData = Array.from({ length: 12 }, (_, i) => ({
  value: 45 + Math.random() * 30 + i * 5,
}));

const clientsData = Array.from({ length: 12 }, (_, i) => ({
  value: 20 + Math.random() * 10 + i * 2,
}));

const tokenData = Array.from({ length: 12 }, (_, i) => ({
  value: 10 + Math.random() * 20 + i * 3,
}));

const profitData = Array.from({ length: 12 }, (_, i) => ({
  value: 35 + Math.random() * 25 + i * 4,
}));

export default function AdminOverview() {
  const today = new Date();
  const greeting =
    today.getHours() < 12
      ? "Good morning"
      : today.getHours() < 18
      ? "Good afternoon"
      : "Good evening";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {greeting}, Admin
          </h1>
          <p className="text-sm text-muted-foreground">
            Here's what's happening with your platform today
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="7d">
            <SelectTrigger className="w-[140px] bg-secondary">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Users className="mr-2 h-4 w-4" />
            Add Client
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Monthly Recurring Revenue"
          value="Rp 125,000,000"
          change={{ value: 12.5, type: "increase" }}
          icon={<DollarSign className="h-5 w-5" />}
          chart={<MiniChart data={mrrData} color="primary" />}
        />
        <StatsCard
          title="Total Active Clients"
          value="48"
          change={{ value: 8, type: "increase" }}
          icon={<Users className="h-5 w-5" />}
          chart={<MiniChart data={clientsData} color="chart-2" />}
        />
        <StatsCard
          title="Token Usage (Cost)"
          value="Rp 18,500,000"
          change={{ value: 15.2, type: "increase" }}
          icon={<Cpu className="h-5 w-5" />}
          chart={<MiniChart data={tokenData} color="destructive" />}
        />
        <StatsCard
          title="Net Profit"
          value="Rp 106,500,000"
          change={{ value: 11.8, type: "increase" }}
          icon={<TrendingUp className="h-5 w-5" />}
          chart={<MiniChart data={profitData} color="primary" />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>

      {/* Secondary Row */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ClientsTable />
        </div>
        <div className="space-y-4">
          <TopClientsChart />
          <SystemHealth />
        </div>
      </div>
    </div>
  );
}
