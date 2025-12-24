"use client";

import { emailRegex, passRegex } from "@/regex";
import { validation } from "@/validation";
import Link from "next/link";
import { signIn } from "next-auth/react";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { handleGoogleLogin } from "@/utils/handleGoogleLogin";
import { useState } from "react";
import AuthSpinnerLoader from "@/components/loaders/AuthSpinner";

export default function LoginPage() {
  const params = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const callbackUrl = params.get("callbackUrl" || "");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
  const handleLogin = async (data) => {
    setIsLoading(true);
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (res?.error) {
      if (res.status === 401) {
        toast.error("Invalid user credentials");
      } else {
        toast.error(res.error);
      }
    } else {
      toast.success("Success!");
      console.log("Success!");
      router.push(callbackUrl ? callbackUrl : "/");
    }
    setIsLoading(false);
  };
  return (
    <>
      <header className="max-lg:text-center">
        <h3 className="text-2xl font-bold mb-1">Login now!</h3>
        <p className="text-neutral/90 text-sm mb-5">
          New here?{" "}
          <Link
            href={`/auth/register?callbackUrl=${callbackUrl || ""}`}
            className="link link-primary link-hover"
          >
            Register now
          </Link>
        </p>
      </header>
      <form onSubmit={handleSubmit(handleLogin)} className="fieldset">
        <label className="label">Email</label>
        <input
          disabled={isLoading}
          type="email"
          className="input w-full"
          placeholder="john.doe@gmail.com"
          {...register("email", {
            required: validation.email,
            pattern: {
              value: emailRegex.value,
              message: emailRegex.message,
            },
          })}
        />
        {errors.email && <p className="text-error">{errors.email.message}</p>}
        <label className="label mt-2">Password</label>
        <input
          disabled={isLoading}
          type="password"
          className="input w-full"
          placeholder="******"
          {...register("password", {
            required: validation.password,
            pattern: {
              value: passRegex.value,
              message: passRegex.message,
            },
          })}
        />
        {errors.password && (
          <p className="text-error">{errors.password.message}</p>
        )}
        <button disabled={isLoading} className="btn btn-primary mt-3">
          {isLoading && <AuthSpinnerLoader />}
          {isLoading ? "Logging in" : "Login Now"}
        </button>
        <div className="divider">Or</div>
        <button
          disabled={isLoading}
          onClick={() => handleGoogleLogin(callbackUrl)}
          type="button"
          className="btn btn-neutral btn-outline border-neutral/15"
        >
          <FcGoogle />
          <span>Continue with Google</span>
        </button>
      </form>
    </>
  );
}
