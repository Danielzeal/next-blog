"use client";

import { verifyEmail } from "@/actions/auth/verify-email";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Heading from "../common/heading";

const VerifyEmailClient = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const [pending, setPending] = useState(true);

  useEffect(() => {
    if (!token) return;

    const emailVerification = async () => {
      setPending(true);
      const verified = await verifyEmail(token);

      if (verified.error) {
        console.log("Email not verified");
      } else {
        console.log("Email verified");
        setPending(false);
        router.push("/login");
      }
    };

    emailVerification();
  }, [token]);

  return (
    <div className="border-2 rounded-md p-2 flex flex-col gap-2 items-center my-8 max-w-[400px] mx-auto">
      <Heading title="Blog" center />
      {pending ? <p>Verifing Email....</p> : <p>Email Verified successfully</p>}
    </div>
  );
};

export default VerifyEmailClient;
