import Link from "next/link";
import { getSite } from "@/lib/getSite";
import { isShown } from "@/lib/shown";
import ServiceList from "./ServiceList";
import StudioForm from "./StudioForm";

export default async function AboutView() {
  const { profile, stats, experience, tools, services, copy, hidden } = await getSite();
  const show = (id) => isShown(hidden, id);
  const [first, ...rest] = profile.name.split(" ");

  return (
    <main className="bg-white px-5 pb-10 pt-24 text-[#0b0b0c] md:px-10 md:pt-28">
      <div className="mx-auto max-w-[1440px]">
        {show("about-opening") ? (
          <header className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <h1 className="text-[clamp(72px,12vw,160px)] leading-[0.85] tracking-[-0.06em]">
              {first}
              <br />
              {rest.join(" ")}
            </h1>
            <div className="pb-4">
              <p className="text-xs uppercase tracking-[0.16em] text-[#777]">{profile.role}</p>
              <Link href="/contact" className="mt-4 inline-flex text-sm text-[#F9452D]">Let’s talk</Link>
            </div>
          </header>
        ) : null}

        {show("about-stats") ? (
          <section className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <article key={stat.label} className="border-t border-black/10 pt-4">
                <p className="text-6xl tracking-[-0.06em]">{stat.value}</p>
                <h2 className="mt-6 text-base">{stat.label}</h2>
              </article>
            ))}
          </section>
        ) : null}

        {show("about-experience") ? (
          <section className="mt-24">
            <h2 className="text-5xl tracking-[-0.05em]">Experience</h2>
            <ol className="mt-8 divide-y divide-black/10 border-y border-black/10">
              {experience.map((job, index) => (
                <li key={`${job.company}-${job.when}`} className="grid gap-2 py-6 md:grid-cols-[70px_1fr_1fr_1.2fr] md:items-baseline">
                  <span className="text-[#F9452D]">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="text-2xl tracking-[-0.04em]">{job.company}</h3>
                  <p className="text-sm text-[#555]">{job.role}</p>
                  <p className="text-sm text-[#777]">{job.when} · {job.place}</p>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        {show("about-tools") ? (
          <section className="mt-20">
            <h2 className="text-5xl tracking-[-0.05em]">Stack & tools</h2>
            <p className="mt-3 max-w-lg text-sm text-[#555]">The tools behind the flows, the interface, and the handoff.</p>
            <div className="mt-8 overflow-hidden border-y border-black/10">
              <div className="study-ticker flex w-max py-5" style={{ animationDuration: "28s" }}>
                {[...tools, ...tools].map((tool, index) => (
                  <span key={`${tool}-${index}`} className="px-8 text-sm uppercase tracking-[0.16em]">{tool}</span>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {show("about-study") ? (
          <section className="mt-20">
            <ServiceList services={services} />
          </section>
        ) : null}

        {show("about-contact") ? (
          <section className="mt-24 grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-5xl tracking-[-0.05em]">Let’s talk</h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-[#555]">{profile.intro}</p>
            </div>
            <StudioForm source="About" email={profile.email} text={copy} />
          </section>
        ) : null}
      </div>
    </main>
  );
}
