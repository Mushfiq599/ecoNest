"use client";

import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "./useApiClient";
import { AIHistoryItem } from "@/types";

export function useAIHistory() {
  const api = useApiClient();
  return useQuery({
    queryKey: ["ai-history"],
    queryFn: async () => {
      const { data } = await api.get<{ success: boolean; data: AIHistoryItem[] }>("/ai/history");
      return data.data;
    },
  });
}