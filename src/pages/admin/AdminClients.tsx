import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  MoreHorizontal,
  ExternalLink,
  Pencil,
  Ban,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Client {
  id: string;
  businessName: string;
  contactEmail: string;
  whatsapp: string;
  status: "active" | "trial" | "overdue" | "suspended";
  plan: string;
  tokenUsage: number;
  tokenLimit: number;
  lastPayment: string;
  nextRenewal: string;
  arr: string;
}

const clients: Client[] = [
  {
    id: "CLT001",
    businessName: "PT Maju Bersama",
    contactEmail: "admin@majubersama.id",
    whatsapp: "+62812-3456-7890",
    status: "active",
    plan: "Premium",
    tokenUsage: 85000,
    tokenLimit: 100000,
    lastPayment: "2024-01-15",
    nextRenewal: "2024-02-15",
    arr: "Rp 30,000,000",
  },
  {
    id: "CLT002",
    businessName: "CV Teknologi Maju",
    contactEmail: "info@teknomaju.com",
    whatsapp: "+62813-4567-8901",
    status: "trial",
    plan: "Standard",
    tokenUsage: 12000,
    tokenLimit: 50000,
    lastPayment: "-",
    nextRenewal: "2024-02-01",
    arr: "Rp 14,400,000",
  },
  {
    id: "CLT003",
    businessName: "UD Sinar Terang",
    contactEmail: "contact@sinarterang.id",
    whatsapp: "+62814-5678-9012",
    status: "active",
    plan: "Standard",
    tokenUsage: 35000,
    tokenLimit: 50000,
    lastPayment: "2024-01-10",
    nextRenewal: "2024-02-10",
    arr: "Rp 14,400,000",
  },
  {
    id: "CLT004",
    businessName: "PT ABC Corp",
    contactEmail: "admin@abccorp.co.id",
    whatsapp: "+62815-6789-0123",
    status: "overdue",
    plan: "Premium",
    tokenUsage: 95000,
    tokenLimit: 100000,
    lastPayment: "2023-12-15",
    nextRenewal: "2024-01-15",
    arr: "Rp 30,000,000",
  },
  {
    id: "CLT005",
    businessName: "Toko Online Jaya",
    contactEmail: "owner@tokojaya.com",
    whatsapp: "+62816-7890-1234",
    status: "active",
    plan: "Starter",
    tokenUsage: 8000,
    tokenLimit: 20000,
    lastPayment: "2024-01-20",
    nextRenewal: "2024-02-20",
    arr: "Rp 7,200,000",
  },
  {
    id: "CLT006",
    businessName: "PT Delta Raya",
    contactEmail: "hello@deltaraya.id",
    whatsapp: "+62817-8901-2345",
    status: "active",
    plan: "Premium",
    tokenUsage: 72000,
    tokenLimit: 100000,
    lastPayment: "2024-01-18",
    nextRenewal: "2024-02-18",
    arr: "Rp 30,000,000",
  },
  {
    id: "CLT007",
    businessName: "CV Sukses Mandiri",
    contactEmail: "info@suksesmandiri.com",
    whatsapp: "+62818-9012-3456",
    status: "suspended",
    plan: "Standard",
    tokenUsage: 0,
    tokenLimit: 50000,
    lastPayment: "2023-11-20",
    nextRenewal: "-",
    arr: "Rp 0",
  },
];

const statusStyles = {
  active: "bg-primary/10 text-primary border-primary/20",
  trial: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  overdue: "bg-destructive/10 text-destructive border-destructive/20",
  suspended: "bg-muted text-muted-foreground border-border",
};

export default function AdminClients() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Client Management</h1>
          <p className="text-sm text-muted-foreground">
            Manage all your clients and their subscriptions
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Client
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
              <DialogDescription>
                Enter the client's business details to create their account.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input id="businessName" placeholder="PT Maju Bersama" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Contact Email</Label>
                <Input id="email" type="email" placeholder="admin@company.id" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="whatsapp">WhatsApp Number</Label>
                <Input id="whatsapp" placeholder="+62812-xxxx-xxxx" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="plan">Plan</Label>
                  <Select defaultValue="standard">
                    <SelectTrigger>
                      <SelectValue placeholder="Select plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="starter">Starter</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="trial">Trial Days</Label>
                  <Input id="trial" type="number" defaultValue="14" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="prompt">Initial System Prompt</Label>
                <Textarea
                  id="prompt"
                  placeholder="You are a helpful AI assistant for..."
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Create Client</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search clients..."
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
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="trial">Trial</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">Client ID</TableHead>
              <TableHead className="text-muted-foreground">Business Name</TableHead>
              <TableHead className="text-muted-foreground">Contact</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-muted-foreground">Plan</TableHead>
              <TableHead className="text-muted-foreground">Token Usage</TableHead>
              <TableHead className="text-muted-foreground">Last Payment</TableHead>
              <TableHead className="text-muted-foreground">Next Renewal</TableHead>
              <TableHead className="text-muted-foreground">ARR</TableHead>
              <TableHead className="text-muted-foreground w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow key={client.id} className="border-border">
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {client.id}
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-foreground">{client.businessName}</p>
                    <p className="text-xs text-muted-foreground">{client.contactEmail}</p>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {client.whatsapp}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn("capitalize", statusStyles[client.status])}
                  >
                    {client.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-foreground">{client.plan}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={(client.tokenUsage / client.tokenLimit) * 100}
                      className="h-1.5 w-16"
                    />
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {client.tokenUsage.toLocaleString()} / {client.tokenLimit.toLocaleString()}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {client.lastPayment}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {client.nextRenewal}
                </TableCell>
                <TableCell className="font-medium text-primary">
                  {client.arr}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Impersonate
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Export
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Ban className="mr-2 h-4 w-4" />
                        Suspend
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredClients.length} of {clients.length} clients
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
