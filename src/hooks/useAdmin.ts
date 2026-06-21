"use client";

import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "./useApiClient";
import { AdminStats } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AIHistoryItem, EcoScoreBucket, SystemSettings } from "@/types";

export function useAdminAIHistory(params: { type?: string; page?: number }) {
  const api = useApiClient();
  return useQuery({
    queryKey: ["admin-ai-logs", params],
    queryFn: async () => {
      const { data } = await api.get<{
        success: boolean;
        data: AIHistoryItem[];
        pagination: { page: number; limit: number; total: number; hasMore: boolean };
      }>("/admin/ai-logs", { params: { ...params, limit: 15 } });
      return data;
    },
  });
}

export function useEcoScoreDistribution() {
  const api = useApiClient();
  return useQuery({
    queryKey: ["eco-score-distribution"],
    queryFn: async () => {
      const { data } = await api.get<{ success: boolean; data: EcoScoreBucket[] }>("/admin/eco-score-distribution");
      return data.data;
    },
  });
}

export function useSettings() {
  const api = useApiClient();
  return useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      const { data } = await api.get<{ success: boolean; data: SystemSettings }>("/admin/settings");
      return data.data;
    },
  });
}

export function useUpdateSettings() {
  const api = useApiClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Partial<SystemSettings>) => {
      const { data } = await api.put<{ success: boolean; data: SystemSettings }>("/admin/settings", payload);
      return data.data;
    },
    onSuccess: (data) => queryClient.setQueryData(["settings"], data),
  });
}

export function useAdminStats() {
  const api = useApiClient();
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const { data } = await api.get<{ success: boolean; data: AdminStats }>("/admin/stats");
      return data.data;
    },
  });
}

export function useUserGrowth() {
  const api = useApiClient();
  return useQuery({
    queryKey: ["user-growth"],
    queryFn: async () => {
      const { data } = await api.get<{ success: boolean; data: { createdAt: string }[] }>("/admin/user-growth");
      return data.data;
    },
  });
}

export function useCategoryBreakdown() {
  const api = useApiClient();
  return useQuery({
    queryKey: ["category-breakdown"],
    queryFn: async () => {
      const { data } = await api.get<{ success: boolean; data: { _id: string; count: number }[] }>(
        "/admin/category-breakdown"
      );
      return data.data;
    },
  });
}