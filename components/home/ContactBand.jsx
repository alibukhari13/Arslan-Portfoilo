import { getSite } from "@/lib/getSite";
import ContactForm from "../ui/ContactForm";
import Reveal from "../ui/Reveal";
import ScrollWords from "../ui/ScrollWords";

function splitTitle(title) {
  const value = String(title || "");
  const at = value.toLowerCase().indexOf("bring ");
  if (at < 0) return { lead: value, rest: "" };
  return { lead: value.slice(0, at + "bring ".length), rest: value.slice(at + "bring ".length).trim() };
}

export default async function ContactBand({ source = "Home" }) {
  const { profile, copy } = await getSite();
  const title = splitTitle(copy.contactTitle);
  return (
    <section id="contact" className="mx-auto flex w-full max-w-[1320px] flex-col items-center px-5 pb-24 pt-24 md:pb-[164px]">
      <Reveal>
        <ScrollWords
          as="h2"
          text={title.lead}
          muted={title.rest}
          className="display-title max-w-[588px] text-center"
        />
      </Reveal>
      <div className="mt-16 w-full max-w-[872px]">
        <ContactForm page source={source} email={profile.email} text={copy} />
      </div>
    </section>
  );
}
