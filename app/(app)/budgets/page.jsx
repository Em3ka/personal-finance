import { Suspense } from "react";
import Budgets from "@/features/budgets/components/Budgets";
import BudgetsSkeleton from "@/features/budgets/components/BudgetsSkeleton";

export const metadata = {
  title: "Budgets",
  description: "Create budgets, track spending, and stay on top of your financial goals.",
};

export default function Page() {
  return (
    <Suspense fallback={<BudgetsSkeleton />}>
      <Budgets />
    </Suspense>
  );
}
