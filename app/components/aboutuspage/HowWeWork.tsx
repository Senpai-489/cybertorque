"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "Share what you're looking for. We listen, understand, and plan.",
    image: "/process/discover.jpg",
  },
  {
    number: "02",
    title: "Source",
    description:
      "We search globally to find the right vehicle for you.",
    image: "/process/source.jpg",
  },
  {
    number: "03",
    title: "Customize",
    description:
      "Personalize every detail exactly the way you want.",
    image: "/process/customize.jpg",
  },
  {
    number: "04",
    title: "Deliver",
    description:
      "Delivered with care. Ready for the road.",
    image: "/process/deliver.jpg",
  },
];

export default function HowWeWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stepsContainer = stepsRef.current;
    const imagesContainer = imagesRef.current;

    if (!section || !stepsContainer || !imagesContainer) {
      return;
    }

    const ctx = gsap.context(() => {
      /*
      =====================================================
      INITIAL STATES
      =====================================================
      */

      gsap.set(".process-heading", {
        opacity: 0,
        y: 50,
      });

      gsap.set(".process-subtitle", {
        opacity: 0,
        y: 25,
      });

      gsap.set(".process-step", {
        opacity: 0.35,
      });

      gsap.set(".process-image", {
        opacity: 0.25,
        scale: 0.96,
      });

      /*
      =====================================================
      INTRO ANIMATION
      =====================================================
      */

      const intro = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      intro
        .to(".process-heading", {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        })
        .to(
          ".process-subtitle",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.45"
        );

      /*
      =====================================================
      PINNED PROCESS
      =====================================================
      */

      const processTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=2800",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      /*
      =====================================================
      STEP PROGRESSION
      =====================================================
      */

      steps.forEach((_, index) => {
        const start = index / steps.length;
        const end = (index + 1) / steps.length;

        processTimeline
          .to(
            `.process-step-${index}`,
            {
              opacity: 1,
              duration: 0.2,
              ease: "none",
            },
            start
          )
          .to(
            `.process-image-${index}`,
            {
              opacity: 1,
              scale: 1,
              duration: 0.25,
              ease: "power2.out",
            },
            start
          );

        /*
        Fade previous step/image
        */

        if (index > 0) {
          processTimeline
            .to(
              `.process-step-${index - 1}`,
              {
                opacity: 0.35,
                duration: 0.2,
              },
              start
            )
            .to(
              `.process-image-${index - 1}`,
              {
                opacity: 0.25,
                scale: 0.96,
                duration: 0.2,
              },
              start
            );
        }

        /*
        Progress line
        */

        processTimeline.to(
          `.process-progress-${index}`,
          {
            scaleY: 1,
            duration: 0.25,
            ease: "none",
          },
          start
        );

        /*
        Don't allow last step to disappear
        */

        if (index === steps.length - 1) {
          processTimeline.to(
            `.process-step-${index}`,
            {
              opacity: 1,
              duration: 0.15,
            },
            end - 0.05
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        z-20
        min-h-screen
        overflow-hidden
        bg-[#e9e7e2]
        text-[#202020]
      "
    >
      <div
        className="
          mx-auto
          flex
          h-screen
          min-h-[650px]
          max-w-[1600px]
          flex-col
          px-6
          py-8

          sm:px-8

          md:px-10
          md:py-10

          lg:px-14
          lg:py-12
        "
      >
        {/* ==================================================
            TOP META
        ================================================== */}

        <div
          className="
            flex
            shrink-0
            items-center
            gap-5
            border-t
            border-[#202020]/35
            pt-3
          "
        >
          <span
            className="
              font-stint
              text-[8px]
              uppercase
              tracking-[0.08em]
              md:text-[9px]
            "
          >
            How We Work
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
              font-stint
              text-[8px]
              uppercase
              tracking-[0.08em]
              text-[#202020]/60
              md:text-[9px]
            "
          >
            From Vision To Reality
          </span>
        </div>

        {/* ==================================================
            DESKTOP CONTENT
        ================================================== */}

        <div
          className="
            mt-6
            hidden
            min-h-0
            flex-1
            grid-cols-[0.85fr_0.72fr_1.55fr]
            gap-8

            lg:grid
            lg:gap-10

            xl:grid-cols-[0.85fr_0.75fr_1.6fr]
            xl:gap-14
          "
        >
          {/* ==================================================
              LEFT — HEADING
          ================================================== */}

          <div
            className="
              process-heading
              flex
              flex-col
              justify-between
              py-4
            "
          >
            <div>
              <h2
                className="
                  font-stint
                  text-[48px]
                  uppercase
                  leading-[0.9]
                  tracking-[-0.04em]

                  xl:text-[62px]
                "
              >
                From Vision
                <br />
                To{" "}
                <span className="text-[#bd9852]">
                  Reality.
                </span>
              </h2>

              <p
                className="
                  process-subtitle
                  mt-7
                  max-w-[260px]
                  font-stint
                  text-[10px]
                  leading-[1.8]
                  text-[#202020]/65

                  xl:text-[11px]
                "
              >
                A seamless experience crafted
                around you.
              </p>
            </div>

           

          
          
          </div>

          {/* ==================================================
              CENTER — STEPS
          ================================================== */}

          <div
            ref={stepsRef}
            className="
              relative
              flex
              flex-col
              justify-center
              border-l
              border-[#202020]/20
            "
          >
            {/* vertical base line */}

            <div
              className="
                absolute
                bottom-[8%]
                left-0
                top-[8%]
                w-px
                bg-[#202020]/15
              "
            />

            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`
                  process-step
                  process-step-${index}
                  relative
                  flex-1
                  border-b
                  border-[#202020]/15
                  px-6
                  py-4
                  transition-colors
                  duration-500
                  xl:px-8
                `}
              >
                {/* connector */}

                <div
                  className="
                    absolute
                    -left-[5px]
                    top-[26px]
                    h-[9px]
                    w-[9px]
                    rounded-full
                    border
                    border-[#bd9852]
                    bg-[#e9e7e2]
                  "
                />

                {/* progress */}

                <div
                  className={`
                    process-progress-${index}
                    absolute
                    -left-[1px]
                    top-[26px]
                    h-full
                    w-[2px]
                    origin-top
                    scale-y-0
                    bg-[#bd9852]
                  `}
                />

                <div
                  className="
                    font-stint
                    text-[10px]
                    text-[#202020]/60
                  "
                >
                  {step.number}
                </div>

                <h3
                  className="
                    mt-1
                    font-stint
                    text-[14px]
                    uppercase
                    text-[#202020]
                    xl:text-[16px]
                  "
                >
                  {step.title}
                </h3>

                <p
                  className="
                    mt-2
                    max-w-[190px]
                    font-stint
                    text-[9px]
                    leading-[1.6]
                    text-[#202020]/55

                    xl:text-[10px]
                  "
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* ==================================================
              RIGHT — IMAGE STACK
          ================================================== */}

          <div
            ref={imagesRef}
            className="
              flex
              min-h-0
              flex-col
              justify-center
              gap-[3px]
            "
          >
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`
                  process-image
                  process-image-${index}
                  relative
                  min-h-0
                  flex-1
                  overflow-hidden
                  bg-[#191919]
                `}
              >
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="
                    object-cover
                  "
                  sizes="50vw"
                />

                {/* overlay */}

                <div
                  className="
                    absolute
                    inset-0
                    bg-black/10
                  "
                />

                {/* label */}

                <div
                  className="
                    absolute
                    bottom-3
                    left-4
                    z-10
                    font-stint
                    text-[8px]
                    uppercase
                    tracking-[0.1em]
                    text-white/75
                  "
                >
                  {step.number} / {step.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==================================================
            MOBILE VERSION
        ================================================== */}

        <div className="mt-8 flex flex-1 flex-col lg:hidden">
          <div className="process-heading">
            <h2
              className="
                font-stint
                text-[43px]
                uppercase
                leading-[0.9]
                tracking-[-0.04em]
              "
            >
              From Vision
              <br />
              To{" "}
              <span className="text-[#bd9852]">
                Reality.
              </span>
            </h2>

            <p
              className="
                mt-5
                max-w-[280px]
                font-stint
                text-[10px]
                leading-[1.7]
                text-[#202020]/60
              "
            >
              A seamless experience crafted
              around you.
            </p>
          </div>

          <div className="mt-8 space-y-3 overflow-y-auto pb-5">
            {steps.map((step) => (
              <div
                key={step.number}
                className="
                  border
                  border-[#202020]/20
                  bg-[#e4e2dd]
                "
              >
                <div
                  className="
                    relative
                    aspect-[2.3/1]
                    overflow-hidden
                  "
                >
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />

                  <div className="absolute inset-0 bg-black/15" />
                </div>

                <div className="p-5">
                  <span
                    className="
                      font-stint
                      text-[9px]
                      text-[#bd9852]
                    "
                  >
                    {step.number}
                  </span>

                  <h3
                    className="
                      mt-1
                      font-stint
                      text-[17px]
                      uppercase
                    "
                  >
                    {step.title}
                  </h3>

                  <p
                    className="
                      mt-2
                      max-w-[300px]
                      font-stint
                      text-[10px]
                      leading-[1.7]
                      text-[#202020]/60
                    "
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ==================================================
          BOTTOM BORDER
      ================================================== */}

      <div
        className="
          absolute
          bottom-0
          left-6
          right-6
          h-px
          bg-[#202020]/30

          sm:left-8
          sm:right-8

          md:left-10
          md:right-10

          lg:left-14
          lg:right-14
        "
      />
    </section>
  );
}