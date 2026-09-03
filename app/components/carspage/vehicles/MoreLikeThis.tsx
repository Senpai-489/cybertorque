"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

interface RelatedVehicle {
  slug: string;
  brand: string;
  name: string;
  category: string;
  image: string;
  horsepower: string;
  price: string;
}

interface MoreLikeThisProps {
  vehicles: RelatedVehicle[];
}

export default function MoreLikeThis({
  vehicles,
}: MoreLikeThisProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".related-header",
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        ".related-card",
        {
          opacity: 0,
          y: 70,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 65%",
          },
        }
      );
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
        py-24
        text-[#151515]

        md:px-10
        md:py-32

        lg:px-16
        lg:py-40
      "
    >
      {/* ==================================================
          BACKGROUND WORD
      ================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -top-8
          left-1/2
          -translate-x-1/2
          whitespace-nowrap
          font-stint
          text-[100px]
          uppercase
          tracking-[-0.05em]
          text-black/[0.025]

          md:text-[180px]

          lg:text-[250px]
        "
      >
        DISCOVER
      </div>

      <div className="relative mx-auto max-w-[1450px]">
        {/* ==================================================
            HEADER
        ================================================== */}

        <div
          className="
            related-header
            mb-14
            flex
            flex-col
            gap-8

            md:flex-row
            md:items-end
            md:justify-between
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
                  text-[#a98545]
                "
              >
                Discover More
              </span>

              <div className="h-px w-20 bg-[#bd9852]/60" />
            </div>

            {/* TITLE */}

            <h2
              className="
                font-stint
                text-[45px]
                uppercase
                leading-[0.9]
                tracking-[-0.04em]

                sm:text-[55px]

                md:text-[70px]

                lg:text-[82px]
              "
            >
              More
              <br />
              <span className="text-[#bd9852]">
                Like This.
              </span>
            </h2>
          </div>

          {/* DESCRIPTION */}

          <div className="max-w-[330px]">
            <p
              className="
                font-stint
                text-[10px]
                leading-[1.9]
                text-black/50
              "
            >
              A curated selection of vehicles with a
              similar character, performance and
              presence.
            </p>

            <Link
              href="/cars"
              className="
                group
                mt-6
                inline-flex
                items-center
                gap-3
                border-b
                border-black/30
                pb-2
                font-stint
                text-[8px]
                uppercase
                tracking-[0.15em]
                transition-colors
                hover:border-[#bd9852]
                hover:text-[#a98545]
              "
            >
              Explore Entire Fleet

              <ArrowUpRight
                size={13}
                strokeWidth={1}
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-y-1
                  group-hover:translate-x-1
                "
              />
            </Link>
          </div>
        </div>

        {/* ==================================================
            CARDS
        ================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-5

            md:grid-cols-2

            lg:grid-cols-3
          "
        >
          {vehicles.slice(0, 3).map((vehicle, index) => (
            <RelatedCard
              key={vehicle.slug}
              vehicle={vehicle}
              index={index}
            />
          ))}
        </div>

        {/* ==================================================
            BOTTOM LINE
        ================================================== */}

        <div className="mt-12 flex items-center gap-5">
          <span
            className="
              font-stint
              text-[8px]
              text-black/30
            "
          >
            01
          </span>

          <div className="h-px flex-1 bg-black/10" />

          <span
            className="
              font-stint
              text-[8px]
              text-black/30
            "
          >
            CURATED FOR YOU
          </span>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   CARD
========================================================= */

function RelatedCard({
  vehicle,
  index,
}: {
  vehicle: RelatedVehicle;
  index: number;
}) {
  return (
    <Link
      href={`/cars/${vehicle.slug}`}
      className="
        related-card
        group
        block
      "
    >
      <article
        className="
          relative
          overflow-hidden
          bg-[#dcd9d2]
        "
      >
        {/* =================================================
            IMAGE
        ================================================= */}

        <div
          className="
            relative
            aspect-[1.05/1]
            overflow-hidden
          "
        >
          <Image
            src={vehicle.image}
            alt={vehicle.name}
            fill
            sizes="
              (max-width: 768px) 100vw,
              (max-width: 1024px) 50vw,
              33vw
            "
            className="
              object-cover
              transition-transform
              duration-[1200ms]
              ease-[cubic-bezier(0.22,1,0.36,1)]
              group-hover:scale-105
            "
          />

          {/* DARK GRADIENT */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/80
              via-black/10
              to-transparent
              opacity-80
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
              tracking-[0.2em]
              text-white/70
            "
          >
            0{index + 1}
          </span>

          {/* CATEGORY */}

          <span
            className="
              absolute
              right-5
              top-5
              font-stint
              text-[7px]
              uppercase
              tracking-[0.15em]
              text-white/60
            "
          >
            {vehicle.category}
          </span>

          {/* =================================================
              IMAGE TEXT
          ================================================= */}

          <div
            className="
              absolute
              bottom-0
              left-0
              right-0
              p-6
            "
          >
            <p
              className="
                font-stint
                text-[8px]
                uppercase
                tracking-[0.2em]
                text-[#d0ae68]
              "
            >
              {vehicle.brand}
            </p>

            <h3
              className="
                mt-2
                font-stint
                text-[27px]
                uppercase
                leading-none
                tracking-[-0.025em]
                text-white

                md:text-[30px]
              "
            >
              {vehicle.name}
            </h3>
          </div>
        </div>

        {/* =================================================
            INFORMATION
        ================================================= */}

        <div className="border-b border-black/10 bg-[#e3e0d9] px-5 py-5">
          <div
            className="
              flex
              items-center
              justify-between
            "
          >
            <div>
              <span
                className="
                  block
                  font-stint
                  text-[7px]
                  uppercase
                  tracking-[0.12em]
                  text-black/35
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
                  text-black/80
                "
              >
                {vehicle.horsepower}
              </span>
            </div>

            <div className="text-right">
              <span
                className="
                  block
                  font-stint
                  text-[7px]
                  uppercase
                  tracking-[0.12em]
                  text-black/35
                "
              >
                Starting From
              </span>

              <span
                className="
                  mt-1
                  block
                  font-stint
                  text-[10px]
                  text-[#a98545]
                "
              >
                {vehicle.price}
              </span>
            </div>
          </div>

          {/* VIEW */}

          <div
            className="
              mt-5
              flex
              items-center
              justify-between
              border-t
              border-black/10
              pt-4
            "
          >
            <span
              className="
                font-stint
                text-[8px]
                uppercase
                tracking-[0.15em]
                text-black/50
                transition-colors
                duration-300
                group-hover:text-[#a98545]
              "
            >
              View Vehicle
            </span>

            <span
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                border
                border-black/20
                transition-all
                duration-500
                group-hover:border-[#bd9852]
                group-hover:bg-[#bd9852]
              "
            >
              <ArrowUpRight
                size={12}
                strokeWidth={1}
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}