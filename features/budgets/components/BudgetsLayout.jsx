"use client";

import BudgetSummary from "./BudgetSummary";
import BudgetsDialogs from "./BudgetsDialogs";
import Empty from "@/components/layout/Empty";
import BudgetCardList from "./BudgetCardList";
import { useBudgets } from "../BudgetsProvider";
import { PlusIcon } from "@heroicons/react/24/solid";
import ActionButton from "@/components/ui/ActionButton";
import SectionHeading from "@/components/layout/SectionHeading";

export default function BudgetsLayout() {
  const { openDialog, budgets } = useBudgets();

  return (
    <>
      <SectionHeading title="Budgets">
        <ActionButton icon={PlusIcon} onClick={() => openDialog("add")}>
          Add New Budget
        </ActionButton>
      </SectionHeading>

      {!budgets.length ? (
        <Empty
          title="No Budgets Yet"
          message={`You haven't created any budgets yet.
          Get started by creating your first budget.`}
        />
      ) : (
        <>
          <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
            <BudgetSummary />
            <BudgetCardList />
          </div>

          <BudgetsDialogs />
        </>
      )}
    </>
  );
}
