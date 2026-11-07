import { getSite } from "@/lib/getSite";
import ContactForm from "../ui/ContactForm";
import Reveal from "../ui/Reveal";
import ScrollWords from "../ui/ScrollWords";

export default async function ContactBand() {
  const { profile, copy } = await getSite();
  return (
    <section id="contact" className="mx-auto grid max-w-[1240px] items-start gap-10 px-5 py-24 md:px-8 lg:grid-cols-2">
      <Reveal>
        <ScrollWords
          as="h2"
          text={copy.contactTitle}
          className="text-[clamp(2.6rem,5vw,4.8rem)] font-medium uppercase leading-[0.92] tracking-tight"
        />
      </Reveal>
      <ContactForm compact email={profile.email} text={copy} />
    </section>
  );
}
