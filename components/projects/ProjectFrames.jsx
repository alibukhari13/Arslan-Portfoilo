"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowIcon } from "../ui/Icons";
import Photo from "../ui/Photo";
import { startDamp } from "../ui/damp";

const PAGE = 4;

function Meta({ label, value }) {
  return (
    <div>
      <dt className="text-base font-medium uppercase tracking-[-0.01em] text-[#b9b8b8]">{label}</dt>
      <dd className="mt-1 text-xl font-semibold leading-snug">{value}</dd>
    </div>
  );
}

export function ProjectCard({ project, priority = false, labels = {} }) {
  const client = labels.metaClient || "Client";
  const category = labels.metaCategory || "Category";
  const year = labels.metaYear || "Year";
  const services = labels.metaServices || "Services";
  return (
    <Link
      href={`/projects/${project.slug}`}
      data-frame
      className="group relative isolate mx-auto block w-full max-w-[1320px] overflow-hidden"
    >
      <div data-photo className="absolute inset-0 will-change-transform">
        <Photo src={project.image} alt="" fill priority={priority} className="object-cover" sizes="(min-width: 1320px) 1320px, 100vw" />
      </div>
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative flex min-h-[780px] flex-col items-center justify-center gap-8 px-4 py-16 sm:px-8 lg:min-h-[880px]">
        <dl className="absolute left-6 top-1/2 hidden w-[300px] -translate-y-1/2 grid-cols-2 gap-x-6 min-[1200px]:grid xl:left-10 xl:w-[340px]">
          <Meta label={client} value={project.client} />
          <Meta label={category} value={project.category} />
        </dl>
        <dl className="absolute right-6 top-1/2 hidden w-[300px] -translate-y-1/2 grid-cols-2 gap-x-6 text-left min-[1200px]:grid xl:right-10 xl:w-[340px]">
          <Meta label={year} value={project.year} />
          <Meta label={services} value={project.services} />
        </dl>

        <article data-card className="relative z-10 w-[min(100%,424px)] bg-white p-2 pb-8 text-ink sm:pb-10">
          <div className="relative h-[220px] overflow-hidden sm:h-[306px]">
            <Photo
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              priority={priority}
              sizes="424px"
            />
          </div>
          <div className="flex items-center justify-between gap-4 px-2 pt-4">
            <h2 className="min-w-0 flex-1 font-pixel text-[clamp(1.7rem,3vw,2.5rem)] uppercase leading-[0.9] text-ink">{project.title}</h2>
            <span className="grid h-10 w-10 shrink-0 place-items-center text-ink transition-transform duration-300 group-hover:translate-x-1">
              <ArrowIcon className="h-5 w-5" />
            </span>
          </div>
        </article>

        <dl className="relative z-10 grid w-full max-w-[424px] grid-cols-2 gap-x-4 gap-y-5 text-white min-[1200px]:hidden">
          <Meta label={client} value={project.client} />
          <Meta label={category} value={project.category} />
          <Meta label={year} value={project.year} />
          <Meta label={services} value={project.services} />
        </dl>
      </div>
    </Link>
  );
}

export default function ProjectFrames({ projects = [], paged = true, labels = {} }) {
  const listRef = useRef(null);
  const [count, setCount] = useState(paged ? PAGE : projects.length);
  const shown = paged ? projects.slice(0, count) : projects;

  useEffect(() => {
    const root = listRef.current;
    if (!root) return undefined;
    const frames = [...root.querySelectorAll("[data-frame]")];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    return startDamp((damp) => {
      frames.forEach((frame, index) => {
        const rect = frame.getBoundingClientRect();
        const start = window.innerHeight * 0.92;
        const end = window.innerHeight * 0.42;
        const target = reduce ? 1 : Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
        const progress = damp(`frame-${index}`, target, 0.16);
        const photo = frame.querySelector("[data-photo]");
        if (photo) photo.style.transform = `scale(${1.08 - progress * 0.08})`;
      });
    });
  }, [count, projects]);

  return (
    <div>
      <div ref={listRef} className="flex flex-col gap-10 px-5 md:px-8">
        {shown.map((project, index) => (
          <ProjectCard key={project.slug} project={project} priority={index === 0} labels={labels} />
        ))}
      </div>
      {paged && count < projects.length ? (
        <div className="flex justify-center py-16">
          <button
            type="button"
            onClick={() => setCount((value) => Math.min(projects.length, value + PAGE))}
            className="border border-white/25 px-8 py-3 text-[13px] uppercase tracking-[0.22em] transition-colors hover:border-lime hover:text-lime"
          >
            {labels.projectsLoadMore || "Load more"}
          </button>
        </div>
      ) : (
        <div className="h-16" />
      )}
    </div>
  );
}
