"use client";

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Sparkles, Leaf, Cloud, CalendarDays } from "lucide-react";
import { Card, Skeleton } from "@heroui/react";
import { StatCard } from "@/components/cards/StatCard";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useAIHistory } from "@/hooks/useAI";
import { useImpactLogs } from "@/hooks/useImpact";

function getLast7DaysUsage(history: { createdAt: string }[]) {
  const days: { date: string; count: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const count = history.filter((h) => new Date(h.createdAt).toDateString() === d.toDateString()).length;
    days.push({ date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }), count });
  }
  return days;
}

export default function UserDashboardPage() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: history, isLoading: historyLoading } = useAIHistory();
  const { data: impactLogs, isLoading: impactLoading } = useImpactLogs();

  const usageData = history ? getLast7DaysUsage(history) : [];
  const impactData = (impactLogs ?? []).map((log) => ({
    date: new Date(log.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    score: log.overallScore,
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
        <p className="text-foreground/70">Here's how your sustainability journey is going.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsLoading ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-xl" />)
        ) : (
          <>
            <StatCard icon={Sparkles} label="AI Searches" value={String(stats?.aiSearchCount ?? 0)} />
            <StatCard
              icon={Leaf}
              label="Impact Score"
              value={stats?.latestImpactScore != null ? `${stats.latestImpactScore}/100` : "Not analyzed"}
            />
            <StatCard icon={Cloud} label="Est. CO2 Footprint" value={stats?.carbonFootprint ?? "—"} />
            <StatCard
              icon={CalendarDays}
              label="Member Since"
              value={stats?.memberSince ? new Date(stats.memberSince).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "—"}
            />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card variant="default">
          <Card.Header>
            <Card.Title>AI Usage (Last 7 Days)</Card.Title>
          </Card.Header>
          <Card.Content className="h-64">
            {historyLoading ? (
              <Skeleton className="h-full w-full rounded-lg" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={usageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="date" stroke="var(--foreground)" fontSize={12} />
                  <YAxis stroke="var(--foreground)" fontSize={12} allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="var(--accent)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </Card.Content>
        </Card>

        <Card variant="default">
          <Card.Header>
            <Card.Title>Impact Score Over Time</Card.Title>
          </Card.Header>
          <Card.Content className="h-64">
            {impactLoading ? (
              <Skeleton className="h-full w-full rounded-lg" />
            ) : impactData.length === 0 ? (
              <div className="flex h-full items-center justify-center text-sm text-foreground/50">
                No impact analyses yet
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={impactData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="date" stroke="var(--foreground)" fontSize={12} />
                  <YAxis domain={[0, 100]} stroke="var(--foreground)" fontSize={12} />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="var(--accent)" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </Card.Content>
        </Card>
      </div>

      <Card variant="default">
        <Card.Header>
          <Card.Title>Recent AI Activity</Card.Title>
        </Card.Header>
        <Card.Content className="overflow-x-auto">
          {historyLoading ? (
            <Skeleton className="h-32 w-full rounded-lg" />
          ) : !history || history.length === 0 ? (
            <p className="py-6 text-center text-sm text-foreground/50">
              No AI activity yet — try the AI search on the homepage.
            </p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-foreground/60">
                  <th className="py-2 pr-4 font-medium">Type</th>
                  <th className="py-2 pr-4 font-medium">Query</th>
                  <th className="py-2 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {history.slice(0, 5).map((item) => (
                  <tr key={item._id} className="border-b border-border/50 last:border-0">
                    <td className="py-2.5 pr-4">
                      <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent capitalize">
                        {item.type}
                      </span>
                    </td>
                    <td className="py-2.5 pr-4 text-foreground/80">{item.query}</td>
                    <td className="py-2.5 text-foreground/60">{new Date(item.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card.Content>
      </Card>
    </div>
  );
}