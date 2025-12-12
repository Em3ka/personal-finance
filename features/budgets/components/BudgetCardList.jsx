"use client";

import BudgetCard from "./BudgetCard";
import { useBudgets } from "../BudgetsProvider";

export default function BudgetCardList() {
  const { budgets, openDialog } = useBudgets();

  return (
    <div className="space-y-5">
      {budgets.map((b) => (
        <BudgetCard
          key={b.id}
          theme={b.theme}
          spentAmount={b.spent}
          category={b.category}
          maxAmount={b.maximum}
          usedColors={b.usedColors}
          transactions={b.transactions}
          onEdit={() => openDialog("edit", b)}
          onDelete={() => openDialog("delete", b)}
        />
      ))}
    </div>
  );
}
