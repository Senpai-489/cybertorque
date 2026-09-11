import { NextResponse } from "next/server";
import { getAdminSession } from "@/app/lib/admin-auth";
import { createAdminClient } from "@/app/utlis/supabase/server";

export const runtime = "nodejs";

const statuses = ["Order received", "Preparing vehicle", "In transit", "Ready for collection", "Completed"] as const;

export async function GET() {
  const session = await getAdminSession();
  if (!session || !["admin", "employee"].includes(session.role)) return NextResponse.json({ error: "Staff access required" }, { status: 401 });
  const { data, error } = await createAdminClient()
    .from("vehicle_tracking")
    .select("tracking_id, status, location, estimated_delivery, notes, updated_at, vehicle_id, vehicles(name, brand_id, brands(name), model, image)")
    .order("updated_at", { ascending: false });
  if (error) return NextResponse.json({ error: "Unable to load tracking records" }, { status: 500 });
  return NextResponse.json({ tracking: data });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session || session.role !== "admin") return NextResponse.json({ error: "Admin access required" }, { status: 401 });
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const trackingId = typeof body.tracking_id === "string" ? body.tracking_id.trim() : "";
    const vehicleId = Number(body.vehicle_id);
    const status = typeof body.status === "string" && statuses.includes(body.status as (typeof statuses)[number]) ? body.status : "Order received";
    if (!trackingId || !Number.isInteger(vehicleId)) return NextResponse.json({ error: "Tracking ID and vehicle are required" }, { status: 400 });
    const updatedBy = Number(session.userId) || null;
    const { data, error } = await createAdminClient()
      .from("vehicle_tracking")
      .insert({ tracking_id: trackingId, vehicle_id: vehicleId, status, location: "", notes: "", updated_by: updatedBy })
      .select("tracking_id, status, location, estimated_delivery, notes, updated_at, vehicle_id, vehicles(name, brand_id, brands(name), model, image)")
      .single();
    if (error) {
      if (error.code === "23505") return NextResponse.json({ error: "Tracking ID already exists" }, { status: 409 });
      throw error;
    }
    return NextResponse.json({ tracking: data }, { status: 201 });
  } catch (error) {
    console.error("[TRACKING CREATE] Failed:", error);
    return NextResponse.json({ error: "Unable to create tracking record" }, { status: 500 });
  }
}
