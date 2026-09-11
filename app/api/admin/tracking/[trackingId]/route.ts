import { NextResponse } from "next/server";
import { getAdminSession } from "@/app/lib/admin-auth";
import { createAdminClient } from "@/app/utlis/supabase/server";

export const runtime = "nodejs";

const statuses = [
  "Order received",
  "Preparing vehicle",
  "In transit",
  "Ready for collection",
  "Completed",
] as const;

export async function PATCH(
  request: Request,
  context: { params: Promise<{ trackingId: string }> }
) {
  const session = await getAdminSession();
  if (!session || !["admin", "employee"].includes(session.role)) {
    return NextResponse.json({ error: "Staff access required" }, { status: 401 });
  }

  try {
    const { trackingId } = await context.params;
    const body = (await request.json()) as Record<string, unknown>;
    const status = typeof body.status === "string" ? body.status : "";
    const location = typeof body.location === "string" ? body.location.trim() : "";
    const notes = typeof body.notes === "string" ? body.notes.trim() : "";
    const estimatedDelivery = typeof body.estimated_delivery === "string" && body.estimated_delivery
      ? body.estimated_delivery
      : null;

    if (!statuses.includes(status as (typeof statuses)[number])) {
      return NextResponse.json({ error: "Invalid tracking status" }, { status: 400 });
    }

    const supabase = createAdminClient();
    const { data: tracking, error } = await supabase
      .from("vehicle_tracking")
      .update({ status, location, notes, estimated_delivery: estimatedDelivery, updated_by: Number(session.userId) || null, updated_at: new Date().toISOString() })
      .eq("tracking_id", trackingId)
      .select("tracking_id, status, location, estimated_delivery, notes, updated_at, vehicles(name, brand_id, brands(name), model, image)")
      .single();

    if (error) {
      if (error.code === "PGRST116") return NextResponse.json({ error: "Tracking ID not found" }, { status: 404 });
      throw error;
    }
    return NextResponse.json({ tracking });
  } catch (error) {
    console.error("[TRACKING UPDATE] Failed:", error);
    return NextResponse.json({ error: "Unable to update tracking status" }, { status: 500 });
  }
}
