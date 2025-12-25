"use client";

import PotStats from "../PotStats";
import Field from "@/components/ui/Field";
import { useToast } from "@/hooks/useToast";
import { updatePotTotal } from "@/lib/actions";
import TextInput from "@/components/ui/TextInput";
import { potActionLabels } from "@/utils/constants";
import { useActionState, useId, useState } from "react";
import ActionButton from "@/components/ui/ActionButton";
import PreviewProgressBar from "@/components/layout/PreviewProgressbar";
import { capFirstLetter, formatCurrency, preventPlusMinusKeys } from "@/utils/helpers";

export default function PotUpdateForm({ mode, formData, onSuccess }) {
  const { total, target, id } = formData;

  const formId = useId();
  const [input, setInput] = useState(0);

  /** Calculate the "new total" based on the action type (add or withdraw)
   * Formula: new input + total saving
   * */
  const newAmount = mode === "add" ? total + input : total - input;

  // Check if withdrawal amount exceeds the total savings
  const isExceeded = mode === "withdraw" && input > total;

  const [state, formAction, isPending] = useActionState(updatePotTotal, {
    status: "",
    message: null,
  });

  useToast(state, onSuccess);

  return (
    <>
      <form id={formId} action={formAction} className="space-y-4">
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="total" value={newAmount} />

        <PotStats
          target={target}
          amount={newAmount}
          isExceeded={isExceeded}
          type={input > 0 ? mode : "default"}>
          <PreviewProgressBar
            operation={mode}
            savedAmount={total}
            pendingDelta={input}
            targetAmount={target}
          />
        </PotStats>

        <Field
          htmlFor="amount"
          isError={isExceeded}
          label={`Amount to ${capFirstLetter(mode)}`}
          message={isExceeded && `Amount to withdraw exceeds ${formatCurrency(total)}`}>
          <TextInput
            min="0"
            required
            fullWidth
            id="amount"
            type="number"
            leftIcon="$"
            placeholder="e.g. 200"
            onKeyDown={preventPlusMinusKeys}
            onChange={(e) => setInput(Number(e.target.value))}
          />
        </Field>
      </form>

      <ActionButton
        form={formId}
        type="submit"
        disabled={isExceeded}
        loading={isPending}
        loadingText={potActionLabels[mode].pendingText}>
        {potActionLabels[mode].text}
      </ActionButton>
    </>
  );
}
