"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { TextField, Input, Button, Card, Skeleton } from "@heroui/react";
import { Sparkles, Send, Leaf } from "lucide-react";
import { useAISearch } from "@/hooks/useAI";

export function AISearch() {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const search = useAISearch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    search.mutate(query);
  };

  if (!isSignedIn) {
    return (
      <Card variant="secondary" className="mx-auto max-w-2xl">
        <Card.Content className="flex flex-col items-center gap-3 py-10 text-center">
          <Sparkles className="text-accent" size={28} />
          <p className="font-medium text-foreground">Sign in to ask the AI advisor</p>
          <Button variant="primary" onPress={() => router.push("/login")}>
            Sign In
          </Button>
        </Card.Content>
      </Card>
    );
  }

  return (
    <Card variant="default" className="mx-auto max-w-2xl">
      <Card.Content className="space-y-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <TextField className="flex-1" aria-label="Ask the AI sustainability advisor">
            <Input
              placeholder="e.g. I need a sustainable gift under $30"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </TextField>
          <Button type="submit" variant="primary" isPending={search.isPending} isIconOnly>
            <Send size={16} />
          </Button>
        </form>

        {search.isPending && (
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4 rounded-md" />
            <Skeleton className="h-20 w-full rounded-lg" />
          </div>
        )}

        {search.isError && <p className="text-sm text-danger">Something went wrong. Please try again.</p>}

        {search.data && (
          <div className="space-y-4">
            <p className="text-sm text-foreground/80">{search.data.advice}</p>

            <div className="space-y-2">
              {search.data.recommendations.map((rec, i) => (
                <div key={i} className="rounded-lg border border-border p-3">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-foreground">{rec.name}</p>
                    <span className="flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
                      <Leaf size={12} /> {rec.ecoScore}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-foreground/70">{rec.reasoning}</p>
                  <p className="mt-1 text-sm font-semibold text-foreground">${rec.price.toFixed(2)}</p>
                </div>
              ))}
            </div>

            {search.data.followUpQuestions.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {search.data.followUpQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setQuery(q);
                      search.mutate(q);
                    }}
                    className="rounded-full border border-border px-3 py-1 text-xs text-foreground/70 hover:border-accent hover:text-accent"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </Card.Content>
    </Card>
  );
}