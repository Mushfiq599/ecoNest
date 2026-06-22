import Link from "next/link";
import { Leaf } from "lucide-react";

export function AuthSidePanel({ title, description }: { title: string; description: string }) {
  return (
    <div className="relative hidden w-2/5 flex-col justify-between overflow-hidden bg-accent p-10 lg:flex">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-black/10 blur-3xl" />

      <Link href="/" className="relative z-10 flex items-center gap-2 font-semibold text-accent-foreground">
        <Leaf className="h-6 w-6" />
        <span className="text-lg">EcoNest</span>
      </Link>

      <div className="relative z-10 animate-fade-in text-accent-foreground">
        <h2 className="text-3xl font-bold leading-tight sm:text-4xl">{title}</h2>
        <p className="mt-3 max-w-sm text-accent-foreground/80">{description}</p>
      </div>

      <p className="relative z-10 text-xs text-accent-foreground/60">
        © {new Date().getFullYear()} EcoNest. All rights reserved.
      </p>
    </div>
  );
}