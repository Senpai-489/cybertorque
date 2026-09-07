import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/app/components/homepage/Footer";
import Navbar from "@/app/components/homepage/Navbar";
import { vehicleDetails, vehicles } from "@/app/data/vehicles";

type ComparePageProps = {
  searchParams: Promise<{
    vehicles?: string;
  }>;
};

export default async function ComparePage({
  searchParams,
}: ComparePageProps) {
  const { vehicles: vehicleQuery } = await searchParams;

  const selectedSlugs = (vehicleQuery ?? "")
    .split(",")
    .map((slug) => slug.trim())
    .filter(Boolean)
    .slice(0, 3);

  const selectedVehicles = selectedSlugs
    .map((slug) => vehicles.find((vehicle) => vehicle.slug === slug))
    .filter(
      (vehicle): vehicle is (typeof vehicles)[number] =>
        Boolean(vehicle)
    );

  if (selectedVehicles.length < 2) {
    notFound();
  }

  const selectedDetails = selectedVehicles.map((vehicle) => ({
    vehicle,
    details: vehicleDetails[vehicle.slug],
  }));

  /*
   * Build one unified list of categories.
   *
   * Example:
   * Power unit
   * Performance
   * Body
   * Capacities
   * Consumption / Emissions
   * Sound level
   */
  const categories = Array.from(
    new Set(
      selectedDetails.flatMap(({ details }) =>
        details.categories.map((category) => category.title)
      )
    )
  );

  return (
    <main className="min-h-screen bg-[#111111] text-white">
      <Navbar />

      {/* ============================================================
          HEADER
      ============================================================ */}

      <header className="mx-auto max-w-[1400px] px-6 pb-16 pt-40 md:px-10 lg:px-16">
        <Link
          href="/cars"
          className="
            font-stint
            text-[8px]
            uppercase
            tracking-[0.18em]
            text-white/45
            transition-colors
            hover:text-[#bd9852]
          "
        >
          Back to fleet
        </Link>

        <p
          className="
            mt-12
            font-stint
            text-[8px]
            uppercase
            tracking-[0.25em]
            text-[#bd9852]
          "
        >
          Side by side
        </p>

        <h1
          className="
            mt-5
            font-stint
            text-5xl
            uppercase
            leading-[0.9]
            tracking-[-0.035em]
            md:text-8xl
          "
        >
          Compare{" "}
          <span className="text-[#bd9852]">vehicles.</span>
        </h1>

        <p
          className="
            mt-7
            max-w-xl
            font-stint
            text-[11px]
            leading-[1.9]
            text-white/50
          "
        >
          Compare performance, engineering, dimensions and
          specifications side by side.
        </p>
      </header>

      {/* ============================================================
          COMPARISON
      ============================================================ */}

      <section className="mx-auto max-w-[1400px] px-6 pb-32 md:px-10 lg:px-16">
        {/* 
          Mobile:
          horizontal scrolling comparison table

          Desktop:
          full width side-by-side table
        */}
        <div className="overflow-x-auto">
          <div
            className="
              min-w-[760px]
              overflow-hidden
              border
              border-white/10
              bg-[#111111]
            "
          >
            {/* ======================================================
                VEHICLE HEADER
            ====================================================== */}

            <div
              className="grid"
              style={{
                gridTemplateColumns: `190px repeat(${selectedVehicles.length}, minmax(0, 1fr))`,
              }}
            >
              {/* Label column */}
              <div className="bg-[#151515]" />

              {selectedDetails.map(({ vehicle }) => (
                <div
                  key={vehicle.slug}
                  className="
                    border-l
                    border-white/10
                    bg-[#151515]
                  "
                >
                  {/* Vehicle Image */}
                  <div className="relative aspect-[1.45/1] overflow-hidden bg-[#191919]">
                    <Image
                      src={vehicle.image}
                      alt={`${vehicle.brand} ${vehicle.name}`}
                      fill
                      sizes="(max-width: 768px) 350px, 500px"
                      className="object-contain p-6 md:p-10"
                    />

                    {/* subtle bottom fade */}
                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-x-0
                        bottom-0
                        h-1/3
                        bg-gradient-to-t
                        from-[#191919]
                        to-transparent
                      "
                    />
                  </div>

                  {/* Vehicle Information */}
                  <div className="border-t border-white/10 p-5 md:p-7">
                    <p
                      className="
                        font-stint
                        text-[8px]
                        uppercase
                        tracking-[0.2em]
                        text-[#bd9852]
                      "
                    >
                      {vehicle.brand} / {vehicle.category}
                    </p>

                    <h2
                      className="
                        mt-2
                        font-stint
                        text-2xl
                        uppercase
                        leading-none
                        tracking-[-0.02em]
                        md:text-4xl
                      "
                    >
                      {vehicle.name}
                    </h2>

                    {vehicle.variant && (
                      <p
                        className="
                          mt-2
                          font-stint
                          text-[8px]
                          uppercase
                          tracking-[0.12em]
                          text-white/35
                        "
                      >
                        {vehicle.variant}
                      </p>
                    )}

                    <Link
                      href={`/configurator/${vehicle.slug}`}
                      className="
                        group
                        mt-6
                        inline-flex
                        items-center
                        gap-4
                        border
                        border-white/15
                        px-4
                        py-3
                        font-stint
                        text-[8px]
                        uppercase
                        tracking-[0.14em]
                        text-white/65
                        transition-all
                        duration-300
                        hover:border-[#bd9852]
                        hover:text-[#bd9852]
                      "
                    >
                      Build your own

                      <span
                        className="
                          text-[#bd9852]
                          transition-transform
                          duration-300
                          group-hover:-translate-y-0.5
                          group-hover:translate-x-0.5
                        "
                      >
                        ↗
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* ======================================================
                TECHNICAL SPECIFICATIONS
            ====================================================== */}

            {categories.map((categoryTitle) => {
              /*
               * Get the corresponding category for every vehicle.
               */
              const vehicleCategories = selectedDetails.map(
                ({ details }) =>
                  details.categories.find(
                    (category) => category.title === categoryTitle
                  )
              );

              /*
               * Merge all labels from all selected vehicles.
               *
               * This means if one car has:
               * Engine
               * Power
               * Torque
               *
               * and another has:
               * Engine
               * Power
               * Transmission
               *
               * the table will contain all four rows.
               */
              const labels = Array.from(
                new Set(
                  vehicleCategories.flatMap(
                    (category) =>
                      category?.items.map((item) => item.label) ?? []
                  )
                )
              );

              return (
                <div key={categoryTitle}>
                  {/* CATEGORY HEADER */}

                  <div
                    className="
                      grid
                      border-t
                      border-white/15
                      bg-[#151515]
                    "
                    style={{
                      gridTemplateColumns: `190px repeat(${selectedVehicles.length}, minmax(0, 1fr))`,
                    }}
                  >
                    <div
                      className="
                        flex
                        items-center
                        border-r
                        border-white/10
                        px-5
                        py-5
                        md:px-6
                      "
                    >
                      <span
                        className="
                          font-stint
                          text-[8px]
                          uppercase
                          tracking-[0.2em]
                          text-[#bd9852]
                        "
                      >
                        Technical Data
                      </span>
                    </div>

                    <div
                      className="flex items-center px-5 py-5 md:px-7"
                      style={{
                        gridColumn: `2 / span ${selectedVehicles.length}`,
                      }}
                    >
                      <h3
                        className="
                          font-stint
                          text-xl
                          uppercase
                          tracking-[-0.01em]
                          md:text-2xl
                        "
                      >
                        {categoryTitle}
                      </h3>
                    </div>
                  </div>

                  {/* SPEC ROWS */}

                  {labels.map((label, index) => (
                    <div
                      key={`${categoryTitle}-${label}`}
                      className={`
                        grid
                        ${
                          index % 2 === 0
                            ? "bg-[#111111]"
                            : "bg-[#141414]"
                        }
                      `}
                      style={{
                        gridTemplateColumns: `190px repeat(${selectedVehicles.length}, minmax(0, 1fr))`,
                      }}
                    >
                      {/* Label */}

                      <div
                        className="
                          flex
                          min-h-[58px]
                          items-center
                          border-r
                          border-t
                          border-white/[0.07]
                          px-5
                          md:min-h-[64px]
                          md:px-6
                        "
                      >
                        <span
                          className="
                            font-stint
                            text-[9px]
                            uppercase
                            tracking-[0.04em]
                            text-white/35
                          "
                        >
                          {label}
                        </span>
                      </div>

                      {/* Values */}

                      {vehicleCategories.map((category, vehicleIndex) => {
                        const item = category?.items.find(
                          (item) => item.label === label
                        );

                        return (
                          <div
                            key={`${selectedVehicles[vehicleIndex].slug}-${label}`}
                            className="
                              flex
                              min-h-[58px]
                              items-center
                              border-t
                              border-l
                              border-white/[0.07]
                              px-5
                              md:min-h-[64px]
                              md:px-7
                            "
                          >
                            <span
                              className="
                                font-stint
                                text-[10px]
                                uppercase
                                leading-relaxed
                                text-white/80
                                md:text-[11px]
                              "
                            >
                              {item?.value ?? "—"}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              );
            })}

            {/* ======================================================
                DIMENSIONS
            ====================================================== */}

            <div>
              {/* Dimension Header */}

              <div
                className="
                  grid
                  border-t
                  border-white/15
                  bg-[#151515]
                "
                style={{
                  gridTemplateColumns: `190px repeat(${selectedVehicles.length}, minmax(0, 1fr))`,
                }}
              >
                <div
                  className="
                    flex
                    items-center
                    border-r
                    border-white/10
                    px-5
                    py-5
                    md:px-6
                  "
                >
                  <span
                    className="
                      font-stint
                      text-[8px]
                      uppercase
                      tracking-[0.2em]
                      text-[#bd9852]
                    "
                  >
                    Engineering
                  </span>
                </div>

                <div
                  className="flex items-center px-5 py-5 md:px-7"
                  style={{
                    gridColumn: `2 / span ${selectedVehicles.length}`,
                  }}
                >
                  <h3
                    className="
                      font-stint
                      text-xl
                      uppercase
                      md:text-2xl
                    "
                  >
                    Dimensions
                  </h3>
                </div>
              </div>

              {/* Width */}

              <DimensionComparisonRow
                label="Width"
                values={selectedDetails.map(
                  ({ details }) => details.dimensions.width
                )}
                selectedVehicles={selectedVehicles}
              />

              {/* Height */}

              <DimensionComparisonRow
                label="Height"
                values={selectedDetails.map(
                  ({ details }) => details.dimensions.height
                )}
                selectedVehicles={selectedVehicles}
                alternate
              />

              {/* Wheelbase */}

              <DimensionComparisonRow
                label="Wheelbase"
                values={selectedDetails.map(
                  ({ details }) => details.dimensions.wheelbase
                )}
                selectedVehicles={selectedVehicles}
              />

              {/* Length */}

              <DimensionComparisonRow
                label="Length"
                values={selectedDetails.map(
                  ({ details }) => details.dimensions.length
                )}
                selectedVehicles={selectedVehicles}
                alternate
              />
            </div>

            {/* ======================================================
                FOOTER ACTIONS
            ====================================================== */}

            <div
              className="
                grid
                border-t
                border-white/15
                bg-[#151515]
              "
              style={{
                gridTemplateColumns: `190px repeat(${selectedVehicles.length}, minmax(0, 1fr))`,
              }}
            >
              <div className="border-r border-white/10" />

              {selectedVehicles.map((vehicle) => (
                <div
                  key={vehicle.slug}
                  className="
                    border-l
                    border-white/10
                    p-5
                    md:p-7
                  "
                >
                  <Link
                    href={`/configurator/${vehicle.slug}`}
                    className="
                      group
                      flex
                      h-[46px]
                      items-center
                      justify-center
                      gap-4
                      bg-[#bd9852]
                      px-5
                      font-stint
                      text-[9px]
                      uppercase
                      tracking-[0.1em]
                      text-black
                      transition-colors
                      duration-300
                      hover:bg-[#d0ae68]
                    "
                  >
                    Configure

                    <span
                      className="
                        transition-transform
                        duration-300
                        group-hover:-translate-y-1
                        group-hover:translate-x-1
                      "
                    >
                      ↗
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom line */}

        <div className="mt-16 h-px bg-[#bd9852]/30" />
      </section>

      <Footer />
    </main>
  );
}

/* ================================================================
   DIMENSION ROW
================================================================ */

function DimensionComparisonRow({
  label,
  values,
  selectedVehicles,
  alternate = false,
}: {
  label: string;
  values: string[];
  selectedVehicles: { slug: string }[];
  alternate?: boolean;
}) {
  return (
    <div
      className={`
        grid
        ${alternate ? "bg-[#141414]" : "bg-[#111111]"}
      `}
      style={{
        gridTemplateColumns: `190px repeat(${selectedVehicles.length}, minmax(0, 1fr))`,
      }}
    >
      {/* Label */}

      <div
        className="
          flex
          min-h-[58px]
          items-center
          border-r
          border-t
          border-white/[0.07]
          px-5
          md:min-h-[64px]
          md:px-6
        "
      >
        <span
          className="
            font-stint
            text-[9px]
            uppercase
            tracking-[0.04em]
            text-white/35
          "
        >
          {label}
        </span>
      </div>

      {/* Values */}

      {values.map((value, index) => (
        <div
          key={`${selectedVehicles[index].slug}-${label}`}
          className="
            flex
            min-h-[58px]
            items-center
            border-t
            border-l
            border-white/[0.07]
            px-5
            md:min-h-[64px]
            md:px-7
          "
        >
          <span
            className="
              font-stint
              text-[10px]
              uppercase
              text-white/80
              md:text-[11px]
            "
          >
            {value || "—"}
          </span>
        </div>
      ))}
    </div>
  );
}