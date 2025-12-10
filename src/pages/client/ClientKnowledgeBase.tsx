import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  Upload,
  File,
  Globe,
  Plus,
  Trash2,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock,
  FileText,
  FileSpreadsheet,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadedFile {
  id: string;
  name: string;
  type: "pdf" | "csv" | "xlsx" | "docx";
  size: string;
  status: "indexed" | "indexing" | "failed";
  uploadedAt: string;
  tokens: number;
}

interface WebsiteLink {
  id: string;
  url: string;
  status: "indexed" | "indexing" | "failed";
  lastIndexed: string;
  pages: number;
}

interface QAPair {
  id: string;
  question: string;
  answer: string;
  tags: string[];
  priority: "high" | "medium" | "low";
}

const uploadedFiles: UploadedFile[] = [
  {
    id: "1",
    name: "Product_Catalog_2024.pdf",
    type: "pdf",
    size: "2.4 MB",
    status: "indexed",
    uploadedAt: "2024-01-15",
    tokens: 15420,
  },
  {
    id: "2",
    name: "FAQ_Lengkap.docx",
    type: "docx",
    size: "856 KB",
    status: "indexed",
    uploadedAt: "2024-01-14",
    tokens: 8340,
  },
  {
    id: "3",
    name: "Price_List.xlsx",
    type: "xlsx",
    size: "1.2 MB",
    status: "indexing",
    uploadedAt: "2024-01-16",
    tokens: 0,
  },
  {
    id: "4",
    name: "Terms_and_Conditions.pdf",
    type: "pdf",
    size: "450 KB",
    status: "failed",
    uploadedAt: "2024-01-13",
    tokens: 0,
  },
];

const websiteLinks: WebsiteLink[] = [
  {
    id: "1",
    url: "https://example.com/products",
    status: "indexed",
    lastIndexed: "2024-01-16",
    pages: 45,
  },
  {
    id: "2",
    url: "https://example.com/faq",
    status: "indexed",
    lastIndexed: "2024-01-15",
    pages: 12,
  },
];

const qaPairs: QAPair[] = [
  {
    id: "1",
    question: "Berapa lama waktu pengiriman?",
    answer:
      "Waktu pengiriman tergantung lokasi. Jabodetabek 1-2 hari, luar Jabodetabek 3-5 hari kerja.",
    tags: ["shipping", "delivery"],
    priority: "high",
  },
  {
    id: "2",
    question: "Apakah bisa COD?",
    answer:
      "Ya, kami menyediakan opsi COD untuk area tertentu dengan minimum order Rp 100.000.",
    tags: ["payment", "cod"],
    priority: "high",
  },
  {
    id: "3",
    question: "Bagaimana cara retur barang?",
    answer:
      "Silakan hubungi CS dalam 3 hari setelah barang diterima. Sertakan foto dan alasan retur.",
    tags: ["return", "complaint"],
    priority: "medium",
  },
];

const fileIcons = {
  pdf: <FileText className="h-4 w-4 text-destructive" />,
  csv: <FileSpreadsheet className="h-4 w-4 text-primary" />,
  xlsx: <FileSpreadsheet className="h-4 w-4 text-primary" />,
  docx: <File className="h-4 w-4 text-chart-2" />,
};

const statusIcons = {
  indexed: <CheckCircle className="h-4 w-4 text-primary" />,
  indexing: <Clock className="h-4 w-4 text-chart-4 animate-spin" />,
  failed: <AlertCircle className="h-4 w-4 text-destructive" />,
};

export default function ClientKnowledgeBase() {
  const [isDragging, setIsDragging] = useState(false);

  const totalTokens = uploadedFiles
    .filter((f) => f.status === "indexed")
    .reduce((sum, f) => sum + f.tokens, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Knowledge Base</h1>
          <p className="text-sm text-muted-foreground">
            Train your AI with documents, websites, and Q&A pairs
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total Indexed Tokens</p>
            <p className="text-lg font-semibold text-primary">
              {totalTokens.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="files" className="space-y-6">
        <TabsList className="bg-secondary">
          <TabsTrigger value="files">Files</TabsTrigger>
          <TabsTrigger value="websites">Website Links</TabsTrigger>
          <TabsTrigger value="qa">Manual Q&A</TabsTrigger>
        </TabsList>

        {/* Files Tab */}
        <TabsContent value="files" className="space-y-4">
          {/* Upload Area */}
          <Card
            className={cn(
              "border-dashed border-2 transition-colors",
              isDragging ? "border-primary bg-primary/5" : "border-border"
            )}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={() => setIsDragging(false)}
          >
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Upload className="h-10 w-10 text-muted-foreground mb-4" />
              <p className="text-lg font-medium text-foreground mb-1">
                Drop files here or click to upload
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Supports PDF, CSV, XLSX, DOCX (max 10MB)
              </p>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Select Files
              </Button>
            </CardContent>
          </Card>

          {/* Files Table */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-foreground">Uploaded Files</CardTitle>
              <CardDescription>
                Files are automatically processed and indexed for AI training
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground">File</TableHead>
                    <TableHead className="text-muted-foreground">Size</TableHead>
                    <TableHead className="text-muted-foreground">Status</TableHead>
                    <TableHead className="text-muted-foreground">Tokens</TableHead>
                    <TableHead className="text-muted-foreground">Uploaded</TableHead>
                    <TableHead className="text-muted-foreground w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {uploadedFiles.map((file) => (
                    <TableRow key={file.id} className="border-border">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {fileIcons[file.type]}
                          <span className="font-medium text-foreground">
                            {file.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {file.size}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {statusIcons[file.status]}
                          <span
                            className={cn(
                              "capitalize text-sm",
                              file.status === "indexed" && "text-primary",
                              file.status === "indexing" && "text-chart-4",
                              file.status === "failed" && "text-destructive"
                            )}
                          >
                            {file.status}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {file.tokens > 0 ? file.tokens.toLocaleString() : "-"}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {file.uploadedAt}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Websites Tab */}
        <TabsContent value="websites" className="space-y-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-foreground">Website Links</CardTitle>
                  <CardDescription>
                    Add website URLs to crawl and index for AI training
                  </CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add URL
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Website URL</DialogTitle>
                      <DialogDescription>
                        Enter a URL to crawl and index for your AI knowledge base
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="url">Website URL</Label>
                        <Input id="url" placeholder="https://example.com/products" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button>Add & Crawl</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground">URL</TableHead>
                    <TableHead className="text-muted-foreground">Status</TableHead>
                    <TableHead className="text-muted-foreground">Pages</TableHead>
                    <TableHead className="text-muted-foreground">Last Indexed</TableHead>
                    <TableHead className="text-muted-foreground w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {websiteLinks.map((link) => (
                    <TableRow key={link.id} className="border-border">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium text-foreground">
                            {link.url}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {statusIcons[link.status]}
                          <span className="capitalize text-sm text-primary">
                            {link.status}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {link.pages} pages
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {link.lastIndexed}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Q&A Tab */}
        <TabsContent value="qa" className="space-y-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-foreground">Manual Q&A Pairs</CardTitle>
                  <CardDescription>
                    Add direct question-answer pairs for specific responses
                  </CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Q&A
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Add Q&A Pair</DialogTitle>
                      <DialogDescription>
                        Create a question-answer pair for your AI to learn
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="question">Question</Label>
                        <Input id="question" placeholder="What is your return policy?" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="answer">Answer</Label>
                        <Textarea
                          id="answer"
                          placeholder="Our return policy allows..."
                          rows={4}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="tags">Tags (comma separated)</Label>
                        <Input id="tags" placeholder="return, policy, refund" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button>Add Q&A</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {qaPairs.map((qa) => (
                <div
                  key={qa.id}
                  className="rounded-lg border border-border bg-secondary/30 p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge
                          variant="outline"
                          className={cn(
                            qa.priority === "high" &&
                              "bg-destructive/10 text-destructive border-destructive/20",
                            qa.priority === "medium" &&
                              "bg-chart-4/10 text-chart-4 border-chart-4/20",
                            qa.priority === "low" &&
                              "bg-muted text-muted-foreground border-border"
                          )}
                        >
                          {qa.priority}
                        </Badge>
                        {qa.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <p className="font-medium text-foreground mb-1">
                        Q: {qa.question}
                      </p>
                      <p className="text-sm text-muted-foreground">A: {qa.answer}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
