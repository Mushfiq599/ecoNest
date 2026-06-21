"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSignUp } from "@clerk/nextjs";
import { Form, TextField, Label, Input, FieldError, Button, Surface } from "@heroui/react";
import { getClerkErrorMessage } from "@/lib/utils/clerk-errors";
import { AuthSidePanel } from "@/components/auth/AuthSidePanel";

const registerSchema = z
  .object({
    fullName: z.string().min(2, "Enter your full name"),
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { signUp } = useSignUp();
  const [step, setStep] = useState<"form" | "verify">("form");
  const [code, setCode] = useState("");
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: RegisterForm) => {
    setServerError(null);
    setIsSubmitting(true);

    const [firstName, ...rest] = data.fullName.trim().split(" ");
    const lastName = rest.join(" ") || firstName;

    const { error } = await signUp.password({ emailAddress: data.email, password: data.password });

    if (error) {
      setServerError(getClerkErrorMessage(error, "We couldn't create your account. Please try again."));
      setIsSubmitting(false);
      return;
    }

    if (signUp.status === "missing_requirements") {
      await signUp.update({ firstName, lastName });
    }

    if (signUp.status === "complete") {
      await signUp.finalize({ navigate: ({ decorateUrl }) => router.push(decorateUrl("/user")) });
      return;
    }

    await signUp.verifications.sendEmailCode();
    setIsSubmitting(false);
    setStep("verify");
  };

  const handleVerify = async () => {
    setServerError(null);
    setIsSubmitting(true);

    await signUp.verifications.verifyEmailCode({ code });

    if (signUp.status === "complete") {
      await signUp.finalize({ navigate: ({ decorateUrl }) => router.push(decorateUrl("/user")) });
    } else {
      setServerError("That code didn't work. Please check it and try again.");
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignUp = async () => {
    const { error } = await signUp.sso({
      strategy: "oauth_google",
      redirectCallbackUrl: "/sso-callback",
      redirectUrl: "/user",
    });
    if (error) setServerError("Google sign-up failed. Please try again.");
  };

  if (step === "verify") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <AuthSidePanel
      title="Join EcoNest"
      description="Discover eco-rated products, track your footprint, and get AI-powered sustainability advice."
    />
    <div className="flex w-full items-center justify-center px-4 py-12 lg:w-1/2">
        <Surface className="w-full max-w-md space-y-6 rounded-2xl p-8">
          <div className="space-y-1 text-center">
            <h1 className="text-2xl font-semibold text-foreground">Verify your email</h1>
            <p className="text-sm text-foreground/70">Enter the 6-digit code we sent you</p>
          </div>

          {serverError && (
            <div className="rounded-lg bg-danger/10 px-4 py-3 text-sm text-danger">{serverError}</div>
          )}

          <TextField>
            <Label>Verification code</Label>
            <Input
              variant="secondary"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="123456"
              maxLength={6}
            />
          </TextField>

          <Button fullWidth isPending={isSubmitting} onPress={handleVerify}>
            Verify & Continue
          </Button>

          <div id="clerk-captcha" />
        </Surface>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <AuthSidePanel
      title="Almost there"
      description="Check your inbox for a 6-digit verification code to finish setting up your account."
    />
    <div className="flex w-full items-center justify-center px-4 py-12 lg:w-1/2">
      <Surface className="w-full max-w-md space-y-6 rounded-2xl p-8">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-semibold text-foreground">Create your account</h1>
          <p className="text-sm text-foreground/70">Join EcoNest and start your sustainability journey</p>
        </div>

        {serverError && (
          <div className="rounded-lg bg-danger/10 px-4 py-3 text-sm text-danger">{serverError}</div>
        )}

        <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <TextField isInvalid={!!errors.fullName}>
            <Label>Full name</Label>
            <Input variant="secondary" placeholder="Jane Doe" {...register("fullName")} />
            {errors.fullName && <FieldError>{errors.fullName.message}</FieldError>}
          </TextField>

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

          <TextField isInvalid={!!errors.confirmPassword}>
            <Label>Confirm password</Label>
            <Input type="password" variant="secondary" placeholder="••••••••" {...register("confirmPassword")} />
            {errors.confirmPassword && <FieldError>{errors.confirmPassword.message}</FieldError>}
          </TextField>

          <Button type="submit" fullWidth isPending={isSubmitting}>
            Create Account
          </Button>
        </Form>

        <div className="flex items-center gap-3 text-xs text-foreground/50">
          <div className="h-px flex-1 bg-border" />OR<div className="h-px flex-1 bg-border" />
        </div>

        <Button variant="outline" fullWidth onPress={handleGoogleSignUp}>
          Continue with Google
        </Button>

        <div id="clerk-captcha" />

        <p className="text-center text-sm text-foreground/70">
          Already have an account?{" "}
          <a href="/login" className="text-accent hover:underline">Sign in</a>
        </p>
      </Surface>
      </div>
    </div>
  );
}