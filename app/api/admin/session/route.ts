import { NextResponse } from "next/server";
import { getAdminSession } from "@/app/lib/admin-auth";

export const runtime = "nodejs";

export async function GET() {
  const session = await getAdminSession();
  const isAdmin = session?.role === "admin";

  return NextResponse.json({
    authenticated: isAdmin,
    user: isAdmin
      ? { id: session.userId, username: session.username, email: null, role: session.role }
      : null,
  });
}