import fs from "node:fs";
import path from "node:path";

function section(file) {
  const text = fs.readFileSync(file, "utf8");
  const marker = 'const html = "';
  const start = text.indexOf(marker);
  const end = text.lastIndexOf('"\n\nexport default');
  if (start < 0 || end < 0) throw new Error(`Could not read ${file}`);
  return JSON.parse(`"${text.slice(start + marker.length, end)}"`);
}

let cache;

export function getHomeChrome() {
  if (cache) return cache;
  const dir = path.join(process.cwd(), "components/pages/home");
  cache = {
    css: fs.readFileSync(path.join(dir, "styles.css"), "utf8"),
    header: section(path.join(dir, "HeaderDesktop.jsx")) + section(path.join(dir, "HeaderMobile.jsx")),
    footer: section(path.join(dir, "Footers.jsx")) + section(path.join(dir, "FooterMobile.jsx")),
  };
  return cache;
}
