import z from "zod";
import { categoryOptions, colorSelections } from "@/utils/constants";

export const UpsertBudgetSchema = z.object({
  maximum: z.coerce.number().positive(),
  theme: z.enum(colorSelections.map((c) => c.value)),
  category: z.enum(categoryOptions.map((opt) => opt.name)),
});
