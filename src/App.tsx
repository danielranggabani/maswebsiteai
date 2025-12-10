import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

// Pages
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminOverview from "./pages/admin/AdminOverview";
import AdminClients from "./pages/admin/AdminClients";
import AdminLeads from "./pages/admin/AdminLeads";

// Client Pages
import ClientDashboard from "./pages/client/ClientDashboard";
import ClientChatLogs from "./pages/client/ClientChatLogs";
import ClientKnowledgeBase from "./pages/client/ClientKnowledgeBase";
import ClientProducts from "./pages/client/ClientProducts";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />

          {/* Admin Routes */}
          <Route element={<DashboardLayout type="admin" />}>
            <Route path="/admin" element={<AdminOverview />} />
            <Route path="/admin/clients" element={<AdminClients />} />
            <Route path="/admin/leads" element={<AdminLeads />} />
          </Route>

          {/* Client Routes */}
          <Route element={<DashboardLayout type="client" />}>
            <Route path="/dashboard" element={<ClientDashboard />} />
            <Route path="/dashboard/chats" element={<ClientChatLogs />} />
            <Route path="/dashboard/knowledge" element={<ClientKnowledgeBase />} />
            <Route path="/dashboard/products" element={<ClientProducts />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
