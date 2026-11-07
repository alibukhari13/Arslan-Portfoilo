import { readFileSync, writeFileSync } from "node:fs";

const source = readFileSync(new URL("../data/site.js", import.meta.url), "utf8").replace(/export const /g, "const ");
const site = new Function(`${source}\nreturn { profile, nav, footerNav, resourceNav, tools, stats, services, projects, process, plans, extraServices, principles, faqs, values, experience, credentials, highlights, legal, copy };`)();

const q = (value) => {
  if (value === null || value === undefined) return "null";
  return `'${String(value).replace(/'/g, "''")}'`;
};

const textArray = (list) => {
  const items = Array.isArray(list) ? list : [];
  if (!items.length) return "'{}'::text[]";
  return `array[${items.map(q).join(", ")}]::text[]`;
};

const json = (value) => `${q(JSON.stringify(value))}::jsonb`;

const listTables = [
  "socials",
  "tools",
  "stats",
  "services",
  "projects",
  "process_steps",
  "plans",
  "extra_services",
  "principles",
  "faqs",
  "values",
  "experience",
  "highlights",
  "credentials",
  "legal_pages",
  "links",
];

function policy(name) {
  return `
alter table public.${name} enable row level security;
drop policy if exists "public read" on public.${name};
create policy "public read" on public.${name}
  for select to anon, authenticated
  using (true);
grant select on public.${name} to anon, authenticated;
grant all on public.${name} to service_role;`;
}

const ddl = `
-- Portfolio content. Visitors can read. Writes go through the server admin.
${["profile", "site_copy", ...listTables].map((name) => `drop table if exists public.${name} cascade;`).join("\n")}

create table public.profile (
  id int primary key,
  name text not null default '',
  wordmark text not null default '',
  role text not null default '',
  location text not null default '',
  phone text not null default '',
  phone_href text not null default '',
  email text not null default '',
  resume text not null default '',
  portrait text not null default '',
  availability text not null default '',
  eyebrow text not null default '',
  tagline text not null default '',
  hours text[] not null default '{}',
  intro text not null default '',
  about text not null default '',
  constraint profile_singleton check (id = 1)
);

create table public.site_copy (
  id int primary key,
  data jsonb not null default '{}'::jsonb,
  constraint site_copy_singleton check (id = 1)
);

create table public.socials (
  id bigint generated always as identity primary key,
  label text not null default '',
  name text not null default '',
  href text not null default '',
  sort int not null default 0
);

create table public.tools (
  id bigint generated always as identity primary key,
  label text not null default '',
  sort int not null default 0
);

create table public.stats (
  id bigint generated always as identity primary key,
  value text not null default '',
  label text not null default '',
  sort int not null default 0
);

create table public.services (
  id bigint generated always as identity primary key,
  number text not null default '',
  title text not null default '',
  image text not null default '',
  description text not null default '',
  tags text[] not null default '{}',
  sort int not null default 0
);

create table public.projects (
  id bigint generated always as identity primary key,
  slug text not null unique,
  title text not null default '',
  client text not null default '',
  category text not null default '',
  year text not null default '',
  services text not null default '',
  image text not null default '',
  summary text not null default '',
  sort int not null default 0
);

create table public.process_steps (
  id bigint generated always as identity primary key,
  number text not null default '',
  title text not null default '',
  image text not null default '',
  body text not null default '',
  sort int not null default 0
);

create table public.plans (
  id bigint generated always as identity primary key,
  name text not null default '',
  blurb text not null default '',
  project_price int not null default 0,
  retainer_price int not null default 0,
  popular boolean not null default false,
  features text[] not null default '{}',
  sort int not null default 0
);

create table public.extra_services (
  id bigint generated always as identity primary key,
  label text not null default '',
  sort int not null default 0
);

create table public.principles (
  id bigint generated always as identity primary key,
  quote text not null default '',
  name text not null default '',
  role text not null default '',
  image text not null default '',
  sort int not null default 0
);

create table public.faqs (
  id bigint generated always as identity primary key,
  question text not null default '',
  answer text not null default '',
  sort int not null default 0
);

create table public.values (
  id bigint generated always as identity primary key,
  title text not null default '',
  body text not null default '',
  image text not null default '',
  sort int not null default 0
);

create table public.experience (
  id bigint generated always as identity primary key,
  company text not null default '',
  role text not null default '',
  when_label text not null default '',
  place text not null default '',
  body text not null default '',
  sort int not null default 0
);

create table public.highlights (
  id bigint generated always as identity primary key,
  kicker text not null default '',
  title text not null default '',
  body text not null default '',
  sort int not null default 0
);

create table public.credentials (
  id bigint generated always as identity primary key,
  year text not null default '',
  title text not null default '',
  detail text not null default '',
  org text not null default '',
  sort int not null default 0
);

create table public.legal_pages (
  id bigint generated always as identity primary key,
  slug text not null unique,
  title text not null default '',
  updated_label text not null default '',
  lede text not null default '',
  sections jsonb not null default '[]'::jsonb,
  sort int not null default 0
);

create table public.links (
  id bigint generated always as identity primary key,
  group_name text not null default 'primary',
  label text not null default '',
  href text not null default '',
  sort int not null default 0
);

${["profile", "site_copy", ...listTables].map(policy).join("\n")}

grant usage, select on all sequences in schema public to service_role;
`;

const profile = site.profile;
const inserts = [];

inserts.push(`insert into public.profile (id, name, wordmark, role, location, phone, phone_href, email, resume, portrait, availability, eyebrow, tagline, hours, intro, about) values (
  1, ${q(profile.name)}, ${q(profile.wordmark)}, ${q(profile.role)}, ${q(profile.location)}, ${q(profile.phone)}, ${q(profile.phoneHref)}, ${q(profile.email)}, ${q(profile.resume)}, ${q(profile.portrait)}, ${q(profile.availability)}, ${q(profile.eyebrow)}, ${q(profile.tagline)}, ${textArray(profile.hours)}, ${q(profile.intro)}, ${q(profile.about)}
);`);

inserts.push(`insert into public.site_copy (id, data) values (1, ${json(site.copy)});`);

site.profile.socials.forEach((item, sort) => {
  inserts.push(`insert into public.socials (label, name, href, sort) values (${q(item.label)}, ${q(item.name)}, ${q(item.href)}, ${sort});`);
});
site.tools.forEach((label, sort) => {
  inserts.push(`insert into public.tools (label, sort) values (${q(label)}, ${sort});`);
});
site.stats.forEach((item, sort) => {
  inserts.push(`insert into public.stats (value, label, sort) values (${q(item.value)}, ${q(item.label)}, ${sort});`);
});
site.services.forEach((item, sort) => {
  inserts.push(`insert into public.services (number, title, image, description, tags, sort) values (${q(item.number)}, ${q(item.title)}, ${q(item.image)}, ${q(item.description)}, ${textArray(item.tags)}, ${sort});`);
});
site.projects.forEach((item, sort) => {
  inserts.push(`insert into public.projects (slug, title, client, category, year, services, image, summary, sort) values (${q(item.slug)}, ${q(item.title)}, ${q(item.client)}, ${q(item.category)}, ${q(item.year)}, ${q(item.services)}, ${q(item.image)}, ${q(item.summary)}, ${sort});`);
});
site.process.steps.forEach((item, sort) => {
  inserts.push(`insert into public.process_steps (number, title, image, body, sort) values (${q(item.number)}, ${q(item.title)}, ${q(item.image)}, ${q(item.text)}, ${sort});`);
});
site.plans.forEach((item, sort) => {
  inserts.push(`insert into public.plans (name, blurb, project_price, retainer_price, popular, features, sort) values (${q(item.name)}, ${q(item.blurb)}, ${Number(item.project) || 0}, ${Number(item.retainer) || 0}, ${item.popular ? "true" : "false"}, ${textArray(item.features)}, ${sort});`);
});
site.extraServices.forEach((label, sort) => {
  inserts.push(`insert into public.extra_services (label, sort) values (${q(label)}, ${sort});`);
});
site.principles.forEach((item, sort) => {
  inserts.push(`insert into public.principles (quote, name, role, image, sort) values (${q(item.quote)}, ${q(item.name)}, ${q(item.role)}, ${q(item.image)}, ${sort});`);
});
site.faqs.forEach((item, sort) => {
  inserts.push(`insert into public.faqs (question, answer, sort) values (${q(item.question)}, ${q(item.answer)}, ${sort});`);
});
site.values.forEach((item, sort) => {
  inserts.push(`insert into public.values (title, body, image, sort) values (${q(item.title)}, ${q(item.body || item.text)}, ${q(item.image || "")}, ${sort});`);
});
site.experience.forEach((item, sort) => {
  inserts.push(`insert into public.experience (company, role, when_label, place, body, sort) values (${q(item.company)}, ${q(item.role)}, ${q(item.when)}, ${q(item.place)}, ${q(item.text)}, ${sort});`);
});
site.highlights.forEach((item, sort) => {
  inserts.push(`insert into public.highlights (kicker, title, body, sort) values (${q(item.kicker)}, ${q(item.title)}, ${q(item.text)}, ${sort});`);
});
site.credentials.forEach((item, sort) => {
  inserts.push(`insert into public.credentials (year, title, detail, org, sort) values (${q(item.year)}, ${q(item.title)}, ${q(item.detail)}, ${q(item.org)}, ${sort});`);
});
[["privacy", site.legal.privacy, 0], ["terms", site.legal.terms, 1]].forEach(([slug, page, sort]) => {
  inserts.push(`insert into public.legal_pages (slug, title, updated_label, lede, sections, sort) values (${q(slug)}, ${q(page.title)}, ${q(page.updated)}, ${q(page.lede)}, ${json(page.sections)}, ${sort});`);
});
[
  ["primary", site.nav],
  ["footer", site.footerNav],
  ["resource", site.resourceNav],
].forEach(([group, items]) => {
  items.forEach((item, sort) => {
    inserts.push(`insert into public.links (group_name, label, href, sort) values (${q(group)}, ${q(item.label)}, ${q(item.href)}, ${sort});`);
  });
});

const sql = `${ddl}\n${inserts.join("\n")}\n`;
writeFileSync(new URL("../supabase/schema.sql", import.meta.url), sql);
console.log(`Wrote supabase/schema.sql (${sql.length} chars, ${inserts.length} inserts)`);
