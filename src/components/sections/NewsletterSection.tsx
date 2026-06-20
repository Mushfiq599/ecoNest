"use client";

import { useState } from "react";
import { TextField, Input, Button } from "@heroui/react";
import { Mail, CheckCircle2 } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValid) {
      setStatus("error");
      return;
    }
    // TODO: wire to a real newsletter provider/backend endpoint
    setStatus("success");
  };

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-accent px-6 py-12 text-center text-accent-foreground sm:px-12">
        <Mail className="mx-auto" size={28} />
        <h2 className="mt-4 text-2xl font-bold sm:text-3xl">Get sustainability tips in your inbox</h2>
        <p className="mx-auto mt-2 max-w-md text-sm opacity-90">
          One email a week. No spam, no greenwashing — just what's actually worth your attention.
        </p>

        {status === "success" ? (
          <div className="mx-auto mt-6 flex max-w-md items-center justify-center gap-2 rounded-lg bg-white/10 px-4 py-3 text-sm">
            <CheckCircle2 size={18} /> You're in — check your inbox to confirm.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md gap-2">
            <TextField className="flex-1" isInvalid={status === "error"}>
              <Input
                type="email"
                variant="secondary"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setStatus("idle");
                }}
              />
            </TextField>
            <Button type="submit" variant="outline">
              Subscribe
            </Button>
          </form>
        )}
        {status === "error" && (
          <p className="mt-2 text-xs text-danger-foreground/90">Enter a valid email address.</p>
        )}
      </div>
    </section>
  );
}