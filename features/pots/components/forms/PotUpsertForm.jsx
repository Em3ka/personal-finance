import Field from "@/components/ui/Field";
import { upsertPot } from "@/lib/actions";
import { useToast } from "@/hooks/useToast";
import TextInput from "@/components/ui/TextInput";
import ActionButton from "@/components/ui/ActionButton";
import { useActionState, useId, useState } from "react";
import CustomSelect from "@/components/layout/CustomSelect";
import SelectThemeItem from "@/components/layout/SelectThemeItem";
import { colorSelections, MAX_CHARS, potActionLabels } from "@/utils/constants";

export default function PotUpsertForm({ formData, onSuccess, mode = "create" }) {
  const { potId, usedColors, initialTheme, initialPotName, initialTargetAmount } =
    formData;

  const formId = useId();
  const [input, setInput] = useState(initialPotName || "");
  const [theme, setTheme] = useState(initialTheme || colorSelections[0].value);

  const potAction = upsertPot.bind(null, { mode, potId });
  const [state, formAction, isPending] = useActionState(potAction, {
    success: false,
    message: null,
  });

  useToast(state, onSuccess);

  return (
    <>
      <form id={formId} action={formAction} className="grid gap-4">
        <Field
          htmlFor="name"
          label="Pot Name"
          message={`${MAX_CHARS - input.length} characters left`}>
          <TextInput
            fullWidth
            required
            id="name"
            name="name"
            maxLength={MAX_CHARS}
            placeholder="e.g. Rainy Days"
            defaultValue={initialPotName}
            onChange={(e) => setInput(e.target.value)}
          />
        </Field>

        <Field htmlFor="target" label="Target">
          <TextInput
            required
            fullWidth
            leftIcon="$"
            type="number"
            id="target"
            name="target"
            placeholder="e.g. 200"
            defaultValue={initialTargetAmount}
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
        loadingText={potActionLabels[mode].pendingText}>
        {potActionLabels[mode].text}
      </ActionButton>
    </>
  );
}
