import { Resend } from "resend";
import db from "./db";
import { v4 as uuidv4 } from "uuid";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const tokenRecord = await db.verificationToken.findFirst({
      where: { email },
    });

    return tokenRecord;
  } catch (error) {
    console.error("Error fetching verification token by email:", error);
  }
};

export const createVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3000 * 1000); // Token valid for 1 hours

  const existingtoken = await getVerificationTokenByEmail(email);
  if (existingtoken) {
    await db.verificationToken.delete({
      where: {
        id: existingtoken.id,
      },
    });
  }

  const emailToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return emailToken;
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const resend = new Resend(process.env.RESEND_API_KEY!);

  const verificationLink = `${process.env.BASE_URL}/verify-email?token=${token}`;

  const emailResponse = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Hello World",
    html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,
  });

  return { error: emailResponse.error };
};
