import { heroCursorDefaults, liveMedia } from "@/data/liveMedia";
import { liveDefaults, mergeLive } from "@/data/livePages";
import { getSite, projectGroup } from "@/lib/getSite";
import { isShown } from "@/lib/shown";

function text(value, max) {
  return String(value || "").trim().slice(0, max);
}

function mediaUrl(value, fallback) {
  const url = text(value, 500);
  if (url.startsWith("/") && !url.startsWith("//")) return url;
  if (/^https?:\/\//i.test(url)) return url;
  return fallback;
}

export async function GET() {
  const site = await getSite();
  const projects = (site.projects || [])
    .filter((item) => item && item.title && item.slug && item.image)
    .map((item) => ({
      slug: text(item.slug, 80),
      title: text(item.title, 160),
      summary: text(item.summary, 600),
      category: text(item.category, 80),
      filterGroup: text(item.filterGroup || projectGroup(item), 40),
      image: text(item.image, 500),
      href: `/projects/${text(item.slug, 80)}`,
      date: text(item.year, 80),
      tools: text(item.services, 160),
      productType: text(item.category, 80),
      duration: text(item.duration, 80),
      context: text(item.overview, 1600),
      contextNote: text(item.overviewNote, 1600),
      challenge: text(item.challenge, 1600),
      challengeNote: text(item.challengeNote, 1600),
      problem: text(item.problem, 1600),
      problemNote: text(item.problemNote, 1600),
      solution: text(item.solution, 1600),
      solutionNote: text(item.solutionNote, 1600),
      approach: text(item.approach, 1600),
      approachNote: text(item.approachNote, 1600),
      featuresLead: text(item.featuresLead, 1600),
      featuresNote: text(item.featuresNote, 1600),
      conclusion: text(item.conclusion, 1600),
      conclusionNote: text(item.conclusionNote, 1600),
      gallery: (Array.isArray(item.gallery) ? item.gallery : []).map((src) => text(src, 500)).filter(Boolean).slice(0, 5),
    }));
  const certificates = (Array.isArray(site.copy?.certificates) ? site.copy.certificates : [])
    .filter((item) => item && (item.title || item.image))
    .map((item) => ({
      title: text(item.title, 160),
      issuer: text(item.issuer, 120),
      date: text(item.date, 80),
      code: text(item.code, 40),
      image: text(item.image, 500),
      href: text(item.href || item.image, 500),
    }));

  return Response.json(
    {
      projects,
      certificates,
      certificatesLead: text(site.copy?.certificatesLead, 80) || "Certificates",
      certificatesRest: "",
      showHomeProjects: isShown(site.hidden, "home-projects"),
      showProjects: isShown(site.hidden, "projects-all"),
      showCertificates: isShown(site.hidden, "home-certificates"),
      showCase: isShown(site.hidden, "projects-case"),
      caseLabels: {
        date: text(site.copy?.caseDate, 40) || "DATE",
        tools: text(site.copy?.caseTools, 40) || "TOOLS",
        type: text(site.copy?.caseType, 40) || "PRODUCT TYPE",
        duration: text(site.copy?.caseDuration, 40) || "PROJECT DURATION",
        context: text(site.copy?.caseContext, 40) || "context",
        challenge: text(site.copy?.caseChallenge, 40) || "challenge",
        problem: text(site.copy?.caseProblem, 40) || "problem",
        solution: text(site.copy?.caseSolution, 40) || "solution",
        approach: text(site.copy?.caseApproach, 40) || "design approach",
        features: text(site.copy?.caseFeatures, 40) || "key features",
        conclusion: text(site.copy?.caseConclusion, 40) || "conclusion",
        more: text(site.copy?.caseMore, 40) || "More projects",
      },
      pages: mergeLive(site.copy?.pages),
      origins: liveDefaults,
      media: liveMedia.map((item) => ({
        id: item.id,
        match: item.match,
        url: mediaUrl(site.copy?.media?.[item.id], item.src),
        alt: text(site.copy?.mediaAlt?.[item.id], 180) || item.alt || "",
      })),
      heroCursor: (Array.isArray(site.copy?.heroCursor) ? site.copy.heroCursor : heroCursorDefaults)
        .map((item) => mediaUrl(item, ""))
        .filter(Boolean),
      profile: {
        name: text(site.profile?.name, 80),
        email: text(site.profile?.email, 120),
        phone: text(site.profile?.phone, 40),
        phoneHref: text(site.profile?.phoneHref, 80),
        location: text(site.profile?.location, 80),
        role: text(site.profile?.role, 120),
      },
      socials: (site.profile?.socials || []).map((item) => ({
        name: text(item.name, 40),
        href: text(item.href, 300),
      })),
    },
    { headers: { "cache-control": "public, max-age=10, stale-while-revalidate=60" } },
  );
}
