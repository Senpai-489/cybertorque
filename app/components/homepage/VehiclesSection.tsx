"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const vehicles = [
  {
    number: "01",
    name: "Ford Mustang",
    image: "/mustangHome.jpg",
    specs: [
      ["Power", "620 HP"],
      ["0-100", "3.2 sec"],
      ["Engine", "V 12"],
      ["Seats", "2"],
    ],
  },
  {
    number: "02",
    name: "GMC Yukon Denali",
    image: "/GMCHome.jpg",
    specs: [
      ["Power", "440 HP"],
      ["0-100", "4.4 sec"],
      ["Engine", "V 8"],
      ["Seats", "8"],
    ],
  },
];

export default function VehiclesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const headerRef = useRef<HTMLDivElement>(null);
  const vehicleOneRef = useRef<HTMLDivElement>(null);
  const vehicleTwoRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      /*
      ==================================================
      INITIAL STATES
      ==================================================
      */

      gsap.set(headerRef.current, {
        y: 35,
        opacity: 0,
      });

      gsap.set([vehicleOneRef.current, vehicleTwoRef.current], {
        y: 80,
        opacity: 0,
      });

      gsap.set(moreRef.current, {
        y: 30,
        opacity: 0,
      });

      /*
      ==================================================
      SECTION ENTRANCE
      ==================================================
      */

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,

          start: "top 75%",

          end: "top 30%",

          scrub: 1,

          invalidateOnRefresh: true,
        },
      });

      tl.to(
        headerRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        },
        0
      );

      tl.to(
        vehicleOneRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        },
        0.15
      );

      tl.to(
        vehicleTwoRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        },
        0.35
      );

      tl.to(
        moreRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        },
        0.6
      );

      /*
      ==================================================
      IMAGE PARALLAX
      ==================================================
      */

      gsap.to(".vehicle-image", {
        yPercent: -6,
        ease: "none",

        scrollTrigger: {
          trigger: section,

          start: "top bottom",

          end: "bottom top",

          scrub: 1.2,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <>
      

    

      {/* ==================================================
          VEHICLES
          ================================================== */}

      <section
        ref={sectionRef}
        className="
          relative
          z-20
           
          overflow-hidden
          bg-[#e9e7e2]
          px-6
          pb-20
          text-[#292929]
          md:px-10
          lg:px-14
        "
      >
        {/* TOP BORDER */}

        <div className="mx-[-4px] border-t border-[#292929]/70" />

        {/* ==================================================
            HEADER
        ================================================== */}

        <div
          ref={headerRef}
          className="
            mx-auto
            flex
            max-w-[1400px]
            items-center
            justify-between
            py-4
          "
        >
          <p
            className="
              font-stint
              text-[9px]
              uppercase
              tracking-[0.08em]
              md:text-[10px]
            "
          >
            Our Fleet
          </p>

          <p
            className="
              font-stint
              text-[9px]
              uppercase
              tracking-[0.04em]
              md:text-[10px]
            "
          >
            Take A Look At Your Ride
          </p>
        </div>

        {/* ==================================================
            VEHICLES
        ================================================== */}

        <div className="mx-auto max-w-[1200px]">

          {/* ================================================
              VEHICLE 01
          ================================================ */}

          <div
            ref={vehicleOneRef}
            className="
              grid
              grid-cols-1
              items-center
              gap-8
              py-12
              md:py-16
              lg:grid-cols-2
              lg:gap-12
            "
          >
            {/* IMAGE */}

            <div
              className="
                relative
                aspect-[1.45/1]
                overflow-hidden
                bg-black
                shadow-[7px_7px_0px_rgba(0,0,0,0.18)]
              "
            >
              <Image
                src={vehicles[0].image}
                alt={vehicles[0].name}
                fill
                className="
                  vehicle-image
                  object-cover
                  transition-transform
                  duration-700
                  hover:scale-[1.04]
                "
              />
            </div>

            {/* DETAILS */}

            <VehicleDetails vehicle={vehicles[0]} />
          </div>

          {/* ================================================
              VEHICLE 02
          ================================================ */}

          <div
            ref={vehicleTwoRef}
            className="
              grid
              grid-cols-1
              items-center
              gap-8
              py-12
              md:py-16
              lg:grid-cols-2
              lg:gap-16
            "
          >
            {/* DETAILS FIRST ON DESKTOP */}

            <div className="lg:order-1">
              <VehicleDetails vehicle={vehicles[1]} />
            </div>

            {/* IMAGE */}

            <div
              className="
                relative
                aspect-[1.45/1]
                overflow-hidden
                bg-black
                shadow-[7px_7px_0px_rgba(0,0,0,0.18)]
                lg:order-2
              "
            >
              <Image
                src={vehicles[1].image}
                alt={vehicles[1].name}
                fill
                className="
                  vehicle-image
                  object-cover
                  transition-transform
                  duration-700
                  hover:scale-[1.04]
                "
              />
            </div>
          </div>

          {/* ==================================================
              MORE VEHICLES
          ================================================== */}

          <div className="flex justify-center pt-4 md:pt-8">
            <Link
              ref={moreRef}
              href="/cars"
              className="
                group
                flex
                h-[36px]
                w-[175px]
                items-center
                justify-between
                bg-[#bd9a56]
                px-4
                font-stint
                text-[10px]
                text-white
                transition-all
                duration-500
                hover:w-[190px]
                hover:bg-[#c9a762]
              "
            >
              <span>View More Vehicles</span>

              <ArrowRight
                size={13}
                strokeWidth={1.5}
                className="
                  transition-transform
                  duration-500
                  group-hover:translate-x-1
                "
              />
            </Link>
          </div>
        </div>

        {/* BOTTOM BORDER */}

        <div className="mx-[-4px] mt-16 border-b border-[#292929]/70" />
      </section>
    </>
  );
}

/* ========================================================
   VEHICLE DETAILS
======================================================== */

function VehicleDetails({
  vehicle,
}: {
  vehicle: {
    number: string;
    name: string;
    image: string;
    specs: string[][];
  };
}) {
  return (
    <div className="w-full max-w-[480px]">

      {/* NUMBER */}

      <p
        className="
          mb-2
          font-stint
          text-[11px]
          text-[#292929]
        "
      >
        {vehicle.number}
      </p>

      {/* NAME */}

      <h2
        className="
          mb-3
          font-stint
          text-[28px]
          uppercase
          leading-none
          tracking-[-0.02em]
          text-[#bd9a56]
          sm:text-[32px]
          md:text-[35px]
        "
      >
        {vehicle.name}
      </h2>

      {/* SPECS */}

      <div className="border-t border-[#292929]/60">
        {vehicle.specs.map(([label, value]) => (
          <div
            key={label}
            className="
              flex
              h-[27px]
              items-center
              justify-between
              border-b
              border-[#292929]/40
              font-stint
              text-[11px]
              md:text-[12px]
            "
          >
            <span>{label}</span>

            <span>{value}</span>
          </div>
        ))}
      </div>

      {/* VIEW VEHICLE */}

      <Link
        href={`/cars/${vehicle.name
          .toLowerCase()
          .replaceAll(" ", "-")}`}
        className="
          group
          mt-2
          flex
          h-[28px]
          w-[175px]
          items-center
          justify-between
          bg-[#bd9a56]
          px-3
          font-stint
          text-[10px]
          text-white
          transition-all
          duration-300
          hover:w-[190px]
        "
      >
        <span>View Vehicle</span>

        <ArrowRight
          size={12}
          strokeWidth={1.5}
          className="
            transition-transform
            duration-300
            group-hover:translate-x-1
          "
        />
      </Link>
    </div>
  );
}