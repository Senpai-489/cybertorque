"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";

export default function FleetHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const eyebrowRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);

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
        y: 15,
      });

      gsap.set(lineRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      gsap.set(titleRef.current, {
        opacity: 0,
        y: 60,
      });

      gsap.set(descriptionRef.current, {
        opacity: 0,
        y: 25,
      });

      gsap.set(carRef.current, {
        opacity: 0,
        x: 100,
        scale: 1.04,
      });
      if (carRef.current) {
        gsap.set(carRef.current, {
          opacity: 0,
          x: 100,
          scale: 1.04,
        });
      }

      gsap.set(bottomLineRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
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

      tl.to(eyebrowRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
      })

        .to(
          lineRef.current,
          {
            scaleX: 1,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.35"
        )

        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
          },
          "-=0.4"
        )

        .to(
          descriptionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          "-=0.55"
        );

      if (carRef.current) {
        tl.to(
          carRef.current,
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.3,
            ease: "power3.out",
          },
          "-=1"
        );
      }

      tl.to(
        bottomLineRef.current,
        {
          scaleX: 1,
          duration: 0.8,
        },
        "-=0.6"
      );

      /*
      =====================================================
      SUBTLE CAR FLOAT
      =====================================================
      */

      gsap.to(carRef.current, {
        y: -8,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
        bg-[#090909]
        text-white
      "
    >
      {/* ==================================================
          BACKGROUND VIDEO
      ================================================== */}

      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
        "
      >
        <source
          src="/fleet-hero.mp4"
          type="video/mp4"
        />
      </video>

      {/* ==================================================
          VIDEO DARKENING
      ================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-black/40
        "
      />

      {/* ==================================================
          LEFT CINEMATIC GRADIENT
      ================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-black
          via-black/80
          via-[45%]
          to-black/10
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
          h-[35%]
          bg-gradient-to-t
          from-black/80
          to-transparent
        "
      />

      {/* ==================================================
          SUBTLE VIGNETTE
      ================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.45)_100%)]
        "
      />

      {/* ==================================================
          CONTENT
      ================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-screen
          w-full
          max-w-[1600px]
          items-center
          px-6
          pb-10
          pt-[120px]
          md:px-10
          lg:px-14
        "
      >
        {/* ==================================================
            TEXT BLOCK
        ================================================== */}

        <div
          className="
            w-full
            max-w-[700px]
            lg:max-w-[760px]
          "
        >
          {/* EYEBROW */}

          <div
            ref={eyebrowRef}
            className="
              mb-5
              flex
              items-center
              gap-5
            "
          >
            <span
              className="
                shrink-0
                font-stint
                text-[9px]
                uppercase
                tracking-[0.12em]
                text-[#c5a15b]
                md:text-[10px]
              "
            >
              Our Fleet
            </span>

            <div
              ref={lineRef}
              className="
                h-px
                w-[220px]
                bg-[#c5a15b]
                md:w-[310px]
                lg:w-[350px]
              "
            />
          </div>

          {/* ==================================================
              TITLE
          ================================================== */}

          <h1
            ref={titleRef}
            className="
              font-stint
              text-[48px]
              uppercase
              leading-[0.88]
              tracking-[-0.035em]
              sm:text-[64px]
              md:text-[78px]
              lg:text-[92px]
              xl:text-[100px]
            "
          >
            <span className="block text-white">
              Exceptional
            </span>

            <span className="block text-[#c5a15b]">
              By Design
            </span>
          </h1>

          {/* ==================================================
              DESCRIPTION
          ================================================== */}

          <p
            ref={descriptionRef}
            className="
              mt-8
              max-w-[390px]
              font-stint
              text-[10px]
              leading-[1.9]
              text-white/65
              sm:text-[11px]
              md:text-[12px]
            "
          >
            A curated collection of performance,
            luxury and individuality.
            <br />
            Each vehicle selected for character,
            <br className="hidden sm:block" />
            crafted for unforgettable experiences.
          </p>
        </div>

        {/* ==================================================
            OPTIONAL CAR OVERLAY
        ================================================== */}

        {/*
          If your VIDEO already contains the car,
          you don't need fleet-car.png.

          If you want a transparent car layered over
          the video, uncomment this div.
        */}

        {/*
        <div
          ref={carRef}
          className="
            pointer-events-none
            absolute
            -right-[15%]
            bottom-[5%]
            h-[55%]
            w-[75%]
            bg-[url('/fleet-car.png')]
            bg-contain
            bg-right
            bg-no-repeat
            sm:-right-[10%]
            sm:h-[60%]
            sm:w-[70%]
            md:-right-[5%]
            md:h-[65%]
            md:w-[65%]
            lg:right-[-2%]
            lg:h-[72%]
            lg:w-[62%]
          "
        />
        */}
      </div>

      {/* ==================================================
          BOTTOM BORDER
      ================================================== */}

      <div
        ref={bottomLineRef}
        className="
          absolute
          bottom-0
          left-4
          right-4
          z-20
          h-px
          bg-[#c5a15b]
          md:left-8
          md:right-8
          lg:left-14
          lg:right-14
        "
      />

      {/* ==================================================
          SCROLL INDICATOR
      ================================================== */}

      <div
        className="
          absolute
          bottom-7
          right-6
          z-20
          hidden
          items-center
          gap-3
          md:flex
          lg:right-14
        "
      >
        <span
          className="
            font-stint
            text-[8px]
            uppercase
            tracking-[0.15em]
            text-white/50
          "
        >
          Explore Fleet
        </span>

        <ArrowRight
          size={14}
          strokeWidth={1}
          className="text-[#c5a15b]"
        />
      </div>
    </section>
  );
}