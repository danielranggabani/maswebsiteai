import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Search,
  Send,
  CreditCard,
  Tag,
  UserPlus,
  Bot,
  User,
  Phone,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [selectedConversation, setSelectedConversation] = useState<string>("1");
  const [humanTakeover, setHumanTakeover] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.phone.includes(searchQuery)
  );

  const currentConversation = conversations.find(
    (c) => c.id === selectedConversation
  );

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4">
      {/* Conversation List */}
      <div className="w-80 shrink-0 rounded-lg border border-border bg-card">
        <div className="border-b border-border p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        <ScrollArea className="h-[calc(100%-73px)]">
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
                          <Badge
                            variant="outline"
                            className="bg-destructive/10 text-destructive border-destructive/20 text-[10px] px-1 py-0"
                          >
                            HOT
                          </Badge>
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
        <div className="flex items-center justify-between border-b border-border p-4">
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
                    className="bg-destructive/10 text-destructive border-destructive/20"
                  >
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
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="takeover" className="text-sm text-muted-foreground">
                Human Takeover
              </Label>
              <Switch
                id="takeover"
                checked={humanTakeover}
                onCheckedChange={setHumanTakeover}
              />
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm">
                <CreditCard className="mr-2 h-4 w-4" />
                Send Payment
              </Button>
              <Button variant="ghost" size="sm">
                <Tag className="mr-2 h-4 w-4" />
                Mark Hot
              </Button>
              <Button variant="ghost" size="sm">
                <UserPlus className="mr-2 h-4 w-4" />
                Assign
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
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
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-2">
            <Input
              placeholder={
                humanTakeover
                  ? "Type your message..."
                  : "Human takeover required to send messages"
              }
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              disabled={!humanTakeover}
              className="flex-1"
            />
            <Button disabled={!humanTakeover || !newMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          {!humanTakeover && (
            <p className="text-xs text-muted-foreground mt-2">
              Enable human takeover to send manual messages
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
