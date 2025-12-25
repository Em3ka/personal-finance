"use client";

import Field from "@/components/ui/Field";
import { useToast } from "@/hooks/useToast";
import { upsertBudget } from "@/lib/actions";
import TextInput from "@/components/ui/TextInput";
import ActionButton from "@/components/ui/ActionButton";
import { useActionState, useId, useState } from "react";
import CustomSelect from "@/components/layout/CustomSelect";
import SelectThemeItem from "@/components/layout/SelectThemeItem";
import { budgetActionLabels, categoryOptions, colorSelections } from "@/utils/constants";

export default function BudgetForm({ formData, onSuccess, mode = "create" }) {
  const { budgetId, usedColors, initialTheme, initialCategory, initialMaxSpend } =
    formData;

  const formId = useId();
  const [category, setCategory] = useState(initialCategory || categoryOptions[1].value);
  const [theme, setTheme] = useState(initialTheme || colorSelections[0].value);

  const addEditBudget = upsertBudget.bind(null, { mode, budgetId });
  const [state, formAction, isPending] = useActionState(addEditBudget);

  useToast(state, onSuccess);

  return (
    <>
      <form id={formId} action={formAction} className="grid gap-4">
        <Field htmlFor="category" label="Budget Category">
          <CustomSelect
            fullWidth
            name="category"
            htmlFor="category"
            value={category}
            onValueChange={setCategory}
            options={categoryOptions.slice(1)}
          />
        </Field>

        <Field htmlFor="maximumSpend" label="Maximum Spend">
          <TextInput
            required
            fullWidth
            leftIcon="$"
            type="number"
            id="maximumSpend"
            name="maximumSpend"
            placeholder="e.g. 200"
            defaultValue={initialMaxSpend}
          />
        </Field>

        <Field htmlFor="theme" label="Theme">
          <CustomSelect
            fullWidth
            name="theme"
            htmlFor="theme"
            value={theme}
            onValueChange={setTheme}
            options={colorSelections}
            render={(color) => {
              const isUsed = usedColors.includes(color.value);
              const isSelected = color.value === theme;

              return (
                <SelectThemeItem
                  key={color.name}
                  value={color.value}
                  color={color.value}
                  disabled={isUsed && !isSelected}
                  trailingText={isUsed && !isSelected ? "Already used" : ""}>
                  {color.name}
                </SelectThemeItem>
              );
            }}
          />
        </Field>
      </form>

      <ActionButton
        form={formId}
        type="submit"
        loading={isPending}
        loadingText={budgetActionLabels[mode].pendingText}>
        {budgetActionLabels[mode].text}
      </ActionButton>
    </>
  );
}
