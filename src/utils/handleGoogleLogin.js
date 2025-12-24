import { signIn } from "next-auth/react";

export const handleGoogleLogin = (callbackUrl) => {
  console.log("google clicked");
  signIn("google", { callbackUrl: callbackUrl || "/" });
};
