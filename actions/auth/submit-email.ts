"use server";

import { createPasswordToken, sendPasswordToken } from "@/lib/recover-password";
import { getUserByEmail } from "@/lib/user";
import {
  SubmitEmailSchema,
  SubmitEmailSchemaType,
} from "@/schemas/email-schema";

export const sendPasswordResetEmail = async (values: SubmitEmailSchemaType) => {
  const validateField = SubmitEmailSchema.safeParse(values);

  if (!validateField.success) {
    return { error: "Invalid password format" };
  }

  const { email } = validateField.data;

  const user = await getUserByEmail(email);

  if (!user) {
    return { error: "User does not exist" };
  }

  const passwordResetToken = await createPasswordToken(email);

  const { error } = await sendPasswordToken(email, passwordResetToken.token);

  if (error) {
    return { error: "Failed to send password reset email" };
  }

  return { success: "Password reset email sent successfully" };
};
