import Link from "next/link";
import ContactBand from "../home/ContactBand";
import ProjectFrames from "../projects/ProjectFrames";
import HeroShot from "../projects/HeroShot";
import ImpactStats from "../projects/ImpactStats";
import ArrowButton from "../ui/ArrowButton";
import Photo from "../ui/Photo";
import Reveal from "../ui/Reveal";
import ScrollWords from "../ui/ScrollWords";
import { isShown } from "@/lib/shown";

function storyOf(project) {
  const shot = (index) => project.gallery?.[index] || project.image;
  return {
    liveUrl: project.liveUrl || "",
    overview: project.overview || project.summary,
    overviewNote: project.overviewNote || "",
    challenge: project.challenge || "",
    solution: project.solution || "",
    impactIntro: project.impactIntro || "",
    impacts: project.impacts || [],
    pair: [shot(0), shot(1)],
    wide: shot(2),
  };
}

export default function ProjectDetail({ project, more, copy = {}, hidden = {} }) {
  const story = storyOf(project);

  return (
    <main className="pt-32">
      <header className="mx-auto flex max-w-[1320px] flex-col gap-8 px-5 md:flex-row md:items-end md:justify-between md:px-10">
        <ScrollWords
          as="h1"
          text={project.title}
          className="max-w-[12ch] text-[clamp(3.2rem,7vw,5rem)] uppercase leading-[0.8]"
        />
        {story.liveUrl ? (
          <ArrowButton href={story.liveUrl} variant="line" className="shrink-0">
            {copy.projectLive || "View live link"}
          </ArrowButton>
        ) : null}
      </header>

      {isShown(hidden, "projects-case") ? <dl className="mx-auto mt-14 grid max-w-[1320px] grid-cols-2 gap-x-6 gap-y-8 px-5 md:grid-cols-4 md:px-10">
        {[
          [copy.metaClient || "Client", project.client],
          [copy.metaCategory || "Category", project.category],
          [copy.metaYear || "Year", project.year],
          [copy.metaServices || "Services", project.services],
        ].map(([label, value]) => (
          <div key={label}>
            <dt className="text-base font-medium uppercase tracking-[-0.01em] text-[#b9b8b8]">{label}</dt>
            <dd className="mt-2 text-xl font-semibold">{value}</dd>
          </div>
        ))}
      </dl> : null}

      <div className="px-5 md:px-8">
        <HeroShot src={project.image} alt={project.title} />
      </div>

      {isShown(hidden, "projects-case") ? <section className="mx-auto w-full max-w-[872px] px-5 py-20 min-[920px]:px-0 md:py-24">
        <Reveal>
          <ScrollWords as="h2" text={copy.projectOverviewTitle || "Project overview"} className="text-[40px] uppercase leading-none" style={{ letterSpacing: "-0.02em" }} />
          <p className="mt-5 text-lg leading-relaxed text-[#b9b8b8]">{story.overview}</p>
          {story.overviewNote ? <p className="mt-5 text-lg leading-relaxed text-[#b9b8b8]">{story.overviewNote}</p> : null}
        </Reveal>
      </section> : null}

      <div className="mx-auto grid w-full max-w-[872px] gap-6 px-5 min-[920px]:px-0 sm:grid-cols-2">
        {story.pair.map((src, index) => (
          <div key={`${src}-${index}`} className="relative h-[220px] overflow-hidden sm:h-[282px]">
            <Photo src={src} alt="" fill className="object-cover" sizes="424px" />
          </div>
        ))}
      </div>

      {isShown(hidden, "projects-case") ? <section className="mx-auto w-full max-w-[872px] space-y-14 px-5 py-20 min-[920px]:px-0">
        <Reveal>
          <ScrollWords as="h2" text={copy.projectChallengeTitle || "The challenge"} className="text-[40px] uppercase leading-none" style={{ letterSpacing: "-0.02em" }} />
          <p className="mt-5 text-lg leading-relaxed text-[#b9b8b8]">{story.challenge}</p>
        </Reveal>
        <Reveal>
          <ScrollWords as="h2" text={copy.projectSolutionTitle || "Our solution"} className="text-[40px] uppercase leading-none" style={{ letterSpacing: "-0.02em" }} />
          <p className="mt-5 text-lg leading-relaxed text-[#b9b8b8]">{story.solution}</p>
        </Reveal>
      </section> : null}

      <div className="mx-auto w-full max-w-[872px] px-5 min-[920px]:px-0">
        <div className="relative h-[320px] overflow-hidden sm:h-[582px]">
          <Photo src={story.wide} alt="" fill className="object-cover" sizes="872px" />
        </div>
      </div>

      {isShown(hidden, "projects-case") ? <ImpactStats intro={story.impactIntro} impacts={story.impacts} title={copy.projectImpactTitle || "Project impact"} /> : null}

      {isShown(hidden, "projects-case") && more.length ? (
        <section className="pt-8">
          <div className="mx-auto mb-10 flex max-w-[1320px] flex-col gap-6 px-5 sm:flex-row sm:items-end sm:justify-between md:px-10">
            <ScrollWords as="h2" text={copy.projectMoreTitle || "More projects"} className="text-[clamp(3rem,6vw,5rem)] uppercase leading-[0.8]" />
            <Link href="/projects" className="text-[13px] uppercase tracking-[0.22em] text-white/80 hover:text-lime">
              {copy.projectsViewAll || "View all projects"}
            </Link>
          </div>
          <ProjectFrames projects={more} paged={false} labels={copy} />
        </section>
      ) : null}

      {isShown(hidden, "project-detail-contact") ? <ContactBand source="Project" /> : null}
    </main>
  );
}
