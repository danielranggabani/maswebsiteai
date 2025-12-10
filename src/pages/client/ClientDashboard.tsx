import { StatsCard } from "@/components/dashboard/StatsCard";
import { MiniChart } from "@/components/dashboard/MiniChart";
import {
  MessageSquare,
  Target,
  DollarSign,
  TrendingUp,
  Phone,
  ExternalLink,
  Flame,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const chatsData = Array.from({ length: 12 }, (_, i) => ({
  value: 100 + Math.random() * 50 + i * 10,
}));

const leadsData = Array.from({ length: 12 }, (_, i) => ({
  value: 10 + Math.random() * 15 + i * 2,
}));

const revenueData = Array.from({ length: 12 }, (_, i) => ({
  value: 2 + Math.random() * 3 + i * 0.5,
}));

const conversionData = Array.from({ length: 12 }, (_, i) => ({
  value: 5 + Math.random() * 8,
}));

const funnelData = [
  { stage: "Traffic", count: 450, percentage: 100, color: "bg-primary" },
  { stage: "AI Engaged", count: 320, percentage: 71, color: "bg-primary/80" },
  { stage: "Product Link Sent", count: 164, percentage: 36, color: "bg-primary/60" },
  { stage: "Checkout Opened", count: 85, percentage: 19, color: "bg-primary/40" },
  { stage: "Paid", count: 32, percentage: 7, color: "bg-primary/30" },
];

interface Lead {
  id: string;
  name: string;
  whatsapp: string;
  status: "hot" | "warm" | "interested" | "cold";
  product: string;
  lastContact: string;
  assignedTo: string;
}

const recentLeads: Lead[] = [
  {
    id: "L001",
    name: "Budi Santoso",
    whatsapp: "+62812-1111-2222",
    status: "hot",
    product: "Premium Package",
    lastContact: "5 min ago",
    assignedTo: "Andi",
  },
  {
    id: "L002",
    name: "Siti Rahayu",
    whatsapp: "+62813-2222-3333",
    status: "warm",
    product: "Standard Package",
    lastContact: "1 hour ago",
    assignedTo: "Dewi",
  },
  {
    id: "L003",
    name: "Ahmad Wijaya",
    whatsapp: "+62814-3333-4444",
    status: "hot",
    product: "Consultation",
    lastContact: "3 hours ago",
    assignedTo: "Andi",
  },
  {
    id: "L004",
    name: "Dewi Lestari",
    whatsapp: "+62815-4444-5555",
    status: "interested",
    product: "Premium Package",
    lastContact: "30 min ago",
    assignedTo: "-",
  },
];

const statusStyles = {
  hot: "bg-destructive/10 text-destructive border-destructive/20",
  warm: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  interested: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  cold: "bg-muted text-muted-foreground border-border",
};

const aiSuggestions = [
  {
    icon: Flame,
    title: "Follow up with Budi Santoso",
    description: "High intent detected - mentioned budget approval",
    action: "View Conversation",
  },
  {
    icon: Target,
    title: "3 leads ready for payment link",
    description: "Customers asked about pricing details",
    action: "Send Links",
  },
];

export default function ClientDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics & ROI</h1>
        <p className="text-sm text-muted-foreground">
          Track your AI chatbot performance and revenue
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Chats"
          value="1,247"
          change={{ value: 15.2, type: "increase" }}
          icon={<MessageSquare className="h-5 w-5" />}
          chart={<MiniChart data={chatsData} color="chart-2" />}
        />
        <StatsCard
          title="Leads Generated"
          value="89"
          change={{ value: 23, type: "increase" }}
          icon={<Target className="h-5 w-5" />}
          chart={<MiniChart data={leadsData} color="primary" />}
        />
        <StatsCard
          title="Revenue Generated"
          value="Rp 45,500,000"
          change={{ value: 18.5, type: "increase" }}
          icon={<DollarSign className="h-5 w-5" />}
          chart={<MiniChart data={revenueData} color="primary" />}
        />
        <StatsCard
          title="Conversion Rate"
          value="7.1%"
          change={{ value: 2.3, type: "increase" }}
          icon={<TrendingUp className="h-5 w-5" />}
          chart={<MiniChart data={conversionData} color="chart-2" />}
        />
      </div>

      {/* Funnel & AI Suggestions */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="border-border bg-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-foreground">Conversion Funnel</CardTitle>
            <CardDescription>Customer journey from traffic to payment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-4">
              {funnelData.map((stage) => (
                <div key={stage.stage} className="flex-1">
                  <div
                    className="relative flex items-end justify-center rounded-t-lg"
                    style={{ height: `${stage.percentage * 1.5 + 30}px` }}
                  >
                    <div
                      className={cn(
                        "absolute inset-0 rounded-t-lg transition-opacity hover:opacity-80",
                        stage.color
                      )}
                    />
                    <span className="relative z-10 pb-2 text-sm font-semibold text-foreground">
                      {stage.count}
                    </span>
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-xs font-medium text-foreground">{stage.stage}</p>
                    <p className="text-xs text-muted-foreground">{stage.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">AI Suggestions</CardTitle>
            <CardDescription>Recommended actions based on lead activity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {aiSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="rounded-lg border border-border bg-secondary/30 p-3"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <suggestion.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {suggestion.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {suggestion.description}
                    </p>
                    <Button variant="link" size="sm" className="h-auto p-0 mt-1 text-primary">
                      {suggestion.action}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Leads */}
      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-foreground">Recent Leads</CardTitle>
            <CardDescription>Latest high-value leads from your AI chatbot</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            View All Leads
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Name</TableHead>
                <TableHead className="text-muted-foreground">WhatsApp</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">Product</TableHead>
                <TableHead className="text-muted-foreground">Last Contact</TableHead>
                <TableHead className="text-muted-foreground">Assigned</TableHead>
                <TableHead className="text-muted-foreground w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentLeads.map((lead) => (
                <TableRow key={lead.id} className="border-border">
                  <TableCell className="font-medium text-foreground">
                    {lead.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {lead.whatsapp}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn("capitalize", statusStyles[lead.status])}
                    >
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{lead.product}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {lead.lastContact}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{lead.assignedTo}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
