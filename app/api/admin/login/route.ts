import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { createAdminClient } from "@/app/utlis/supabase/server";
import { createSession, sessionCookie } from "@/app/lib/admin-auth";

export const runtime = "nodejs";

type UserRecord = {
  id: string;
  user_name: string;
  role: string;
  password: string;
};

export async function POST(request: Request) {
  try {
    // --------------------------------------------------
    // Parse request
    // --------------------------------------------------

    const body = await request.json();

    const username =
      typeof body.username === "string"
        ? body.username.trim()
        : "";

    const password =
      typeof body.password === "string"
        ? body.password
        : "";

    if (!username || !password) {
      return NextResponse.json(
        {
          error: "Username and password are required",
        },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    const { data: profile, error: profileError } = await supabase
      .from("users")
      .select("id, user_name, role, password")
      .eq("user_name", username)
      .maybeSingle<UserRecord>();

    if (profileError) throw profileError;
    if (!profile || !["admin", "employee"].includes(profile.role)) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const passwordMatches = profile.password.startsWith("$2")
      ? await bcrypt.compare(password, profile.password)
      : false;
    if (!passwordMatches) {
      return NextResponse.json({ error: "Invalid admin credentials" }, { status: 401 });
    }

    const response = NextResponse.json({
      success: true,
      user: { id: profile.id, username: profile.user_name, email: null, role: profile.role },
    });
    response.cookies.set(
      sessionCookie(
        createSession({ userId: String(profile.id), username: profile.user_name, role: profile.role })
      )
    );
    return response;
  } catch (error: unknown) {
    console.error("Admin login failed", error);

    const details = error instanceof Error ? error.message : "Unknown database error";
    return NextResponse.json(
      {
        error: "Unable to process admin login",
        details: process.env.NODE_ENV === "development" ? details : undefined,
      },
      { status: 500 }
    );
  }
}