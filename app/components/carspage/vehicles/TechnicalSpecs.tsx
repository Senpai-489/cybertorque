"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import gsap from "gsap";

interface SpecItem {
  label: string;
  value: string;
}

interface SpecCategory {
  title: string;
  items: SpecItem[];
}

interface VehicleDimensions {
  width: string;
  height: string;
  wheelbase: string;
  length: string;
}

interface TechnicalSpecsProps {
  categories?: SpecCategory[];
  dimensions?: VehicleDimensions;
  vehicleOutline?: string;
  buildHref?: string;
}

const defaultCategories: SpecCategory[] = [
  {
    title: "Power unit",
    items: [
      { label: "Engine", value: "6.2L V8" },
      { label: "Power", value: "495 HP" },
      { label: "Torque", value: "637 Nm" },
      { label: "Transmission", value: "8-Speed DCT" },
    ],
  },

  {
    title: "Performance",
    items: [
      { label: "0–100 km/h", value: "2.9 sec" },
      { label: "Top Speed", value: "320 km/h" },
      { label: "Drive", value: "RWD" },
    ],
  },

  {
    title: "Body",
    items: [
      { label: "Body Type", value: "Coupe" },
      { label: "Doors", value: "2" },
      { label: "Seats", value: "2" },
    ],
  },

  {
    title: "Capacities",
    items: [
      { label: "Fuel Tank", value: "70 L" },
      { label: "Boot Capacity", value: "357 L" },
    ],
  },

  {
    title: "Consumption / Emissions",
    items: [
      { label: "Combined", value: "12.4 L/100 km" },
      { label: "CO₂", value: "285 g/km" },
    ],
  },

  {
    title: "Sound level",
    items: [
      { label: "Exhaust", value: "Active Performance" },
      { label: "System", value: "Performance Exhaust" },
    ],
  },
];

const defaultDimensions: VehicleDimensions = {
  width: "1,852 mm",
  height: "1,300 mm",
  wheelbase: "2,450 mm",
  length: "4,519 mm",
};

export default function TechnicalSpecs({
  categories = defaultCategories,
  dimensions = defaultDimensions,
  vehicleOutline = "/car-outline.png",
  buildHref = "#",
}: TechnicalSpecsProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".specs-heading",
        {
          opacity: 0,
          y: 35,
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
        ".spec-row",
        {
          opacity: 0,
          x: -25,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",

          scrollTrigger: {
            trigger: section,
            start: "top 65%",
          },
        }
      );

      gsap.fromTo(
        ".vehicle-outline",
        {
          opacity: 0,
          scale: 0.92,
          y: 30,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",

          scrollTrigger: {
            trigger: section,
            start: "top 70%",
          },
        }
      );

      gsap.fromTo(
        ".dimension",
        {
          opacity: 0,
          y: 15,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          delay: 0.3,
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
        w-full
        overflow-hidden
        bg-[#111111]
        px-6
        py-24
        text-white

        md:px-10
        md:py-32

        lg:px-16
        lg:py-36
      "
    >
      {/* ==================================================
          TOP LINE
      ================================================== */}

      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex items-center gap-5">
          <span
            className="
              font-stint
              text-[8px]
              uppercase
              tracking-[0.2em]
              text-[#bd9852]
            "
          >
            Technical Data
          </span>

          <div className="h-px flex-1 bg-white/15" />

          <span
            className="
              hidden
              font-stint
              text-[8px]
              uppercase
              tracking-[0.15em]
              text-white/30
              sm:block
            "
          >
            Engineering / Specifications
          </span>
        </div>

        {/* ==================================================
            MAIN GRID
        ================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-16

            lg:grid-cols-[1fr_1fr]
            lg:gap-20
          "
        >
          {/* =================================================
              LEFT — ACCORDION
          ================================================= */}

          <div>
            <h2
              className="
                specs-heading
                font-stint
                text-[38px]
                uppercase
                leading-none
                tracking-[-0.035em]
                text-white

                sm:text-[48px]

                md:text-[58px]
              "
            >
              Technical
              <br />
              <span className="text-[#bd9852]">
                Specs
              </span>
            </h2>

            <p
              className="
                mt-6
                max-w-[400px]
                font-stint
                text-[10px]
                leading-[1.8]
                text-white/40
              "
            >
              Every measurement, component and
              performance figure engineered to
              deliver the experience this vehicle
              was built for.
            </p>

            {/* ACCORDION */}

            <div className="mt-10">
              {categories.map((category, index) => {
                const isOpen = openIndex === index;

                return (
                  <div
                    key={category.title}
                    className="spec-row border-t border-white/15 last:border-b"
                  >
                    {/* HEADER */}

                    <button
                      type="button"
                      onClick={() =>
                        setOpenIndex(
                          isOpen ? null : index
                        )
                      }
                      className="
                        group
                        flex
                        w-full
                        items-center
                        justify-between
                        py-5
                        text-left
                      "
                    >
                      <span
                        className={`
                          font-stint
                          text-[14px]
                          uppercase
                          tracking-[0.02em]
                          transition-colors
                          duration-300

                          ${
                            isOpen
                              ? "text-[#bd9852]"
                              : "text-white/80 group-hover:text-white"
                          }
                        `}
                      >
                        {category.title}
                      </span>

                      <ChevronDown
                        size={17}
                        strokeWidth={1}
                        className={`
                          text-white/50
                          transition-transform
                          duration-500
                          ${
                            isOpen
                              ? "rotate-180 text-[#bd9852]"
                              : ""
                          }
                        `}
                      />
                    </button>

                    {/* CONTENT */}

                    <div
                      className={`
                        grid
                        overflow-hidden
                        transition-[grid-template-rows]
                        duration-500
                        ease-in-out

                        ${
                          isOpen
                            ? "grid-rows-[1fr]"
                            : "grid-rows-[0fr]"
                        }
                      `}
                    >
                      <div className="min-h-0">
                        <div className="pb-5">
                          {category.items.map(
                            (item) => (
                              <div
                                key={item.label}
                                className="
                                  flex
                                  items-center
                                  justify-between
                                  border-t
                                  border-white/[0.07]
                                  py-3
                                "
                              >
                                <span
                                  className="
                                    font-stint
                                    text-[9px]
                                    text-white/35
                                  "
                                >
                                  {item.label}
                                </span>

                                <span
                                  className="
                                    font-stint
                                    text-[10px]
                                    text-white/80
                                  "
                                >
                                  {item.value}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* =================================================
                BUTTONS
            ================================================= */}

            <div
              className="
                mt-10
                flex
                flex-col
                gap-3

                sm:flex-row
              "
            >
              <a
                href={buildHref}
                className="
                  group
                  flex
                  h-[46px]
                  items-center
                  justify-center
                  gap-5
                  bg-[#bd9852]
                  px-7
                  font-stint
                  text-[9px]
                  uppercase
                  tracking-[0.1em]
                  text-black
                  transition-all
                  duration-500
                  hover:bg-[#d0ae68]
                "
              >
                Build Your Own

                <ArrowUpRight
                  size={15}
                  strokeWidth={1.2}
                  className="
                    transition-transform
                    duration-300
                    group-hover:-translate-y-1
                    group-hover:translate-x-1
                  "
                />
              </a>

              <button
                className="
                  flex
                  h-[46px]
                  items-center
                  justify-center
                  border
                  border-white/25
                  px-7
                  font-stint
                  text-[9px]
                  uppercase
                  tracking-[0.1em]
                  text-white/70
                  transition-all
                  duration-500
                  hover:border-[#bd9852]
                  hover:text-[#bd9852]
                "
              >
                Compare
              </button>
            </div>
          </div>

          {/* =================================================
              RIGHT — VEHICLE DIAGRAM
          ================================================= */}

          <div
            className="
              relative
              min-h-[520px]
              lg:min-h-[650px]
            "
          >
            {/* TOP RIGHT ARROW */}

            <div
              className="
                absolute
                right-0
                top-0
                font-stint
                text-[18px]
                text-white/40
              "
            >
              ↗
            </div>

            {/* VEHICLE */}

            <div
              className="
                vehicle-outline
                absolute
               left-1/3
                top-[60%]
                h-[430px]
                w-[300px]
                -translate-x-1/2
                -translate-y-1/2

                sm:h-[500px]
                sm:w-[350px]

                lg:h-[570px]
                lg:w-[400px]
              "
            >
              <Image
                src={vehicleOutline}
                alt="Vehicle technical outline"
                fill
                className="
                  object-contain
                  opacity-90
                "
                sizes="400px"
              />
            </div>

            {/* =================================================
                DIMENSIONS
            ================================================= */}

            <Dimension
              className="
                dimension
                absolute
                right-[5%]
                top-[13%]
              "
              label="Width"
              value={dimensions.width}
            />

            <Dimension
              className="
                dimension
                absolute
                right-[5%]
                top-[35%]
              "
              label="Height"
              value={dimensions.height}
            />

            <Dimension
              className="
                dimension
                absolute
                right-[5%]
                top-[57%]
              "
              label="Wheelbase"
              value={dimensions.wheelbase}
            />

            <Dimension
              className="
                dimension
                absolute
                right-[5%]
                bottom-[12%]
              "
              label="Length"
              value={dimensions.length}
            />
          </div>
        </div>
      </div>

      {/* ==================================================
          BOTTOM TECHNICAL LINE
      ================================================== */}

      <div className="mx-auto mt-16 max-w-[1400px]">
        <div className="h-px bg-[#bd9852]/30" />
      </div>
    </section>
  );
}

/* =========================================================
   DIMENSION
========================================================= */

function Dimension({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p
        className="
          font-stint
          text-[8px]
          uppercase
          tracking-[0.05em]
          text-white/35
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1
          font-stint
          text-[11px]
          font-medium
          text-white
        "
      >
        {value}
      </p>
    </div>
  );
}