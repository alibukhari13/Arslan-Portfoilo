import { getSite } from "@/lib/getSite";
import Marquee from "../ui/Marquee";
import Reveal from "../ui/Reveal";
import ScrollWords from "../ui/ScrollWords";

export default async function Intro() {
  const { stats, tools, copy } = await getSite();
  return (
    <section className="mx-auto grid max-w-[1240px] items-start gap-12 px-5 py-24 md:px-8 lg:grid-cols-[1.25fr_.75fr] lg:py-32">
      <div className="min-w-0">
        <ScrollWords
          text={copy.introStatement}
          className="font-pixel text-[clamp(1.7rem,3vw,2.5rem)] font-normal uppercase leading-[1.05]"
        />
        <p className="mb-4 mt-12 text-sm text-mist">{copy.toolsLabel}</p>
        <Marquee
          slow
          items={tools}
          render={(tool) => (
            <span className="grid h-14 min-w-28 place-items-center border border-white/10 bg-panel px-4 text-[11px] uppercase tracking-[0.16em] text-white/70">
              {tool}
            </span>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 90} className={index % 2 === 0 ? "lg:mt-8" : ""}>
            <article className="flex min-h-[148px] flex-col justify-between bg-panel p-5">
              <p className="font-pixel text-5xl md:text-6xl">{stat.value}</p>
              <p className="text-xs text-mist">{stat.label}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
