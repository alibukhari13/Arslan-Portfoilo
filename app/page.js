import Certificates from "@/components/home/Certificates";
import ContactBand from "@/components/home/ContactBand";
import Faq from "@/components/home/Faq";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import Hero from "@/components/home/Hero";
import Intro from "@/components/home/Intro";
import Pricing from "@/components/home/Pricing";
import Process from "@/components/home/Process";
import Services from "@/components/home/Services";
import Testimonials from "@/components/home/Testimonials";
import { getSite } from "@/lib/getSite";
import { isShown } from "@/lib/shown";

export default async function HomePage() {
  const site = await getSite();
  const show = (id) => isShown(site.hidden, id);
  return (
    <main>
      {show("home-hero") ? <Hero /> : null}
      {show("home-intro") ? <Intro /> : null}
      {show("home-services") ? <Services /> : null}
      {show("home-projects") ? <FeaturedProjects projects={site.projects} title={site.copy.projectsTitle} labels={site.copy} /> : null}
      {show("home-process") ? <Process process={site.process} /> : null}
      {show("home-pricing") ? <Pricing /> : null}
      {show("home-notes") ? <Testimonials /> : null}
      {show("home-faq") ? <Faq /> : null}
      {show("home-certificates") ? <Certificates /> : null}
      {show("home-contact") ? <ContactBand /> : null}
    </main>
  );
}
