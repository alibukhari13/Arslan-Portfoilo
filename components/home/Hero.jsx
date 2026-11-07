import { getSite } from "@/lib/getSite";
import Marquee from "../ui/Marquee";
import Photo from "../ui/Photo";
import WordCycle from "./WordCycle";

export default async function Hero() {
  const { profile, projects, copy } = await getSite();
  const shots = projects.slice(0, 6);
  return (
    <section className="relative flex min-h-svh flex-col justify-center overflow-hidden pt-24">
      <p className="absolute left-6 top-1/2 hidden -translate-y-1/2 text-[11px] uppercase tracking-[0.32em] text-white/60 [writing-mode:vertical-rl] lg:block">
        ( {profile.eyebrow} )
      </p>
      <p className="absolute right-8 top-[46%] hidden text-[12px] uppercase tracking-[0.28em] text-white/70 xl:flex xl:gap-2">
        <span>(</span>
        {profile.socials.map((item, index) => (
          <a key={item.name} href={item.href} target="_blank" rel="noreferrer" className="hover:text-lime">
            {item.label}
            {index < profile.socials.length - 1 ? " /" : ""}
          </a>
        ))}
        <span>)</span>
      </p>

      <div className="mx-auto w-full max-w-[1440px] px-5 text-center">
        <h1 className="rise">
          <WordCycle first={profile.wordmark} second={copy.heroStudio || "STUDIO"} />
        </h1>
        <p className="rise mx-auto mt-5 max-w-xl text-[clamp(1.05rem,1.5vw,1.35rem)] font-medium text-white" style={{ animationDelay: "120ms" }}>
          {profile.tagline}
        </p>

        <ul className="mt-5 flex justify-center gap-4 text-[12px] uppercase tracking-[0.22em] text-white/60 xl:hidden">
          {profile.socials.map((item) => (
            <li key={item.name}>
              <a href={item.href} target="_blank" rel="noreferrer" className="hover:text-white">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="rise mt-14 flex w-full overflow-x-auto no-scrollbar" style={{ justifyContent: "safe center", animationDelay: "200ms" }}>
        <div className="flex gap-4 px-5">
        {shots.map((project) => (
          <div key={project.slug} className="relative h-40 w-40 shrink-0 overflow-hidden bg-panel">
            <Photo src={project.image} alt={project.title} fill className="object-cover transition-transform duration-700 hover:scale-105" sizes="160px" />
          </div>
        ))}
        </div>
      </div>

      <div className="mx-auto mt-10 w-full max-w-[520px] text-sm text-white/80">
        <Marquee
          items={Array.from({ length: 8 }, () => profile.availability)}
          render={(label) => (
            <span className="flex items-center gap-3 px-4">
              <span className="h-2 w-2 rounded-full bg-lime" />
              {label}
            </span>
          )}
        />
      </div>
    </section>
  );
}
