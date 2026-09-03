import Link from "next/link";
import Navbar from "@/app/components/homepage/Navbar";
import Footer from "@/app/components/homepage/Footer";

type LegalSection = {
  title: string;
  body: string;
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: LegalSection[];
};

export default function LegalPage({
  eyebrow,
  title,
  intro,
  sections,
}: LegalPageProps) {
  return (
    <main className="min-h-screen bg-[#111111] text-white">
      <Navbar />

      <section className="mx-auto max-w-5xl px-6 pb-24 pt-36 md:px-10 lg:px-16">
        <p className="font-stint text-[8px] uppercase tracking-[0.25em] text-[#bd9a56]">
          {eyebrow}
        </p>
        <h1 className="mt-6 max-w-3xl font-stint text-5xl uppercase leading-[0.9] tracking-[-0.03em] md:text-8xl">
          {title}
        </h1>
        <p className="mt-8 max-w-2xl font-stint text-[11px] leading-[1.9] text-white/55">
          {intro}
        </p>

        <div className="mt-16 border-t border-white/15">
          {sections.map((section) => (
            <article
              key={section.title}
              className="grid gap-4 border-b border-white/10 py-8 md:grid-cols-[220px_1fr] md:gap-10"
            >
              <h2 className="font-stint text-[12px] uppercase tracking-[0.08em] text-[#bd9a56]">
                {section.title}
              </h2>
              <p className="font-stint text-[10px] leading-loose text-white/60">
                {section.body}
              </p>
            </article>
          ))}
        </div>

        <Link
          href="/"
          className="mt-10 inline-flex border-b border-[#bd9a56] pb-2 font-stint text-[9px] uppercase tracking-[0.16em] text-[#bd9a56]"
        >
          Return to Cyber Torque
        </Link>
      </section>

      <Footer />
    </main>
  );
}
