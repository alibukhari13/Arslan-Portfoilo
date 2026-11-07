import PricingCards from "../ui/PricingCards";
import Reveal from "../ui/Reveal";
import ScrollWords from "../ui/ScrollWords";
import { getSite } from "@/lib/getSite";

function splitTitle(title) {
  const at = String(title || "").toLowerCase().indexOf(" for ");
  if (at < 0) return { lead: title, rest: "" };
  return { lead: title.slice(0, at), rest: title.slice(at + 1) };
}

export default async function Pricing() {
  const { plans, copy } = await getSite();
  const title = splitTitle(copy.pricingTitle);

  return (
    <section id="pricing" className="px-5 py-24 md:px-10 md:py-[164px]">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col items-center gap-12">
        <Reveal>
          <ScrollWords
            as="h2"
            text={title.lead}
            muted={title.rest}
            breakBeforeMuted
            className="display-title max-w-[742px] text-center"
          />
        </Reveal>
        <PricingCards plans={plans} note={copy.pricingNote} copy={copy} />
      </div>
    </section>
  );
}
