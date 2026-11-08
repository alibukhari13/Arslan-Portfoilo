import { getSite } from "@/lib/getSite";
import { isShown } from "@/lib/shown";
import ServiceList from "./ServiceList";
import StudioForm from "./StudioForm";

export default async function ServicesView() {
  const { services, tools, profile, copy, hidden } = await getSite();
  const show = (id) => isShown(hidden, id);

  return (
    <main className="bg-white px-5 pb-16 pt-24 text-[#0b0b0c] md:px-10 md:pt-28">
      <div className="mx-auto max-w-[1440px]">
        {show("services-heading") ? (
          <h1 className="studio-display max-w-3xl text-[clamp(48px,6vw,84px)] leading-[0.95]">
            {copy.servicesPageLead} {copy.servicesPageRest}
          </h1>
        ) : null}

        {show("services-tools") ? (
          <div className="mt-10 overflow-hidden border-y border-black/10">
            <div className="study-ticker flex w-max py-4" style={{ animationDuration: "36s" }}>
              {[...tools, ...tools].map((tool, index) => (
                <span key={`${tool}-${index}`} className="px-6 text-xs uppercase tracking-[0.16em] text-[#444]">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {show("services-cards") ? (
          <div className="mt-16">
            <ServiceList services={services} />
          </div>
        ) : null}

        {show("services-contact") ? (
          <section className="mt-24 grid gap-10 lg:grid-cols-2">
            <h2 className="text-5xl">Let’s talk about the product</h2>
            <StudioForm source="Services" email={profile.email} text={copy} />
          </section>
        ) : null}
      </div>
    </main>
  );
}
