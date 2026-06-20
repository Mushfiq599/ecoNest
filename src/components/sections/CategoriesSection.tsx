import Link from "next/link";
import { Home, Shirt, UtensilsCrossed, Car } from "lucide-react";

const categories = [
  { name: "Home", icon: Home, count: "240+ products", href: "/explore?category=home" },
  { name: "Fashion", icon: Shirt, count: "180+ products", href: "/explore?category=fashion" },
  { name: "Food", icon: UtensilsCrossed, count: "150+ products", href: "/explore?category=food" },
  { name: "Transport", icon: Car, count: "60+ products", href: "/explore?category=transport" },
];

export function CategoriesSection() {
  return (
    <section className="bg-surface-secondary py-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-foreground">Shop by category</h2>
        <p className="mt-2 text-foreground/70">Find sustainable swaps for the areas of life that matter most.</p>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                href={cat.href}
                className="group flex flex-col items-center gap-3 rounded-2xl bg-surface p-6 text-center transition-transform hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <Icon size={24} />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{cat.name}</p>
                  <p className="text-xs text-foreground/60">{cat.count}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}