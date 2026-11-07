import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { connection } from "next/server";
import { COOKIE, cookieOptions, safeEqual, sessionToken } from "@/lib/auth";

export async function POST(request) {
  await connection();
  const body = await request.json().catch(() => ({}));
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");
  const adminEmail = String(process.env.ADMIN_EMAIL || "").trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || "";

  if (!adminEmail || !adminPassword) {
    return NextResponse.json({ ok: false, error: "Admin login is not configured." }, { status: 500 });
  }

  if (!safeEqual(email, adminEmail) || !safeEqual(password, adminPassword)) {
    return NextResponse.json({ ok: false, error: "Email or password is incorrect." }, { status: 401 });
  }

  const jar = await cookies();
  jar.set(COOKIE, sessionToken(), cookieOptions());
  return NextResponse.json({ ok: true });
}
