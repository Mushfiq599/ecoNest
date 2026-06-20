export type ProductCategory = "home" | "fashion" | "food" | "transport";

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  ecoScore: number;
  images: string[];
  rating: number;
  ratingCount: number;
  stock: number;
  createdAt: string;
}

export interface ProductsResponse {
  success: boolean;
  data: Product[];
  pagination: { page: number; limit: number; total: number; hasMore: boolean };
}
export interface AIHistoryItem {
  _id: string;
  type: "search" | "analysis";
  query: string;
  response: unknown;
  createdAt: string;
}

export interface ImpactLogEntry {
  _id: string;
  overallScore: number;
  categoryScores: { home: number; fashion: number; food: number; transport: number };
  carbonFootprint: string;
  suggestions: string[];
  highlights: string[];
  createdAt: string;
}

export interface DashboardStats {
  aiSearchCount: number;
  latestImpactScore: number | null;
  carbonFootprint: string | null;
  memberSince: string | null;
}
