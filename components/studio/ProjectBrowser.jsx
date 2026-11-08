"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Photo from "../ui/Photo";

function kindOf(project) {
  const blob = `${project.category || ""} ${project.services || ""}`.toLowerCase();
  if (blob.includes("dashboard") || blob.includes("saas")) return "Dashboard";
  if (blob.includes("app") || blob.includes("mobile") || blob.includes("fintech")) return "App";
  return "Website";
}

export function ProjectCard({ project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#f2f2f2]">
        <Photo src={project.image} alt={project.title} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.04]" />
      </div>
      <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <h3 className="text-[26px] leading-tight tracking-[-0.04em]">{project.title}</h3>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#666]">{project.summary}</p>
        </div>
        <span className="shrink-0 rounded-full border border-black/15 px-3 py-1 text-xs">{kindOf(project)}</span>
      </div>
    </Link>
  );
}

export default function ProjectBrowser({ projects = [], intro }) {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "App", "Website", "Dashboard"];
  const shown = useMemo(
    () => (filter === "All" ? projects : projects.filter((item) => kindOf(item) === filter)),
    [filter, projects],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={`rounded-full px-4 py-2 text-sm ${filter === item ? "bg-[#0b0b0c] text-white" : "border border-black/10"}`}
          >
            {item}
          </button>
        ))}
      </div>
      {intro ? <p className="mt-8 max-w-xl text-base leading-7 text-[#555]">{intro}</p> : null}
      <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2">
        {shown.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
