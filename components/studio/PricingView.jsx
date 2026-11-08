import { getSite } from "@/lib/getSite";
import { isShown } from "@/lib/shown";
import Plans from "./Plans";
import StudioForm from "./StudioForm";

export default async function PricingView() {
  const { plans, extraServices, tools, profile, copy, hidden } = await getSite();
  const show = (id) => isShown(hidden, id);

  return (
    <main className="bg-white px-5 pb-16 pt-24 text-[#0b0b0c] md:px-10 md:pt-28">
      <div className="mx-auto max-w-[1440px]">
        {show("pricing-heading") ? (
          <header>
            <h1 className="studio-display max-w-4xl text-[clamp(48px,6vw,84px)] uppercase leading-[0.95]">
              {copy.pricingTitle || "Flexible plans for every product"}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#555]">{copy.pricingIntro}</p>
          </header>
        ) : null}

        {show("pricing-plans") ? (
          <div className="mt-12">
            <Plans plans={plans} note={copy.pricingNote} />
          </div>
        ) : null}

        {show("pricing-tools") ? (
          <div className="mt-16 overflow-hidden border-y border-black/10">
            <div className="study-ticker flex w-max py-4" style={{ animationDuration: "36s" }}>
              {[...tools, ...tools].map((tool, index) => (
                <span key={`${tool}-${index}`} className="px-6 text-xs uppercase tracking-[0.16em]">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {show("pricing-extra") ? (
          <section className="mt-20">
            <h2 className="text-[clamp(36px,4vw,56px)]">{copy.pricingExtraTitle || "Also available"}</h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {extraServices.map((item) => (
                <li key={item} className="border border-black/10 px-4 py-3 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {show("pricing-contact") ? (
          <section className="mt-24 grid gap-10 lg:grid-cols-2">
            <h2 className="text-5xl">Start with a plan</h2>
            <StudioForm source="Pricing" email={profile.email} text={copy} />
          </section>
        ) : null}
      </div>
    </main>
  );
}
