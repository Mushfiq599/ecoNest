import { Card } from "@heroui/react";
import { Sparkles, LineChart, Leaf, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI Search & Recommendations",
    description: "Describe what you need in plain language and get eco-rated product matches with clear reasoning.",
  },
  {
    icon: LineChart,
    title: "Impact Tracking",
    description: "See your estimated carbon footprint shift over time as your purchasing habits change.",
  },
  {
    icon: Leaf,
    title: "Eco-Score on Everything",
    description: "Every product carries a transparent 0–100 sustainability score, not vague marketing claims.",
  },
  {
    icon: ShieldCheck,
    title: "Vetted Categories",
    description: "Home, fashion, food, and transport — curated so you don't have to fact-check every label.",
  },
];

export function FeaturesSection() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-foreground">Built around AI, not bolted on</h2>
        <p className="mt-3 text-foreground/70">
          EcoNest uses AI where it actually helps — finding the right product and understanding
          your impact — not as a gimmick.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card key={feature.title} variant="secondary" className="h-full">
              <Card.Header>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Icon size={20} />
                </div>
              </Card.Header>
              <Card.Content>
                <Card.Title>{feature.title}</Card.Title>
                <Card.Description>{feature.description}</Card.Description>
              </Card.Content>
            </Card>
          );
        })}
      </div>
    </section>
  );
}