"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const missionRef = useRef<HTMLParagraphElement>(null);
  const yearRef = useRef<HTMLParagraphElement>(null);

  const imageOneRef = useRef<HTMLDivElement>(null);
  const imageTwoRef = useRef<HTMLDivElement>(null);

  const goldOneRef = useRef<HTMLDivElement>(null);
  const goldTwoRef = useRef<HTMLDivElement>(null);

  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      /*
      ==========================================
      INITIAL STATE
      ==========================================
      */

      gsap.set(titleRef.current, {
        y: 100,
        opacity: 0,
      });

      gsap.set([missionRef.current, yearRef.current], {
        y: 25,
        opacity: 0,
      });

      gsap.set(imageOneRef.current, {
        y: 80,
        opacity: 0,
        scale: 0.96,
      });

      gsap.set(imageTwoRef.current, {
        y: 60,
        opacity: 0,
        scale: 0.96,
      });

      gsap.set(textRef.current, {
        y: 60,
        opacity: 0,
      });

      gsap.set([goldOneRef.current, goldTwoRef.current], {
        scaleX: 0,
        transformOrigin: "left center",
      });

      /*
      ==========================================
      CONTENT REVEAL
      ==========================================
      */

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "top 25%",
          scrub: 1,
        },
      });

      tl.to(
        [missionRef.current, yearRef.current],
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: "power3.out",
        },
        0
      );

      tl.to(
        titleRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        },
        0.05
      );

      tl.to(
        imageOneRef.current,
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        0.25
      );

      tl.to(
        imageTwoRef.current,
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        0.35
      );

      tl.to(
        textRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        0.4
      );

      tl.to(
        [goldOneRef.current, goldTwoRef.current],
        {
          scaleX: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
        },
        0.55
      );

      /*
      ==========================================
      IMAGE PARALLAX
      ==========================================
      */

      gsap.to(imageOneRef.current, {
        y: -25,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(imageTwoRef.current, {
        y: 20,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        z-10
        min-h-screen
        overflow-hidden
        bg-[#e9e7e2]
        text-[#292929]
      "
    >
      {/* TOP BORDER */}

      <div className="mx-6 border-t border-[#292929]/50 md:mx-12" />

      {/* HEADER */}

      <div
        className="
          mx-auto
          flex
          max-w-[1400px]
          items-center
          justify-between
          px-6
          pt-3
          md:px-10
          lg:px-14
        "
      >
        <p
          ref={missionRef}
          className="
            font-stint
            text-[10px]
            tracking-wide
            md:text-[11px]
          "
        >
          Our mission
        </p>

        <p
          ref={yearRef}
          className="
            font-stint
            text-[10px]
            tracking-wide
            md:text-[11px]
          "
        >
          Since 2026
        </p>
      </div>

      {/* MAIN */}

      <div
        className="
          mx-auto
          grid
          max-w-[1500px]
          grid-cols-1
          gap-12
          px-6
          py-12
          md:px-10
          md:py-16
          lg:grid-cols-12
          lg:gap-8
          lg:px-12
        "
      >
        {/* LEFT */}

        <div className="lg:col-span-7">
          <div className="overflow-hidden">
            <h2
              ref={titleRef}
              className="
                font-stint
                text-[52px]
                uppercase
                leading-[1.02]
                tracking-[-0.025em]
                text-[#bd9a56]
                sm:text-[65px]
                md:text-[78px]
                lg:text-[80px]
                xl:text-[86px]
              "
            >
              An
              <br />
              Experience
              <br />
              Behind
              <br />
              The Wheel
            </h2>
          </div>

          {/* LARGE CAR IMAGE */}

          <div className="mt-10 lg:ml-10 lg:mt-8">
            <div
              ref={imageOneRef}
              className="
                relative
                aspect-[1.5/1]
                w-full
                max-w-[650px]
                overflow-hidden
                shadow-[7px_7px_0_rgba(0,0,0,0.18)]
              "
            >
              <Image
                src="/about1.jpg"
                alt="Cyber Torque vehicle"
                fill
                className="object-cover"
              />
            </div>

            <div
              ref={goldOneRef}
              className="
                ml-auto
                mt-4
                h-[18px]
                w-[190px]
                bg-[#bd9a56]
              "
            />
          </div>
        </div>

        {/* RIGHT */}

        <div className="lg:col-span-5">
          {/* TOP IMAGE */}

          <div className="lg:ml-auto lg:w-[90%]">
            <div
              ref={imageTwoRef}
              className="
                relative
                aspect-[1.55/1]
                w-full
                overflow-hidden
                shadow-[6px_6px_0_rgba(0,0,0,0.18)]
              "
            >
              <Image
                src="/about2.jpg"
                alt="Luxury automotive experience"
                fill
                className="object-cover"
              />
            </div>

            <div
              ref={goldTwoRef}
              className="
                ml-auto
                mt-4
                h-[18px]
                w-[190px]
                bg-[#bd9a56]
              "
            />
          </div>

          {/* DESCRIPTION */}

          <div
            ref={textRef}
            className="
              mt-12
              lg:ml-[-12%]
              lg:mt-16
              lg:w-[112%]
            "
          >
            <p
              className="
                max-w-[650px]
                font-stint
                text-[15px]
                leading-[2]
                md:text-[17px]
                lg:text-[18px]
              "
            >
              We At Cyber Torque Are Committed To Provide
              <br className="hidden lg:block" />
              You With Exceptional Vehicles, Providing
              <br className="hidden lg:block" />
              Extraordinary Performance And Luxury, So The
              <br className="hidden lg:block" />
              Only Decision Left Is Where The Road Goes.
            </p>
          </div>
        </div>
      </div>

      {/* BOTTOM BORDER */}

      <div className="mx-6 border-b border-[#292929]/50 md:mx-12" />

      <div className="h-16" />
    </section>
  );
}