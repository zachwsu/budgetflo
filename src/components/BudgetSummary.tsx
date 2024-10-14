import React from 'react';
import { DollarSign, PieChart } from 'lucide-react';

interface BudgetSummaryProps {
  monthlyBudget: number;
  totalExpenses: number;
  remainingBudget: number;
}

const BudgetSummary: React.FC<BudgetSummaryProps> = ({
  monthlyBudget,
  totalExpenses,
  remainingBudget,
}) => {
  const expensePercentage = (totalExpenses / monthlyBudget) * 100;
  const remainingPercentage = 100 - expensePercentage;

  return (
    <div className="monday-card p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center text-indigo-700">
        <PieChart className="mr-2" />
        Budget Summary
      </h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Monthly Budget:</span>
          <span className="font-semibold text-green-600">
            ${monthlyBudget.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total Expenses:</span>
          <span className="font-semibold text-red-600">
            ${totalExpenses.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center pt-2 border-t">
          <span className="text-gray-600">Remaining Budget:</span>
          <span className={`font-semibold ${remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${remainingBudget.toFixed(2)}
          </span>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2 text-indigo-700">Budget Breakdown</h3>
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                Available
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-green-600">
                {remainingPercentage.toFixed(0)}%
              </span>
            </div>
          </div>
          <div className="monday-progress-bar">
            <div
              style={{ width: `${remainingPercentage}%` }}
              className="bg-green-500"
            ></div>
            <div
              style={{ width: `${expensePercentage}%` }}
              className="bg-red-500"
            ></div>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-green-600 font-semibold">Available: ${remainingBudget.toFixed(2)}</span>
            <span className="text-red-600 font-semibold">Spent: ${totalExpenses.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetSummary;