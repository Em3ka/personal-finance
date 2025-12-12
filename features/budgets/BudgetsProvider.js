"use client";

import { useState, createContext, use } from "react";

const BudgetsContext = createContext();

function BudgetsProvider({ budgets, children }) {
  const [dialog, setDialog] = useState({ type: null, budget: null });

  const closeDialog = () => setDialog({ type: null, budget: null });
  const openDialog = (type, budget = null) => setDialog({ type, budget });

  return (
    <BudgetsContext.Provider value={{ dialog, openDialog, closeDialog, budgets }}>
      {children}
    </BudgetsContext.Provider>
  );
}

function useBudgets() {
  const context = use(BudgetsContext);
  if (context === undefined)
    throw new Error("useBudgets was used outside BudgetsContext.");
  return context;
}

export { BudgetsProvider, useBudgets };
