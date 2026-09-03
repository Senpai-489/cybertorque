"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
gsap.registerPlugin(ScrollTrigger);

export default function OurFounder() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);

  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      /*
      =====================================================
      INITIAL STATES
      =====================================================
      */

      gsap.set(eyebrowRef.current, {
        opacity: 0,
        y: 25,
      });

      gsap.set(titleRef.current, {
        opacity: 0,
        y: 60,
      });

      gsap.set(copyRef.current, {
        opacity: 0,
        y: 35,
      });

      gsap.set(quoteRef.current, {
        opacity: 0,
        y: 30,
      });

      gsap.set(imageRef.current, {
        opacity: 0,
        x: -60,
      });

      /*
      =====================================================
      CONTENT REVEAL
      =====================================================
      */

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(eyebrowRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      })
        .to(
          imageRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.35"
        )
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.65"
        )
        .to(
          copyRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.45"
        )
        .to(
          quoteRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.35"
        );

      /*
      =====================================================
      IMAGE PARALLAX
      =====================================================
      */

      gsap.fromTo(
        imageInnerRef.current,
        {
          yPercent: -8,
          scale: 1.1,
        },
        {
          yPercent: 8,
          scale: 1,
          ease: "none",

          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
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
        bg-[#191919]
        text-white
      "
    >
      {/* ==================================================
          BACKGROUND GLOW
      ================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_25%_50%,rgba(189,152,82,0.10),transparent_35%)]
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
          py-20

          sm:px-8
          sm:py-24

          md:px-10
          md:py-28

          lg:px-14
          lg:py-32
        "
      >
        {/* ==================================================
            HEADER
        ================================================== */}

        <div
          ref={eyebrowRef}
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
            Our Founder
          </span>

          <div
            className="
              h-px
              flex-1
              bg-[#bd9852]/50
            "
          />

          <span
            className="
              hidden
              shrink-0
              font-stint
              text-[8px]
              uppercase
              tracking-[0.08em]
              text-white/45
              sm:block
            "
          >
            The Vision Behind Cyber Torque
          </span>
        </div>

        {/* ==================================================
            MAIN GRID
        ================================================== */}

        <div
          className="
            mt-12
            grid
            grid-cols-1
            items-center
            gap-12

            md:grid-cols-[0.9fr_1.1fr]
            md:gap-14

            lg:mt-16
            lg:grid-cols-[0.85fr_1.15fr]
            lg:gap-20
          "
        >
          {/* ==================================================
              FOUNDER IMAGE
          ================================================== */}

          <div
            ref={imageRef}
            className="
              relative
              mx-auto
              w-full
              max-w-[570px]
              md:mx-0
            "
          >
            {/* GOLD OFFSET FRAME */}

            <div
              className="
                absolute
                -bottom-5
                -left-5
                h-full
                w-full
                border
                border-[#bd9852]/70

                md:-bottom-6
                md:-left-6
              "
            />

            {/* IMAGE */}

            <div
              className="
                relative
                z-10
                aspect-[0.82/1]
                overflow-hidden
                bg-[#111]
              "
            >
              <div
                ref={imageInnerRef}
                className="
                  absolute
                  -inset-[8%]
                  will-change-transform
                "
              >
                <Image
                  src="/founder.jpg"
                  alt="Founder of Cyber Torque"
                  fill
                  className="object-cover"
                  sizes="
                    (max-width: 768px) 100vw,
                    45vw
                  "
                />
              </div>

              {/* IMAGE GRADIENT */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/50
                  via-transparent
                  to-black/10
                "
              />

              {/* IMAGE LABEL */}

              <div
                className="
                  absolute
                  bottom-5
                  left-5
                  z-20
                  font-stint
                  text-[8px]
                  uppercase
                  tracking-[0.12em]
                  text-white/65
                "
              >
                Cyber Torque
              </div>
            </div>
          </div>

          {/* ==================================================
              CONTENT
          ================================================== */}

          <div>
            <h2
              ref={titleRef}
              className="
                max-w-[800px]
                font-stint
                text-[48px]
                uppercase
                leading-[0.88]
                tracking-[-0.04em]

                sm:text-[60px]

                md:text-[64px]

                lg:text-[78px]

                xl:text-[90px]
              "
            >
              Driven By
              <br />

              <span className="text-[#bd9852]">
                A Vision.
              </span>
            </h2>

            {/* ==================================================
                FOUNDER NAME
            ================================================== */}

            <div
              ref={copyRef}
              className="mt-8"
            >
              <p
                className="
                  font-stint
                  text-[10px]
                  uppercase
                  tracking-[0.12em]
                  text-[#bd9852]
                  md:text-[11px]
                "
              >
                Founder & Director
              </p>

              <h3
                className="
                  mt-2
                  font-stint
                  text-[22px]
                  uppercase
                  text-white
                  md:text-[26px]
                "
              >
                [ Founder Name ]
              </h3>

              <div
                className="
                  mt-6
                  h-px
                  w-16
                  bg-[#bd9852]
                "
              />

              <div
                className="
                  mt-6
                  max-w-[540px]
                  space-y-5
                  font-stint
                  text-[10px]
                  leading-[1.85]
                  text-white/60

                  sm:text-[11px]

                  md:text-[12px]
                "
              >
                <p>
                  Cyber Torque was born from a belief
                  that finding the right vehicle should
                  be about more than specifications,
                  numbers, or badges.
                </p>

                <p>
                  It should be about character.
                  About individuality. About the
                  feeling you get when you finally
                  find the machine that feels like
                  it was made for you.
                </p>

                <p>
                  That philosophy continues to shape
                  every vehicle we source, every
                  detail we consider, and every
                  experience we create.
                </p>
              </div>
            </div>

            {/* ==================================================
                FOUNDER QUOTE
            ================================================== */}

            <div
              className="
                mt-10
                border-l
                border-[#bd9852]
                pl-5
                md:mt-12
                md:pl-7
              "
            >
              <p
                ref={quoteRef}
                className="
                  max-w-[600px]
                  font-stint
                  text-[18px]
                  uppercase
                  leading-[1.2]
                  tracking-[-0.02em]
                  text-white/90

                  sm:text-[21px]

                  md:text-[25px]

                  lg:text-[28px]
                "
              >
                "The right car doesn't just
                take you somewhere.
                It becomes part of who
                you are."
              </p>
            </div>

            {/* ==================================================
                CTA
            ================================================== */}

            <Link
              href="/contact-us"
              className="
                group
                mt-10
                inline-flex
                h-[48px]
                items-center
                gap-5
                border
                border-[#bd9852]
                px-6
                font-stint
                text-[9px]
                uppercase
                tracking-[0.08em]
                text-[#bd9852]
                transition-all
                duration-500

                hover:bg-[#bd9852]
                hover:text-[#181818]
              "
            >
              <span>
                Connect With Us
              </span>

              <ArrowUpRight
                size={15}
                strokeWidth={1.2}
                className="
                  transition-transform
                  duration-500
                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                "
              />
            </Link>
          </div>
        </div>
      </div>

      {/* ==================================================
          BOTTOM LINE
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