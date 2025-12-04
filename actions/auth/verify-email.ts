"use server";

import db from "@/lib/db";
import { getUserByEmail } from "@/lib/user";

export const verifyEmail = async (token: string) => {
  const emailVerify = await db.verificationToken.findUnique({
    where: { token },
  });

  if (!emailVerify) return { error: "Verification token does not exist" };

  const isExpired = new Date(emailVerify.expires) < new Date();

  const existUser = await getUserByEmail(emailVerify.email);

  if (isExpired) {
    await db.user.delete({
      where: {
        email: existUser?.email,
      },
    });

    await db.verificationToken.delete({
      where: {
        token,
      },
    });

    return { error: "token has expired" };
  }

  await db.user.update({
    where: {
      id: existUser?.id,
    },
    data: {
      emailVerified: new Date(),
      email: emailVerify.email,
    },
  });

  return { success: "Email verified" };
};
