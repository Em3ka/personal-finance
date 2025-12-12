import { z } from "zod";

export const SignupFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50)
    .regex(/^[\p{L}\p{M}' -]+$/u, {
      message: "Name contains invalid characters",
    }),
  email: z.email({ message: "Please enter a valid email." }),
  password: z
    .string()
    .trim()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[a-zA-Z]/, {
      message: "Contain at least one letter.",
    })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    }),
});
