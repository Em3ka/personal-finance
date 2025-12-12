"use client";

import Field from "@/components/ui/Field";
import { loginUser } from "@/lib/actions";
import { useToast } from "@/hooks/useToast";
import { useActionState, useId } from "react";
import TextInput from "@/components/ui/TextInput";
import ActionButton from "@/components/ui/ActionButton";
import PasswordInput from "@/components/ui/PasswordInput";
import SpinnerMini from "@/components/layout/SpinnerMini";
import FieldDescription from "@/components/ui/FieldDescription";

export default function LoginForm() {
  const formId = useId();
  const [state, formAction, isPending] = useActionState(loginUser, {
    message: "",
    success: false,
  });

  useToast(state);

  return (
    <>
      <h1 className="text-[32px] font-bold">Login</h1>

      <form id={formId} action={formAction} className="space-y-4">
        <Field htmlFor="email" label="Email">
          <TextInput
            required
            fullWidth
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            disabled={isPending}
          />
        </Field>

        <Field htmlFor="password" label="Password">
          <PasswordInput
            required
            fullWidth
            id="password"
            name="password"
            autoComplete="current-password"
            disabled={isPending}
          />
        </Field>
      </form>

      <ActionButton type="submit" form={formId} disabled={isPending}>
        {!isPending ? "Login" : <SpinnerMini />}
      </ActionButton>

      <FieldDescription linkLabel="Sign Up" to="/signup">
        Need to create an account?
      </FieldDescription>
    </>
  );
}
