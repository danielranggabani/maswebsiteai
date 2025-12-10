import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, Sparkles, MessageSquare, Save, RotateCcw, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PersonaTemplate {
  id: string;
  name: string;
  tone: string;
  formality: number;
  empathy: number;
  brevity: number;
  description: string;
}

const personaTemplates: PersonaTemplate[] = [
  {
    id: "1",
    name: "Professional Sales",
    tone: "professional",
    formality: 80,
    empathy: 60,
    brevity: 50,
    description: "Formal and persuasive, great for B2B sales",
  },
  {
    id: "2",
    name: "Friendly Helper",
    tone: "santai",
    formality: 30,
    empathy: 90,
    brevity: 40,
    description: "Warm and approachable, perfect for customer support",
  },
  {
    id: "3",
    name: "Quick Responder",
    tone: "sopan",
    formality: 50,
    empathy: 50,
    brevity: 90,
    description: "Concise and efficient, ideal for high-volume chats",
  },
];

export default function ClientBotPersonality() {
  const { toast } = useToast();
  const [tone, setTone] = useState("sopan");
  const [formality, setFormality] = useState([60]);
  const [empathy, setEmpathy] = useState([70]);
  const [brevity, setBrevity] = useState([50]);
  const [customPrompt, setCustomPrompt] = useState(
    "Anda adalah asisten AI untuk toko online fashion. Bantu pelanggan dengan ramah dan profesional. Selalu tawarkan solusi dan produk yang relevan."
  );
  const [testPrompt, setTestPrompt] = useState("");
  const [sampleResponse, setSampleResponse] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateSample = () => {
    setIsGenerating(true);
    // Simulate AI response generation
    setTimeout(() => {
      setSampleResponse(
        `Halo! 👋 Terima kasih sudah menghubungi kami.\n\nSaya dengan senang hati akan membantu Anda. ${testPrompt ? `Mengenai "${testPrompt}", ` : ""}kami memiliki berbagai pilihan produk yang mungkin cocok untuk kebutuhan Anda.\n\nApakah ada preferensi khusus yang Anda cari? Saya bisa berikan rekomendasi yang lebih personal! 😊`
      );
      setIsGenerating(false);
    }, 1500);
  };

  const handleApplyTemplate = (template: PersonaTemplate) => {
    setTone(template.tone);
    setFormality([template.formality]);
    setEmpathy([template.empathy]);
    setBrevity([template.brevity]);
    toast({
      title: "Template Applied",
      description: `${template.name} persona has been applied`,
    });
  };

  const handleSave = () => {
    toast({
      title: "Personality Saved",
      description: "Bot personality settings have been updated",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Bot Personality</h1>
          <p className="text-muted-foreground">
            Customize how your AI assistant communicates with customers
          </p>
        </div>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Personality Settings */}
        <div className="col-span-2 space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Personality Settings
              </CardTitle>
              <CardDescription>
                Fine-tune the AI's communication style
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Tone of Voice</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sopan">Sopan (Polite)</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="santai">Santai (Casual)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Formality</Label>
                    <span className="text-sm text-muted-foreground">{formality[0]}%</span>
                  </div>
                  <Slider
                    value={formality}
                    onValueChange={setFormality}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Casual</span>
                    <span>Formal</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Empathy</Label>
                    <span className="text-sm text-muted-foreground">{empathy[0]}%</span>
                  </div>
                  <Slider
                    value={empathy}
                    onValueChange={setEmpathy}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Direct</span>
                    <span>Empathetic</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Brevity</Label>
                    <span className="text-sm text-muted-foreground">{brevity[0]}%</span>
                  </div>
                  <Slider
                    value={brevity}
                    onValueChange={setBrevity}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Detailed</span>
                    <span>Concise</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                System Prompt
              </CardTitle>
              <CardDescription>
                Define the core instructions for your AI assistant
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                rows={6}
                placeholder="Enter your custom system prompt..."
                className="font-mono text-sm"
              />
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset to Default
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Test Response
              </CardTitle>
              <CardDescription>
                Preview how the bot will respond with current settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Test Prompt</Label>
                <div className="flex gap-2">
                  <Input
                    value={testPrompt}
                    onChange={(e) => setTestPrompt(e.target.value)}
                    placeholder="Enter a sample customer message..."
                    className="flex-1"
                  />
                  <Button onClick={handleGenerateSample} disabled={isGenerating}>
                    <Wand2 className="mr-2 h-4 w-4" />
                    {isGenerating ? "Generating..." : "Generate"}
                  </Button>
                </div>
              </div>

              {sampleResponse && (
                <div className="rounded-lg border border-border bg-secondary/50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                      <Bot className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm font-medium">AI Response</span>
                  </div>
                  <p className="text-sm text-foreground whitespace-pre-line">
                    {sampleResponse}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Persona Templates */}
        <div className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-base">Persona Templates</CardTitle>
              <CardDescription>Quick-apply preset personalities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {personaTemplates.map((template) => (
                <div
                  key={template.id}
                  className="rounded-lg border border-border p-3 hover:border-primary/50 transition-colors cursor-pointer"
                  onClick={() => handleApplyTemplate(template)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{template.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {template.tone}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{template.description}</p>
                  <div className="flex gap-2 mt-2">
                    <div className="flex-1">
                      <div className="text-[10px] text-muted-foreground mb-0.5">Formal</div>
                      <div className="h-1.5 rounded-full bg-secondary">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${template.formality}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] text-muted-foreground mb-0.5">Empathy</div>
                      <div className="h-1.5 rounded-full bg-secondary">
                        <div
                          className="h-full rounded-full bg-chart-2"
                          style={{ width: `${template.empathy}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] text-muted-foreground mb-0.5">Brief</div>
                      <div className="h-1.5 rounded-full bg-secondary">
                        <div
                          className="h-full rounded-full bg-chart-4"
                          style={{ width: `${template.brevity}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-base">Quick Tips</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                • <strong>Higher formality</strong> works better for B2B and professional
                services
              </p>
              <p>
                • <strong>High empathy</strong> is great for customer support and handling
                complaints
              </p>
              <p>
                • <strong>High brevity</strong> is ideal for quick transactional chats
              </p>
              <p>
                • Test different combinations to find what works best for your customers
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
