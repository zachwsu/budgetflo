import React, { useState } from 'react';
import { Plus, Trash2, DollarSign } from 'lucide-react';

interface Expense {
  id: number;
  category: string;
  amount: number;
}

interface ExpenseListProps {
  expenses: Expense[];
  onAddExpense: (category: string, amount: number) => void;
  onRemoveExpense: (id: number) => void;
}

const standardCategories = [
  'Housing',
  'Car',
  'Utilities',
  'Groceries',
  'Healthcare',
  'Insurance',
  'Entertainment',
  'Savings',
  'Debt Repayment',
  'Other'
];

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onAddExpense, onRemoveExpense }) => {
  const [newCategory, setNewCategory] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleAddExpense = () => {
    if (newCategory && newAmount) {
      onAddExpense(newCategory, Number(newAmount));
      setNewCategory('');
      setNewAmount('');
      setShowCustomInput(false);
    }
  };

  return (
    <div className="monday-card p-6">
      <h2 className="text-xl font-semibold mb-4 text-indigo-700">Monthly Expenses</h2>
      <div className="mb-4 space-y-2">
        <div className="flex space-x-2">
          {showCustomInput ? (
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="monday-input flex-grow"
              placeholder="Custom category"
            />
          ) : (
            <select
              value={newCategory}
              onChange={(e) => {
                if (e.target.value === 'custom') {
                  setShowCustomInput(true);
                  setNewCategory('');
                } else {
                  setNewCategory(e.target.value);
                }
              }}
              className="monday-input flex-grow"
            >
              <option value="">Select category</option>
              {standardCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
              <option value="custom">Custom category</option>
            </select>
          )}
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="number"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              className="monday-input pl-10"
              placeholder="Amount"
            />
          </div>
          <button
            onClick={handleAddExpense}
            className="monday-button"
          >
            <Plus size={20} />
          </button>
        </div>
        {showCustomInput && (
          <button
            onClick={() => setShowCustomInput(false)}
            className="text-sm text-indigo-600 hover:text-indigo-800"
          >
            Back to standard categories
          </button>
        )}
      </div>
      <ul className="space-y-2">
        {expenses.map((expense) => (
          <li key={expense.id} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
            <span className="text-gray-700">{expense.category}</span>
            <div className="flex items-center">
              <span className="mr-4 font-medium">${expense.amount.toFixed(2)}</span>
              <button
                onClick={() => onRemoveExpense(expense.id)}
                className="text-red-500 hover:text-red-700 focus:outline-none"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;