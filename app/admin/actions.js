"use server";

import { revalidatePath, updateTag } from "next/cache";
import { adminPages } from "@/components/admin/pages";
import { connection } from "next/server";
import { isAdmin } from "@/lib/auth";
import { clearSiteCache } from "@/lib/getSite";
import { lists, singles, tables } from "@/lib/collections";
import { serviceClient } from "@/lib/supabase";

const specs = new Map([...singles, ...lists].map((item) => [item.table, item]));

function denied() {
  return { ok: false, error: "Sign in again." };
}

function publish() {
  clearSiteCache();
  updateTag("site");
  revalidatePath("/", "layout");
}

async function gate() {
  await connection();
  if (!(await isAdmin())) return { ok: false, error: "Sign in again.", client: null };
  const client = serviceClient();
  if (!client) return { ok: false, error: "Supabase service key is missing in .env.local.", client: null };
  return { ok: true, client };
}

function slugify(value) {
  const slug = String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return slug || `project-${Date.now()}`;
}

function clean(table, record) {
  const spec = specs.get(table);
  const row = {};
  for (const field of spec.fields) {
    let value = record[field.key];
    if (field.type === "lines") {
      const source = Array.isArray(value) ? value : String(value || "").split("\n");
      value = source.map((item) => String(item).trim()).filter(Boolean);
    } else if (field.type === "shots") {
      const source = Array.isArray(value) ? value : [];
      const shots = [0, 1, 2].map((index) => String(source[index] || "").trim());
      value = shots.every((item) => !item) ? [] : shots;
    } else if (field.type === "number") {
      value = Number(value) || 0;
    } else if (field.type === "bool") {
      value = Boolean(value);
    } else if (field.type === "sections") {
      value = (Array.isArray(value) ? value : [])
        .map((section) => ({
          heading: String(section?.heading || "").trim(),
          text: String(section?.text || "").trim(),
        }))
        .filter((section) => section.heading || section.text);
    } else {
      value = value == null ? "" : String(value);
    }
    row[field.key] = value;
  }
  if (table === "projects" && !row.slug) row.slug = slugify(row.title);
  if (table !== "profile") row.sort = Number(record.sort) || 0;
  return row;
}

export async function loadAdmin() {
  const access = await gate();
  if (!access.ok) return access;
  const names = tables;
  const results = await Promise.all(
    names.map((name) => {
      const query = access.client.from(name).select("*");
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
  return { ok: true, data };
}

export async function saveRecord(table, record) {
  if (!specs.has(table)) return { ok: false, error: "Unknown section." };
  const access = await gate();
  if (!access.client) return access.ok ? denied() : access;
  const row = clean(table, record || {});
  const id = record?.id;
  const query = id
    ? access.client.from(table).update(row).eq("id", id)
    : access.client.from(table).insert(row);
  const { error } = await query;
  if (error) return { ok: false, error: error.message };
  publish();
  return { ok: true };
}

export async function saveProfile(record) {
  const access = await gate();
  if (!access.client) return access.ok ? denied() : access;
  const row = { ...clean("profile", record || {}), id: 1 };
  const { error } = await access.client.from("profile").upsert(row);
  if (error) return { ok: false, error: error.message };
  publish();
  return { ok: true };
}

export async function saveCopy(data) {
  const access = await gate();
  if (!access.client) return access.ok ? denied() : access;
  const existing = await access.client.from("site_copy").select("data").eq("id", 1).maybeSingle();
  if (existing.error) return { ok: false, error: existing.error.message };
  const next = { ...(data || {}) };
  const previousHidden = existing.data?.data?.hiddenSections;
  if (next.hiddenSections == null && previousHidden) next.hiddenSections = previousHidden;
  const { error } = await access.client.from("site_copy").upsert({ id: 1, data: next });
  if (error) return { ok: false, error: error.message };
  publish();
  return { ok: true };
}

export async function setSectionHidden(sectionId, hidden) {
  const access = await gate();
  if (!access.client) return access.ok ? denied() : access;
  const id = String(sectionId || "");
  const known = adminPages.some((page) => page.sections.some((section) => section.id === id && !section.inbox));
  if (!known) return { ok: false, error: "Unknown section." };
  const current = await access.client.from("site_copy").select("data").eq("id", 1).single();
  if (current.error) return { ok: false, error: current.error.message };
  const data = { ...(current.data?.data || {}) };
  const hiddenSections = { ...(data.hiddenSections && typeof data.hiddenSections === "object" ? data.hiddenSections : {}) };
  if (hidden) hiddenSections[id] = true;
  else delete hiddenSections[id];
  data.hiddenSections = hiddenSections;
  const { error } = await access.client.from("site_copy").upsert({ id: 1, data });
  if (error) return { ok: false, error: error.message };
  publish();
  return { ok: true, hiddenSections };
}

export async function setMessageRead(id, read = true) {
  const access = await gate();
  if (!access.client) return access.ok ? denied() : access;
  const { error } = await access.client.from("messages").update({ read: Boolean(read) }).eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin");
  return { ok: true };
}

export async function deleteMessage(id) {
  const access = await gate();
  if (!access.client) return access.ok ? denied() : access;
  const { error } = await access.client.from("messages").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin");
  return { ok: true };
}

export async function removeRecord(table, id) {
  if (!specs.has(table) || table === "profile") return { ok: false, error: "This section cannot be deleted." };
  const access = await gate();
  if (!access.client) return access.ok ? denied() : access;
  const { error } = await access.client.from(table).delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  publish();
  return { ok: true };
}

export async function reorderRecords(table, ids) {
  if (!specs.has(table) || table === "profile") return { ok: false, error: "Unknown section." };
  const access = await gate();
  if (!access.client) return access.ok ? denied() : access;
  const results = await Promise.all(
    ids.map((id, sort) => access.client.from(table).update({ sort }).eq("id", id)),
  );
  const failed = results.find((result) => result.error);
  if (failed) return { ok: false, error: failed.error.message };
  publish();
  return { ok: true };
}
