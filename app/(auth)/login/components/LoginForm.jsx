"use client";

import { useActionState } from "react";
import Field from "@/components/ui/Field";
import { loginUser } from "@/lib/actions";
import { useToast } from "@/hooks/useToast";
import TextInput from "@/components/ui/TextInput";
import ActionButton from "@/components/ui/ActionButton";
import PasswordInput from "@/components/ui/PasswordInput";
import SpinnerMini from "@/components/layout/SpinnerMini";
import FieldDescription from "@/components/ui/FieldDescription";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginUser, {
    message: "",
    success: false,
  });

  useToast(state);

  return (
    <>
      <h1 className="text-[32px] font-bold">Login</h1>

      <form id="login-form" action={formAction} className="space-y-4">
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

      <ActionButton form="login-form" type="submit" disabled={isPending}>
        {!isPending ? "Login" : <SpinnerMini />}
      </ActionButton>

      <FieldDescription linkLabel="Sign Up" to="/signup">
        Need to create an account?
      </FieldDescription>
    </>
  );
}
