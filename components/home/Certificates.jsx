import { getSite } from "@/lib/getSite";
import Reveal from "../ui/Reveal";
import ScrollWords from "../ui/ScrollWords";
import { ArrowIcon } from "../ui/Icons";

export default async function Certificates() {
  const { copy, profile } = await getSite();
  const certificates = Array.isArray(copy.certificates) ? copy.certificates.filter((item) => item && (item.title || item.image)) : [];

  return (
    <section id="certificates" className="mx-auto w-full max-w-[1320px] px-5 py-24 md:px-10 md:py-[120px]">
      <Reveal>
        <ScrollWords
          as="h2"
          text={copy.certificatesLead}
          muted={copy.certificatesRest}
          breakBeforeMuted
          className="display-title max-w-[608px]"
        />
      </Reveal>
      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {certificates.map((cert, index) => (
          <Reveal key={`${cert.code || cert.title}-${index}`} delay={index * 120}>
            <a href={cert.href || cert.image} target="_blank" rel="noreferrer" className="group block bg-panel">
              <div className="aspect-[1600/1132] overflow-hidden bg-[#f7f4ee]">
                <img
                  src={cert.image}
                  alt={`${cert.title} certificate, ${profile.name}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </div>
              <div className="flex items-end justify-between gap-6 p-6 md:p-8">
                <div className="min-w-0">
                  <p className="text-sm font-medium uppercase tracking-[-0.01em] text-[#b9b8b8]">{cert.issuer}</p>
                  <p className="mt-2 text-[22px] font-semibold leading-8 tracking-[-0.01em]">{cert.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[#b9b8b8]">
                    {cert.date}
                    {cert.code ? ` · ${cert.code}` : ""}
                  </p>
                </div>
                <span className="grid h-10 w-10 shrink-0 place-items-center bg-lime text-ink transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
