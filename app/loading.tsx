"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Loading() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loader = loaderRef.current;
    const logo = logoRef.current;
    const content = contentRef.current;
    const progressBar = progressRef.current;

    if (!loader || !logo || !content || !progressBar) return;

    const ctx = gsap.context(() => {
      // ------------------------------------------
      // INITIAL STATE
      // ------------------------------------------

      gsap.set(logo, {
        opacity: 0,
        scale: 0.9,
        y: 25,
      });

      gsap.set(content, {
        opacity: 0,
        y: 20,
      });

      gsap.set(progressBar, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      // ------------------------------------------
      // INTRO
      // ------------------------------------------

      const intro = gsap.timeline();

      intro
        .to(logo, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        })
        .to(
          content,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.5"
        );

      // ------------------------------------------
      // LOADING PROGRESS
      // ------------------------------------------

      const progressObject = {
        value: 0,
      };

      gsap.to(progressObject, {
        value: 100,
        duration: 2.4,
        delay: 0.4,
        ease: "power2.inOut",

        onUpdate: () => {
          const value = Math.round(progressObject.value);

          setProgress(value);

          gsap.set(progressBar, {
            scaleX: progressObject.value / 100,
          });
        },
      });

      // ------------------------------------------
      // SUBTLE LOGO FLOAT
      // ------------------------------------------

      gsap.to(logo, {
        y: -4,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={loaderRef}
      className="
        fixed
        inset-0
        z-[9999]
        flex
        min-h-screen
        items-center
        justify-center
        overflow-hidden
        bg-[#111111]
        text-white
      "
    >
      {/* =========================================
          SUBTLE CENTER GLOW
      ========================================= */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[500px]
          w-[500px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#bd9852]/[0.035]
          blur-[120px]
        "
      />

      {/* =========================================
          TOP BAR
      ========================================= */}

      <div
        className="
          absolute
          left-6
          right-6
          top-6

          sm:left-8
          sm:right-8

          md:left-12
          md:right-12
        "
      >
        <div className="flex items-center gap-5 border-t border-white/15 pt-3">
          <span
            className="
              font-stint
              text-[8px]
              uppercase
              tracking-[0.1em]
              text-[#bd9852]
            "
          >
            Cyber Torque
          </span>

          <div className="h-px flex-1 bg-white/10" />

          <span
            className="
              font-stint
              text-[8px]
              uppercase
              tracking-[0.1em]
              text-white/30
            "
          >
            2026
          </span>
        </div>
      </div>

      {/* =========================================
          CENTER CONTENT
      ========================================= */}

      <div
        className="
          relative
          z-10
          flex
          w-full
          max-w-[480px]
          flex-col
          items-center
          px-8
        "
      >
        {/* LOGO */}

        <div
          ref={logoRef}
          className="
            relative
            flex
            items-center
            justify-center
          "
        >
          <Image
            src="/logo.png"
            alt="Cyber Torque"
            width={120}
            height={120}
            priority
            className="
              h-[70px]
              w-auto
              object-contain

              md:h-[90px]
            "
          />
        </div>

        {/* WORDMARK */}

        <div
          className="
            mt-5
            font-stint
            text-[17px]
            uppercase
            tracking-[0.2em]
            text-white/90

            md:text-[20px]
          "
        >
          Cyber Torque
        </div>

        {/* =====================================
            LOADING CONTENT
        ===================================== */}

        <div
          ref={contentRef}
          className="mt-14 w-full"
        >
          {/* TOP */}

          <div className="flex items-center justify-between">
            <span
              className="
                font-stint
                text-[8px]
                uppercase
                tracking-[0.1em]
                text-white/40
              "
            >
              Preparing Your Experience
            </span>

            <span
              className="
                font-stint
                text-[10px]
                tabular-nums
                text-[#bd9852]
              "
            >
              {String(progress).padStart(2, "0")}%
            </span>
          </div>

          {/* PROGRESS BAR */}

          <div
            className="
              relative
              mt-4
              h-px
              w-full
              overflow-hidden
              bg-white/15
            "
          >
            <div
              ref={progressRef}
              className="
                absolute
                inset-y-0
                left-0
                w-full
                bg-[#bd9852]
              "
            />
          </div>

          {/* BOTTOM LABELS */}

          <div className="mt-3 flex items-center justify-between">
            <span
              className="
                font-stint
                text-[7px]
                uppercase
                tracking-[0.08em]
                text-white/20
              "
            >
              Performance
            </span>

            <span
              className="
                font-stint
                text-[7px]
                uppercase
                tracking-[0.08em]
                text-white/20
              "
            >
              Precision
            </span>

            <span
              className="
                font-stint
                text-[7px]
                uppercase
                tracking-[0.08em]
                text-white/20
              "
            >
              Experience
            </span>
          </div>
        </div>
      </div>

      {/* =========================================
          BOTTOM
      ========================================= */}

      <div
        className="
          absolute
          bottom-6
          left-6
          right-6

          sm:left-8
          sm:right-8

          md:left-12
          md:right-12
        "
      >
        <div className="flex items-end justify-between border-b border-white/15 pb-3">
          <span
            className="
              font-stint
              text-[7px]
              uppercase
              tracking-[0.1em]
              text-white/20
            "
          >
            The Art Of Automotive
          </span>

          <span
            className="
              font-stint
              text-[7px]
              uppercase
              tracking-[0.1em]
              text-white/20
            "
          >
            Est. 2026
          </span>
        </div>
      </div>
    </main>
  );
}