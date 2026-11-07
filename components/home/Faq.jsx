import { getSite } from "@/lib/getSite";
import FaqList from "../ui/FaqList";
import Reveal from "../ui/Reveal";
import ScrollWords from "../ui/ScrollWords";

export default async function Faq() {
  const { faqs, copy } = await getSite();
  return (
    <section id="faq" className="mx-auto flex w-full max-w-[1320px] flex-col items-center gap-16 px-5 py-24 md:px-10">
      <Reveal>
        <ScrollWords as="h2" text={copy.faqTitle} className="display-title max-w-[560px] text-center" />
      </Reveal>
      <div className="w-full max-w-[872px]">
        <FaqList items={faqs} />
      </div>
    </section>
  );
}
