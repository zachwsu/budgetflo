import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Add structured data for rich snippets
const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "BudgetFlo",
  "applicationCategory": "FinanceApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "operatingSystem": "Web",
  "description": "BudgetFlo is a personal budgeting application that helps users track expenses, set savings goals, and manage their finances effectively."
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    <App />
  </StrictMode>
);