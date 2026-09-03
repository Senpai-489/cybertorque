"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "What vehicles does Cyber Torque offer?",
    answer:
      "Cyber Torque specialises in exceptional performance and luxury vehicles, carefully selected for their design, character and driving experience. Our collection includes premium sports cars, luxury SUVs and distinctive performance automobiles.",
  },
  {
    question: "Can I customise my vehicle?",
    answer:
      "Absolutely. We offer a range of customisation options including wheels, exterior enhancements, interiors, lighting, performance upgrades and other bespoke details to make your vehicle uniquely yours.",
  },
  {
    question: "Do you source vehicles on request?",
    answer:
      "Yes. If the vehicle you are looking for is not currently part of our collection, our team can source it through our network and guide you through the entire procurement process.",
  },
  {
    question: "Do you handle vehicle import and shipping?",
    answer:
      "Yes. Our process can include procurement, international logistics, shipping, customs clearance and delivery, giving you a single point of contact throughout the journey.",
  },
  {
    question: "How long does the entire process take?",
    answer:
      "The timeline depends on the vehicle, location, availability and required customisation. Once your requirements are confirmed, our team will provide a clear estimated timeline for your specific vehicle.",
  },
  {
    question: "Can I arrange a viewing before purchasing?",
    answer:
      "Yes. We encourage clients to experience the vehicle before making a decision. Contact our team to arrange a viewing or discuss the vehicle you are interested in.",
  },
];

export default function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const arrowRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  /*
  ==========================================================
  ENTRANCE ANIMATION
  ==========================================================
  */

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.set(itemsRef.current, {
        y: 50,
        opacity: 0,
      });

      gsap.to(itemsRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",

        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "top 35%",
          scrub: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  /*
  ==========================================================
  INITIAL OPEN FAQ
  ==========================================================
  */

  useLayoutEffect(() => {
    const answer = answerRefs.current[0];

    if (!answer) return;

    gsap.set(answer, {
      height: "auto",
      opacity: 1,
    });

    gsap.set(arrowRefs.current[0], {
      rotate: 180,
    });
  }, []);

  /*
  ==========================================================
  OPEN / CLOSE
  ==========================================================
  */

  const toggleFAQ = (index: number) => {
    const previousIndex = openIndex;

    /*
    ----------------------------------------------------------
    CLOSE CURRENT
    ----------------------------------------------------------
    */

    if (
      previousIndex !== null &&
      previousIndex !== index
    ) {
      const previousAnswer =
        answerRefs.current[previousIndex];

      const previousArrow =
        arrowRefs.current[previousIndex];

      if (previousAnswer) {
        gsap.to(previousAnswer, {
          height: 0,
          opacity: 0,
          duration: 0.5,
          ease: "power3.inOut",
        });
      }

      if (previousArrow) {
        gsap.to(previousArrow, {
          rotate: 0,
          duration: 0.5,
          ease: "power3.inOut",
        });
      }
    }

    /*
    ----------------------------------------------------------
    CLOSE ACTIVE
    ----------------------------------------------------------
    */

    if (previousIndex === index) {
      const answer = answerRefs.current[index];
      const arrow = arrowRefs.current[index];

      if (answer) {
        gsap.to(answer, {
          height: 0,
          opacity: 0,
          duration: 0.5,
          ease: "power3.inOut",
        });
      }

      if (arrow) {
        gsap.to(arrow, {
          rotate: 0,
          duration: 0.5,
          ease: "power3.inOut",
        });
      }

      setOpenIndex(null);

      return;
    }

    /*
    ----------------------------------------------------------
    OPEN NEW
    ----------------------------------------------------------
    */

    const answer = answerRefs.current[index];
    const arrow = arrowRefs.current[index];

    if (answer) {
      gsap.set(answer, {
        height: 0,
        opacity: 0,
      });

      gsap.to(answer, {
        height: "auto",
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      });
    }

    if (arrow) {
      gsap.to(arrow, {
        rotate: 180,
        duration: 0.5,
        ease: "power3.out",
      });
    }

    setOpenIndex(index);
  };

  return (
    <section
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        bg-[#e9e7e2]
        px-6
        pb-24
        text-[#292929]
        md:px-10
        lg:px-14
      "
    >
      {/* ==================================================
          TOP BORDER
      ================================================== */}

      <div className="border-t border-[#292929]/50" />

      {/* ==================================================
          HEADER
      ================================================== */}

      <div
        className="
          mx-auto
          flex
          max-w-[1400px]
          items-center
          justify-between
          py-3
        "
      >
        <p
          className="
            font-stint
            text-[9px]
            uppercase
            tracking-[0.06em]
            md:text-[10px]
          "
        >
          FAQs
        </p>

        <p
          className="
            font-stint
            text-[9px]
            uppercase
            tracking-[0.06em]
            md:text-[10px]
          "
        >
          Everything You Wanna Know
        </p>
      </div>

      {/* ==================================================
          TITLE
      ================================================== */}

      <div
        className="
          mx-auto
          max-w-[1400px]
          px-2
          py-10
          text-center
          md:py-12
        "
      >
        <h2
          className="
            font-stint
            text-[48px]
            uppercase
            leading-none
            tracking-[-0.025em]
            text-[#bd9a56]
            sm:text-[58px]
            md:text-[70px]
            lg:text-[78px]
          "
        >
          FAQs
        </h2>
      </div>

      {/* ==================================================
          FAQ LIST
      ================================================== */}

      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col gap-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                ref={(el) => {
                  itemsRef.current[index] = el;
                }}
                className="
                  overflow-hidden
                "
              >
                {/* ==================================================
                    QUESTION
                ================================================== */}

                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className={`
                    group
                    flex
                    min-h-[54px]
                    w-full
                    items-center
                    justify-between
                    px-6
                    text-left
                    transition-all
                    duration-500
                    md:min-h-[58px]
                    md:px-7
                    ${
                      isOpen
                        ? "bg-[#bd9a56]"
                        : "bg-[#bd9a56]/95 hover:bg-[#c6a35d]"
                    }
                  `}
                >
                  {/* QUESTION */}

                  <span
                    className="
                      font-stint
                      text-[13px]
                      text-white
                      md:text-[14px]
                    "
                  >
                    {faq.question}
                  </span>

                  {/* ARROW */}

                  <div
                    ref={(el) => {
                      arrowRefs.current[index] = el;
                    }}
                    className="
                      flex
                      h-7
                      w-7
                      shrink-0
                      items-center
                      justify-center
                      text-white
                    "
                  >
                    <ArrowDown
                      size={18}
                      strokeWidth={1.2}
                    />
                  </div>
                </button>

                {/* ==================================================
                    ANSWER
                ================================================== */}

                <div
                  ref={(el) => {
                    answerRefs.current[index] = el;
                  }}
                  className="
                    h-0
                    overflow-hidden
                    bg-[#1d1d1d]
                    opacity-0
                  "
                >
                  <div
                    className="
                      px-6
                      py-7
                      md:px-7
                      md:py-8
                    "
                  >
                    <div
                      className="
                        max-w-[850px]
                        border-l
                        border-[#bd9a56]
                        pl-5
                        md:pl-6
                      "
                    >
                      <p
                        className="
                          font-stint
                          text-[12px]
                          leading-[2]
                          text-white/75
                          md:text-[13px]
                          lg:text-[14px]
                        "
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ==================================================
          BOTTOM CTA
      ================================================== */}

      <div
        className="
          mx-auto
          mt-14
          max-w-[1200px]
          border-b
          border-[#292929]/50
          pb-4
        "
      >
        <div className="flex items-center justify-between">
          <p
            className="
              font-stint
              text-[9px]
              uppercase
              tracking-[0.08em]
              text-[#292929]/50
            "
          >
            Still Have Questions?
          </p>

          <a
            href="/contact"
            className="
              font-stint
              text-[10px]
              uppercase
              tracking-[0.08em]
              text-[#bd9a56]
              transition-colors
              hover:text-[#292929]
            "
          >
            Talk To Us →
          </a>
        </div>
      </div>
    </section>
  );
}