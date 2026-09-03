"use client";

import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { FormEvent, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const logoRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const [submitted, setSubmitted] = useState(false);

  /*
  ==========================================================
  ENTRANCE ANIMATION
  ==========================================================
  */

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      /*
      --------------------------------------------------------
      INITIAL STATES
      --------------------------------------------------------
      */

      gsap.set(logoRef.current, {
        opacity: 0,
        y: 30,
      });

      gsap.set(brandRef.current, {
        opacity: 0,
        x: 40,
      });

      gsap.set(titleRef.current, {
        opacity: 0,
        y: 80,
      });

      gsap.set(lineRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      gsap.set(formRef.current, {
        opacity: 0,
        y: 80,
        scale: 0.96,
      });

      gsap.set(footerRef.current, {
        opacity: 0,
        y: 30,
      });

      /*
      --------------------------------------------------------
      MAIN TIMELINE
      --------------------------------------------------------
      */

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "top 20%",
          scrub: 1,
        },
      });

      tl.to(
        logoRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        },
        0
      );

      tl.to(
        brandRef.current,
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: "power3.out",
        },
        0.08
      );

      tl.to(
        lineRef.current,
        {
          scaleX: 1,
          duration: 0.5,
          ease: "power3.out",
        },
        0.15
      );

      tl.to(
        titleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        0.18
      );

      tl.to(
        formRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        0.3
      );

      tl.to(
        footerRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        },
        0.55
      );
    }, section);

    return () => ctx.revert();
  }, []);

  /*
  ==========================================================
  FORM
  ==========================================================
  */

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section
      ref={sectionRef}
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#1d1d1d]
        text-white
      "
    >
      {/* ==================================================
          BACKGROUND
      ================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_20%_40%,rgba(189,154,86,0.07),transparent_35%)]
        "
      />

      {/* ==================================================
          MAIN CONTAINER
      ================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-screen
          max-w-[1500px]
          flex-col
          px-6
          py-5
          md:px-10
          lg:px-14
        "
      >
        {/* ==================================================
            TOP BORDER
        ================================================== */}

        <div className="border-t border-white/30" />

        {/* ==================================================
            HEADER
        ================================================== */}

        <div
          className="
            flex
            items-start
            justify-between
            pt-3
          "
        >
          {/* LOGO */}

          <div className="flex items-center gap-5">
            <div
              ref={logoRef}
              className="
                relative
                h-[65px]
                w-[90px]
                md:h-[85px]
                md:w-[115px]
              "
            >
              <Image
                src="/logo.png"
                alt="Cyber Torque"
                fill
                className="
                  object-contain
                  brightness-0
                  invert
                "
              />
            </div>

            {/* DIVIDER */}

            <div className="h-[55px] w-px bg-[#bd9a56] md:h-[75px]" />

            {/* BRAND */}

            <div
              ref={brandRef}
              className="
                font-stint
                text-[31px]
                uppercase
                leading-[0.95]
                tracking-[-0.03em]
                md:text-[42px]
              "
            >
              Cyber
              <br />
              Torque
            </div>
          </div>

          {/* TOP RIGHT */}

          <div
            className="
              hidden
              text-right
              md:block
            "
          >
            <p
              className="
                font-stint
                text-[9px]
                uppercase
                tracking-[0.08em]
                text-white/50
              "
            >
              Exceptional Vehicles
            </p>

            <p
              className="
                mt-1
                font-stint
                text-[9px]
                uppercase
                tracking-[0.08em]
                text-white/50
              "
            >
              Exceptional Experiences
            </p>
          </div>
        </div>

        {/* ==================================================
            GOLD DIVIDER
        ================================================== */}

        <div
          ref={lineRef}
          className="
            mt-8
            h-px
            w-full
            bg-[#bd9a56]
          "
        />

        {/* ==================================================
            MAIN CONTENT
        ================================================== */}

        <div
          className="
            grid
            flex-1
            items-center
            gap-12
            py-14
            md:py-20
            lg:grid-cols-12
            lg:gap-16
          "
        >
          {/* ==================================================
              LEFT
          ================================================== */}

          <div className="lg:col-span-7">
            <p
              className="
                mb-5
                font-stint
                text-[10px]
                uppercase
                tracking-[0.25em]
                text-[#bd9a56]
              "
            >
              Start A Conversation
            </p>

            <div className="overflow-hidden">
              <h2
                ref={titleRef}
                className="
                  font-stint
                  text-[65px]
                  uppercase
                  leading-[0.82]
                  tracking-[-0.04em]
                  text-white
                  sm:text-[82px]
                  md:text-[105px]
                  lg:text-[115px]
                  xl:text-[130px]
                "
              >
                Let's
                <br />
                Talk
              </h2>
            </div>

            {/* GOLD UNDERLINE */}

            <div
              className="
                mt-5
                h-[2px]
                w-[260px]
                bg-[#bd9a56]
                sm:w-[360px]
                md:w-[430px]
              "
            />

            {/* DESCRIPTION */}

            <p
              className="
                mt-8
                max-w-[470px]
                font-stint
                text-[12px]
                leading-[2]
                text-white/55
                md:text-[14px]
              "
            >
              Looking for something extraordinary?
              Tell us what you have in mind and let our
              team help you find, source and personalise
              your next vehicle.
            </p>

            {/* CONTACT DETAILS */}

            <div
              className="
                mt-8
                flex
                flex-col
                gap-2
                font-stint
                text-[10px]
                uppercase
                tracking-[0.08em]
                text-white/50
              "
            >
              <a
                href="mailto:hello@cybertorque.com"
                className="
                  w-fit
                  transition-colors
                  hover:text-[#bd9a56]
                "
              >
                hello@cybertorque.com
              </a>

              <a
                href="tel:+919876543210"
                className="
                  w-fit
                  transition-colors
                  hover:text-[#bd9a56]
                "
              >
                +91 98765 43210
              </a>
            </div>
          </div>

          {/* ==================================================
              FORM
          ================================================== */}

          <div className="lg:col-span-5">
            <div
              ref={formRef}
              className="
                relative
                bg-[#bd9a56]
                p-6
                shadow-[10px_10px_0_rgba(0,0,0,0.2)]
                md:p-7
                lg:p-8
              "
            >
              {/* FORM HEADER */}

              <div className="mb-7">
                <p
                  className="
                    font-stint
                    text-[11px]
                    uppercase
                    tracking-[0.15em]
                    text-black/70
                  "
                >
                  Enquire Now
                </p>

                <p
                  className="
                    mt-1
                    font-stint
                    text-[10px]
                    text-black/50
                  "
                >
                  Tell us about your next drive.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
              >
                {/* NAME */}

                <FormField
                  label="Name"
                  name="name"
                  placeholder="John Doe"
                  type="text"
                />

                {/* EMAIL */}

                <FormField
                  label="Email"
                  name="email"
                  placeholder="example@email.com"
                  type="email"
                />

                {/* PHONE */}

                <FormField
                  label="Phone"
                  name="phone"
                  placeholder="+91 1234567890"
                  type="tel"
                />

                {/* QUERY */}

                <div>
                  <label
                    htmlFor="query"
                    className="
                      mb-2
                      block
                      font-stint
                      text-[11px]
                      text-black/80
                    "
                  >
                    Query
                  </label>

                  <textarea
                    id="query"
                    name="query"
                    rows={4}
                    placeholder="Tell us what you're looking for..."
                    className="
                      w-full
                      resize-none
                      border-none
                      bg-[#e9e7e2]
                      px-3
                      py-2
                      font-stint
                      text-[11px]
                      text-[#292929]
                      outline-none
                      placeholder:text-[#292929]/35
                      focus:ring-1
                      focus:ring-black/40
                    "
                  />
                </div>

                {/* SUBMIT */}

                <button
                  type="submit"
                  className="
                    group
                    mx-auto
                    flex
                    h-[36px]
                    w-[150px]
                    items-center
                    justify-between
                    bg-[#1d1d1d]
                    px-5
                    font-stint
                    text-[11px]
                    text-white
                    transition-all
                    duration-500
                    hover:w-[170px]
                  "
                >
                  <span>
                    {submitted ? "Sent" : "Submit"}
                  </span>

                  <ArrowRight
                    size={14}
                    strokeWidth={1.3}
                    className="
                      transition-transform
                      duration-500
                      group-hover:translate-x-1
                    "
                  />
                </button>
              </form>

              {/* SUCCESS */}

              {submitted && (
                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center
                    bg-[#bd9a56]/95
                  "
                >
                  <div className="text-center">
                    <p
                      className="
                        font-stint
                        text-[28px]
                        uppercase
                        text-black
                      "
                    >
                      Thank You
                    </p>

                    <p
                      className="
                        mt-2
                        font-stint
                        text-[11px]
                        text-black/60
                      "
                    >
                      We'll be in touch shortly.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ==========================================================
   FORM FIELD
========================================================== */

function FormField({
  label,
  name,
  placeholder,
  type,
}: {
  label: string;
  name: string;
  placeholder: string;
  type: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="
          mb-2
          block
          font-stint
          text-[11px]
          text-black/80
        "
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required
        className="
          h-[31px]
          w-full
          border-none
          bg-[#e9e7e2]
          px-3
          font-stint
          text-[11px]
          text-[#292929]
          outline-none
          placeholder:text-[#292929]/35
          focus:ring-1
          focus:ring-black/40
        "
      />
    </div>
  );
}