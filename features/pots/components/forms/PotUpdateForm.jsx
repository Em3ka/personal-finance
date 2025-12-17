"use client";

import PotStats from "../PotStats";
import Field from "@/components/ui/Field";
import { useToast } from "@/hooks/useToast";
import { updatePotTotal } from "@/lib/actions";
import TextInput from "@/components/ui/TextInput";
import { potActionLabels } from "@/utils/constants";
import { useActionState, useId, useState } from "react";
import ActionButton from "@/components/ui/ActionButton";
import { capFirstLetter, formatCurrency } from "@/utils/helpers";
import DualProgressBar from "@/components/layout/DualProgressbar";

export default function PotUpdateForm({ type, formData, onSuccess }) {
  const { total, target, id } = formData;

  const formId = useId();
  const [input, setInput] = useState(0);

  // Calculate the new total based on the action type (add or withdraw)
  const newAmount = type === "add" ? total + input : total - input;

  // Check if withdrawal amount exceeds the current total
  const isExceeded = type === "withdraw" && input > total;

  const [state, formAction, isPending] = useActionState(updatePotTotal, {
    success: false,
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
          type={input > 0 ? type : "default"}>
          <DualProgressBar type={type} change={input} current={total} maximum={target} />
        </PotStats>

        <Field
          htmlFor="amount"
          isError={isExceeded}
          label={`Amount to ${capFirstLetter(type)}`}
          message={isExceeded && `Amount to withdraw exceeds ${formatCurrency(total)}`}>
          <TextInput
            required
            fullWidth
            id="amount"
            type="number"
            leftIcon="$"
            placeholder="e.g. 200"
            onChange={(e) => setInput(Number(e.target.value))}
          />
        </Field>
      </form>

      <ActionButton
        form={formId}
        type="submit"
        loading={isPending}
        loadingText={potActionLabels[type].pendingText}>
        {potActionLabels[type].text}
      </ActionButton>
    </>
  );
}
