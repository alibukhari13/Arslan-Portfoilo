import { getSite } from "@/lib/getSite";
import { isShown } from "@/lib/shown";
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
  const { extraServices, tools, plans, copy, hidden } = await getSite();
  const title = splitTitle(copy.pricingTitle);
  const show = (id) => isShown(hidden, id);
  return (
    <main className="pt-28">
      {show("pricing-heading") || show("pricing-plans") ? (
        <section className="mx-auto max-w-[1320px] px-5 md:px-10">
          {show("pricing-heading") ? (
            <>
              <Reveal>
                <ScrollWords
                  as="h1"
                  text={title.lead}
                  muted={title.rest}
                  breakBeforeMuted
                  className="display-title mx-auto max-w-[742px] text-center"
                />
              </Reveal>
              <Reveal delay={100}>
                <p className="mx-auto mt-6 max-w-xl text-center text-mist">{copy.pricingIntro}</p>
              </Reveal>
            </>
          ) : null}
          {show("pricing-plans") ? (
            <div className="py-12">
              <PricingCards plans={plans} note={copy.pricingNote} copy={copy} />
            </div>
          ) : null}
        </section>
      ) : null}

      {show("pricing-tools") ? <div className="mx-auto max-w-[1100px] px-5 md:px-8">
        <Marquee
          slow
          items={tools}
          render={(tool) => (
            <span className="grid h-14 min-w-32 place-items-center border border-white/10 bg-panel px-5 text-[12px] uppercase tracking-[0.16em] text-white/70">
              {tool}
            </span>
          )}
        />
      </div> : null}

      {show("pricing-extra") ? <section className="mx-auto flex w-full max-w-[1320px] flex-col items-center px-5 py-24 md:px-10">
        <Reveal>
          <ScrollWords
            as="h2"
            text={copy.pricingExtraTitle}
            className="display-title max-w-[700px] text-center"
          />
        </Reveal>
        <ul className="mt-16 grid w-full grid-cols-1 gap-x-10 gap-y-5 border border-white/15 px-8 py-10 sm:grid-cols-2 lg:grid-cols-3">
          {extraServices.map((item) => (
            <li key={item} className="flex items-center gap-3 text-base text-white">
              <span aria-hidden className="text-lime">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </section> : null}
      {show("pricing-contact") ? <ContactBand source="Pricing" /> : null}
    </main>
  );
}
