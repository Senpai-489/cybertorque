import { NextResponse } from "next/server";
import { createAdminClient } from "@/app/utlis/supabase/server";
import { vehicles as fallbackVehicles } from "@/app/data/vehicles";

export const runtime = "nodejs";

interface VehicleItem {
  id: number | string;
  name: string;
  brand: string;
  model?: string;
  variant?: string | null;
  category: string;
  image: string;
  horsepower: string;
  acceleration?: string;
  engine: string;
  price: string;
  year: number | string;
  slug: string;
}

// -- FAQs Knowledge Base ------------------------------------------
const FAQ_KNOWLEDGE = [
  {
    keywords: ["what is cyber torque", "about cyber torque", "who are you", "what do you do"],
    answer:
      "Cyber Torque is a premier luxury and exotic automobile concierge. We specialize in sourcing, customising, and delivering rare and high-performance vehicles directly to you with complete end-to-end import and registration support.",
    suggestions: ["Browse Fleet ???", "Can I customise my car?", "Book Consultation ??"],
  },
  {
    keywords: ["customise", "customize", "modification", "tuning", "body kit", "wheels", "interior", "options"],
    answer:
      "Yes, absolutely! We offer bespoke customisation including forged performance wheels, bespoke leather interiors, aerodynamic packages, performance exhaust systems, and carbon fiber accents. You can also explore our online 360 Configurator.",
    suggestions: ["Open Configurator ???", "Browse Vehicles ???", "Book a Consultation ??"],
  },
  {
    keywords: ["source", "procure", "find car", "order specific", "import request", "on request"],
    answer:
      "If the exact vehicle you desire is not in our current showroom or inventory, our international procurement team can source it directly from verified global partners across the US, Europe, and UAE.",
    suggestions: ["Request Vehicle Sourcing ??", "How long does shipping take?", "Book Consultation ??"],
  },
  {
    keywords: ["shipping", "import", "customs", "clearance", "logistics", "delivery", "port"],
    answer:
      "We manage the entire international logistics lifecycle: secure container transport, marine insurance, customs clearance, homologation, and doorstep delivery with ARAI/RTO compliant road registration.",
    suggestions: ["How long does delivery take?", "Track My Vehicle ??", "Browse Vehicles ???"],
  },
  {
    keywords: ["how long", "timeline", "time take", "duration", "wait time", "delivery time"],
    answer:
      "Delivery generally takes between 6 to 24 weeks depending on whether the vehicle is already in stock, sourced from abroad, or undergoes bespoke customisation. A detailed milestone schedule is provided for every order.",
    suggestions: ["Track My Order ??", "Browse Fleet ???", "Speak with Concierge ??"],
  },
  {
    keywords: ["viewing", "test drive", "visit", "showroom", "appointment", "experience", "see in person"],
    answer:
      "Private viewings and bespoke test sessions are arranged by appointment at our lounge or at your preferred location. We would be delighted to host you.",
    suggestions: ["Book a Viewing ??", "Browse Fleet ???", "Contact Concierge ??"],
    triggerBooking: true,
  },
  {
    keywords: ["track", "tracking", "status of order", "where is my car", "shipment status"],
    answer:
      "You can track your vehicle anytime using our live Vehicle Tracking portal. Just enter your Tracking ID to view current location, transit stage, and estimated delivery.",
    suggestions: ["Go to Tracking Portal ??", "What are the 7 stages?", "Contact Support ??"],
  },
  {
    keywords: ["stages", "process", "steps", "how it works", "order process"],
    answer:
      "Our transparent 7-stage process is:\n1. Ordering & Specification\n2. Procurement & Inspection\n3. Processing & Documentation\n4. International Shipping\n5. Customs Clearance\n6. Handover & Delivery Prep\n7. Road Registration & Key Handover.",
    suggestions: ["Track Vehicle ??", "Browse Vehicles ???", "Book Consultation ??"],
  },
  {
    keywords: ["contact", "phone", "email", "address", "call", "whatsapp", "location"],
    answer:
      "You can reach Cyber Torque Concierge 24/7 via phone or WhatsApp at +91 98765 43210, or email us at concierge@cybertorque.com. We also offer private appointments upon request.",
    suggestions: ["Book Consultation ??", "Browse Fleet ???", "Track Order ??"],
  },
  {
    keywords: ["price", "cost", "how much", "payment", "finance", "deposit"],
    answer:
      "Our vehicles are quoted with clear, transparent pricing covering ex-showroom costs, international logistics, and applicable statutory taxes. Bespoke financing, corporate leasing, and milestone-based payments are supported.",
    suggestions: ["Show Vehicle Prices ???", "Book Consultation ??", "Customisation Details ???"],
  },
];

async function fetchAllVehicles(): Promise<VehicleItem[]> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("vehicles")
      .select(
        "id, name, slug, brand_id, brands(name), model, variant, category, image, hero_image, horsepower, acceleration, engine, seats, price, year, published"
      )
      .limit(100);

    if (!error && data && data.length > 0) {
      return data.map((v: any) => ({
        id: v.id,
        name: v.name,
        brand: v.brands?.name || (typeof v.brand === "string" ? v.brand : "Cyber Torque"),
        model: v.model,
        variant: v.variant,
        category: v.category || "Luxury",
        image: v.image || v.hero_image || "/cars/ram-2500.jpg",
        horsepower: v.horsepower || "N/A",
        acceleration: v.acceleration || "N/A",
        engine: v.engine || "High Performance",
        price: v.price || "On Request",
        year: v.year || 2025,
        slug: v.slug || "vehicle",
      }));
    }
  } catch (err) {
    console.warn("[CHATBOT] Supabase vehicle fetch warning, using fallback catalog:", err);
  }

  // Fallback to local catalog
  return fallbackVehicles.map((v: any) => ({
    id: v.id,
    name: v.name,
    brand: v.brand,
    model: v.model || v.name,
    variant: v.variant,
    category: v.category,
    image: Array.isArray(v.image) ? v.image[0] : v.image,
    horsepower: v.horsepower,
    acceleration: v.acceleration,
    engine: v.engine,
    price: v.price,
    year: v.year || 2025,
    slug: v.slug,
  }));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = typeof body.message === "string" ? body.message.trim().toLowerCase() : "";

    if (!message) {
      return NextResponse.json({
        text: "Greetings. I am the Cyber Torque Concierge. How may I assist you with our fleet, bespoke customisations, or scheduling a viewing today?",
        suggestions: ["Browse Fleet ???", "Book a Test Drive ??", "Vehicle Customisation ???", "Track My Vehicle ??"],
      });
    }

    const allVehicles = await fetchAllVehicles();

    // -- 1. Check for Booking / Test Drive Intent --
    const bookingKeywords = ["book", "booking", "schedule", "test drive", "appointment", "reserve", "buy", "purchase", "interested in buying"];
    const isBookingIntent = bookingKeywords.some((bk) => message.includes(bk));

    // Try finding if a specific vehicle is mentioned
    const mentionedVehicle = allVehicles.find((v) => {
      const vName = v.name.toLowerCase();
      const vBrand = v.brand.toLowerCase();
      const vSlug = v.slug.toLowerCase().replace("-", " ");
      return (
        message.includes(vName) ||
        (vBrand.length > 2 && message.includes(vBrand)) ||
        message.includes(vSlug)
      );
    });

    if (isBookingIntent) {
      const vehicleTitle = mentionedVehicle ? `${mentionedVehicle.brand} ${mentionedVehicle.name}` : undefined;
      return NextResponse.json({
        text: vehicleTitle
          ? `Magnificent choice. I can assist you in reserving a private consultation or viewing for the ${vehicleTitle}. Please share your details below:`
          : "We would be pleased to arrange a private viewing, consultation, or test drive for you. Please enter your name and contact details below:",
        showBookingForm: true,
        prefilledVehicle: vehicleTitle,
        vehicles: mentionedVehicle ? [mentionedVehicle] : [],
        suggestions: ["Ask about customisation ???", "How does delivery work?", "Browse other cars ???"],
      });
    }

    // -- 2. Check for Specific Vehicle Search or Brand Queries --
    const brandMatches = allVehicles.filter((v) => {
      const q = message;
      const brand = v.brand.toLowerCase();
      const name = v.name.toLowerCase();
      const cat = v.category.toLowerCase();
      const engine = (v.engine || "").toLowerCase();

      return (
        q.includes(brand) ||
        q.includes(name) ||
        (q.includes("truck") && cat.includes("truck")) ||
        (q.includes("suv") && cat.includes("suv")) ||
        (q.includes("sport") && cat.includes("sport")) ||
        (q.includes("electric") && (cat.includes("electric") || engine.includes("electric") || engine.includes("ev"))) ||
        (q.includes("ev") && (cat.includes("electric") || engine.includes("electric") || engine.includes("ev")))
      );
    });

    const isDirectVehicleRequest =
      message.includes("car") ||
      message.includes("vehicle") ||
      message.includes("fleet") ||
      message.includes("collection") ||
      message.includes("show me") ||
      message.includes("all models") ||
      message.includes("inventory");

    if (brandMatches.length > 0) {
      const displayVehicles = brandMatches.slice(0, 4);
      return NextResponse.json({
        text: `Here are the matching vehicles from our Cyber Torque collection:`,
        vehicles: displayVehicles,
        suggestions: [
          `Book viewing for ${displayVehicles[0].name} ??`,
          "Can I customise these? ???",
          "Show all vehicles ???",
        ],
      });
    }

    if (isDirectVehicleRequest) {
      const displayVehicles = allVehicles.slice(0, 4);
      return NextResponse.json({
        text: `Here is a selection from our current fleet of performance and luxury vehicles. You can view specifications or book a viewing directly:`,
        vehicles: displayVehicles,
        suggestions: ["Show Sports Cars ???", "Show SUVs & Trucks ??", "Book a Test Drive ??"],
      });
    }

    // -- 3. Check FAQs Knowledge Base --
    for (const faq of FAQ_KNOWLEDGE) {
      const matched = faq.keywords.some((k) => message.includes(k));
      if (matched) {
        return NextResponse.json({
          text: faq.answer,
          suggestions: faq.suggestions,
          showBookingForm: faq.triggerBooking || false,
        });
      }
    }

    // -- 4. Fallback Default Answer --
    return NextResponse.json({
      text: "I can provide details on any vehicle in our fleet, explain our customisation options, help you track an existing order, or arrange a private viewing with our concierge team. What would you like to explore?",
      suggestions: [
        "Browse Available Fleet ???",
        "Book a Consultation ??",
        "Customisation & Tuning ???",
        "How does import & delivery work? ??",
      ],
    });
  } catch (error) {
    console.error("[CHATBOT MESSAGE API ERROR]:", error);
    return NextResponse.json(
      {
        text: "I am temporarily having trouble accessing the concierge system. Please reach out directly to our team at concierge@cybertorque.com or +91 98765 43210.",
        suggestions: ["Try Again", "View Fleet ???"],
      },
      { status: 500 }
    );
  }
}
