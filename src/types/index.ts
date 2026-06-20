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