"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How are eco-scores calculated?",
    answer:
      "Each product's score blends material sourcing, manufacturing impact, packaging, and certifications into a single 0–100 rating, weighted by category-specific benchmarks.",
  },
  {
    question: "Is the AI recommendation feature free?",
    answer:
      "Yes — AI search and the impact analyzer are both included for every account at no extra cost during our current launch period.",
  },
  {
    question: "Where do impact numbers come from?",
    answer:
      "Your impact dashboard estimates CO₂e based on your purchase and browsing history, using category-average emissions data as a baseline.",
  },
  {
    question: "Can I suggest a product to be added?",
    answer:
      "Yes — use the Contact page to submit a product, and our team reviews submissions weekly for eco-score evaluation.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-foreground">Frequently asked questions</h2>
      </div>

      <div className="mx-auto mt-10 max-w-2xl divide-y divide-border">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={faq.question}>
              <button
                className="flex w-full items-center justify-between py-4 text-left"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
              >
                <span className="font-medium text-foreground">{faq.question}</span>
                <ChevronDown
                  size={18}
                  className={`text-foreground/60 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all ${isOpen ? "max-h-40 pb-4" : "max-h-0"}`}
              >
                <p className="text-sm text-foreground/70">{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}