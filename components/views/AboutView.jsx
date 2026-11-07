import { getSite } from "@/lib/getSite";
import ValueStory from "../about/ValueStory";
import ContactBand from "../home/ContactBand";
import ArrowButton from "../ui/ArrowButton";
import Marquee from "../ui/Marquee";
import Photo from "../ui/Photo";
import Reveal from "../ui/Reveal";
import ScrollWords from "../ui/ScrollWords";

export default async function AboutView() {
  const { credentials, experience, highlights, profile, stats, tools, values, copy } = await getSite();
  return (
    <main className="pt-28">
      <section className="mx-auto grid max-w-[1240px] items-end gap-10 px-5 md:px-8 lg:grid-cols-2">
        <Reveal>
          <ScrollWords
            as="h1"
            text={copy.aboutLead}
            muted={copy.aboutRest}
            mutedColor="rgba(255,255,255,0.35)"
            breakBeforeMuted
            className="text-[clamp(2.8rem,6vw,5.4rem)] font-medium uppercase leading-[0.9] tracking-tight"
          />
          <p className="mt-8 max-w-xl text-base leading-relaxed text-mist">{profile.intro}</p>
        </Reveal>
        <Reveal delay={140}>
          <div className="relative aspect-[4/3] overflow-hidden bg-panel">
            <Photo src={copy.aboutImage} alt={copy.aboutImageAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" priority />
            <div aria-hidden className="wipe-in absolute inset-0 bg-ink" />
          </div>
        </Reveal>
      </section>

      <div className="mx-auto mt-10 max-w-[1240px] px-5 md:px-8">
        <Marquee
          slow
          items={tools}
          render={(tool) => (
            <span className="grid h-12 min-w-28 place-items-center border border-white/10 px-4 text-[11px] uppercase tracking-[0.16em] text-white/60">
              {tool}
            </span>
          )}
        />
      </div>

      <section className="mx-auto grid max-w-[1240px] gap-4 px-5 py-20 md:grid-cols-4 md:px-8">
        {stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 80}>
            <article className="bg-panel p-6">
              <p className="font-pixel text-5xl">{stat.value}</p>
              <p className="mt-6 text-sm text-mist">{stat.label}</p>
            </article>
          </Reveal>
        ))}
      </section>

      <ValueStory items={values} lead={copy.valuesLead} rest={copy.valuesRest} />

      <section className="mx-auto grid max-w-[1240px] items-center gap-10 px-5 py-24 md:px-8 lg:grid-cols-[.85fr_1.15fr]">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden bg-panel">
            <Photo src={profile.portrait} alt={profile.name} fill className="object-cover object-top" sizes="480px" />
            <div aria-hidden className="wipe-in absolute inset-0 bg-ink" />
          </div>
        </Reveal>
        <div>
          <Reveal>
            <p className="text-xs uppercase tracking-[0.18em] text-lime">{copy.aboutKicker}</p>
            <ScrollWords
              as="h2"
              text={copy.aboutName}
              className="mt-3 text-[clamp(2.2rem,4vw,3.6rem)] font-medium uppercase leading-[0.92] tracking-tight"
            />
            <p className="mt-3 text-mist">
              {profile.role} · {profile.location}
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80">{profile.about}</p>
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-3">
            <ArrowButton href={profile.resume}>{copy.aboutResume}</ArrowButton>
            <ArrowButton href="/contact" variant="ghost" className="!w-auto">
              {copy.aboutTogether}
            </ArrowButton>
          </div>
          <ul className="mt-10 grid gap-3 sm:grid-cols-3">
            {highlights.map((item, index) => (
              <Reveal key={item.title} delay={index * 80} as="li">
                <div className="border border-white/10 p-4">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-lime">{item.kicker}</p>
                  <p className="mt-2 font-medium">{item.title}</p>
                  <p className="mt-2 text-sm text-mist">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 pb-8 md:px-8">
        <Reveal>
          <ScrollWords
            as="h2"
            text={copy.experienceTitle}
            className="mb-8 text-[clamp(2rem,4vw,3.4rem)] font-medium uppercase leading-none tracking-tight"
          />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2">
          {experience.map((job, index) => (
            <Reveal key={`${job.company}-${job.when}`} delay={index * 70}>
              <article className="h-full border border-white/10 bg-panel p-6 transition-transform duration-500 hover:-translate-y-1">
                <p className="text-xs uppercase tracking-[0.16em] text-mist">{job.when}</p>
                <h3 className="mt-3 font-pixel text-2xl font-normal uppercase tracking-tight">{job.role}</h3>
                <p className="mt-1 text-sm text-lime">
                  {job.company} · {job.place}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-white/75">{job.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-16 md:px-8">
        <Reveal>
          <ScrollWords
            as="h2"
            text={copy.studyTitle}
            className="mb-6 text-[clamp(2rem,4vw,3.4rem)] font-medium uppercase leading-none tracking-tight"
          />
        </Reveal>
        <ul className="border-y border-white/10">
          {credentials.map((item, index) => (
            <Reveal key={item.title} as="li" delay={index * 60} className="border-b border-white/10 py-5 last:border-b-0">
              <div className="grid gap-2 text-sm md:grid-cols-4">
                <span className="text-mist">{item.year}</span>
                <span className="font-medium">{item.title}</span>
                <span className="text-white/75">{item.detail}</span>
                <span>{item.org}</span>
              </div>
            </Reveal>
          ))}
        </ul>
        {copy.studyNote ? (
          <p className="mt-4 text-sm text-mist">
            {copy.studyNote}{" "}
            {copy.studyNoteHref ? (
              <a className="text-lime" href={copy.studyNoteHref} target="_blank" rel="noreferrer">
                {copy.studyNoteCode}
              </a>
            ) : (
              copy.studyNoteCode
            )}
          </p>
        ) : null}
        <div className="mt-8">
          <ArrowButton href="/projects">{copy.projectsViewAll}</ArrowButton>
        </div>
      </section>

      <ContactBand />
    </main>
  );
}
