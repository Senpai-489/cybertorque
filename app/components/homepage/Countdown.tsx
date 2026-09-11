"use client";

import { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const getNextOctober20 = () => {
  const now = new Date();

  const target = new Date(
    now.getFullYear(),
    9,
    20,
    0,
    0,
    0
  );

  if (target.getTime() <= now.getTime()) {
    target.setFullYear(now.getFullYear() + 1);
  }

  return target;
};

const getTimeLeft = (target: Date): TimeLeft => {
  const distance = Math.max(
    0,
    target.getTime() - Date.now()
  );

  return {
    days: Math.floor(
      distance / (1000 * 60 * 60 * 24)
    ),

    hours: Math.floor(
      (distance / (1000 * 60 * 60)) % 24
    ),

    minutes: Math.floor(
      (distance / (1000 * 60)) % 60
    ),

    seconds: Math.floor(
      (distance / 1000) % 60
    ),
  };
};

const pad = (value: number) =>
  String(value).padStart(2, "0");

export default function Countdown() {
  const [target] = useState(getNextOctober20);
  const [timeLeft, setTimeLeft] =
    useState<TimeLeft | null>(null);

  /*
  =========================================================
  LOCK PAGE SCROLL
  =========================================================
  */

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    // Save existing values
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;

    // Lock scrolling
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    // Prevent wheel scrolling
    const preventScroll = (e: WheelEvent) => {
      e.preventDefault();
    };

    // Prevent touch scrolling
    const preventTouch = (e: TouchEvent) => {
      e.preventDefault();
    };

    window.addEventListener(
      "wheel",
      preventScroll,
      { passive: false }
    );

    window.addEventListener(
      "touchmove",
      preventTouch,
      { passive: false }
    );

    return () => {
      html.style.overflow =
        previousHtmlOverflow;

      body.style.overflow =
        previousBodyOverflow;

      window.removeEventListener(
        "wheel",
        preventScroll
      );

      window.removeEventListener(
        "touchmove",
        preventTouch
      );
    };
  }, []);

  /*
  =========================================================
  COUNTDOWN
  =========================================================
  */

  useEffect(() => {
    const update = () => {
      setTimeLeft(getTimeLeft(target));
    };

    update();

    const timer = window.setInterval(
      update,
      1000
    );

    return () => {
      window.clearInterval(timer);
    };
  }, [target]);

  const values = [
    [timeLeft?.days ?? 0, "Days"],
    [timeLeft?.hours ?? 0, "Hours"],
    [timeLeft?.minutes ?? 0, "Minutes"],
    [timeLeft?.seconds ?? 0, "Seconds"],
  ] as const;

  return (
    <section
      className="
        fixed
        inset-0
        z-[99999]
        isolate
        h-[100dvh]
        w-screen
        overflow-hidden
        bg-[#101010]
        text-white
      "
    >
      {/* =================================================
          BACKGROUND VIDEO
      ================================================= */}

      <video
        className="
          absolute
          inset-0
          -z-20
          h-full
          w-full
          object-cover
        "
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source
          src="/cyber-torque-coming-soon.mp4"
          type="video/mp4"
        />
      </video>

      {/* =================================================
          DARK OVERLAY
      ================================================= */}

      {/* <div
        className="
          absolute
          inset-0
          -z-10
          bg-black/60
        "
      /> */}

      {/* LEFT DARK GRADIENT */}

      <div
        className="
          absolute
          inset-0
          -z-10
          bg-[linear-gradient(90deg,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.68)_45%,rgba(0,0,0,0.35)_100%)]
        "
      />

      {/* RED CINEMATIC GLOW */}

      {/* <div
        className="
          absolute
          inset-0
          -z-10
          bg-[radial-gradient(circle_at_78%_45%,rgba(211,37,37,0.18),transparent_35%)]
        "
      /> */}

      {/* =================================================
          DECORATIVE FRAME
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          left-4
          top-4
          h-20
          w-20
          border-l
          border-t
          border-[#bd9852]/50
          sm:left-7
          sm:top-7
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          right-4
          top-4
          h-20
          w-20
          border-r
          border-t
          border-[#bd9852]/50
          sm:right-7
          sm:top-7
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-4
          left-4
          h-20
          w-20
          border-b
          border-l
          border-[#bd9852]/50
          sm:bottom-7
          sm:left-7
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-4
          right-4
          h-20
          w-20
          border-b
          border-r
          border-[#bd9852]/50
          sm:bottom-7
          sm:right-7
        "
      />

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div
        className="
          relative
          z-10
          flex
          h-full
          w-full
          flex-col
          justify-between
          px-6
          py-8

          sm:px-10
          sm:py-10

          lg:px-16
          lg:py-14
        "
      >
        {/* =================================================
            TOP BAR
        ================================================= */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-white/15
            pb-4
          "
        >
          <span
            className="
              font-stint
              text-[8px]
              uppercase
              tracking-[0.35em]
              text-white/55

              sm:text-[10px]
            "
          >
            Cyber Torque
          </span>

          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#bd9852]" />

            <span
              className="
                font-stint
                text-[8px]
                uppercase
                tracking-[0.35em]
                text-white/55

                sm:text-[10px]
              "
            >
              October 20
            </span>

            <span className="h-px w-8 bg-[#bd9852]" />
          </div>
        </div>

        {/* =================================================
            CENTER CONTENT
        ================================================= */}

        <div
          className="
            mx-auto
            flex
            w-full
            max-w-[1500px]
            flex-1
            flex-col
            justify-center
          "
        >
          <div className="max-w-5xl">
            {/* EYEBROW */}

            <div
              className="
                mb-5
                flex
                items-center
                gap-4
              "
            >
              <span className="h-px w-10 bg-[#bd9852]" />

              <p
                className="
                  font-stint
                  text-[8px]
                  uppercase
                  tracking-[0.45em]
                  text-[#bd9852]

                  sm:text-[10px]
                "
              >
                Something Big Is Coming
              </p>
            </div>

            {/* TITLE */}

            <h1
              className="
                font-stint
                text-[clamp(4.5rem,13vw,12rem)]
                uppercase
                leading-[0.75]
                tracking-[-0.055em]
                text-white
              "
            >
              CYBER
              <br />
              <span className="text-[#bd9852]">
                TORQUE
              </span>
            </h1>

            {/* DESCRIPTION */}

            <p
              className="
                mt-8
                max-w-[470px]
                font-stint
                text-[10px]
                leading-[1.8]
                tracking-[0.08em]
                text-white/50

                sm:text-[12px]
              "
            >
              Coming Soon. The next chapter of
              extraordinary motoring arrives on
              October 20.
            </p>
          </div>
        </div>

        {/* =================================================
            COUNTDOWN
        ================================================= */}

        <div
          className="
            w-full
            max-w-[1000px]
            border-t
            border-white/20
            pt-5
          "
        >
          <div
            className="
              grid
              grid-cols-2

              sm:grid-cols-4
            "
          >
            {values.map(([value, label], index) => (
              <div
                key={label}
                className={`
                  px-4
                  py-2

                  sm:px-6
                  ${
                    index !== 0
                      ? "border-l border-white/10"
                      : ""
                  }
                `}
              >
                <p
                  className="
                    font-stint
                    text-[38px]
                    leading-none
                    tracking-[-0.04em]

                    sm:text-[48px]

                    md:text-[58px]
                  "
                >
                  {pad(value)}
                </p>

                <p
                  className="
                    mt-2
                    font-stint
                    text-[7px]
                    uppercase
                    tracking-[0.3em]
                    text-white/40

                    sm:text-[9px]
                  "
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =================================================
          CENTER WATERMARK
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-[25%]
          right-[5%]
          hidden
          select-none
          lg:block
        "
      >
        <span
          className="
            font-stint
            text-[180px]
            uppercase
            leading-none
            tracking-[-0.07em]
            text-white/[0.025]

            xl:text-[250px]
          "
        >
          CT
        </span>
      </div>
    </section>
  );
}