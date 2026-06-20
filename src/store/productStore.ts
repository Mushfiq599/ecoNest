import { create } from "zustand";
import { ProductCategory } from "@/types";

interface ProductFilters {
  search: string;
  category: ProductCategory | "all";
  minPrice: number;
  maxPrice: number;
  minEcoScore: number;
  sort: "newest" | "price-asc" | "price-desc" | "rating";
}

interface ProductStore extends ProductFilters {
  setSearch: (search: string) => void;
  setCategory: (category: ProductFilters["category"]) => void;
  setPriceRange: (min: number, max: number) => void;
  setMinEcoScore: (score: number) => void;
  setSort: (sort: ProductFilters["sort"]) => void;
}

const defaults: ProductFilters = {
  search: "",
  category: "all",
  minPrice: 0,
  maxPrice: 1000,
  minEcoScore: 0,
  sort: "newest",
};

export const useProductStore = create<ProductStore>((set) => ({
  ...defaults,
  setSearch: (search) => set({ search }),
  setCategory: (category) => set({ category }),
  setPriceRange: (minPrice, maxPrice) => set({ minPrice, maxPrice }),
  setMinEcoScore: (minEcoScore) => set({ minEcoScore }),
  setSort: (sort) => set({ sort }),
}));