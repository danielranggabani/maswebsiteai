import { Activity, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface HealthMetric {
  name: string;
  status: "healthy" | "warning" | "error";
  value: string;
  description: string;
}

const metrics: HealthMetric[] = [
  {
    name: "API Uptime",
    status: "healthy",
    value: "99.9%",
    description: "Last 30 days",
  },
  {
    name: "Webhook Success",
    status: "healthy",
    value: "98.5%",
    description: "Last 24 hours",
  },
  {
    name: "Avg Response Time",
    status: "warning",
    value: "1.2s",
    description: "Above target",
  },
  {
    name: "Error Rate",
    status: "healthy",
    value: "0.02%",
    description: "Within limits",
  },
];

const statusStyles = {
  healthy: {
    bg: "bg-primary/10",
    text: "text-primary",
    icon: CheckCircle,
  },
  warning: {
    bg: "bg-chart-4/10",
    text: "text-chart-4",
    icon: AlertTriangle,
  },
  error: {
    bg: "bg-destructive/10",
    text: "text-destructive",
    icon: AlertTriangle,
  },
};

export function SystemHealth() {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="h-4 w-4 text-primary" />
        <h3 className="font-semibold text-foreground">System Health</h3>
      </div>
      <div className="space-y-3">
        {metrics.map((metric) => {
          const { bg, text, icon: Icon } = statusStyles[metric.status];
          return (
            <div
              key={metric.name}
              className="flex items-center justify-between rounded-md bg-secondary/50 p-3"
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg",
                    bg
                  )}
                >
                  <Icon className={cn("h-4 w-4", text)} />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {metric.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {metric.description}
                  </p>
                </div>
              </div>
              <span className={cn("text-lg font-semibold", text)}>
                {metric.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
