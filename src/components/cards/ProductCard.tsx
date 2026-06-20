import Image from "next/image";
import { Card, LinkButton } from "@heroui/react";
import { Star, Leaf } from "lucide-react";
import { Product } from "@/types";

const categoryLabels: Record<string, string> = {
  home: "Home",
  fashion: "Fashion",
  food: "Food",
  transport: "Transport",
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card variant="default" className="group flex h-full flex-col overflow-hidden">
      <Card.Header className="relative aspect-[4/3] overflow-hidden p-0">
        <Image
          src={product.images[0] ?? "/images/placeholder-product.jpg"}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-surface/90 px-2 py-1 text-xs font-semibold text-accent">
          <Leaf size={12} /> {product.ecoScore}
        </span>
      </Card.Header>

      <Card.Content className="flex-1">
        <p className="text-xs font-medium uppercase tracking-wide text-foreground/50">
          {categoryLabels[product.category]}
        </p>
        <Card.Title className="mt-1 line-clamp-1">{product.name}</Card.Title>
        <Card.Description className="mt-1 line-clamp-2">{product.description}</Card.Description>

        <div className="mt-3 flex items-center gap-1 text-sm text-foreground/70">
          <Star size={14} fill="currentColor" className="text-warning" strokeWidth={0} />
          {product.rating.toFixed(1)}
          <span className="text-foreground/40">({product.ratingCount})</span>
        </div>
      </Card.Content>

      <Card.Footer className="flex items-center justify-between">
        <span className="text-lg font-semibold text-foreground">${product.price.toFixed(2)}</span>
        <LinkButton href={`/products/${product._id}`} variant="outline" size="sm">
          View Details
        </LinkButton>
      </Card.Footer>
    </Card>
  );
}