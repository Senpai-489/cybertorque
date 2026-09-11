"use client";

import Link from "next/link";
import { useState } from "react";
import Interior360 from "./Interior360";
import Vehicle360Viewer from "./Vehicle360Viewer";
import VehicleConfigurationPanel, {
  type VehicleConfiguration,
} from "./VehicleConfigurationPanel";

type ConfiguratorVehicle = {
  slug: string;
  brand: string;
  name: string;
  category: string;
  image: string;
  horsepower: string;
  acceleration: string;
  engine: string;
  price: string;
};

type VehicleConfiguratorProps = {
  vehicle: ConfiguratorVehicle;
  frames: string[];
};

export default function VehicleConfigurator({
  vehicle,
  frames,
}: VehicleConfiguratorProps) {
  const [configuration, setConfiguration] = useState<VehicleConfiguration>();

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">
      <section className="mx-auto max-w-375 px-6 pb-24 pt-32 md:px-10 lg:px-16">
        <div className="mb-12 flex flex-col justify-between gap-8 border-b border-white/10 pb-8 md:flex-row md:items-end">
          <div>
            <p className="font-stint text-[8px] uppercase tracking-[0.28em] text-[#bd9852]">
              Configure your vehicle
            </p>
            <h1 className="mt-5 max-w-4xl font-stint text-5xl uppercase leading-[0.9] tracking-[-0.035em] md:text-8xl">
              {vehicle.brand} <span className="text-[#bd9852]">{vehicle.name}</span>
            </h1>
          </div>
          <Link
            href={`/cars/${vehicle.slug}`}
            className="w-fit border-b border-white/25 pb-2 font-stint text-[8px] uppercase tracking-[0.16em] text-white/55 transition-colors hover:border-[#bd9852] hover:text-[#bd9852]"
          >
            Back to vehicle
          </Link>
        </div>

        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)] lg:gap-20">
          <div>
            <Vehicle360Viewer
              frames={frames}
              fallbackImage={vehicle.image}
              vehicleName={`${vehicle.brand} ${vehicle.name}`}
            />

           
              <div className="mt-12">
              <Interior360
                image="/interior-360.jpg"
                className="aspect-[1.333333] z-50 border border-white/10"
              />
          </div>

            <div className="mt-12 grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-4">
              {[
                ["Power", vehicle.horsepower],
                ["0-100 km/h", vehicle.acceleration],
                ["Powertrain", vehicle.engine],
                ["Starting from", vehicle.price],
              ].map(([label, value]) => (
                <div key={label} className="bg-[#111111] px-4 py-5">
                  <p className="font-stint text-[7px] uppercase tracking-[0.12em] text-white/35">
                    {label}
                  </p>
                  <p className="mt-2 font-stint text-[11px] text-white/85">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <VehicleConfigurationPanel onChange={setConfiguration} />
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <p className="font-stint text-[9px] uppercase tracking-[0.12em] text-white/35">
            Configuration ready for future URL state
            {configuration ? " / saved locally" : ""}
          </p>
          <a
            href={`mailto:hello@cybertorque.com?subject=Enquiry about ${vehicle.brand} ${vehicle.name}`}
            className="bg-[#bd9852] px-7 py-4 font-stint text-[9px] uppercase tracking-[0.14em] text-black transition-colors hover:bg-[#d0ae68]"
          >
            Enquire now
          </a>
        </div>
      </section>
    </main>
  );
}