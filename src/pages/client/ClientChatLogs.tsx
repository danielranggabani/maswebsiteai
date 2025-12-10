import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Send,
  CreditCard,
  Tag,
  UserPlus,
  Bot,
  User,
  Phone,
  MoreVertical,
  Link,
  Flame,
  Snowflake,
  Filter,
  Paperclip,
  Image,
  FileText,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Conversation {
  id: string;
  name: string;
  phone: string;
  lastMessage: string;
  time: string;
  unread: number;
  status: "ai" | "human";
  isHot: boolean;
}

interface Message {
  id: string;
  sender: "customer" | "ai" | "human";
  content: string;
  time: string;
}

const conversations: Conversation[] = [
  {
    id: "1",
    name: "Budi Santoso",
    phone: "+62812-1111-2222",
    lastMessage: "Baik, saya tertarik dengan paket premium",
    time: "5m ago",
    unread: 2,
    status: "ai",
    isHot: true,
  },
  {
    id: "2",
    name: "Siti Rahayu",
    phone: "+62813-2222-3333",
    lastMessage: "Terima kasih atas informasinya",
    time: "1h ago",
    unread: 0,
    status: "ai",
    isHot: false,
  },
  {
    id: "3",
    name: "Ahmad Wijaya",
    phone: "+62814-3333-4444",
    lastMessage: "Apakah ada diskon untuk pembelian bulk?",
    time: "3h ago",
    unread: 1,
    status: "human",
    isHot: true,
  },
  {
    id: "4",
    name: "Dewi Lestari",
    phone: "+62815-4444-5555",
    lastMessage: "Saya ingin konsultasi dulu",
    time: "5h ago",
    unread: 0,
    status: "ai",
    isHot: false,
  },
  {
    id: "5",
    name: "Rudi Hartono",
    phone: "+62816-5555-6666",
    lastMessage: "Oke, nanti saya hubungi lagi",
    time: "1d ago",
    unread: 0,
    status: "ai",
    isHot: false,
  },
];

const messages: Message[] = [
  {
    id: "1",
    sender: "customer",
    content: "Halo, saya mau tanya tentang layanan AI chatbot untuk bisnis saya",
    time: "10:30 AM",
  },
  {
    id: "2",
    sender: "ai",
    content:
      "Halo Pak Budi! 👋 Terima kasih sudah menghubungi kami. Dengan senang hati saya akan membantu Anda mengetahui lebih lanjut tentang layanan AI chatbot kami.\n\nBoleh saya tahu, bisnis apa yang Anda jalankan saat ini?",
    time: "10:30 AM",
  },
  {
    id: "3",
    sender: "customer",
    content: "Saya punya toko online, jual fashion dan aksesoris. Butuh bantuan bales chat customer",
    time: "10:32 AM",
  },
  {
    id: "4",
    sender: "ai",
    content:
      "Wah, cocok sekali Pak! 🛍️ AI chatbot kami memang dirancang khusus untuk membantu bisnis online seperti Anda.\n\nBeberapa yang bisa AI kami bantu:\n• Jawab pertanyaan produk otomatis\n• Proses pesanan & tracking\n• Handle komplain & retur\n• Rekomendasi produk personal\n\nApakah Pak Budi sudah pakai platform WhatsApp Business untuk customer service?",
    time: "10:33 AM",
  },
  {
    id: "5",
    sender: "customer",
    content: "Iya sudah pakai WA Business. Berapa harganya ya?",
    time: "10:35 AM",
  },
  {
    id: "6",
    sender: "ai",
    content:
      "Baik Pak! Kami punya beberapa paket yang bisa disesuaikan dengan kebutuhan bisnis Anda:\n\n📦 **Starter** - Rp 600.000/bulan\n- 20.000 token/bulan\n- 1 nomor WhatsApp\n- Basic AI response\n\n📦 **Standard** - Rp 1.200.000/bulan\n- 50.000 token/bulan\n- 2 nomor WhatsApp\n- Advanced AI + Knowledge Base\n\n📦 **Premium** - Rp 2.500.000/bulan\n- 100.000 token/bulan\n- Unlimited WhatsApp\n- Full features + Priority support\n\nPaket mana yang paling cocok untuk volume chat Anda saat ini?",
    time: "10:36 AM",
  },
  {
    id: "7",
    sender: "customer",
    content: "Baik, saya tertarik dengan paket premium",
    time: "10:40 AM",
  },
];

export default function ClientChatLogs() {
  const { toast } = useToast();
  const [selectedConversation, setSelectedConversation] = useState<string>("1");
  const [conversationList, setConversationList] = useState(conversations);
  const [humanTakeover, setHumanTakeover] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [newMessage, setNewMessage] = useState("");
  const [messageList, setMessageList] = useState(messages);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedAssignee, setSelectedAssignee] = useState("");

  const filteredConversations = conversationList.filter((conv) => {
    const matchesSearch =
      conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.phone.includes(searchQuery);
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "hot" && conv.isHot) ||
      (statusFilter === "ai" && conv.status === "ai") ||
      (statusFilter === "human" && conv.status === "human");
    return matchesSearch && matchesStatus;
  });

  const currentConversation = conversationList.find(
    (c) => c.id === selectedConversation
  );

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const newMsg: Message = {
      id: String(messageList.length + 1),
      sender: "human",
      content: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessageList((prev) => [...prev, newMsg]);
    setNewMessage("");
    toast({
      title: "Message Sent",
      description: "Your message has been sent to the customer",
    });
  };

  const handleSendPaymentLink = () => {
    if (!selectedProduct) {
      toast({
        title: "Error",
        description: "Please select a product",
        variant: "destructive",
      });
      return;
    }

    const paymentMsg: Message = {
      id: String(messageList.length + 1),
      sender: "human",
      content: `💳 *Payment Link*\n\nHere's your payment link for ${selectedProduct}:\nhttps://pay.midtrans.com/v2/vt?id=abc123\n\nPlease complete the payment within 24 hours.`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessageList((prev) => [...prev, paymentMsg]);
    setPaymentDialogOpen(false);
    setSelectedProduct("");
    toast({
      title: "Payment Link Sent",
      description: "Payment link has been sent to the customer",
    });
  };

  const handleMarkAsHot = () => {
    setConversationList((prev) =>
      prev.map((c) =>
        c.id === selectedConversation ? { ...c, isHot: true } : c
      )
    );
    toast({
      title: "Marked as Hot Lead",
      description: `${currentConversation?.name} has been marked as a hot lead`,
    });
  };

  const handleMarkAsCold = () => {
    setConversationList((prev) =>
      prev.map((c) =>
        c.id === selectedConversation ? { ...c, isHot: false } : c
      )
    );
    toast({
      title: "Marked as Cold",
      description: `${currentConversation?.name} has been marked as cold`,
    });
  };

  const handleAssign = () => {
    if (!selectedAssignee) {
      toast({
        title: "Error",
        description: "Please select a team member",
        variant: "destructive",
      });
      return;
    }
    setAssignDialogOpen(false);
    toast({
      title: "Assigned",
      description: `Conversation assigned to ${selectedAssignee}`,
    });
  };

  const handleSendCustomLink = () => {
    const link = prompt("Enter the URL to send:");
    if (link) {
      const linkMsg: Message = {
        id: String(messageList.length + 1),
        sender: "human",
        content: `🔗 Check this out: ${link}`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessageList((prev) => [...prev, linkMsg]);
      toast({
        title: "Link Sent",
        description: "Custom link has been sent",
      });
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4">
      {/* Conversation List */}
      <div className="w-80 shrink-0 rounded-lg border border-border bg-card flex flex-col">
        <div className="border-b border-border p-3 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-1">
            {[
              { value: "all", label: "All" },
              { value: "hot", label: "Hot" },
              { value: "ai", label: "AI" },
              { value: "human", label: "Human" },
            ].map((filter) => (
              <Button
                key={filter.value}
                variant={statusFilter === filter.value ? "secondary" : "ghost"}
                size="sm"
                className="flex-1 h-7 text-xs"
                onClick={() => setStatusFilter(filter.value)}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-2">
            {filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={cn(
                  "w-full rounded-lg p-3 text-left transition-colors",
                  selectedConversation === conversation.id
                    ? "bg-secondary"
                    : "hover:bg-secondary/50"
                )}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarFallback className="bg-primary/20 text-primary">
                      {conversation.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground text-sm">
                          {conversation.name}
                        </span>
                        {conversation.isHot && (
                          <Flame className="h-3 w-3 text-destructive" />
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {conversation.time}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {conversation.lastMessage}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-[10px] px-1.5 py-0",
                          conversation.status === "human"
                            ? "bg-chart-4/10 text-chart-4 border-chart-4/20"
                            : "bg-chart-2/10 text-chart-2 border-chart-2/20"
                        )}
                      >
                        {conversation.status === "human" ? "Human" : "AI"}
                      </Badge>
                      {conversation.unread > 0 && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat View */}
      <div className="flex flex-1 flex-col rounded-lg border border-border bg-card">
        {/* Chat Header */}
        <div className="flex items-center justify-between border-b border-border p-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary/20 text-primary">
                {currentConversation?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-foreground">
                  {currentConversation?.name}
                </h3>
                {currentConversation?.isHot && (
                  <Badge
                    variant="outline"
                    className="bg-destructive/10 text-destructive border-destructive/20 text-xs"
                  >
                    <Flame className="mr-1 h-3 w-3" />
                    Hot Lead
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Phone className="h-3 w-3" />
                {currentConversation?.phone}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 border-r border-border pr-3 mr-1">
              <Label htmlFor="takeover" className="text-xs text-muted-foreground">
                Human Takeover
              </Label>
              <Switch
                id="takeover"
                checked={humanTakeover}
                onCheckedChange={setHumanTakeover}
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPaymentDialogOpen(true)}
            >
              <CreditCard className="mr-1.5 h-3.5 w-3.5" />
              Payment
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Tag className="mr-1.5 h-3.5 w-3.5" />
                  Mark
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleMarkAsHot}>
                  <Flame className="mr-2 h-4 w-4 text-destructive" />
                  Mark as Hot
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleMarkAsCold}>
                  <Snowflake className="mr-2 h-4 w-4 text-blue-400" />
                  Mark as Cold
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAssignDialogOpen(true)}
            >
              <UserPlus className="mr-1.5 h-3.5 w-3.5" />
              Assign
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleSendCustomLink}>
                  <Link className="mr-2 h-4 w-4" />
                  Send Custom Link
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" />
                  Export Conversation
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Full Profile
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messageList.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex items-start gap-3",
                  message.sender === "customer" ? "flex-row-reverse" : ""
                )}
              >
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                    message.sender === "customer"
                      ? "bg-muted"
                      : message.sender === "ai"
                      ? "bg-primary/20"
                      : "bg-chart-4/20"
                  )}
                >
                  {message.sender === "customer" ? (
                    <User className="h-4 w-4 text-muted-foreground" />
                  ) : message.sender === "ai" ? (
                    <Bot className="h-4 w-4 text-primary" />
                  ) : (
                    <User className="h-4 w-4 text-chart-4" />
                  )}
                </div>
                <div
                  className={cn(
                    "max-w-[70%] rounded-lg px-4 py-2.5",
                    message.sender === "customer"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground"
                  )}
                >
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                  <p
                    className={cn(
                      "text-[10px] mt-1",
                      message.sender === "customer"
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    )}
                  >
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="border-t border-border p-3">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="shrink-0" disabled={!humanTakeover}>
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="shrink-0" disabled={!humanTakeover}>
              <Image className="h-4 w-4" />
            </Button>
            <Input
              placeholder={
                humanTakeover
                  ? "Type your message..."
                  : "Enable human takeover to send messages"
              }
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              disabled={!humanTakeover}
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button
              disabled={!humanTakeover || !newMessage.trim()}
              onClick={handleSendMessage}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          {!humanTakeover && (
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Enable human takeover to send manual messages
            </p>
          )}
        </div>
      </div>

      {/* Payment Link Dialog */}
      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send Payment Link</DialogTitle>
            <DialogDescription>
              Select a product to generate and send a payment link
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Product</Label>
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger>
                  <SelectValue placeholder="Select product..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="starter">Starter Package - Rp 600.000</SelectItem>
                  <SelectItem value="standard">Standard Package - Rp 1.200.000</SelectItem>
                  <SelectItem value="premium">Premium Package - Rp 2.500.000</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPaymentDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendPaymentLink}>
              <CreditCard className="mr-2 h-4 w-4" />
              Send Payment Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Dialog */}
      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Assign Conversation</DialogTitle>
            <DialogDescription>
              Assign this conversation to a team member
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Team Member</Label>
              <Select value={selectedAssignee} onValueChange={setSelectedAssignee}>
                <SelectTrigger>
                  <SelectValue placeholder="Select team member..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Andi">Andi Wijaya</SelectItem>
                  <SelectItem value="Bima">Bima Pratama</SelectItem>
                  <SelectItem value="Citra">Citra Dewi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAssign}>
              <UserPlus className="mr-2 h-4 w-4" />
              Assign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
