import Link from "next/link";
import { Card } from "@heroui/react";
import { ArrowRight } from "lucide-react";

const posts = [
  {
    slug: "reading-eco-labels",
    title: "How to actually read an eco-label (most people get this wrong)",
    excerpt: "Not all green packaging means what you think. Here's what certifications are worth trusting.",
    date: "Jun 10, 2026",
  },
  {
    slug: "carbon-footprint-basics",
    title: "Your carbon footprint, explained without the jargon",
    excerpt: "A practical breakdown of where your footprint actually comes from — and what moves the needle.",
    date: "Jun 2, 2026",
  },
  {
    slug: "fashion-swaps-that-matter",
    title: "5 fashion swaps that matter more than 'buying less'",
    excerpt: "Reducing consumption helps, but these specific swaps compound faster than people expect.",
    date: "May 24, 2026",
  },
];

export function BlogSection() {
  return (
    <section className="bg-surface-secondary py-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">From the blog</h2>
            <p className="mt-2 text-foreground/70">Practical sustainability, without the guilt-tripping.</p>
          </div>
          <Link href="/blog" className="hidden items-center gap-1 text-sm font-medium text-accent sm:flex">
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.slug} variant="default" className="h-full">
              <Card.Content>
                <p className="text-xs text-foreground/50">{post.date}</p>
                <Card.Title className="mt-2">{post.title}</Card.Title>
                <Card.Description className="mt-1">{post.excerpt}</Card.Description>
              </Card.Content>
              <Card.Footer>
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                >
                  Read more <ArrowRight size={14} />
                </Link>
              </Card.Footer>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}