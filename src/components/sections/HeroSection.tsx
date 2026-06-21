"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09",
    eyebrow: "AI-Powered Recommendations",
    title: "Find eco-friendly products in seconds",
    description: "Describe what you need and let our AI advisor match you with vetted, eco-rated products.",
    primaryCta: { label: "Try AI Search", href: "#ai-search" },
    secondaryCta: { label: "Explore Products", href: "/explore" },
  },
  {
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e",
    eyebrow: "Track Your Impact",
    title: "See your footprint shrink over time",
    description: "Run an AI impact analysis and watch your sustainability score improve month over month.",
    primaryCta: { label: "Analyze My Impact", href: "/user/impact" },
    secondaryCta: { label: "Learn More", href: "/about" },
  },
  {
    image: "https://images.unsplash.com/photo-1483794344563-d27a8d18014e",
    eyebrow: "Curated Categories",
    title: "Home, fashion, food & transport — covered",
    description: "Every product carries a transparent eco-score, not vague marketing claims.",
    primaryCta: { label: "Browse Categories", href: "/explore" },
    secondaryCta: { label: "Read Our Story", href: "/about" },
  },
];

export function HeroSection() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    timerRef.current = setInterval(next, 6000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [next]);

  const pause = () => timerRef.current && clearInterval(timerRef.current);
  const resume = () => {
    timerRef.current = setInterval(next, 6000);
  };

  return (
    <section
      className="relative h-[65vh] min-h-[480px] w-full overflow-hidden"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.title}
          className={`absolute inset-0 transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
          aria-hidden={i !== index}
        >
          <Image src={slide.image} alt="" fill priority={i === 0} sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

          <div className="relative z-10 mx-auto flex h-full max-w-[1400px] items-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg text-white">
              <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                {slide.eyebrow}
              </span>
              <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">{slide.title}</h1>
              <p className="mt-3 text-white/85">{slide.description}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild variant="primary" size="lg">
                  <Link href={slide.primaryCta.href}>{slide.primaryCta.label}</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white/40 text-white hover:bg-white/10">
                  <Link href={slide.secondaryCta.href}>{slide.secondaryCta.label}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/15 p-2 text-white backdrop-blur-sm hover:bg-white/25"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/15 p-2 text-white backdrop-blur-sm hover:bg-white/25"
      >
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-white" : "w-2 bg-white/50"}`}
          />
        ))}
      </div>
    </section>
  );
}