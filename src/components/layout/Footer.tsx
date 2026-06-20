import Link from "next/link";
import { Leaf } from "lucide-react";
import { XIcon, InstagramIcon, LinkedInIcon, GitHubIcon } from "@/components/icons/SocialIcons";

const columns = [
  {
    title: "Product",
    links: [
      { href: "/explore", label: "Explore Products" },
      { href: "/about", label: "About EcoNest" },
      { href: "/blog", label: "Blog" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "Our Mission" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-secondary">
      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-semibold text-foreground">
              <Leaf className="h-6 w-6 text-accent" />
              <span className="text-lg">EcoNest</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-foreground/70">
              Helping you discover eco-friendly products and track your environmental impact,
              one decision at a time.
            </p>
            <p className="mt-4 text-sm text-foreground/70">
              [email protected] · Chattogram, Bangladesh
            </p>
            <div className="mt-4 flex gap-3">
  <a href="#" aria-label="X (Twitter)" className="text-foreground/60 hover:text-accent">
    <XIcon />
  </a>
  <a href="#" aria-label="Instagram" className="text-foreground/60 hover:text-accent">
    <InstagramIcon />
  </a>
  <a href="#" aria-label="LinkedIn" className="text-foreground/60 hover:text-accent">
    <LinkedInIcon />
  </a>
  <a href="#" aria-label="GitHub" className="text-foreground/60 hover:text-accent">
    <GitHubIcon />
  </a>
</div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-foreground">{col.title}</h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-foreground/70 hover:text-accent">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-foreground/50">
          © {new Date().getFullYear()} EcoNest. All rights reserved.
        </div>
      </div>
    </footer>
  );
}