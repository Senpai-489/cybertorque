"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const driveRef = useRef<HTMLSpanElement>(null);
  const extraordinaryRef = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    const hero = heroRef.current;

    if (!hero) return;

    const ctx = gsap.context(() => {
      /*
      ==================================================
      ENTRY ANIMATION
      ==================================================
      */

      const entry = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      entry
        .fromTo(
          eyebrowRef.current,
          {
            y: 40,
            opacity: 0,
            filter: "blur(8px)",
          },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
          }
        )

        .fromTo(
          driveRef.current,
          {
            yPercent: 110,
            opacity: 0,
          },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
          },
          "-=0.6"
        )

        .fromTo(
          extraordinaryRef.current,
          {
            yPercent: 110,
            opacity: 0,
          },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.1,
          },
          "-=0.75"
        )

        .fromTo(
          ctaRef.current,
          {
            y: 35,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
          },
          "-=0.4"
        );

      /*
      ==================================================
      SCROLL ANIMATION
      ==================================================

      IMPORTANT:

      We explicitly define BOTH states.

      FROM:
      Hero is fully visible.

      TO:
      Hero disappears.

      Because ScrollTrigger controls the progress,
      scrolling back UP automatically reverses it.
      ==================================================
      */

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: hero,

          start: "top top",

          end: "+=100%",

          scrub: 1,

          pin: true,

          anticipatePin: 1,

          invalidateOnRefresh: true,
        },
      });

      /*
      ------------------------------------------
      EYEBROW
      ------------------------------------------
      */

      scrollTimeline.fromTo(
        eyebrowRef.current,
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          letterSpacing: "1rem",
        },
        {
          y: -100,
          opacity: 0,
          filter: "blur(5px)",
          letterSpacing: "1.5em",
          ease: "none",
        },
        0
      );

      /*
      ------------------------------------------
      DRIVE
      ------------------------------------------
      */

      scrollTimeline.fromTo(
        driveRef.current,
        {
          y: 0,
          opacity: 1,
          scale: 1,
        },
        {
          y: -140,
          opacity: 0,
          scale: 0.9,
          ease: "none",
        },
        0
      );

      /*
      ------------------------------------------
      EXTRAORDINARY
      ------------------------------------------
      */

      scrollTimeline.fromTo(
        extraordinaryRef.current,
        {
          y: 0,
          opacity: 1,
          scale: 1,
        },
        {
          y: -200,
          opacity: 0,
          scale: 0.86,
          ease: "none",
        },
        0.05
      );

      /*
      ------------------------------------------
      CTA
      ------------------------------------------
      */

      scrollTimeline.fromTo(
        ctaRef.current,
        {
          y: 0,
          opacity: 1,
          scale: 1,
        },
        {
          y: 100,
          opacity: 0,
          scale: 0.9,
          ease: "none",
        },
        0.05
      );

      /*
      ------------------------------------------
      CONTENT SCALE
      ------------------------------------------
      */

      scrollTimeline.fromTo(
        contentRef.current,
        {
          scale: 1,
        },
        {
          scale: 0.94,
          ease: "none",
        },
        0
      );

      /*
      ------------------------------------------
      VIDEO ZOOM
      ------------------------------------------
      */

      scrollTimeline.fromTo(
        videoRef.current,
        {
          scale: 1.08,
        },
        {
          scale: 1.18,
          ease: "none",
        },
        0
      );

      /*
      ------------------------------------------
      REFRESH
      ------------------------------------------
      */

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, hero);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen min-h-[650px] w-full overflow-hidden bg-black"
    >
      {/* ==================================================
          VIDEO
      ================================================== */}

      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* ==================================================
          CINEMATIC OVERLAY
      ================================================== */}

      <div className="absolute inset-0 bg-black/45" />

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/20" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(0,0,0,0.5)_100%)]" />

      {/* ==================================================
          HERO CONTENT
      ================================================== */}

      <div
        ref={contentRef}
        className="relative z-10 flex h-full items-center justify-center px-6 text-center"
      >
        <div className="flex max-w-[1100px] flex-col items-center">

          {/* EYEBROW */}

          <div className="mb-3 overflow-hidden md:mb-8">
            <p
              ref={eyebrowRef}
              className="
                w-screen
                font-stint
                text-[10px]
                uppercase
                tracking-[1rem]
                text-white/90
                sm:text-xs
                md:text-[13px]
                md:tracking-[1.5rem]
              "
            >
             INFINITY | PERFORMANCE | PRECISION
            </p>
          </div>

          {/* ==================================================
              TITLE
          ================================================== */}

          <h1
            className="
              font-stint
              text-[58px]
              font-light
              uppercase
              leading-[0.9]
              tracking-[-0.04em]
              text-[#c5a15b]
              sm:text-[75px]
              md:text-[105px]
              lg:text-[105px]
            "
          >
            {/* DRIVE */}

            <span className="block overflow-hidden">
              <span
                ref={driveRef}
                className="block"
              >
                Drive
              </span>
            </span>

            {/* EXTRAORDINARY */}

            <span className="block overflow-hidden">
              <span
                ref={extraordinaryRef}
                className="block"
              >
                Extraordinary
              </span>
            </span>
          </h1>

          {/* ==================================================
              CTA
          ================================================== */}

          <Link
            ref={ctaRef}
            href="/cars"
            className="
              group
              mt-10
              flex
              h-[54px]
              w-[260px]
              items-center
              justify-between
              bg-[#c5a15b]
              px-7
              font-stint
              text-[18px]
              text-black
              transition-colors
              duration-500
              hover:bg-[#d6b66d]
              sm:w-[300px]
            "
          >
            <span>Explore The Fleet</span>

            <ArrowRight
              size={24}
              strokeWidth={1.5}
              className="
                transition-transform
                duration-500
                group-hover:translate-x-2
              "
            />
          </Link>
        </div>
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
          from-black/50
          to-transparent
        "
      />
    </section>
  );
}