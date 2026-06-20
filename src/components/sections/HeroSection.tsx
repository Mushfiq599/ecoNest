"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, TextField, Input } from "@heroui/react";
import { Sparkles, Search } from "lucide-react";

export function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    router.push(query ? `/explore?q=${encodeURIComponent(query)}` : "/explore");
  };

  return (
    <section className="relative flex min-h-[65vh] items-center overflow-hidden bg-gradient-to-b from-surface-secondary to-background">
      <div className="mx-auto grid w-full max-w-[1400px] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="flex flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            <Sparkles size={14} /> AI-powered sustainability advisor
          </span>

          <h1 className="mt-4 text-4xl font-bold leading-tight text-foreground sm:text-5xl">
            Live sustainably, <span className="text-accent">one smart choice</span> at a time
          </h1>

          <p className="mt-4 max-w-md text-foreground/70">
            EcoNest helps you find eco-friendly products, track your environmental impact, and
            get personalized recommendations powered by AI — no guesswork required.
          </p>

          <div className="mt-6 flex max-w-md gap-2">
            <TextField className="flex-1" aria-label="Search eco-friendly products">
              <Input
                placeholder="Ask EcoNest: 'best reusable water bottles'"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </TextField>
            <Button onPress={handleSearch} variant="primary">
              <Search size={16} />
            </Button>
          </div>

          <div className="mt-6 flex gap-3">
            <Button variant="primary" size="lg" onPress={() => router.push("/explore")}>
              Explore Products
            </Button>
            <Button variant="outline" size="lg" onPress={() => router.push("/about")}>
              How It Works
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="relative aspect-square w-full max-w-md rounded-3xl bg-gradient-to-br from-accent/20 to-secondary/10 p-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 p-6">
                {["🌿", "♻️", "🌍", "💧"].map((emoji, i) => (
                  <div
                    key={i}
                    className="flex h-24 w-24 animate-fade-in items-center justify-center rounded-2xl bg-surface text-4xl shadow-sm"
                    style={{ animationDelay: `${i * 150}ms` }}
                  >
                    {emoji}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}