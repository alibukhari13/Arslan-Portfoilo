import { cache } from "react";
import { connection } from "next/server";
import { projectStories } from "@/data/projectStories";
import * as data from "@/data/site";
import { publicClient } from "./supabase";

function parseImpacts(lines) {
  if (!Array.isArray(lines) || lines.length === 0) return [];
  return lines
    .map((line) => {
      const [value, ...rest] = String(line).split("|");
      return { value: value.trim(), label: rest.join("|").trim() };
    })
    .filter((item) => item.value || item.label);
}

function attachStory(project) {
  const story = projectStories[project.slug] || {};
  return {
    ...project,
    liveUrl: project.liveUrl || "",
    overview: project.overview || story.overview || project.summary || "",
    overviewNote: project.overviewNote || story.overviewNote || "",
    challenge: project.challenge || story.challenge || "",
    solution: project.solution || story.solution || "",
    impactIntro: project.impactIntro || story.impactIntro || "",
    impacts: project.impacts?.length ? project.impacts : story.impacts || [],
    gallery: project.gallery?.length ? project.gallery : [],
  };
}

function fallback() {
  return {
    profile: data.profile,
    nav: data.nav,
    footerNav: data.footerNav,
    resourceNav: data.resourceNav,
    tools: data.tools,
    stats: data.stats,
    services: data.services,
    projects: data.projects.map((item) => attachStory(item)),
    process: data.process,
    plans: data.plans,
    extraServices: data.extraServices,
    principles: data.principles,
    faqs: data.faqs,
    values: data.values,
    experience: data.experience,
    highlights: data.highlights,
    credentials: data.credentials,
    legal: data.legal,
    copy: data.copy,
  };
}

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

function bySort(rows) {
  return [...(rows || [])].sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));
}

function shape(bag) {
  const base = fallback();
  const profileRow = (bag.profile || []).find((row) => row.id === 1) || bag.profile?.[0];
  if (!profileRow) return base;

  const storedCopy = (bag.site_copy || []).find((row) => row.id === 1)?.data || {};
  const copy = { ...base.copy, ...storedCopy };
  if (!Array.isArray(copy.certificates)) copy.certificates = base.copy.certificates;
  const links = bySort(bag.links);
  const group = (name) => links.filter((item) => item.group_name === name).map((item) => ({ label: item.label, href: item.href }));
  const legalRows = bySort(bag.legal_pages);
  const legalPage = (slug, fallbackPage) => {
    const row = legalRows.find((item) => item.slug === slug);
    if (!row) return fallbackPage;
    return {
      title: row.title,
      updated: row.updated_label,
      lede: row.lede,
      sections: Array.isArray(row.sections) ? row.sections : [],
    };
  };

  return {
    profile: {
      name: profileRow.name,
      wordmark: profileRow.wordmark,
      role: profileRow.role,
      location: profileRow.location,
      phone: profileRow.phone,
      phoneHref: profileRow.phone_href,
      email: profileRow.email,
      resume: profileRow.resume,
      portrait: profileRow.portrait,
      portraitFallback: base.profile.portraitFallback,
      availability: profileRow.availability,
      eyebrow: profileRow.eyebrow,
      tagline: profileRow.tagline,
      hours: profileRow.hours || [],
      intro: profileRow.intro,
      about: profileRow.about,
      socials: bySort(bag.socials).map((item) => ({ label: item.label, name: item.name, href: item.href })),
    },
    nav: links.length ? group("primary") : base.nav,
    footerNav: links.length ? group("footer") : base.footerNav,
    resourceNav: links.length ? group("resource") : base.resourceNav,
    tools: bySort(bag.tools).map((item) => item.label),
    stats: bySort(bag.stats).map((item) => ({ value: item.value, label: item.label })),
    services: bySort(bag.services).map((item) => ({
      number: item.number,
      title: item.title,
      image: item.image,
      description: item.description,
      tags: item.tags || [],
    })),
    projects: bySort(bag.projects).map((item) =>
      attachStory({
        slug: item.slug,
        title: item.title,
        client: item.client,
        category: item.category,
        year: item.year,
        services: item.services,
        image: item.image,
        summary: item.summary,
        liveUrl: item.live_url,
        overview: item.overview,
        overviewNote: item.overview_note,
        challenge: item.challenge,
        solution: item.solution,
        impactIntro: item.impact_intro,
        impacts: parseImpacts(item.impact_lines),
        gallery: Array.isArray(item.gallery) ? item.gallery.map((src) => String(src || "").trim()) : [],
      }),
    ),
    process: {
      titleLead: copy.processTitleLead || base.process.titleLead,
      titleRest: copy.processTitleRest || base.process.titleRest,
      steps: bySort(bag.process_steps).map((item) => ({
        number: item.number,
        title: item.title,
        image: item.image,
        text: item.body,
      })),
    },
    plans: bySort(bag.plans).map((item) => ({
      name: item.name,
      blurb: item.blurb,
      project: item.project_price,
      retainer: item.retainer_price,
      popular: item.popular,
      features: item.features || [],
    })),
    extraServices: bySort(bag.extra_services).map((item) => item.label),
    principles: bySort(bag.principles).map((item) => ({
      quote: item.quote,
      name: item.name,
      role: item.role,
      image: item.image,
    })),
    faqs: bySort(bag.faqs).map((item) => ({ question: item.question, answer: item.answer })),
    values: bySort(bag.values).map((item) => ({ title: item.title, text: item.body, image: item.image })),
    experience: bySort(bag.experience).map((item) => ({
      company: item.company,
      role: item.role,
      when: item.when_label,
      place: item.place,
      text: item.body,
    })),
    highlights: bySort(bag.highlights).map((item) => ({ kicker: item.kicker, title: item.title, text: item.body })),
    credentials: bySort(bag.credentials).map((item) => ({
      year: item.year,
      title: item.title,
      detail: item.detail,
      org: item.org,
    })),
    legal: {
      privacy: legalPage("privacy", base.legal.privacy),
      terms: legalPage("terms", base.legal.terms),
    },
    copy,
  };
}

export const getSite = cache(async () => {
  await connection();
  const supabase = publicClient();
  if (!supabase) return fallback();

  try {
    const names = ["profile", "site_copy", ...listTables];
    const results = await Promise.all(
      names.map((name) => {
        const query = supabase.from(name).select("*");
        return name === "profile" || name === "site_copy" ? query : query.order("sort", { ascending: true });
      }),
    );
    if (results.some((result) => result.error)) return fallback();
    const bag = Object.fromEntries(names.map((name, index) => [name, results[index].data || []]));
    return shape(bag);
  } catch {
    return fallback();
  }
});
