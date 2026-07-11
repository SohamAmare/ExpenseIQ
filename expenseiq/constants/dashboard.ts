export const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", href: "/dashboard", iconName: "LayoutDashboard" },
  { id: "income", label: "Income", href: "/income", iconName: "Wallet" },
  { id: "expenses", label: "Expenses", href: "/expenses", iconName: "CreditCard" },
  { id: "budgets", label: "Budgets", href: "/budgets", iconName: "PieChart" },
  { id: "savings", label: "Savings Goals", href: "/savings", iconName: "Target" },
  { id: "calendar", label: "Financial Calendar", href: "/calendar", iconName: "CalendarDays" },
  { id: "reports", label: "Reports & Analytics", href: "/reports", iconName: "BarChart2" },
  { id: "notifications", label: "Notifications", href: "/notifications", iconName: "Bell" },
  { id: "ai-advisor", label: "AI Advisor", href: "/ai-advisor", iconName: "Sparkles" },
  { id: "ai-workspace", label: "AI Workspace", href: "/ai-workspace", iconName: "Brain" },
  { id: "settings", label: "Settings", href: "/settings", iconName: "Settings" },
] as const;

export const BUDGET_THRESHOLDS = {
  WARNING: 80, // Warning state at 80% used
  CRITICAL: 100, // Critical state at 100% used
} as const;

export const HEALTH_THRESHOLDS = {
  EXCELLENT: 85,
  GOOD: 70,
  FAIR: 50,
} as const;

export const DEFAULT_SYNC_INTERVAL = 120000; // 2 minutes last sync helper
