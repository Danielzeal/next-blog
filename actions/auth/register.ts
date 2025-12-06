"use server";

import db from "@/lib/db";
import {
  createVerificationToken,
  sendVerificationEmail,
} from "@/lib/email-verification";
import { getUserByEmail } from "@/lib/user";
import { registerSchema, RegisterSchemaType } from "@/schemas/register-schema";

import brcypt from "bcryptjs";

export const signUp = async (values: RegisterSchemaType) => {
  const validateFields = registerSchema.safeParse(values);
  if (!validateFields.success) {
    return {
      success: false,
      errors: validateFields.error.flatten().fieldErrors,
    };
  }

  const { email, name, password } = validateFields.data;

  const user = await getUserByEmail(email);

  if (user) {
    return {
      success: false,
      errors: { email: ["User with this email already exists"] },
    };
  }

  const hashPassword = await brcypt.hash(password, 12);

  const emailToken = await createVerificationToken(email);
  if (emailToken) {
    await db.user.create({
      data: {
        email,
        name,
        password: hashPassword,
      },
    });
  }
  const { error } = await sendVerificationEmail(
    emailToken.email,
    emailToken.token
  );

  if (error) {
    return {
      success: false,
      errors: { email: ["Failed to send verification email"] },
    };
  }

  return { success: "Email sent", errors: null };
};
