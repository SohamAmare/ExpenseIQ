export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
}

export interface SpendingTrendPoint {
  name: string;
  income: number;
  expense: number;
}

export interface CategoryData {
  name: string;
  value: number;
  color?: string;
}

export interface UpcomingPayment {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  category: string;
  status: "pending" | "paid";
}

export interface DailyQuote {
  text: string;
  author: string;
  category: string;
}

export interface FinancialHealth {
  score: number;
  status: "poor" | "fair" | "good" | "excellent";
  description: string;
}

export interface DashboardSummary {
  currentBalance: number;
  monthlyIncome: number;
  monthlyExpense: number;
  remainingBudget: number;
  currentSavings: number;
  budgetUsedPercent: number;
  budgetStatus: "safe" | "warning" | "critical";
}

export interface TodayOverview {
  moneySpentToday: number;
  moneyEarnedToday: number;
  billsDueTodayCount: number;
  budgetRemainingToday: number;
  aiSuggestionsCount: number;
}

export interface DashboardData {
  summary: DashboardSummary;
  today: TodayOverview;
  transactions: Transaction[];
  spendingTrend: SpendingTrendPoint[];
  categoryBreakdown: CategoryData[];
  upcomingPayments: UpcomingPayment[];
  quote: DailyQuote;
  health: FinancialHealth;
}
