import { connection } from "next/server";
import { isAdmin } from "@/lib/auth";
import { tables } from "@/lib/collections";
import { projectGroup } from "@/lib/getSite";
import { serviceClient } from "@/lib/supabase";

export async function loadAdminData() {
  await connection();
  if (!(await isAdmin())) return { ok: false, error: "Sign in again." };
  const client = serviceClient();
  if (!client) return { ok: false, error: "Supabase service key is missing in .env.local." };

  const names = tables;
  const results = await Promise.all(
    names.map((name) => {
      const query = client.from(name).select("*");
      if (name === "profile" || name === "site_copy") return query;
      if (name === "messages") return query.order("created_at", { ascending: false });
      return query.order("sort", { ascending: true });
    }),
  );
  const failed = results.find((result) => result.error);
  if (failed) return { ok: false, error: failed.error.message };

  const data = {};
  names.forEach((name, index) => {
    const rows = results[index].data || [];
    if (name === "profile") data.profile = rows.find((row) => row.id === 1) || rows[0] || null;
    else if (name === "site_copy") data.site_copy = (rows.find((row) => row.id === 1) || rows[0] || { id: 1, data: {} }).data || {};
    else data[name] = rows;
  });
  const details = data.site_copy?.projectDetails || {};
  if (Array.isArray(data.projects)) {
    data.projects = data.projects.map((row) => {
      const merged = { ...row, ...(details[String(row.id)] || {}) };
      return { ...merged, filterGroup: projectGroup(merged) };
    });
  }
  return { ok: true, data };
}
