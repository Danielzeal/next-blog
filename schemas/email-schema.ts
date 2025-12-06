import { z } from "zod";

export const SubmitEmailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type SubmitEmailSchemaType = z.infer<typeof SubmitEmailSchema>;
