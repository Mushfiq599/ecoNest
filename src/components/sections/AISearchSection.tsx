import { AISearch } from "@/components/ai/AISearch";

export function AISearchSection() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-foreground">Ask Our AI Sustainability Advisor</h2>
        <p className="mt-2 text-foreground/70">
          Describe what you need — get eco-rated recommendations with real reasoning, not guesswork.
        </p>
      </div>
      <div className="mt-8">
        <AISearch />
      </div>
    </section>
  );
}