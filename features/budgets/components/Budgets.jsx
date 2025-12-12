import BudgetsLayout from "./BudgetsLayout";
import { getBudgets } from "@/lib/data-service";
import { BudgetsProvider } from "../BudgetsProvider";

export default async function Budgets() {
  const budgets = await getBudgets();

  return (
    <BudgetsProvider budgets={budgets}>
      <BudgetsLayout />
    </BudgetsProvider>
  );
}
