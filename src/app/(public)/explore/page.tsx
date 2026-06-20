"use client";

import { useEffect, useRef } from "react";
import { Input, TextField, Select, Label, ListBox, Slider, Skeleton } from "@heroui/react";
import { Search } from "lucide-react";
import { ProductCard } from "@/components/cards/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { useDebounce } from "@/hooks/useDebounce";
import { useProductStore } from "@/store/productStore";

const categories = [
  { id: "all", label: "All Categories" },
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
    search, category, minPrice, maxPrice, minEcoScore, sort,
    setSearch, setCategory, setPriceRange, setMinEcoScore, setSort,
  } = useProductStore();

  const debouncedSearch = useDebounce(search, 300);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useProducts({
    search: debouncedSearch || undefined,
    category: category === "all" ? undefined : category,
    minPrice,
    maxPrice,
    minEcoScore: minEcoScore || undefined,
    sort,
  });

  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const products = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-foreground">Explore Products</h1>
      <p className="mt-1 text-foreground/70">Browse vetted eco-friendly products across every category.</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-6 lg:sticky lg:top-20 lg:h-fit">
          <TextField aria-label="Search products">
            <Input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </TextField>

          <Select placeholder="Category" selectedKey={category} onSelectionChange={(key) => setCategory(key as typeof category)}>
            <Label>Category</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {categories.map((c) => (
                  <ListBox.Item key={c.id} id={c.id} textValue={c.label}>
                    {c.label}
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>

          <Slider
            value={[minPrice, maxPrice]}
            onChange={(value) => {
              const [min, max] = value as number[];
              setPriceRange(min, max);
            }}
            minValue={0}
            maxValue={1000}
            step={10}
          >
            <Label>Price Range</Label>
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
            <Label>Minimum Eco-Score</Label>
            <Slider.Output />
            <Slider.Track>
              <Slider.Fill />
              <Slider.Thumb />
            </Slider.Track>
          </Slider>

          <Select placeholder="Sort by" selectedKey={sort} onSelectionChange={(key) => setSort(key as typeof sort)}>
            <Label>Sort By</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {sortOptions.map((s) => (
                  <ListBox.Item key={s.id} id={s.id} textValue={s.label}>
                    {s.label}
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </aside>

        <div>
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
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

              <div ref={loadMoreRef} className="mt-8">
                {isFetchingNextPage && (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Skeleton key={i} className="aspect-[4/3] w-full rounded-xl" />
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}