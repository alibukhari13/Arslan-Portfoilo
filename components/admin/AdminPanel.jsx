"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { copy as copyDefaults } from "@/data/site";
import { lists, singles } from "@/lib/collections";
import { loadAdmin, removeRecord, reorderRecords, saveCopy, saveProfile, saveRecord } from "@/app/admin/actions";
import { Mark } from "@/components/ui/Icons";
import { adminPages } from "@/components/admin/pages";

const listSpecs = Object.fromEntries(lists.map((item) => [item.id, { ...item, kind: "list" }]));
const profileFieldMap = Object.fromEntries(singles[0].fields.map((field) => [field.key, field]));
const legalSpec = listSpecs.legal_pages;

const copyLabels = {
  navCta: "Navigation button",
  heroStudio: "Hero second word",
  introStatement: "Home intro statement",
  toolsLabel: "Tools label",
  servicesTitle: "Home services heading",
  servicesPageLead: "Services page, first line",
  servicesPageRest: "Services page, second line",
  servicesButton: "View all services button",
  projectsTitle: "Home projects heading",
  projectsPageTitle: "Projects page heading",
  projectsPageText: "Projects page text",
  projectsLoadMore: "Load more button",
  projectsViewAll: "View all projects button",
  projectLive: "View live link button",
  projectOverviewTitle: "Project overview heading",
  projectChallengeTitle: "Challenge heading",
  projectSolutionTitle: "Solution heading",
  projectImpactTitle: "Project impact heading",
  projectMoreTitle: "More projects heading",
  metaClient: "Client label",
  metaCategory: "Category label",
  metaYear: "Year label",
  metaServices: "Services label",
  processTitleLead: "Process heading",
  processTitleRest: "Process heading, muted part",
  pricingTitle: "Pricing heading",
  pricingIntro: "Pricing intro",
  pricingExtraTitle: "Extra services heading",
  pricingNote: "Pricing note",
  pricingPer: "Per project label",
  pricingRetainer: "Retainer label",
  pricingSave: "Retainer savings note",
  pricingIncluded: "What's included label",
  pricingPopular: "Popular badge",
  pricingStart: "Pricing button",
  pricingMonth: "Monthly unit",
  pricingProject: "Project unit",
  faqTitle: "FAQ heading",
  contactTitle: "Home contact heading",
  contactPageTitle: "Contact page heading",
  contactPageText: "Contact page text",
  contactEmailLabel: "Email label",
  contactPhoneLabel: "Phone label",
  contactLocationLabel: "Location label",
  contactHoursLabel: "Hours label",
  contactStart: "Start a conversation button",
  formName: "Form name label",
  formEmail: "Form email label",
  formMessage: "Form message label",
  formNamePlaceholder: "Name placeholder",
  formEmailPlaceholder: "Email placeholder",
  formMessagePlaceholder: "Home message placeholder",
  formMessagePagePlaceholder: "Contact page message placeholder",
  formSend: "Send button",
  formSentTitle: "Sent title",
  formSentBody: "Sent note",
  formMailSubject: "Inquiry email subject",
  aboutLead: "About heading",
  aboutRest: "About heading, muted part",
  aboutName: "About name",
  aboutImage: "About image link",
  aboutImageAlt: "About image description",
  aboutKicker: "About kicker",
  aboutResume: "Resume button",
  aboutTogether: "Work together button",
  experienceTitle: "Experience heading",
  studyTitle: "Study heading",
  studyNote: "Study note",
  studyNoteCode: "Study note code",
  studyNoteHref: "Study note link",
  valuesLead: "Values heading",
  valuesRest: "Values heading, muted part",
  principlesTitle: "Project notes heading",
  principlesNote: "Project notes count",
  certificatesLead: "Certificates heading",
  certificatesRest: "Certificates heading, muted part",
  newsletterTitle: "Newsletter heading",
  footerPages: "Footer pages label",
  footerResources: "Footer resources label",
  footerFollow: "Footer follow label",
  footerEmail: "Footer email label",
  footerRights: "Copyright line",
  footerPlaceholder: "Newsletter placeholder",
  footerNote: "Newsletter note",
  footerNoteDone: "Newsletter sent note",
  footerSend: "Newsletter send label",
  footerMailSubject: "Newsletter email subject",
  footerMailBody: "Newsletter email line",
  legalUpdated: "Legal date prefix",
  skipToContent: "Skip link",
  notFoundKicker: "Missing page kicker",
  notFoundTitle: "Missing page heading",
  notFoundButton: "Missing page button",
};

const copyHints = {
  contactPageText: "Saved with the contact page. The current layout does not show this paragraph.",
};

const inputClass = "h-11 w-full border border-white/12 bg-[#101010] px-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-lime";
const areaClass = "w-full border border-white/12 bg-[#101010] px-3 py-3 text-sm leading-6 text-white outline-none transition-colors placeholder:text-white/30 focus:border-lime";
const labelClass = "mb-2 block text-[11px] font-medium uppercase tracking-[0.14em] text-white/45";
const primaryBtn = "inline-flex h-11 items-center justify-center bg-lime px-5 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink transition-transform hover:-translate-y-px disabled:translate-y-0 disabled:opacity-40";
const quietBtn = "inline-flex h-8 items-center justify-center border border-white/12 px-2.5 text-[11px] font-medium uppercase tracking-[0.12em] text-white/70 transition-colors hover:border-white/35 hover:text-white disabled:cursor-not-allowed disabled:opacity-30";
const iconBtn = "grid h-8 w-8 place-items-center border border-white/12 text-sm text-white/70 transition-colors hover:border-white/35 hover:text-white disabled:cursor-not-allowed disabled:opacity-30";

function blank(spec) {
  const row = { id: null, sort: 0 };
  spec.fields.forEach((field) => {
    if (field.type === "lines" || field.type === "shots") row[field.key] = field.type === "shots" ? ["", "", ""] : [];
    else if (field.type === "sections") row[field.key] = [{ heading: "", text: "" }];
    else if (field.type === "bool") row[field.key] = false;
    else if (field.type === "number") row[field.key] = 0;
    else if (field.type === "select") row[field.key] = field.options[0];
    else row[field.key] = "";
  });
  return row;
}

function copyIsLong(name) {
  const fallback = typeof copyDefaults[name] === "string" ? copyDefaults[name] : "";
  return fallback.length > 80 || fallback.includes("\n") || /Title|Statement|Intro|Text|Lead|Rest|Note$/.test(name);
}

function fieldWide(field) {
  return ["textarea", "lines", "shots", "sections", "image"].includes(field.type);
}

function ImagePreview({ src }) {
  if (typeof src !== "string" || !src.trim()) return null;
  const value = src.trim();
  if (!value.startsWith("/") && !value.startsWith("http")) return null;
  return <img src={value} alt="" className="mt-3 h-20 w-32 border border-white/10 bg-[#101010] object-cover" />;
}

function FieldInput({ field, value, onChange }) {
  if (field.type === "textarea" || field.type === "lines") {
    const shown = field.type === "lines" ? (Array.isArray(value) ? value.join("\n") : "") : value || "";
    return (
      <textarea
        rows={field.type === "lines" ? 5 : 4}
        className={areaClass}
        value={shown}
        onChange={(event) => onChange(field.type === "lines" ? event.target.value.split("\n") : event.target.value)}
      />
    );
  }
  if (field.type === "shots") {
    const shots = [0, 1, 2].map((index) => (Array.isArray(value) ? value[index] || "" : ""));
    const labels = ["Left photo", "Right photo", "Wide photo"];
    return (
      <div className="grid gap-3">
        {labels.map((label, index) => (
          <label key={label} className="block">
            <span className={labelClass}>{label}</span>
            <input
              className={inputClass}
              placeholder="https://..."
              value={shots[index]}
              onChange={(event) => {
                const next = [...shots];
                next[index] = event.target.value;
                onChange(next);
              }}
            />
          </label>
        ))}
      </div>
    );
  }
  if (field.type === "bool") {
    return (
      <label className="flex h-11 items-center gap-3 border border-white/12 bg-[#101010] px-3 text-sm">
        <input type="checkbox" checked={Boolean(value)} onChange={(event) => onChange(event.target.checked)} />
        {field.label}
      </label>
    );
  }
  if (field.type === "number") {
    return <input type="number" className={inputClass} value={value ?? 0} onChange={(event) => onChange(Number(event.target.value))} />;
  }
  if (field.type === "select") {
    return (
      <select className={inputClass} value={value || field.options[0]} onChange={(event) => onChange(event.target.value)}>
        {field.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }
  if (field.type === "sections") {
    const sections = Array.isArray(value) && value.length ? value : [{ heading: "", text: "" }];
    return (
      <div className="space-y-3">
        {sections.map((section, index) => (
          <div key={index} className="space-y-2 border border-white/10 bg-[#101010] p-3">
            <input
              className={inputClass}
              placeholder="Heading"
              value={section.heading || ""}
              onChange={(event) => onChange(sections.map((item, itemIndex) => (itemIndex === index ? { ...item, heading: event.target.value } : item)))}
            />
            <textarea
              rows={3}
              className={areaClass}
              placeholder="Text"
              value={section.text || ""}
              onChange={(event) => onChange(sections.map((item, itemIndex) => (itemIndex === index ? { ...item, text: event.target.value } : item)))}
            />
            <button
              type="button"
              className="text-[11px] uppercase tracking-[0.14em] text-white/45 hover:text-white"
              onClick={() => onChange(sections.filter((_, itemIndex) => itemIndex !== index))}
            >
              Remove section
            </button>
          </div>
        ))}
        <button type="button" className={quietBtn} onClick={() => onChange([...sections, { heading: "", text: "" }])}>
          Add section
        </button>
      </div>
    );
  }
  return (
    <input
      className={inputClass}
      placeholder={field.type === "image" ? "https://..." : ""}
      value={value || ""}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

function CopyField({ name, value, onChange }) {
  return copyIsLong(name) ? (
    <textarea rows={3} className={areaClass} value={value || ""} onChange={(event) => onChange(event.target.value)} />
  ) : (
    <input className={inputClass} value={value || ""} onChange={(event) => onChange(event.target.value)} />
  );
}

const emptyCertificate = { title: "", issuer: "", date: "", code: "", image: "", href: "" };

function CertificatesEditor({ items, onChange }) {
  const list = Array.isArray(items) ? items : [];

  function update(index, key, value) {
    onChange(list.map((item, itemIndex) => (itemIndex === index ? { ...item, [key]: value } : item)));
  }

  function move(index, direction) {
    const target = index + direction;
    if (target < 0 || target >= list.length) return;
    const next = [...list];
    const [row] = next.splice(index, 1);
    next.splice(target, 0, row);
    onChange(next);
  }

  const fields = [
    ["title", "Title"],
    ["issuer", "Issuer"],
    ["date", "Date"],
    ["code", "Code"],
    ["image", "Image link"],
    ["href", "Open link"],
  ];

  return (
    <div className="space-y-4">
      {list.map((item, index) => (
        <article key={`${item.code || "cert"}-${index}`} className="border border-white/10 bg-panel">
          <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
            <span className="w-7 shrink-0 text-xs text-white/35">{String(index + 1).padStart(2, "0")}</span>
            <p className="min-w-0 flex-1 truncate text-sm">{item.title || "New certificate"}</p>
            <div className="flex shrink-0 items-center gap-1">
              <button type="button" className={iconBtn} aria-label="Move up" disabled={index === 0} onClick={() => move(index, -1)}>↑</button>
              <button type="button" className={iconBtn} aria-label="Move down" disabled={index === list.length - 1} onClick={() => move(index, 1)}>↓</button>
              <button type="button" className={`${quietBtn} text-red-300 hover:text-red-200`} onClick={() => onChange(list.filter((_, itemIndex) => itemIndex !== index))}>Delete</button>
            </div>
          </div>
          <div className="grid gap-4 p-4 sm:grid-cols-2">
            {fields.map(([key, label]) => (
              <label key={key} className={key === "image" || key === "href" ? "block sm:col-span-2" : "block"}>
                <span className={labelClass}>{label}</span>
                <input className={inputClass} value={item[key] || ""} placeholder={key === "image" || key === "href" ? "https://..." : ""} onChange={(event) => update(index, key, event.target.value)} />
                {key === "image" ? <ImagePreview src={item.image} /> : null}
              </label>
            ))}
          </div>
        </article>
      ))}
      <button type="button" className="flex h-12 w-full items-center justify-center border border-dashed border-white/20 text-[12px] font-medium uppercase tracking-[0.14em] text-lime hover:border-lime" onClick={() => onChange([...list, { ...emptyCertificate }])}>
        Add certificate
      </button>
    </div>
  );
}

function Fields({ spec, value, onChange }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {spec.fields.map((field) => (
        <div key={field.key} className={fieldWide(field) ? "sm:col-span-2" : ""}>
          {field.type === "bool" ? null : <span className={labelClass}>{field.label}</span>}
          <FieldInput field={field} value={value[field.key]} onChange={(next) => onChange({ ...value, [field.key]: next })} />
          {field.type === "image" ? <ImagePreview src={value[field.key]} /> : null}
          {field.hint ? <span className="mt-2 block text-xs leading-5 text-white/40">{field.hint}</span> : null}
        </div>
      ))}
    </div>
  );
}

function SaveBar({ busy, label, sticky = true }) {
  return (
    <div className={sticky ? "sticky bottom-5 z-20 mt-8 flex justify-end" : "mt-8 flex justify-end"}>
      <button disabled={busy} className={`${primaryBtn} ${sticky ? "shadow-[0_16px_40px_rgba(0,0,0,0.55)]" : ""}`}>
        {busy ? "Saving" : label}
      </button>
    </div>
  );
}

function cleanCertificates(items) {
  return (Array.isArray(items) ? items : [])
    .map((item) => ({
      title: String(item.title || "").trim(),
      issuer: String(item.issuer || "").trim(),
      date: String(item.date || "").trim(),
      code: String(item.code || "").trim(),
      image: String(item.image || "").trim(),
      href: String(item.href || "").trim(),
    }))
    .filter((item) => item.title || item.image || item.href);
}

function profileSpec(keys = []) {
  return { fields: keys.map((key) => profileFieldMap[key]).filter(Boolean) };
}

function listKey(list) {
  return `${list.id}:${list.group || "all"}`;
}

function RecordList({ list, rows, query, onQuery, adding, onAdding, drafts, setDrafts, busy, onMove, onSave, onDelete }) {
  const spec = listSpecs[list.id];
  const key = listKey(list);
  const fields = list.group ? spec.fields.filter((field) => field.key !== "group_name") : spec.fields;
  const visibleSpec = { ...spec, fields };
  const needle = query.trim().toLowerCase();
  const shown = needle ? rows.filter((item) => String(item[spec.titleKey] || "").toLowerCase().includes(needle)) : rows;

  return (
    <div>
      <div className="mb-3">
        <h2 className="text-sm uppercase tracking-[0.14em]">{list.title}</h2>
        {list.note ? <p className="mt-2 max-w-2xl text-sm leading-6 text-white/50">{list.note}</p> : null}
      </div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          className={`${inputClass} sm:flex-1`}
          value={query}
          onChange={(event) => onQuery(event.target.value)}
          placeholder={`Search ${list.title.toLowerCase()}`}
          aria-label={`Search ${list.title}`}
        />
        <button type="button" className={`${primaryBtn} shrink-0`} onClick={() => onAdding(!adding)}>
          {adding ? "Close" : "Add new"}
        </button>
      </div>
      {needle ? <p className="mb-3 text-xs text-white/40">Clear the search before changing order.</p> : null}
      {adding ? (
        <form
          className="mb-4 space-y-4 border border-dashed border-white/20 bg-panel p-5"
          onSubmit={(event) => {
            event.preventDefault();
            const draft = { ...(drafts[`${key}-new`] || blank(visibleSpec)), ...(list.group ? { group_name: list.group } : {}) };
            const sort = rows.reduce((max, row) => Math.max(max, Number(row.sort) || 0), -1) + 1;
            onSave(spec.table, { ...draft, sort }, `${key}-new`);
          }}
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-[11px] uppercase tracking-[0.16em] text-lime">New item</p>
            <button type="button" className={quietBtn} onClick={() => onAdding(false)}>Cancel</button>
          </div>
          <Fields spec={visibleSpec} value={drafts[`${key}-new`] || blank(visibleSpec)} onChange={(next) => setDrafts({ ...drafts, [`${key}-new`]: next })} />
          <div className="flex justify-end">
            <button disabled={busy} className={primaryBtn}>Add</button>
          </div>
        </form>
      ) : null}
      <div className="border border-white/10 bg-panel">
        {shown.length ? shown.map((item) => {
          const index = rows.findIndex((row) => row.id === item.id);
          const open = drafts[key]?.id === item.id;
          const title = item[spec.titleKey] || "Untitled";
          return (
            <article key={item.id} className="border-b border-white/10 last:border-b-0">
              <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center">
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <span className="w-7 shrink-0 text-xs text-white/35">{String(index + 1).padStart(2, "0")}</span>
                  <button type="button" className="min-w-0 flex-1 truncate text-left text-sm" onClick={() => setDrafts({ ...drafts, [key]: open ? null : { ...item } })}>
                    {title}
                  </button>
                </div>
                <div className="flex shrink-0 items-center gap-1 pl-10 sm:pl-0">
                  <button type="button" className={iconBtn} aria-label="Move up" disabled={Boolean(needle) || index === 0 || busy} onClick={() => onMove(spec.table, rows, index, -1)}>↑</button>
                  <button type="button" className={iconBtn} aria-label="Move down" disabled={Boolean(needle) || index === rows.length - 1 || busy} onClick={() => onMove(spec.table, rows, index, 1)}>↓</button>
                  <button type="button" className={quietBtn} onClick={() => setDrafts({ ...drafts, [key]: { ...item } })}>Edit</button>
                  <button type="button" className={`${quietBtn} text-red-300 hover:text-red-200`} onClick={() => onDelete(spec.table, item.id, title)}>Delete</button>
                </div>
              </div>
              {open ? (
                <form
                  className="space-y-4 border-t border-white/10 bg-[#101010] px-4 py-5"
                  onSubmit={(event) => {
                    event.preventDefault();
                    onSave(spec.table, { ...drafts[key], ...(list.group ? { group_name: list.group } : {}) });
                  }}
                >
                  <Fields spec={visibleSpec} value={drafts[key]} onChange={(next) => setDrafts({ ...drafts, [key]: next })} />
                  <div className="flex justify-end">
                    <button disabled={busy} className={primaryBtn}>Save</button>
                  </div>
                </form>
              ) : null}
            </article>
          );
        }) : (
          <p className="px-4 py-8 text-sm text-white/45">{needle ? "Nothing matches that search." : "Nothing here yet."}</p>
        )}
      </div>
    </div>
  );
}

export default function AdminPanel({ initialAuthed }) {
  const [authed, setAuthed] = useState(initialAuthed);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState("home-hero");
  const [menu, setMenu] = useState("home");
  const [data, setData] = useState(null);
  const [profile, setProfile] = useState(null);
  const [copy, setCopy] = useState(copyDefaults);
  const [drafts, setDrafts] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [queries, setQueries] = useState({});
  const [adding, setAdding] = useState("");

  async function refresh() {
    const result = await loadAdmin();
    if (!result.ok) {
      setError(result.error || "Could not load the database.");
      if (result.error === "Sign in again.") setAuthed(false);
      return;
    }
    setData(result.data);
    setProfile(result.data.profile || {});
    setCopy({ ...copyDefaults, ...(result.data.site_copy || {}) });
    setError("");
  }

  useEffect(() => {
    if (authed) refresh();
  }, [authed]);

  useEffect(() => {
    setQueries({});
    setAdding("");
  }, [tab]);

  async function login(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) {
        setError(result.error || "Login failed.");
        return;
      }
      setAuthed(true);
      setPassword("");
    } catch {
      setError("Could not reach the login route.");
    } finally {
      setBusy(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
    setData(null);
  }

  function note(text) {
    setMessage(text);
    window.setTimeout(() => setMessage(""), 2200);
  }

  async function run(action, success) {
    setBusy(true);
    setError("");
    const result = await action();
    setBusy(false);
    if (!result.ok) {
      setError(result.error || "Save failed.");
      return false;
    }
    await refresh();
    note(success);
    return true;
  }

  async function moveRows(table, rows, index, direction) {
    const next = [...rows];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    const [row] = next.splice(index, 1);
    next.splice(target, 0, row);
    const all = data?.[table] || [];
    const moving = new Set(rows.map((item) => item.id));
    const queue = [...next];
    const ids = all.map((item) => (moving.has(item.id) ? queue.shift().id : item.id));
    await run(() => reorderRecords(table, ids), "Order saved.");
  }

  function saveRow(table, record, draftKey) {
    run(async () => {
      const result = await saveRecord(table, record);
      if (result.ok && draftKey) {
        setDrafts((currentDrafts) => ({ ...currentDrafts, [draftKey]: blank(listSpecs[table] || { fields: [] }) }));
        setAdding("");
      }
      return result;
    }, draftKey ? "Added." : "Saved.");
  }

  function deleteRow(table, id, title) {
    if (window.confirm(`Delete “${title}”?`)) run(() => removeRecord(table, id), "Deleted.");
  }

  const sections = useMemo(
    () => adminPages.flatMap((page) => page.sections.map((section, index) => ({ ...section, page, number: index + 1 }))),
    [],
  );
  const current = sections.find((section) => section.id === tab) || sections[0];

  function sectionCount(section) {
    if (!data) return null;
    if (section.certs) return Array.isArray(copy.certificates) ? copy.certificates.length : 0;
    if (section.lists?.length !== 1) return null;
    const spec = listSpecs[section.lists[0].id];
    const rows = data[spec.table] || [];
    return section.lists[0].group ? rows.filter((row) => row.group_name === section.lists[0].group).length : rows.length;
  }

  function saveText(event) {
    event.preventDefault();
    run(async () => {
      if (current.legalSlug) {
        const key = `legal:${current.legalSlug}`;
        const existing = (data.legal_pages || []).find((row) => row.slug === current.legalSlug);
        const draft = drafts[key] || existing || { title: "", updated_label: "", lede: "", sections: [] };
        const saved = await saveRecord("legal_pages", { ...draft, slug: current.legalSlug, id: existing?.id || draft.id || null });
        if (!saved.ok) return saved;
      }
      if (current.profileKeys?.length) {
        const saved = await saveProfile(profile);
        if (!saved.ok) return saved;
      }
      if (current.copyKeys?.length || current.certs) {
        const next = current.certs ? { ...copy, certificates: cleanCertificates(copy.certificates) } : copy;
        const saved = await saveCopy(next);
        if (!saved.ok) return saved;
      }
      return { ok: true };
    }, "Saved.");
  }

  const hasText = Boolean(current.profileKeys?.length || current.copyKeys?.length || current.legalSlug || current.certs);
  const legalExisting = (data?.legal_pages || []).find((row) => row.slug === current.legalSlug);
  const legalDraft = current.legalSlug
    ? drafts[`legal:${current.legalSlug}`] || legalExisting || { slug: current.legalSlug, title: "", updated_label: "", lede: "", sections: [{ heading: "", text: "" }] }
    : null;

  if (!authed) {
    return (
      <main className="admin-ui grid min-h-svh place-items-center bg-ink px-5 text-white">
        <form onSubmit={login} className="w-full max-w-[420px] border border-white/10 bg-panel">
          <div className="h-1 bg-lime" />
          <div className="p-8">
            <div className="flex items-center gap-3 text-lime">
              <Mark />
              <p className="text-[11px] uppercase tracking-[0.18em]">Arslan Sabir</p>
            </div>
            <h1 className="mt-6 text-[2.4rem] leading-none">Studio admin</h1>
            <p className="mt-3 text-sm leading-6 text-white/55">Sign in to edit the portfolio. Photos are added as links.</p>
            <label className="mt-8 block">
              <span className={labelClass}>Email</span>
              <input className={inputClass} type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </label>
            <label className="mt-4 block">
              <span className={labelClass}>Password</span>
              <input className={inputClass} type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
            </label>
            {error ? <p className="mt-4 border border-red-400/30 bg-red-400/10 px-3 py-2 text-sm text-red-200">{error}</p> : null}
            <button type="submit" disabled={busy} className={`${primaryBtn} mt-6 w-full`}>
              {busy ? "Signing in" : "Sign in"}
            </button>
          </div>
        </form>
      </main>
    );
  }

  return (
    <main className="admin-ui min-h-svh bg-ink text-white lg:flex">
      <aside className="hidden w-[272px] shrink-0 border-r border-white/10 lg:sticky lg:top-0 lg:flex lg:h-svh lg:flex-col">
        <div className="flex items-center gap-3 px-5 py-6">
          <span className="text-lime"><Mark /></span>
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-lime">Studio</p>
            <p className="mt-0.5 text-sm text-white/70">Admin</p>
          </div>
        </div>
        <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto px-3 pb-6">
          {adminPages.map((page) => {
            const open = menu === page.id;
            return (
              <div key={page.id}>
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => {
                    const next = open ? "" : page.id;
                    setMenu(next);
                    if (next && !page.sections.some((section) => section.id === tab)) setTab(page.sections[0].id);
                  }}
                  className={`flex h-10 w-full items-center justify-between px-3 text-left text-sm ${open || current.page.id === page.id ? "text-white" : "text-white/60 hover:text-white"}`}
                >
                  <span className="truncate">{page.title}</span>
                  <span className={`text-[10px] text-white/40 transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
                </button>
                {open ? (
                  <div className="space-y-0.5 pb-2">
                    <p className="px-3 pb-1 text-[10px] text-white/30">{page.href}</p>
                    {page.sections.map((section, index) => {
                      const active = tab === section.id;
                      const itemCount = sectionCount(section);
                      return (
                        <button
                          key={section.id}
                          type="button"
                          onClick={() => setTab(section.id)}
                          className={`flex h-9 w-full items-center gap-2 px-3 text-left text-sm ${active ? "border-l-2 border-lime bg-white/[0.06] text-white" : "border-l-2 border-transparent text-white/60 hover:bg-white/[0.04] hover:text-white"}`}
                        >
                          <span className="w-5 shrink-0 text-[11px] text-white/35">{String(index + 1).padStart(2, "0")}</span>
                          <span className="min-w-0 flex-1 truncate">{section.label}</span>
                          {itemCount != null ? <span className="text-[11px] text-white/35">{itemCount}</span> : null}
                        </button>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>
        <div className="flex items-center justify-between border-t border-white/10 px-5 py-4">
          <Link href="/" className="text-[11px] uppercase tracking-[0.14em] text-white/60 hover:text-white">View site</Link>
          <button type="button" onClick={logout} className="text-[11px] uppercase tracking-[0.14em] text-white/60 hover:text-white">Log out</button>
        </div>
      </aside>

      <section className="min-w-0 flex-1">
        <div className="sticky top-0 z-30 border-b border-white/10 bg-[#0e0e0e]/95 backdrop-blur lg:hidden">
          <div className="flex items-center justify-between px-5 py-3">
            <p className="text-[11px] uppercase tracking-[0.18em] text-lime">Admin</p>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-[11px] uppercase tracking-[0.14em] text-white/70">View site</Link>
              <button type="button" onClick={logout} className="text-[11px] uppercase tracking-[0.14em] text-white/70">Log out</button>
            </div>
          </div>
          <div className="space-y-2 px-5 pb-3">
            <label className="block">
              <span className={labelClass}>Page</span>
              <select
                className={inputClass}
                value={current.page.id}
                onChange={(event) => {
                  const page = adminPages.find((item) => item.id === event.target.value);
                  setMenu(page.id);
                  setTab(page.sections[0].id);
                }}
              >
                {adminPages.map((page) => (
                  <option key={page.id} value={page.id}>{page.title}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className={labelClass}>Section</span>
              <select id="admin-section" className={inputClass} value={tab} onChange={(event) => setTab(event.target.value)}>
                {current.page.sections.map((section, index) => (
                  <option key={section.id} value={section.id}>{String(index + 1).padStart(2, "0")} {section.label}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-5 py-8 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-lime">{current.page.title} · {String(current.number).padStart(2, "0")}</p>
              <h1 className="mt-2 text-[2rem] leading-none">{current.label}</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55">{current.updates}</p>
            </div>
            <span className="hidden lg:inline-flex">
              <Link href={current.page.href} className={`${quietBtn} h-10 px-4`}>{current.page.id === "chrome" ? "View site" : `View ${current.page.title}`}</Link>
            </span>
          </div>

          {message ? <p className="mt-5 border border-lime/30 bg-lime/10 px-3 py-2 text-sm text-lime">{message}</p> : null}
          {error ? <p className="mt-5 border border-red-400/30 bg-red-400/10 px-3 py-2 text-sm text-red-200">{error}</p> : null}
          {!data ? <p className="mt-8 text-sm text-white/50">Loading content…</p> : null}

          {data && hasText ? (
            <form className="mt-8 space-y-4" onSubmit={saveText}>
              {current.profileKeys?.length ? (
                <section className="border border-white/10 bg-panel">
                  <header className="border-b border-white/10 px-5 py-4">
                    <h2 className="text-sm uppercase tracking-[0.14em]">Details in this section</h2>
                  </header>
                  <div className="p-5">
                    <Fields spec={profileSpec(current.profileKeys)} value={profile || {}} onChange={setProfile} />
                  </div>
                </section>
              ) : null}
              {current.copyKeys?.length ? (
                <section className="border border-white/10 bg-panel">
                  <header className="border-b border-white/10 px-5 py-4">
                    <h2 className="text-sm uppercase tracking-[0.14em]">Words in this section</h2>
                  </header>
                  <div className="grid gap-4 p-5 sm:grid-cols-2">
                    {current.copyKeys.filter((key) => typeof copyDefaults[key] === "string").map((key) => (
                      <label key={key} className={copyIsLong(key) ? "block sm:col-span-2" : "block"}>
                        <span className={labelClass}>{copyLabels[key] || key}</span>
                        <CopyField name={key} value={copy[key]} onChange={(next) => setCopy({ ...copy, [key]: next })} />
                        {copyHints[key] ? <span className="mt-2 block text-xs leading-5 text-white/40">{copyHints[key]}</span> : null}
                        {/image/i.test(key) && !/alt/i.test(key) ? <ImagePreview src={copy[key]} /> : null}
                      </label>
                    ))}
                  </div>
                </section>
              ) : null}
              {current.legalSlug ? (
                <section className="border border-white/10 bg-panel">
                  <header className="border-b border-white/10 px-5 py-4">
                    <h2 className="text-sm uppercase tracking-[0.14em]">Page content</h2>
                  </header>
                  <div className="p-5">
                    <Fields
                      spec={{ fields: legalSpec.fields.filter((field) => field.key !== "slug") }}
                      value={legalDraft}
                      onChange={(next) => setDrafts({ ...drafts, [`legal:${current.legalSlug}`]: { ...next, slug: current.legalSlug } })}
                    />
                  </div>
                </section>
              ) : null}
              {current.certs ? <CertificatesEditor items={copy.certificates} onChange={(certificates) => setCopy({ ...copy, certificates })} /> : null}
              <SaveBar busy={busy} sticky={!current.lists?.length} label="Save this section" />
            </form>
          ) : null}

          {data && current.lists?.length ? (
            <div className={`space-y-8 ${hasText ? "mt-10" : "mt-8"}`}>
              {current.lists.map((list) => {
                const spec = listSpecs[list.id];
                const rows = (data[spec.table] || []).filter((row) => (list.group ? row.group_name === list.group : true));
                const key = listKey(list);
                return (
                  <RecordList
                    key={key}
                    list={list}
                    rows={rows}
                    query={queries[key] || ""}
                    onQuery={(value) => setQueries({ ...queries, [key]: value })}
                    adding={adding === key}
                    onAdding={(open) => setAdding(open ? key : "")}
                    drafts={drafts}
                    setDrafts={setDrafts}
                    busy={busy}
                    onMove={moveRows}
                    onSave={saveRow}
                    onDelete={deleteRow}
                  />
                );
              })}
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
