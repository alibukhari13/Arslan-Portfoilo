import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { connection } from "next/server";

export const COOKIE = "arslan_admin";

export function safeEqual(leftValue, rightValue) {
  const left = Buffer.from(String(leftValue));
  const right = Buffer.from(String(rightValue));
  if (left.length !== right.length) {
    timingSafeEqual(left, left);
    return false;
  }
  return timingSafeEqual(left, right);
}

export function sessionToken() {
  const secret = process.env.ADMIN_PASSWORD || "";
  if (!secret) return "";
  return createHmac("sha256", secret).update("arslan-admin-session").digest("hex");
}

export function cookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  };
}

export async function isAdmin() {
  await connection();
  const expected = sessionToken();
  if (!expected) return false;
  const jar = await cookies();
  const value = jar.get(COOKIE)?.value || "";
  if (!value) return false;
  return safeEqual(value, expected);
}
