"use client";

import Button from "../common/button";
import FormField from "../common/form-field";
import Heading from "../common/heading";

import { useTransition } from "react";
import { toast } from "sonner";
import {
  PasswordResetSchema,
  PasswordResetSchemaType,
} from "@/schemas/password-reset-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { ResetPassword } from "@/actions/auth/reset-password";

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetSchemaType>({
    resolver: zodResolver(PasswordResetSchema),
  });

  const onSubmit = (data: PasswordResetSchemaType) => {
    startTransition(async () => {
      if (!token) return;
      const resetPassword = await ResetPassword(token, data);
      if (resetPassword?.success) {
        toast.success(resetPassword.success);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        toast.error(resetPassword.error);
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col max-w-[500px] m-auto mt-8 gap-2"
    >
      <Heading title="Enter your new password" lg center />
      <FormField
        id="password"
        register={register}
        placeholder="password"
        errors={errors}
        disable={isPending}
        type="password"
      />
      <FormField
        id="confirmPassword"
        register={register}
        placeholder="Confirm Password"
        errors={errors}
        disable={isPending}
        type="password"
      />
      <Button
        label={isPending ? "Saving new Password..." : "Submit"}
        disabled={isPending}
      />
    </form>
  );
};

export default ResetPasswordForm;
