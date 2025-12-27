"use client";

import { useActionState } from "react";
import Field from "@/components/ui/Field";
import { loginUser } from "@/lib/actions";
import { useToast } from "@/hooks/useToast";
import TextInput from "@/components/ui/TextInput";
import ActionButton from "@/components/ui/ActionButton";
import PasswordInput from "@/components/ui/PasswordInput";
import Spinner from "@/components/layout/Spinner";
import FieldDescription from "@/components/ui/FieldDescription";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginUser);

  useToast(state);

  return (
    <>
      <h1 className="text-[2rem] leading-[1.2] font-bold">Login</h1>

      <form id="login-form" action={formAction} className="space-y-4">
        <Field htmlFor="email" label="Email">
          <TextInput
            required
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
            id="password"
            name="password"
            autoComplete="current-password"
            disabled={isPending}
          />
        </Field>
      </form>

      <ActionButton form="login-form" type="submit" disabled={isPending}>
        {!isPending ? "Login" : <Spinner />}
      </ActionButton>

      <FieldDescription linkLabel="Sign Up" to="/signup">
        Need to create an account?
      </FieldDescription>
    </>
  );
}
