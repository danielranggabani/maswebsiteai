import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CreditCard,
  Download,
  Calendar,
  Zap,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: "paid" | "pending" | "overdue";
  description: string;
}

const invoices: Invoice[] = [
  {
    id: "INV-2024-001",
    date: "1 Dec 2024",
    amount: "Rp 2.500.000",
    status: "paid",
    description: "Premium Plan - December 2024",
  },
  {
    id: "INV-2024-002",
    date: "1 Nov 2024",
    amount: "Rp 2.500.000",
    status: "paid",
    description: "Premium Plan - November 2024",
  },
  {
    id: "INV-2024-003",
    date: "1 Oct 2024",
    amount: "Rp 2.500.000",
    status: "paid",
    description: "Premium Plan - October 2024",
  },
  {
    id: "INV-2024-004",
    date: "1 Sep 2024",
    amount: "Rp 1.200.000",
    status: "paid",
    description: "Standard Plan - September 2024",
  },
];

const statusConfig = {
  paid: {
    label: "Paid",
    icon: CheckCircle,
    className: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    className: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  },
  overdue: {
    label: "Overdue",
    icon: AlertTriangle,
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
};

export default function ClientBilling() {
  const currentPlan = {
    name: "Premium Plan",
    price: "Rp 2.500.000",
    period: "per month",
    tokensIncluded: 100000,
    tokensUsed: 67500,
    nextBilling: "1 January 2025",
    features: [
      "100,000 tokens/month",
      "Unlimited WhatsApp",
      "Priority support",
      "Custom AI training",
      "Advanced analytics",
    ],
  };

  const tokenUsagePercent = (currentPlan.tokensUsed / currentPlan.tokensIncluded) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Billing & Subscription</h1>
          <p className="text-muted-foreground">
            Manage your subscription and view billing history
          </p>
        </div>
        <Button>
          <CreditCard className="mr-2 h-4 w-4" />
          Update Payment Method
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Current Plan */}
        <Card className="col-span-2 bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {currentPlan.name}
                  <Badge className="bg-primary/10 text-primary border-primary/20">Active</Badge>
                </CardTitle>
                <CardDescription>Your current subscription plan</CardDescription>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-foreground">{currentPlan.price}</p>
                <p className="text-sm text-muted-foreground">{currentPlan.period}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Token Usage */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Token Usage</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {currentPlan.tokensUsed.toLocaleString()} /{" "}
                  {currentPlan.tokensIncluded.toLocaleString()}
                </span>
              </div>
              <Progress
                value={tokenUsagePercent}
                className={cn(
                  "h-2",
                  tokenUsagePercent > 90 ? "[&>div]:bg-destructive" : "[&>div]:bg-primary"
                )}
              />
              {tokenUsagePercent > 80 && (
                <div className="flex items-center gap-2 text-sm text-chart-4">
                  <AlertTriangle className="h-4 w-4" />
                  <span>
                    {tokenUsagePercent > 90
                      ? "Token usage almost exhausted!"
                      : "Token usage is high. Consider upgrading."}
                  </span>
                </div>
              )}
            </div>

            {/* Features */}
            <div>
              <h4 className="text-sm font-medium mb-3">Plan Features</h4>
              <div className="grid grid-cols-2 gap-2">
                {currentPlan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-chart-2" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Next Billing */}
            <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Next Billing Date</p>
                  <p className="text-xs text-muted-foreground">{currentPlan.nextBilling}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <ArrowUpRight className="mr-2 h-4 w-4" />
                Upgrade Plan
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <ArrowUpRight className="mr-2 h-4 w-4" />
                Upgrade Plan
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Zap className="mr-2 h-4 w-4" />
                Buy Extra Tokens
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="mr-2 h-4 w-4" />
                Download All Invoices
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-base">Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Contact our billing support team for any questions about your subscription.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Invoice History */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Invoice History</CardTitle>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => {
                  const status = statusConfig[invoice.status];
                  return (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-mono text-sm">{invoice.id}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.description}</TableCell>
                      <TableCell className="font-medium">{invoice.amount}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn("text-xs", status.className)}>
                          <status.icon className="mr-1 h-3 w-3" />
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
