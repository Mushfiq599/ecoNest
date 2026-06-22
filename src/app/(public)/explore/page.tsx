"use client";

import { useState, useEffect } from "react";
import { Input, TextField, Slider, Skeleton, Pagination } from "@heroui/react";
import { Search } from "lucide-react";
import { ProductCard } from "@/components/cards/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { useDebounce } from "@/hooks/useDebounce";
import { useProductStore } from "@/store/productStore";
import { ProductCategory } from "@/types";

const categoryOptions: { id: ProductCategory; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "fashion", label: "Fashion" },
  { id: "food", label: "Food" },
  { id: "transport", label: "Transport" },
];

const sortOptions = [
  { id: "newest", label: "Newest" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "rating", label: "Highest Rated" },
];

export default function ExplorePage() {
  const {
    search, categories, minPrice, maxPrice, minEcoScore, sort,
    setSearch, toggleCategory, setPriceRange, setMinEcoScore, setSort,
  } = useProductStore();

  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, categories, minPrice, maxPrice, minEcoScore, sort]);

  const { data, isLoading } = useProducts({
    search: debouncedSearch || undefined,
    category: categories.length > 0 ? categories.join(",") : undefined,
    minPrice,
    maxPrice,
    minEcoScore: minEcoScore || undefined,
    sort,
    page,
  });

  const products = data?.data ?? [];
  const totalPages = data ? Math.max(1, Math.ceil(data.pagination.total / data.pagination.limit)) : 1;

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-foreground">Explore Products</h1>
      <p className="mt-1 text-foreground/70">Browse vetted eco-friendly products across every category.</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-6 lg:sticky lg:top-20 lg:h-fit">
          <TextField aria-label="Search products">
            <Input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </TextField>

          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Category</p>
            {categoryOptions.map((c) => (
              <label key={c.id} className="flex items-center gap-2 text-sm text-foreground/80">
                <input
                  type="checkbox"
                  checked={categories.includes(c.id)}
                  onChange={() => toggleCategory(c.id)}
                  style={{ accentColor: "var(--accent)" }}
                  className="h-4 w-4 rounded"
                />
                {c.label}
              </label>
            ))}
          </div>

          <Slider
            value={[minPrice, maxPrice]}
            onChange={(value) => {
  const [min, max] = value as number[];
  setPriceRange(min ?? 0, max ?? 1000);
}}
            minValue={0}
            maxValue={1000}
            step={10}
          >
            <p className="text-sm font-medium text-foreground">Price Range</p>
            <Slider.Output>{({ state }) => state.values.map((v) => `$${v}`).join(" – ")}</Slider.Output>
            <Slider.Track>
              {({ state }) => (
                <>
                  <Slider.Fill />
                  {state.values.map((_, i) => (
                    <Slider.Thumb key={i} index={i} />
                  ))}
                </>
              )}
            </Slider.Track>
          </Slider>

          <Slider value={minEcoScore} onChange={(value) => setMinEcoScore(value as number)} minValue={0} maxValue={100} step={5}>
            <p className="text-sm font-medium text-foreground">Minimum Eco-Score</p>
            <Slider.Output />
            <Slider.Track>
              <Slider.Fill />
              <Slider.Thumb />
            </Slider.Track>
          </Slider>

          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Sort By</p>
            {sortOptions.map((s) => (
              <label key={s.id} className="flex items-center gap-2 text-sm text-foreground/80">
                <input
                  type="radio"
                  name="sort"
                  checked={sort === s.id}
                  onChange={() => setSort(s.id as typeof sort)}
                  style={{ accentColor: "var(--accent)" }}
                />
                {s.label}
              </label>
            ))}
          </div>
        </aside>

        <div>
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="aspect-[4/3] w-full rounded-xl" />
                  <Skeleton className="h-4 w-2/3 rounded-md" />
                  <Skeleton className="h-4 w-full rounded-md" />
                  <Skeleton className="h-8 w-1/3 rounded-md" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-surface-secondary py-20 text-center">
              <Search className="text-foreground/40" size={32} />
              <p className="font-medium text-foreground">No products match your filters</p>
              <p className="text-sm text-foreground/60">Try adjusting your search or price range.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-10 flex justify-center">
                  <Pagination>
                    <Pagination.Content>
                      <Pagination.Item>
                        <Pagination.Previous isDisabled={page === 1} onPress={() => setPage((p) => Math.max(1, p - 1))}>
                          <Pagination.PreviousIcon />
                        </Pagination.Previous>
                      </Pagination.Item>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <Pagination.Item key={p}>
                          <Pagination.Link isActive={page === p} onPress={() => setPage(p)}>
                            {p}
                          </Pagination.Link>
                        </Pagination.Item>
                      ))}
                      <Pagination.Item>
                        <Pagination.Next isDisabled={page === totalPages} onPress={() => setPage((p) => Math.min(totalPages, p + 1))}>
                          <Pagination.NextIcon />
                        </Pagination.Next>
                      </Pagination.Item>
                    </Pagination.Content>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}