"use client";

import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "./useApiClient";
import { AIHistoryItem } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface AISearchResult {
  recommendations: { name: string; ecoScore: number; reasoning: string; price: number; category: string }[];
  followUpQuestions: string[];
  advice: string;
}

export function useAISearch() {
  const api = useApiClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (query: string) => {
      const { data } = await api.post<{ success: boolean; data: AISearchResult }>("/ai/search", { query });
      return data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["ai-history"] }),
  });
}

export interface ImpactAnalysisResult {
  overallScore: number;
  categoryScores: { home: number; fashion: number; food: number; transport: number };
  carbonFootprint: string;
  suggestions: string[];
  highlights: string[];
}

export function useImpactAnalysis() {
  const api = useApiClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (description: string) => {
      const { data } = await api.post<{ success: boolean; data: ImpactAnalysisResult }>("/ai/analyze", { description });
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ai-history"] });
      queryClient.invalidateQueries({ queryKey: ["impact-logs"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
  });
}

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