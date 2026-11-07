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

export default async function HomePage() {
  const site = await getSite();
  return (
    <main>
      <Hero />
      <Intro />
      <Services />
      <FeaturedProjects projects={site.projects} title={site.copy.projectsTitle} labels={site.copy} />
      <Process process={site.process} />
      <Pricing />
      <Testimonials />
      <Faq />
      <Certificates />
      <ContactBand />
    </main>
  );
}
