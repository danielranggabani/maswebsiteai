import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  UserPlus,
  MoreVertical,
  Mail,
  Shield,
  Edit,
  Trash2,
  Users,
  Crown,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "owner" | "admin" | "sales" | "finance" | "viewer";
  status: "active" | "pending";
  lastActive: string;
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Andi Wijaya",
    email: "andi@company.com",
    role: "owner",
    status: "active",
    lastActive: "Just now",
  },
  {
    id: "2",
    name: "Bima Pratama",
    email: "bima@company.com",
    role: "admin",
    status: "active",
    lastActive: "5 menit lalu",
  },
  {
    id: "3",
    name: "Citra Dewi",
    email: "citra@company.com",
    role: "sales",
    status: "active",
    lastActive: "1 jam lalu",
  },
  {
    id: "4",
    name: "Dian Kusuma",
    email: "dian@company.com",
    role: "finance",
    status: "active",
    lastActive: "2 jam lalu",
  },
  {
    id: "5",
    name: "Eka Sari",
    email: "eka@company.com",
    role: "viewer",
    status: "pending",
    lastActive: "-",
  },
];

const roleConfig = {
  owner: {
    label: "Owner",
    icon: Crown,
    className: "bg-chart-4/10 text-chart-4 border-chart-4/20",
    description: "Full access to all features",
  },
  admin: {
    label: "Admin",
    icon: Shield,
    className: "bg-primary/10 text-primary border-primary/20",
    description: "Manage team and settings",
  },
  sales: {
    label: "Sales",
    icon: Users,
    className: "bg-chart-2/10 text-chart-2 border-chart-2/20",
    description: "Access leads and conversations",
  },
  finance: {
    label: "Finance",
    icon: Users,
    className: "bg-chart-5/10 text-chart-5 border-chart-5/20",
    description: "View billing and invoices",
  },
  viewer: {
    label: "Viewer",
    icon: Users,
    className: "bg-muted text-muted-foreground border-border",
    description: "Read-only access",
  },
};

export default function ClientTeam() {
  const { toast } = useToast();
  const [members, setMembers] = useState(teamMembers);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteData, setInviteData] = useState({ email: "", role: "viewer" });

  const handleInvite = () => {
    if (!inviteData.email) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive",
      });
      return;
    }

    const newMember: TeamMember = {
      id: String(members.length + 1),
      name: inviteData.email.split("@")[0],
      email: inviteData.email,
      role: inviteData.role as TeamMember["role"],
      status: "pending",
      lastActive: "-",
    };

    setMembers((prev) => [...prev, newMember]);
    setInviteData({ email: "", role: "viewer" });
    setIsInviteOpen(false);
    toast({
      title: "Invitation Sent",
      description: `Invitation sent to ${inviteData.email}`,
    });
  };

  const handleRemoveMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    toast({
      title: "Member Removed",
      description: "Team member has been removed",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Team Members</h1>
          <p className="text-muted-foreground">
            Manage your team and their access permissions
          </p>
        </div>
        <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
              <DialogDescription>
                Send an invitation to join your team
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input
                  type="email"
                  value={inviteData.email}
                  onChange={(e) =>
                    setInviteData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="colleague@company.com"
                />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Select
                  value={inviteData.role}
                  onValueChange={(value) =>
                    setInviteData((prev) => ({ ...prev, role: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  {roleConfig[inviteData.role as keyof typeof roleConfig]?.description}
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsInviteOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleInvite}>
                <Mail className="mr-2 h-4 w-4" />
                Send Invitation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Role Permissions */}
      <div className="grid grid-cols-5 gap-4">
        {Object.entries(roleConfig).map(([key, config]) => (
          <Card key={key} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <config.icon className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium text-sm">{config.label}</span>
              </div>
              <p className="text-xs text-muted-foreground">{config.description}</p>
              <p className="text-lg font-bold mt-2 text-foreground">
                {members.filter((m) => m.role === key).length}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Team Members List */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>All Members</CardTitle>
          <CardDescription>{members.length} team members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {members.map((member) => {
              const role = roleConfig[member.role];
              return (
                <div
                  key={member.id}
                  className="flex items-center justify-between rounded-lg border border-border p-4"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{member.name}</span>
                        {member.status === "pending" && (
                          <Badge variant="outline" className="text-xs bg-chart-4/10 text-chart-4 border-chart-4/20">
                            Pending
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className={cn("text-xs", role.className)}>
                      <role.icon className="mr-1 h-3 w-3" />
                      {role.label}
                    </Badge>
                    <span className="text-sm text-muted-foreground w-24 text-right">
                      {member.lastActive}
                    </span>
                    {member.role !== "owner" && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Change Role
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleRemoveMember(member.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
