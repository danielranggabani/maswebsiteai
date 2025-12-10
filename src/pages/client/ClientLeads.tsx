import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Filter,
  Download,
  MoreVertical,
  MessageSquare,
  UserPlus,
  Tag,
  Target,
  Users,
  TrendingUp,
  Flame,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Lead {
  id: string;
  name: string;
  phone: string;
  status: "hot" | "warm" | "interested" | "cold";
  source: "whatsapp" | "website";
  product: string;
  lastContact: string;
  assignedTo: string;
  value: string;
}

const leads: Lead[] = [
  {
    id: "1",
    name: "Budi Santoso",
    phone: "+62812-1111-2222",
    status: "hot",
    source: "whatsapp",
    product: "Premium Package",
    lastContact: "5 menit lalu",
    assignedTo: "Andi",
    value: "Rp 2.500.000",
  },
  {
    id: "2",
    name: "Siti Rahayu",
    phone: "+62813-2222-3333",
    status: "warm",
    source: "whatsapp",
    product: "Standard Package",
    lastContact: "1 jam lalu",
    assignedTo: "Bima",
    value: "Rp 1.200.000",
  },
  {
    id: "3",
    name: "Ahmad Wijaya",
    phone: "+62814-3333-4444",
    status: "interested",
    source: "website",
    product: "Starter Package",
    lastContact: "3 jam lalu",
    assignedTo: "-",
    value: "Rp 600.000",
  },
  {
    id: "4",
    name: "Dewi Lestari",
    phone: "+62815-4444-5555",
    status: "cold",
    source: "whatsapp",
    product: "-",
    lastContact: "2 hari lalu",
    assignedTo: "-",
    value: "-",
  },
  {
    id: "5",
    name: "Rudi Hartono",
    phone: "+62816-5555-6666",
    status: "warm",
    source: "website",
    product: "Premium Package",
    lastContact: "5 jam lalu",
    assignedTo: "Citra",
    value: "Rp 2.500.000",
  },
];

const statusConfig = {
  hot: { label: "Hot", className: "bg-destructive/10 text-destructive border-destructive/20" },
  warm: { label: "Warm", className: "bg-chart-4/10 text-chart-4 border-chart-4/20" },
  interested: { label: "Interested", className: "bg-chart-2/10 text-chart-2 border-chart-2/20" },
  cold: { label: "Cold", className: "bg-muted text-muted-foreground border-border" },
};

export default function ClientLeads() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery);
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: leads.length,
    hot: leads.filter((l) => l.status === "hot").length,
    warm: leads.filter((l) => l.status === "warm").length,
    converted: 12,
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total Leads</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
                <Flame className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.hot}</p>
                <p className="text-xs text-muted-foreground">Hot Leads</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-4/10">
                <Target className="h-5 w-5 text-chart-4" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.warm}</p>
                <p className="text-xs text-muted-foreground">Warm Leads</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-2/10">
                <TrendingUp className="h-5 w-5 text-chart-2" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.converted}</p>
                <p className="text-xs text-muted-foreground">Converted</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">All Leads</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
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
              <SelectTrigger className="w-40">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter status" />
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

          <div className="rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Est. Value</TableHead>
                  <TableHead>Last Contact</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell className="font-mono text-xs">{lead.phone}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn("text-xs", statusConfig[lead.status].className)}
                      >
                        {statusConfig[lead.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {lead.source === "whatsapp" ? "WhatsApp" : "Website"}
                      </Badge>
                    </TableCell>
                    <TableCell>{lead.product}</TableCell>
                    <TableCell className="font-medium text-primary">{lead.value}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {lead.lastContact}
                    </TableCell>
                    <TableCell>{lead.assignedTo}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            View Conversation
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <UserPlus className="mr-2 h-4 w-4" />
                            Assign
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Tag className="mr-2 h-4 w-4" />
                            Change Status
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
