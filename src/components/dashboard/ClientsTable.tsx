import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { MoreHorizontal, ExternalLink, Pencil, Ban, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Client {
  id: string;
  businessName: string;
  contact: string;
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
    contact: "+62812-3456-7890",
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
    contact: "+62813-4567-8901",
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
    contact: "+62814-5678-9012",
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
    contact: "+62815-6789-0123",
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
    contact: "+62816-7890-1234",
    status: "active",
    plan: "Starter",
    tokenUsage: 8000,
    tokenLimit: 20000,
    lastPayment: "2024-01-20",
    nextRenewal: "2024-02-20",
    arr: "Rp 7,200,000",
  },
];

const statusStyles = {
  active: "bg-primary/10 text-primary border-primary/20",
  trial: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  overdue: "bg-destructive/10 text-destructive border-destructive/20",
  suspended: "bg-muted text-muted-foreground border-border",
};

export function ClientsTable() {
  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between p-4">
        <h3 className="font-semibold text-foreground">Active Clients</h3>
        <Button size="sm">Add Client</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-muted-foreground">Client ID</TableHead>
            <TableHead className="text-muted-foreground">Business Name</TableHead>
            <TableHead className="text-muted-foreground">Contact</TableHead>
            <TableHead className="text-muted-foreground">Status</TableHead>
            <TableHead className="text-muted-foreground">Plan</TableHead>
            <TableHead className="text-muted-foreground">Token Usage</TableHead>
            <TableHead className="text-muted-foreground">ARR</TableHead>
            <TableHead className="text-muted-foreground w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id} className="border-border">
              <TableCell className="font-mono text-xs text-muted-foreground">
                {client.id}
              </TableCell>
              <TableCell className="font-medium text-foreground">
                {client.businessName}
              </TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {client.contact}
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
                  <span className="text-xs text-muted-foreground">
                    {Math.round((client.tokenUsage / client.tokenLimit) * 100)}%
                  </span>
                </div>
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
  );
}
