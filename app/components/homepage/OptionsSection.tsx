"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const options = [
  {
    title: "Spoilers",
    category: "Aerodynamics",
    description:
      "Engineered aerodynamic upgrades designed to sharpen the silhouette while improving high-speed stability and road presence.",
    image: "/options/spoiler.jpg",
    size: "large",
  },
  {
    title: "Performance Wheels",
    category: "Wheels & Brakes",
    description:
      "Forged and lightweight wheel configurations paired with performance braking systems for a more purposeful stance.",
    image: "/options/wheels.jpg",
    size: "small",
  },
  {
    title: "Lighting",
    category: "Exterior",
    description:
      "Signature lighting upgrades that bring a distinctive character to your vehicle, day or night.",
    image: "/options/headlight.jpg",
    size: "small",
  },
];

export default function OptionsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      /*
      ================================================
      INITIAL CARD STATE
      ================================================
      */

      gsap.set(cardRefs.current, {
        y: 70,
        opacity: 0,
      });

      /*
      ================================================
      SCROLL REVEAL
      ================================================
      */

      gsap.to(cardRefs.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",

        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "top 35%",
          scrub: 1,
        },
      });

      /*
      ================================================
      IMAGE PARALLAX
      ================================================
      */

      cardRefs.current.forEach((card) => {
        if (!card) return;

        const image = card.querySelector(".option-image");

        if (!image) return;

        gsap.fromTo(
          image,
          {
            yPercent: -5,
          },
          {
            yPercent: 5,
            ease: "none",

            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        bg-[#e9e7e2]
        px-6
        pb-24
        text-[#292929]
        md:px-10
        lg:px-14
      "
    >
      {/* ==================================================
          TOP BORDER
      ================================================== */}

      <div className="border-t border-[#292929]/50" />

      {/* ==================================================
          HEADER
      ================================================== */}

      <div
        className="
          mx-auto
          flex
          max-w-[1400px]
          items-center
          justify-between
          py-3
        "
      >
        <p
          className="
            font-stint
            text-[9px]
            uppercase
            tracking-[0.05em]
            md:text-[10px]
          "
        >
          Customisation & Parts
        </p>

        <p
          className="
            font-stint
            text-[9px]
            uppercase
            tracking-[0.04em]
            md:text-[10px]
          "
        >
          Quality Parts For Quality Cars
        </p>
      </div>

      {/* ==================================================
          TITLE
      ================================================== */}

      <div className="mx-auto max-w-[1400px] py-10 md:py-14">
        <p
          className="
            mb-3
            font-stint
            text-[10px]
            uppercase
            tracking-[0.25em]
            text-[#292929]/50
          "
        >
          Make It Yours
        </p>

        <h2
          className="
            max-w-[850px]
            font-stint
            text-[46px]
            uppercase
            leading-[0.95]
            tracking-[-0.025em]
            text-[#bd9a56]
            sm:text-[58px]
            md:text-[72px]
            lg:text-[82px]
          "
        >
          Built To
          <br />
          Be Different
        </h2>
      </div>

      {/* ==================================================
          OPTIONS GRID
      ================================================== */}

      <div
        className="
          mx-auto
          grid
          max-w-[1400px]
          grid-cols-1
          gap-5
          md:grid-cols-2
        "
      >
        {/* ==================================================
            FEATURED CARD
        ================================================== */}

        <OptionCard
          option={options[0]}
          index={0}
          cardRefs={cardRefs}
          featured
        />

        {/* ==================================================
            RIGHT COLUMN
        ================================================== */}

        <div className="grid grid-cols-1 gap-5">
          <OptionCard
            option={options[1]}
            index={1}
            cardRefs={cardRefs}
          />

          <OptionCard
            option={options[2]}
            index={2}
            cardRefs={cardRefs}
          />
        </div>
      </div>

      {/* ==================================================
          CTA
      ================================================== */}

      <div className="flex justify-center pt-12 md:pt-16">
        <Link
          href="/customisation"
          className="
            group
            flex
            h-[38px]
            w-[180px]
            items-center
            justify-between
            bg-[#bd9a56]
            px-4
            font-stint
            text-[10px]
            text-white
            transition-all
            duration-500
            hover:w-[200px]
            hover:bg-[#c9a762]
          "
        >
          <span>View More Options</span>

          <ArrowRight
            size={14}
            strokeWidth={1.5}
            className="
              transition-transform
              duration-500
              group-hover:translate-x-1
            "
          />
        </Link>
      </div>

      {/* ==================================================
          BOTTOM BORDER
      ================================================== */}

      <div className="mt-16 border-b border-[#292929]/50" />
    </section>
  );
}

/* ========================================================
   OPTION CARD
======================================================== */

function OptionCard({
  option,
  index,
  cardRefs,
  featured = false,
}: {
  option: {
    title: string;
    category: string;
    description: string;
    image: string;
    size: string;
  };

  index: number;

  cardRefs: React.MutableRefObject<
    (HTMLAnchorElement | null)[]
  >;

  featured?: boolean;
}) {
  return (
    <Link
      href={`/customisation/${option.title
        .toLowerCase()
        .replaceAll(" ", "-")}`}
      ref={(el) => {
        cardRefs.current[index] = el;
      }}
      className={`
        group
        relative
        block
        overflow-hidden
        bg-black
        shadow-[7px_7px_0_rgba(0,0,0,0.16)]
        ${
          featured
            ? "aspect-[1.45/1] md:aspect-auto md:min-h-[580px]"
            : "aspect-[1.8/1]"
        }
      `}
    >
      {/* ==================================================
          IMAGE
      ================================================== */}

      <div className="absolute inset-[-6%] overflow-hidden">
        <Image
          src={option.image}
          alt={option.title}
          fill
          className="
            option-image
            object-cover
            transition-transform
            duration-[1200ms]
            ease-[cubic-bezier(0.22,1,0.36,1)]
            group-hover:scale-[1.08]
          "
          sizes={
            featured
              ? "(max-width: 768px) 100vw, 60vw"
              : "(max-width: 768px) 100vw, 40vw"
          }
        />
      </div>

      {/* ==================================================
          DEFAULT DARKNESS
      ================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-black/10
          transition-all
          duration-700
          group-hover:bg-black/55
        "
      />

      {/* ==================================================
          BOTTOM GRADIENT
      ================================================== */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-2/3
          bg-gradient-to-t
          from-black/80
          via-black/20
          to-transparent
          opacity-70
          transition-opacity
          duration-700
          group-hover:opacity-100
        "
      />

      {/* ==================================================
          CORNER FRAME
      ================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-5
          border
          border-white/0
          transition-all
          duration-700
          group-hover:inset-7
          group-hover:border-white/40
        "
      />

      {/* ==================================================
          TOP CATEGORY
      ================================================== */}

      <div
        className="
          absolute
          left-6
          top-6
          translate-y-[-10px]
          opacity-0
          transition-all
          duration-500
          group-hover:translate-y-0
          group-hover:opacity-100
        "
      >
        <span
          className="
            font-stint
            text-[9px]
            uppercase
            tracking-[0.2em]
            text-white/80
          "
        >
          {option.category}
        </span>
      </div>

      {/* ==================================================
          CONTENT
      ================================================== */}

      <div
        className={`
          absolute
          inset-x-6
          bottom-6
          ${
            featured
              ? "md:bottom-8"
              : "bottom-5"
          }
        `}
      >
        {/* TITLE */}

        <h3
          className="
            font-stint
            text-[28px]
            uppercase
            leading-none
            tracking-[-0.02em]
            text-[#d0aa62]
            transition-transform
            duration-700
            group-hover:-translate-y-2
            md:text-[34px]
          "
        >
          {option.title}
        </h3>

        {/* DESCRIPTION */}

        <div
          className="
            grid
            grid-rows-[0fr]
            opacity-0
            transition-all
            duration-700
            ease-[cubic-bezier(0.22,1,0.36,1)]
            group-hover:grid-rows-[1fr]
            group-hover:opacity-100
          "
        >
          <div className="overflow-hidden">
            <p
              className="
                max-w-[620px]
                pt-3
                font-stint
                text-[11px]
                leading-[1.8]
                text-white/75
                md:text-[12px]
              "
            >
              {option.description}
            </p>
          </div>
        </div>

        {/* EXPLORE */}

        <div
          className="
            mt-3
            flex
            items-center
            gap-3
            translate-y-3
            opacity-0
            transition-all
            duration-500
            group-hover:translate-y-0
            group-hover:opacity-100
          "
        >
          <span
            className="
              font-stint
              text-[9px]
              uppercase
              tracking-[0.18em]
              text-white
            "
          >
            Explore
          </span>

          <span className="h-px w-8 bg-[#bd9a56]" />

          <ArrowRight
            size={14}
            strokeWidth={1.5}
            className="
              text-[#bd9a56]
              transition-transform
              duration-500
              group-hover:translate-x-2
            "
          />
        </div>
      </div>
    </Link>
  );
}