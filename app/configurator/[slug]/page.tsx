import { notFound } from "next/navigation";
import { vehicles } from "@/app/data/vehicles";
import Navbar from "@/app/components/homepage/Navbar";
import VehicleConfigurator from "@/app/components/configurator/VehicleConfigurator";
import Footer from "@/app/components/homepage/Footer";

interface ConfiguratorPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return vehicles.map((vehicle) => ({
    slug: vehicle.slug,
  }));
}

export default async function ConfiguratorPage({
  params,
}: ConfiguratorPageProps) {
  const { slug } = await params;
  const vehicle = vehicles.find((candidate) => candidate.slug === slug);

  if (!vehicle) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <VehicleConfigurator vehicle={vehicle} frames={vehicle.frames} />
      <Footer />
    </>
  );
}
