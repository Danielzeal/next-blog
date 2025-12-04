import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import { loginSchema } from "./schemas/login-schema";
import { getUserByEmail } from "./lib/user";
import bcrypt from "bcryptjs";

export default {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),

    Credentials({
      async authorize(credentials) {
        const validateFields = loginSchema.safeParse(credentials);

        if (validateFields.success) {
          const { email, password } = validateFields.data;

          const user = await getUserByEmail(email);

          if (!user?.password) {
            return null;
          }

          const isCorrectPassword = await bcrypt.compare(
            password,
            user.password
          );

          if (isCorrectPassword) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
