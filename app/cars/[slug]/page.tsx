import { notFound } from "next/navigation";
import VehicleHero from "@/app/components/carspage/vehicles/VehicleHero";
import { vehicles } from "@/app/data/vehicles";
import TechnicalSpecs from "@/app/components/carspage/vehicles/TechnicalSpecs";
import VehicleVariants from "@/app/components/carspage/vehicles/Variants";
import MoreLikeThis from "@/app/components/carspage/vehicles/MoreLikeThis";
import Footer from "@/app/components/homepage/Footer";
import Navbar from "@/app/components/homepage/Navbar";
import { vehicleDetails } from "@/app/data/vehicles";

interface VehiclePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return vehicles.map((vehicle) => ({
    slug: vehicle.slug,
  }));
}

export default async function VehiclePage({
  params,
}: VehiclePageProps) {
  const { slug } = await params;

  const vehicle = vehicles.find(
    (vehicle) => vehicle.slug === slug
  );

  if (!vehicle) {
    notFound();
  }

  const details = vehicleDetails[vehicle.slug];
  const relatedVehicles = vehicles
    .filter(
      (candidate) =>
        candidate.slug !== vehicle.slug &&
        candidate.category === vehicle.category
    )
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-[#111111]">
      <Navbar />
      <VehicleHero
        brand={vehicle.brand}
        model={vehicle.name}
        vehicleImage={vehicle.image}
        backgroundImage={details.backgroundImage}
        maxSpeed="320"
        logo={details.logo}
        acceleration={vehicle.acceleration}
        horsepower={vehicle.horsepower}
        customizeHref={`/configurator/${vehicle.slug}`}
      />

     <TechnicalSpecs
       categories={details.categories}
       dimensions={details.dimensions}
       vehicleOutline={details.vehicleOutline}
      buildHref={`/configurator/${vehicle.slug}`}
     />
     <VehicleVariants variants={details.variants} />
     <MoreLikeThis vehicles={relatedVehicles} />
     
   <Footer />
    </main>
  );
}