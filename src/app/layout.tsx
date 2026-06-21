import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain.vercel.app"), // swap once you have a real domain
  title: {
    default: "EcoNest — Sustainable Living, Simplified",
    template: "%s | EcoNest",
  },
  description:
    "Discover eco-friendly products, track your environmental impact, and get AI-powered sustainability recommendations with EcoNest.",
  openGraph: {
    title: "EcoNest — Sustainable Living, Simplified",
    description: "Discover eco-friendly products and track your environmental impact with AI.",
    url: "https://your-domain.vercel.app",
    siteName: "EcoNest",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EcoNest — Sustainable Living, Simplified",
    description: "Discover eco-friendly products and track your environmental impact with AI.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className="font-sans antialiased bg-background text-foreground">
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
  >
    Skip to main content
  </a>
  <Providers>{children}</Providers>
  <Analytics />
  <SpeedInsights />
</body>
      </html>
    </ClerkProvider>
  );
}