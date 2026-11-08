#!/usr/bin/env python3
"""Split the saved Framer pages into one Next component per section."""

import json
import re
from pathlib import Path

ROOT = Path("/Users/alibukhari/Desktop/Arslan-Portfoilo")
OUT = ROOT / "components" / "pages"
VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}
SKIP = {"script", "style"}

PAGES = {
    "home": ("public/framer-home/index.html", "/framer-home/"),
    "about": ("public/framer-about/index.html", "/framer-about/"),
    "projects": ("public/framer-projects/index.html", "/framer-projects/"),
    "contact": ("public/framer-contact/index.html", "/framer-contact/"),
}


def scan(html):
    i = 0
    n = len(html)
    stack = []
    found = []
    while i < n:
        if html[i] != "<":
            i += 1
            continue
        if html.startswith("<!--", i):
            j = html.find("-->", i + 4)
            i = n if j < 0 else j + 3
            continue
        if html.startswith("</", i):
            j = html.find(">", i)
            if j < 0:
                break
            tag = re.split(r"\s", html[i + 2 : j].strip() or "div")[0].lower()
            for k in range(len(stack) - 1, -1, -1):
                if stack[k][0] == tag:
                    found.append(
                        {
                            "tag": tag,
                            "depth": stack[k][2],
                            "name": stack[k][3],
                            "start": stack[k][1],
                            "end": j + 1,
                            "attr": stack[k][4],
                        }
                    )
                    del stack[k:]
                    break
            i = j + 1
            continue
        j = html.find(">", i)
        if j < 0:
            break
        raw = html[i + 1 : j]
        selfclose = raw.rstrip().endswith("/")
        bits = raw.strip().strip("/").split(None, 1)
        if not bits:
            i = j + 1
            continue
        tag = bits[0].lower()
        attr = bits[1] if len(bits) > 1 else ""
        match = re.search(r'data-framer-name="([^"]*)"', attr)
        name = match.group(1) if match else ""
        if tag in SKIP and not selfclose:
            end = html.lower().find(f"</{tag}>", j)
            i = n if end < 0 else end + len(tag) + 3
            continue
        if tag not in VOID and not selfclose and not tag.startswith("!"):
            stack.append((tag, i, len(stack), name, attr))
        i = j + 1
    return found


def rewrite(text, prefix):
    for folder in ("fonts/", "images/", "media/"):
        text = text.replace(f'url("{folder}', f'url("{prefix}{folder}')
        text = text.replace(f"url('{folder}", f"url('{prefix}{folder}")
        text = text.replace(f"url({folder}", f"url({prefix}{folder}")
        text = text.replace(f'="{folder}', f'="{prefix}{folder}')
        text = text.replace(f"='{folder}", f"='{prefix}{folder}")
        text = text.replace(f",{folder}", f",{prefix}{folder}")
    text = text.replace(' target="_top"', "")
    return text


def styles(html):
    chunks = []
    i = 0
    while True:
        a = html.find("<style", i)
        if a < 0:
            break
        b = html.find(">", a)
        c = html.find("</style>", b)
        chunks.append(html[b + 1 : c])
        i = c + 8
    return "\n".join(chunks)


def script_body(html, pred):
    i = 0
    while True:
        a = html.find("<script", i)
        if a < 0:
            return ""
        b = html.find(">", a)
        c = html.find("</script>", b)
        open_tag = html[a : b + 1]
        body = html[b + 1 : c]
        if pred(open_tag, body):
            return body
        i = c + 9


def pascal(value):
    parts = re.sub(r"[^A-Za-z0-9]+", " ", value).split()
    return "".join(part[:1].upper() + part[1:] for part in parts if part)


def choose_name(chunk, framer_name, used):
    head = chunk[:2500]
    if "framer-1euzf18-container" in head:
        base = "StartupLoader"
    elif "<header" in head and "Phone closed" in head:
        base = "HeaderMobile"
    elif "<header" in head and "Desktop closed" in head:
        base = "HeaderDesktop"
    elif head.count("<footer") > 1 or chunk.count("<footer") > 1:
        base = "Footers"
    elif "<footer" in head and "Phone" in head[:4000]:
        base = "FooterMobile"
    elif "<footer" in head and "Tablet" in head[:4000]:
        base = "FooterTablet"
    elif "<footer" in head:
        base = "FooterDesktop"
    elif framer_name:
        base = pascal(framer_name)
    else:
        match = re.search(r"<h[1-3][^>]*>(.*?)</h[1-3]>", chunk[:8000], re.S)
        text = re.sub(r"<[^>]+>", "", match.group(1) if match else "")
        text = re.sub(r"\s+", " ", text).strip()
        base = pascal(text)[:42] or "Section"
    if not base or not base[0].isalpha():
        base = "Section"
    name = base
    count = 2
    while name in used:
        name = f"{base}{count}"
        count += 1
    used.add(name)
    return name


def jsx_attr(attr):
    class_match = re.search(r'class="([^"]*)"', attr)
    style_match = re.search(r'style="([^"]*)"', attr)
    class_name = class_match.group(1) if class_match else ""
    style = {}
    if style_match:
        for part in style_match.group(1).split(";"):
            if ":" not in part:
                continue
            key, value = part.split(":", 1)
            key = key.strip()
            value = value.strip()
            if not key:
                continue
            if key.startswith("--"):
                style[key] = value
            else:
                bits = key.split("-")
                camel = bits[0] + "".join(bit.capitalize() for bit in bits[1:])
                style[camel] = value
    rest = re.sub(r'\s(?:class|style)\s*=\s*"[^"]*"', " ", attr)
    props = []
    for match in re.finditer(r"""([:@\w-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?""", rest):
        key, v1, v2, v3 = match.groups()
        if key.lower() in {"class", "style"}:
            continue
        value = v1 if v1 is not None else v2 if v2 is not None else v3 if v3 is not None else ""
        react = "tabIndex" if key == "tabindex" else "htmlFor" if key == "for" else key
        props.append(f"{json.dumps(react)}: {json.dumps(value)}")
    return class_name, style, "{" + ", ".join(props) + "}"


def write_component(folder, name, html):
    label = re.sub(r"(?<!^)(?=[A-Z])", " ", name)
    source = (
        f"// {label}. Edit this file to change this section only.\n"
        f"const html = {json.dumps(html)}\n\n"
        f"export default function {name}() {{\n"
        f"  return <div style={{{{ display: \"contents\" }}}} dangerouslySetInnerHTML={{{{ __html: html }}}} />\n"
        f"}}\n"
    )
    (folder / f"{name}.jsx").write_text(source)


def build(page, rel, prefix):
    html = (ROOT / rel).read_text(errors="ignore")
    css = rewrite(styles(html), prefix)
    body_at = html.find("<body")
    body = html[body_at:]
    nodes = scan(body)
    root = next(node for node in nodes if "data-framer-root" in node["attr"])
    parent = None
    for node in nodes:
        if node["start"] < root["start"] and node["end"] > root["end"]:
            if parent is None or node["depth"] > parent["depth"]:
                parent = node
    siblings = []
    if parent:
        for node in nodes:
            if node["depth"] == root["depth"] and node["start"] > parent["start"] and node["end"] < parent["end"]:
                if node["end"] - node["start"] > 400:
                    siblings.append(node)
    else:
        siblings = [root]

    pieces = []
    for node in siblings:
        if node is root or (node["start"] == root["start"]):
            for child in nodes:
                if child["depth"] == root["depth"] + 1 and child["start"] > root["start"] and child["end"] < root["end"]:
                    if child["end"] - child["start"] < 80:
                        continue
                    if child["tag"] == "main":
                        for grand in nodes:
                            if (
                                grand["depth"] == child["depth"] + 1
                                and grand["start"] > child["start"]
                                and grand["end"] < child["end"]
                                and grand["end"] - grand["start"] > 80
                            ):
                                pieces.append(("main", grand, child))
                    else:
                        pieces.append(("root", child, None))
        else:
            pieces.append(("after", node, None))

    folder = OUT / page
    folder.mkdir(parents=True, exist_ok=True)
    for old in folder.glob("*.jsx"):
        old.unlink()
    for old in folder.glob("*.js"):
        old.unlink()

    used = set()
    ordered = []
    main_attr = None
    for place, node, main_node in pieces:
        chunk = rewrite(body[node["start"] : node["end"]], prefix)
        name = choose_name(chunk, node["name"], used)
        write_component(folder, name, chunk)
        ordered.append((place, name, node["name"] or name))
        if main_node and main_attr is None:
            main_attr = main_node["attr"]

    (folder / "styles.css").write_text(css)
    appear = script_body(html, lambda tag, body: body.startswith("var animator="))
    boot = ""
    i = 0
    while True:
        a = html.find("<script", i)
        if a < 0:
            break
        b = html.find(">", a)
        c = html.find("</script>", b)
        body_text = html[b + 1 : c]
        if "animateAppearEffects" in body_text and "framer-appear-start" in body_text:
            boot = body_text
            break
        i = c + 9
    content = script_body(html, lambda tag, body: 'id="__framer__appearAnimationsContent"' in tag)
    breaks = script_body(html, lambda tag, body: 'id="__framer__breakpoints"' in tag)
    nested = script_body(html, lambda tag, body: "data-nested-link" in body and "dataset.hydrated" in body)
    code = ""
    if appear and boot:
        code = (
            f"window.__framer__appearAnimationsContent={{text:{json.dumps(content)}}};\n"
            f"window.__framer__breakpoints={{text:{json.dumps(breaks)}}};\n"
            f"{appear}\n{boot}\n{nested}\n"
        )
    (folder / "appear-code.js").write_text("export const appearCode = " + json.dumps(code) + "\n")

    root_class, root_style, root_data = jsx_attr(root["attr"])
    main_class, main_style, main_data = jsx_attr(main_attr or "")
    imports = ['import Appear from "../Appear"', 'import { appearCode } from "./appear-code"']
    if page in {"home", "contact"}:
        imports.append('import FormBridge from "../FormBridge"')
    seen = []
    for _, name, _label in ordered:
        if name not in seen:
            imports.append(f'import {name} from "./{name}"')
            seen.append(name)

    def open_tag(kind, class_name, style, data):
        return (
            f"<{kind} className={json.dumps(class_name)} "
            f"style={{{json.dumps(style)}}} "
            f"{{...{data}}}>"
        )

    body_lines = []
    in_main = False
    for place, name, _label in ordered:
        if place == "main" and not in_main:
            body_lines.append("      " + open_tag("main", main_class, main_style, main_data))
            in_main = True
        if place != "main" and in_main:
            body_lines.append("      </main>")
            in_main = False
        body_lines.append(f"      <{name} />")
    if in_main:
        body_lines.append("      </main>")

    form = ""
    if page == "home":
        form = '\n      <FormBridge source="Home" />'
    elif page == "contact":
        form = '\n      <FormBridge source="Contact page" />'

    page_source = (
        "\n".join(imports)
        + "\n\nexport default function Page() {\n  return (\n    <>\n"
        + "      <style dangerouslySetInnerHTML={{ __html: css }} />\n"
        + "      " + open_tag("div", root_class, root_style, root_data) + "\n"
        + "\n".join(body_lines)
        + "\n      </div>\n"
        + "      <Appear code={appearCode} />"
        + form
        + "\n    </>\n  )\n}\n"
    )
    page_source = page_source.replace(
        "export default function Page() {",
        "import fs from \"node:fs\"\nimport path from \"node:path\"\n\n"
        f"const css = fs.readFileSync(path.join(process.cwd(), \"components/pages/{page}/styles.css\"), \"utf8\")\n\n"
        "export default function Page() {",
        1,
    )
    # The spread of data props that include data-framer-root may duplicate. root_data includes it.
    (folder / "Page.jsx").write_text(page_source)
    manifest = "\n".join(f"{place}\t{name}\t{label}" for place, name, label in ordered)
    (folder / "sections.txt").write_text(manifest + "\n")
    print(f"\n{page}: {len(ordered)} sections, css {len(css)}, appear {len(code)}")
    for place, name, label in ordered:
        print(f"  {place:5} {name}")


def main():
    for page, (rel, prefix) in PAGES.items():
        build(page, rel, prefix)


if __name__ == "__main__":
    main()
