"use client";

import {
  SubmitEmailSchema,
  SubmitEmailSchemaType,
} from "@/schemas/email-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import Button from "../common/button";
import FormField from "../common/form-field";
import Heading from "../common/heading";
import { sendPasswordResetEmail } from "@/actions/auth/submit-email";
import { toast } from "sonner";

const PasswordEmailForm = () => {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubmitEmailSchemaType>({
    resolver: zodResolver(SubmitEmailSchema),
  });

  const onSubmit = (data: SubmitEmailSchemaType) => {
    startTransition(async () => {
      const resetPassword = await sendPasswordResetEmail(data);
      if (resetPassword?.success) {
        toast.success(resetPassword.success);
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
      <Heading title="Welcome to WEBDEV.blog" lg center />
      <FormField
        id="email"
        register={register}
        placeholder="email"
        errors={errors}
        type="email"
        disable={isPending}
      />
      <Button
        type="submit"
        label="Send reset password Email"
        disabled={isPending}
      />
    </form>
  );
};

export default PasswordEmailForm;
