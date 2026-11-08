import Appear from "../Appear"
import { appearCode } from "./appear-code"
import HeaderDesktop from "./HeaderDesktop"
import HeroSection from "./HeroSection"
import Numbers from "./Numbers"
import QuoteSection from "./QuoteSection"
import Process from "./Process"
import Photo from "./Photo"
import Tools from "./Tools"
import Services from "./Services"
import Images from "./Images"
import Philosophy from "./Philosophy"
import ContactBand from "./ContactBand"
import Spacer from "./Spacer"
import FooterDesktop from "./FooterDesktop"

import fs from "node:fs"
import path from "node:path"

const css = fs.readFileSync(path.join(process.cwd(), "components/pages/about/styles.css"), "utf8")

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="framer-eUAZ1 framer-eqKp6 framer-fzGCR framer-RhHCy framer-Y9OAu framer-kKZ1Q framer-PJOjX framer-1a72m0u" style={{"minHeight": "100vh", "width": "auto", "display": "contents"}} {...{"data-framer-root": ""}}>
      <HeaderDesktop />
      <main className="framer-d9fvo8" style={{}} {...{"data-framer-name": "Main", "draggable": "true"}}>
      <HeroSection />
      <Numbers />
      <QuoteSection />
      <Process />
      <Photo />
      <Tools />
      <Services />
      <Images />
      <Philosophy />
      <ContactBand />
      </main>
      <Spacer />
      <FooterDesktop />
      </div>
      <Appear code={appearCode} />
    </>
  )
}
