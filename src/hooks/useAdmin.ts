"use client";

import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "./useApiClient";
import { AdminStats } from "@/types";

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