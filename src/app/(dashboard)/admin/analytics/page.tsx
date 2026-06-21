"use client";

import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, Skeleton } from "@heroui/react";
import { Package, Leaf, Tag } from "lucide-react";
import { StatCard } from "@/components/cards/StatCard";
import { useAdminStats, useCategoryBreakdown, useEcoScoreDistribution } from "@/hooks/useAdmin";

const COLORS = ["var(--accent)", "#739072", "#A0B1A2", "#D9A23B"];

export default function AdminAnalyticsPage() {
  const { data: stats, isLoading: statsLoading } = useAdminStats();
  const { data: breakdown, isLoading: breakdownLoading } = useCategoryBreakdown();
  const { data: distribution, isLoading: distributionLoading } = useEcoScoreDistribution();

  const categoryData = (breakdown ?? []).map((b) => ({ name: b._id, value: b.count }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-foreground/70">A deeper look at the product catalog.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {statsLoading ? (
          Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-xl" />)
        ) : (
          <>
            <StatCard icon={Package} label="Total Products" value={String(stats?.totalProducts ?? 0)} />
            <StatCard icon={Leaf} label="Avg Eco-Score" value={`${stats?.avgEcoScore ?? 0}/100`} />
            <StatCard icon={Tag} label="Categories" value={String(categoryData.length)} />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card variant="default">
          <Card.Header><Card.Title>Eco-Score Distribution</Card.Title></Card.Header>
          <Card.Content >
            {distributionLoading ? (
              <Skeleton className="h-full w-full rounded-lg" />
            ) : (
              <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={distribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="range" stroke="var(--foreground)" fontSize={12} />
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
          <Card.Header><Card.Title>Category Breakdown</Card.Title></Card.Header>
          <Card.Content >
            {breakdownLoading ? (
              <Skeleton className="h-full w-full rounded-lg" />
            ) : categoryData.length === 0 ? (
              <div className="flex h-full items-center justify-center text-sm text-foreground/50">No products yet</div>
            ) : (
              <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={95}>
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