"use client";

import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "./useApiClient";
import { ImpactLogEntry } from "@/types";

export function useImpactLogs() {
  const api = useApiClient();
  return useQuery({
    queryKey: ["impact-logs"],
    queryFn: async () => {
      const { data } = await api.get<{ success: boolean; data: ImpactLogEntry[] }>("/impact/logs");
      return data.data;
    },
  });
}