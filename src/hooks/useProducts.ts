"use client";

import { useInfiniteQuery, useQuery, keepPreviousData} from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";
import { Product, ProductsResponse } from "@/types";



interface UseProductsParams {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minEcoScore?: number;
  sort?: string;
  page: number;
}

export function useProducts(params: UseProductsParams) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: async () => {
      const { data } = await apiClient.get<ProductsResponse>("/products", {
        params: { ...params, limit: 12 },
      });
      return data;
    },
    placeholderData: keepPreviousData,
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