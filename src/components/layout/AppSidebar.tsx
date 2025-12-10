import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Target, DollarSign, FileText, FileCheck, Bot, CreditCard, Settings, Plug, ScrollText, Bell, UsersRound, Activity, MessageSquare, Brain, ShoppingCart, Sparkles, Workflow, Gift } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
interface AppSidebarProps {
  type: "admin" | "client";
}
const adminNavItems = [{
  title: "Overview",
  url: "/admin",
  icon: LayoutDashboard
}, {
  title: "Clients",
  url: "/admin/clients",
  icon: Users
}, {
  title: "Leads Intelligence",
  url: "/admin/leads",
  icon: Target
}, {
  title: "Finance & Payments",
  url: "/admin/finance",
  icon: DollarSign
}, {
  title: "Invoice Generator",
  url: "/admin/invoices",
  icon: FileText
}, {
  title: "SPK Generator",
  url: "/admin/spk",
  icon: FileCheck
}, {
  title: "AI System Control",
  url: "/admin/ai-control",
  icon: Bot
}, {
  title: "Subscriptions",
  url: "/admin/subscriptions",
  icon: CreditCard
}, {
  title: "Integrations",
  url: "/admin/integrations",
  icon: Plug
}, {
  title: "Audit Logs",
  url: "/admin/audit",
  icon: ScrollText
}, {
  title: "Team & Users",
  url: "/admin/team",
  icon: UsersRound
}, {
  title: "Health Monitor",
  url: "/admin/health",
  icon: Activity
}, {
  title: "Settings",
  url: "/admin/settings",
  icon: Settings
}];
const clientNavItems = [{
  title: "Dashboard",
  url: "/dashboard",
  icon: LayoutDashboard
}, {
  title: "Leads",
  url: "/dashboard/leads",
  icon: Target
}, {
  title: "Chat Logs",
  url: "/dashboard/chats",
  icon: MessageSquare
}, {
  title: "Knowledge Base",
  url: "/dashboard/knowledge",
  icon: Brain
}, {
  title: "Products",
  url: "/dashboard/products",
  icon: ShoppingCart
}, {
  title: "Bot Personality",
  url: "/dashboard/personality",
  icon: Sparkles
}, {
  title: "Workflows",
  url: "/dashboard/workflows",
  icon: Workflow
}, {
  title: "Billing",
  url: "/dashboard/billing",
  icon: CreditCard
}, {
  title: "Team",
  url: "/dashboard/team",
  icon: UsersRound
}, {
  title: "Integrations",
  url: "/dashboard/integrations",
  icon: Plug
}, {
  title: "Settings",
  url: "/dashboard/settings",
  icon: Settings
}];
export function AppSidebar({
  type
}: AppSidebarProps) {
  const location = useLocation();
  const navItems = type === "admin" ? adminNavItems : clientNavItems;
  return <Sidebar className="border-r border-border bg-sidebar">
      <div className="flex h-14 items-center border-b border-border px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Bot className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-foreground">Mas AI</span>
        </div>
      </div>

      <SidebarContent className="scrollbar-thin">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground">
            {type === "admin" ? "Administration" : "Dashboard"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map(item => {
              const isActive = location.pathname === item.url;
              return <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className={cn("relative flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors", isActive ? "bg-sidebar-accent text-primary" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground")}>
                        {isActive && <div className="absolute left-0 h-full w-0.5 rounded-full bg-primary" />}
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>;
            })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
          <div className="flex items-center gap-2 text-primary">
            <Gift className="h-4 w-4" />
            <span className="text-sm font-medium">Referral Program</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Give 1 month free to friends
          </p>
          <button className="mt-2 w-full rounded-md bg-primary/20 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/30 transition-colors">
            Learn More
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>;
}