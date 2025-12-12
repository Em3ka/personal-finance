import { use } from "react";
import Stats from "./Stats";
import { isExpense } from "@/utils/helpers";

export default function StatsSummary({ data }) {
  const { data: statsData } = use(data);

  const income = statsData
    .filter((t) => !isExpense(t.amount))
    .reduce((acc, cur) => acc + cur.amount, 0);

  const expenses = statsData
    .filter((t) => isExpense(t.amount))
    .reduce((acc, cur) => acc + Math.abs(cur.amount), 0);

  const current = income - expenses;

  const statSummary = [
    { label: "Current Balance", value: current, color: "dark" },
    { label: "Income", value: income },
    { label: "Expenses", value: expenses },
  ];

  return statSummary.map((s) => (
    <Stats key={s.label} label={s.label} value={s.value} color={s.color} />
  ));
}
