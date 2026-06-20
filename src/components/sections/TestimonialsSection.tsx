import { Card } from "@heroui/react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Maya R.",
    role: "Verified Member",
    quote:
      "I switched three household products in one weekend after the AI search flagged better alternatives I'd never have found on my own.",
    rating: 5,
  },
  {
    name: "Daniyal H.",
    role: "Verified Member",
    quote:
      "The impact tracker is what keeps me coming back — watching my score improve month over month is genuinely motivating.",
    rating: 5,
  },
  {
    name: "Lena P.",
    role: "Verified Member",
    quote:
      "Eco-scores instead of vague green labels. That alone makes EcoNest more trustworthy than most sustainability apps I've tried.",
    rating: 4,
  },
];

export function TestimonialsSection() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-foreground">Loved by sustainability-minded people</h2>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <Card key={t.name} variant="default">
            <Card.Content>
              <div className="flex gap-0.5 text-warning">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <Card.Description className="mt-3">“{t.quote}”</Card.Description>
            </Card.Content>
            <Card.Footer>
              <Card.Title>{t.name}</Card.Title>
              <p className="text-xs text-foreground/60">{t.role}</p>
            </Card.Footer>
          </Card>
        ))}
      </div>
    </section>
  );
}