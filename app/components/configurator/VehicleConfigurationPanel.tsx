"use client";

import { useState } from "react";

const sections = [
  { title: "Exterior", options: ["Color", "Wheels"] },
  { title: "Interior", options: ["Interior color", "Trim"] },
  { title: "Options", options: ["Packages", "Accessories"] },
] as const;

export type VehicleConfiguration = {
  exteriorColor: string;
  wheel: string;
  interior: string;
  options: string[];
};

type VehicleConfigurationPanelProps = {
  onChange?: (configuration: VehicleConfiguration) => void;
};

export default function VehicleConfigurationPanel({
  onChange,
}: VehicleConfigurationPanelProps) {
  const [openSection, setOpenSection] = useState("Exterior");
  const [configuration, setConfiguration] = useState<VehicleConfiguration>({
    exteriorColor: "Factory selection",
    wheel: "Standard specification",
    interior: "Obsidian",
    options: [],
  });

  const updateConfiguration = (next: Partial<VehicleConfiguration>) => {
    const updated = { ...configuration, ...next };
    setConfiguration(updated);
    onChange?.(updated);
  };

  return (
    <aside className="border-t border-white/10 lg:border-l lg:border-t-0 lg:pl-10">
      <div className="flex items-center justify-between border-b border-white/10 pb-5">
        <div>
          <p className="font-stint text-[8px] uppercase tracking-[0.2em] text-[#bd9852]">
            Make it yours
          </p>
          <h2 className="mt-3 font-stint text-3xl uppercase text-white">
            Configuration
          </h2>
        </div>
        <span className="font-stint text-[9px] text-white/35">01 / 03</span>
      </div>

      <div className="mt-2">
        {sections.map((section) => {
          const isOpen = openSection === section.title;
          return (
            <div key={section.title} className="border-b border-white/10">
              <button
                type="button"
                onClick={() => setOpenSection(isOpen ? "" : section.title)}
                className="flex w-full items-center justify-between py-5 text-left font-stint text-[11px] uppercase tracking-[0.12em] text-white/80"
                aria-expanded={isOpen}
              >
                {section.title}
                <span className="text-[#bd9852]">{isOpen ? "-" : "+"}</span>
              </button>

              {isOpen && (
                <div className="grid gap-3 pb-5">
                  {section.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        if (option === "Color") updateConfiguration({ exteriorColor: "Factory selection" });
                        if (option === "Wheels") updateConfiguration({ wheel: "Standard specification" });
                        if (option === "Interior color") updateConfiguration({ interior: "Obsidian" });
                      }}
                      className="flex items-center justify-between border border-white/10 px-4 py-4 text-left font-stint text-[9px] uppercase tracking-[0.08em] text-white/50 transition-colors hover:border-[#bd9852]/60 hover:text-white"
                    >
                      {option}
                      <span className="text-[8px] text-white/25">Coming soon</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
