export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  content: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "reading-eco-labels",
    title: "How to actually read an eco-label (most people get this wrong)",
    excerpt: "Not all green packaging means what you think. Here's what certifications are worth trusting.",
    date: "Jun 10, 2026",
    content: [
      "Most products marked \"eco-friendly\" or \"natural\" carry no verified meaning at all — those are marketing terms, not certifications. There's no regulatory body checking whether a bag of chips labeled \"eco-conscious\" is actually any different from one that isn't.",
      "Real signal comes from third-party certifications with an actual audit trail: things like FSC (responsibly sourced wood/paper), GOTS (organic textiles, full supply chain), Fair Trade (labor practices), and Energy Star (verified energy efficiency). These require independent verification, not just a brand's say-so.",
      "A good rule of thumb: if a claim is specific and falsifiable — \"30% post-consumer recycled plastic,\" \"carbon neutral shipping verified by [named registry]\" — it's worth more than a vague claim. If a claim is vague and unfalsifiable — \"eco-friendly,\" \"green,\" \"conscious\" — treat it as marketing copy until proven otherwise.",
      "It also matters where in the lifecycle the claim applies. A product can have recyclable packaging while the product itself is resource-intensive to manufacture — packaging claims don't tell you anything about the bigger footprint underneath.",
      "On EcoNest, every eco-score is built from category-specific sourcing, manufacturing, and packaging data rather than a single self-reported label — which is exactly the gap a real certification system is supposed to close.",
    ],
  },
  {
    slug: "carbon-footprint-basics",
    title: "Your carbon footprint, explained without the jargon",
    excerpt: "A practical breakdown of where your footprint actually comes from — and what moves the needle.",
    date: "Jun 2, 2026",
    content: [
      "\"Carbon footprint\" gets thrown around a lot without much explanation. In practice, it's just a way of converting all your different activities — driving, eating, heating your home, buying things — into one comparable unit: kilograms of CO2-equivalent (kg CO2e).",
      "For most people, footprint breaks down roughly into four buckets: home energy use, transportation, food (especially meat and dairy, which carry a disproportionately large footprint relative to other food groups), and the goods and services you buy.",
      "Not all reductions are equal. Switching to reusable shopping bags is a real, positive habit — but it moves the needle far less than, say, one fewer long-haul flight per year, switching a daily commute from driving to transit, or improving home insulation. The highest-leverage changes tend to be the ones people think about least, because they're less visible day to day than the the visible \"green\" habits.",
      "Individual offsetting (planting trees, buying carbon credits) is generally a smaller lever than direct behavior change — the carbon credit market has real quality and verification problems, while reducing your own emissions is unambiguous.",
      "This is the same logic behind EcoNest's Impact Analyzer: instead of generic tips, it estimates where your specific footprint is concentrated and prioritizes suggestions by where the actual leverage is, rather than listing every possible eco-tip regardless of impact.",
    ],
  },
  {
    slug: "fashion-swaps-that-matter",
    title: "5 fashion swaps that matter more than 'buying less'",
    excerpt: "Reducing consumption helps, but these specific swaps compound faster than people expect.",
    date: "May 24, 2026",
    content: [
      "\"Just buy less\" is true but not very actionable advice. Fast fashion's footprint comes from a combination of water-intensive production, synthetic fiber microplastic shedding, and extremely short garment lifespans — and a few specific swaps address all three at once.",
      "1. Buy secondhand first for anything non-essential. A thrifted garment has zero new-manufacturing footprint — it's the single highest-leverage swap available.",
      "2. Favor natural or genuinely recycled fibers over virgin synthetics. Polyester sheds microplastics in every wash; organic cotton, linen, and recycled-fiber blends don't carry that specific problem.",
      "3. Repair instead of replace. A $10 repair on a $60 jacket extends its life by years — and avoids both the cost and footprint of a replacement.",
      "4. Rent for one-off occasions instead of buying something you'll wear once. This is the swap people most consistently skip, and it has an outsized effect for low-frequency-use items like formal wear.",
      "5. Prioritize brands with transparent, verifiable supply chains over brands that simply say \"sustainable\" — the same greenwashing problem from packaging labels shows up heavily in fashion marketing.",
      "Why these compound faster than \"buy less\": one well-made, well-cared-for garment replacing ten short-lived ones reduces both the manufacturing footprint and the landfill footprint at the same time, without requiring you to actually own fewer clothes.",
    ],
  },
];