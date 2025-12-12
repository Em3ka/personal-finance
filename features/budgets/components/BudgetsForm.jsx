"use client";

import Field from "@/components/ui/Field";
import { useToast } from "@/hooks/useToast";
import { addOrEditBudget } from "@/lib/actions";
import TextInput from "@/components/ui/TextInput";
import ActionButton from "@/components/ui/ActionButton";
import { useActionState, useId, useState } from "react";
import CustomSelect from "@/components/layout/CustomSelect";
import SelectThemeItem from "@/components/layout/SelectThemeItem";
import { categoryOptions, colorSelections } from "@/utils/constants";

const buttonLabel = {
  default: { text: "Add Budget", pendingText: "Adding budget..." },
  edit: { text: "Save Changes", pendingText: "Saving changes..." },
};

export default function BudgetForm({ formData, onSuccess, variant = "default" }) {
  const formId = useId();
  const { budgetId, usedColors, initialTheme, initialCategory, initialMaxSpend } =
    formData;

  const [category, setCategory] = useState(initialCategory || categoryOptions[1].value);
  const [theme, setTheme] = useState(initialTheme || colorSelections[0].value);

  const addEditBudget = addOrEditBudget.bind(null, { variant, budgetId });
  const [state, formAction, isPending] = useActionState(addEditBudget, {
    success: false,
    message: null,
  });

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

      <ActionButton form={formId} type="submit" className="w-full" disabled={isPending}>
        {isPending ? buttonLabel[variant].pendingText : buttonLabel[variant].text}
      </ActionButton>
    </>
  );
}
