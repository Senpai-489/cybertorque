"use client";

import { FormEvent, useState } from "react";

interface TrackingResult {
  tracking_id: string;
  status: string;
  location: string;
  estimated_delivery: string | null;
  notes: string;
  updated_at: string;
  vehicles: {
    name: string;
    brand_id: number;
    brands: { name: string } | null;
    model: string;
    image: string;
  } | null;
}

const STAGES = [
  { key: "Order received",       label: "Order\nReceived" },
  { key: "Preparing vehicle",    label: "Preparing\nVehicle" },
  { key: "In transit",           label: "In\nTransit" },
  { key: "Ready for collection", label: "Ready for\nCollection" },
  { key: "Completed",            label: "Completed" },
] as const;

function getStageIndex(status: string): number {
  return STAGES.findIndex((s) => s.key === status);
}

function formatDate(value: string | null): string {
  if (!value) return "To be confirmed";
  const d = new Date(value);
  return isNaN(d.getTime())
    ? value
    : d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default function TrackingLookup() {
  const [trackingId, setTrackingId] = useState("");
  const [tracking, setTracking] = useState<TrackingResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setTracking(null);
    try {
      const response = await fetch(`/api/tracking?trackingId=${encodeURIComponent(trackingId)}`);
      const data = (await response.json()) as { error?: string; tracking?: TrackingResult };
      if (!response.ok || !data.tracking) {
        setError(data.error ?? "Tracking ID not found");
        return;
      }
      setTracking(data.tracking);
    } catch {
      setError("Unable to reach the tracking service");
    } finally {
      setLoading(false);
    }
  };

  const activeIndex = tracking ? getStageIndex(tracking.status) : -1;
  const vehicleName = tracking?.vehicles
    ? `${tracking.vehicles.brands?.name ?? ""} ${tracking.vehicles.name}`.trim()
    : "Vehicle";

  return (
    <div className="mt-12">
      {/* ── Search form ── */}
      <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
        <input
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          placeholder="Tracking ID"
          aria-label="Tracking ID"
          className="min-h-14 flex-1 border border-[#181818] bg-[#f2f0eb] px-4 font-sans text-sm uppercase outline-none focus:border-[#a98749]"
          required
        />
        <button
          disabled={loading}
          className="min-h-14 bg-[#181818] px-7 font-stint text-[10px] uppercase tracking-[0.12em] text-white disabled:opacity-50"
        >
          {loading ? "Searching…" : "Track vehicle"}
        </button>
      </form>

      {error && <p className="mt-5 font-sans text-sm text-red-700">{error}</p>}

      {tracking && (
        <section className="mt-10 border border-[#181818] bg-[#f2f0eb]">

          {/* ── Vehicle header ── */}
          <div className="border-b border-[#181818]/15 px-6 py-5 sm:px-8">
            <p className="font-stint text-[9px] uppercase tracking-[0.18em] text-[#a98749]">
              {tracking.tracking_id}
            </p>
            <h2 className="mt-1 font-stint text-2xl uppercase leading-none sm:text-3xl">
              {vehicleName}
            </h2>
          </div>

          {/* ── Progress stepper ── */}
          <div className="px-6 py-8 sm:px-10">
            {/* connector rail + dots row */}
            <div className="relative flex items-start justify-between">

              {/* background rail */}
              <div className="absolute left-0 right-0 top-[13px] h-px bg-[#181818]/15" />

              {/* filled rail up to active step */}
              <div
                className="absolute top-[13px] h-px bg-[#a98749] transition-all duration-700"
                style={{
                  left: 0,
                  width:
                    activeIndex <= 0
                      ? "0%"
                      : activeIndex >= STAGES.length - 1
                      ? "100%"
                      : `${(activeIndex / (STAGES.length - 1)) * 100}%`,
                }}
              />

              {STAGES.map((stage, index) => {
                const isCompleted = index < activeIndex;
                const isActive    = index === activeIndex;

                return (
                  <div
                    key={stage.key}
                    className="relative z-10 flex flex-col items-center"
                    style={{ width: `${100 / STAGES.length}%` }}
                  >
                    {/* dot */}
                    <div
                      className={[
                        "flex h-[26px] w-[26px] items-center justify-center border transition-colors duration-300",
                        isCompleted
                          ? "border-[#a98749] bg-[#a98749]"
                          : isActive
                          ? "border-[#a98749] bg-[#f2f0eb]"
                          : "border-[#181818]/20 bg-[#f2f0eb]",
                      ].join(" ")}
                    >
                      {isCompleted ? (
                        /* checkmark */
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="square" />
                        </svg>
                      ) : isActive ? (
                        /* gold filled inner square */
                        <span className="block h-2.5 w-2.5 bg-[#a98749]" />
                      ) : null}
                    </div>

                    {/* label */}
                    <p
                      className={[
                        "mt-3 text-center font-stint text-[9px] uppercase leading-[1.5] tracking-[0.1em]",
                        isCompleted || isActive ? "text-[#181818]" : "text-[#181818]/30",
                      ].join(" ")}
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {stage.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Details grid ── */}
          <dl className="grid gap-0 border-t border-[#181818]/15 font-sans text-sm sm:grid-cols-2">
            <div className="border-b border-[#181818]/15 px-6 py-4 sm:border-b-0 sm:border-r sm:px-8">
              <dt className="text-[10px] uppercase tracking-[0.1em] text-[#181818]/45">
                Current location
              </dt>
              <dd className="mt-1 font-medium">{tracking.location || "—"}</dd>
            </div>
            <div className="border-b border-[#181818]/15 px-6 py-4 sm:border-b-0 sm:px-8">
              <dt className="text-[10px] uppercase tracking-[0.1em] text-[#181818]/45">
                Estimated delivery
              </dt>
              <dd className="mt-1 font-medium">{formatDate(tracking.estimated_delivery)}</dd>
            </div>
            {tracking.notes && (
              <div className="border-t border-[#181818]/15 px-6 py-4 sm:col-span-2 sm:px-8">
                <dt className="text-[10px] uppercase tracking-[0.1em] text-[#181818]/45">
                  Note from us
                </dt>
                <dd className="mt-1 leading-6">{tracking.notes}</dd>
              </div>
            )}
            <div className="border-t border-[#181818]/15 px-6 py-3 sm:col-span-2 sm:px-8">
              <p className="font-stint text-[9px] uppercase tracking-[0.12em] text-[#181818]/30">
                Last updated · {new Date(tracking.updated_at).toLocaleString("en-IN", {
                  day: "numeric", month: "short", year: "numeric",
                  hour: "2-digit", minute: "2-digit",
                })}
              </p>
            </div>
          </dl>
        </section>
      )}
    </div>
  );
}

