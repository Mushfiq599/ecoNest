import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/data/blogPosts";

export const metadata = {
  title: "Blog",
  description: "Practical sustainability advice from EcoNest — no guilt-tripping, just what actually works.",
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-foreground">The EcoNest Blog</h1>
        <p className="mt-2 text-foreground/70">Practical sustainability, without the guilt-tripping.</p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {blogPosts.map((post) => (
          <article key={post.slug} className="flex h-full flex-col rounded-2xl border border-border bg-surface p-5">
            <p className="text-xs text-foreground/50">{post.date}</p>
            <h2 className="mt-2 text-lg font-semibold text-foreground">{post.title}</h2>
            <p className="mt-2 flex-1 text-sm text-foreground/70">{post.excerpt}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="mt-4 flex items-center gap-1 text-sm font-medium text-accent hover:underline"
            >
              Read more <ArrowRight size={14} />
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}