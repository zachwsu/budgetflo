import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

interface Expense {
  id: number;
  category: string;
  amount: number;
}

interface OneTimeExpense {
  id: number;
  category: string;
  amount: number;
  month: string;
}

interface ExpenseChartProps {
  monthlyBudget: number;
  expenses: Expense[];
  oneTimeExpenses: OneTimeExpense[];
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ monthlyBudget, expenses, oneTimeExpenses }) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth();

  const chartData = months.map((month, index) => {
    const monthIndex = (currentMonth + index) % 12;
    const data: { [key: string]: number } = { month };

    // Add monthly expenses
    expenses.forEach(expense => {
      data[expense.category] = expense.amount;
    });

    // Add one-time expenses for the specific month
    oneTimeExpenses.forEach(expense => {
      if (expense.month === month) {
        data[expense.category] = (data[expense.category] || 0) + expense.amount;
      }
    });

    // Calculate total expenses for the month
    data['Total Expenses'] = Object.values(data).reduce((sum, value) => typeof value === 'number' ? sum + value : sum, 0) - data['month'];

    return data;
  });

  const allCategories = [...new Set([...expenses.map(e => e.category), ...oneTimeExpenses.map(e => e.category)])];

  const colors = [
    '#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#a4de6c',
    '#d0ed57', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c',
    '#d0ed57', '#ffc658', '#ff7300', '#8884d8'
  ];

  return (
    <div className="monday-card p-6">
      <h2 className="text-xl font-semibold mb-4 text-indigo-700">Expenses vs Budget Target</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          {allCategories.map((category, index) => (
            <Bar key={category} dataKey={category} stackId="a" fill={colors[index % colors.length]} />
          ))}
          <ReferenceLine y={monthlyBudget} label="Monthly Budget" stroke="#ff0000" strokeDasharray="3 3" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;