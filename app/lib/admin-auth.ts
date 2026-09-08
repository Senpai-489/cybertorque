import crypto from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "cybertorque_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8;

export type SessionPayload = {
  userId: string;
  username: string;
  role: string;
  expiresAt: number;
};

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not configured");
  }

  return secret;
}

function encode(value: string): string {
  return Buffer.from(value, "utf8").toString("base64url");
}

function sign(value: string): string {
  return crypto
    .createHmac("sha256", getSecret())
    .update(value)
    .digest("base64url");
}

export function createSession(
  user: Omit<SessionPayload, "expiresAt">
): string {
  const payload: SessionPayload = {
    ...user,
    expiresAt:
      Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  };

  const encodedPayload = encode(JSON.stringify(payload));
  const signature = sign(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export function readSession(
  value?: string | null
): SessionPayload | null {
  if (!value) return null;

  const separatorIndex = value.lastIndexOf(".");

  if (separatorIndex === -1) {
    return null;
  }

  const encodedPayload = value.slice(0, separatorIndex);
  const signature = value.slice(separatorIndex + 1);

  if (!encodedPayload || !signature) {
    return null;
  }

  try {
    const expectedSignature = sign(encodedPayload);

    const receivedBuffer = Buffer.from(signature, "utf8");
    const expectedBuffer = Buffer.from(expectedSignature, "utf8");

    if (receivedBuffer.length !== expectedBuffer.length) {
      return null;
    }

    if (
      !crypto.timingSafeEqual(
        receivedBuffer,
        expectedBuffer
      )
    ) {
      return null;
    }

    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8")
    ) as SessionPayload;

    if (
      !payload.userId ||
      !payload.username ||
      !payload.role ||
      !payload.expiresAt
    ) {
      return null;
    }

    if (
      payload.expiresAt <=
      Math.floor(Date.now() / 1000)
    ) {
      return null;
    }

    return payload;
  } catch (error) {
    console.error("Failed to read admin session:", error);
    return null;
  }
}

export async function getAdminSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();

  const cookie = cookieStore.get(COOKIE_NAME);

  return readSession(cookie?.value);
}

export function sessionCookie(value: string) {
  return {
    name: COOKIE_NAME,
    value,
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  };
}

export function clearSessionCookie() {
  return {
    ...sessionCookie(""),
    maxAge: 0,
  };
}