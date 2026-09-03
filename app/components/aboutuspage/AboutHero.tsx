"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import gsap from "gsap";

export default function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);

  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

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
        y: 80,
      });

      gsap.set(descriptionRef.current, {
        opacity: 0,
        y: 30,
      });

      gsap.set(buttonRef.current, {
        opacity: 0,
        y: 25,
      });

      gsap.set(lineRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      gsap.set(imageRef.current, {
        scale: 1.08,
      });

      /*
      =====================================================
      HERO ENTRANCE
      =====================================================
      */

      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      tl.to(imageRef.current, {
        scale: 1,
        duration: 2,
        ease: "power3.out",
      })

        .to(
          eyebrowRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          "-=1.35"
        )

        .to(
          lineRef.current,
          {
            scaleX: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4"
        )

        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
          },
          "-=0.45"
        )

        .to(
          descriptionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          "-=0.55"
        )

        .to(
          buttonRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          "-=0.35"
        );

      /*
      =====================================================
      SUBTLE MOUSE PARALLAX
      =====================================================
      */

      const handleMouseMove = (e: MouseEvent) => {
        const rect = section.getBoundingClientRect();

        const x =
          (e.clientX - rect.left) /
            rect.width -
          0.5;

        const y =
          (e.clientY - rect.top) /
            rect.height -
          0.5;

        gsap.to(imageRef.current, {
          x: x * -12,
          y: y * -6,
          duration: 1.2,
          ease: "power3.out",
          overwrite: "auto",
        });
      };

      section.addEventListener(
        "mousemove",
        handleMouseMove
      );

      return () => {
        section.removeEventListener(
          "mousemove",
          handleMouseMove
        );
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        h-screen
        
        min-h-[650px]
        w-full
        overflow-hidden
        bg-black
      "
    >
      {/* ==================================================
          BACKGROUND IMAGE
          Replace this with your actual image
      ================================================== */}

      <div
        ref={imageRef}
        className="
          absolute
          inset-[-2%]
          bg-[url('/about-hero.jpg')]
          bg-cover
          bg-center
          bg-no-repeat
          will-change-transform
        "
      />

      {/* ==================================================
          DARK OVERLAY
      ================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-black/35
        "
      />

      {/* ==================================================
          LEFT / CENTER GRADIENT
          Gives text a clean readable area
      ================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-black/80
          via-black/45
          to-black/10
        "
      />

      {/* ==================================================
          CENTER CINEMATIC VIGNETTE
      ================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_42%_50%,transparent_10%,rgba(0,0,0,0.35)_70%,rgba(0,0,0,0.7)_100%)]
        "
      />

      {/* ==================================================
          TOP FADE
      ================================================== */}

      <div
        className="
          absolute
          inset-x-0
          top-0
          h-40
          bg-gradient-to-b
          from-black/70
          to-transparent
        "
      />

      {/* ==================================================
          HERO CONTENT
          CENTERED
      ================================================== */}

      <div
        className="
          relative
          z-10
          flex
          mt-20
          h-full
          w-full
          items-center
          justify-center
          px-6
          text-center
          sm:px-10
        "
      >
        <div
          className="
            flex
            w-full
            max-w-[1100px]
            flex-col
            items-center
          "
        >
          {/* ==================================================
              EYEBROW
          ================================================== */}

          <div
            ref={eyebrowRef}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-5
              md:gap-7
            "
          >
            <span
              className="
                whitespace-nowrap
                font-stint
                text-[9px]
                uppercase
                tracking-[0.18em]
                text-[#c5a15b]
                md:text-[10px]
              "
            >
              About Us
            </span>

            <div
              ref={lineRef}
              className="
                h-px
                w-[90px]
                bg-[#c5a15b]
                sm:w-[140px]
                md:w-[220px]
              "
            />

            <span
              className="
                hidden
                whitespace-nowrap
                font-stint
                text-[8px]
                uppercase
                tracking-[0.12em]
                text-white/50
                sm:block
              "
            >
              Since 2026
            </span>
          </div>

          {/* ==================================================
              TITLE
          ================================================== */}

          <h1
            ref={titleRef}
            className="
              mt-7
              w-screen
              font-stint
              text-[48px]
              uppercase
              leading-[0.88]
              tracking-[-0.035em]
              text-white

              sm:text-[32px]

              md:text-[32px]

              lg:text-[56px]

              xl:text-[70px]
            "
          >
            <span className="block">
              More Than A Machine.
            </span>

            

            <span className="block text-[#c5a15b]">
              A Standard Of Driving.
            </span>

           
          </h1>

          {/* ==================================================
              DESCRIPTION
          ================================================== */}

          <p
            ref={descriptionRef}
            className="
              mt-7
              max-w-[460px]
              font-stint
              text-[10px]
              leading-[1.8]
              text-white/70
              sm:text-[11px]
              md:text-[12px]
            "
          >
            Cyber Torque is where performance
            meets purpose and every drive
            becomes an experience.
          </p>

          {/* ==================================================
              CTA
          ================================================== */}

          <Link
            ref={buttonRef}
            href="/cars"
            className="
              group
              mt-8
              flex
              h-[48px]
              items-center
              gap-6
              border
              border-[#c5a15b]
              bg-[#c5a15b]
              px-6
              font-stint
              text-[9px]
              uppercase
              tracking-[0.08em]
              text-black
              transition-all
              duration-500
              hover:bg-transparent
              hover:text-[#c5a15b]
              sm:h-[52px]
              sm:px-7
            "
          >
            <span>
              Explore Our Fleet
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

      {/* ==================================================
          BOTTOM SCROLL INDICATOR
      ================================================== */}

      <div
        className="
          absolute
          bottom-7
          left-1/2
          z-20
          flex
          -translate-x-1/2
          flex-col
          items-center
          gap-2
        "
      >
        <span
          className="
            font-stint
            text-[8px]
            uppercase
            tracking-[0.16em]
            text-white/50
          "
        >
          Scroll To Discover
        </span>

        <ArrowDown
          size={15}
          strokeWidth={1}
          className="
            animate-bounce
            text-[#c5a15b]
          "
        />
      </div>

      {/* ==================================================
          BOTTOM FADE
      ================================================== */}

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          h-32
          bg-gradient-to-t
          from-black/70
          to-transparent
        "
      />
    </section>
  );
}