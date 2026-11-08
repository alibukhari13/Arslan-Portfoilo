import Link from "next/link";
import { isShown } from "@/lib/shown";
import Photo from "../ui/Photo";
import StudioForm from "../studio/StudioForm";

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

export default function ProjectDetail({ project, more, copy = {}, hidden = {}, email = "" }) {
  const story = storyOf(project);
  const showCase = isShown(hidden, "projects-case");

  return (
    <main className="bg-white px-5 pb-16 pt-24 text-[#0b0b0c] md:px-10 md:pt-28">
      <div className="mx-auto max-w-[1440px]">
        <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h1 className="studio-display max-w-4xl text-[clamp(48px,7vw,96px)] leading-[0.9]">{project.title}</h1>
          {story.liveUrl ? (
            <a href={story.liveUrl} className="text-sm text-[#F9452D]" target="_blank" rel="noreferrer">
              {copy.projectLive || "View live link"}
            </a>
          ) : null}
        </header>

        {showCase ? (
          <dl className="mt-12 grid grid-cols-2 gap-6 border-y border-black/10 py-6 md:grid-cols-4">
            {[
              [copy.metaClient || "Client", project.client],
              [copy.metaCategory || "Category", project.category],
              [copy.metaYear || "Year", project.year],
              [copy.metaServices || "Services", project.services],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs uppercase tracking-[0.14em] text-[#888]">{label}</dt>
                <dd className="mt-2 text-lg">{value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        <div className="relative mt-8 aspect-[16/9] overflow-hidden bg-[#f2f2f2]">
          <Photo src={project.image} alt={project.title} fill priority sizes="100vw" className="object-cover" />
        </div>

        {showCase ? (
          <section className="mx-auto max-w-3xl py-16">
            <h2 className="text-4xl">{copy.projectOverviewTitle || "Project overview"}</h2>
            <p className="mt-4 text-base leading-7 text-[#555]">{story.overview}</p>
            {story.overviewNote ? <p className="mt-4 text-base leading-7 text-[#555]">{story.overviewNote}</p> : null}
          </section>
        ) : null}

        <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
          {story.pair.map((src, index) => (
            <div key={`${src}-${index}`} className="relative h-64 overflow-hidden bg-[#f2f2f2]">
              <Photo src={src} alt="" fill sizes="420px" className="object-cover" />
            </div>
          ))}
        </div>

        {showCase ? (
          <section className="mx-auto max-w-3xl space-y-12 py-16">
            {story.challenge ? (
              <div>
                <h2 className="text-4xl">{copy.projectChallengeTitle || "The challenge"}</h2>
                <p className="mt-4 text-base leading-7 text-[#555]">{story.challenge}</p>
              </div>
            ) : null}
            {story.solution ? (
              <div>
                <h2 className="text-4xl">{copy.projectSolutionTitle || "Our solution"}</h2>
                <p className="mt-4 text-base leading-7 text-[#555]">{story.solution}</p>
              </div>
            ) : null}
          </section>
        ) : null}

        <div className="relative mx-auto aspect-[16/9] max-w-3xl overflow-hidden bg-[#f2f2f2]">
          <Photo src={story.wide} alt="" fill sizes="900px" className="object-cover" />
        </div>

        {showCase && story.impacts.length ? (
          <section className="mx-auto max-w-3xl py-16">
            <h2 className="text-4xl">{copy.projectImpactTitle || "Project impact"}</h2>
            {story.impactIntro ? <p className="mt-4 text-base leading-7 text-[#555]">{story.impactIntro}</p> : null}
            <ul className="mt-8 grid gap-6 sm:grid-cols-3">
              {story.impacts.map((item) => (
                <li key={`${item.value}-${item.label}`} className="border-t border-black/10 pt-4">
                  <p className="text-4xl">{item.value}</p>
                  <p className="mt-2 text-sm text-[#666]">{item.label}</p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {showCase && more.length ? (
          <section className="py-10">
            <div className="mb-8 flex items-end justify-between gap-4">
              <h2 className="text-5xl">{copy.projectMoreTitle || "More projects"}</h2>
              <Link href="/projects" className="text-sm text-[#F9452D]">
                {copy.projectsViewAll || "View all projects"}
              </Link>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {more.map((item) => (
                <Link key={item.slug} href={`/projects/${item.slug}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#f2f2f2]">
                    <Photo src={item.image} alt={item.title} fill sizes="50vw" className="object-cover transition duration-700 group-hover:scale-[1.03]" />
                  </div>
                  <h3 className="mt-4 text-2xl">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#666]">{item.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {isShown(hidden, "project-detail-contact") ? (
          <section className="grid gap-10 py-16 lg:grid-cols-2">
            <h2 className="text-5xl">{copy.projectFormTitle || "Let’s bring your vision to life"}</h2>
            <StudioForm source="Project" email={email} text={copy} />
          </section>
        ) : null}
      </div>
    </main>
  );
}
