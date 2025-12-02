import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(4, { message: "Name must be 4 or more characters long." })
      .max(26, { message: "Name must not exceed 30 characters" }),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Password must match",
      path: ["confirmPassword"],
    }
  );

export type RegisterSchemaType = z.infer<typeof registerSchema>;
