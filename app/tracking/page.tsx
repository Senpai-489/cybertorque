import Navbar from "@/app/components/homepage/Navbar";
import Footer from "@/app/components/homepage/Footer";
import TrackingLookup from "@/app/tracking/TrackingLookup";

export const dynamic = "force-dynamic";

export default function TrackingPage() {
  return (
    <main className="min-h-screen bg-[#e8e6e1] text-[#181818]">
      <Navbar />
      <section className="mx-auto max-w-3xl px-5 pb-24 pt-40 sm:px-8">
        <p className="font-stint text-[10px] uppercase tracking-[0.18em] text-[#a98749]">Vehicle care</p>
        <h1 className="mt-4 font-stint text-5xl uppercase leading-none sm:text-7xl">Track your vehicle</h1>
        <p className="mt-6 max-w-xl font-sans text-sm leading-7 text-[#181818]/65">
          Enter your tracking ID to see the latest movement and delivery details for your vehicle.
        </p>
        <TrackingLookup />
      </section>
      <Footer />
    </main>
  );
}
