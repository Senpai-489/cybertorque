"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


import VehicleCard from "@/app/components/carspage/VehicleCard";

gsap.registerPlugin(ScrollTrigger);

const vehicles = [
  {
    number: "01",
    image: "/cars/ram-2500.jpg",
    category: "Trucks",
    name: "RAM 2500",
    year: "2025",
    mileage: "New",
    fuel: "Diesel",
    slug: "/cars/ram-2500",
  },

  // {
  //   number: "02",
  //   image: "/cars/ram-3500.jpg",
  //   category: "Trucks",
  //   name: "RAM 3500",
  //   year: "2025",
  //   mileage: "New",
  //   fuel: "Diesel",
  //   slug: "/cars/ram-3500",
  // },

  {
    number: "03",
    image: "/cars/dodge-charger-petrol.jpg",
    category: "Sports Cars",
    name: "Dodge Charger",
    year: "2025",
    mileage: "New",
    fuel: "Petrol",
    variant: "2 Door",
    slug: "/cars/dodge-charger-petrol-2-door",
  },

  {
    number: "04",
    image: "/cars/dodge-charger-ev.jpg",
    category: "Electric",
    name: "Dodge Charger",
    year: "2025",
    mileage: "New",
    fuel: "EV",
    variant: "2 Door",
    slug: "/cars/dodge-charger-ev-2-door",
  },

  
  {
    number: "05",
    image: "/cars/dodge-durango.jpg",
    category: "SUVs",
    name: "Dodge Durango",
    year: "2025",
    mileage: "New",
    fuel: "Petrol",
    slug: "/cars/dodge-durango",
  },

  {
    number: "06",
    image: "/cars/chevrolet-silverado-2500hd.jpg",
    category: "Trucks",
    name: "Chevrolet Silverado 2500 HD",
    year: "2025",
    mileage: "New",
    fuel: "Diesel",
    slug: "/cars/chevrolet-silverado-2500-hd",
  },

  {
    number: "07",
    image: "/cars/chevrolet-corvette.jpg",
    category: "Sports Cars",
    name: "Chevrolet Corvette",
    year: "2025",
    mileage: "New",
    fuel: "Petrol",
    slug: "/cars/chevrolet-corvette",
  },

  {
    number: "08",
    image: "/cars/ford-mustang.jpg",
    category: "Sports Cars",
    name: "Ford Mustang",
    year: "2025",
    mileage: "New",
    fuel: "Petrol",
    slug: "/cars/ford-mustang",
  },

  {
    number: "09",
    image: "/cars/ford-mustang-mach-e.jpg",
    category: "Electric",
    name: "Ford Mustang Mach-E",
    year: "2025",
    mileage: "New",
    fuel: "EV",
    slug: "/cars/ford-mustang-mach-e",
  },

  {
    number: "10",
    image: "/cars/ford-bronco-raptor.jpg",
    category: "SUVs",
    name: "Ford Bronco Raptor",
    year: "2025",
    mileage: "New",
    fuel: "Petrol",
    slug: "/cars/ford-bronco-raptor",
  },

  {
    number: "11",
    image: "/cars/gmc-yukon-denali.jpg",
    category: "SUVs",
    name: "GMC Yukon Denali",
    year: "2025",
    mileage: "New",
    fuel: "Petrol",
    slug: "/cars/gmc-yukon-denali",
  },

  {
    number: "12",
    image: "/cars/gmc-hummer-ev.jpg",
    category: "Electric",
    name: "GMC Hummer EV",
    year: "2025",
    mileage: "New",
    fuel: "EV",
    variant: "SUV / Pickup",
    slug: "/cars/gmc-hummer-ev",
  },

  {
    number: "13",
    image: "/cars/cadillac-escalade.jpg",
    category: "Luxury Cars",
    name: "Cadillac Escalade",
    year: "2025",
    mileage: "New",
    fuel: "Petrol",
    slug: "/cars/cadillac-escalade",
  },

  {
    number: "14",
    image: "/cars/cadillac-lyriq.jpg",
    category: "Electric",
    name: "Cadillac Lyriq",
    year: "2025",
    mileage: "New",
    fuel: "EV",
    slug: "/cars/cadillac-lyriq",
  },

  {
    number: "15",
    image: "/cars/cadillac-vistiq.jpg",
    category: "Electric",
    name: "Cadillac Vistiq",
    year: "2025",
    mileage: "New",
    fuel: "EV",
    slug: "/cars/cadillac-vistiq",
  },

  {
    number: "16",
    image: "/cars/lincoln-navigator.jpg",
    category: "Luxury Cars",
    name: "Lincoln Navigator",
    year: "2025",
    mileage: "New",
    fuel: "Petrol",
    slug: "/cars/lincoln-navigator",
  },

  {
    number: "17",
    image: "/cars/tesla-cybertruck.jpg",
    category: "Electric",
    name: "Tesla Cybertruck",
    year: "2025",
    mileage: "New",
    fuel: "EV",
    
    slug: "/cars/tesla-cybertruck",
  },
];
const filters = [
  "All Vehicles",
  "Sports Cars",
  "SUVs",
  "Trucks",
  "Luxury Cars",
  "Electric",
];

export default function FleetPage() {
  const [activeFilter, setActiveFilter] =
    useState("All Vehicles");

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Latest");

  const gridRef = useRef<HTMLDivElement>(null);

  /*
  ==========================================================
  FILTER / SEARCH / SORT
  ==========================================================
  */

  const filteredVehicles = useMemo(() => {
    let result = [...vehicles];

    if (activeFilter !== "All Vehicles") {
      result = result.filter(
        (vehicle) =>
          vehicle.category === activeFilter
      );
    }

    if (search.trim()) {
      const query = search.toLowerCase().trim();

      result = result.filter((vehicle) =>
        `${vehicle.name} ${vehicle.category} ${vehicle.year} ${vehicle.fuel}`
          .toLowerCase()
          .includes(query)
      );
    }

    if (sort === "Latest") {
      result.sort(
        (a, b) =>
          Number(b.year) - Number(a.year)
      );
    }

    if (sort === "Oldest") {
      result.sort(
        (a, b) =>
          Number(a.year) - Number(b.year)
      );
    }

    if (sort === "Mileage") {
      result.sort(
        (a, b) =>
          parseInt(a.mileage.replace(/\D/g, "")) -
          parseInt(b.mileage.replace(/\D/g, ""))
      );
    }

    return result;
  }, [activeFilter, search, sort]);

  /*
  ==========================================================
  GSAP CARD REVEAL
  ==========================================================
  */

  useLayoutEffect(() => {
    const grid = gridRef.current;

    if (!grid) return;

    const ctx = gsap.context(() => {
      const cards =
        gsap.utils.toArray<HTMLElement>(
          ".vehicle-card"
        );

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: index * 0.04,
            ease: "power3.out",

            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions:
                "play none none reverse",
            },
          }
        );
      });
    }, grid);

    return () => ctx.revert();
  }, [filteredVehicles]);

  return (
    <main className="min-h-screen bg-[#e8e6e1] text-[#181818]">
     

      {/* ==================================================
          FLEET HEADER
      ================================================== */}

      <section
        className="
          px-5
          pb-8
          pt-[130px]
          sm:px-8
          md:px-10
          lg:px-14
        "
      >
        <div className="mx-auto max-w-[1500px]">
          {/* TOP META */}

          <div
            className="
              flex
              items-center
              justify-between
              border-t
              border-[#181818]
              py-3
            "
          >
            <span
              className="
                font-stint
                text-[9px]
                uppercase
                tracking-[0.08em]
                text-[#181818]
              "
            >
              Our Fleet
            </span>

            <span
              className="
                font-stint
                text-[9px]
                uppercase
                tracking-[0.08em]
                text-[#181818]
              "
            >
             Exceptional Vehicles
            </span>
          </div>

          {/* HEADER */}

          <div
            className="
              mt-10
              flex
              flex-col
              gap-7
              lg:flex-row
              lg:items-end
              lg:justify-between
            "
          >
            <div>
              <p
                className="
                  font-stint
                  text-[10px]
                  uppercase
                  tracking-[0.15em]
                  text-[#a98749]
                "
              >
                Take A Look At Your Ride
              </p>

              <h1
                className="
                  mt-3
                  font-stint
                  text-[52px]
                  uppercase
                  leading-[0.85]
                  tracking-[-0.04em]
                  text-[#181818]
                  sm:text-[68px]
                  md:text-[82px]
                  lg:text-[95px]
                "
              >
                Our
                <br />
                <span className="text-[#b28f4f]">
                  Collection
                </span>
              </h1>
            </div>

            <p
              className="
                max-w-[390px]
                font-stint
                text-[11px]
                leading-[1.9]
                text-[#181818]
                md:text-[12px]
              "
            >
              A carefully curated collection of
              performance, luxury and distinctive
              automobiles. Every vehicle selected
              for character, condition and
              individuality.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================
          FILTER BAR
      ================================================== */}

      <section
        className="
          sticky
          top-0
          z-50
          border-y
          border-[#181818]
          bg-[#e8e6e1]/95
          shadow-[0_5px_20px_rgba(0,0,0,0.05)]
          backdrop-blur-xl
        "
      >
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 md:px-10 lg:px-14">
          <div
            className="
              flex
              flex-col
              gap-4
              py-3
              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >
            {/* FILTERS */}

            <div
              className="
                flex
                w-full
                overflow-x-auto
                scrollbar-none
              "
            >
              {filters.map((filter) => {
                const active =
                  activeFilter === filter;

                return (
                  <button
                    key={filter}
                    onClick={() =>
                      setActiveFilter(filter)
                    }
                    className={`
                      relative
                      shrink-0
                      px-4
                      py-3
                      font-stint
                      text-[9px]
                      uppercase
                      tracking-[0.06em]
                      transition-all
                      duration-300
                      md:px-5

                      ${
                        active
                          ? "text-[#9a783e]"
                          : "text-[#181818] hover:text-[#181818]"
                      }
                    `}
                  >
                    {filter}

                    <span
                      className={`
                        absolute
                        bottom-0
                        left-4
                        right-4
                        h-[2px]
                        origin-left
                        bg-[#b28f4f]
                        transition-transform
                        duration-300
                        md:left-5
                        md:right-5

                        ${
                          active
                            ? "scale-x-100"
                            : "scale-x-0"
                        }
                      `}
                    />
                  </button>
                );
              })}
            </div>

            {/* SEARCH + SORT */}

            <div
              className="
                flex
                w-full
                gap-2
                lg:w-auto
                lg:shrink-0
              "
            >
              {/* SEARCH */}

              <div
                className="
                  flex
                  h-[42px]
                  flex-1
                  items-center
                  border
                  border-[#181818]
                  bg-[#f2f0eb]
                  px-3
                  transition-colors
                  focus-within:border-[#b28f4f]
                  lg:w-[260px]
                  lg:flex-none
                "
              >
                <Search
                  size={15}
                  strokeWidth={1.4}
                  className="shrink-0 text-[#181818]"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search vehicles"
                  className="
                    ml-3
                    min-w-0
                    w-full
                    bg-transparent
                    font-stint
                    text-[10px]
                    text-[#181818]
                    outline-none
                    placeholder:text-[#181818]
                  "
                />
              </div>

              {/* SORT */}

              <div
                className="
                  relative
                  flex
                  h-[42px]
                  items-center
                  border
                  border-[#181818]
                  bg-[#f2f0eb]
                "
              >
                <SlidersHorizontal
                  size={14}
                  strokeWidth={1.3}
                  className="
                    ml-3
                    text-[#181818]
                  "
                />

                <select
                  value={sort}
                  onChange={(e) =>
                    setSort(e.target.value)
                  }
                  className="
                    h-full
                    appearance-none
                    bg-transparent
                    px-3
                    pr-8
                    font-stint
                    text-[9px]
                    uppercase
                    text-[#181818]
                    outline-none
                  "
                >
                  <option value="Latest">
                    Latest
                  </option>

                  <option value="Oldest">
                    Oldest
                  </option>

                  <option value="Mileage">
                    Lowest Mileage
                  </option>
                </select>

                <ChevronDown
                  size={13}
                  strokeWidth={1.3}
                  className="
                    pointer-events-none
                    absolute
                    right-2
                    text-[#181818]
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          VEHICLE GRID
      ================================================== */}

      <section
        ref={gridRef}
        className="
          mx-auto
          max-w-[1500px]
          px-5
          py-8
          sm:px-8
          md:px-10
          md:py-10
          lg:px-14
          lg:py-12
        "
      >
        {/* RESULT HEADER */}

        <div
          className="
            mb-5
            flex
            items-center
            justify-between
            border-b
            border-[#181818]
            pb-3
          "
        >
          <p
            className="
              font-stint
              text-[9px]
              uppercase
              tracking-[0.08em]
              text-[#181818]
            "
          >
            Showing{" "}
            <span className="text-[#181818]">
              {filteredVehicles.length}
            </span>{" "}
            Vehicles
          </p>

          {search && (
            <button
              onClick={() => setSearch("")}
              className="
                font-stint
                text-[9px]
                uppercase
                text-[#9a783e]
                transition-colors
                hover:text-[#181818]
              "
            >
              Clear Search ×
            </button>
          )}
        </div>

        {/* GRID */}

        {filteredVehicles.length > 0 ? (
          <div
            className="
              grid
              grid-cols-1
              gap-4
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {filteredVehicles.map((vehicle) => (
              <div
                key={vehicle.number}
                className="vehicle-card"
              >
                <VehicleCard
                  number={vehicle.number}
                  image={vehicle.image}
                  category={vehicle.category}
                  name={vehicle.name}
                  year={vehicle.year}
                  mileage={vehicle.mileage}
                  fuel={vehicle.fuel}
                  slug={vehicle.slug}
                />
              </div>
            ))}
          </div>
        ) : (
          <div
            className="
              flex
              min-h-[350px]
              flex-col
              items-center
              justify-center
              border
              border-[#181818]
              bg-[#eeece7]
              text-center
            "
          >
            <p
              className="
                font-stint
                text-[30px]
                uppercase
                text-[#b28f4f]
              "
            >
              No Vehicles Found
            </p>

            <p
              className="
                mt-3
                font-stint
                text-[10px]
                text-[#181818]
              "
            >
              Try another search or category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setActiveFilter("All Vehicles");
              }}
              className="
                mt-6
                bg-[#b28f4f]
                px-7
                py-3
                font-stint
                text-[10px]
                uppercase
                text-[#181818]
                transition-colors
                hover:bg-[#c19d5c]
              "
            >
              View All Vehicles
            </button>
          </div>
        )}
      </section>

      {/* ==================================================
          BOTTOM
      ================================================== */}

      <section
        className="
          border-t
          border-[#181818]
          px-5
          py-14
          sm:px-8
          md:px-10
          lg:px-14
        "
      >
        <div className="mx-auto max-w-[1500px]">
          <p
            className="
              font-stint
              text-[9px]
              uppercase
              tracking-[0.12em]
              text-[#181818]
            "
          >
            Cyber Torque
          </p>

          <h2
            className="
              mt-4
              font-stint
              text-[38px]
              uppercase
              leading-[0.9]
              tracking-[-0.03em]
              text-[#181818]
              md:text-[55px]
              lg:text-[65px]
            "
          >
            Extraordinary{" "}
            <span className="text-[#b28f4f]">
              By Design.
            </span>
          </h2>
        </div>
      </section>
    </main>
  );
}