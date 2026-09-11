"use client";

import Image from "next/image";
import Link from "next/link";
import { X, ChevronLeft, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

const menuItems = [
  "Home",
  "About Us",
  "Our Fleet",
  "Contact Us",
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Always show navbar near the top
          if (currentScrollY < 80) {
            setNavVisible(true);
          }
          // Scrolling DOWN → hide
          else if (currentScrollY > lastScrollY + 5) {
            setNavVisible(false);
          }
          // Scrolling UP → show
          else if (currentScrollY < lastScrollY - 5) {
            setNavVisible(true);
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Keep navbar visible when menu is open
  const shouldShowNav = navVisible || menuOpen;

  return (
    <>
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header
        className={`
          fixed
          left-0
          top-0
          z-[100]
          w-full
          px-6
          text-white
          md:px-12
          lg:px-16

          transition-transform
          duration-700
          ease-[cubic-bezier(0.77,0,0.175,1)]

          ${
            shouldShowNav
              ? "translate-y-0"
              : "-translate-y-full"
          }
        `}
      >
        <div
          className="
            relative
            flex
            h-[105px]
            items-center
            justify-between
            border-b
            border-white/20
          "
        >
          {/* =================================================
              LEFT — MENU
          ================================================= */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="
              group
              flex
              items-center
              gap-4
              uppercase
              tracking-[0.2em]
            "
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span
              className="
                relative
                flex
                h-5
                w-5
                items-center
                justify-center
                transition-transform
                duration-500
              "
            >
              {menuOpen ? (
                <X
                  size={19}
                  strokeWidth={1.5}
                />
              ) : (
                <ChevronLeft
                  size={18}
                  strokeWidth={1.5}
                  className="rotate-180"
                />
              )}
            </span>

            <span
              className="
                text-[12px]
                font-medium
                md:text-[13px]
              "
            >
              {menuOpen ? "Close" : "Menu"}
            </span>
          </button>

          {/* =================================================
              CENTER LOGO
          ================================================= */}

          <Link
            href="/"
            className="
              absolute
              left-1/2
              top-1/2
              flex
              -translate-x-1/2
              -translate-y-1/2
              items-center
              gap-3
            "
          >
            <Image
              src="/logo.png"
              alt="CYBER TORQUE"
              width={100}
              height={100}
              className="
                h-[60px]
                w-auto
                object-contain
                md:h-[80px]
              "
              priority
            />

            <p
              className="
                hidden
                font-stint
                text-[20px]
                uppercase
                leading-none
                tracking-[-0.02em]
                sm:block
                md:text-[28px]
              "
            >
              Cyber
              <br />
              Torque
            </p>
          </Link>

          {/* =================================================
              RIGHT — BOOK NOW
          ================================================= */}

          <Link
            href="/contact-us"
            className="
              group
              flex
              items-center
              gap-3
              uppercase
              tracking-[0.18em]
            "
          >
            <ArrowUpRight
              size={18}
              strokeWidth={1.5}
              className="
                transition-transform
                duration-300
                group-hover:scale-110
              "
            />

            <span
              className="
                text-[11px]
                font-medium
                md:text-[13px]
              "
            >
              Book Now
            </span>
          </Link>
        </div>
      </header>

      {/* =====================================================
          FULLSCREEN MENU
      ===================================================== */}

      <div
        className={`
          fixed
          inset-0
          z-[90]
          transition-all
          duration-700

          ${
            menuOpen
              ? "pointer-events-auto visible"
              : "pointer-events-none invisible"
          }
        `}
      >
        {/* =================================================
            BACKDROP
        ================================================= */}

        <div
          onClick={() => setMenuOpen(false)}
          className={`
            absolute
            inset-0
            bg-black/30
            transition-opacity
            duration-700

            ${
              menuOpen
                ? "opacity-100"
                : "opacity-0"
            }
          `}
        />

        {/* =================================================
            MENU PANEL
        ================================================= */}

        <aside
          className={`
            relative
            h-full
            w-full
            overflow-hidden
            bg-black/80
            backdrop-blur-[28px]
            transition-transform
            duration-700
            ease-[cubic-bezier(0.77,0,0.175,1)]
            md:w-[42%]

            ${
              menuOpen
                ? "translate-x-0"
                : "-translate-x-full"
            }
          `}
        >
          {/* GLOW */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-[radial-gradient(circle_at_20%_40%,rgba(255,255,255,0.08),transparent_35%)]
            "
          />

          {/* MENU CONTENT */}

          <div
            className="
              relative
              flex
              h-full
              flex-col
              justify-center
              px-10
              pt-20
              md:px-16
              lg:px-20
            "
          >
            <nav
              className="
                flex
                flex-col
                items-start
                gap-7
                md:gap-8
              "
            >
              {menuItems.map((item, index) => {
                const href =
                  item === "Home"
                    ? "/"
                    : item === "Our Fleet"
                      ? "/cars"
                    : `/${item
                        .toLowerCase()
                        .replaceAll(" ", "-")}`;

                return (
                  <Link
                    key={item}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="
                      group
                      relative
                      font-stint
                      text-[14px]
                      font-medium
                      uppercase
                      tracking-[0.14em]
                      text-white/65
                      transition-all
                      duration-300
                      hover:text-white
                      md:text-[16px]
                    "
                    style={{
                      transitionDelay: menuOpen
                        ? `${100 + index * 45}ms`
                        : "0ms",
                    }}
                  >
                    <span className="relative">
                      {item}

                      {/* UNDERLINE */}

                      <span
                        className="
                          absolute
                          -bottom-2
                          left-0
                          h-px
                          w-0
                          bg-[#c5a15b]
                          transition-all
                          duration-500
                          group-hover:w-full
                        "
                      />
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>
      </div>
    </>
  );
}