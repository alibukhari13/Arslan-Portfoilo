import ProjectGrid from "./ProjectGrid"
import ContactBand from "./ContactBand"
import ContactBandTablet from "./ContactBandTablet"
import ContactBandMobile from "./ContactBandMobile"
import fs from "node:fs"
import path from "node:path"

const css = fs.readFileSync(path.join(process.cwd(), "components/pages/projects/styles.css"), "utf8")

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <style>{`[data-framer-appear-id]{opacity:1!important;transform:none!important}.framer-g343wv-container{transform:none!important}`}</style>
      <div className="framer-qiVdq framer-z384y7" style={{"minHeight": "100vh", "width": "auto", "display": "contents"}} {...{"data-framer-root": ""}}>
      <main className="framer-1xy1kbf" style={{}} {...{"data-framer-name": "Main"}}>
      <ProjectGrid />
      <ContactBand />
      <ContactBandTablet />
      <ContactBandMobile />
      </main>
      </div>
    </>
  )
}
