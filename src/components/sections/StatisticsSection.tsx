import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const stats = [
  { label: "Active members", value: 12400, suffix: "+" },
  { label: "CO₂ saved (kg)", value: 86500, suffix: "+" },
  { label: "Products vetted", value: 630, suffix: "+" },
  { label: "AI recommendations served", value: 41000, suffix: "+" },
];

export function StatisticsSection() {
  return (
    <section className="bg-accent py-16 text-accent-foreground">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-3xl font-bold sm:text-4xl">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-1 text-sm opacity-80">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}