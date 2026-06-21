"use client";

import { useState } from "react";
import { Select, Label, ListBox, Skeleton, Card, Button } from "@heroui/react";
import { ChevronDown, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useAdminAIHistory } from "@/hooks/useAdmin";

const typeOptions = [
  { id: "all", label: "All Types" },
  { id: "search", label: "Search" },
  { id: "analysis", label: "Analysis" },
];

export default function AdminAILogsPage() {
  const [type, setType] = useState("all");
  const [page, setPage] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { data, isLoading } = useAdminAIHistory({ type, page });

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">AI Logs</h1>
      <p className="text-foreground/70">Every AI search and impact analysis run across all users.</p>

      <Select
        className="mt-6 w-48"
        placeholder="Type"
        selectedKey={type}
        onSelectionChange={(key) => {
          setType(key as string);
          setPage(1);
        }}
      >
        <Label className="sr-only">Type</Label>
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            {typeOptions.map((t) => (
              <ListBox.Item key={t.id} id={t.id} textValue={t.label}>{t.label}</ListBox.Item>
            ))}
          </ListBox>
        </Select.Popover>
      </Select>

      <Card variant="default" className="mt-4">
        <Card.Content className="overflow-x-auto p-0">
          {isLoading ? (
            <div className="space-y-2 p-4">
              {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-12 w-full rounded-lg" />)}
            </div>
          ) : !data || data.data.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-16 text-center">
              <Sparkles className="text-foreground/40" size={28} />
              <p className="text-sm text-foreground/60">No AI activity logged yet</p>
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-foreground/60">
                  <th className="px-4 py-3 font-medium">User</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Query</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((item) => (
                  <>
                    <tr
                      key={item._id}
                      className="cursor-pointer border-b border-border/50 hover:bg-surface-secondary"
                      onClick={() => setExpandedId(expandedId === item._id ? null : item._id)}
                    >
                      <td className="px-4 py-3 font-mono text-xs text-foreground/60">{item.clerkId.slice(0, 12)}…</td>
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
                        <td colSpan={5} className="px-4 py-3">
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

        {data && data.pagination.total > data.pagination.limit && (
          <div className="flex items-center justify-between border-t border-border px-4 py-3 text-sm text-foreground/60">
            <span>
              Page {data.pagination.page} of {Math.ceil(data.pagination.total / data.pagination.limit)}
            </span>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" isDisabled={page === 1} onPress={() => setPage((p) => p - 1)}>
                <ChevronLeft size={16} /> Prev
              </Button>
              <Button variant="ghost" size="sm" isDisabled={!data.pagination.hasMore} onPress={() => setPage((p) => p + 1)}>
                Next <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}