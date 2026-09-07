import Image from "next/image";
import Link from "next/link";
import Footer from "@/app/components/homepage/Footer";
import Navbar from "@/app/components/homepage/Navbar";
import { blogPosts } from "@/app/data/blog";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#111111] text-white">
      <Navbar />

      <section className="mx-auto max-w-375 px-6 pb-24 pt-40 md:px-10 lg:px-16">
        <div className="max-w-3xl border-b border-white/15 pb-12">
          <p className="font-stint text-[8px] uppercase tracking-[0.25em] text-[#bd9a56]">
            The Journal
          </p>
          <h1 className="mt-6 font-stint text-6xl uppercase leading-[0.88] tracking-[-0.035em] md:text-9xl">
            Stories for
            <br />
            <span className="text-[#bd9a56]">the road.</span>
          </h1>
          <p className="mt-8 max-w-xl font-stint text-[11px] leading-[1.9] text-white/50">
            Notes on performance, design, ownership, and the machines that make a journey worth taking.
          </p>
        </div>

        <div className="mt-16 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <article key={post.slug} className="group">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="relative aspect-5/4 overflow-hidden bg-[#1b1b1b]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/10" />
                  <span className="absolute left-5 top-5 font-stint text-[9px] text-white/60">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="absolute bottom-5 left-5 font-stint text-[8px] uppercase tracking-[0.15em] text-[#d0ae68]">
                    {post.category}
                  </span>
                </div>
              </Link>
              <div className="border-b border-white/10 pb-7 pt-5">
                <p className="font-stint text-[8px] uppercase tracking-[0.12em] text-white/35">
                  {post.publishedAt}
                </p>
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="mt-3 font-stint text-2xl uppercase leading-none text-white transition-colors group-hover:text-[#bd9a56]">
                    {post.title}
                  </h2>
                </Link>
                <p className="mt-4 font-stint text-[10px] leading-[1.8] text-white/50">
                  {post.excerpt}
                </p>
                <Link href={`/blog/${post.slug}`} className="mt-5 inline-block font-stint text-[8px] uppercase tracking-[0.15em] text-[#bd9a56]">
                  Read story <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
