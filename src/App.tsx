import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Expenses from './components/Expenses';
import SalaryInput from './components/SalaryInput';
import MonthlyBreakdown from './components/MonthlyBreakdown';

interface Expense {
  id: number;
  category: string;
  amount: number;
}

interface Salary {
  id: number;
  amount: number;
  taxRate: number;
}

interface OneTimeExpense {
  id: number;
  category: string;
  amount: number;
  month: string;
}

interface Saving {
  id: number;
  category: string;
  amount: number;
}

function App() {
  const [salaries, setSalaries] = useState<Salary[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [oneTimeExpenses, setOneTimeExpenses] = useState<OneTimeExpense[]>([]);
  const [savings, setSavings] = useState<Saving[]>([]);
  const [monthlyBudget, setMonthlyBudget] = useState<number>(0);
  const [annualBudget, setAnnualBudget] = useState<number>(0);

  useEffect(() => {
    const totalMonthlyIncome = salaries.reduce((sum, salary) => {
      const monthlyIncome = (salary.amount * (1 - salary.taxRate / 100)) / 12;
      return sum + monthlyIncome;
    }, 0);
    setMonthlyBudget(totalMonthlyIncome);
    setAnnualBudget(totalMonthlyIncome * 12);
  }, [salaries]);

  const addSalary = (amount: number, taxRate: number) => {
    setSalaries([...salaries, { id: Date.now(), amount, taxRate }]);
  };

  const removeSalary = (id: number) => {
    setSalaries(salaries.filter(salary => salary.id !== id));
  };

  const addExpense = (category: string, amount: number) => {
    setExpenses([...expenses, { id: Date.now(), category, amount }]);
  };

  const removeExpense = (id: number) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const addOneTimeExpense = (category: string, amount: number, month: string) => {
    setOneTimeExpenses([...oneTimeExpenses, { id: Date.now(), category, amount, month }]);
  };

  const removeOneTimeExpense = (id: number) => {
    setOneTimeExpenses(oneTimeExpenses.filter(expense => expense.id !== id));
  };

  const addSaving = (category: string, amount: number) => {
    setSavings([...savings, { id: Date.now(), category, amount }]);
  };

  const removeSaving = (id: number) => {
    setSavings(savings.filter(saving => saving.id !== id));
  };

  const totalMonthlyExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalMonthlySavings = savings.reduce((sum, saving) => sum + saving.amount, 0);
  const remainingMonthlyBudget = monthlyBudget - totalMonthlyExpenses - totalMonthlySavings;

  const totalAnnualExpenses = (totalMonthlyExpenses * 12) + oneTimeExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalAnnualSavings = totalMonthlySavings * 12;
  const remainingAnnualBudget = annualBudget - totalAnnualExpenses - totalAnnualSavings;

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={
            <Dashboard
              monthlyBudget={monthlyBudget}
              annualBudget={annualBudget}
              totalMonthlyExpenses={totalMonthlyExpenses}
              totalAnnualExpenses={totalAnnualExpenses}
              totalAnnualSavings={totalAnnualSavings}
              remainingMonthlyBudget={remainingMonthlyBudget}
              remainingAnnualBudget={remainingAnnualBudget}
              expenses={expenses}
              oneTimeExpenses={oneTimeExpenses}
            />
          } />
          <Route path="/income" element={
            <SalaryInput
              salaries={salaries}
              onAddSalary={addSalary}
              onRemoveSalary={removeSalary}
            />
          } />
          <Route path="/expenses" element={
            <Expenses
              expenses={expenses}
              oneTimeExpenses={oneTimeExpenses}
              savings={savings}
              onAddExpense={addExpense}
              onRemoveExpense={removeExpense}
              onAddOneTimeExpense={addOneTimeExpense}
              onRemoveOneTimeExpense={removeOneTimeExpense}
              onAddSaving={addSaving}
              onRemoveSaving={removeSaving}
            />
          } />
          <Route path="/budget" element={
            <div className="monday-card p-6">
              <h2 className="text-xl font-semibold mb-4 text-indigo-700">Monthly Breakdown</h2>
              <MonthlyBreakdown
                monthlyIncome={monthlyBudget}
                monthlyExpenses={totalMonthlyExpenses}
                expenses={expenses}
                oneTimeExpenses={oneTimeExpenses}
                savings={savings}
              />
            </div>
          } />
          <Route path="/settings" element={<div>Settings Page (Coming Soon)</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;