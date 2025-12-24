"use client";

import { postUser } from "@/app/actions/server/auth";
import { emailRegex, passRegex, phoneNoRegex } from "@/regex";
import { validation } from "@/validation";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useState } from "react";
import AuthSpinnerLoader from "@/components/loaders/AuthSpinner";
import { handleGoogleLogin } from "@/utils/handleGoogleLogin";

export default function RegisterPage() {
  const params = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const callbackUrl = params.get("callbackUrl" || "");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
  const handleRegister = async (data) => {
    setIsLoading(true);
    const res = await postUser(data);
    if (res.success) {
      toast.success(res.message || "Success!");
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      router.push(callbackUrl || "/");
      reset();
    } else {
      toast.error(res.message || "Failed!");
    }
    setIsLoading(false);
  };
  return (
    <>
      <div className="">
        <h3 className="text-2xl font-bold mb-1">Create an account!</h3>
        <p className="text-neutral/90 text-sm mb-5">
          Already a user?{" "}
          <Link
            href={`/auth/login?callbackUrl=${callbackUrl || ""}`}
            className="link link-primary link-hover"
          >
            Login
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit(handleRegister)} className="fieldset">
        <label className="label">NID Number</label>
        <input
          disabled={isLoading}
          type="number"
          className="input w-full"
          placeholder="10 digit NID no"
          {...register("nid", {
            required: validation.nid,
            validate: (value) => value.length === 10 || "Invalid NID Number",
          })}
        />
        {errors.nid && <p className="text-error">{errors.nid.message}</p>}
        <label className="label">Name</label>
        <input
          disabled={isLoading}
          type="text"
          className="input w-full"
          placeholder="John Doe"
          {...register("name", {
            required: validation.name,
          })}
        />
        {errors.name && <p className="text-error">{errors.name.message}</p>}
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
        <label className="label">Contact</label>
        <input
          disabled={isLoading}
          type="text"
          className="input w-full"
          placeholder="01xxxxxxxxx"
          {...register("contact", {
            required: validation.contact,
            pattern: {
              value: phoneNoRegex.value,
              message: phoneNoRegex.message,
            },
          })}
        />
        {errors.contact && (
          <p className="text-error">{errors.contact.message}</p>
        )}
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
        <button disabled={isLoading} className="btn btn-secondary mt-3">
          {isLoading && <AuthSpinnerLoader />}
          {isLoading ? "Registering" : "Register"}
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
