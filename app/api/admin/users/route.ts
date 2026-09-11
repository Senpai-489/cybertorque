import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createAdminClient } from "@/app/utlis/supabase/server";
import { getAdminSession } from "@/app/lib/admin-auth";

export const runtime = "nodejs";

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized: no valid session" },
        { status: 401 }
      );
    }

    if (session.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized: admin access required" },
        { status: 401 }
      );
    }

    const supabase = createAdminClient();
    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("id, username:user_name, role, created_at")
      .order("created_at", { ascending: false })
      .limit(100);

    if (usersError) throw usersError;

    return NextResponse.json({
      users,
    });
  } catch (error) {
    console.error("[ADMIN USERS] Failed:", error);

    return NextResponse.json(
      {
        error: "Unable to load users",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const username = typeof body.username === "string" ? body.username.trim() : "";
    const password = typeof body.password === "string" ? body.password : "";
    const role = body.role === "admin" || body.role === "employee" ? body.role : "";

    if (!username || password.length < 8 || !role) {
      return NextResponse.json({ error: "Username, role and a password of at least 8 characters are required" }, { status: 400 });
    }

    const supabase = createAdminClient();
    const { data: user, error } = await supabase
      .from("users")
      .insert({ user_name: username, role, password: await bcrypt.hash(password, 10) })
      .select("id, username:user_name, role, created_at")
      .single();

    if (error) {
      if (error.code === "23505") return NextResponse.json({ error: "Username already exists" }, { status: 409 });
      throw error;
    }
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("[ADMIN USER CREATE] Failed:", error);
    return NextResponse.json({ error: "Unable to create user" }, { status: 500 });
  }
}