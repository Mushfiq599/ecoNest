"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";
import { Product, ProductsResponse } from "@/types";

interface UseProductsParams {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minEcoScore?: number;
  sort?: string;
}

export function useProducts(params: UseProductsParams) {
  return useInfiniteQuery({
    queryKey: ["products", params],
    queryFn: async ({ pageParam }) => {
      const { data } = await apiClient.get<ProductsResponse>("/products", {
        params: { ...params, page: pageParam, limit: 12 },
      });
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasMore ? lastPage.pagination.page + 1 : undefined,
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await apiClient.get<{ success: boolean; data: Product }>(`/products/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
}

export function useRelatedProducts(id: string) {
  return useQuery({
    queryKey: ["related-products", id],
    queryFn: async () => {
      const { data } = await apiClient.get<{ success: boolean; data: Product[] }>(`/products/${id}/related`);
      return data.data;
    },
    enabled: !!id,
  });
}