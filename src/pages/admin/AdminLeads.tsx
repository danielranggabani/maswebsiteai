import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Search,
  Filter,
  Download,
  MessageSquare,
  Phone,
  ExternalLink,
  Target,
  TrendingUp,
  Users,
  DollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Lead {
  id: string;
  name: string;
  whatsapp: string;
  status: "hot" | "warm" | "interested" | "cold";
  source: "whatsapp" | "website";
  client: string;
  product: string;
  lastContact: string;
  value: string;
}

const leads: Lead[] = [
  {
    id: "L001",
    name: "Budi Santoso",
    whatsapp: "+62812-1111-2222",
    status: "hot",
    source: "whatsapp",
    client: "PT Maju Bersama",
    product: "Premium Package",
    lastContact: "5 min ago",
    value: "Rp 5,000,000",
  },
  {
    id: "L002",
    name: "Siti Rahayu",
    whatsapp: "+62813-2222-3333",
    status: "warm",
    source: "whatsapp",
    client: "CV Teknologi Maju",
    product: "Standard Package",
    lastContact: "1 hour ago",
    value: "Rp 2,500,000",
  },
  {
    id: "L003",
    name: "Ahmad Wijaya",
    whatsapp: "+62814-3333-4444",
    status: "interested",
    source: "website",
    client: "UD Sinar Terang",
    product: "Consultation",
    lastContact: "3 hours ago",
    value: "Rp 1,000,000",
  },
  {
    id: "L004",
    name: "Dewi Lestari",
    whatsapp: "+62815-4444-5555",
    status: "hot",
    source: "whatsapp",
    client: "PT ABC Corp",
    product: "Enterprise Plan",
    lastContact: "30 min ago",
    value: "Rp 10,000,000",
  },
  {
    id: "L005",
    name: "Rudi Hartono",
    whatsapp: "+62816-5555-6666",
    status: "cold",
    source: "website",
    client: "Toko Online Jaya",
    product: "Starter Plan",
    lastContact: "2 days ago",
    value: "Rp 500,000",
  },
];

const statusStyles = {
  hot: "bg-destructive/10 text-destructive border-destructive/20",
  warm: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  interested: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  cold: "bg-muted text-muted-foreground border-border",
};

const funnelData = [
  { stage: "Traffic", count: 1250, percentage: 100 },
  { stage: "AI Engaged", count: 890, percentage: 71 },
  { stage: "Product Link Sent", count: 456, percentage: 36 },
  { stage: "Checkout Opened", count: 234, percentage: 19 },
  { stage: "Paid", count: 89, percentage: 7 },
];

export default function AdminLeads() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.whatsapp.includes(searchQuery);
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Leads Intelligence</h1>
          <p className="text-sm text-muted-foreground">
            Track and manage leads across all clients
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Leads
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Leads</p>
                <p className="text-2xl font-bold text-foreground">1,250</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Target className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Hot Leads</p>
                <p className="text-2xl font-bold text-foreground">89</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
                <TrendingUp className="h-5 w-5 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                <p className="text-2xl font-bold text-foreground">7.1%</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-2/10">
                <Users className="h-5 w-5 text-chart-2" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Potential Value</p>
                <p className="text-2xl font-bold text-foreground">Rp 125M</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-4/10">
                <DollarSign className="h-5 w-5 text-chart-4" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Funnel */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Lead Funnel</CardTitle>
          <CardDescription>Conversion visualization across stages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-4">
            {funnelData.map((stage, index) => (
              <div key={stage.stage} className="flex-1">
                <div
                  className="relative flex items-end justify-center rounded-t-lg bg-primary/20"
                  style={{ height: `${stage.percentage * 2}px`, minHeight: "40px" }}
                >
                  <div
                    className="absolute inset-0 rounded-t-lg bg-primary transition-opacity hover:opacity-80"
                    style={{ opacity: 0.3 + (stage.percentage / 100) * 0.7 }}
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

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]">
            <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="hot">Hot</SelectItem>
            <SelectItem value="warm">Warm</SelectItem>
            <SelectItem value="interested">Interested</SelectItem>
            <SelectItem value="cold">Cold</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">Lead</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-muted-foreground">Source</TableHead>
              <TableHead className="text-muted-foreground">Client</TableHead>
              <TableHead className="text-muted-foreground">Product</TableHead>
              <TableHead className="text-muted-foreground">Potential Value</TableHead>
              <TableHead className="text-muted-foreground">Last Contact</TableHead>
              <TableHead className="text-muted-foreground w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.map((lead) => (
              <TableRow key={lead.id} className="border-border">
                <TableCell>
                  <div>
                    <p className="font-medium text-foreground">{lead.name}</p>
                    <p className="text-xs text-muted-foreground">{lead.whatsapp}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn("capitalize", statusStyles[lead.status])}
                  >
                    {lead.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="capitalize">
                    {lead.source}
                  </Badge>
                </TableCell>
                <TableCell className="text-foreground">{lead.client}</TableCell>
                <TableCell className="text-muted-foreground">{lead.product}</TableCell>
                <TableCell className="font-medium text-primary">{lead.value}</TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {lead.lastContact}
                </TableCell>
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
      </div>
    </div>
  );
}
