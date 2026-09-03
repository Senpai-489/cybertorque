"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const principles = [
  {
    number: "01",
    title: "Curated",
    description: "A fleet carefully crafted for YOU",
    detail:
      "Every vehicle is selected with a focus on character, performance and individuality.",
  },
  {
    number: "02",
    title: "Personal",
    description: "Fully Customised for YOUR taste",
    detail:
      "From specification to finishing touches, your vehicle is shaped around your vision.",
  },
  {
    number: "03",
    title: "Precise",
    description: "Every detail handled carefully",
    detail:
      "Our process is meticulous from the first conversation to the final inspection.",
  },
  {
    number: "04",
    title: "Perfect",
    description: "Everything ready for road",
    detail:
      "The final experience is completed to the standard your vehicle deserves.",
  },
];

export default function PrinciplesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      /*
      ==================================================
      INITIAL STATES
      ==================================================
      */

      gsap.set(backgroundRef.current, {
        scale: 1.08,
      });

      rowsRef.current.forEach((row) => {
        if (!row) return;

        gsap.set(row.querySelector(".principle-title"), {
          x: -80,
          opacity: 0,
        });

        gsap.set(row.querySelector(".principle-description"), {
          x: 60,
          opacity: 0,
        });

        gsap.set(row.querySelector(".principle-detail"), {
          y: 20,
          opacity: 0,
        });

        gsap.set(row.querySelector(".principle-line"), {
          scaleX: 0,
          transformOrigin: "left center",
        });

        gsap.set(row.querySelector(".principle-number"), {
          scale: 0.7,
          opacity: 0,
        });
      });

      /*
      ==================================================
      MAIN SCROLL
      ==================================================
      */

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: ".principles-sticky",
          anticipatePin: 1,
        },
      });

      /*
      --------------------------------------------------
      BACKGROUND MOVEMENT
      --------------------------------------------------
      */

      tl.to(
        backgroundRef.current,
        {
          scale: 1,
          xPercent: -3,
          ease: "none",
        },
        0
      );

      /*
      --------------------------------------------------
      EACH PRINCIPLE
      --------------------------------------------------
      */

      rowsRef.current.forEach((row, index) => {
        if (!row) return;

        const title = row.querySelector(".principle-title");
        const description = row.querySelector(
          ".principle-description"
        );
        const detail = row.querySelector(".principle-detail");
        const line = row.querySelector(".principle-line");
        const number = row.querySelector(".principle-number");

        const start = index * 0.23;

        tl.to(
          line,
          {
            scaleX: 1,
            duration: 0.15,
            ease: "power2.out",
          },
          start
        );

        tl.to(
          number,
          {
            scale: 1,
            opacity: 1,
            duration: 0.1,
            ease: "back.out(2)",
          },
          start
        );

        tl.to(
          title,
          {
            x: 0,
            opacity: 1,
            duration: 0.18,
            ease: "power3.out",
          },
          start + 0.02
        );

        tl.to(
          description,
          {
            x: 0,
            opacity: 1,
            duration: 0.18,
            ease: "power3.out",
          },
          start + 0.05
        );

        tl.to(
          detail,
          {
            y: 0,
            opacity: 1,
            duration: 0.15,
            ease: "power3.out",
          },
          start + 0.09
        );
      });

      /*
      ==================================================
      INDIVIDUAL ROW ACTIVE EFFECT
      ==================================================
      */

      rowsRef.current.forEach((row, index) => {
        if (!row) return;

        ScrollTrigger.create({
          trigger: row,
          start: "top 55%",
          end: "bottom 45%",

          onEnter: () => activateRow(index),
          onEnterBack: () => activateRow(index),

          onLeave: () => {
            if (index !== principles.length - 1) {
              deactivateRow(index);
            }
          },

          onLeaveBack: () => {
            if (index !== 0) {
              deactivateRow(index);
            }
          },
        });
      });

      /*
      ==================================================
      GLOBAL PROGRESS BAR
      ==================================================
      */

      gsap.fromTo(
        progressRef.current,
        {
          scaleY: 0,
          transformOrigin: "top center",
        },
        {
          scaleY: 1,
          ease: "none",

          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }, section);

    function activateRow(index: number) {
      const row = rowsRef.current[index];

      if (!row) return;

      gsap.to(row, {
        opacity: 1,
        duration: 0.4,
      });

      gsap.to(row.querySelector(".principle-title"), {
        color: "#c6a35d",
        x: 8,
        duration: 0.5,
        ease: "power3.out",
      });

      gsap.to(row.querySelector(".principle-description"), {
        color: "#ffffff",
        duration: 0.4,
      });

      gsap.to(row.querySelector(".principle-detail"), {
        opacity: 1,
        duration: 0.4,
      });

      gsap.to(row.querySelector(".principle-line"), {
        backgroundColor: "#c6a35d",
        duration: 0.4,
      });

      gsap.to(row.querySelector(".principle-number"), {
        backgroundColor: "#c6a35d",
        color: "#161616",
        duration: 0.4,
      });
    }

    function deactivateRow(index: number) {
      const row = rowsRef.current[index];

      if (!row) return;

      gsap.to(row.querySelector(".principle-title"), {
        color: "rgba(198,163,93,0.55)",
        x: 0,
        duration: 0.4,
      });

      gsap.to(row.querySelector(".principle-description"), {
        color: "rgba(255,255,255,0.5)",
        duration: 0.4,
      });

      gsap.to(row.querySelector(".principle-detail"), {
        opacity: 0.35,
        duration: 0.4,
      });

      gsap.to(row.querySelector(".principle-number"), {
        backgroundColor: "transparent",
        color: "rgba(255,255,255,0.5)",
        duration: 0.4,
      });
    }

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        h-[500vh]
        overflow-hidden
        bg-[#111111]
        text-white
      "
    >
      <div
        className="
          principles-sticky
          relative
          h-screen
          w-full
          overflow-hidden
        "
      >
        {/* ==================================================
            BACKGROUND IMAGE
        ================================================== */}

        <div
          ref={backgroundRef}
          className="
            absolute
            inset-[-8%]
            bg-[url('/principles.jpg')]
            bg-cover
            bg-center
            bg-no-repeat
          "
        />

        {/* ==================================================
            DARK OVERLAY
        ================================================== */}

        <div
          className="
            absolute
            inset-0
            bg-black/65
          "
        />

        {/* LEFT GRADIENT */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-black/80
            via-black/40
            to-black/60
          "
        />

        {/* VIGNETTE */}

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,transparent_10%,rgba(0,0,0,0.65)_100%)]
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
            h-full
            w-full
            max-w-[1500px]
            flex-col
            px-6
            py-5
            md:px-10
            lg:px-14
          "
        >
          {/* ==================================================
              TOP HEADER
          ================================================== */}

          <div
            className="
              flex

              items-center
              justify-between
              border-t
              border-white/30
              pt-3
            "
          >
            <span
              className="
                font-stint
                text-[9px]
                uppercase
                tracking-[0.08em]
                text-white/70
              "
            >
              Why Us
            </span>

            <span
              className="
                font-stint
                text-[9px]
                uppercase
                tracking-[0.08em]
                text-white/70
              "
            >
              Our Principles
            </span>
          </div>

          {/* ==================================================
              PRINCIPLES
          ================================================== */}

          <div
            className="
              relative
              flex
              flex-1
              flex-col
              justify-center
              py-8
            "
          >
            {/* GLOBAL PROGRESS */}

            <div
              className="
                absolute
                left-0
                top-1/2
                hidden
                h-[70%]
                w-[2px]
                -translate-y-1/2
                bg-white/10
                lg:block
              "
            >
              <div
                ref={progressRef}
                className="
                  absolute
                  left-0
                  top-0
                  h-full
                  w-full
                  bg-[#c6a35d]
                "
              />
            </div>

            {/* ROWS */}

            <div className="flex  flex-col">
              {principles.map((principle, index) => (
                <div
                  key={principle.number}
                  ref={(el) => {
                    rowsRef.current[index] = el;
                  }}
                  className="
                    relative
                    py-7
                    md:py-8
                    lg:py-7
                  "
                >
                  {/* HORIZONTAL LINE */}

                  <div
                    className="
                      principle-line
                      absolute
                      left-0
                      right-0
                      top-0
                      h-[2px]
                      bg-[#c6a35d]/60
                    "
                  />

                  {/* ROW CONTENT */}

                  <div
                    className="
                      grid
                      grid-cols-1
                      items-center
                      gap-4
                      pl-5
                      md:grid-cols-12
                      md:gap-8
                      lg:pl-8
                    "
                  >
                    {/* NUMBER */}

                    <div
                      className="
                        principle-number
                        absolute
                        left-0
                        top-1/2
                        flex 
                    
                        h-[26px]
                        w-[26px]
                        -translate-x-1/2
                        -translate-y-1/2
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/30
                        bg-[#111111]
                        font-stint
                        text-[8px]
                        text-white/60
                        md:h-[30px]
                        md:w-[30px]
                      "
                    >
                      {principle.number}
                    </div>

                    {/* TITLE */}

                    <div className="md:col-span-5">
                      <h2
                        className="
                          principle-title
                          font-stint
                          text-[38px]
                          uppercase
                          leading-none
                          tracking-[-0.025em]
                          text-[#c6a35d]/55
                          transition-colors
                          sm:text-[48px]
                          md:text-[55px]
                          lg:text-[62px]
                        "
                      >
                        {principle.title}
                      </h2>
                    </div>

                    {/* DESCRIPTION */}

                    <div className="md:col-span-4">
                      <p
                        className="
                          principle-description
                          font-stint
                          text-[12px]
                          leading-[1.7]
                          text-white
                          md:text-[13px]
                          lg:text-[14px]
                        "
                      >
                        {principle.description}
                      </p>

                      {/* DETAIL */}

                      <p
                        className="
                          principle-detail
                          mt-2
                          max-w-[360px]
                          font-stint
                          text-[9px]
                          leading-[1.8]
                          text-white
                          md:text-[10px]
                        "
                      >
                        {principle.detail}
                      </p>
                    </div>

                   
                  </div>
                </div>
              ))}

              {/* BOTTOM LINE */}

              <div
                className="
                  h-[2px]
                  w-full
                  bg-[#c6a35d]/60
                "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}