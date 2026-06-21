"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Star, Leaf, ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton, Button } from "@heroui/react";
import { useProduct, useRelatedProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/cards/ProductCard";



export default function ProductDetailsPage() {
  const params = useParams<{ id: string }>();
  const { data: product, isLoading } = useProduct(params.id);
  const { data: related } = useRelatedProducts(params.id);
  const [activeImage, setActiveImage] = useState(0);
  const { isSignedIn } = useUser();
const router = useRouter();
const [added, setAdded] = useState(false);

const handleAddToCart = () => {
  if (!isSignedIn) {
    router.push(`/login?redirect_url=/products/${product._id}`);
    return;
  }
  setAdded(true);
  setTimeout(() => setAdded(false), 2000);
};

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <Skeleton className="aspect-square w-full rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-2/3 rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-1/2 rounded-md" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-[1400px] px-4 py-20 text-center">
        <p className="text-lg font-medium text-foreground">Product not found</p>
      </div>
    );
  }
  

  const images = product.images.length ? product.images : ["/images/placeholder-product.jpg"];

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.description,
            image: product.images,
            offers: {
              "@type": "Offer",
              price: product.price,
              priceCurrency: "USD",
              availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            },
            ...(product.ratingCount > 0 && {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: product.rating,
                reviewCount: product.ratingCount,
              },
            }),
          }),
        }}
      />

      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-surface-secondary">
            <Image
              src={images[activeImage]}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImage((i) => (i === 0 ? images.length - 1 : i - 1))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-surface/80 p-2"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setActiveImage((i) => (i === images.length - 1 ? 0 : i + 1))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-surface/80 p-2"
                  aria-label="Next image"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="mt-3 flex gap-2">
              {images.map((img, i) => (
                <button
                  key={img + i}
                  onClick={() => setActiveImage(i)}
                  className={`relative h-16 w-16 overflow-hidden rounded-lg border-2 ${
                    i === activeImage ? "border-accent" : "border-transparent"
                  }`}
                >
                  <Image src={img} alt="" fill sizes="64px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-foreground/50">{product.category}</p>
          <h1 className="mt-1 text-3xl font-bold text-foreground">{product.name}</h1>

          <div className="mt-3 flex items-center gap-4">
            <span className="flex items-center gap-1 text-sm text-foreground/70">
              <Star size={16} fill="currentColor" className="text-warning" strokeWidth={0} />
              {product.rating.toFixed(1)} ({product.ratingCount} reviews)
            </span>
            <span className="flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent">
              <Leaf size={12} /> Eco-Score {product.ecoScore}
            </span>
          </div>

          <p className="mt-4 text-2xl font-semibold text-foreground">${product.price.toFixed(2)}</p>
          <p className="mt-1 text-sm text-foreground/60">
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </p>

          <p className="mt-6 text-foreground/80">{product.description}</p>

          <Button
  variant="primary"
  size="lg"
  fullWidth
  className="mt-6"
  isDisabled={product.stock === 0}
  onPress={handleAddToCart}
>
  {added ? "Added ✓" : "Add to Cart"}
</Button>

          <div className="mt-8 rounded-xl bg-surface-secondary p-4">
            <h2 className="text-sm font-semibold text-foreground">Specifications</h2>
            <dl className="mt-2 grid grid-cols-2 gap-2 text-sm">
              <dt className="text-foreground/60">Category</dt>
              <dd className="capitalize text-foreground">{product.category}</dd>
              <dt className="text-foreground/60">Eco-Score</dt>
              <dd className="text-foreground">{product.ecoScore}/100</dd>
              <dt className="text-foreground/60">Stock</dt>
              <dd className="text-foreground">{product.stock} units</dd>
            </dl>
          </div>
        </div>
      </div>

      {related && related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-foreground">Related Products</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}