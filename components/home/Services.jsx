import { getSite } from "@/lib/getSite";
import ArrowButton from "../ui/ArrowButton";
import Reveal from "../ui/Reveal";
import ScrollWords from "../ui/ScrollWords";
import ServiceAccordion from "../ui/ServiceAccordion";

export default async function Services() {
  const { services, copy } = await getSite();
  return (
    <section id="services" className="mx-auto max-w-[1240px] px-5 py-20 md:px-8">
      <Reveal className="mb-10">
        <ScrollWords
          as="h2"
          text={copy.servicesTitle}
          className="display-title max-w-[608px]"
        />
      </Reveal>
      <ServiceAccordion items={services.slice(0, 5)} />
      <div className="mt-10 flex justify-center">
        <ArrowButton href="/services">{copy.servicesButton}</ArrowButton>
      </div>
    </section>
  );
}
