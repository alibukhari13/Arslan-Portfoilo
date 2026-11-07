import { getSite } from "@/lib/getSite";
import FaqList from "../ui/FaqList";
import Reveal from "../ui/Reveal";
import ScrollWords from "../ui/ScrollWords";

export default async function Faq() {
  const { faqs, copy } = await getSite();
  return (
    <section id="faq" className="mx-auto grid max-w-[1240px] gap-10 px-5 py-20 md:px-8 lg:grid-cols-[.8fr_1.2fr]">
      <Reveal>
        <ScrollWords
          as="h2"
          text={copy.faqTitle}
          className="text-[clamp(2.3rem,4.5vw,4rem)] font-medium uppercase leading-[0.92] tracking-tight"
        />
      </Reveal>
      <Reveal delay={80}>
        <FaqList items={faqs} />
      </Reveal>
    </section>
  );
}
