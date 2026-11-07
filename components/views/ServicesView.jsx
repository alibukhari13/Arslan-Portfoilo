import { getSite } from "@/lib/getSite";
import { isShown } from "@/lib/shown";
import ContactBand from "../home/ContactBand";
import ServiceCards from "../services/ServiceCards";
import Marquee from "../ui/Marquee";
import Reveal from "../ui/Reveal";
import ScrollWords from "../ui/ScrollWords";

export default async function ServicesView() {
  const { services, tools, copy, hidden } = await getSite();
  const show = (id) => isShown(hidden, id);
  const heading = show("services-heading");
  const toolsOn = show("services-tools");
  return (
    <main className="pt-28 md:pt-36">
      {heading || toolsOn ? (
        <section className="mx-auto max-w-[1320px] px-5 md:px-10">
          {heading ? (
            <Reveal>
              <ScrollWords
                as="h1"
                text={copy.servicesPageLead}
                muted={copy.servicesPageRest}
                className="display-title max-w-[608px]"
              />
            </Reveal>
          ) : null}
          {toolsOn ? (
            <div className={heading ? "mt-10" : ""}>
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
          ) : null}
        </section>
      ) : null}
      {show("services-cards") ? (
        <div className="pt-10 md:pt-16">
          <ServiceCards items={services} />
        </div>
      ) : null}
      {show("services-contact") ? <ContactBand source="Services" /> : null}
    </main>
  );
}
