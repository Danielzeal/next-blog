"use server";

import db from "@/libs/db";
import { getUserByEmail } from "@/libs/user";
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

  await db.user.create({
    data: {
      email,
      name,
      password: hashPassword,
    },
  });

  return { success: "User create successfully", errors: null };
};
