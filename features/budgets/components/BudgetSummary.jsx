"use client";

import Chart from "@/components/layout/Chart";
import { useBudgets } from "../BudgetsProvider";
import { cn, formatCurrency } from "@/utils/helpers";

export default function BudgetSummary() {
  const { budgets } = useBudgets();

  return (
    <div className="grid-cards-tight grid gap-8 self-start rounded-xl bg-white p-8">
      <Chart data={budgets} />

      <div className="space-y-6 self-center">
        <h2 className="text-xl font-bold">Spending Summary</h2>
        <ul>
          {budgets.map((b, i) => (
            <li
              key={b.id}
              className={cn(
                "border-grey-100 flex justify-between border-t",
                i === 0 ? "mt-0 border-t-0 pt-0" : "mt-3 pt-3",
              )}>
              <div className="flex items-center gap-4">
                <span
                  style={{ backgroundColor: b.theme }}
                  className="inline-block h-full w-1 rounded-lg"></span>
                <span className="text-grey-500 text-sm">{b.category}</span>
              </div>

              <p>
                <span className="font-bold">{formatCurrency(b.spent)} </span>
                <span className="text-grey-500 text-xs">
                  of {formatCurrency(b.maximum)}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
