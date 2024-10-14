import React, { useState } from 'react';
import { Plus, Trash2, DollarSign } from 'lucide-react';

interface Saving {
  id: number;
  category: string;
  amount: number;
}

interface SavingsInputProps {
  savings: Saving[];
  onAddSaving: (category: string, amount: number) => void;
  onRemoveSaving: (id: number) => void;
}

const standardCategories = [
  'Cash Saving',
  'Investment',
  'Crypto',
];

const SavingsInput: React.FC<SavingsInputProps> = ({ savings, onAddSaving, onRemoveSaving }) => {
  const [newCategory, setNewCategory] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleAddSaving = () => {
    if (newCategory && newAmount) {
      onAddSaving(newCategory, Number(newAmount));
      setNewCategory('');
      setNewAmount('');
      setShowCustomInput(false);
    }
  };

  return (
    <div className="monday-card p-6 mt-8">
      <h2 className="text-xl font-semibold mb-4 text-indigo-700">Monthly Savings</h2>
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
            onClick={handleAddSaving}
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
        {savings.map((saving) => (
          <li key={saving.id} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
            <span className="text-gray-700">{saving.category}</span>
            <div className="flex items-center">
              <span className="mr-4 font-medium">${saving.amount.toFixed(2)}</span>
              <button
                onClick={() => onRemoveSaving(saving.id)}
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

export default SavingsInput;