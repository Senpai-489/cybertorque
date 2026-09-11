import { NextResponse } from "next/server";
import { getAdminSession } from "@/app/lib/admin-auth";
import { createAdminClient } from "@/app/utlis/supabase/server";

export const runtime = "nodejs";

const editableFields = [
  "slug",
  "brand",
  "name",
  "model",
  "variant",
  "category",
  "image",
  "hero_image",
  "horsepower",
  "acceleration",
  "engine",
  "seats",
  "price",
  "year",
  "description",
  "published",
] as const;

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const body = (await request.json()) as Record<string, unknown>;
    const updates: Record<string, unknown> = {};

    for (const field of editableFields) {
      if (field in body) updates[field] = body[field];
    }

    if (typeof updates.slug !== "string" || !updates.slug.trim()) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }
    if (typeof updates.name !== "string" || !updates.name.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    updates.updated_at = new Date().toISOString();
    const supabase = createAdminClient();
    const { data: vehicle, error } = await supabase
      .from("vehicles")
      .update(updates)
      .eq("id", id)
      .select(
        "id, slug, brand_id, brands(name), name, model, variant, category, image, hero_image, horsepower, acceleration, engine, seats, price, year, description, published"
      )
      .single();

    if (error) throw error;
    return NextResponse.json({ vehicle });
  } catch (error) {
    console.error("[ADMIN VEHICLE UPDATE] Failed:", error);
    return NextResponse.json({ error: "Unable to update vehicle" }, { status: 500 });
  }
}