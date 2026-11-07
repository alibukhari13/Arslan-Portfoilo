"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowIcon } from "../ui/Icons";
import Photo from "../ui/Photo";
import Reveal from "../ui/Reveal";
import ScrollWords from "../ui/ScrollWords";
import { startDamp } from "../ui/damp";

export default function FeaturedProjects({ projects = [], title, labels = {} }) {
  const listRef = useRef(null);
  const featured = projects.slice(0, 4);

  useEffect(() => {
    const root = listRef.current;
    if (!root) return undefined;
    const cards = [...root.querySelectorAll("[data-frame]")];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    return startDamp((damp) => {
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const center = (rect.top + rect.height / 2) / window.innerHeight;
        const target = Math.max(0, 1 - Math.abs(center - 0.45) * 1.4);
        const closeness = reduce ? 1 : damp(`feature-${index}`, target, 0.14);
        const photo = card.querySelector("[data-photo]");
        const panel = card.querySelector("[data-card]");
        if (photo) photo.style.transform = reduce ? "none" : `scale(${1.12 - closeness * 0.1})`;
        if (panel) {
          panel.style.opacity = reduce ? "1" : String(0.35 + closeness * 0.65);
          panel.style.transform = reduce ? "none" : `translate3d(0, ${(1 - closeness) * 48}px, 0)`;
        }
      });
    });
  }, [projects]);

  return (
    <section id="projects" className="py-16">
      <div className="mx-auto mb-8 max-w-[1240px] px-5 md:px-8">
        <Reveal>
          <ScrollWords
            as="h2"
            text={title}
            className="max-w-[16ch] text-[clamp(2.2rem,4.6vw,4.2rem)] font-medium uppercase leading-[0.92] tracking-tight"
          />
        </Reveal>
      </div>

      <div ref={listRef}>
        {featured.map((project) => (
          <article key={project.slug} data-frame className="relative isolate md:sticky md:top-0 md:h-svh">
            <div className="absolute inset-0 overflow-hidden">
              <div data-photo className="absolute inset-0 will-change-transform">
                <Photo src={project.image} alt="" fill className="object-cover" sizes="100vw" />
              </div>
              <div className="absolute inset-0 bg-black/55" />
            </div>
            <div className="relative flex min-h-[88vh] items-center justify-center px-5 py-16 md:h-full">
              <dl className="pointer-events-none absolute left-6 top-1/2 hidden w-36 -translate-y-1/2 space-y-6 text-sm lg:block xl:left-16">
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.16em] text-white/55">{labels.metaClient || "Client"}</dt>
                  <dd className="mt-1">{project.client}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.16em] text-white/55">{labels.metaCategory || "Category"}</dt>
                  <dd className="mt-1">{project.category}</dd>
                </div>
              </dl>
              <dl className="pointer-events-none absolute right-6 top-1/2 hidden w-44 -translate-y-1/2 space-y-6 text-right text-sm lg:block xl:right-16">
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.16em] text-white/55">{labels.metaYear || "Year"}</dt>
                  <dd className="mt-1">{project.year}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.16em] text-white/55">{labels.metaServices || "Services"}</dt>
                  <dd className="mt-1">{project.services}</dd>
                </div>
              </dl>

              <Link
                href={`/projects/${project.slug}`}
                data-card
                className="group w-[min(100%,420px)] bg-white p-3 text-ink shadow-2xl will-change-transform"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
                  <Photo
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    sizes="420px"
                  />
                </div>
                <div className="flex items-center justify-between px-2 py-4">
                  <h3 className="font-pixel text-xl font-normal uppercase tracking-tight">{project.title}</h3>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowIcon className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
