import { Leaf } from "lucide-react";

export function AuthSidePanel({ title, description }: { title: string; description: string }) {
  return (
    <div className="hidden w-2/5 flex-col items-center justify-center bg-accent p-12 lg:flex">
      <div className="max-w-xs text-center text-accent-foreground">
        <Leaf className="mx-auto" size={40} />
        <h2 className="mt-6 text-3xl font-bold">{title}</h2>
        <p className="mt-3 text-accent-foreground/80">{description}</p>
      </div>
    </div>
  );
}