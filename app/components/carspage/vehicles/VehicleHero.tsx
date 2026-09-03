"use client";

import Image from "next/image";
import {
  ArrowRight,
  Gauge,
  Timer,
  Zap,
  ChevronDown,
} from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {Bruno_Ace_SC} from "next/font/google";

const brunoAceSC = Bruno_Ace_SC({subsets: ["latin"], weight: "400", display: "swap"});

gsap.registerPlugin(ScrollTrigger);

interface VehicleHeroProps {
  brand?: string;
  model?: string;
  tagline?: string;

  vehicleImage: string;
  backgroundImage: string;

  maxSpeed?: string;
  acceleration?: string;
  horsepower?: string;

  logo?: string;
  customizeHref?: string;

  onCustomize?: () => void;
}

export default function VehicleHero({
  brand = "FORD",
  model = "MUSTANG",
  tagline = "DISCOVER YOUR RIDE",

  vehicleImage = "/vehicles/mustang.png",
  backgroundImage = "/vehicles/mustang-bg.jpg",

  maxSpeed = "320",
  acceleration = "3.2",
  horsepower = "480",

  logo = "/brands/ford.png",
  customizeHref,

  onCustomize,
}: VehicleHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      /*
      =========================================================
      INITIAL STATES
      =========================================================
      */

      gsap.set(".vehicle-bg", {
        scale: 1.08,
      });

      gsap.set(".vehicle-topline", {
        opacity: 0,
        y: -15,
      });

      gsap.set(".vehicle-copy", {
        opacity: 0,
        x: -45,
      });

      gsap.set(".vehicle-label", {
        opacity: 0,
        y: 20,
      });

      gsap.set(".vehicle-title", {
        opacity: 0,
        y: 30,
      });

      gsap.set(".vehicle-description", {
        opacity: 0,
        y: 20,
      });

      gsap.set(".vehicle-cta", {
        opacity: 0,
        y: 20,
      });

      gsap.set(".vehicle-car-wrap", {
        opacity: 0,
        x: 90,
        scale: 0.94,
      });

      gsap.set(".vehicle-car-glow", {
        opacity: 0,
        scale: 0.7,
      });

      gsap.set(".vehicle-stat", {
        opacity: 0,
        y: 25,
      });

      gsap.set(".vehicle-scroll", {
        opacity: 0,
      });

      /*
      =========================================================
      ENTRANCE ANIMATION
      =========================================================
      */

      const intro = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      intro
        .to(".vehicle-bg", {
          scale: 1,
          duration: 1.8,
          ease: "power3.out",
        })

        .to(
          ".vehicle-topline",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          "-=1.2"
        )

        .to(
          ".vehicle-copy",
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
          },
          "-=0.9"
        )

        .to(
          ".vehicle-label",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          "-=0.55"
        )

        .to(
          ".vehicle-title",
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power4.out",
          },
          "-=0.45"
        )

        .to(
          ".vehicle-description",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          "-=0.45"
        )

        .to(
          ".vehicle-car-wrap",
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.25,
            ease: "power4.out",
          },
          "-=1"
        )

        .to(
          ".vehicle-car-glow",
          {
            opacity: 1,
            scale: 1,
            duration: 1,
          },
          "-=1"
        )

        .to(
          ".vehicle-cta",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          "-=0.5"
        )

        .to(
          ".vehicle-stat",
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.08,
          },
          "-=0.25"
        )

        .to(
          ".vehicle-scroll",
          {
            opacity: 1,
            duration: 0.5,
          },
          "-=0.2"
        );

      /*
      =========================================================
      CAR FLOATING ANIMATION

      IMPORTANT:
      This runs on the INNER wrapper.
      ScrollTrigger runs on the OUTER wrapper.
      Therefore transforms don't fight each other.
      =========================================================
      */

      gsap.to(".vehicle-car-inner", {
        y: -8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      /*
      =========================================================
      GLOW
      =========================================================
      */

      gsap.to(".vehicle-car-glow", {
        opacity: 0.55,
        scale: 1.08,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      /*
      =========================================================
      BACKGROUND PARALLAX
      =========================================================
      */

      gsap.to(".vehicle-bg", {
        yPercent: 10,
        ease: "none",

        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      /*
      =========================================================
      GIANT MODEL TEXT PARALLAX
      =========================================================
      */

      gsap.to(".vehicle-giant-title", {
        xPercent: -4,
        yPercent: -8,
        ease: "none",

        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      /*
      =========================================================
      CAR PARALLAX
      =========================================================
      */

      gsap.to(".vehicle-car-wrap", {
        yPercent: -7,
        xPercent: 2,
        scale: 1.025,
        ease: "none",

        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      /*
      =========================================================
      LEFT COPY PARALLAX
      =========================================================
      */

      gsap.to(".vehicle-copy", {
        yPercent: -8,
        ease: "none",

        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      /*
      =========================================================
      CTA FADE OUT
      =========================================================
      */

      gsap.to(".vehicle-cta", {
        y: 30,
        opacity: 0,

        scrollTrigger: {
          trigger: section,
          start: "35% top",
          end: "70% top",
          scrub: 1,
        },
      });

      /*
      =========================================================
      REFRESH
      =========================================================
      */

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        h-screen
        min-h-[720px]
        w-full
        overflow-hidden
        bg-[#090909]
        text-white
      "
    >
      {/* =====================================================
          BACKGROUND IMAGE
      ===================================================== */}

      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="
            vehicle-bg
            object-cover
            will-change-transform
          "
        />
      </div>

      {/* =====================================================
          CINEMATIC OVERLAY
      ===================================================== */}

      <div className="absolute inset-0 bg-black/35" />

      {/* Heavy left gradient */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-black
          via-black/70
          to-transparent
        "
      />

      {/* Bottom gradient */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black
          via-transparent
          to-black/55
        "
      />

      {/* Center vignette */}

      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_70%_55%,transparent_15%,rgba(0,0,0,0.55)_80%)]
        "
      />

      {/* =====================================================
          GOLD CORNER FRAME
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-3
          top-3
          h-24
          w-24
          border-l
          border-t
          border-[#bd9852]/50
          md:left-5
          md:top-5
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          right-3
          top-3
          h-16
          w-16
          border-r
          border-t
          border-[#bd9852]/30
          md:right-5
          md:top-5
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-[100px]
          right-3
          h-20
          w-20
          border-b
          border-r
          border-[#bd9852]/50
          md:right-5
        "
      />

      {/* =====================================================
          TOP CENTER EDITORIAL LINE
      ===================================================== */}

      <div
        className="
          vehicle-topline
          absolute
          left-1/2
          top-40
          z-40
          flex
          -translate-x-1/2
          items-center
          gap-4
          whitespace-nowrap
          md:top-28
        "
      >
        <span
          className="
            h-px
            w-10
            bg-[#bd9852]
            md:w-20
          "
        />

        <span
          className="
            font-stint
            text-[7px]
            uppercase
          
            tracking-[0.55em]
            text-white/60
            md:text-[9px]
          "
        >
          {tagline}
        </span>

        <span
          className="
            h-px
            w-10
            bg-[#bd9852]
            md:w-20
          "
        />
      </div>

      {/* =====================================================
          GIANT BACKGROUND MODEL NAME
      ===================================================== */}

      <div
        className="
          vehicle-giant-title
          pointer-events-none
          absolute
          right-[4%]
          top-[17%]
          z-[5]
          hidden
          text-center
          select-none
          overflow-hidden
          lg:block
        "
      >
        <span
          className={`
           ${brunoAceSC.className}
font-stint
text-[170px]
uppercase
text-center
mx-auto

bg-gradient-to-br
from-white
via-[#d0ae68]
to-[#777777]
bg-clip-text
text-transparent

xl:text-[200px]
2xl:text-[220px]
        `}
        >
          {model}
        </span>
      </div>

      {/* =====================================================
          LEFT CONTENT
      ===================================================== */}

      <div
        className="
          vehicle-copy
          absolute
          left-6
          top-1/2
          z-30
          w-[calc(100%-48px)]
          max-w-[520px]
          -translate-y-1/2

          md:left-10
          md:w-[42%]

          lg:left-[5vw]
          lg:w-[38%]

          xl:left-[6vw]
          xl:w-[35%]
        "
      >
        {/* =================================================
            BRAND
        ================================================= */}

        <div className="mt-56 flex items-center gap-4">
          {logo && (
            <div
              className="
                relative
                h-8
                w-12
                shrink-0
                md:h-10
                md:w-16
              "
            >
              <Image
                src={logo}
                alt={brand}
                fill
                className="object-contain object-left"
              />
            </div>
          )}

          <div className="h-10 w-px bg-white/30" />

          <div >
            <p
              className="
                font-stint
                text-[7px]
                uppercase
                tracking-[0.45em]
                text-white/40
              "
            >
              Manufacturer
            </p>

            <p
              className="
                mt-1
                font-stint
                text-[11px]
                uppercase
                tracking-[0.35em]
                text-white/80
              "
            >
              {brand}
            </p>
          </div>
        </div>

    
        <div className="vehicle-cta mt-8">
          <button
            onClick={() => {
              onCustomize?.();

              if (customizeHref) {
                window.location.assign(customizeHref);
              }
            }}
            className="
              group
              flex
              h-[52px]
              w-[225px]
              items-center
              justify-between
              bg-[#bd9852]
              px-7
              font-stint
              text-[9px]
              uppercase
              tracking-[0.32em]
              text-[#111111]
              transition-all
              duration-500
              hover:bg-[#d0ae68]
              hover:px-8
            "
          >
            <span>Customize</span>

            <ArrowRight
              size={17}
              strokeWidth={1.2}
              className="
                transition-transform
                duration-500
                group-hover:translate-x-2
              "
            />
          </button>
        </div>

        {/* =================================================
            MOBILE EXPLORE
        ================================================= */}

        <div
          className="
            vehicle-scroll
            mt-8
            flex
            items-center
            gap-3
            lg:hidden
          "
        >
          <ChevronDown
            size={14}
            strokeWidth={1}
            className="animate-bounce text-[#bd9852]"
          />

          <span
            className="
              font-stint
              text-[7px]
              uppercase
              tracking-[0.4em]
              text-white/40
            "
          >
            Explore Vehicle
          </span>
        </div>
      </div>

      {/* =====================================================
          CAR GLOW
      ===================================================== */}

      <div
        className="
          vehicle-car-glow
          pointer-events-none
          absolute
          right-[8%]
          top-[45%]
          z-[8]
          h-[260px]
          w-[50%]
          rounded-full
          bg-[#bd9852]/10
          blur-[100px]
          md:h-[350px]
          lg:h-[420px]
        "
      />

      {/* =====================================================
          VEHICLE

          IMPORTANT:

          This wrapper controls:
          - position
          - scroll parallax
          - scale

          Inner wrapper controls:
          - floating animation
      ===================================================== */}

      <div
        className="
         flex
         flex-row
         items-center
         justify-center
          pointer-events-none
          absolute
          
          top-[84%]
          right-[15%]
          z-20
          h-[390px]
          w-[78%]
          -translate-y-[65%]

         
          sm:h-[560px]
          sm:w-[70%]

    
          md:h-[680px]
          md:w-[68%]

          
          lg:h-[820px]
          lg:w-[66%]

      
          xl:h-[940px]
          xl:w-[64%]

        
          2xl:h-[1010px]
          2xl:w-[63%]
        "
      >
        <div className=" relative h-full w-full">
          <Image
            src={vehicleImage}
            alt={`${brand} ${model}`}
            fill
            priority
            className="
              scale-[1]
              object-contain
              object-center
              drop-shadow-[0_45px_50px_rgba(0,0,0,0.9)]
            "
          />
        </div>
      </div>

      {/* =====================================================
          RIGHT SIDE LABEL
      ===================================================== */}

      <div
        className="
          absolute
          right-8
          top-[60%]
          z-30
          hidden
          items-center
          gap-5
          xl:flex
        "
      >
        <span
          className="
            font-stint
            text-[7px]
            uppercase
            tracking-[0.45em]
            text-white/35
          "
        >
          Built
          <br />
          To Perform
        </span>

        <span className="h-px w-12 bg-[#bd9852]/70" />
      </div>

      {/* =====================================================
          DESKTOP SCROLL
      ===================================================== */}

      <div
        className="
          vehicle-scroll
          absolute
          bottom-[125px]
          left-7
          z-30
          hidden
          items-center
          gap-3
          md:flex
        "
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20">
          <ChevronDown
            size={14}
            strokeWidth={1}
            className="animate-bounce"
          />
        </div>

        <span
          className="
            font-stint
            text-[7px]
            uppercase
            tracking-[0.4em]
            text-white/40
          "
        >
          Explore Vehicle
        </span>
      </div>

      {/* =====================================================
          PERFORMANCE HUD
      ===================================================== */}

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          z-50
          border-t
          border-[#bd9852]/40
          bg-[#090909]/90
          backdrop-blur-xl
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-[1700px]
            grid-cols-2
            md:grid-cols-4
          "
        >
          {/* VEHICLE */}

          <div
            className="
              vehicle-stat
              flex
              min-h-[80px]
              items-center
              gap-4
              border-r
              border-white/10
              px-5
              py-3
              md:min-h-[92px]
              md:px-8
              lg:px-10
            "
          >
            {logo && (
              <div className="relative hidden h-8 w-12 shrink-0 sm:block">
                <Image
                  src={logo}
                  alt={brand}
                  fill
                  className="object-contain object-left"
                />
              </div>
            )}

            <div>
              <p
                className="
                  font-stint
                  text-[7px]
                  uppercase
                  tracking-[0.3em]
                  text-white/35
                "
              >
                {brand}
              </p>

              <p
                className="
                  mt-1
                  font-stint
                  text-[18px]
                  uppercase
                  tracking-[0.08em]
                  text-[#bd9852]
                  md:text-[22px]
                "
              >
                {model}
              </p>
            </div>
          </div>

          {/* SPEED */}

          <PerformanceStat
            icon={<Gauge size={25} strokeWidth={1} />}
            label="Max Speed"
            value={maxSpeed}
            unit="KM/H"
          />

          {/* 0–100 */}

          <PerformanceStat
            icon={<Timer size={25} strokeWidth={1} />}
            label="0–100 KM/H"
            value={acceleration}
            unit="SEC"
          />

          {/* HP */}

          <PerformanceStat
            icon={<Zap size={25} strokeWidth={1} />}
            label="Horsepower"
            value={horsepower}
            unit="HP"
          />
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PERFORMANCE STAT
========================================================= */

function PerformanceStat({
  icon,
  label,
  value,
  unit,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit: string;
}) {
  return (
    <div
      className="
        vehicle-stat
        flex
        min-h-[80px]
        items-center
        gap-3
        border-r
        border-white/10
        px-5
        py-3
        md:min-h-[92px]
        md:px-8
        lg:px-10
      "
    >
      <div className="hidden text-[#bd9852] sm:block">
        {icon}
      </div>

      <div>
        <p
          className="
            font-stint
            text-[7px]
            uppercase
            tracking-[0.3em]
            text-white/35
          "
        >
          {label}
        </p>

        <div className="mt-1 flex items-baseline gap-2">
          <span
            className="
              font-stint
              text-[27px]
              leading-none
              text-white
              md:text-[35px]
            "
          >
            {value}
          </span>

          <span
            className="
              font-stint
              text-[7px]
              uppercase
              tracking-[0.15em]
              text-[#bd9852]
            "
          >
            {unit}
          </span>
        </div>
      </div>
    </div>
  );
}