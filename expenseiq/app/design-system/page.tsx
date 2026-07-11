"use client";

import React, { useState } from "react";
import {
  Search,
  Bell,
  Settings,
  CreditCard,
  TrendingUp,
  Sparkles,
  ChevronRight,
  Info,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Brain,
  LayoutDashboard,
  Wallet,
  PieChart,
  HelpCircle,
  ChevronDown,
  User,
  LogOut,
  Activity,
  Sliders,
  Send,
  Code,
  Copy,
  Laptop
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"colors" | "typography" | "components" | "ai">("components");
  const [simulateError, setSimulateError] = useState(false);
  const [inputText, setInputText] = useState("");
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(text);
    toast.success(`Copied ${label}: ${text}`);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  // Central Color Palettes Data
  const brandColors = [
    { label: "Primary (Emerald 600)", varName: "--brand-primary", value: "#059669" },
    { label: "Primary Hover (Emerald 700)", varName: "--brand-primary-hover", value: "#047857" },
    { label: "Primary Light (Emerald 50)", varName: "--brand-primary-light", value: "#ecfdf5" },
    { label: "Brand Success (Green 600)", varName: "--brand-success", value: "#16a34a" },
  ];

  const neutralColors = [
    { label: "Background (Slate 50)", varName: "--neutral-background", value: "#f8fafc" },
    { label: "Cards (White)", varName: "--neutral-card", value: "#ffffff" },
    { label: "Secondary BG (Slate 100)", varName: "--neutral-secondary-bg", value: "#f1f5f9" },
    { label: "Borders (Slate 200)", varName: "--neutral-border", value: "#e2e8f0" },
    { label: "Divider (Slate 200)", varName: "--neutral-divider", value: "#e2e8f0" },
  ];

  const textColors = [
    { label: "Primary Text (Slate 900)", varName: "--text-primary", value: "#0f172a" },
    { label: "Secondary Text (Slate 600)", varName: "--text-secondary", value: "#475569" },
    { label: "Muted Text (Slate 500)", varName: "--text-muted", value: "#64748b" },
    { label: "Disabled Text (Slate 400)", varName: "--text-disabled", value: "#94a3b8" },
  ];

  const statusColors = [
    { label: "Success (Green 600)", varName: "--status-success", value: "#16a34a" },
    { label: "Warning (Amber 600)", varName: "--status-warning", value: "#d97706" },
    { label: "Error (Red 600)", varName: "--status-error", value: "#dc2626" },
    { label: "Info (Blue 600)", varName: "--status-info", value: "#2563eb" },
  ];

  const aiColors = [
    { label: "AI Primary (Purple 600)", varName: "--ai-primary", value: "#9333ea" },
    { label: "AI Hover (Purple 700)", varName: "--ai-primary-hover", value: "#7e22ce" },
    { label: "AI Light (Purple 50)", varName: "--ai-primary-light", value: "#faf5ff" },
  ];

  return (
    <div className="flex h-screen w-full bg-neutral-bg overflow-hidden text-text-primary">
      <Toaster position="top-right" />

      {/* ================= SIDEBAR COMPONENT ================= */}
      <aside className="hidden md:flex flex-col w-64 border-r border-sidebar-border bg-sidebar-bg">
        {/* Branding */}
        <div className="flex items-center gap-2.5 h-16 px-6 border-b border-sidebar-border">
          <div className="flex items-center justify-center size-8 rounded-lg bg-brand-primary text-white shadow-sm">
            <TrendingUp className="size-4.5" />
          </div>
          <div>
            <span className="font-bold text-sm tracking-tight text-text-primary">ExpenseIQ</span>
            <span className="block text-[10px] font-medium text-text-muted leading-none">AI Operating System</span>
          </div>
        </div>

        {/* Navigation Groups */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-7">
          <div className="space-y-1">
            <span className="block px-2 text-[10px] font-semibold text-text-muted tracking-wider uppercase">Overview</span>
            
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-sidebar-item-active-bg text-sidebar-item-active-fg text-sm font-medium transition-colors">
              <LayoutDashboard className="size-4 text-brand-primary" />
              Dashboard
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-item-inactive-fg hover:bg-sidebar-item-hover-bg hover:text-text-primary text-sm font-medium transition-colors">
              <CreditCard className="size-4" />
              Transactions
              <span className="ml-auto flex items-center justify-center h-4.5 min-w-4 px-1 rounded-full bg-neutral-secondary-bg text-[10px] font-medium border border-neutral-border">8</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-item-inactive-fg hover:bg-sidebar-item-hover-bg hover:text-text-primary text-sm font-medium transition-colors">
              <Wallet className="size-4" />
              Budgets
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-item-inactive-fg hover:bg-sidebar-item-hover-bg hover:text-text-primary text-sm font-medium transition-colors">
              <PieChart className="size-4" />
              Analytics
            </a>
          </div>

          {/* AI Theme Scoped Group */}
          <div className="space-y-1">
            <div className="flex items-center justify-between px-2">
              <span className="block text-[10px] font-semibold text-text-muted tracking-wider uppercase">AI Modules</span>
              <Badge variant="ghost" className="h-4 px-1.5 text-[9px] text-ai-primary bg-ai-light font-semibold border border-ai-primary/20">Active</Badge>
            </div>
            
            <a 
              href="#" 
              onClick={() => { setActiveTab("ai"); toast.info("Switched to AI Workspace Theme"); }}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-item-inactive-fg hover:bg-ai-light hover:text-ai-primary text-sm font-medium transition-colors"
            >
              <Sparkles className="size-4 text-ai-primary" />
              AI Advisor
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-item-inactive-fg hover:bg-sidebar-item-hover-bg hover:text-text-primary text-sm font-medium transition-colors">
              <Brain className="size-4" />
              AI Insights
            </a>
          </div>

          <div className="space-y-1">
            <span className="block px-2 text-[10px] font-semibold text-text-muted tracking-wider uppercase">Management</span>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-item-inactive-fg hover:bg-sidebar-item-hover-bg hover:text-text-primary text-sm font-medium transition-colors">
              <Settings className="size-4" />
              Settings
            </a>
          </div>
        </div>

        {/* Profile Footer block */}
        <div className="p-4 border-t border-sidebar-border bg-sidebar-bg">
          <DropdownMenu>
            <DropdownMenuTrigger render={
              <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-sidebar-item-hover-bg text-left transition-colors">
                <Avatar size="sm">
                  <AvatarFallback className="bg-brand-primary/10 text-brand-primary font-semibold text-xs">SA</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <span className="block text-sm font-medium text-text-primary truncate">Soham Amare</span>
                  <span className="block text-[11px] text-text-muted truncate">soham@expenseiq.com</span>
                </div>
                <ChevronDown className="size-3.5 text-text-muted shrink-0" />
              </button>
            } />
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuGroup>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => toast.info("Opening Account Settings")}>
                  <User className="mr-2 h-4 w-4" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.info("Opening Preferences")}>
                  <Sliders className="mr-2 h-4 w-4" />
                  Display Settings
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => toast.warning("Logged out successfully")} variant="destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* ================= MAIN CONTENT VIEW ================= */}
      <div className="flex-1 flex flex-col overflow-hidden bg-neutral-bg">
        
        {/* ================= HEADER COMPONENT ================= */}
        <header className="flex items-center justify-between h-16 px-6 border-b border-neutral-border bg-header-bg">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-text-muted">Workspace</span>
            <ChevronRight className="size-3.5 text-text-disabled" />
            <span className="text-sm font-semibold text-text-primary">Design System</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Bar - central inputs style */}
            <div className="relative w-64 hidden sm:block">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-text-muted pointer-events-none" />
              <input 
                type="text" 
                placeholder="Search design variables..." 
                className="h-8 w-full rounded-lg border border-neutral-border bg-neutral-bg pl-9 pr-3 text-xs text-text-primary placeholder:text-text-muted focus:border-brand-primary focus:outline-none transition-colors"
              />
            </div>

            {/* Notifications Alert button */}
            <Button 
              variant="outline" 
              size="icon-sm" 
              onClick={() => toast.info("Design System is fully synchronized with Tailwind config")}
              className="relative text-text-secondary"
            >
              <Bell className="size-4" />
              <span className="absolute top-1 right-1 flex size-1.5 rounded-full bg-brand-primary" />
            </Button>

            <Button 
              variant="ghost" 
              size="icon-sm" 
              onClick={() => toast.info("Need help? Central branding definitions are located in app/globals.css")}
              className="text-text-secondary"
            >
              <HelpCircle className="size-4" />
            </Button>
          </div>
        </header>

        {/* Scrollable Workspace Panel */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
          
          {/* Welcome Banner */}
          <section className="relative p-6 rounded-xl border border-neutral-border bg-neutral-card overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-brand-primary/5 via-transparent to-transparent pointer-events-none" />
            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold text-brand-primary bg-brand-primary-light border border-brand-primary/20 mb-3">
                  <Laptop className="size-3" />
                  Centralized Design System
                </span>
                <h1 className="text-2xl font-bold tracking-tight text-text-primary mb-1">ExpenseIQ UI Architecture</h1>
                <p className="text-sm text-text-secondary max-w-2xl leading-relaxed">
                  Welcome to the design playground for ExpenseIQ. This single source of truth consolidates brand colors, typographic hierarchies, semantic states, and component mappings directly into Tailwind CSS configuration.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Dialog>
                  <DialogTrigger render={
                    <Button>
                      <Code className="size-4 mr-2" />
                      View CSS Config
                    </Button>
                  } />
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>中央 Design Theme Architecture</DialogTitle>
                      <DialogDescription>
                        CSS variables defined in <span className="font-mono text-xs">app/globals.css</span> serve as the central source of branding:
                      </DialogDescription>
                    </DialogHeader>
                    <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-[11px] overflow-x-auto max-h-72">
{`:root {
  --brand-primary: #059669; /* Emerald 600 */
  --neutral-background: #f8fafc; /* Slate 50 */
  --neutral-card: #ffffff; /* White */
  --neutral-border: #e2e8f0; /* Slate 200 */
  --text-primary: #0f172a; /* Slate 900 */
  --text-secondary: #475569; /* Slate 600 */
  --status-success: #16a34a; /* Green 600 */
  --ai-primary: #9333ea; /* Purple 600 */
}`}
                    </div>
                    <DialogFooter>
                      <DialogClose render={<Button variant="secondary">Close Configuration</Button>} />
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </section>

          {/* Navigation Tabs */}
          <div className="flex border-b border-neutral-border gap-6">
            <button 
              onClick={() => setActiveTab("components")} 
              className={`pb-3 text-sm font-semibold border-b-2 transition-colors -mb-px ${activeTab === "components" ? "border-brand-primary text-brand-primary" : "border-transparent text-text-secondary hover:text-text-primary"}`}
            >
              Component Sandbox
            </button>
            <button 
              onClick={() => setActiveTab("colors")} 
              className={`pb-3 text-sm font-semibold border-b-2 transition-colors -mb-px ${activeTab === "colors" ? "border-brand-primary text-brand-primary" : "border-transparent text-text-secondary hover:text-text-primary"}`}
            >
              Color tokens
            </button>
            <button 
              onClick={() => setActiveTab("typography")} 
              className={`pb-3 text-sm font-semibold border-b-2 transition-colors -mb-px ${activeTab === "typography" ? "border-brand-primary text-brand-primary" : "border-transparent text-text-secondary hover:text-text-primary"}`}
            >
              Typography System
            </button>
            <button 
              onClick={() => setActiveTab("ai")} 
              className={`pb-3 text-sm font-semibold border-b-2 transition-colors -mb-px ${activeTab === "ai" ? "border-brand-primary text-brand-primary" : "border-transparent text-text-secondary hover:text-text-primary"}`}
            >
              AI Theme (Scoped)
            </button>
          </div>

          {/* ================= TAB CONTENT: COLORS ================= */}
          {activeTab === "colors" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Brand & Primary Colors */}
              <Card>
                <CardHeader>
                  <CardTitle>Primary Accent (Emerald)</CardTitle>
                  <CardDescription>Associated with financial growth, money, and success.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {brandColors.map((c) => (
                    <div key={c.varName} onClick={() => copyToClipboard(c.value, c.label)} className="flex items-center justify-between p-3 rounded-lg border border-neutral-border hover:border-brand-primary/30 bg-neutral-bg cursor-pointer transition-all hover:scale-[1.01]">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded border border-neutral-border" style={{ backgroundColor: c.value }} />
                        <div>
                          <span className="block text-xs font-semibold text-text-primary">{c.label}</span>
                          <span className="block text-[10px] font-mono text-text-muted">{c.varName}</span>
                        </div>
                      </div>
                      {copiedToken === c.value ? (
                        <CheckCircle2 className="size-3.5 text-brand-success" />
                      ) : (
                        <Copy className="size-3.5 text-text-disabled" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Neutral Theme Palette */}
              <Card>
                <CardHeader>
                  <CardTitle>Neutrals (Slate)</CardTitle>
                  <CardDescription>Central Slate colors providing premium interface grounding.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {neutralColors.map((c) => (
                    <div key={c.varName} onClick={() => copyToClipboard(c.value, c.label)} className="flex items-center justify-between p-3 rounded-lg border border-neutral-border hover:border-brand-primary/30 bg-neutral-bg cursor-pointer transition-all hover:scale-[1.01]">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded border border-neutral-border" style={{ backgroundColor: c.value }} />
                        <div>
                          <span className="block text-xs font-semibold text-text-primary">{c.label}</span>
                          <span className="block text-[10px] font-mono text-text-muted">{c.varName}</span>
                        </div>
                      </div>
                      {copiedToken === c.value ? (
                        <CheckCircle2 className="size-3.5 text-brand-success" />
                      ) : (
                        <Copy className="size-3.5 text-text-disabled" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Text Hierarchies */}
              <Card>
                <CardHeader>
                  <CardTitle>Text Colors</CardTitle>
                  <CardDescription>Consistent contrast guidelines across all typography levels.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {textColors.map((c) => (
                    <div key={c.varName} onClick={() => copyToClipboard(c.value, c.label)} className="flex items-center justify-between p-3 rounded-lg border border-neutral-border hover:border-brand-primary/30 bg-neutral-bg cursor-pointer transition-all hover:scale-[1.01]">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded border border-neutral-border flex items-center justify-center text-xs font-bold" style={{ color: c.value, backgroundColor: "#fff" }}>Aa</div>
                        <div>
                          <span className="block text-xs font-semibold" style={{ color: c.value }}>{c.label}</span>
                          <span className="block text-[10px] font-mono text-text-muted">{c.varName}</span>
                        </div>
                      </div>
                      {copiedToken === c.value ? (
                        <CheckCircle2 className="size-3.5 text-brand-success" />
                      ) : (
                        <Copy className="size-3.5 text-text-disabled" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Status and Special Color systems */}
              <Card>
                <CardHeader>
                  <CardTitle>Status & AI Palettes</CardTitle>
                  <CardDescription>Scoped semantic system indicating states and AI contexts.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    {statusColors.map((c) => (
                      <div key={c.varName} onClick={() => copyToClipboard(c.value, c.label)} className="p-3 rounded-lg border border-neutral-border hover:border-brand-primary/30 bg-neutral-bg cursor-pointer transition-all hover:scale-[1.01]">
                        <div className="size-6 rounded mb-2 border border-neutral-border" style={{ backgroundColor: c.value }} />
                        <span className="block text-xs font-semibold text-text-primary truncate">{c.label}</span>
                        <span className="block text-[9px] font-mono text-text-muted truncate">{c.varName}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-3.5 rounded-lg border border-ai-primary/20 bg-ai-light">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-ai-primary mb-1">
                      <Sparkles className="size-3.5" />
                      AI Accent: Scoped Purple Accent
                    </span>
                    <p className="text-[11px] text-text-secondary mb-3">
                      This theme is restricted ONLY to AI-related panels and layouts like Advisor and Insights.
                    </p>
                    <div className="flex gap-2">
                      {aiColors.map((c) => (
                        <div key={c.varName} onClick={() => copyToClipboard(c.value, c.label)} className="flex-1 p-2 rounded border border-purple-200/50 bg-white hover:border-ai-primary/30 cursor-pointer text-center text-[10px] font-medium text-ai-primary">
                          {c.label.split(" ")[0]}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>
          )}

          {/* ================= TAB CONTENT: TYPOGRAPHY ================= */}
          {activeTab === "typography" && (
            <Card>
              <CardHeader>
                <CardTitle>Typography System</CardTitle>
                <CardDescription>Primary typeface: Geist Sans (official Vercel font for enterprise readability).</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Visual Scale Showcase */}
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-neutral-secondary-bg border border-neutral-border">
                    <span className="block text-[10px] font-mono text-text-muted mb-2">Heading Scale (Font: Geist, Bold/SemiBold)</span>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">h1. Primary Heading: Design System</h1>
                    <h2 className="text-2xl font-semibold tracking-tight mb-1">h2. Sub Heading: Component Playground</h2>
                    <h3 className="text-xl font-semibold tracking-tight">h3. Small Header: Table Entries</h3>
                  </div>

                  <div className="p-4 rounded-lg bg-neutral-secondary-bg border border-neutral-border">
                    <span className="block text-[10px] font-mono text-text-muted mb-2">Body Text (Font: Geist, Regular)</span>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      This is body copy styled with Geist Sans. It is designed for maximum clarity, readability, and modern clean aesthetics in business dashboards. The primary text color is Slate 900 (using class <code className="font-mono text-xs bg-neutral-border px-1 py-0.5 rounded">text-text-primary</code>) and the secondary subtext is Slate 600.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-neutral-secondary-bg border border-neutral-border">
                      <span className="block text-[10px] font-mono text-text-muted mb-2">Buttons (Font: Geist, Medium)</span>
                      <Button className="w-full">Medium Weight Button</Button>
                    </div>
                    <div className="p-4 rounded-lg bg-neutral-secondary-bg border border-neutral-border">
                      <span className="block text-[10px] font-mono text-text-muted mb-2">Input Labels (Font: Geist, Medium)</span>
                      <label className="block text-text-primary font-medium mb-1.5">User Email Address</label>
                      <Input placeholder="name@domain.com" />
                    </div>
                    <div className="p-4 rounded-lg bg-neutral-secondary-bg border border-neutral-border">
                      <span className="block text-[10px] font-mono text-text-muted mb-2">Code Blocks (Font: Geist Mono)</span>
                      <pre className="font-mono text-xs text-brand-primary bg-white p-2 rounded border border-neutral-border">npm run dev</pre>
                    </div>
                  </div>
                </div>

              </CardContent>
            </Card>
          )}

          {/* ================= TAB CONTENT: SANDBOX ================= */}
          {activeTab === "components" && (
            <div className="space-y-8">
              
              {/* Financial Metrics Row Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                
                {/* Budget card (Emerald) */}
                <Card className="relative hover:shadow-md transition-all duration-200">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-brand-primary" />
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardDescription className="font-semibold text-text-muted uppercase text-[10px] tracking-wider">Total Budget</CardDescription>
                      <Wallet className="size-4 text-brand-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight">$8,250.00</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <span className="text-[11px] text-text-secondary">Emerald brand primary representation</span>
                  </CardContent>
                </Card>

                {/* Income Card (Green status) */}
                <Card className="relative hover:shadow-md transition-all duration-200">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-status-success" />
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardDescription className="font-semibold text-text-muted uppercase text-[10px] tracking-wider">Total Income</CardDescription>
                      <ArrowUpRight className="size-4 text-status-success" />
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight">$14,320.00</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <span className="text-[11px] text-status-success font-semibold inline-flex items-center gap-1">
                      +12.4% this month
                    </span>
                  </CardContent>
                </Card>

                {/* Expense Card (Red status) */}
                <Card className="relative hover:shadow-md transition-all duration-200">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-status-error" />
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardDescription className="font-semibold text-text-muted uppercase text-[10px] tracking-wider">Expenses</CardDescription>
                      <ArrowDownLeft className="size-4 text-status-error" />
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight">$6,070.00</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <span className="text-[11px] text-status-error font-semibold inline-flex items-center gap-1">
                      -4.2% from forecast
                    </span>
                  </CardContent>
                </Card>

                {/* AI advisor Workspace Card (Purple Scoped) */}
                <Card className="relative hover:shadow-md transition-all duration-200 border-purple-200 bg-purple-50/10">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-ai-primary" />
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardDescription className="font-semibold text-ai-primary uppercase text-[10px] tracking-wider">AI Insights</CardDescription>
                      <Sparkles className="size-4 text-ai-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight">3 Smart Savings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <span className="text-[11px] text-ai-primary font-semibold">Recommendations ready</span>
                  </CardContent>
                </Card>
              </div>

              {/* Central Component Showcase Blocks */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Buttons Sandbox */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Button variants</CardTitle>
                    <CardDescription>Buttons are built with Geist Medium font weights, satisfying semantic rules.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-wrap gap-3">
                      <Button variant="default" onClick={() => toast.success("Primary Emerald button clicked")}>
                        Primary Accent (Emerald)
                      </Button>
                      
                      <Button variant="secondary" onClick={() => toast.info("Secondary neutral button clicked")}>
                        Secondary Neutral
                      </Button>

                      <Button variant="outline" onClick={() => toast.info("Outline button clicked")}>
                        Outline Border
                      </Button>

                      <Button variant="ghost" onClick={() => toast.info("Ghost hover button clicked")}>
                        Ghost Button
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button className="bg-status-success hover:bg-status-success/90 text-white" onClick={() => toast.success("Success transaction submitted")}>
                        Success Style
                      </Button>

                      <Button variant="destructive" onClick={() => toast.error("Destructive deletion triggered")}>
                        Danger Destructive
                      </Button>

                      <Button variant="outline" size="sm" onClick={() => toast.info("Small secondary button clicked")}>
                        Small Button
                      </Button>

                      <Button variant="outline" size="icon" onClick={() => toast.success("Refresh complete")} className="text-text-secondary">
                        <Plus className="size-4" />
                      </Button>
                    </div>

                    <div className="p-4 rounded-lg bg-neutral-secondary-bg border border-neutral-border">
                      <span className="block text-[10px] font-mono text-text-muted mb-2">Central Code Reference (Tailwind Classes)</span>
                      <pre className="font-mono text-xs text-text-secondary bg-white p-2.5 rounded border border-neutral-border overflow-x-auto">
{`<Button className="bg-primary text-primary-foreground hover:bg-primary/80">Primary</Button>
<Button className="border border-border bg-background text-foreground hover:bg-muted">Outline</Button>`}
                      </pre>
                    </div>
                  </CardContent>
                </Card>

                {/* Form Inputs Sandbox */}
                <Card>
                  <CardHeader>
                    <CardTitle>Input Centralized States</CardTitle>
                    <CardDescription>Displays inputs and feedback states.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    
                    {/* Normal Inputs state */}
                    <div className="space-y-1.5">
                      <label className="text-text-primary text-xs font-medium">Standard Text Field</label>
                      <Input 
                        placeholder="Enter value..." 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                      />
                    </div>

                    {/* Simulated Focus/Focused state */}
                    <div className="space-y-1.5">
                      <label className="text-text-primary text-xs font-medium">Simulated Focused State</label>
                      <input 
                        type="text" 
                        defaultValue="Focus indicator is Emerald color"
                        className="h-8 w-full rounded-lg border border-brand-primary bg-transparent px-2.5 py-1 text-sm outline-none ring-3 ring-brand-primary/50" 
                      />
                    </div>

                    {/* Error state */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className={`text-xs font-medium ${simulateError ? "text-status-error" : "text-text-primary"}`}>Transaction Amount</label>
                        <button 
                          onClick={() => setSimulateError(!simulateError)} 
                          className="text-[10px] text-brand-primary hover:underline font-semibold"
                        >
                          Toggle Error State
                        </button>
                      </div>
                      <Input 
                        defaultValue="-120.00" 
                        aria-invalid={simulateError}
                        className={simulateError ? "border-status-error focus-visible:ring-status-error/20" : ""}
                      />
                      {simulateError && (
                        <p className="text-[11px] text-status-error font-medium flex items-center gap-1 mt-1">
                          <XCircle className="size-3" />
                          Amount cannot be negative
                        </p>
                      )}
                    </div>

                    {/* Disabled inputs state */}
                    <div className="space-y-1.5">
                      <label className="text-text-disabled text-xs font-medium">Disabled Field</label>
                      <Input placeholder="Locked value..." disabled />
                    </div>

                  </CardContent>
                </Card>
              </div>

              {/* Table ledger mapping transactions */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Transactions Ledger (Centralized Table)</CardTitle>
                      <CardDescription>Ledger table showing semantic colors and typography mappings.</CardDescription>
                    </div>
                    <Badge variant="outline" className="border-neutral-border font-medium">Showing 3 transactions</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto rounded-lg border border-neutral-border">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-table-header-bg border-b border-table-border font-medium text-text-secondary">
                          <th className="p-3 font-semibold">Vendor / Merchant</th>
                          <th className="p-3 font-semibold">Category</th>
                          <th className="p-3 font-semibold">Transaction Date</th>
                          <th className="p-3 font-semibold">Status</th>
                          <th className="p-3 font-semibold text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-table-border">
                        <tr className="hover:bg-table-row-hover transition-colors">
                          <td className="p-3 font-semibold text-text-primary">Stripe Subscription</td>
                          <td className="p-3">SaaS / Infrastructure</td>
                          <td className="p-3 text-text-muted">July 11, 2026</td>
                          <td className="p-3">
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold text-status-success bg-green-50 border border-green-200">
                              <CheckCircle2 className="size-3" />
                              Cleared
                            </span>
                          </td>
                          <td className="p-3 font-bold text-right text-status-error font-mono">-$49.00</td>
                        </tr>
                        <tr className="hover:bg-table-row-hover transition-colors">
                          <td className="p-3 font-semibold text-text-primary">Vercel Deployments</td>
                          <td className="p-3">Hosting Fees</td>
                          <td className="p-3 text-text-muted">July 10, 2026</td>
                          <td className="p-3">
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold text-status-success bg-green-50 border border-green-200">
                              <CheckCircle2 className="size-3" />
                              Cleared
                            </span>
                          </td>
                          <td className="p-3 font-bold text-right text-status-error font-mono">-$20.00</td>
                        </tr>
                        <tr className="hover:bg-table-row-hover transition-colors">
                          <td className="p-3 font-semibold text-text-primary">Supreme Client Invoice</td>
                          <td className="p-3">Consulting Revenue</td>
                          <td className="p-3 text-text-muted">July 08, 2026</td>
                          <td className="p-3">
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold text-status-info bg-blue-50 border border-blue-200">
                              <Activity className="size-3 text-status-info" />
                              Pending
                            </span>
                          </td>
                          <td className="p-3 font-bold text-right text-status-success font-mono">+$2,400.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Status Alerts boxes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Alert Banners system */}
                <Card>
                  <CardHeader>
                    <CardTitle>System Alerts Mappings</CardTitle>
                    <CardDescription>Central alerts constructed entirely using centralized status properties.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    
                    {/* Info Alert banner */}
                    <div className="flex gap-3 p-3.5 rounded-lg border border-blue-200 bg-blue-50/50">
                      <Info className="size-4.5 text-status-info shrink-0" />
                      <div>
                        <h4 className="text-xs font-semibold text-status-info mb-0.5">Database Synchronization Active</h4>
                        <p className="text-[11px] text-text-secondary leading-normal">System is linked to Supabase database. Schema synced at 19:15 GMT.</p>
                      </div>
                    </div>

                    {/* Warning Alert banner */}
                    <div className="flex gap-3 p-3.5 rounded-lg border border-amber-200 bg-amber-50/50">
                      <AlertTriangle className="size-4.5 text-status-warning shrink-0" />
                      <div>
                        <h4 className="text-xs font-semibold text-status-warning mb-0.5">Nearing Monthly SaaS Budget Limits</h4>
                        <p className="text-[11px] text-text-secondary leading-normal">Current software cost exceeds 85% of allocated limits ($1,250 max).</p>
                      </div>
                    </div>

                    {/* Error Alert banner */}
                    <div className="flex gap-3 p-3.5 rounded-lg border border-red-200 bg-red-50/50">
                      <XCircle className="size-4.5 text-status-error shrink-0" />
                      <div>
                        <h4 className="text-xs font-semibold text-status-error mb-0.5">Transaction Authorization Failed</h4>
                        <p className="text-[11px] text-text-secondary leading-normal">Payment processing gateway rejected the client charge due to insufficient token credentials.</p>
                      </div>
                    </div>

                  </CardContent>
                </Card>

                {/* Dialog Sandbox with active states */}
                <Card className="flex flex-col justify-between">
                  <div>
                    <CardHeader>
                      <CardTitle>Central Overlay System (Dialogs)</CardTitle>
                      <CardDescription>Overlays consume colors from centralized variables, preserving modern glassmorphism features.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-text-secondary leading-relaxed mb-4">
                        Modals utilize a soft, backdrop blur and a fine border outline. All buttons and internal labels within the dialog map directly to the central typography and color tokens.
                      </p>
                      <div className="p-4 rounded-lg bg-neutral-secondary-bg border border-neutral-border text-center">
                        <Dialog>
                          <DialogTrigger render={
                            <Button className="bg-brand-primary text-white hover:bg-brand-primary-hover shadow-sm">
                              Trigger System Overlay
                            </Button>
                          } />
                          <DialogContent className="sm:max-w-sm">
                            <DialogHeader>
                              <DialogTitle className="text-text-primary">Confirm Branding Update</DialogTitle>
                              <DialogDescription className="text-text-secondary">
                                Are you sure you want to save these global theme token mappings? This will affect all features.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="py-2 space-y-2">
                              <div className="flex items-center justify-between text-xs p-2 rounded bg-neutral-bg border border-neutral-border">
                                <span className="font-semibold text-text-primary">Theme Active:</span>
                                <Badge variant="outline" className="text-brand-primary border-brand-primary/20 bg-brand-primary-light">Emerald 600</Badge>
                              </div>
                            </div>
                            <DialogFooter>
                              <DialogClose render={<Button variant="secondary" className="mr-2">Cancel</Button>} />
                              <DialogClose render={
                                <Button className="bg-brand-primary text-white hover:bg-brand-primary-hover" onClick={() => toast.success("Central design settings updated!")}>
                                  Save Updates
                                </Button>
                              } />
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </div>
                  <CardFooter className="pt-0">
                    <span className="text-[11px] text-text-muted">Compatible with shadcn dialog configurations</span>
                  </CardFooter>
                </Card>

              </div>
            </div>
          )}

          {/* ================= TAB CONTENT: AI WORKSPACE ================= */}
          {activeTab === "ai" && (
            <Card className="border-purple-200 overflow-hidden relative">
              <div className="absolute top-0 left-0 right-0 h-1 bg-ai-primary" />
              <CardHeader className="bg-purple-50/30 border-b border-purple-100">
                <div className="flex items-center gap-2">
                  <Brain className="size-5 text-ai-primary" />
                  <CardTitle className="text-ai-primary font-bold">AI Financial Operating Workspace</CardTitle>
                </div>
                <CardDescription className="text-purple-700/80">
                  This segment demonstrates how the scoped Purple theme color variables are bound strictly to AI features.
                </CardDescription>
              </CardHeader>
              <CardContent className="py-6 space-y-6">
                
                {/* AI Chat box block */}
                <div className="p-4 rounded-xl border border-purple-200/60 bg-purple-50/10 space-y-4">
                  <div className="flex items-start gap-3">
                    <Avatar size="default" className="border-purple-200">
                      <AvatarFallback className="bg-ai-primary text-white font-semibold">AI</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1 bg-white p-3 rounded-r-xl rounded-bl-xl border border-purple-100 shadow-xs max-w-lg">
                      <span className="block text-xs font-semibold text-ai-primary">ExpenseIQ Advisor</span>
                      <p className="text-xs text-text-secondary leading-normal">
                        I&apos;ve analyzed your transaction ledger. You spent $430 less on Software subscriptions this week than your average forecast. I recommend setting up an auto-savings target of $400 in your Emerald cash account.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Prompt inputs styled in Scoped Purple */}
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Ask Advisor to write a custom query..."
                    className="flex-1 h-9 rounded-lg border border-purple-200 bg-white px-3 text-xs focus:border-ai-primary focus:ring-2 focus:ring-ai-primary/20 outline-none transition-all placeholder:text-purple-300"
                  />
                  <Button className="bg-ai-primary hover:bg-ai-primary-hover text-white px-4 h-9">
                    <Send className="size-3.5 mr-1.5" />
                    Query
                  </Button>
                </div>

                <div className="rounded-lg p-3 bg-purple-50/50 border border-purple-100/50 text-[11px] text-purple-700">
                  <strong>Branding constraint enforced:</strong> Standard pages (Dashboard, Settings, Ledger) are colored in Emerald Green. AI spaces switch context gracefully using <code className="font-mono bg-white px-1 py-0.5 rounded border border-purple-200">bg-ai-primary</code> variables.
                </div>
              </CardContent>
            </Card>
          )}

        </main>
      </div>
    </div>
  );
}
