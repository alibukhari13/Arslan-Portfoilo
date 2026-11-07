import { connection } from "next/server";
import { serviceClient } from "@/lib/supabase";

const sources = new Set(["Home", "About", "Services", "Pricing", "Projects", "Project", "Contact page"]);

export async function POST(request) {
  await connection();
  const body = await request.json().catch(() => ({}));
  const name = String(body.name || "").trim().slice(0, 120);
  const email = String(body.email || "").trim().slice(0, 180);
  const message = String(body.message || "").trim().slice(0, 5000);
  const source = sources.has(body.source) ? body.source : "Contact page";

  if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 2) {
    return Response.json({ ok: false, error: "Add your name, a real email, and a message." }, { status: 400 });
  }

  const client = serviceClient();
  if (!client) return Response.json({ ok: false, error: "The form is not connected yet." }, { status: 500 });

  const since = new Date(Date.now() - 60_000).toISOString();
  const recent = await client.from("messages").select("id", { count: "exact", head: true }).eq("email", email).gte("created_at", since);
  if ((recent.count || 0) >= 3) {
    return Response.json({ ok: false, error: "Please wait a minute before sending another message." }, { status: 429 });
  }

  const { error } = await client.from("messages").insert({ name, email, message, source });
  if (error) return Response.json({ ok: false, error: "The message could not be saved. Please email Arslan directly." }, { status: 500 });
  return Response.json({ ok: true });
}
