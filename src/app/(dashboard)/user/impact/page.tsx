"use client";

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, Skeleton } from "@heroui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useImpactLogs } from "@/hooks/useImpact";
import { EcoAnalyzer } from "@/components/ai/EcoAnalyzer";

export default function ImpactPage() {
  const { data: logs, isLoading } = useImpactLogs();
  const queryClient = useQueryClient();
  const latest = logs?.[logs.length - 1];

  const categoryData = latest
    ? [
        { category: "Home", score: latest.categoryScores.home },
        { category: "Fashion", score: latest.categoryScores.fashion },
        { category: "Food", score: latest.categoryScores.food },
        { category: "Transport", score: latest.categoryScores.transport },
      ]
    : [];

  const trendData = (logs ?? []).map((log) => ({
    date: new Date(log.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    score: log.overallScore,
  }));

  const refreshImpact = () => queryClient.invalidateQueries({ queryKey: ["impact-logs"] });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/3 rounded-md" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  if (!latest) {
    return (
      <div className="mx-auto max-w-xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Your Impact</h1>
          <p className="text-foreground/70">Run your first analysis to see your sustainability score.</p>
        </div>
        <EcoAnalyzer onComplete={refreshImpact} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Your Impact</h1>
        <p className="text-foreground/70">Estimated footprint: {latest.carbonFootprint}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card variant="default">
          <Card.Header>
            <Card.Title>Score by Category</Card.Title>
          </Card.Header>
          <Card.Content >
            <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="category" stroke="var(--foreground)" fontSize={12} />
                <YAxis domain={[0, 100]} stroke="var(--foreground)" fontSize={12} />
                <Tooltip />
                <Bar dataKey="score" fill="var(--accent)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            </div>
          </Card.Content>
        </Card>

        <Card variant="default">
          <Card.Header>
            <Card.Title>Score Trend</Card.Title>
          </Card.Header>
          <Card.Content >
            <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="date" stroke="var(--foreground)" fontSize={12} />
                <YAxis domain={[0, 100]} stroke="var(--foreground)" fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="var(--accent)" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
            </div>
          </Card.Content>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card variant="secondary">
          <Card.Header>
            <Card.Title>Suggestions</Card.Title>
          </Card.Header>
          <Card.Content>
            <ul className="space-y-2 text-sm text-foreground/80">
              {latest.suggestions.map((s, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-accent">•</span> {s}
                </li>
              ))}
            </ul>
          </Card.Content>
        </Card>

        <Card variant="secondary">
          <Card.Header>
            <Card.Title>Highlights</Card.Title>
          </Card.Header>
          <Card.Content>
            <ul className="space-y-2 text-sm text-foreground/80">
              {latest.highlights.map((h, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-success">✓</span> {h}
                </li>
              ))}
            </ul>
          </Card.Content>
        </Card>
      </div>

      <EcoAnalyzer onComplete={refreshImpact} />
    </div>
  );
}