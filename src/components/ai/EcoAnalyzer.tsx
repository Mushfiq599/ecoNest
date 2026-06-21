"use client";

import { useState } from "react";
import { TextField, TextArea, Label, Button, Card, Skeleton } from "@heroui/react";
import { Leaf, Sparkles } from "lucide-react";
import { useImpactAnalysis } from "@/hooks/useAI";

export function EcoAnalyzer({ onComplete }: { onComplete?: () => void }) {
  const [description, setDescription] = useState("");
  const analyze = useImpactAnalysis();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim().length < 10) return;
    analyze.mutate(description, { onSuccess: () => onComplete?.() });
  };

  return (
    <Card variant="default">
      <Card.Header>
        <Card.Title className="flex items-center gap-2">
          <Sparkles size={18} className="text-accent" /> AI Impact Analyzer
        </Card.Title>
      </Card.Header>
      <Card.Content className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          <TextField>
            <Label>Describe your typical purchases and habits</Label>
            <TextArea
              placeholder="e.g. I mostly buy fast fashion, drive to work daily, eat meat most days, and rarely recycle..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </TextField>
          <Button
            type="submit"
            variant="primary"
            isPending={analyze.isPending}
            isDisabled={description.trim().length < 10}
          >
            <Leaf size={16} className="mr-1" /> Analyze My Impact
          </Button>
        </form>

        {analyze.isPending && <Skeleton className="h-24 w-full rounded-lg" />}
        {analyze.isError && <p className="text-sm text-danger">Analysis failed. Please try again.</p>}
      </Card.Content>
    </Card>
  );
}