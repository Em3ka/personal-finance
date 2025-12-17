import { use } from "react";
import Stats from "./Stats";
import { isExpense } from "@/utils/helpers";

// NOTE:
// For this proof of concept, a random "current" balance was generated when creating a new user.
// Income and expenses will be derived from the transactions data, but current balance is
// independent and acts as a starting point — simulating an actual user account balance.

export default function StatsSummary({ data }) {
  const current = use(data.currentBalance);
  const { data: statsData } = use(data.transactions);

  const income = statsData
    .filter((t) => !isExpense(t.amount))
    .reduce((acc, cur) => acc + cur.amount, 0);

  const expenses = statsData
    .filter((t) => isExpense(t.amount))
    .reduce((acc, cur) => acc + Math.abs(cur.amount), 0);

  const statSummary = [
    { label: "Current Balance", value: current, color: "dark" },
    { label: "Income", value: income },
    { label: "Expenses", value: expenses },
  ];

  return statSummary.map((s) => (
    <Stats key={s.label} label={s.label} value={s.value} color={s.color} />
  ));
}
