import { FinancialHealth } from "@/types/dashboard";
import { HEALTH_THRESHOLDS } from "@/constants/dashboard";

interface HealthFactors {
  monthlyIncome: number;
  monthlyExpense: number;
  currentBalance: number;
  remainingBudget: number;
  currentSavings: number;
}

/**
 * Calculates a consolidated financial health score (0-100) based on savings rate, budget usage, and liquidity.
 */
export function calculateFinancialHealth({
  monthlyIncome,
  monthlyExpense,
  currentBalance,
  currentSavings,
}: HealthFactors): FinancialHealth {
  // If income is zero, fallback gracefully
  const income = monthlyIncome || 1;
  const expense = monthlyExpense || 1;

  // Factor 1: Savings Rate (35% of score)
  // Target savings rate is 20% or more of income
  const savingsRate = (currentSavings / income) * 100;
  const savingsScore = Math.min((savingsRate / 20) * 35, 35);

  // Factor 2: Budget Control / Expense ratio (35% of score)
  // Target: expenses should be less than 75% of income
  const expenseRatio = (expense / income) * 100;
  let expenseScore = 35;
  if (expenseRatio > 75) {
    // Deduct points as expense ratio approaches or exceeds 100%
    const penalty = Math.min(((expenseRatio - 75) / 25) * 35, 35);
    expenseScore = Math.max(0, 35 - penalty);
  }

  // Factor 3: Liquidity Buffer (30% of score)
  // Target: balance should cover at least 3 months of expenses
  const monthsBuffer = currentBalance / expense;
  const liquidityScore = Math.min((monthsBuffer / 3) * 30, 30);

  // Consolidated score (rounded)
  const score = Math.round(savingsScore + expenseScore + liquidityScore);

  let status: FinancialHealth["status"] = "poor";
  let description = "Critical action required. Your expenses are high relative to savings and liquidity.";

  if (score >= HEALTH_THRESHOLDS.EXCELLENT) {
    status = "excellent";
    description = "Superb balance stability. Your cash reserves are high and expenses are well within budget limits.";
  } else if (score >= HEALTH_THRESHOLDS.GOOD) {
    status = "good";
    description = "Healthy budget compliance. Continue building savings to reach emergency fund goals.";
  } else if (score >= HEALTH_THRESHOLDS.FAIR) {
    status = "fair";
    description = "Moderate control. Try reducing non-essential expenditures to improve your liquidity buffer.";
  }

  return {
    score,
    status,
    description,
  };
}
