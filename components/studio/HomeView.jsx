import Link from "next/link";
import { getSite } from "@/lib/getSite";
import { isShown } from "@/lib/shown";
import Photo from "../ui/Photo";
import Plans from "./Plans";
import ServiceList from "./ServiceList";
import StartupLoader from "./StartupLoader";
import StudioForm from "./StudioForm";
import { ProjectCard } from "./ProjectBrowser";

const statNotes = {
  "Selected case studies": "Published interface studies across product, web, and mobile.",
  "Years designing": "Hands-on UI and product work, from flows through developer handoff.",
  "Product teams": "Teams I have designed with, including product and engineering.",
  "Core focus areas": "UI/UX, product, web, mobile, SaaS, and prototype handoff.",
};

export function StudioFaq({ faqs = [] }) {
  return (
    <div className="divide-y divide-black/10 border-y border-black/10">
      {faqs.map((item) => (
        <details key={item.question} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium tracking-[-0.03em]">
            {item.question}
            <span className="text-[#F9452D] group-open:hidden">+</span>
            <span className="hidden text-[#F9452D] group-open:inline">–</span>
          </summary>
          <p className="max-w-3xl pt-3 text-sm leading-7 text-[#555]">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

export default async function HomeView() {
  const site = await getSite();
  const { profile, stats, services, projects, plans, process, principles, faqs, copy, hidden } = site;
  const show = (id) => isShown(hidden, id);
  const featured = projects.slice(0, 4);
  const ticker = ["UIUX", "WEB DESIGN", "APP DESIGN", "PRODUCT DESIGN"];
  const steps = process.steps || [];
  const firstName = String(profile.name || "Arslan").split(/\s+/)[0];

  return (
    <main className="bg-white text-[#0b0b0c]">
      <StartupLoader name={firstName} />
      {show("home-hero") ? (
        <section className="px-5 pb-2 pt-[108px] md:px-10">
          <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-8 lg:flex-row">
            <h1 className="max-w-[540px] text-[34px] font-semibold leading-[1.1] text-black md:text-[46px] md:leading-[50.6px]" style={{ letterSpacing: "-3.22px" }}>
              Designing Digital
              <br />
              Products That Connect,
              <br />
              Scale, and Create
              <br />
              Meaningful Experiences.
            </h1>
            <div className="relative h-[240px] w-full max-w-[427px] overflow-hidden rounded-[10px] bg-[#111] sm:h-[320px]">
              <Photo src={profile.portrait} alt={profile.name} fill priority sizes="427px" className="object-cover object-[center_18%]" />
            </div>
          </div>
        </section>
      ) : null}

      <div className="overflow-hidden border-y border-black/10">
        <div className="study-ticker flex w-max items-center py-3" style={{ animationDuration: "28s" }}>
          {[...ticker, ...ticker, ...ticker].map((item, index) => (
            <span key={`${item}-${index}`} className="flex items-center text-[16px] font-medium tracking-[-0.03em] text-[#40403e]">
              <span className="mx-10">{item}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF4718]" />
            </span>
          ))}
        </div>
      </div>

      <p className="font-display overflow-hidden whitespace-nowrap py-1 text-[clamp(64px,20.7vw,397px)] font-semibold leading-[0.9] text-black" style={{ letterSpacing: "-0.054em" }}>
        {profile.name}™
      </p>

      <div className="relative z-10 mx-5 -mt-16 overflow-hidden rounded-[28px] bg-[#0b0b0c] md:mx-10">
        <div className="flex gap-3 overflow-x-auto p-3 no-scrollbar">
          {projects.slice(0, 6).map((project) => (
            <Link key={project.slug} href={`/projects/${project.slug}`} className="relative h-44 w-72 shrink-0 overflow-hidden bg-[#222] sm:h-56 sm:w-80">
              <Photo src={project.image} alt={project.title} fill sizes="320px" className="object-cover" />
            </Link>
          ))}
        </div>
      </div>

      {show("home-intro") ? (
        <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10">
          <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:items-start">
            <Link href="/contact" className="text-sm text-[#F9452D]">Let’s talk</Link>
            <div>
              <h2 className="max-w-[840px] text-[clamp(36px,4vw,56px)] leading-[1.05] tracking-[-0.05em]">
                My work speaks through numbers. Here’s what I’ve achieved so far.
              </h2>
              <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                  <article key={stat.label} className="border-t border-black/10 pt-5">
                    <p className="text-[clamp(52px,5vw,72px)] leading-none tracking-[-0.06em]">{stat.value}</p>
                    <h3 className="mt-8 text-base tracking-[-0.03em]">{stat.label}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#666]">{statNotes[stat.label] || stat.label}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="overflow-hidden px-5 py-16 text-center md:px-10">
        <p className="text-[clamp(64px,12vw,150px)] font-semibold leading-[0.85] tracking-[-0.055em]">From ordinary</p>
        <div className="relative mx-auto my-6 h-48 max-w-3xl overflow-hidden bg-black md:h-64">
          <Photo src={projects[0]?.image} alt="" fill sizes="800px" className="object-cover opacity-90" />
        </div>
        <p className="text-[clamp(64px,12vw,150px)] font-semibold leading-[0.85] tracking-[-0.055em] text-[#dedede]">to extraordinary</p>
        <p className="mx-auto mt-6 max-w-md text-sm text-[#555]">Design that’s built to stay clear as the product grows.</p>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-10">
        <h2 className="max-w-[1100px] text-[clamp(48px,7vw,96px)] leading-[0.95] tracking-[-0.06em]">Your goals, my priority</h2>
        <p className="mt-5 max-w-xl text-base leading-7 text-[#555]">{profile.about}</p>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          <article className="bg-[#f6f6f6] p-7">
            <h3 className="text-2xl tracking-[-0.04em]">A direct reply</h3>
            <p className="mt-3 text-sm leading-6 text-[#555]">
              Write or call. I’m available {Array.isArray(profile.hours) ? profile.hours.join(", ") : profile.hours}, and I answer from Lahore.
            </p>
          </article>
          <article className="bg-white p-7 shadow-[0_0_0_1px_rgba(0,0,0,0.06)]">
            <h3 className="text-2xl tracking-[-0.04em]">Revisions in the plan</h3>
            <ul className="mt-4 space-y-2 text-sm text-[#444]">
              {(Array.isArray(plans[1]?.features) ? plans[1].features : plans[0]?.features || []).slice(0, 5).map((item) => (
                <li key={item}>✓ {item}</li>
              ))}
            </ul>
          </article>
          <article className="bg-[#0b0b0c] p-7 text-white">
            <h3 className="text-2xl tracking-[-0.04em] text-white">Figma, ready to build</h3>
            <p className="mt-3 text-sm leading-6 text-white/70">
              Flows, components, and a prototype a developer can follow without guessing the spacing.
            </p>
          </article>
        </div>
      </section>

      {show("home-projects") ? (
        <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-10">
          <p className="text-center text-xs uppercase tracking-[0.18em] text-[#F9452D]">Selected work</p>
          <h2 className="mx-auto mt-4 max-w-4xl text-center text-[clamp(48px,6vw,84px)] leading-[0.95] tracking-[-0.05em]">
            Proven results, stunning designs
          </h2>
          <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/projects" className="inline-flex items-center gap-2 text-sm">
              All cases <span className="text-[#F9452D]">({projects.length})</span>
            </Link>
          </div>
        </section>
      ) : null}

      {show("home-services") ? (
        <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-10">
          <ServiceList services={services} />
        </section>
      ) : null}

      <section className="mx-auto grid max-w-[1440px] items-end gap-10 px-5 py-16 md:px-10 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <p className="max-w-xl text-lg leading-8">
            I’m {profile.name}, a {profile.role} based in {profile.location}. {profile.intro}
          </p>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#555]">{profile.about}</p>
          <a href={profile.resume} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0b0b0c] px-5 py-3 text-sm text-white">
            Download resume <span aria-hidden>↓</span>
          </a>
        </div>
        <div>
          <p className="text-sm text-[#888]">{profile.name}</p>
          <p className="text-sm text-[#888]">{profile.role}</p>
        </div>
      </section>

      <section className="bg-[#0b0b0c] px-5 py-16 text-white md:px-10">
        <h2 className="mx-auto max-w-[1100px] text-center text-[clamp(28px,4vw,52px)] uppercase leading-[1.05] tracking-[-0.04em] text-white">
          UI/UX designer helping product teams design clear, usable, and scalable digital interfaces.
        </h2>
      </section>

      {show("home-pricing") ? (
        <section id="pricing" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10">
          <h2 className="text-[clamp(40px,6vw,72px)] uppercase leading-[0.95] tracking-[-0.05em]">Big or small? I have a plan.</h2>
          <div className="mt-8">
            <Plans plans={plans} note={copy.pricingNote || "Starting points in USD. Final price follows the scope we agree on."} />
          </div>
        </section>
      ) : null}

      {show("home-process") ? (
        <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="text-[clamp(40px,5vw,64px)] tracking-[-0.05em]">{copy.processTitleLead || process.titleLead || "My process"}</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[#555]">
                Four steps, with a review at each one, so the file matches the goal before it is handed off.
              </p>
            </div>
            <Link href="/contact" className="rounded-full bg-[#0b0b0c] px-5 py-3 text-sm text-white">Schedule a consultation</Link>
          </div>
          <ol className="mt-12 divide-y divide-black/10 border-y border-black/10">
            {steps.map((step) => (
              <li key={step.title} className="grid gap-3 py-7 md:grid-cols-[80px_1fr_1.2fr] md:items-baseline">
                <span className="text-[#F9452D]">{String(step.number || "").replace(".", "")}</span>
                <h3 className="text-2xl tracking-[-0.04em]">{step.title}</h3>
                <p className="text-sm leading-6 text-[#555]">{step.text}</p>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {show("home-notes") && principles.length ? (
        <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-10">
          <h2 className="text-[clamp(40px,5vw,64px)] tracking-[-0.05em]">Notes from the work</h2>
          <p className="mt-3 max-w-xl text-sm text-[#555]">What each product had to make obvious.</p>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {principles.map((item) => (
              <article key={item.name} className="grid gap-5 bg-[#f6f6f6] p-5 sm:grid-cols-[140px_1fr]">
                <div className="relative h-36 overflow-hidden bg-[#ddd]">
                  <Photo src={item.image} alt="" fill sizes="140px" className="object-cover" />
                </div>
                <div>
                  <p className="text-lg leading-7 tracking-[-0.03em]">“{item.quote}”</p>
                  <p className="mt-4 text-sm font-medium">{item.name}</p>
                  <p className="text-sm text-[#777]">{item.role}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {show("home-faq") ? (
        <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-10">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-[clamp(40px,5vw,64px)] tracking-[-0.05em]">FAQ</h2>
            <Link href="/contact" className="text-sm text-[#F9452D]">Ask a question</Link>
          </div>
          <StudioFaq faqs={faqs} />
        </section>
      ) : null}

      {show("home-contact") ? (
        <section id="contact" className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 md:px-10 lg:grid-cols-2">
          <div>
            <h2 className="text-[clamp(40px,5vw,64px)] leading-[1.02] tracking-[-0.05em]">Let’s bring your vision to life</h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-[#555]">
              Looking for a UI/UX designer for an app, website, or product? Tell me what it needs to do.
            </p>
            <p className="mt-8 font-medium">{profile.name}</p>
            <p className="text-sm text-[#777]">{profile.role}</p>
          </div>
          <StudioForm source="Home" email={profile.email} text={copy} />
        </section>
      ) : null}
    </main>
  );
}
