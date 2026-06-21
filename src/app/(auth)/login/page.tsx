"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSignIn } from "@clerk/nextjs";
import { Form, TextField, Label, Input, FieldError, Button, Surface } from "@heroui/react";
import { getClerkErrorMessage } from "@/lib/utils/clerk-errors";
import { AuthSidePanel } from "@/components/auth/AuthSidePanel";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn } = useSignIn();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const completeSignIn = async () => {
    const redirectUrl = searchParams.get("redirect_url");
    await signIn.finalize({
      navigate: ({ decorateUrl }) => router.push(decorateUrl(redirectUrl || "/user")),
    });
  };

  const onSubmit = async (data: LoginForm) => {
    setServerError(null);
    setIsSubmitting(true);

    const { error } = await signIn.password({
      emailAddress: data.email,
      password: data.password,
    });

    if (error) {
      setServerError(getClerkErrorMessage(error, "Check your email and password and try again."));
      setIsSubmitting(false);
      return;
    }

    if (signIn.status === "complete") {
      await completeSignIn();
      return;
    }

    if (signIn.status === "needs_new_password") {
      setServerError(
        "This account needs a password reset before signing in. Use 'Forgot password' or contact support."
      );
      setIsSubmitting(false);
      return;
    }

    setServerError("Additional verification is required for this account.");
    setIsSubmitting(false);
  };

  const handleGoogleSignIn = async () => {
    const { error } = await signIn.sso({
      strategy: "oauth_google",
      redirectCallbackUrl: "/sso-callback",
      redirectUrl: "/user",
    });
    if (error) setServerError("Google sign-in failed. Please try again.");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <AuthSidePanel
      title="Live sustainably, one choice at a time"
      description="Track your impact, get AI-powered recommendations, and join a community making real change."
    />
    <div className="flex w-full items-center justify-center px-4 py-12 lg:w-1/2">
      <Surface className="w-full max-w-md space-y-6 rounded-2xl p-8">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-semibold text-foreground">Welcome back</h1>
          <p className="text-sm text-foreground/70">Sign in to your EcoNest account</p>
        </div>

        {serverError && (
          <div className="rounded-lg bg-danger/10 px-4 py-3 text-sm text-danger">{serverError}</div>
        )}

        <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <TextField isInvalid={!!errors.email}>
            <Label>Email</Label>
            <Input type="email" variant="secondary" placeholder="you@example.com" {...register("email")} />
            {errors.email && <FieldError>{errors.email.message}</FieldError>}
          </TextField>

          <TextField isInvalid={!!errors.password}>
            <Label>Password</Label>
            <Input type="password" variant="secondary" placeholder="••••••••" {...register("password")} />
            {errors.password && <FieldError>{errors.password.message}</FieldError>}
          </TextField>

          <Button type="submit" fullWidth isPending={isSubmitting}>
            Sign In
          </Button>
        </Form>

        <div className="flex items-center gap-3 text-xs text-foreground/50">
          <div className="h-px flex-1 bg-border" />OR<div className="h-px flex-1 bg-border" />
        </div>

        <Button variant="outline" fullWidth onPress={handleGoogleSignIn}>
          Continue with Google
        </Button>

        <p className="text-center text-sm text-foreground/70">
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-accent hover:underline">Register</a>
        </p>
      </Surface>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}