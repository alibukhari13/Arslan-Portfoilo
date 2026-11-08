import { getSite } from "@/lib/getSite";
import { isShown } from "@/lib/shown";
import StudioForm from "./StudioForm";
import { StudioFaq } from "./HomeView";

export default async function ContactView() {
  const { profile, faqs, copy, hidden } = await getSite();
  const hours = Array.isArray(profile.hours) ? profile.hours : String(profile.hours || "").split(/\n|·/).map((line) => line.trim()).filter(Boolean);

  return (
    <main className="bg-white px-5 pb-16 pt-24 text-[#0b0b0c] md:px-10 md:pt-28">
      <div className="mx-auto max-w-[1440px]">
        {isShown(hidden, "contact-page") ? (
          <header className="grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <h1 className="text-[clamp(64px,9vw,112px)] leading-[0.9] tracking-[-0.06em]">Let’s talk</h1>
              <p className="mt-4 max-w-md text-base leading-7 text-[#555]">Whether it’s a new project or a quick question, I’m here to connect.</p>
            </div>
            <dl className="grid gap-6 sm:grid-cols-2">
              <div>
                <dt className="text-xs uppercase tracking-[0.14em] text-[#888]">Phone</dt>
                <dd className="mt-2"><a href={profile.phoneHref}>{profile.phone}</a></dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.14em] text-[#888]">Email</dt>
                <dd className="mt-2"><a href={`mailto:${profile.email}`}>{profile.email}</a></dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.14em] text-[#888]">Address</dt>
                <dd className="mt-2">{profile.location}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.14em] text-[#888]">Availability</dt>
                <dd className="mt-2">{hours.join(" · ")}</dd>
              </div>
            </dl>
          </header>
        ) : null}

        {isShown(hidden, "contact-form") ? (
          <section className="mt-20 grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-4xl tracking-[-0.05em]">Get in touch</h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-[#555]">
                Fill out the form or write directly. I’ll reply to the email you enter.
              </p>
              <ul className="mt-8 space-y-2 text-sm">
                {profile.socials.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} target="_blank" rel="noreferrer" className="hover:text-[#F9452D]">{item.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            <StudioForm source="Contact page" email={profile.email} text={copy} />
          </section>
        ) : null}

        {isShown(hidden, "home-faq") ? (
          <section className="mt-24">
            <h2 className="text-5xl tracking-[-0.05em]">FAQ</h2>
            <div className="mt-8">
              <StudioFaq faqs={faqs} />
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
