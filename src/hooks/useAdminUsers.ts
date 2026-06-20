"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "./useApiClient";
import { AdminUser, UsersResponse } from "@/types";

export function useAdminUsers(params: { search?: string; role?: string }) {
  const api = useApiClient();
  return useQuery({
    queryKey: ["admin-users", params],
    queryFn: async () => {
      const { data } = await api.get<UsersResponse>("/users", { params: { ...params, limit: 10 } });
      return data;
    },
  });
}

export function useUpdateUserRole() {
  const api = useApiClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, role }: { id: string; role: "user" | "admin" }) => {
      const { data } = await api.patch<{ success: boolean; data: AdminUser }>(`/users/${id}/role`, { role });
      return data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-users"] }),
  });
}

export function useDeleteUser() {
  const api = useApiClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/users/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-users"] }),
  });
}