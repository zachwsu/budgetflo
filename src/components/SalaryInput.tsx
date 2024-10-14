import React, { useState } from 'react';
import { DollarSign, Percent, Plus, Trash2 } from 'lucide-react';

interface Salary {
  id: number;
  amount: number;
  taxRate: number;
}

interface SalaryInputProps {
  salaries: Salary[];
  onAddSalary: (amount: number, taxRate: number) => void;
  onRemoveSalary: (id: number) => void;
}

const SalaryInput: React.FC<SalaryInputProps> = ({
  salaries,
  onAddSalary,
  onRemoveSalary,
}) => {
  const [newAmount, setNewAmount] = useState<string>('');
  const [newTaxRate, setNewTaxRate] = useState<string>('');

  const handleAddSalary = () => {
    const amount = parseFloat(newAmount);
    const taxRate = parseFloat(newTaxRate);
    if (!isNaN(amount) && !isNaN(taxRate)) {
      onAddSalary(amount, taxRate);
      setNewAmount('');
      setNewTaxRate('');
    }
  };

  return (
    <div className="monday-card p-6">
      <h2 className="text-xl font-semibold mb-4 text-indigo-700">Income Information</h2>
      <div className="space-y-4">
        <div className="flex space-x-2">
          <div className="flex-grow relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="number"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              className="monday-input pl-10"
              placeholder="Annual Salary"
            />
          </div>
          <div className="flex-grow relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Percent className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="number"
              value={newTaxRate}
              onChange={(e) => setNewTaxRate(e.target.value)}
              className="monday-input pl-10"
              placeholder="Tax Rate"
            />
          </div>
          <button
            onClick={handleAddSalary}
            className="monday-button"
          >
            <Plus size={20} />
          </button>
        </div>
        <ul className="space-y-2">
          {salaries.map((salary) => (
            <li key={salary.id} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
              <span className="text-gray-700">
                ${salary.amount.toFixed(2)} (Tax: {salary.taxRate}%)
              </span>
              <button
                onClick={() => onRemoveSalary(salary.id)}
                className="text-red-500 hover:text-red-700 focus:outline-none"
              >
                <Trash2 size={18} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SalaryInput;