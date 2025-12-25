"use client";

import Field from "@/components/ui/Field";
import { createUser } from "@/lib/actions";
import { useToast } from "@/hooks/useToast";
import { useActionState, useState } from "react";
import TextInput from "@/components/ui/TextInput";
import { FieldSchema } from "@/lib/schemas/fieldSchema";
import ActionButton from "@/components/ui/ActionButton";
import SpinnerMini from "@/components/layout/SpinnerMini";
import PasswordInput from "@/components/ui/PasswordInput";
import FieldDescription from "@/components/ui/FieldDescription";

export default function SignupForm() {
  const [fieldErrors, setFieldErrors] = useState({});
  const [state, formAction, isPending] = useActionState(createUser);

  // Validate one field using its Zod schema (SignupSchema).
  function validateSingleField(fieldName, e) {
    const value = e.target.value;
    const result = FieldSchema[fieldName].safeParse({ [fieldName]: value });

    setFieldErrors((prev) => ({
      ...prev,
      [fieldName]: result.success ? null : result.error?.flatten().fieldErrors[fieldName],
    }));
  }

  // Field error messages: (Realtime validation errors OR server errors)
  const fieldMessages = {
    name: fieldErrors.name?.[0] || state.errors?.fieldErrors?.name?.[0],
    email: fieldErrors.email?.[0] || state.errors?.fieldErrors?.email?.[0],
    password:
      fieldErrors.password?.[0] ||
      state.errors?.fieldErrors?.password?.[0] ||
      "At least 8 characters, including symbols and numbers.",
  };

  useToast(state);

  return (
    <>
      <h1 className="text-[2rem] leading-[1.2] font-bold">Sign Up</h1>

      <form id="signup-form" action={formAction} className="space-y-4">
        <Field
          htmlFor="name"
          label="Name"
          message={fieldMessages.name}
          isError={!!fieldErrors.name}
          onFieldChange={validateSingleField}>
          <TextInput
            required
            fullWidth
            id="name"
            name="name"
            autoComplete="name"
            disabled={isPending}
          />
        </Field>

        <Field
          htmlFor="email"
          label="Email"
          message={fieldMessages.email}
          isError={!!fieldErrors.email}
          onFieldChange={validateSingleField}>
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

        <Field
          htmlFor="password"
          label="Create Password"
          message={fieldMessages.password}
          isError={!!fieldErrors.password}
          onFieldChange={validateSingleField}>
          <PasswordInput
            required
            fullWidth
            id="password"
            name="password"
            autoComplete="new-password"
            disabled={isPending}
          />
        </Field>
      </form>

      <ActionButton form="signup-form" type="submit" disabled={isPending}>
        {!isPending ? "Create Account" : <SpinnerMini />}
      </ActionButton>

      <FieldDescription linkLabel="Login" to="/login">
        Need to create an account?
      </FieldDescription>
    </>
  );
}
