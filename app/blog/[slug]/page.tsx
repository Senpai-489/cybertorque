import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/app/components/homepage/Footer";
import Navbar from "@/app/components/homepage/Navbar";
import { blogPosts, getBlogPost } from "@/app/data/blog";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) notFound();

  return (
    <main className="min-h-screen bg-[#111111] text-white">
      <Navbar />

      <article className="mx-auto max-w-5xl px-6 pb-24 pt-40 md:px-10 lg:px-16">
        <Link href="/blog" className="font-stint text-[8px] uppercase tracking-[0.18em] text-white/45 transition-colors hover:text-[#bd9a56]">
          ← Back to journal
        </Link>
        <div className="mt-12 max-w-4xl border-b border-white/15 pb-12">
          <p className="font-stint text-[8px] uppercase tracking-[0.25em] text-[#bd9a56]">
            {post.category} / {post.publishedAt}
          </p>
          <h1 className="mt-6 font-stint text-5xl uppercase leading-[0.9] tracking-[-0.035em] md:text-8xl">
            {post.title}
          </h1>
          <p className="mt-8 max-w-2xl font-stint text-[12px] leading-[1.9] text-white/55">
            {post.excerpt}
          </p>
        </div>

        <div className="relative mt-14 aspect-[1.8/1] overflow-hidden bg-[#1b1b1b]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 900px"
            className="object-cover"
          />
        </div>

        <div className="mx-auto mt-14 max-w-2xl">
          {post.content.map((paragraph) => (
            <p key={paragraph} className="mb-7 font-stint text-[11px] leading-loose text-white/65">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-16 border-t border-white/10 pt-8">
          <p className="font-stint text-[8px] uppercase tracking-[0.18em] text-white/35">Written by</p>
          <p className="mt-2 font-stint text-[10px] text-[#bd9a56]">{post.author}</p>
        </div>
      </article>

      <Footer />
    </main>
  );
}
