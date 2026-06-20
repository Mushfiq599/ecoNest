"use client";

import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "./useApiClient";
import { DashboardStats } from "@/types";

export function useDashboardStats() {
  const api = useApiClient();
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const { data } = await api.get<{ success: boolean; data: DashboardStats }>("/users/me/stats");
      return data.data;
    },
  });
}