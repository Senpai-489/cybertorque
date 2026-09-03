"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/homepage/Navbar";
import Footer from "../components/homepage/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const pageRef = useRef<HTMLElement>(null);

  const [submitted, setSubmitted] = useState(false);

  useLayoutEffect(() => {
    const page = pageRef.current;

    if (!page) return;

    const ctx = gsap.context(() => {
      /* HERO */

      gsap.fromTo(
        ".contact-hero-content",
        {
          opacity: 0,
          y: 70,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        ".contact-hero-image",
        {
          scale: 1.12,
        },
        {
          scale: 1,
          duration: 1.8,
          ease: "power3.out",
        }
      );

      /* FORM */

      gsap.fromTo(
        ".contact-form-content",
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",

          scrollTrigger: {
            trigger: ".contact-form-section",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      /* CONTACT INFO */

      gsap.fromTo(
        ".contact-info-item",
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",

          scrollTrigger: {
            trigger: ".contact-info",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      /* SHOWROOM */

      gsap.fromTo(
        ".showroom-image",
        {
          scale: 1.1,
        },
        {
          scale: 1,

          scrollTrigger: {
            trigger: ".showroom-section",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        ".showroom-content",
        {
          opacity: 0,
          x: -40,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",

          scrollTrigger: {
            trigger: ".showroom-section",
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, page);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <main
      ref={pageRef}
      className="overflow-hidden bg-[#e9e7e2] text-[#202020]"
    >
        <Navbar />
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative h-screen min-h-[650px] overflow-hidden bg-black">
        {/* BACKGROUND */}

        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/contact-hero.jpg"
            alt="Cyber Torque"
            fill
            priority
            className="contact-hero-image object-cover"
            sizes="100vw"
          />
        </div>

        {/* OVERLAYS */}

        <div className="absolute inset-0 bg-black/45" />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-black/85
            via-black/45
            to-black/15
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/65
            via-transparent
            to-black/20
          "
        />

        {/* CONTENT */}

        <div
          className="
            contact-hero-content
            relative
            z-10
            flex
            h-full
            items-center
            justify-center
            px-6
            text-center
          "
        >
          <div className="flex max-w-[1000px] flex-col items-center">
            {/* EYEBROW */}

            <div className="flex items-center gap-5">
              <span
                className="
                  font-stint
                  text-[9px]
                  uppercase
                  tracking-[0.1em]
                  text-[#bd9852]
                "
              >
                Contact Us
              </span>

              <div className="h-px w-24 bg-[#bd9852]" />

              <span
                className="
                  hidden
                  font-stint
                  text-[8px]
                  uppercase
                  tracking-[0.1em]
                  text-white/50
                  sm:block
                "
              >
                Cyber Torque
              </span>
            </div>

            {/* TITLE */}

            <h1
              className="
                mt-7
                font-stint
                text-[52px]
                uppercase
                leading-[0.88]
                tracking-[-0.04em]
                text-white

                sm:text-[68px]

                md:text-[90px]

                lg:text-[110px]
              "
            >
              Let's Talk
              <br />

              <span className="text-[#bd9852]">
                Cars.
              </span>
            </h1>

            <p
              className="
                mt-7
                max-w-[430px]
                font-stint
                text-[10px]
                leading-[1.8]
                text-white/65

                sm:text-[11px]

                md:text-[12px]
              "
            >
              Whether you're searching for your
              next performance machine, building
              something completely bespoke, or
              simply want to talk automobiles —
              we're here.
            </p>

            {/* SCROLL */}

            <div className="mt-12 flex flex-col items-center gap-3">
              <span
                className="
                  font-stint
                  text-[8px]
                  uppercase
                  tracking-[0.12em]
                  text-white/45
                "
              >
                Start A Conversation
              </span>

              <ArrowDown
                size={16}
                strokeWidth={1}
                className="animate-bounce text-[#bd9852]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT FORM
      ===================================================== */}

      <section
        className="
          contact-form-section
          relative
          z-20
          bg-[#e9e7e2]
        "
      >
        <div
          className="
            mx-auto
            max-w-[1500px]
            px-6
            py-20

            sm:px-8

            md:px-10
            md:py-28

            lg:px-14
            lg:py-32
          "
        >
          {/* TOP META */}

          <div className="flex items-center gap-5 border-t border-[#202020]/35 pt-3">
            <span
              className="
                font-stint
                text-[8px]
                uppercase
                tracking-[0.08em]
              "
            >
              Get In Touch
            </span>

            <div className="h-px flex-1 bg-[#202020]/20" />

            <span
              className="
                font-stint
                text-[8px]
                uppercase
                tracking-[0.08em]
                text-[#202020]/55
              "
            >
              Your Next Vehicle Starts Here
            </span>
          </div>

          <div
            className="
              contact-form-content
              mt-14
              grid
              grid-cols-1
              gap-14

              lg:grid-cols-[0.8fr_1.2fr]
              lg:gap-20
            "
          >
            {/* LEFT */}

            <div>
              <h2
                className="
                  font-stint
                  text-[48px]
                  uppercase
                  leading-[0.9]
                  tracking-[-0.04em]

                  sm:text-[60px]

                  lg:text-[72px]
                "
              >
                Tell Us
                <br />

                What You{" "}
                <span className="text-[#bd9852]">
                  Want.
                </span>
              </h2>

              <p
                className="
                  mt-7
                  max-w-[380px]
                  font-stint
                  text-[10px]
                  leading-[1.8]
                  text-[#202020]/65

                  md:text-[11px]
                "
              >
                Tell us about the vehicle you're
                looking for, your preferences, or
                simply what you've been dreaming
                about.
              </p>

              <div className="mt-12 grid max-w-[360px] grid-cols-2 gap-6">
                <InfoBlock
                  icon={<Clock3 size={18} strokeWidth={1} />}
                  title="Availability"
                  value="24 / 7"
                />

                <InfoBlock
                  icon={<CalendarDays size={18} strokeWidth={1} />}
                  title="Appointments"
                  value="By Request"
                />
              </div>
            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="
                relative
                border
                border-[#202020]/20
                bg-[#e4e2dd]
                p-6

                sm:p-8

                md:p-10
              "
            >
              {/* GOLD CORNER */}

              <div
                className="
                  absolute
                  -right-2
                  -top-2
                  h-10
                  w-10
                  border-r
                  border-t
                  border-[#bd9852]
                "
              />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Input
                  label="Name"
                  name="name"
                  placeholder="Your Name"
                  required
                />

                <Input
                  label="Phone"
                  name="phone"
                  placeholder="+91"
                  required
                />

                <Input
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />

                <div>
                  <label className="font-stint text-[9px] uppercase tracking-[0.05em]">
                    I'm Interested In
                  </label>

                  <select
                    name="interest"
                    className="
                      mt-2
                      h-[44px]
                      w-full
                      appearance-none
                      border
                      border-[#202020]/20
                      bg-[#eeece7]
                      px-4
                      font-stint
                      text-[10px]
                      outline-none
                      transition
                      focus:border-[#bd9852]
                    "
                  >
                    <option>Buying a Vehicle</option>
                    <option>Custom Vehicle</option>
                    <option>Vehicle Sourcing</option>
                    <option>Financing</option>
                    <option>General Enquiry</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="font-stint text-[9px] uppercase tracking-[0.05em]">
                    Tell Us More
                  </label>

                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Tell us what you're looking for..."
                    className="
                      mt-2
                      w-full
                      resize-none
                      border
                      border-[#202020]/20
                      bg-[#eeece7]
                      p-4
                      font-stint
                      text-[10px]
                      outline-none
                      transition
                      placeholder:text-[#202020]/35
                      focus:border-[#bd9852]
                    "
                  />
                </div>
              </div>

              {/* SUBMIT */}

              <button
                type="submit"
                className="
                  group
                  mt-7
                  flex
                  h-[48px]
                  w-full
                  items-center
                  justify-between
                  bg-[#bd9852]
                  px-5
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
                <span>
                  {submitted
                    ? "Message Sent"
                    : "Send Enquiry"}
                </span>

                <ArrowUpRight
                  size={16}
                  strokeWidth={1.2}
                  className="
                    transition-transform
                    duration-500
                    group-hover:-translate-y-1
                    group-hover:translate-x-1
                  "
                />
              </button>

              {submitted && (
                <p
                  className="
                    mt-4
                    font-stint
                    text-[9px]
                    text-[#8c6b32]
                  "
                >
                  Thank you. Our team will be in
                  touch shortly.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

     

      
      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          bg-[#bd9852]
          px-6
          py-20
          text-center

          sm:px-8

          md:py-28
        "
      >
        <div className="mx-auto max-w-[900px]">
          <p
            className="
              font-stint
              text-[8px]
              uppercase
              tracking-[0.12em]
              text-black/60
            "
          >
            Your Next Drive Awaits
          </p>

          <h2
            className="
              mt-5
              font-stint
              text-[45px]
              uppercase
              leading-[0.9]
              tracking-[-0.04em]
              text-[#181818]

              sm:text-[60px]

              md:text-[80px]
            "
          >
            Let's Make
            <br />
            It Happen.
          </h2>

          <Link
            href="/cars"
            className="
              group
              mx-auto
              mt-9
              flex
              h-[50px]
              w-fit
              items-center
              gap-6
              border
              border-[#181818]
              px-7
              font-stint
              text-[9px]
              uppercase
              tracking-[0.08em]
              text-[#181818]
              transition-all
              duration-500
              hover:bg-[#181818]
              hover:text-[#bd9852]
            "
          >
            <span>Explore The Fleet</span>

            <ArrowUpRight
              size={16}
              strokeWidth={1}
              className="
                transition-transform
                duration-500
                group-hover:-translate-y-1
                group-hover:translate-x-1
              "
            />
          </Link>
        </div>
      </section>
        <Footer />
    </main>
  );
}

/* =========================================================
   INPUT
========================================================= */

function Input({
  label,
  name,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="font-stint text-[9px] uppercase tracking-[0.05em]">
        {label}
      </label>

      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="
          mt-2
          h-[44px]
          w-full
          border
          border-[#202020]/20
          bg-[#eeece7]
          px-4
          font-stint
          text-[10px]
          outline-none
          transition
          placeholder:text-[#202020]/35
          focus:border-[#bd9852]
        "
      />
    </div>
  );
}

/* =========================================================
   SMALL INFO BLOCK
========================================================= */

function InfoBlock({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div>
      <div className="text-[#bd9852]">
        {icon}
      </div>

      <p
        className="
          mt-3
          font-stint
          text-[8px]
          uppercase
          tracking-[0.05em]
          text-[#202020]/50
        "
      >
        {title}
      </p>

      <p
        className="
          mt-1
          font-stint
          text-[10px]
        "
      >
        {value}
      </p>
    
    </div>
  );
}

/* =========================================================
   CONTACT INFO
========================================================= */

function ContactInfo({
  icon,
  title,
  value,
  link,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  link?: string;
}) {
  const content = (
    <div
      className="
        contact-info-item
        group
        border-b
        border-white/15
        py-8

        sm:px-6
        sm:first:pl-0
        sm:nth-child(2):border-l
        sm:nth-child(3):border-l
        sm:nth-child(4):border-l

        lg:py-5
      "
    >
      <div
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          text-[#bd9852]
          transition-transform
          duration-500
          group-hover:scale-110
        "
      >
        {icon}
      </div>

      <p
        className="
          mt-5
          font-stint
          text-[8px]
          uppercase
          tracking-[0.08em]
          text-white/40
        "
      >
        {title}
      </p>

      <p
        className="
          mt-2
          font-stint
          text-[11px]
          text-white/85
        "
      >
        {value}
      </p>
    
    </div>
  );

  if (link) {
    return <a href={link}>{content}</a>;
  }

  return content;
}