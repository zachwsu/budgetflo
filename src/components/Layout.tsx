import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, DollarSign, PieChart, Calendar, Settings } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-indigo-600' : '';
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar */}
      <aside className="w-64 bg-indigo-700 text-white">
        <div className="p-4">
          <h1 className="text-2xl font-bold flex items-center">
            <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 3V21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 17L9 11L13 15L21 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17 7H21V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 13H3V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            BudgetFlo
          </h1>
        </div>
        <nav className="mt-8">
          <Link to="/" className={`block py-2 px-4 text-sm hover:bg-indigo-600 flex items-center ${isActive('/')}`}>
            <Home className="mr-3" size={18} />
            Dashboard
          </Link>
          <Link to="/income" className={`block py-2 px-4 text-sm hover:bg-indigo-600 flex items-center ${isActive('/income')}`}>
            <DollarSign className="mr-3" size={18} />
            Income
          </Link>
          <Link to="/expenses" className={`block py-2 px-4 text-sm hover:bg-indigo-600 flex items-center ${isActive('/expenses')}`}>
            <PieChart className="mr-3" size={18} />
            Expenses
          </Link>
          <Link to="/budget" className={`block py-2 px-4 text-sm hover:bg-indigo-600 flex items-center ${isActive('/budget')}`}>
            <Calendar className="mr-3" size={18} />
            Budget
          </Link>
          <Link to="/settings" className={`block py-2 px-4 text-sm hover:bg-indigo-600 flex items-center ${isActive('/settings')}`}>
            <Settings className="mr-3" size={18} />
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;