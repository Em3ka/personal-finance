"use client";

import BudgetForm from "./BudgetsForm";
import { slugify } from "@/utils/helpers";
import { useBudgets } from "../BudgetsProvider";
import BaseDialog from "@/components/layout/BaseDialog";
import ConfirmDialog from "@/components/layout/ConfirmDialog";
import { deleteBudget } from "@/lib/actions";

export default function BudgetsDialogs() {
  const { dialog, closeDialog, budgets } = useBudgets();

  if (!dialog.type) return null;

  /* I reused a single BudgetForm component because the form structure is identical
   * for both add + edit. The only differences are initial values and the action variant.
   * Using one form avoids duplicated markup and keeps changes centralized.
   */

  if (dialog.type === "add") {
    return (
      <BaseDialog
        open
        onCancel={closeDialog}
        title="Add New Budget"
        message={`Choose a category to set a spending budget. 
          These categories can help you monitor spending.`}>
        <BudgetForm
          onSuccess={closeDialog}
          formData={{ usedColors: budgets.map((b) => b.theme) }}
        />
      </BaseDialog>
    );
  }

  if (dialog.type === "edit") {
    return (
      <BaseDialog
        open
        onCancel={closeDialog}
        title="Edit Budget"
        message="As your budgets change, feel free to update your spending limits.">
        <BudgetForm
          variant="edit"
          onSuccess={closeDialog}
          formData={{
            budgetId: dialog.budget.id,
            initialTheme: dialog.budget.theme,
            initialMaxSpend: dialog.budget.maximum,
            usedColors: budgets.map((b) => b.theme),
            initialCategory: slugify(dialog.budget.category),
          }}
        />
      </BaseDialog>
    );
  }

  if (dialog.type === "delete") {
    return (
      <ConfirmDialog
        open
        action={deleteBudget}
        onCancel={closeDialog}
        title={`Delete ‘${dialog.budget.category}’?`}
        message={`Are you sure you want to delete this ${dialog.budget.category.toLowerCase()}? 
            This action cannot be reversed, and all the data inside it will be removed forever.`}>
        {({ formAction, formId }) => (
          <form id={formId} action={formAction}>
            <input type="hidden" name="budgetId" value={dialog.budget.id} />
          </form>
        )}
      </ConfirmDialog>
    );
  }
}
