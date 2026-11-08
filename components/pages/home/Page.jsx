import Appear from "../Appear"
import { appearCode } from "./appear-code"
import FormBridge from "../FormBridge"
import StartupLoader from "./StartupLoader"
import Hero from "./Hero"
import BannerSection from "./BannerSection"
import HeaderDesktop from "./HeaderDesktop"
import HeaderMobile from "./HeaderMobile"
import Numbers from "./Numbers"
import Description from "./Description"
import Benefits from "./Benefits"
import Work from "./Work"
import Services from "./Services"
import Quote from "./Quote"
import LogoMarquee from "./LogoMarquee"
import MyVision from "./MyVision"
import Pricing from "./Pricing"
import Process from "./Process"
import Testimonials from "./Testimonials"
import FAQ from "./FAQ"
import ContactBand from "./ContactBand"
import ContactBandMobile from "./ContactBandMobile"
import Footers from "./Footers"
import FooterMobile from "./FooterMobile"

import fs from "node:fs"
import path from "node:path"

const css = fs.readFileSync(path.join(process.cwd(), "components/pages/home/styles.css"), "utf8")

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="framer-L4aOu framer-eqKp6 framer-Y9OAu framer-RhHCy framer-fzGCR framer-nNZda framer-tQrMV framer-wOGvT framer-PJOjX framer-7flX5 framer-72rtr7" style={{"minHeight": "100vh", "width": "auto", "display": "contents"}} {...{"data-framer-root": ""}}>
      <StartupLoader />
      <Hero />
      <BannerSection />
      <HeaderDesktop />
      <HeaderMobile />
      <main className="framer-1ojost9" style={{}} {...{"data-framer-name": "Main"}}>
      <Numbers />
      <Description />
      <Benefits />
      <Work />
      <Services />
      <Quote />
      <LogoMarquee />
      <MyVision />
      <Pricing />
      <Process />
      <Testimonials />
      <FAQ />
      <ContactBand />
      <ContactBandMobile />
      </main>
      <Footers />
      <FooterMobile />
      </div>
      <Appear code={appearCode} />
      <FormBridge source="Home" />
    </>
  )
}
