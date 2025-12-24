import z from "zod";

export const UpdatePotTotalSchema = z.object({
  id: z.uuid(),
  total: z.number().nonnegative({
    message: "Amount cannot be negative.",
  }),
});
