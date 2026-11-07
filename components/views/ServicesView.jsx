import { getSite } from "@/lib/getSite";
import ContactBand from "../home/ContactBand";
import ServiceCards from "../services/ServiceCards";
import Marquee from "../ui/Marquee";
import Reveal from "../ui/Reveal";
import ScrollWords from "../ui/ScrollWords";

export default async function ServicesView() {
  const { services, tools, copy } = await getSite();
  return (
    <main className="pt-28 md:pt-36">
      <section className="mx-auto max-w-[1240px] px-5 md:px-10">
        <Reveal>
          <ScrollWords
            as="h1"
            text={copy.servicesPageLead}
            muted={copy.servicesPageRest}
            className="max-w-[14ch] text-[clamp(2.7rem,6.4vw,5.5rem)] font-medium uppercase leading-[0.9] tracking-[-0.035em]"
          />
        </Reveal>
        <div className="mt-10">
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
      </section>
      <div className="pt-10 md:pt-16">
        <ServiceCards items={services} />
      </div>
      <ContactBand source="Services" />
    </main>
  );
}
