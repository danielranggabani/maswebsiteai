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
} from "@/components/ui/dialog";
import {
  MessageSquare,
  CreditCard,
  Webhook,
  CheckCircle,
  XCircle,
  Settings,
  ExternalLink,
  Copy,
  Eye,
  EyeOff,
  RefreshCw,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: typeof MessageSquare;
  status: "connected" | "disconnected" | "error";
  lastSync?: string;
}

const integrations: Integration[] = [
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    description: "Connect your WhatsApp Business API for automated messaging",
    icon: MessageSquare,
    status: "connected",
    lastSync: "2 menit lalu",
  },
  {
    id: "midtrans",
    name: "Midtrans",
    description: "Accept payments via various payment methods",
    icon: CreditCard,
    status: "connected",
    lastSync: "1 jam lalu",
  },
  {
    id: "webhook",
    name: "Webhooks",
    description: "Send real-time notifications to your systems",
    icon: Webhook,
    status: "disconnected",
  },
];

export default function ClientIntegrations() {
  const { toast } = useToast();
  const [configOpen, setConfigOpen] = useState<string | null>(null);
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});
  const [isTesting, setIsTesting] = useState(false);

  const webhookUrl = "https://api.masai.id/webhooks/your-client-id";
  const [webhookEndpoints, setWebhookEndpoints] = useState([
    { id: "1", url: "https://your-app.com/api/webhook", events: ["order.paid", "lead.created"], isActive: true },
  ]);

  const handleTest = (integrationId: string) => {
    setIsTesting(true);
    setTimeout(() => {
      setIsTesting(false);
      toast({
        title: "Test Successful",
        description: `${integrationId} connection is working properly`,
      });
    }, 2000);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Copied to clipboard",
    });
  };

  const toggleSecret = (key: string) => {
    setShowSecrets((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const statusConfig = {
    connected: {
      label: "Connected",
      icon: CheckCircle,
      className: "bg-chart-2/10 text-chart-2 border-chart-2/20",
    },
    disconnected: {
      label: "Disconnected",
      icon: XCircle,
      className: "bg-muted text-muted-foreground border-border",
    },
    error: {
      label: "Error",
      icon: XCircle,
      className: "bg-destructive/10 text-destructive border-destructive/20",
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Integrations</h1>
          <p className="text-muted-foreground">
            Connect and manage third-party services
          </p>
        </div>
      </div>

      {/* Integration Cards */}
      <div className="grid grid-cols-3 gap-6">
        {integrations.map((integration) => {
          const status = statusConfig[integration.status];
          return (
            <Card key={integration.id} className="bg-card border-border">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <integration.icon className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="outline" className={status.className}>
                    <status.icon className="mr-1 h-3 w-3" />
                    {status.label}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{integration.name}</CardTitle>
                <CardDescription>{integration.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {integration.lastSync && (
                  <p className="text-xs text-muted-foreground mb-4">
                    Last synced: {integration.lastSync}
                  </p>
                )}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => setConfigOpen(integration.id)}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Configure
                  </Button>
                  {integration.status === "connected" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTest(integration.id)}
                      disabled={isTesting}
                    >
                      {isTesting ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        "Test"
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Webhook Configuration */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Webhook className="h-5 w-5 text-primary" />
            Webhook Configuration
          </CardTitle>
          <CardDescription>
            Configure outgoing webhooks to receive real-time notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Incoming Webhook URL */}
          <div className="space-y-2">
            <Label>Your Webhook Endpoint (for incoming)</Label>
            <div className="flex gap-2">
              <Input value={webhookUrl} readOnly className="font-mono text-sm" />
              <Button variant="outline" size="icon" onClick={() => handleCopy(webhookUrl)}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Use this URL to receive incoming webhooks from WhatsApp and Midtrans
            </p>
          </div>

          {/* Outgoing Webhooks */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Outgoing Webhook Endpoints</Label>
              <Button variant="outline" size="sm">
                Add Endpoint
              </Button>
            </div>
            
            {webhookEndpoints.map((endpoint) => (
              <div
                key={endpoint.id}
                className="rounded-lg border border-border p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Switch checked={endpoint.isActive} />
                    <span className="font-mono text-sm">{endpoint.url}</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  {endpoint.events.map((event) => (
                    <Badge key={event} variant="outline" className="text-xs">
                      {event}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* WhatsApp Config Dialog */}
      <Dialog open={configOpen === "whatsapp"} onOpenChange={() => setConfigOpen(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>WhatsApp Business Configuration</DialogTitle>
            <DialogDescription>
              Configure your WhatsApp Business API credentials
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Phone Number ID</Label>
              <Input placeholder="Enter phone number ID" />
            </div>
            <div className="space-y-2">
              <Label>Access Token</Label>
              <div className="flex gap-2">
                <Input
                  type={showSecrets["wa_token"] ? "text" : "password"}
                  placeholder="Enter access token"
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => toggleSecret("wa_token")}
                >
                  {showSecrets["wa_token"] ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Webhook Verify Token</Label>
              <Input placeholder="Enter verify token" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfigOpen(null)}>
              Cancel
            </Button>
            <Button onClick={() => handleTest("whatsapp")}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Test Connection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Midtrans Config Dialog */}
      <Dialog open={configOpen === "midtrans"} onOpenChange={() => setConfigOpen(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Midtrans Configuration</DialogTitle>
            <DialogDescription>
              Configure your Midtrans payment gateway credentials
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Merchant ID</Label>
              <Input placeholder="Enter merchant ID" />
            </div>
            <div className="space-y-2">
              <Label>Client Key</Label>
              <Input placeholder="Enter client key" />
            </div>
            <div className="space-y-2">
              <Label>Server Key</Label>
              <div className="flex gap-2">
                <Input
                  type={showSecrets["midtrans_server"] ? "text" : "password"}
                  placeholder="Enter server key"
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => toggleSecret("midtrans_server")}
                >
                  {showSecrets["midtrans_server"] ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch />
              <Label>Sandbox Mode</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfigOpen(null)}>
              Cancel
            </Button>
            <Button onClick={() => handleTest("midtrans")}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Test Connection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
