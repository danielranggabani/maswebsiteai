import { CreditCard, MessageSquare, Target, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Activity {
  id: string;
  type: "payment" | "lead" | "message" | "signup";
  title: string;
  description: string;
  time: string;
  amount?: string;
}

const activities: Activity[] = [
  {
    id: "1",
    type: "payment",
    title: "Payment Received",
    description: "PT Maju Bersama - Premium Plan",
    time: "2 minutes ago",
    amount: "Rp 2,500,000",
  },
  {
    id: "2",
    type: "lead",
    title: "New Hot Lead",
    description: "Contact from WhatsApp - interested in AI solution",
    time: "15 minutes ago",
  },
  {
    id: "3",
    type: "signup",
    title: "New Client Signup",
    description: "CV Teknologi Maju started trial",
    time: "1 hour ago",
  },
  {
    id: "4",
    type: "message",
    title: "High Volume Alert",
    description: "PT ABC Corp exceeded 10k messages today",
    time: "2 hours ago",
  },
  {
    id: "5",
    type: "payment",
    title: "Payment Received",
    description: "UD Sinar Terang - Standard Plan",
    time: "3 hours ago",
    amount: "Rp 1,200,000",
  },
];

const iconMap = {
  payment: CreditCard,
  lead: Target,
  message: MessageSquare,
  signup: UserPlus,
};

const colorMap = {
  payment: "bg-primary/10 text-primary",
  lead: "bg-chart-4/10 text-chart-4",
  message: "bg-chart-2/10 text-chart-2",
  signup: "bg-chart-3/10 text-chart-3",
};

export function RecentActivity() {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="font-semibold text-foreground">Recent Activity</h3>
      <div className="mt-4 space-y-4">
        {activities.map((activity) => {
          const Icon = iconMap[activity.type];
          return (
            <div key={activity.id} className="flex items-start gap-3">
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                  colorMap[activity.type]
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-foreground truncate">
                    {activity.title}
                  </p>
                  {activity.amount && (
                    <span className="text-sm font-semibold text-primary">
                      {activity.amount}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {activity.description}
                </p>
                <p className="text-xs text-muted-foreground/70 mt-0.5">
                  {activity.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
