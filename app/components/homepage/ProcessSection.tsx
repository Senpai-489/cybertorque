"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import {
  ShoppingBag,
  Search,
  FileCheck,
  Truck,
  ShieldCheck,
  PackageCheck,
  ClipboardCheck,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const processes = [
  {
    number: "01",
    title: "Ordering",
    icon: ShoppingBag,
    image: "/process/ordering.jpg",
    description:
      "Choose your vehicle and begin your journey with Cyber Torque.",
  },
  {
    number: "02",
    title: "Procurement",
    icon: Search,
    image: "/process/procurement.jpg",
    description:
      "Our team sources and verifies your vehicle from trusted channels.",
  },
  {
    number: "03",
    title: "Processing",
    icon: FileCheck,
    image: "/process/processing.jpg",
    description:
      "Every document, inspection and requirement is carefully processed.",
  },
  {
    number: "04",
    title: "Shipping",
    icon: Truck,
    image: "/process/shipping.jpg",
    description:
      "Your vehicle begins its journey through our secure logistics network.",
  },
  {
    number: "05",
    title: "Customs Clearance",
    icon: ShieldCheck,
    image: "/process/customs.jpg",
    description:
      "We handle the customs process and ensure all requirements are met.",
  },
  {
    number: "06",
    title: "Delivery",
    icon: PackageCheck,
    image: "/process/delivery.jpg",
    description:
      "Your vehicle arrives safely and is prepared for final handover.",
  },
  {
    number: "07",
    title: "Registration",
    icon: ClipboardCheck,
    image: "/process/registration.jpg",
    description:
      "We complete the final registration process so your vehicle is road ready.",
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  const [activeStep, setActiveStep] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;

    if (!section || !pin) return;

    const ctx = gsap.context(() => {
      const images = imageRefs.current.filter(
        (el): el is HTMLDivElement => el !== null
      );

      const steps = stepRefs.current.filter(
        (el): el is HTMLDivElement => el !== null
      );

      /*
      ==========================================================
      INITIAL IMAGE STATE
      ==========================================================
      */

      gsap.set(images, {
        opacity: 0,
        scale: 1.08,
      });

      if (images[0]) {
        gsap.set(images[0], {
          opacity: 1,
          scale: 1,
        });
      }

      /*
      ==========================================================
      INITIAL STEP STATE
      ==========================================================
      */

      gsap.set(steps, {
        opacity: 0.35,
      });

      if (steps[0]) {
        gsap.set(steps[0], {
          opacity: 1,
        });
      }

      /*
      ==========================================================
      INITIAL PROGRESS
      ==========================================================
      */

      if (lineRef.current) {
        gsap.set(lineRef.current, {
          height: "0%",
        });
      }

      /*
      ==========================================================
      STEP CHANGE FUNCTION
      ==========================================================
      */

      let currentStep = 0;

      const changeStep = (index: number) => {
        if (index === currentStep) return;

        currentStep = index;

        setActiveStep(index);

        /*
        --------------------------------------------------------
        STEP OPACITY
        --------------------------------------------------------
        */

        steps.forEach((step, stepIndex) => {
          gsap.to(step, {
            opacity: stepIndex <= index ? 1 : 0.35,
            duration: 0.35,
            ease: "power2.out",
            overwrite: true,
          });
        });

        /*
        --------------------------------------------------------
        IMAGE TRANSITION
        --------------------------------------------------------
        */

        images.forEach((image, imageIndex) => {
          if (imageIndex === index) {
            gsap.to(image, {
              opacity: 1,
              scale: 1,
              duration: 0.75,
              ease: "power3.out",
              overwrite: true,
            });
          } else {
            gsap.to(image, {
              opacity: 0,
              scale: 1.08,
              duration: 0.55,
              ease: "power2.out",
              overwrite: true,
            });
          }
        });
      };

      /*
      ==========================================================
      MAIN SCROLL TRIGGER
      ==========================================================
      */

      const trigger = ScrollTrigger.create({
        trigger: section,

        start: "top top",

        end: "bottom bottom",

        pin: pin,

        pinSpacing: false,

        anticipatePin: 1,

        invalidateOnRefresh: true,

        onUpdate: (self) => {
          const progress = self.progress;

          /*
          ------------------------------------------------------
          PROGRESS LINE
          ------------------------------------------------------
          */

          if (lineRef.current) {
            gsap.to(lineRef.current, {
              height: `${progress * 50}%`,
              duration: 0.15,
              ease: "none",
              overwrite: true,
            });
          }

      
          /*
          ------------------------------------------------------
          CALCULATE ACTIVE STEP
          ------------------------------------------------------
          */

          const index = Math.min(
            processes.length - 1,
            Math.floor(progress * processes.length)
          );

          changeStep(index);
        },

        onEnter: () => {
          setActiveStep(0);
          currentStep = 0;
        },

        onLeaveBack: () => {
          currentStep = 0;
          setActiveStep(0);

          images.forEach((image, index) => {
            gsap.to(image, {
              opacity: index === 0 ? 1 : 0,
              scale: index === 0 ? 1 : 1.08,
              duration: 0.4,
              overwrite: true,
            });
          });

          steps.forEach((step, index) => {
            gsap.to(step, {
              opacity: index === 0 ? 1 : 0.35,
              duration: 0.3,
              overwrite: true,
            });
          });

          if (lineRef.current) {
            gsap.to(lineRef.current, {
              height: "0%",
              duration: 0.2,
              overwrite: true,
            });
          }
        },

        onLeave: () => {
          currentStep = processes.length - 1;
          setActiveStep(processes.length - 1);
        },
      });

      /*
      ==========================================================
      REFRESH
      ==========================================================
      */

      const refresh = () => {
        trigger.refresh();
      };

      requestAnimationFrame(refresh);

      window.addEventListener("load", refresh);

      /*
      ==========================================================
      CLEANUP
      ==========================================================
      */

      return () => {
        window.removeEventListener("load", refresh);
      };
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  const ActiveIcon = processes[activeStep].icon;

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#1d1d1d] text-white"
      style={{
        height: `${processes.length * 100}vh`,
      }}
    >
      {/* =====================================================
          PINNED VIEWPORT
      ===================================================== */}

      <div
        ref={pinRef}
        className="
          process-pin
          relative
          flex
          h-screen
          w-full
          overflow-hidden
        "
      >
        {/* ==================================================
            BACKGROUND
        ================================================== */}

        <div className="absolute inset-0 bg-[#1d1d1d]" />

        {/* subtle radial glow */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(circle_at_35%_45%,rgba(189,154,86,0.08),transparent_35%)]
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
            py-6
            md:px-10
            lg:px-14
          "
        >
          {/* ==================================================
              HEADER
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
                tracking-wide
                text-white/80
                md:text-[10px]
              "
            >
              Process
            </span>

            <span
              className="
                font-stint
                text-[9px]
                uppercase
                tracking-wide
                text-white/80
                md:text-[10px]
              "
            >
              From Order To Possession
            </span>
          </div>

          {/* ==================================================
              MAIN GRID
          ================================================== */}

          <div
            className="
              grid
              flex-1
              grid-cols-1
              items-center
              gap-10
              py-8
              lg:grid-cols-12
              lg:gap-12
            "
          >
            {/* ==================================================
                LEFT SIDE
            ================================================== */}

            <div
              className="
                flex
                h-full
                flex-col
                justify-center
                lg:col-span-7
              "
            >
              {/* TITLE */}

              <div className="overflow-hidden">
                <h2
                  className="
                    max-w-[850px]
                    font-stint
                    text-[42px]
                    uppercase
                    leading-[1.05]
                    tracking-[-0.025em]
                    text-[#bd9a56]
                    sm:text-[55px]
                    md:text-[68px]
                    lg:text-[70px]
                    xl:text-[50px]
                  "
                >
                  Sit Back And Relax
                  <br />
                  We Got It Covered
                </h2>
              </div>

              {/* ==================================================
                  IMAGE
              ================================================== */}

              <div
                className="
                  relative
                  mt-10
                  h-[260px]
                  w-full
                  max-w-[650px]
                  sm:h-[320px]
                  md:h-[380px]
                  lg:mt-14
                  lg:h-[390px]
                "
              >
                {processes.map((process, index) => (
                  <div
                    key={process.number}
                    ref={(el) => {
                      imageRefs.current[index] = el;
                    }}
                    className="
                      absolute
                      inset-0
                      overflow-hidden
                      shadow-[8px_8px_0_rgba(0,0,0,0.25)]
                    "
                  >
                    <Image
                      src={process.image}
                      alt={process.title}
                      fill
                      priority={index === 0}
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 650px"
                    />

                    <div className="absolute inset-0 bg-black/10" />
                  </div>
                ))}

                {/* GOLD FRAME */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-2
                    -top-2
                    h-[calc(100%-20px)]
                    w-[calc(100%-20px)]
                    border-2
                    border-[#bd9a56]/80
                  "
                />
              </div>

              {/* ==================================================
                  ACTIVE DESCRIPTION
              ================================================== */}

              <div className="mt-5 min-h-[40px] max-w-[600px]">
                <p
                  key={activeStep}
                  className="
                    font-stint
                    text-[11px]
                    leading-[1.8]
                    text-white/60
                    md:text-[13px]
                  "
                >
                  {processes[activeStep].description}
                </p>
              </div>
            </div>

            {/* ==================================================
                RIGHT PROCESS
            ================================================== */}

            <div
              className="
                relative
                flex
                h-full
                items-center
                lg:col-span-5
              "
            >
              <div
                className="
                  relative
                  mx-auto
                  flex
                  w-full
                  max-w-[430px]
                  flex-col
                  justify-center
                "
              >
                {/* ==================================================
                    VERTICAL LINE
                ================================================== */}

                <div
                  className="
                    absolute
                    left-[20px]
                    top-[22px]
                    bottom-[22px]
                    w-[2px]
                    bg-white/20
                  "
                />

                {/* ==================================================
                    PROGRESS
                ================================================== */}

                <div
                  ref={lineRef}
                  className="
                    absolute
                    left-[20px]
                    top-[22px]
                    w-[2px]
                    bg-[#bd9a56]
                  "
                  style={{
                    height: "0%",
                  }}
                />

                {/* ==================================================
                    STEPS
                ================================================== */}

                <div className="relative flex flex-col gap-5">
                  {processes.map((process, index) => {
                    const Icon = process.icon;

                    const isActive = index === activeStep;
                    const isCompleted = index < activeStep;

                    return (
                      <div
                        key={process.number}
                        ref={(el) => {
                          stepRefs.current[index] = el;
                        }}
                        className="
                          group
                          flex
                          min-h-[60px]
                          items-center
                          gap-5
                        "
                      >
                        {/* ==================================================
                            ICON
                        ================================================== */}

                        <div
                          className={`
                            relative
                            z-10
                            flex
                            h-[42px]
                            w-[42px]
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            border
                            transition-all
                            duration-500
                            ${
                              isActive || isCompleted
                                ? "border-[#bd9a56] bg-[#bd9a56] text-white"
                                : "border-white/30 bg-[#1d1d1d] text-white/60"
                            }
                          `}
                        >
                          <Icon
                            size={17}
                            strokeWidth={1.5}
                          />

                          {/* number */}

                          <span
                            className="
                              absolute
                              -right-1
                              -top-1
                              flex
                              h-[16px]
                              min-w-[16px]
                              items-center
                              justify-center
                              rounded-full
                              bg-[#1d1d1d]
                              px-1
                              font-stint
                              text-[7px]
                              text-white/70
                            "
                          >
                            {process.number}
                          </span>
                        </div>

                        {/* ==================================================
                            TITLE
                        ================================================== */}

                        <div className="flex flex-col">
                          <span
                            className={`
                              font-stint
                              text-[14px]
                              transition-colors
                              duration-500
                              md:text-[16px]
                              ${
                                isActive
                                  ? "text-white"
                                  : "text-white/50"
                              }
                            `}
                          >
                            {process.title}
                          </span>

                          {/* active indicator */}

                          <span
                            className={`
                              mt-1
                              h-px
                              bg-[#bd9a56]
                              transition-all
                              duration-500
                              ${
                                isActive
                                  ? "w-full"
                                  : "w-0"
                              }
                            `}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ==================================================
              BOTTOM BORDER
          ================================================== */}

          <div className="border-b border-white/30 pb-3" />
        </div>
      </div>
    </section>
  );
}