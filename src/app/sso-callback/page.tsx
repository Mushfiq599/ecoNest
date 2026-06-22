"use client";

import { useClerk, useSignIn, useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function SSOCallbackPage() {
  const clerk = useClerk();
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const router = useRouter();
  const hasRun = useRef(false);

  useEffect(() => {
    (async () => {
      if (!clerk.loaded || hasRun.current) return;
      hasRun.current = true;

      const finalize = async (resource: typeof signIn | typeof signUp) => {
        await resource.finalize({ navigate: ({ decorateUrl }) => router.push(decorateUrl("/user")) });
      };

      if ((signIn.status as string) === "complete") return finalize(signIn);


      if (signUp.isTransferable) {
        await signIn.create({ transfer: true });
        if (signIn.status === "complete") return finalize(signIn);
        return router.push("/login");
      }

      if (signIn.isTransferable) {
        await signUp.create({ transfer: true });
        if (signUp.status === "complete") return finalize(signUp);
        return router.push("/register"); // Google didn't supply something Clerk requires
      }

      if (signUp.status === "complete") return finalize(signUp);

      return router.push("/login");
    })();
  }, [clerk, signIn, signUp, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <p className="text-foreground/70">Finishing sign-in…</p>
      <div id="clerk-captcha" />
    </div>
  );
}