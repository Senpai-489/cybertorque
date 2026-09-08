import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/app/utlis/supabase/server";
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

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
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