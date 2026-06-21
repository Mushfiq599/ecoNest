"use client";

import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";

export function useSubmitContact() {
  return useMutation({
    mutationFn: async (payload: { name: string; email: string; message: string }) => {
      const { data } = await apiClient.post("/contact", payload);
      return data;
    },
  });
}