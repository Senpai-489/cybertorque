"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";

interface VehicleCardProps {
  number?: string;
  image: string;
  category: string;
  name: string;
  year: string;
  mileage: string;
  fuel: string;
  slug?: string;
}

export default function VehicleCard({
  number = "01",
  image,
  category,
  name,
  year,
  mileage,
  fuel,
  slug = "#",
}: VehicleCardProps) {
  return (
    <article
      className="
        group
        relative
        w-full
        overflow-hidden
        border
        border-white/10
        bg-[#111111]
        transition-all
        duration-500
        hover:border-[#c5a15b]/70
      "
    >
      {/* ==================================================
          IMAGE
      ================================================== */}

      <Link
        href={slug}
        className="
          relative
          block
          aspect-[1.42/1]
          overflow-hidden
          bg-[#171717]
        "
      >
        {/* IMAGE */}

        <Image
          src={image}
          alt={name}
          fill
          className="
            object-cover
            transition-transform
            duration-700
            ease-[cubic-bezier(0.22,1,0.36,1)]
            group-hover:scale-[1.045]
          "
          sizes="
            (max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw
          "
        />

        {/* IMAGE DARK GRADIENT */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/55
            via-transparent
            to-black/10
            opacity-60
            transition-opacity
            duration-500
            group-hover:opacity-80
          "
        />

        {/* ==================================================
            NUMBER
        ================================================== */}


        {/* ==================================================
            IMAGE CORNER
        ================================================== */}

        <div
          className="
            absolute
            bottom-0
            left-0
            h-px
            w-0
            bg-[#c5a15b]
            transition-all
            duration-700
            group-hover:w-full
          "
        />
      </Link>

      {/* ==================================================
          INFO
      ================================================== */}

      <div
        className="
          relative
          px-4
          pb-5
          pt-4
          md:px-5
          md:pb-6
          md:pt-5
        "
      >
        {/* ==================================================
            CATEGORY
        ================================================== */}

        <p
          className="
            font-stint
            text-[8px]
            uppercase
            tracking-[0.08em]
            text-[#c5a15b]
            md:text-[9px]
          "
        >
          {category}
        </p>

        {/* ==================================================
            NAME + STAR
        ================================================== */}

        <div
          className="
            mt-1
            flex
            items-start
            justify-between
            gap-4
          "
        >
          <Link href={slug}>
            <h3
              className="
                font-stint
                text-[17px]
                uppercase
                leading-[1.1]
                tracking-[-0.015em]
                text-white
                transition-colors
                duration-300
                group-hover:text-[#c5a15b]
                md:text-[19px]
              "
            >
              {name}
            </h3>
          </Link>

          {/* FAVORITE */}

          <button
            type="button"
            aria-label={`Add ${name} to favourites`}
            className="
              mt-0.5
              shrink-0
              text-[#c5a15b]
              transition-all
              duration-300
              hover:scale-110
            "
          >
            <Star
              size={20}
              strokeWidth={1.1}
              className="
                transition-all
                duration-500
                group-hover:fill-[#c5a15b]/20
              "
            />
          </button>
        </div>

        {/* ==================================================
            SPECS
        ================================================== */}

        <div
          className="
            mt-3
            flex
            flex-wrap
            items-center
            gap-x-3
            gap-y-1
            font-stint
            text-[9px]
            uppercase
            text-white/55
            md:text-[10px]
          "
        >
          <span>{year}</span>

          <span className="text-[#c5a15b]">
            •
          </span>

          <span>{mileage}</span>

          <span className="text-[#c5a15b]">
            •
          </span>

          <span>{fuel}</span>
        </div>

        {/* ==================================================
            VIEW DETAILS
        ================================================== */}

        <Link
          href={slug}
          className="
            group/details
            mt-5
            flex
            w-fit
            items-center
            gap-4
            font-stint
            text-[9px]
            uppercase
            tracking-[0.04em]
            text-[#c5a15b]
          "
        >
          <span
            className="
              relative
              after:absolute
              after:-bottom-1
              after:left-0
              after:h-px
              after:w-0
              after:bg-[#c5a15b]
              after:transition-all
              after:duration-300
              group-hover/details:after:w-full
            "
          >
            View Details
          </span>

          <ArrowUpRight
            size={15}
            strokeWidth={1.2}
            className="
              transition-transform
              duration-300
              group-hover/details:translate-x-1
              group-hover/details:-translate-y-1
            "
          />
        </Link>
      </div>

      {/* ==================================================
          GOLD SIDE ACCENT
      ================================================== */}

      <div
        className="
          absolute
          bottom-0
          left-0
          h-[2px]
          w-0
          bg-[#c5a15b]
          transition-all
          duration-700
          group-hover:w-full
        "
      />
    </article>
  );
}