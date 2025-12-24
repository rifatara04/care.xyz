"use client";
import Lottie from "lottie-react";
import animate from "../../public/animations/error.json";
import Link from "next/link";
export default function ErrorPage() {
  return (
    <div className="py-20 flex flex-col items-center">
      <Lottie animationData={animate} loop={false} className="size-36" />
      <p className="text-error font-bold mt-10 mb-3">
        Something is wrong. We are working on it!
      </p>
      <Link href={"/"} className="btn btn-neutral">
        Back to Home
      </Link>
    </div>
  );
}
