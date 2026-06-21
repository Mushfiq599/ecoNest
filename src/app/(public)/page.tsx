import { HeroSection } from "@/components/sections/HeroSection";
import { AISearchSection } from "@/components/sections/AISearchSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { StatisticsSection } from "@/components/sections/StatisticsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AISearchSection />
      <FeaturesSection />
      <CategoriesSection />
      <StatisticsSection />
      <TestimonialsSection />
      <BlogSection />
      <NewsletterSection />
      <FAQSection />
      <CTASection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "EcoNest",
            url: "https://your-domain.vercel.app",
            description:
              "AI-powered platform for discovering eco-friendly products and tracking environmental impact.",
          }),
        }}
      />
    </>
  );
}