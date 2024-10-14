import React from 'react';
import ExpenseList from './ExpenseList';
import OneTimeExpenses from './OneTimeExpenses';
import SavingsInput from './SavingsInput';

interface ExpensesProps {
  expenses: Array<{ id: number; category: string; amount: number }>;
  oneTimeExpenses: Array<{ id: number; category: string; amount: number; month: string }>;
  savings: Array<{ id: number; category: string; amount: number }>;
  onAddExpense: (category: string, amount: number) => void;
  onRemoveExpense: (id: number) => void;
  onAddOneTimeExpense: (category: string, amount: number, month: string) => void;
  onRemoveOneTimeExpense: (id: number) => void;
  onAddSaving: (category: string, amount: number) => void;
  onRemoveSaving: (id: number) => void;
}

const Expenses: React.FC<ExpensesProps> = ({
  expenses,
  oneTimeExpenses,
  savings,
  onAddExpense,
  onRemoveExpense,
  onAddOneTimeExpense,
  onRemoveOneTimeExpense,
  onAddSaving,
  onRemoveSaving
}) => {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Expenses</h2>
      <div className="space-y-8">
        <div className="monday-card p-6">
          <h3 className="text-xl font-semibold mb-4 text-indigo-700">Monthly Expenses</h3>
          <ExpenseList
            expenses={expenses}
            onAddExpense={onAddExpense}
            onRemoveExpense={onRemoveExpense}
          />
        </div>
        <div className="monday-card p-6">
          <h3 className="text-xl font-semibold mb-4 text-indigo-700">One-Time Expenses</h3>
          <OneTimeExpenses
            expenses={oneTimeExpenses}
            onAddExpense={onAddOneTimeExpense}
            onRemoveExpense={onRemoveOneTimeExpense}
          />
        </div>
        <div className="monday-card p-6">
          <h3 className="text-xl font-semibold mb-4 text-indigo-700">Savings</h3>
          <SavingsInput
            savings={savings}
            onAddSaving={onAddSaving}
            onRemoveSaving={onRemoveSaving}
          />
        </div>
      </div>
    </div>
  );
};

export default Expenses;