"use client";

import { PlusIcon } from "@heroicons/react/24/solid";
import { useBudgets } from "../BudgetsProvider";
import BudgetSummary from "./BudgetSummary";
import BudgetCardList from "./BudgetCardList";
import PageEmpty from "@/components/layout/PageEmpty";
import BudgetsDialogs from "./BudgetsDialogs";
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
        <PageEmpty
          icon="budget"
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
