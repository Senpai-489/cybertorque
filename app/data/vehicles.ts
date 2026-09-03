export interface VehicleSpecCategory {
  title: string;
  items: { label: string; value: string }[];
}

export interface VehicleDimensions {
  width: string;
  height: string;
  wheelbase: string;
  length: string;
}

export interface VehicleVariant {
  name: string;
  subtitle: string;
  image: string;
  price: string;
  specs: string;
  slug: string;
}

export interface Vehicle {
  id: number;
  slug: string;
  brand: string;
  name: string;
  model: string;
  variant?: string;
  category: string;
  image: string;
  heroImage: string;
  hero_image: string;
  frames: string[];
  horsepower: string;
  acceleration: string;
  engine: string;
  seats: string;
  price: string;
  basePrice: string;
  base_price: string;
  year: number;
  description: string;
  published: boolean;
}

type VehicleCatalogEntry = Omit<Vehicle, "image" | "model" | "heroImage" | "hero_image" | "frames" | "basePrice" | "base_price" | "year" | "description" | "published"> & {
  image: string | string[];
};

const vehicleCatalog: VehicleCatalogEntry[] = [
  {
    id: 1,
    slug: "ram-2500",
    brand: "RAM",
    name: "RAM 2500",
    category: "Trucks",

    image: "/vehicles/ram-2500.png",

    horsepower: "410 HP",
    acceleration: "6.5 sec",
    engine: "V8",
    seats: "5",

    price: "₹85,00,000",
  },

  {
    id: 2,
    slug: "ram-3500",
    brand: "RAM",
    name: "RAM 3500",
    category: "Trucks",

    image: "/vehicles/ram-3500.png",

    horsepower: "420 HP",
    acceleration: "7.0 sec",
    engine: "V8",
    seats: "5",

    price: "₹95,00,000",
  },

  {
    id: 3,
    slug: "dodge-charger-petrol",
    brand: "Dodge",
    name: "Charger",
    variant: "Petrol",
    category: "Sports Cars",

    image: "/vehicles/dodge-charger.png",

    horsepower: "717 HP",
    acceleration: "3.6 sec",
    engine: "V8",
    seats: "5",

    price: "₹80,00,000",
  },

  {
    id: 4,
    slug: "dodge-charger-ev",
    brand: "Dodge",
    name: "Charger",
    variant: "EV",
    category: "Sports Cars",

    image: "/vehicles/dodge-charger-ev.png",

    horsepower: "670 HP",
    acceleration: "3.3 sec",
    engine: "Electric",
    seats: "5",

    price: "₹90,00,000",
  },

  {
    id: 5,
    slug: "dodge-durango",
    brand: "Dodge",
    name: "Durango",
    category: "SUVs",

    image: "/vehicles/dodge-durango.png",

    horsepower: "710 HP",
    acceleration: "3.5 sec",
    engine: "V8",
    seats: "7",

    price: "₹75,00,000",
  },

  {
    id: 6,
    slug: "chevrolet-silverado-2500-hd",
    brand: "Chevrolet",
    name: "Silverado 2500 HD",
    category: "Trucks",

    image: "/vehicles/silverado-2500.png",

    horsepower: "420 HP",
    acceleration: "7.2 sec",
    engine: "V8",
    seats: "5",

    price: "₹90,00,000",
  },

  {
    id: 7,
    slug: "chevrolet-corvette",
    brand: "Chevrolet",
    name: "Corvette",
    category: "Sports Cars",

    image: "/vehicles/corvette.png",

    horsepower: "670 HP",
    acceleration: "2.9 sec",
    engine: "V8",
    seats: "2",

    price: "₹1,20,00,000",
  },

  {
    id: 8,
    slug: "ford-mustang",
    brand: "Ford",
    name: "Mustang",
    category: "Sports Cars",

    image: ["/vehicles/mustang.png","/vehicles/mustang2.png", "/vehicles/mustang3.png"],

    horsepower: "480 HP",
    acceleration: "3.2 sec",
    engine: "V8",
    seats: "4",

    price: "₹75,00,000",
  },

  {
    id: 9,
    slug: "ford-mustang-mach-e",
    brand: "Ford",
    name: "Mustang Mach-E",
    category: "Electric",

    image: "/vehicles/mach-e.png",

    horsepower: "480 HP",
    acceleration: "3.5 sec",
    engine: "Electric",
    seats: "5",

    price: "₹70,00,000",
  },

  {
    id: 10,
    slug: "ford-bronco-raptor",
    brand: "Ford",
    name: "Bronco Raptor",
    category: "SUVs",

    image: "/vehicles/bronco-raptor.png",

    horsepower: "418 HP",
    acceleration: "5.6 sec",
    engine: "V6",
    seats: "5",

    price: "₹85,00,000",
  },

  {
    id: 11,
    slug: "gmc-yukon-denali",
    brand: "GMC",
    name: "Yukon Denali",
    category: "Luxury SUVs",

    image: "/vehicles/yukon-denali.png",

    horsepower: "420 HP",
    acceleration: "6.0 sec",
    engine: "V8",
    seats: "8",

    price: "₹90,00,000",
  },

  {
    id: 12,
    slug: "gmc-hummer-ev-suv",
    brand: "GMC",
    name: "Hummer EV",
    variant: "SUV",
    category: "Electric",

    image: "/vehicles/hummer-suv.png",

    horsepower: "830 HP",
    acceleration: "3.5 sec",
    engine: "Electric",
    seats: "5",

    price: "₹1,50,00,000",
  },

  {
    id: 13,
    slug: "gmc-hummer-ev-pickup",
    brand: "GMC",
    name: "Hummer EV",
    variant: "Pickup",
    category: "Electric",

    image: "/vehicles/hummer-pickup.png",

    horsepower: "1000 HP",
    acceleration: "3.0 sec",
    engine: "Electric",
    seats: "5",

    price: "₹1,60,00,000",
  },

  {
    id: 14,
    slug: "cadillac-escalade",
    brand: "Cadillac",
    name: "Escalade",
    category: "Luxury SUVs",

    image: "/vehicles/escalade.png",

    horsepower: "420 HP",
    acceleration: "6.1 sec",
    engine: "V8",
    seats: "7",

    price: "₹1,20,00,000",
  },

  {
    id: 15,
    slug: "cadillac-lyriq",
    brand: "Cadillac",
    name: "Lyriq",
    category: "Electric",

    image: "/vehicles/lyriq.png",

    horsepower: "500 HP",
    acceleration: "4.9 sec",
    engine: "Electric",
    seats: "5",

    price: "₹90,00,000",
  },

  {
    id: 16,
    slug: "cadillac-vistiq",
    brand: "Cadillac",
    name: "Vistiq",
    category: "Electric",

    image: "/vehicles/vistiq.png",

    horsepower: "615 HP",
    acceleration: "3.7 sec",
    engine: "Electric",
    seats: "7",

    price: "₹1,00,00,000",
  },

  {
    id: 17,
    slug: "lincoln-navigator",
    brand: "Lincoln",
    name: "Navigator",
    category: "Luxury SUVs",

    image: "/vehicles/navigator.png",

    horsepower: "440 HP",
    acceleration: "6.2 sec",
    engine: "V6",
    seats: "7",

    price: "₹1,10,00,000",
  },

  {
    id: 18,
    slug: "tesla-cybertruck",
    brand: "Tesla",
    name: "Cybertruck",
    category: "Electric",

    image: "/vehicles/cybertruck.png",

    horsepower: "845 HP",
    acceleration: "2.6 sec",
    engine: "Electric",
    seats: "5",

    price: "TBC",
  },
];

export const vehicles: Vehicle[] = vehicleCatalog.map((vehicle) => ({
  ...vehicle,
  image: Array.isArray(vehicle.image) ? vehicle.image[0] : vehicle.image,
  model: vehicle.name,
  heroImage: Array.isArray(vehicle.image) ? vehicle.image[0] : vehicle.image,
  hero_image: Array.isArray(vehicle.image) ? vehicle.image[0] : vehicle.image,
  frames: Array.isArray(vehicle.image) ? vehicle.image : [vehicle.image],
  basePrice: vehicle.price,
  base_price: vehicle.price,
  year: 2025,
  description: `${vehicle.brand} ${vehicle.name}, prepared for the Cyber Torque collection.`,
  published: true,
}));

export const vehicleDetails: Record<
  string,
  {
    categories: VehicleSpecCategory[];
    dimensions: VehicleDimensions;
    vehicleOutline: string;
    backgroundImage: string;
    logo: string;
    variants: VehicleVariant[];
  }
> = Object.fromEntries(
  vehicles.map((vehicle) => [
    vehicle.slug,
    {
      categories: [
        {
          title: "Power unit",
          items: [
            { label: "Engine", value: vehicle.engine },
            { label: "Power", value: vehicle.horsepower },
            {
              label: "Transmission",
              value: vehicle.engine === "Electric" ? "Single-speed" : "8-Speed Automatic",
            },
          ],
        },
        {
          title: "Performance",
          items: [
            { label: "0-100 km/h", value: vehicle.acceleration },
            {
              label: "Top Speed",
              value: vehicle.engine === "Electric" ? "250 km/h" : "320 km/h",
            },
            { label: "Drive", value: vehicle.category === "Trucks" ? "4WD" : "AWD" },
          ],
        },
        {
          title: "Body",
          items: [
            { label: "Body Type", value: vehicle.category },
            { label: "Seats", value: vehicle.seats },
            { label: "Doors", value: vehicle.seats === "2" ? "2" : "4" },
          ],
        },
        {
          title: "Ownership",
          items: [
            { label: "Starting From", value: vehicle.price },
            { label: "Powertrain", value: vehicle.engine },
          ],
        },
      ],
      dimensions: {
        width: vehicle.category === "Trucks" ? "2,080 mm" : "1,920 mm",
        height: vehicle.category.includes("SUV") || vehicle.category === "Trucks" ? "1,950 mm" : "1,380 mm",
        wheelbase: vehicle.category === "Trucks" ? "3,700 mm" : "2,720 mm",
        length: vehicle.category === "Trucks" ? "5,900 mm" : "4,800 mm",
      },
      vehicleOutline: "/vehicles/mustang.png",
      backgroundImage: "/vehicles/mustang-bg.jpg",
      logo: `/brands/${vehicle.brand}.png`,
      variants: vehicles
        .filter((candidate) => candidate.brand === vehicle.brand)
        .slice(0, 4)
        .map((candidate) => ({
          name: candidate.name,
          subtitle: candidate.variant ?? candidate.engine,
          image: candidate.image,
          price: candidate.price,
          specs: candidate.horsepower,
          slug: candidate.slug,
        })),
    },
  ])
);