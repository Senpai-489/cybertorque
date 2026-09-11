import { NextResponse } from "next/server";
import { getAdminSession } from "@/app/lib/admin-auth";
import { createAdminClient } from "@/app/utlis/supabase/server";

export const runtime = "nodejs";

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = createAdminClient();
    const { data: vehicles, error } = await supabase
      .from("vehicles")
      .select(
        "id, slug, brand_id, brands(name), name, model, variant, category, image, hero_image, horsepower, acceleration, engine, seats, price, year, description, published"
      )
      .order("created_at", { ascending: false })
      .limit(200);

    if (error) throw error;

    return NextResponse.json({ vehicles });
  } catch (error) {
    console.error("[ADMIN VEHICLES] Failed:", error);
    return NextResponse.json({ error: "Unable to load vehicles" }, { status: 500 });
  }
}