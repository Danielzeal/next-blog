import { Resend } from "resend";
import db from "./db";
import { v4 as uuidv4 } from "uuid";

export const recoverPasswordByToken = async (token: string) => {
  try {
    const resetToken = await db.recoverPassword.findUnique({
      where: { token },
    });
    return resetToken;
  } catch (error) {
    return null;
  }
};

export const recoverPasswordByEmail = async (email: string) => {
  try {
    const passwordEmail = await db.recoverPassword.findFirst({
      where: { email },
    });

    return passwordEmail;
  } catch (error) {
    return null;
  }
};

export const createPasswordToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3000 * 1000); // Token valid for 1 hours

  const existingtoken = await recoverPasswordByEmail(email);

  if (existingtoken) {
    await db.verificationToken.deleteMany({
      where: {
        token: existingtoken.token,
      },
    });
  }

  const passwordToken = await db.recoverPassword.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordToken;
};

export const sendPasswordToken = async (email: string, token: string) => {
  const resend = new Resend(process.env.RESEND_API_KEY!);

  const passwordResetLink = `${process.env.BASE_URL}/reset-password?token=${token}`;

  const emailResponse = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${passwordResetLink}">here</a> to verify your email.</p>`,
  });

  return { error: emailResponse.error };
};
