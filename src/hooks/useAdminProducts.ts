"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "./useApiClient";
import { Product, ProductsResponse } from "@/types";

export function useAdminProducts(params: { search?: string }) {
  const api = useApiClient();
  return useQuery({
    queryKey: ["admin-products", params],
    queryFn: async () => {
      const { data } = await api.get<ProductsResponse>("/products", { params: { ...params, limit: 10 } });
      return data;
    },
  });
}

export function useCreateProduct() {
  const api = useApiClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Partial<Product>) => {
      const { data } = await api.post<{ success: boolean; data: Product }>("/products", payload);
      return data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-products"] }),
  });
}

export function useUpdateProduct() {
  const api = useApiClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: Partial<Product> }) => {
      const { data } = await api.put<{ success: boolean; data: Product }>(`/products/${id}`, payload);
      return data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-products"] }),
  });
}

export function useDeleteProduct() {
  const api = useApiClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/products/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-products"] }),
  });
}