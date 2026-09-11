"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {Ballet } from "next/font/google";
const ballet = Ballet({ subsets: ["latin"] });
gsap.registerPlugin(ScrollTrigger);

export default function OurStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);

  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<HTMLDivElement>(null);

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
        y: 20,
      });

      gsap.set(titleRef.current, {
        opacity: 0,
        y: 45,
      });

      gsap.set(copyRef.current, {
        opacity: 0,
        y: 30,
      });

      gsap.set(signatureRef.current, {
        opacity: 0,
        y: 20,
      });

      gsap.set(imageRef.current, {
        opacity: 0,
        x: 50,
      });

      /*
      =====================================================
      CONTENT REVEAL
      =====================================================
      */

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          toggleActions:
            "play none none reverse",
        },
      });

      tl.to(eyebrowRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      })
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.35"
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
          signatureRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.35"
        )
        .to(
          imageRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=1"
        );

      /*
      =====================================================
      IMAGE PARALLAX
      =====================================================
      */

      gsap.fromTo(
        imageInnerRef.current,
        {
          yPercent: -7,
          scale: 1.08,
        },
        {
          yPercent: 7,
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
        z-20
        w-full
        overflow-hidden
        bg-[#e9e7e2]
        text-[#202020]
      "
    >
      {/* ==================================================
          OUTER CONTAINER
      ================================================== */}

      <div
        className="
          mx-auto
          max-w-[1600px]
          px-5
          py-8

          sm:px-8

          md:px-10
          md:py-10

          lg:px-14
          lg:py-12

          xl:px-16
        "
      >
        {/* ==================================================
            TOP META
        ================================================== */}

        <div
          ref={eyebrowRef}
          className="
            flex
            items-center
            gap-5
            border-t
            border-[#202020]/45
            pt-3
          "
        >
          <span
            className="
              shrink-0
              font-stint
              text-[8px]
              uppercase
              tracking-[0.06em]
              text-[#202020]
              md:text-[9px]
            "
          >
            Our Story
          </span>

          <div
            className="
              h-px
              flex-1
              bg-[#202020]/20
            "
          />

          <span
            className="
              shrink-0
              font-stint
              text-[8px]
              uppercase
              tracking-[0.06em]
              text-[#202020]/70
              md:text-[9px]
            "
          >
            Since 2026
          </span>
        </div>

        {/* ==================================================
            MAIN CONTENT
        ================================================== */}

        <div
          className="
            mt-7
            grid
            grid-cols-1
            items-center
            gap-10

            md:mt-8
            md:grid-cols-[0.72fr_1.28fr]
            md:gap-8

            lg:grid-cols-[0.72fr_1.28fr]
            lg:gap-12

            xl:gap-16
          "
        >
          {/* ==================================================
              LEFT — TEXT
          ================================================== */}

          <div className="relative">
            <h2
              ref={titleRef}
              className="
                font-stint
                text-[42px]
                uppercase
                leading-[0.9]
                tracking-[-0.035em]
                text-[#202020]

                sm:text-[50px]

                md:text-[49px]

                lg:text-[58px]

                xl:text-[64px]
              "
            >
              The Art Of
              <br />

              Automotive
              <br />

              <span className="text-[#bd9852]">
                Individuality.
              </span>
            </h2>

            {/* ==================================================
                DESCRIPTION
            ================================================== */}

            <div
              ref={copyRef}
              className="
                mt-7
                max-w-[370px]
                space-y-5
                font-stint
                text-[10px]
                leading-[1.75]
                text-[#202020]/75

                sm:text-[11px]

                md:mt-8

                lg:text-[11px]
              "
            >
              <p>
                Founded with a vision to redefine the
                automotive experience, Cyber Torque
                brings together performance, luxury,
                and precision in one place.
              </p>

              <p>
                We carefully source, curate, and
                deliver vehicles that reflect
                personality, elevate lifestyle, and
                inspire every drive.
              </p>
            </div>

            {/* ==================================================
                SIGNATURE
            ================================================== */}

            <div
              ref={signatureRef}
              className={` 
                mt-6
                ${ballet.className}
                text-[25px]
                italic
                text-[#bd9852]
                md:mt-7
                md:text-[28px]
              `}
            >
              Cyber Torque
            </div>
          </div>

          {/* ==================================================
              RIGHT — IMAGE
          ================================================== */}

          <div
            ref={imageRef}
            className="
              relative
              w-full
              will-change-transform
            "
          >
            {/* GOLD OFFSET FRAME */}

            <div
              className="
                absolute
                -left-4
                top-4
                h-full
                w-full
                border
                border-[#bd9852]/70

                md:-left-5
                md:top-5

                lg:-left-6
                lg:top-6
              "
            />

            {/* IMAGE */}

            <div
              className="
                relative
                z-10
                aspect-[1.5/1]
                w-full
                overflow-hidden
                bg-[#171717]
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
                  src="/our-story.jpg"
                  alt="Cyber Torque luxury vehicle"
                  fill
                  priority
                  className="
                    object-cover
                  "
                  sizes="
                    (max-width: 768px) 100vw,
                    65vw
                  "
                />
              </div>

              {/* subtle overlay */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/15
                  via-transparent
                  to-black/5
                "
              />
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================
          BOTTOM LINE
      ================================================== */}

      <div
        className="
          mx-5
          h-px
          bg-[#202020]/35

          sm:mx-8

          md:mx-10

          lg:mx-14

          xl:mx-16
        "
      />
    </section>
  );
}