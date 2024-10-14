import React from 'react';
import BudgetSummary from './BudgetSummary';
import AnnualBudgetSummary from './AnnualBudgetSummary';
import ExpenseChart from './ExpenseChart';

interface DashboardProps {
  monthlyBudget: number;
  annualBudget: number;
  totalMonthlyExpenses: number;
  totalAnnualExpenses: number;
  totalAnnualSavings: number;
  remainingMonthlyBudget: number;
  remainingAnnualBudget: number;
  expenses: Array<{ id: number; category: string; amount: number }>;
  oneTimeExpenses: Array<{ id: number; category: string; amount: number; month: string }>;
}

const Dashboard: React.FC<DashboardProps> = ({
  monthlyBudget,
  annualBudget,
  totalMonthlyExpenses,
  totalAnnualExpenses,
  totalAnnualSavings,
  remainingMonthlyBudget,
  remainingAnnualBudget,
  expenses,
  oneTimeExpenses
}) => {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BudgetSummary
          monthlyBudget={monthlyBudget}
          totalExpenses={totalMonthlyExpenses}
          remainingBudget={remainingMonthlyBudget}
        />
        <AnnualBudgetSummary
          annualBudget={annualBudget}
          totalExpenses={totalAnnualExpenses}
          totalSavings={totalAnnualSavings}
          remainingBudget={remainingAnnualBudget}
        />
      </div>
      <div className="mt-8">
        <ExpenseChart
          monthlyBudget={monthlyBudget}
          expenses={expenses}
          oneTimeExpenses={oneTimeExpenses}
        />
      </div>
    </div>
  );
};

export default Dashboard;