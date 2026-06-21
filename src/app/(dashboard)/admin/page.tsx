"use client";

import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Users, Package, Sparkles, Leaf } from "lucide-react";
import { Card, Skeleton } from "@heroui/react";
import { StatCard } from "@/components/cards/StatCard";
import { useAdminStats, useUserGrowth, useCategoryBreakdown } from "@/hooks/useAdmin";

const COLORS = ["var(--accent)", "#739072", "#A0B1A2", "#D9A23B"];

function bucketSignupsByDay(users: { createdAt: string }[]) {
  const days: { date: string; count: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const count = users.filter((u) => new Date(u.createdAt).toDateString() === d.toDateString()).length;
    days.push({ date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }), count });
  }
  return days;
}

export default function AdminDashboardPage() {
  const { data: stats, isLoading: statsLoading } = useAdminStats();
  const { data: growth, isLoading: growthLoading } = useUserGrowth();
  const { data: breakdown, isLoading: breakdownLoading } = useCategoryBreakdown();

  const signupData = growth ? bucketSignupsByDay(growth) : [];
  const categoryData = (breakdown ?? []).map((b) => ({ name: b._id, value: b.count }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Admin Overview</h1>
        <p className="text-foreground/70">Platform-wide stats and activity.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsLoading ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-xl" />)
        ) : (
          <>
            <StatCard icon={Users} label="Total Users" value={String(stats?.totalUsers ?? 0)} />
            <StatCard icon={Package} label="Total Products" value={String(stats?.totalProducts ?? 0)} />
            <StatCard icon={Sparkles} label="AI Queries" value={String(stats?.totalAIQueries ?? 0)} />
            <StatCard icon={Leaf} label="Avg Eco-Score" value={`${stats?.avgEcoScore ?? 0}/100`} />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card variant="default">
          <Card.Header><Card.Title>New Signups (Last 7 Days)</Card.Title></Card.Header>
          <Card.Content >
            {growthLoading ? (
              <Skeleton className="h-full w-full rounded-lg" />
            ) : (
              <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={signupData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="date" stroke="var(--foreground)" fontSize={12} />
                  <YAxis stroke="var(--foreground)" fontSize={12} allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="var(--accent)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              </div>
            )}
          </Card.Content>
        </Card>

        <Card variant="default">
          <Card.Header><Card.Title>Products by Category</Card.Title></Card.Header>
          <Card.Content >
            {breakdownLoading ? (
              <Skeleton className="h-full w-full rounded-lg" />
            ) : categoryData.length === 0 ? (
              <div className="flex h-full items-center justify-center text-sm text-foreground/50">No products yet</div>
            ) : (
              <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80}>
                    {categoryData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              </div>
            )}
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}