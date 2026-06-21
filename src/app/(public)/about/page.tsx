import { Leaf, Target, Users, Sparkles } from "lucide-react";

export const metadata = {
  title: "About",
  description: "Why we built EcoNest and how it helps you make better sustainability decisions.",
};

const values = [
  {
    icon: Target,
    title: "Evidence over marketing",
    description: "Eco-scores are computed from sourcing, manufacturing, and packaging data — not self-declared green claims.",
  },
  {
    icon: Sparkles,
    title: "AI that explains itself",
    description: "Every recommendation comes with a reason, not just a ranking.",
  },
  {
    icon: Users,
    title: "Built for real habits",
    description: "Small, sustainable swaps you'll actually keep, not an all-or-nothing lifestyle overhaul.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <Leaf className="mx-auto text-accent" size={32} />
        <h1 className="mt-4 text-3xl font-bold text-foreground">Why EcoNest exists</h1>
        <p className="mt-4 text-foreground/70">
          Most "sustainable" shopping advice asks you to do more research than buying the product in
          the first place — cross-referencing certifications, supply chains, and conflicting marketing
          claims just to make one purchase decision. EcoNest exists to do that research for you, and to
          be upfront about what it doesn't know yet.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {values.map((v) => {
          const Icon = v.icon;
          return (
            <div key={v.title} className="rounded-2xl border border-border bg-surface p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Icon size={20} />
              </div>
              <h2 className="mt-3 font-semibold text-foreground">{v.title}</h2>
              <p className="mt-1 text-sm text-foreground/70">{v.description}</p>
            </div>
          );
        })}
      </div>

      <div className="mx-auto mt-12 max-w-2xl space-y-4 text-foreground/80">
        <h2 className="text-xl font-semibold text-foreground">How it works</h2>
        <p>
          Every product on EcoNest carries an eco-score from 0–100, built from category-specific
          factors like material sourcing, manufacturing footprint, and packaging — not a single
          generic "green" label. The AI Sustainability Advisor uses that same data to answer specific
          questions in plain language, and the Impact Analyzer estimates your personal footprint from
          a description of your habits, with suggestions weighted toward changes that actually move
          the number.
        </p>
        <p>
          We're early — the product catalog and AI features are both actively growing — but the
          principle stays the same: show our reasoning, don't just tell you to "go green."
        </p>
      </div>
    </div>
  );
}