"use client";

import { loginSchema, LoginSchemaType } from "@/schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormField from "../common/form-field";
import Button from "../common/button";
import Heading from "../common/heading";
import SocialAuth from "./social-auth";
import { login } from "@/actions/auth/login";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { LOGIN_REDIRECT } from "@/route";
import Link from "next/link";

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(loginSchema) });

  const router = useRouter();

  const onSubmit = (data: LoginSchemaType) => {
    startTransition(async () => {
      const signIn = await login(data);

      if (signIn?.success) {
        router.push(LOGIN_REDIRECT);
      } else {
        console.log(signIn?.errors?.email);
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
      <FormField
        id="password"
        register={register}
        placeholder="password"
        errors={errors}
        type="password"
        disable={isPending}
      />
      <Button label="Login" disabled={isPending} />
      <div className="flex justify-center my-2">or</div>
      <SocialAuth />
      <div className="flex items-end justify-end">
        <Link className="mt-2 underline text-sm" href={"/submit-email"}>
          Forgot Password
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
