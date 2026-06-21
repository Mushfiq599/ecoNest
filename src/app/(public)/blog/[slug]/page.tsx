import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "@/lib/data/blogPosts";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <Link href="/blog" className="flex items-center gap-1 text-sm text-foreground/60 hover:text-accent">
        <ArrowLeft size={14} /> Back to blog
      </Link>

      <p className="mt-6 text-xs text-foreground/50">{post.date}</p>
      <h1 className="mt-2 text-3xl font-bold text-foreground">{post.title}</h1>

      <div className="mt-6 space-y-4 text-foreground/80">
        {post.content.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}