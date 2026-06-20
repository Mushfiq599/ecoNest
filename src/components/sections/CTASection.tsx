"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Button } from "@heroui/react";

export function CTASection() {
  const router = useRouter();
  const { isSignedIn } = useUser();

  if (isSignedIn) return null;

  return (
    <section className="mx-auto max-w-[1400px] px-4 pb-20 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-4 rounded-3xl bg-surface-secondary px-6 py-14 text-center">
        <h2 className="text-3xl font-bold text-foreground">Ready to make smarter choices?</h2>
        <p className="max-w-md text-foreground/70">
          Join EcoNest and start tracking your impact today — it takes less than a minute.
        </p>
        <Button size="lg" variant="primary" onPress={() => router.push("/register")}>
          Create Free Account
        </Button>
      </div>
    </section>
  );
}