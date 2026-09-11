import { NextResponse } from "next/server";
import { createAdminClient } from "@/app/utlis/supabase/server";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const trackingId = new URL(request.url).searchParams.get("trackingId")?.trim();
  if (!trackingId) return NextResponse.json({ error: "Tracking ID is required" }, { status: 400 });

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("vehicle_tracking")
      .select("tracking_id, status, location, estimated_delivery, notes, updated_at, vehicles(name, brand_id, brands(name), model, image)")
      .eq("tracking_id", trackingId)
      .maybeSingle();

    if (error) throw error;
    if (!data) return NextResponse.json({ error: "Tracking ID not found" }, { status: 404 });
    return NextResponse.json({ tracking: data });
  } catch (error) {
    console.error("[TRACKING LOOKUP] Failed:", error);
    return NextResponse.json({ error: "Unable to look up tracking status" }, { status: 500 });
  }
}
