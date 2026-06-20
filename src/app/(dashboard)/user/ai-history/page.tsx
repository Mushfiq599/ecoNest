"use client";

import { useState } from "react";
import { Card, Skeleton } from "@heroui/react";
import { ChevronDown, Sparkles } from "lucide-react";
import { useAIHistory } from "@/hooks/useAI";

export default function AIHistoryPage() {
  const { data: history, isLoading } = useAIHistory();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">AI History</h1>
      <p className="text-foreground/70">Every AI search and impact analysis you've run.</p>

      <Card variant="default" className="mt-6">
        <Card.Content className="overflow-x-auto p-0">
          {isLoading ? (
            <div className="space-y-2 p-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded-lg" />
              ))}
            </div>
          ) : !history || history.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-20 text-center">
              <Sparkles className="text-foreground/40" size={28} />
              <p className="font-medium text-foreground">No AI activity yet</p>
              <p className="text-sm text-foreground/60">Try the AI search bar on the homepage to get started.</p>
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-foreground/60">
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Query</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <>
                    <tr
                      key={item._id}
                      className="cursor-pointer border-b border-border/50 hover:bg-surface-secondary"
                      onClick={() => setExpandedId(expandedId === item._id ? null : item._id)}
                    >
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium capitalize text-accent">
                          {item.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-foreground/80">{item.query}</td>
                      <td className="px-4 py-3 text-foreground/60">{new Date(item.createdAt).toLocaleString()}</td>
                      <td className="px-4 py-3 text-right">
                        <ChevronDown
                          size={16}
                          className={`text-foreground/50 transition-transform ${expandedId === item._id ? "rotate-180" : ""}`}
                        />
                      </td>
                    </tr>
                    {expandedId === item._id && (
                      <tr className="border-b border-border/50 bg-surface-secondary">
                        <td colSpan={4} className="px-4 py-3">
                          <pre className="overflow-x-auto whitespace-pre-wrap text-xs text-foreground/70">
                            {JSON.stringify(item.response, null, 2)}
                          </pre>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          )}
        </Card.Content>
      </Card>
    </div>
  );
}