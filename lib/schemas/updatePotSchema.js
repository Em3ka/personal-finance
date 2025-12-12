import z from "zod";
import { colorSelections } from "@/utils/constants";

export const UpdatePotSchema = z.object({
  name: z.string().trim().min(2, { message: "Name must be at least 2 characters long." }),
  target: z.coerce.number().positive(),
  theme: z.enum(colorSelections.map((c) => c.value)),
});
