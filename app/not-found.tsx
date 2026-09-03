"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function NotFound() {
  const pageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const page = pageRef.current;

    if (!page) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".error-image",
        {
          scale: 1.12,
        },
        {
          scale: 1,
          duration: 2,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        ".error-content > *",
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        ".error-number",
        {
          opacity: 0,
          scale: 0.85,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: 0.15,
          ease: "power3.out",
        }
      );
    }, page);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={pageRef}
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#111111]
        text-white
      "
    >
      {/* =====================================================
          BACKGROUND IMAGE
      ===================================================== */}

      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/404-car.jpg"
          alt="Cyber Torque"
          fill
          priority
          className="
            error-image
            object-cover
          "
          sizes="100vw"
        />
      </div>

      {/* =====================================================
          CINEMATIC OVERLAYS
      ===================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-black/45
        "
      />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-black/90
          via-black/55
          to-black/15
        "
      />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/80
          via-transparent
          to-black/30
        "
      />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-screen
          max-w-[1500px]
          flex-col
          justify-between
          px-6
          py-7

          sm:px-8

          md:px-10
          md:py-9

          lg:px-14
        "
      >
        {/* ==================================================
            TOP META
        ================================================== */}

        <div
          className="
            flex
            items-center
            gap-5
            border-t
            border-white/25
            pt-3
          "
        >
          <span
            className="
              font-stint
              text-[8px]
              uppercase
              tracking-[0.08em]
              text-[#bd9852]
            "
          >
            Cyber Torque
          </span>

          <div
            className="
              h-px
              flex-1
              bg-white/15
            "
          />

          <span
            className="
              font-stint
              text-[8px]
              uppercase
              tracking-[0.08em]
              text-white/45
            "
          >
            Navigation Error
          </span>
        </div>

        {/* ==================================================
            MAIN
        ================================================== */}

        <div
          className="
            error-content
            relative
            flex
            flex-1
            items-center
            py-20
          "
        >
          <div className="max-w-[850px]">
            {/* 404 */}

            <div
              className="
                error-number
                font-stint
                text-[100px]
                leading-none
                tracking-[-0.07em]
                text-[#bd9852]

                sm:text-[140px]

                md:text-[180px]

                lg:text-[220px]
              "
            >
              404
            </div>

            {/* TITLE */}

            <h1
              className="
                mt-2
                font-stint
                text-[40px]
                uppercase
                leading-[0.9]
                tracking-[-0.035em]
                text-white

                sm:text-[48px]

                md:text-[62px]

                lg:text-[72px]
              "
            >
              Wrong Turn.
              <br />

              <span className="text-[#bd9852]">
                Beautiful Road.
              </span>
            </h1>

            {/* DESCRIPTION */}

            <p
              className="
                mt-7
                max-w-[420px]
                font-stint
                text-[10px]
                leading-[1.8]
                text-white/60

                sm:text-[11px]

                md:text-[12px]
              "
            >
              Looks like you've taken a road that
              doesn't exist. Don't worry there's
              always another road worth taking.
            </p>

            {/* ACTIONS */}

            <div
              className="
                mt-9
                flex
                flex-col
                gap-3

                sm:flex-row
              "
            >
              {/* HOME */}

              <Link
                href="/"
                className="
                  group
                  flex
                  h-[48px]
                  items-center
                  gap-5
                  bg-[#bd9852]
                  px-6
                  font-stint
                  text-[9px]
                  uppercase
                  tracking-[0.08em]
                  text-[#181818]
                  transition-all
                  duration-500

                  hover:bg-[#cba961]
                "
              >
                <ArrowLeft
                  size={15}
                  strokeWidth={1.2}
                  className="
                    transition-transform
                    duration-500
                    group-hover:-translate-x-1
                  "
                />

                <span>
                  Return Home
                </span>
              </Link>

              {/* FLEET */}

              <Link
                href="/our-fleet"
                className="
                  group
                  flex
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
                  Explore The Fleet
                </span>

                <ArrowUpRight
                  size={15}
                  strokeWidth={1.2}
                  className="
                    transition-transform
                    duration-500
                    group-hover:-translate-y-1
                    group-hover:translate-x-1
                  "
                />
              </Link>
            </div>
          </div>
        </div>

        {/* ==================================================
            BOTTOM
        ================================================== */}

        <div
          className="
            flex
            items-end
            justify-between
            border-b
            border-white/20
            pb-3
          "
        >
          <span
            className="
              font-stint
              text-[8px]
              uppercase
              tracking-[0.08em]
              text-white/40
            "
          >
            Lost somewhere between
            <span className="text-[#bd9852]">
              {" "}
              point A
            </span>
            {" "}
            and
            <span className="text-[#bd9852]">
              {" "}
              extraordinary.
            </span>
          </span>

          <span
            className="
              hidden
              font-stint
              text-[8px]
              uppercase
              tracking-[0.08em]
              text-white/40
              sm:block
            "
          >
            2026
          </span>
        </div>
      </div>
    </main>
  );
}