import db from "@/lib/db";
import { recoverPasswordByToken } from "@/lib/recover-password";
import { getUserByEmail } from "@/lib/user";
import {
  PasswordResetSchema,
  PasswordResetSchemaType,
} from "@/schemas/password-reset-schema";
import bcrypt from "bcryptjs";
import { success } from "zod";

export const ResetPassword = async (
  token: string,
  data: PasswordResetSchemaType
) => {
  const validataFields = PasswordResetSchema.safeParse(data);

  if (!validataFields.success) {
    return { error: "User not found" };
  }

  const resetToken = await recoverPasswordByToken(token);

  if (!resetToken) {
    return { error: "Invalid token" };
  }

  const isExpired = new Date(resetToken.expires) < new Date();

  if (isExpired) {
    return { error: "Token has expired" };
  }

  const user = await getUserByEmail(resetToken.email);

  if (!user) {
    return { error: "User does not exist" };
  }

  const { password } = validataFields.data;

  const hashPassword = await bcrypt.hash(password, 12);

  await db.user.update({
    where: { email: user.email },
    data: { password: hashPassword, emailVerified: new Date() },
  });

  await db.recoverPassword.delete({
    where: { token },
  });

  return { success: "Password has been reset" };
};
