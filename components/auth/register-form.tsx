"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormField from "../common/form-field";
import Button from "../common/button";
import Heading from "../common/heading";
import SocialAuth from "./social-auth";
import { registerSchema, RegisterSchemaType } from "@/schemas/register-schema";
import { signUp } from "@/actions/auth/register";
import { useTransition } from "react";

const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: RegisterSchemaType) => {
    startTransition(async () => {
      const user = await signUp(data);

      if (user.success) {
        // Handle successful registration (e.g., redirect to login or dashboard)
        console.log(user.success);
      } else {
        // Handle registration errors (e.g., display error messages)
        console.log(user.errors?.email);
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col max-w-[500px] m-auto mt-8 gap-2"
    >
      <Heading title="Create a WEBDEV.blog Account" lg center />
      <FormField
        id="name"
        register={register}
        placeholder="Enter your name"
        errors={errors}
        disable={isPending}
        type="name"
      />
      <FormField
        id="email"
        register={register}
        placeholder="email"
        errors={errors}
        disable={isPending}
        type="email"
      />
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
        label={isPending ? "Submitting" : "Submit"}
        disabled={isPending}
      />
      <div className="flex justify-center my-2">or</div>
      <SocialAuth />
    </form>
  );
};

export default RegisterForm;
