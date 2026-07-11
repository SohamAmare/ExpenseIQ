import { DashboardData } from "@/types/dashboard";
import { getDailyQuote } from "../quote/daily-quote";
import { calculateFinancialHealth } from "../analytics/financial-health";

/**
 * Service to fetch and transform active dashboard telemetry.
 */
export async function getDashboardData(): Promise<DashboardData> {
  // Mock Data representation for MVP (Phase 1)
  const monthlyIncome = 8450;
  const monthlyExpense = 4820;
  const currentBalance = 12450;
  const currentSavings = 2500;
  const budgetLimit = 6000;
  
  const budgetUsedPercent = Math.round((monthlyExpense / budgetLimit) * 100);
  let budgetStatus: "safe" | "warning" | "critical" = "safe";
  
  if (budgetUsedPercent >= 100) {
    budgetStatus = "critical";
  } else if (budgetUsedPercent >= 80) {
    budgetStatus = "warning";
  }

  const summary = {
    currentBalance,
    monthlyIncome,
    monthlyExpense,
    remainingBudget: budgetLimit - monthlyExpense,
    currentSavings,
    budgetUsedPercent,
    budgetStatus,
  };

  const today = {
    moneySpentToday: 142,
    moneyEarnedToday: 0,
    billsDueTodayCount: 1,
    budgetRemainingToday: 120,
    aiSuggestionsCount: 3,
  };

  const transactions = [
    {
      id: "tx-1",
      description: "AWS Cloud Services",
      amount: 89.99,
      type: "expense" as const,
      category: "Infrastructure",
      date: "Today, 10:14 AM",
    },
    {
      id: "tx-2",
      description: "Stripe Client Payout",
      amount: 1250.00,
      type: "income" as const,
      category: "Consulting",
      date: "Today, 08:30 AM",
    },
    {
      id: "tx-3",
      description: "Vercel Deployment Host",
      amount: 20.00,
      type: "expense" as const,
      category: "Software",
      date: "Yesterday, 04:15 PM",
    },
    {
      id: "tx-4",
      description: "Github Team License",
      amount: 48.00,
      type: "expense" as const,
      category: "Software",
      date: "July 10, 2026",
    },
    {
      id: "tx-5",
      description: "Figma Professional Plan",
      amount: 15.00,
      type: "expense" as const,
      category: "Design",
      date: "July 08, 2026",
    },
  ];

  const spendingTrend = [
    { name: "Mon", income: 200, expense: 120 },
    { name: "Tue", income: 1500, expense: 450 },
    { name: "Wed", income: 400, expense: 380 },
    { name: "Thu", income: 300, expense: 90 },
    { name: "Fri", income: 1250, expense: 89 },
    { name: "Sat", income: 0, expense: 140 },
    { name: "Sun", income: 0, expense: 60 },
  ];

  const categoryBreakdown = [
    { name: "Infrastructure", value: 1250, color: "var(--brand-primary)" },
    { name: "Software", value: 890, color: "#10b981" },
    { name: "Marketing", value: 620, color: "#f59e0b" },
    { name: "Design", value: 450, color: "#8b5cf6" },
    { name: "Travel & Office", value: 310, color: "#ec4899" },
  ];

  const upcomingPayments = [
    {
      id: "up-1",
      name: "Google Cloud Sandbox",
      amount: 250.00,
      dueDate: "Tomorrow, July 13",
      category: "Infrastructure",
      status: "pending" as const,
    },
    {
      id: "up-2",
      name: "OpenAI API Usage Billing",
      amount: 120.50,
      dueDate: "July 15, 2026",
      category: "AI Sandbox",
      status: "pending" as const,
    },
    {
      id: "up-3",
      name: "Slack Pro Workspace Team",
      amount: 72.00,
      dueDate: "July 19, 2026",
      category: "Software",
      status: "pending" as const,
    },
  ];

  const quote = getDailyQuote();
  const health = calculateFinancialHealth({
    monthlyIncome,
    monthlyExpense,
    currentBalance,
    remainingBudget: budgetLimit - monthlyExpense,
    currentSavings,
  });

  return {
    summary,
    today,
    transactions,
    spendingTrend,
    categoryBreakdown,
    upcomingPayments,
    quote,
    health,
  };
}
