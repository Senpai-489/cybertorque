"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  Phone,
} from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      /*
      =====================================================
      INITIAL STATES
      =====================================================
      */

      gsap.set(".cta-eyebrow", {
        opacity: 0,
        y: 20,
      });

      gsap.set(".cta-title", {
        opacity: 0,
        y: 45,
      });

      gsap.set(".cta-description", {
        opacity: 0,
        y: 25,
      });

      gsap.set(".cta-button", {
        opacity: 0,
        y: 20,
      });

      gsap.set(".contact-item", {
        opacity: 0,
        y: 25,
      });

      /*
      =====================================================
      HERO CTA REVEAL
      =====================================================
      */

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(".cta-eyebrow", {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      })
        .to(
          ".cta-title",
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .to(
          ".cta-description",
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .to(
          ".cta-button",
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.25"
        )
        .to(
          ".contact-item",
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.2"
        );

      /*
      =====================================================
      IMAGE PARALLAX
      =====================================================
      */

      gsap.fromTo(
        ".cta-image",
        {
          scale: 1.12,
          yPercent: -5,
        },
        {
          scale: 1,
          yPercent: 5,
          ease: "none",

          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        z-20
        w-full
        overflow-hidden
        bg-[#e9e7e2]
      "
    >
      {/* ==================================================
          CINEMATIC CTA
      ================================================== */}

      <div
        className="
          relative
          h-[560px]
          w-full
          overflow-hidden

          sm:h-[600px]

          md:h-[650px]

          lg:h-[680px]
        "
      >
        {/* ==================================================
            BACKGROUND IMAGE
        ================================================== */}

        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/cta-car.jpg"
            alt="Cyber Torque vehicle"
            fill
            priority={false}
            className="
              cta-image
              object-cover
              will-change-transform
            "
            sizes="100vw"
          />
        </div>

        {/* ==================================================
            CINEMATIC OVERLAYS
        ================================================== */}

        <div
          className="
            absolute
            inset-0
            bg-black/35
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-black/80
            via-black/40
            to-black/10
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/50
            via-transparent
            to-black/20
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
            max-w-[1500px]
            flex-col
            justify-center
            px-6

            sm:px-8

            md:px-10

            lg:px-14
          "
        >
          {/* EYEBROW */}

          <div
            className="
              cta-eyebrow
              flex
              max-w-[500px]
              items-center
              gap-5
            "
          >
            <span
              className="
                shrink-0
                font-stint
                text-[8px]
                uppercase
                tracking-[0.08em]
                text-[#bd9852]

                md:text-[9px]
              "
            >
              Our Promise
            </span>

            <div
              className="
                h-px
                flex-1
                bg-[#bd9852]/70
              "
            />
          </div>

          {/* TITLE */}

          <h2
            className="
              cta-title
              mt-6
              max-w-[600px]
              font-stint
              text-[48px]
              uppercase
              leading-[0.9]
              tracking-[-0.035em]
              text-white

              sm:text-[58px]

              md:text-[68px]

              lg:text-[76px]

              xl:text-[84px]
            "
          >
            Not Just Cars.
            <br />

            <span className="text-[#bd9852]">
              Experiences.
            </span>
          </h2>

          {/* DESCRIPTION */}

          <p
            className="
              cta-description
              mt-6
              max-w-[320px]
              font-stint
              text-[10px]
              leading-[1.7]
              text-white/65

              sm:text-[11px]

              md:text-[12px]
            "
          >
            We don&apos;t just sell vehicles.
            <br />
            We create memories that last
            a lifetime.
          </p>

          {/* BUTTON */}

          <Link
            href="/cars"
            className="
              cta-button
              group
              mt-8
              flex
              h-[46px]
              w-fit
              items-center
              gap-6
              border
              border-[#bd9852]
              px-5
              font-stint
              text-[9px]
              uppercase
              tracking-[0.08em]
              text-[#bd9852]
              transition-all
              duration-500

              hover:bg-[#bd9852]
              hover:text-black
            "
          >
            <span>
              View Our Fleet
            </span>

            <ArrowUpRight
              size={15}
              strokeWidth={1.2}
              className="
                transition-transform
                duration-500
                group-hover:translate-x-1
                group-hover:-translate-y-1
              "
            />
          </Link>
        </div>
      </div>

      {/* ==================================================
          CONTACT STRIP
      ================================================== */}

      <div
        className="
          border-b
          border-[#202020]/20
          bg-[#e9e7e2]
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-[1500px]
            grid-cols-1
            px-6

            sm:px-8

            md:px-10

            lg:grid-cols-[1.1fr_0.8fr_0.8fr_0.8fr_auto]
            lg:px-14
          "
        >
          {/* ==================================================
              LEFT INTRO
          ================================================== */}

          <div
            className="
              border-b
              border-[#202020]/15
              py-9
              pr-8

              lg:border-b-0
              lg:border-r
              lg:py-10
            "
          >
            <h3
              className="
                font-stint
                text-[28px]
                uppercase
                leading-[0.95]
                tracking-[-0.025em]
                text-[#202020]

                sm:text-[32px]

                md:text-[35px]
              "
            >
              Ready To Find
              <br />

              Your{" "}
              <span className="text-[#bd9852]">
                Perfect Ride?
              </span>
            </h3>

            <p
              className="
                mt-4
                font-stint
                text-[10px]
                text-[#202020]/65

                md:text-[11px]
              "
            >
              Let&apos;s build your next
              experience together.
            </p>
          </div>

          {/* ==================================================
              PHONE
          ================================================== */}

          <ContactItem
            icon={<Phone size={18} strokeWidth={1} />}
            title="Talk To Our Experts"
            value="+91 234567890"
          />

          {/* ==================================================
              APPOINTMENT
          ================================================== */}

          <ContactItem
            icon={
              <CalendarDays
                size={18}
                strokeWidth={1}
              />
            }
            title="Book An Appointment"
            value="Available 24/7"
          />

          

          {/* ==================================================
              CTA
          ================================================== */}

          <div
            className="
              flex
              items-center
              py-7

              lg:px-7
              lg:py-10
            "
          >
            <Link
              href="/contact-us"
              className="
                group
                flex
                h-[44px]
                w-full
                min-w-[150px]
                items-center
                justify-between
                gap-5
                border
                border-[#bd9852]
                px-4
                font-stint
                text-[8px]
                uppercase
                tracking-[0.06em]
                text-[#202020]
                transition-all
                duration-500

                hover:bg-[#bd9852]
              "
            >
              <span>
                Get In Touch
              </span>

              <ArrowUpRight
                size={15}
                strokeWidth={1}
                className="
                  text-[#bd9852]
                  transition-all
                  duration-500

                  group-hover:-translate-y-1
                  group-hover:translate-x-1
                  group-hover:text-[#202020]
                "
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========================================================
   CONTACT ITEM
======================================================== */

function ContactItem({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div
      className="
        contact-item
        flex
        items-center
        gap-4
        border-b
        border-[#202020]/15
        py-7

        md:py-8

        lg:border-b-0
        lg:border-r
        lg:px-6
        lg:py-10
      "
    >
      {/* ICON */}

      <div
        className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          text-[#bd9852]
        "
      >
        {icon}
      </div>

      {/* TEXT */}

      <div>
        <p
          className="
            font-stint
            text-[9px]
            text-[#202020]/70
          "
        >
          {title}
        </p>

        <p
          className="
            mt-2
            font-stint
            text-[10px]
            text-[#202020]
          "
        >
          {value}
        </p>
      </div>
    </div>
  );
}