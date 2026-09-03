"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";

interface Variant {
  name: string;
  subtitle: string;
  image: string;
  price: string;
  specs: string;
  slug: string;
} 

const defaultVariants: Variant[] = [
  {
    name: "Corvette Stingray",
    subtitle: "6.2L V8",
    image: "/vehicles/corvette-stingray.png",
    price: "₹1.18 Cr",
    specs: "495 HP",
    slug: "corvette-stingray",
  },
  {
    name: "Corvette Z06",
    subtitle: "5.5L V8",
    image: "/vehicles/corvette-z06.png",
    price: "₹1.65 Cr",
    specs: "670 HP",
    slug: "corvette-z06",
  },
  {
    name: "Corvette E-Ray",
    subtitle: "6.2L Hybrid V8",
    image: "/vehicles/corvette-e-ray.png",
    price: "₹1.72 Cr",
    specs: "655 HP",
    slug: "corvette-e-ray",
  },
  {
    name: "Corvette ZR1",
    subtitle: "5.5L Twin Turbo V8",
    image: "/vehicles/corvette-zr1.png",
    price: "₹2.10 Cr",
    specs: "1,064 HP",
    slug: "corvette-zr1",
  },
];

interface VehicleVariantsProps {
  variants?: Variant[];
}

export default function VehicleVariants({
  variants = defaultVariants,
}: VehicleVariantsProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;

    const amount = 420;

    gsap.to(sliderRef.current, {
      scrollLeft:
        sliderRef.current.scrollLeft +
        (direction === "right" ? amount : -amount),
      duration: 0.8,
      ease: "power3.out",
    });
  };

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#151515]
        py-24
        text-white

        md:py-32
      "
    >
      {/* =========================================
          BACKGROUND TYPOGRAPHY
      ========================================= */}

      <div
        className="
          pointer-events-none
          absolute
          -top-5
          left-1/2
          -translate-x-1/2
          whitespace-nowrap
          font-stint
          text-[100px]
          uppercase
          tracking-[-0.05em]
          text-white/[0.025]

          md:text-[180px]

          lg:text-[240px]
        "
      >
        VARIANTS
      </div>

      <div className="relative mx-auto max-w-[1450px]">
        {/* =========================================
            HEADER
        ========================================= */}

        <div
          className="
            mb-12
            flex
            flex-col
            gap-8
            px-6

            md:flex-row
            md:items-end
            md:justify-between
            md:px-10

            lg:px-14
          "
        >
          <div>
            {/* EYEBROW */}

            <div className="mb-5 flex items-center gap-4">
              <span
                className="
                  font-stint
                  text-[8px]
                  uppercase
                  tracking-[0.2em]
                  text-[#bd9852]
                "
              >
                Explore Further
              </span>

              <div className="h-px w-16 bg-[#bd9852]/50" />
            </div>

            <h2
              className="
                font-stint
                text-[38px]
                uppercase
                leading-[0.9]
                tracking-[-0.035em]

                sm:text-[48px]

                md:text-[60px]
              "
            >
              Choose Your
              <br />
              <span className="text-[#bd9852]">
                Variant.
              </span>
            </h2>

            <p
              className="
                mt-5
                max-w-[480px]
                font-stint
                text-[9px]
                leading-[1.8]
                text-white/40
              "
            >
              From effortless grand touring to uncompromising
              performance, discover the configuration that
              matches your character.
            </p>
          </div>

          {/* CONTROLS */}

          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              aria-label="Previous variants"
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                border
                border-white/20
                text-white/50
                transition-all
                duration-300
                hover:border-[#bd9852]
                hover:text-[#bd9852]
              "
            >
              <ChevronLeft
                size={17}
                strokeWidth={1}
              />
            </button>

            <button
              onClick={() => scroll("right")}
              aria-label="Next variants"
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                border
                border-white/20
                text-white/50
                transition-all
                duration-300
                hover:border-[#bd9852]
                hover:text-[#bd9852]
              "
            >
              <ChevronRight
                size={17}
                strokeWidth={1}
              />
            </button>
          </div>
        </div>

        {/* =========================================
            VARIANT CARDS
        ========================================= */}

        <div
          ref={sliderRef}
          className="
            flex
            gap-5
            overflow-x-auto
            px-6
            pb-5
            scrollbar-none

            md:px-10

            lg:px-14
          "
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {variants.map((variant, index) => (
            <VariantCard
              key={variant.slug}
              variant={variant}
              index={index}
            />
          ))}
        </div>

        {/* =========================================
            BOTTOM NAVIGATION
        ========================================= */}

        <div
          className="
            mt-8
            flex
            items-center
            justify-between
            px-6

            md:px-10

            lg:px-14
          "
        >
          <div className="flex items-center gap-4">
            <span
              className="
                font-stint
                text-[9px]
                text-[#bd9852]
              "
            >
              01
            </span>

            <div className="h-px w-20 bg-white/15">
              <div className="h-full w-1/4 bg-[#bd9852]" />
            </div>

            <span
              className="
                font-stint
                text-[9px]
                text-white/30
              "
            >
              04
            </span>
          </div>

          <Link
            href="/cars"
            className="
              group
              flex
              items-center
              gap-3
              font-stint
              text-[9px]
              uppercase
              tracking-[0.15em]
              text-white/60
              transition-colors
              hover:text-[#bd9852]
            "
          >
            View Entire Fleet

            <ArrowRight
              size={14}
              strokeWidth={1}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* =====================================================
   VARIANT CARD
===================================================== */

function VariantCard({
  variant,
  index,
}: {
  variant: Variant;
  index: number;
}) {
  return (
    <Link
      href={`/cars/${variant.slug}`}
      className="
        group
        relative
        block
        w-[310px]
        shrink-0

        sm:w-[350px]

        lg:w-[390px]
      "
    >
      <article
        className="
          relative
          overflow-hidden
          border
          border-white/[0.08]
          bg-[#191919]
          transition-all
          duration-700
          group-hover:border-[#bd9852]/50
        "
      >
        {/* =========================================
            IMAGE
        ========================================= */}

        <div
          className="
            relative
            aspect-[1.35/1]
            overflow-hidden
            bg-[#101010]
          "
        >
          <Image
            src={variant.image}
            alt={variant.name}
            fill
            sizes="390px"
            className="
              object-contain
              p-5
              transition-transform
              duration-1000
              ease-[cubic-bezier(0.22,1,0.36,1)]
              group-hover:scale-110
            "
          />

          {/* IMAGE GRADIENT */}

          <div
            className="
              absolute
              inset-x-0
              bottom-0
              h-1/2
              bg-gradient-to-t
              from-[#191919]
              to-transparent
              opacity-70
            "
          />

          {/* NUMBER */}

          <span
            className="
              absolute
              left-5
              top-5
              font-stint
              text-[9px]
              tracking-[0.15em]
              text-white/35
            "
          >
            0{index + 1}
          </span>

          {/* GOLD CORNER */}

          <div
            className="
              absolute
              right-0
              top-0
              h-10
              w-10
              border-r
              border-t
              border-[#bd9852]/40
            "
          />
        </div>

        {/* =========================================
            INFORMATION
        ========================================= */}

        <div className="px-5 pb-5 pt-2">
          <p
            className="
              font-stint
              text-[7px]
              uppercase
              tracking-[0.18em]
              text-[#bd9852]
            "
          >
            {variant.subtitle}
          </p>

          <h3
            className="
              mt-2
              font-stint
              text-[20px]
              uppercase
              tracking-[-0.02em]
              text-white
            "
          >
            {variant.name}
          </h3>

          {/* SPECS */}

          <div
            className="
              mt-4
              flex
              items-center
              justify-between
              border-t
              border-white/[0.08]
              pt-4
            "
          >
            <div>
              <span
                className="
                  block
                  font-stint
                  text-[7px]
                  uppercase
                  tracking-[0.1em]
                  text-white/30
                "
              >
                Power
              </span>

              <span
                className="
                  mt-1
                  block
                  font-stint
                  text-[10px]
                  text-white/75
                "
              >
                {variant.specs}
              </span>
            </div>

            <div className="text-right">
              <span
                className="
                  block
                  font-stint
                  text-[7px]
                  uppercase
                  tracking-[0.1em]
                  text-white/30
                "
              >
                Starting
              </span>

              <span
                className="
                  mt-1
                  block
                  font-stint
                  text-[10px]
                  text-[#bd9852]
                "
              >
                {variant.price}
              </span>
            </div>
          </div>

          {/* CTA */}

          <div
            className="
              mt-5
              flex
              items-center
              justify-between
            "
          >
            <span
              className="
                font-stint
                text-[8px]
                uppercase
                tracking-[0.15em]
                text-white/50
                transition-colors
                duration-300
                group-hover:text-[#bd9852]
              "
            >
              Explore Variant
            </span>

            <span
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                border
                border-white/15
                text-white/40
                transition-all
                duration-500
                group-hover:border-[#bd9852]
                group-hover:bg-[#bd9852]
                group-hover:text-black
              "
            >
              <ArrowRight
                size={12}
                strokeWidth={1}
              />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}