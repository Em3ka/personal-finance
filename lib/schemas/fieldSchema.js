import { SignupFormSchema } from "./signupSchema";

// Individual Zod schemas for validating single-input fields.
export const FieldSchema = {
  name: SignupFormSchema.pick({ name: true }),
  email: SignupFormSchema.pick({ email: true }),
  password: SignupFormSchema.pick({ password: true }),
};
