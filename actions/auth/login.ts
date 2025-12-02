"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/libs/user";
import { LOGIN_REDIRECT } from "@/route";
import { loginSchema, LoginSchemaType } from "@/schemas/login-schema";

export const login = async (values: LoginSchemaType) => {
  const validateFields = loginSchema.safeParse(values);

  if (!validateFields.success) {
    return {
      success: false,
      errors: validateFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validateFields.data;

  const user = await getUserByEmail(email);

  if (!user || !email || !password || !user.password) {
    return {
      success: false,
      errors: { email: ["User with this email already exists"] },
    };
  }

  //   if (!user.emailVerified) {
  //     return {
  //       success: false,
  //       errors: { email: ["Email is not verified"] },
  //     };
  //   }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return {
      success: true,
      redirectUrl: LOGIN_REDIRECT,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        errors: { email: [error.message] },
      };
    }
  }
};
