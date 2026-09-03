"use client";

import { useLayoutEffect, useRef } from "react";
import {
  Gem,
  UserRound,
  Crosshair,
  Star,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const principles = [
  {
    number: "01",
    title: "Curated",
    description:
      "Every vehicle is carefully selected for its character, performance and pedigree.",
    Icon: Gem,
  },
  {
    number: "02",
    title: "Personal",
    description:
      "We tailor every detail to reflect your vision and driving expectations.",
    Icon: UserRound,
  },
  {
    number: "03",
    title: "Precise",
    description:
      "From sourcing to delivery, we handle everything with accuracy and intention.",
    Icon: Crosshair,
  },
  {
    number: "04",
    title: "Exceptional",
    description:
      "We don't settle for ordinary. Neither should you.",
    Icon: Star,
  },
];

export default function OurPhilosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      /*
      =====================================================
      INITIAL STATES
      =====================================================
      */

      gsap.set(titleRef.current, {
        opacity: 0,
        y: 25,
      });

      gsap.set(".philosophy-card", {
        opacity: 0,
        y: 50,
      });

      gsap.set(".philosophy-line", {
        scaleX: 0,
        transformOrigin: "left center",
      });

      /*
      =====================================================
      SECTION REVEAL
      =====================================================
      */

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions:
            "play none none reverse",
        },
      });

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      });

      tl.to(
        ".philosophy-line",
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.35"
      );

      tl.to(
        ".philosophy-card",
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
        },
        "-=0.5"
      );

      /*
      =====================================================
      ICON REVEAL
      =====================================================
      */

      gsap.fromTo(
        ".philosophy-icon",
        {
          scale: 0,
          rotate: -25,
        },
        {
          scale: 1,
          rotate: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "back.out(1.7)",

          scrollTrigger: {
            trigger: section,
            start: "top 65%",
            toggleActions:
              "play none none reverse",
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
        z-10
        overflow-hidden
        bg-[#191919]
        text-white
      "
    >
      {/* ==================================================
          BACKGROUND TEXTURE
      ================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-40
          bg-[radial-gradient(circle_at_50%_50%,rgba(189,152,82,0.08),transparent_55%)]
        "
      />

      {/* subtle grain */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.035]
          [background-image:url('/noise.png')]
        "
      />

      {/* ==================================================
          CONTAINER
      ================================================== */}

      <div
        className="
          relative
          mx-auto
          max-w-[1500px]
          px-6
          py-10

          sm:px-8
          sm:py-12

          md:px-10
          md:py-14

          lg:px-14
          lg:py-16
        "
      >
        {/* ==================================================
            HEADER
        ================================================== */}

        <div
          ref={titleRef}
          className="
            flex
            items-center
            gap-5
          "
        >
          <span
            className="
              shrink-0
              font-stint
              text-[8px]
              uppercase
              tracking-[0.08em]
              text-[#bd9852]
              md:text-[9px]
            "
          >
            Our Philosophy
          </span>

          <div
            className="
              philosophy-line
              h-px
              flex-1
              bg-[#bd9852]/70
            "
          />
        </div>

        {/* ==================================================
            PRINCIPLES
        ================================================== */}

        <div
          ref={cardsRef}
          className="
            mt-7
            grid
            grid-cols-1

            sm:grid-cols-2

            lg:grid-cols-4
          "
        >
          {principles.map(
            (
              {
                number,
                title,
                description,
                Icon,
              },
              index
            ) => (
              <article
                key={title}
                className={`
                  philosophy-card
                  group
                  relative
                  px-0
                  py-7

                  sm:px-6

                  lg:px-5
                  lg:py-2

                  ${
                    index !== 0
                      ? `
                        border-t
                        border-[#bd9852]/35

                        sm:border-t-0
                        sm:border-l
                      `
                      : ""
                  }

                  ${
                    index === 2
                      ? "lg:border-l"
                      : ""
                  }
                `}
              >
                {/* ==================================================
                    NUMBER
                ================================================== */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >
                  <span
                    className="
                      font-stint
                      text-[12px]
                      text-white/75
                    "
                  >
                    {number}
                  </span>

                  <span
                    className="
                      font-stint
                      text-[8px]
                      uppercase
                      tracking-[0.1em]
                      text-[#bd9852]/0
                      transition-all
                      duration-500
                      group-hover:text-[#bd9852]
                    "
                  >
                    0{index + 1}
                  </span>
                </div>

                {/* ==================================================
                    TITLE
                ================================================== */}

                <h3
                  className="
                    mt-1
                    font-stint
                    text-[15px]
                    uppercase
                    tracking-[0.01em]
                    text-white
                    transition-all
                    duration-500

                    group-hover:text-[#bd9852]

                    md:text-[16px]
                  "
                >
                  {title}
                </h3>

                {/* ==================================================
                    GOLD ACCENT
                ================================================== */}

                <div
                  className="
                    mt-3
                    h-px
                    w-8
                    bg-[#bd9852]
                    transition-all
                    duration-500
                    group-hover:w-16
                  "
                />

                {/* ==================================================
                    DESCRIPTION
                ================================================== */}

                <p
                  className="
                    mt-4
                    max-w-[210px]
                    font-stint
                    text-[9px]
                    leading-[1.65]
                    text-white/45
                    transition-all
                    duration-500

                    group-hover:text-white/75

                    md:text-[10px]
                  "
                >
                  {description}
                </p>

                {/* ==================================================
                    ICON
                ================================================== */}

                <div
                  className="
                    mt-6
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    text-[#bd9852]
                  "
                >
                  <Icon
                    className="
                      philosophy-icon
                      h-[20px]
                      w-[20px]
                      stroke-[1]
                      transition-transform
                      duration-500
                      group-hover:scale-110
                    "
                  />
                </div>

                {/* ==================================================
                    HOVER GLOW
                ================================================== */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -inset-3
                    -z-10
                    bg-[radial-gradient(circle_at_30%_50%,rgba(189,152,82,0.08),transparent_65%)]
                    opacity-0
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                  "
                />
              </article>
            )
          )}
        </div>
      </div>

      {/* ==================================================
          BOTTOM BORDER
      ================================================== */}

      <div
        className="
          mx-6
          h-px
          bg-[#bd9852]/50

          sm:mx-8
          md:mx-10
          lg:mx-14
        "
      />
    </section>
  );
}