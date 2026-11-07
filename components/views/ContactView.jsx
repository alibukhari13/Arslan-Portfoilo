import { getSite } from "@/lib/getSite";
import { isShown } from "@/lib/shown";
import ArrowButton from "../ui/ArrowButton";
import ContactForm from "../ui/ContactForm";
import Photo from "../ui/Photo";
import Reveal from "../ui/Reveal";
import RollText from "../ui/RollText";
import ScrollWords from "../ui/ScrollWords";

function splitTitle(title, marker) {
  const at = title.toLowerCase().indexOf(marker);
  if (at < 0) return { lead: title, rest: "" };
  const end = at + marker.length;
  return { lead: title.slice(0, end), rest: title.slice(end).trim() };
}

export default async function ContactView() {
  const { profile, copy, hidden } = await getSite();
  const hero = splitTitle(copy.contactPageTitle || "", " your ");
  const form = splitTitle(copy.contactTitle || "", "bring ");
  const hours = Array.isArray(profile.hours)
    ? profile.hours
    : String(profile.hours || "")
        .split(/\n|·/)
        .map((line) => line.trim())
        .filter(Boolean);
  const facts = [
    { label: copy.contactEmailLabel, value: profile.email, href: `mailto:${profile.email}` },
    { label: copy.contactPhoneLabel, value: profile.phone, href: profile.phoneHref },
    { label: copy.contactLocationLabel, value: profile.location },
    { label: copy.contactHoursLabel, lines: hours },
  ];

  return (
    <main>
      {isShown(hidden, "contact-page") ? <section className="mx-auto grid w-full max-w-[1320px] items-stretch gap-10 px-5 pt-28 lg:grid-cols-[649px_608px] lg:justify-between lg:gap-16 lg:px-0 lg:pt-[207px]">
        <div className="relative h-[460px] overflow-hidden bg-panel sm:h-[560px] lg:h-[701px]">
          <Photo src={profile.portrait} alt={profile.name} fill priority className="object-cover object-[center_18%]" sizes="649px" />
        </div>

        <div className="flex flex-col lg:h-[701px] lg:pt-[37px]">
          <Reveal>
            <ScrollWords
              as="h1"
              text={hero.lead}
              muted={hero.rest}
              className="display-title max-w-[608px]"
            />
          </Reveal>

          <dl className="mt-16 grid max-w-[608px] grid-cols-1 gap-x-20 gap-y-12 sm:grid-cols-2">
            {facts.map((fact) => (
              <div key={fact.label} className="min-w-0">
                <dt className="text-sm font-medium uppercase text-[#b9b8b8]">{fact.label}</dt>
                <dd className="mt-3 text-[20px] font-semibold leading-[30px] tracking-[-0.01em]">
                  {fact.href ? (
                    <a href={fact.href} className="transition-colors hover:text-lime">
                      {fact.value}
                    </a>
                  ) : (
                    (fact.lines || [fact.value]).filter(Boolean).map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 lg:mt-auto">
            <ArrowButton href="#contact" className="[&_svg]:rotate-90">
              <RollText text={copy.contactStart} />
            </ArrowButton>
          </div>
        </div>
      </section> : null}

      {isShown(hidden, "contact-form") ? <section id="contact" className="mx-auto w-full max-w-[872px] scroll-mt-28 px-5 pb-28 pt-24 lg:px-0 lg:pt-[200px]">
        <Reveal>
          <ScrollWords
            as="h2"
            text={form.lead}
            muted={form.rest}
            className="display-title mx-auto max-w-[588px] text-center"
          />
        </Reveal>
        <div className="mt-[72px]">
          <ContactForm page source="Contact page" email={profile.email} text={copy} />
        </div>
      </section> : null}
    </main>
  );
}
