import { NextResponse } from "next/server";
import { getAdminSession } from "@/app/lib/admin-auth";

export const runtime = "nodejs";

export async function GET() {
  const session = await getAdminSession();
  const isStaff = session?.role === "admin" || session?.role === "employee";

  return NextResponse.json({
    authenticated: isStaff,
    user: isStaff
      ? { id: session.userId, username: session.username, email: null, role: session.role }
      : null,
  });
}