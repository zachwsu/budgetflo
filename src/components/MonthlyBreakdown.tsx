import React, { useState, useEffect } from 'react';

interface MonthlyBreakdownProps {
  monthlyIncome: number;
  monthlyExpenses: number;
  expenses: { id: number; category: string; amount: number }[];
  oneTimeExpenses: { id: number; category: string; amount: number; month: string }[];
  savings: { id: number; category: string; amount: number }[];
}

interface MonthData {
  income: number;
  expenses: { [category: string]: number };
  savings: { [category: string]: number };
}

const MonthlyBreakdown: React.FC<MonthlyBreakdownProps> = ({ monthlyIncome, monthlyExpenses, expenses, oneTimeExpenses, savings }) => {
  const [breakdownData, setBreakdownData] = useState<{ [key: string]: MonthData }>({});
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth();

  useEffect(() => {
    const initialData: { [key: string]: MonthData } = {};
    const expenseCategories = expenses.reduce((acc, expense) => {
      acc[expense.category] = 0;
      return acc;
    }, {} as { [category: string]: number });

    const savingsCategories = savings.reduce((acc, saving) => {
      acc[saving.category] = 0;
      return acc;
    }, {} as { [category: string]: number });

    for (let i = 0; i < 12; i++) {
      const monthIndex = (currentMonth + i) % 12;
      initialData[months[monthIndex]] = { 
        income: monthlyIncome, 
        expenses: { ...expenseCategories },
        savings: { ...savingsCategories }
      };

      // Add monthly expenses to each month
      expenses.forEach(expense => {
        initialData[months[monthIndex]].expenses[expense.category] = expense.amount;
      });

      // Add monthly savings to each month
      savings.forEach(saving => {
        initialData[months[monthIndex]].savings[saving.category] = saving.amount;
      });
    }

    // Add one-time expenses to their respective months, repeating annually
    oneTimeExpenses.forEach(expense => {
      const expenseMonth = months.indexOf(expense.month);
      for (let i = 0; i < 12; i++) {
        const monthIndex = (currentMonth + i) % 12;
        if (monthIndex === expenseMonth) {
          if (!initialData[months[monthIndex]].expenses[expense.category]) {
            initialData[months[monthIndex]].expenses[expense.category] = 0;
          }
          initialData[months[monthIndex]].expenses[expense.category] += expense.amount;
        }
      }
    });

    setBreakdownData(initialData);
  }, [monthlyIncome, monthlyExpenses, expenses, oneTimeExpenses, savings]);

  const expenseCategories = [...new Set([
    ...expenses.map(e => e.category),
    ...oneTimeExpenses.map(e => e.category)
  ])];

  const savingsCategories = [...new Set(savings.map(s => s.category))];

  const calculateTotalExpenses = (monthData: MonthData) => {
    return Object.values(monthData.expenses).reduce((sum, amount) => sum + amount, 0);
  };

  const calculateTotalSavings = (monthData: MonthData) => {
    return Object.values(monthData.savings).reduce((sum, amount) => sum + amount, 0);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
  };

  return (
    <div className="space-y-8">
      <div className="overflow-x-auto">
        <table className="monday-table w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left font-semibold text-gray-600">Category</th>
              {Object.keys(breakdownData).map(month => (
                <th key={month} className="py-3 px-4 text-center font-semibold text-gray-600">{month}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="bg-green-50">
              <td colSpan={13} className="py-2 px-4 font-semibold text-green-700">Income</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-medium text-gray-900">Monthly Income</td>
              {Object.entries(breakdownData).map(([month, data]) => (
                <td key={month} className="py-2 px-4 text-right font-medium text-green-600">
                  {formatCurrency(data.income)}
                </td>
              ))}
            </tr>
            <tr className="bg-red-50">
              <td colSpan={13} className="py-2 px-4 font-semibold text-red-700">Expenses</td>
            </tr>
            {expenseCategories.map(category => (
              <tr key={category}>
                <td className="py-3 px-4 font-medium text-gray-900">{category}</td>
                {Object.entries(breakdownData).map(([month, data]) => (
                  <td key={month} className="py-2 px-4 text-right font-medium text-red-600">
                    {formatCurrency(data.expenses[category] || 0)}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="bg-blue-50">
              <td colSpan={13} className="py-2 px-4 font-semibold text-blue-700">Savings</td>
            </tr>
            {savingsCategories.map(category => (
              <tr key={category}>
                <td className="py-3 px-4 font-medium text-gray-900">{category}</td>
                {Object.entries(breakdownData).map(([month, data]) => (
                  <td key={month} className="py-2 px-4 text-right font-medium text-blue-600">
                    {formatCurrency(data.savings[category] || 0)}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="bg-gray-100">
              <td className="py-3 px-4 font-semibold text-gray-900">Total Expenses</td>
              {Object.entries(breakdownData).map(([month, data]) => (
                <td key={month} className="py-3 px-4 font-semibold text-right text-red-600">
                  {formatCurrency(calculateTotalExpenses(data))}
                </td>
              ))}
            </tr>
            <tr className="bg-gray-100">
              <td className="py-3 px-4 font-semibold text-gray-900">Total Savings</td>
              {Object.entries(breakdownData).map(([month, data]) => (
                <td key={month} className="py-3 px-4 font-semibold text-right text-blue-600">
                  {formatCurrency(calculateTotalSavings(data))}
                </td>
              ))}
            </tr>
            <tr className="bg-gray-50">
              <td className="py-3 px-4 font-semibold text-gray-900">Net</td>
              {Object.entries(breakdownData).map(([month, data]) => {
                const net = data.income - calculateTotalExpenses(data) - calculateTotalSavings(data);
                return (
                  <td key={month} className={`py-3 px-4 font-semibold text-right ${net >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(net)}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonthlyBreakdown;