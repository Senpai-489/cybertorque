"use client";
import {FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import {
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;

    if (!footer) return;

    const ctx = gsap.context(() => {
      gsap.set(contentRef.current, {
        y: 35,
        opacity: 0,
      });

      gsap.set(bottomRef.current, {
        opacity: 0,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footer,
          start: "top 85%",
          end: "top 55%",
          scrub: 1,
        },
      });

      tl.to(contentRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
      });

      tl.to(
        bottomRef.current,
        {
          opacity: 1,
          duration: 0.4,
        },
        0.45
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="
        relative
        overflow-hidden
        bg-[#1d1d1d]
        text-white
      "
    >
      {/* =====================================================
          TOP BORDER
      ===================================================== */}

      <div className="h-px w-full bg-[#bd9a56]/60" />

      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}

      <div
        ref={contentRef}
        className="
          mx-auto
          max-w-[1500px]
          px-6
          py-10
          md:px-10
          md:py-12
          lg:px-14
          lg:py-14
        "
      >
        <div
          className="
            grid
            grid-cols-1
            gap-10
            md:grid-cols-12
            md:gap-6
          "
        >
          {/* =================================================
              COLUMN 1 — NAVIGATION
          ================================================= */}

          <div
            className="
              md:col-span-2
            "
          >
            <p className="footer-label">
              Explore
            </p>

            <div className="mt-5 flex flex-col gap-2.5">
              <FooterLink href="/about-us">
                About Us
              </FooterLink>

              <FooterLink href="/blog">
                Blog
              </FooterLink>

              <FooterLink href="/contact-us">
                Contact Us
              </FooterLink>

              <FooterLink href="/cars">
                Explore Fleet
              </FooterLink>
            </div>
          </div>

          {/* =================================================
              COLUMN 2 — LEGAL
          ================================================= */}

          <div
            className="
              md:col-span-2
            "
          >
            <p className="footer-label">
              Information
            </p>

            <div className="mt-5 flex flex-col gap-2.5">
              <FooterLink href="/cookies">
                Cookie Policy
              </FooterLink>

              <FooterLink href="/terms">
                Terms and Conditions
              </FooterLink>

              <FooterLink href="/privacy">
                Privacy Policy
              </FooterLink>
            </div>
          </div>

          {/* =================================================
              COLUMN 3 — SOCIAL
          ================================================= */}

          <div
            className="
              flex
              items-start
              md:col-span-2
              md:justify-center
            "
          >
            <div
              className="
                flex
                flex-row
                gap-5
                md:flex-col
                md:gap-4
              "
            >
              <Link
                href="#"
                className="flex gap-4 hover:text-[#bd9a56] items-center"
              >
                <FaInstagram size={17} strokeWidth={1.2} /> <p>Instagram</p>
              </Link>

              <Link
                href="#"
                className="flex gap-4 hover:text-[#bd9a56] items-center"
              >
                <FaFacebook size={17} strokeWidth={1.2} /> <p>Facebook</p>
              </Link>

              <Link
                href="#"
                className="flex gap-4 hover:text-[#bd9a56] items-center"
              >
                <FaYoutube size={17} strokeWidth={1.2} /> <p>Youtube</p>
              </Link>

            </div>
          </div>

          {/* =================================================
              DIVIDER
          ================================================= */}

          <div
            className="
              hidden
              h-full
              w-px
              bg-[#bd9a56]/60
              md:col-span-1
              md:block
            "
          />

          {/* =================================================
              COLUMN 4 — CONTACT
          ================================================= */}

          <div
            className="
              md:col-span-5
            "
          >
            <p className="footer-label">
              Contact
            </p>

            <div className="mt-5 flex flex-col gap-4">
              {/* PHONE */}

              <a
                href="tel:+919876543210"
                className="
                  footer-contact
                  group
                  flex items-baseline gap-4
                "
              >
                <span className="footer-icon">
                  <Phone
                    size={16}
                    strokeWidth={1.2}
                  />
                </span>

                <span className="group-hover:text-[#bd9a56]">
                  +91 9876543210
                </span>

               
              </a>

              {/* EMAIL */}

              <a
                href="mailto:example@gmail.com"
                className="
                  footer-contact
                  group
                  flex items-baseline gap-4
                "
              >
                <span className="footer-icon">
                  <Mail
                    size={16}
                    strokeWidth={1.2}
                  />
                </span>

                <span className="group-hover:text-[#bd9a56]">
                  example@gmail.com
                </span>

               
              </a>

              {/* LOCATION */}
            
              <a
                href="mailto:example@gmail.com"
                className="
                  footer-contact
                  group
                  flex items-baseline gap-4
                "
              >
                <span className="footer-icon">
                  <MapPin
                    size={16}
                    strokeWidth={1.2}
                  />
                </span>

                <span className="group-hover:text-[#bd9a56]">
                  Example address, city, country, (00000)
                </span>

               
              </a>
           
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM BAR
      ===================================================== */}

      <div
        ref={bottomRef}
        className="
          border-t
          border-white/15
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-[1500px]
            flex-col
            gap-2
            px-6
            py-3
            font-stint
            text-[8px]
            text-white/55
            md:flex-row
            md:items-center
            md:justify-between
            md:px-10
            lg:px-14
          "
        >
          {/* COPYRIGHT */}

          <p>
            Copyright 2026 All Rights Reserved
          </p>

          {/* CENTER */}

          <Link
            href="/"
            className="
              uppercase
              tracking-[0.04em]
              transition-colors
              hover:text-[#bd9a56]
            "
          >
            Cyber Torque
          </Link>

          {/* DESIGN */}

          <p>
            Designed and Developed By{" "}
            <span className="text-white/80">
              The V8 Lab
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ==========================================================
   FOOTER LINK
========================================================== */

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="
        group
        relative
        w-fit
        font-stint
        text-[10px]
        text-white/65
        transition-colors
        duration-300
        hover:text-white
      "
    >
      {children}

      <span
        className="
          absolute
          -bottom-1
          left-0
          h-px
          w-0
          bg-[#bd9a56]
          transition-all
          duration-300
          group-hover:w-full
        "
      />
    </Link>
  );
}

/* ==========================================================
   SOCIAL LINK
========================================================== */

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="
        flex
        h-8
        w-8
        items-center
        justify-center
        text-[#bd9a56]
        transition-all
        duration-300
        hover:scale-110
        hover:text-white
      "
    >
      {children}
    </a>
  );
}