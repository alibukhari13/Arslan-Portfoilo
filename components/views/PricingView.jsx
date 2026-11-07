import { getSite } from "@/lib/getSite";
import ContactBand from "../home/ContactBand";
import Marquee from "../ui/Marquee";
import PricingCards from "../ui/PricingCards";
import Reveal from "../ui/Reveal";
import ScrollWords from "../ui/ScrollWords";

function splitTitle(title) {
  const at = String(title || "").toLowerCase().indexOf(" for ");
  if (at < 0) return { lead: title, rest: "" };
  return { lead: title.slice(0, at), rest: title.slice(at + 1) };
}

export default async function PricingView() {
  const { extraServices, tools, plans, copy } = await getSite();
  const title = splitTitle(copy.pricingTitle);
  return (
    <main className="pt-28">
      <section className="mx-auto max-w-[1320px] px-5 md:px-10">
        <Reveal>
          <ScrollWords
            as="h1"
            text={title.lead}
            muted={title.rest}
            breakBeforeMuted
            className="mx-auto max-w-[742px] text-center text-[clamp(2.75rem,6vw,5rem)] uppercase leading-[0.8]"
            style={{ letterSpacing: "-0.04em" }}
          />
        </Reveal>
        <Reveal delay={100}>
          <p className="mx-auto mt-6 max-w-xl text-center text-mist">{copy.pricingIntro}</p>
        </Reveal>
        <div className="py-12">
          <PricingCards plans={plans} note={copy.pricingNote} copy={copy} />
        </div>
      </section>

      <div className="mx-auto max-w-[1100px] px-5 md:px-8">
        <Marquee
          slow
          items={tools}
          render={(tool) => (
            <span className="grid h-14 min-w-32 place-items-center border border-white/10 bg-panel px-5 text-[12px] uppercase tracking-[0.16em] text-white/70">
              {tool}
            </span>
          )}
        />
      </div>

      <section className="mx-auto max-w-[1100px] px-5 py-16 md:px-8">
        <Reveal>
          <ScrollWords
            as="h2"
            text={copy.pricingExtraTitle}
            className="max-w-[16ch] text-[clamp(2rem,4vw,3.4rem)] font-medium uppercase leading-[0.95] tracking-tight"
          />
        </Reveal>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {extraServices.map((item, index) => (
            <Reveal key={item} as="li" delay={(index % 6) * 50}>
              <div className="border border-white/10 px-4 py-4 text-sm text-white/85 transition-colors duration-300 hover:border-lime/60 hover:text-white">
                {item}
              </div>
            </Reveal>
          ))}
        </ul>
      </section>
      <ContactBand />
    </main>
  );
}
