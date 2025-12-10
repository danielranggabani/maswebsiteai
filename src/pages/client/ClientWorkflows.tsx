import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
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
  Plus,
  Workflow,
  Zap,
  MessageSquare,
  Tag,
  CreditCard,
  FileText,
  Mail,
  MoreVertical,
  Play,
  Pause,
  Trash2,
  Edit,
  ArrowRight,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface WorkflowItem {
  id: string;
  name: string;
  trigger: string;
  conditions: string[];
  actions: string[];
  isActive: boolean;
  lastRun: string;
  runCount: number;
}

const workflows: WorkflowItem[] = [
  {
    id: "1",
    name: "Hot Lead Alert",
    trigger: "Keyword matched",
    conditions: ["Contains: 'beli', 'order', 'harga'"],
    actions: ["Mark as Hot Lead", "Send notification to team"],
    isActive: true,
    lastRun: "5 menit lalu",
    runCount: 156,
  },
  {
    id: "2",
    name: "Auto Send Payment Link",
    trigger: "Payment confirmed interest",
    conditions: ["Lead status: Hot", "Product mentioned"],
    actions: ["Send payment link", "Create invoice draft"],
    isActive: true,
    lastRun: "2 jam lalu",
    runCount: 89,
  },
  {
    id: "3",
    name: "Follow-up Reminder",
    trigger: "No response for 24 hours",
    conditions: ["Lead status: Warm or Hot"],
    actions: ["Send follow-up message", "Notify assigned rep"],
    isActive: false,
    lastRun: "1 hari lalu",
    runCount: 234,
  },
  {
    id: "4",
    name: "Welcome New Lead",
    trigger: "New lead detected",
    conditions: ["First message received"],
    actions: ["Send welcome message", "Add to lead list"],
    isActive: true,
    lastRun: "30 menit lalu",
    runCount: 512,
  },
];

const triggerOptions = [
  { value: "new_lead", label: "New Lead Detected", icon: Zap },
  { value: "keyword", label: "Keyword Matched", icon: MessageSquare },
  { value: "payment", label: "Payment Confirmed", icon: CreditCard },
  { value: "file_upload", label: "File Uploaded", icon: FileText },
  { value: "no_response", label: "No Response Timeout", icon: Mail },
];

const actionOptions = [
  { value: "send_message", label: "Send WhatsApp Message" },
  { value: "add_tag", label: "Add Tag" },
  { value: "send_invoice", label: "Send Invoice" },
  { value: "send_payment", label: "Send Payment Link" },
  { value: "notify_team", label: "Notify Team" },
  { value: "create_task", label: "Create Task" },
];

export default function ClientWorkflows() {
  const { toast } = useToast();
  const [workflowList, setWorkflowList] = useState(workflows);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newWorkflow, setNewWorkflow] = useState({
    name: "",
    trigger: "",
    action: "",
  });

  const toggleWorkflow = (id: string) => {
    setWorkflowList((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isActive: !w.isActive } : w))
    );
    toast({
      title: "Workflow Updated",
      description: "Workflow status has been changed",
    });
  };

  const handleCreateWorkflow = () => {
    if (!newWorkflow.name || !newWorkflow.trigger || !newWorkflow.action) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const workflow: WorkflowItem = {
      id: String(workflowList.length + 1),
      name: newWorkflow.name,
      trigger: triggerOptions.find((t) => t.value === newWorkflow.trigger)?.label || "",
      conditions: [],
      actions: [actionOptions.find((a) => a.value === newWorkflow.action)?.label || ""],
      isActive: true,
      lastRun: "Never",
      runCount: 0,
    };

    setWorkflowList((prev) => [...prev, workflow]);
    setNewWorkflow({ name: "", trigger: "", action: "" });
    setIsCreateOpen(false);
    toast({
      title: "Workflow Created",
      description: `${workflow.name} has been created successfully`,
    });
  };

  const handleTestRun = (id: string) => {
    toast({
      title: "Test Run Started",
      description: "Running workflow with sample data...",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Workflows</h1>
          <p className="text-muted-foreground">
            Automate your business processes with custom triggers and actions
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Workflow
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Workflow</DialogTitle>
              <DialogDescription>
                Set up automated actions based on triggers
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Workflow Name</Label>
                <Input
                  value={newWorkflow.name}
                  onChange={(e) =>
                    setNewWorkflow((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="e.g., Hot Lead Alert"
                />
              </div>
              <div className="space-y-2">
                <Label>Trigger</Label>
                <Select
                  value={newWorkflow.trigger}
                  onValueChange={(value) =>
                    setNewWorkflow((prev) => ({ ...prev, trigger: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select trigger..." />
                  </SelectTrigger>
                  <SelectContent>
                    {triggerOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <option.icon className="h-4 w-4" />
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Action</Label>
                <Select
                  value={newWorkflow.action}
                  onValueChange={(value) =>
                    setNewWorkflow((prev) => ({ ...prev, action: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select action..." />
                  </SelectTrigger>
                  <SelectContent>
                    {actionOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateWorkflow}>Create Workflow</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Workflow className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{workflowList.length}</p>
                <p className="text-xs text-muted-foreground">Total Workflows</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-2/10">
                <Zap className="h-5 w-5 text-chart-2" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {workflowList.filter((w) => w.isActive).length}
                </p>
                <p className="text-xs text-muted-foreground">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-4/10">
                <Play className="h-5 w-5 text-chart-4" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {workflowList.reduce((acc, w) => acc + w.runCount, 0)}
                </p>
                <p className="text-xs text-muted-foreground">Total Runs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Pause className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {workflowList.filter((w) => !w.isActive).length}
                </p>
                <p className="text-xs text-muted-foreground">Paused</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Workflows List */}
      <div className="space-y-4">
        {workflowList.map((workflow) => (
          <Card key={workflow.id} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      workflow.isActive ? "bg-primary/10" : "bg-muted"
                    }`}
                  >
                    <Workflow
                      className={`h-5 w-5 ${
                        workflow.isActive ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-foreground">{workflow.name}</h3>
                      <Badge
                        variant="outline"
                        className={
                          workflow.isActive
                            ? "bg-chart-2/10 text-chart-2 border-chart-2/20"
                            : "bg-muted text-muted-foreground"
                        }
                      >
                        {workflow.isActive ? "Active" : "Paused"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <span>{workflow.trigger}</span>
                      <ArrowRight className="h-3 w-3" />
                      <span>{workflow.actions.join(", ")}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{workflow.runCount} runs</p>
                    <p className="text-xs text-muted-foreground">Last: {workflow.lastRun}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch
                      checked={workflow.isActive}
                      onCheckedChange={() => toggleWorkflow(workflow.id)}
                    />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleTestRun(workflow.id)}>
                          <Play className="mr-2 h-4 w-4" />
                          Test Run
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
