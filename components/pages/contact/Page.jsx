import FormBridge from "../FormBridge"
import Form from "./Form"
import FAQ from "./FAQ"

import fs from "node:fs"
import path from "node:path"

const css = fs.readFileSync(path.join(process.cwd(), "components/pages/contact/styles.css"), "utf8")

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <style>{`[data-framer-appear-id]{opacity:1!important;transform:none!important}`}</style>
      <div className="framer-DTLd1 framer-25sna framer-Y9OAu framer-RhHCy framer-7flX5 framer-c9tmr framer-kKZ1Q framer-PJOjX framer-fzGCR framer-19jcca9" style={{"minHeight": "100vh", "width": "auto", "display": "contents"}} {...{"data-framer-root": ""}}>
      <main className="framer-q0k67u" style={{}} {...{"data-framer-name": "Main"}}>
      <Form />
      <FAQ />
      </main>
      </div>
      <FormBridge source="Contact page" />
    </>
  )
}
