import React, { useState } from 'react';
import { Plus, Trash2, DollarSign, Calendar } from 'lucide-react';

interface OneTimeExpense {
  id: number;
  category: string;
  amount: number;
  month: string;
}

interface OneTimeExpensesProps {
  expenses: OneTimeExpense[];
  onAddExpense: (category: string, amount: number, month: string) => void;
  onRemoveExpense: (id: number) => void;
}

const categories = [
  'Travel',
  'School',
  'Gifts',
  'Donations',
  'Camp',
  'Insurance',
  'Taxes'
];

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const OneTimeExpenses: React.FC<OneTimeExpensesProps> = ({ expenses, onAddExpense, onRemoveExpense }) => {
  const [newCategory, setNewCategory] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newMonth, setNewMonth] = useState('');

  const handleAddExpense = () => {
    if (newCategory && newAmount && newMonth) {
      onAddExpense(newCategory, Number(newAmount), newMonth);
      setNewCategory('');
      setNewAmount('');
      setNewMonth('');
    }
  };

  return (
    <div className="monday-card p-6 mt-8">
      <h2 className="text-xl font-semibold mb-4 text-indigo-700">One-Time Expenses</h2>
      <div className="mb-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="monday-input w-full"
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="number"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              className="monday-input pl-10 w-full"
              placeholder="Amount"
            />
          </div>
          <select
            value={newMonth}
            onChange={(e) => setNewMonth(e.target.value)}
            className="monday-input w-full"
          >
            <option value="">Select month</option>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleAddExpense}
            className="monday-button"
          >
            <Plus size={20} className="mr-2" />
            Add Expense
          </button>
        </div>
      </div>
      <ul className="space-y-2">
        {expenses.map((expense) => (
          <li key={expense.id} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
            <span className="text-gray-700">{expense.category}</span>
            <div className="flex items-center">
              <span className="mr-4 font-medium">${expense.amount.toFixed(2)}</span>
              <span className="mr-4 text-sm text-gray-500">{expense.month}</span>
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

export default OneTimeExpenses;