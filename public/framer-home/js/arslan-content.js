(function () {
  var ORIGINALS = ["AI Habit", "Fintech AI Mobile", "Food Delivery App Design", "3D AI Builder", "Music Player &"];
  var data = null;
  var applying = false;

  if (/^\/projects\/[^/]+\/?$/.test(location.pathname)) {
    var hold = document.createElement("style");
    hold.id = "arslan-case-hold";
    hold.textContent = "html:not([data-arslan-case='ready']) section[data-framer-name='Hero'], html:not([data-arslan-case='ready']) article { visibility: hidden; }";
    document.head.appendChild(hold);
  }

  function safeUrl(value) {
    var url = String(value || "").trim();
    if (url.charAt(0) === "/" && url.charAt(1) !== "/") return url;
    if (/^https?:\/\//i.test(url)) return url;
    return "";
  }

  function isOriginal(title) {
    return ORIGINALS.some(function (name) { return title.indexOf(name) !== -1; });
  }

  function projectAnchors() {
    return Array.prototype.filter.call(document.querySelectorAll("a"), function (anchor) {
      var heading = anchor.querySelector("h3");
      if (!heading) return false;
      if (anchor.getAttribute("data-arslan-card") === "1") return true;
      return isOriginal(heading.textContent || "");
    });
  }

  function fill(anchor, project) {
    if (!anchor || !project) return;
    var heading = anchor.querySelector("h3");
    if (heading) heading.textContent = project.title;
    var summary = anchor.querySelector("[data-arslan-summary]");
    if (!summary) {
      summary = Array.prototype.find.call(anchor.querySelectorAll("p"), function (node) {
        return (node.textContent || "").trim().length > 40;
      });
    }
    if (summary) {
      summary.setAttribute("data-arslan-summary", "1");
      summary.textContent = project.summary;
    }
    var pill = anchor.querySelector("[data-arslan-pill]");
    if (!pill) {
      pill = Array.prototype.find.call(anchor.querySelectorAll("p, span"), function (node) {
        var label = (node.textContent || "").trim();
        return label && label.length < 48 && node !== summary && !node.querySelector("p, h3");
      });
    }
    if (pill) {
      pill.setAttribute("data-arslan-pill", "1");
      pill.textContent = pillLabel(project);
    }
    var image = anchor.querySelector("img");
    var src = safeUrl(project.image);
    if (image && src) {
      image.removeAttribute("srcset");
      image.removeAttribute("sizes");
      image.src = src;
      image.alt = project.title;
    }
    var href = safeUrl(project.href);
    if (href) anchor.setAttribute("href", href);
    anchor.setAttribute("data-arslan-card", "1");
  }

  function grids() {
    return Array.prototype.filter.call(document.querySelectorAll("div"), function (node) {
      if (node.getAttribute("data-arslan-grid") === "1") return true;
      var cards = Array.prototype.filter.call(node.children, function (child) {
        return child.querySelector && child.querySelector("h3");
      });
      if (cards.length < 4) return false;
      var display = getComputedStyle(node).display;
      return display === "grid" || display === "flex";
    });
  }

  function showAll(list) {
    grids().forEach(function (grid) {
      grid.setAttribute("data-arslan-grid", "1");
      var cards = Array.prototype.filter.call(grid.children, function (child) {
        return child.querySelector && (child.querySelector("h3") || child.querySelector("[data-arslan-card]"));
      });
      if (!cards.length) return;
      var proto = cards[0];
      while (cards.length < list.length) {
        var clone = proto.cloneNode(true);
        clone.querySelectorAll("[style]").forEach(function (node) {
          node.style.opacity = "1";
          node.style.transform = "none";
        });
        grid.appendChild(clone);
        cards.push(clone);
      }
      while (cards.length > list.length) {
        var extra = cards.pop();
        extra.remove();
      }
      cards.forEach(function (card, index) {
        fill(card.querySelector("a") || card, list[index]);
      });
    });
  }

  function showFeatured(list) {
    var featured = list.slice(0, 5);
    var anchors = projectAnchors().filter(function (anchor) {
      return !anchor.closest("[data-arslan-grid]");
    });
    anchors.forEach(function (anchor, index) {
      fill(anchor, featured[index % featured.length]);
    });
  }

  function updateCount(total) {
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    var node;
    while ((node = walker.nextNode())) {
      if (node.nodeValue && node.nodeValue.indexOf("(17)") !== -1) {
        node.nodeValue = node.nodeValue.replace("(17)", "(" + total + ")");
      }
    }
  }

  function hideSelected(hidden) {
    var label = Array.prototype.find.call(document.querySelectorAll("p, div, h2"), function (node) {
      return (node.textContent || "").trim() === "Selected work" && node.children.length < 3;
    });
    var section = label && (label.closest("section") || label.parentElement);
    if (section) section.style.display = hidden ? "none" : "";
  }

  function certificates(info) {
    var current = document.getElementById("arslan-certificates");
    if (location.pathname !== "/" || !info.showCertificates || !info.certificates.length) {
      if (current) current.remove();
      return;
    }
    var signature = "v2|" + info.certificates.map(function (item) { return item.image + item.title + item.issuer; }).join("|");
    if (current && current.getAttribute("data-signature") === signature) {
      var existingGrid = current.querySelector(".certs");
      if (existingGrid) existingGrid.style.gridTemplateColumns = window.innerWidth < 900 ? "1fr" : "repeat(2, minmax(0, 1fr))";
      return;
    }
    if (current) current.remove();
    if (!document.getElementById("arslan-cert-style")) {
      var style = document.createElement("style");
      style.id = "arslan-cert-style";
      style.textContent = "#arslan-certificates{box-sizing:border-box;width:100%;padding:88px 36px 72px;background:#fff;color:#0c0c0c}#arslan-certificates h2{margin:0;max-width:1368px;font-family:Inter,sans-serif;font-weight:600;font-size:clamp(56px,7.8vw,112px);line-height:.96;letter-spacing:-.07em}#arslan-certificates h2 span{display:block;color:rgba(11,11,12,.45)}#arslan-certificates .certs{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;max-width:1368px;margin-top:36px}#arslan-certificates a,#arslan-certificates article{display:flex;flex-direction:column;color:inherit;text-decoration:none}#arslan-certificates .frame{display:flex;align-items:center;justify-content:center;background:#f3f3f3;aspect-ratio:16/11;padding:28px}#arslan-certificates img{display:block;width:100%;height:100%;object-fit:contain}#arslan-certificates h3{margin:18px 0 0;font-family:Inter,sans-serif;font-size:26px;font-weight:600;line-height:1.3;letter-spacing:-.04em}#arslan-certificates .issuer{margin:8px 0 0;font-family:Inter,sans-serif;font-size:18px;font-weight:500;line-height:1.4;letter-spacing:-.04em;color:rgba(12,12,12,.6)}#arslan-certificates .pill{align-self:flex-start;margin-top:16px;border:1px solid rgba(11,11,12,.16);border-radius:50px;padding:7px 14px;font-family:Inter,sans-serif;font-size:11px;font-weight:600;letter-spacing:.04em;text-transform:uppercase}@media(max-width:900px){#arslan-certificates{padding:56px 20px 40px}#arslan-certificates .certs{grid-template-columns:1fr}}";
      document.head.appendChild(style);
    }

    var heading = Array.prototype.find.call(document.querySelectorAll("h2"), function (node) {
      return /bring your vision/i.test(node.textContent || "");
    });
    if (!heading) return;
    var mount = heading;
    while (mount.parentElement && mount.parentElement !== document.body) {
      var parent = mount.parentElement;
      if (parent.getBoundingClientRect().height > 2200 && parent.querySelectorAll("h2").length > 1) break;
      mount = parent;
    }

    var section = document.createElement("section");
    section.id = "arslan-certificates";
    section.setAttribute("data-signature", signature);
    var title = document.createElement("h2");
    title.appendChild(document.createTextNode(info.certificatesLead || "Certificates"));
    var muted = document.createElement("span");
    muted.textContent = info.certificatesRest || "& credentials";
    title.appendChild(muted);
    section.appendChild(title);

    var grid = document.createElement("div");
    grid.className = "certs";
    info.certificates.forEach(function (item) {
      var href = safeUrl(item.href || item.image);
      var card = document.createElement(href ? "a" : "article");
      if (href) {
        card.href = href;
        card.target = "_blank";
        card.rel = "noreferrer";
      }
      var frame = document.createElement("div");
      frame.className = "frame";
      var image = safeUrl(item.image);
      if (image) {
        var photo = document.createElement("img");
        photo.src = image;
        photo.alt = item.title ? item.title + " certificate" : "Certificate";
        frame.appendChild(photo);
      }
      card.appendChild(frame);
      var name = document.createElement("h3");
      name.textContent = item.title;
      var issuer = document.createElement("p");
      issuer.className = "issuer";
      issuer.textContent = item.issuer;
      var pill = document.createElement("span");
      pill.className = "pill";
      pill.textContent = [item.date, item.code].filter(Boolean).join(" · ");
      card.appendChild(name);
      card.appendChild(issuer);
      if (pill.textContent) card.appendChild(pill);
      grid.appendChild(card);
    });
    section.appendChild(grid);
    mount.parentElement.insertBefore(section, mount);
  }

  function leaves(root) {
    return Array.prototype.filter.call((root || document).querySelectorAll("h1,h2,h3,p,span,a,button,div"), function (el) {
      return el.childElementCount === 0;
    });
  }

  function paintPlaceholder(from, to) {
    if (!from || to == null || from === to) return;
    var next = String(to);
    if (!next) return;
    Array.prototype.forEach.call(document.querySelectorAll("input, textarea"), function (el) {
      if (el.getAttribute("placeholder") === from) el.setAttribute("placeholder", next);
    });
  }

  function paint(from, to, root) {
    if (!from || to == null || from === to) return;
    var next = String(to);
    if (!next) return;
    leaves(root).forEach(function (el) {
      if (el.textContent.trim() === from) el.textContent = next;
    });
  }

  function clearText(from, root) {
    if (!from) return;
    leaves(root).forEach(function (el) {
      if (el.textContent.trim() === from) el.textContent = "";
    });
  }

  function paintParts(parts, next) {
    if (!parts || !parts.length || next == null) return;
    var joined = parts.join(" ").replace(/\s+/g, " ").trim();
    var target = String(next).replace(/\s+/g, " ").trim();
    if (!target || joined === target) return;
    var starts = leaves(document.body).filter(function (el) { return el.textContent.trim() === parts[0]; });
    if (!starts.length) {
      paint(joined, target);
      return;
    }
    starts.forEach(function (start) {
      var node = start;
      var host = start.parentElement || document.body;
      for (var i = 0; i < 12 && node.parentElement; i += 1) {
        node = node.parentElement;
        var local = leaves(node);
        var found = parts.every(function (part) {
          return local.some(function (el) { return el.textContent.trim() === part; });
        });
        if (found) {
          host = node;
          break;
        }
      }
      leaves(host).forEach(function (el) {
        var text = el.textContent.trim();
        if (text === parts[0]) el.textContent = target;
        else if (parts.indexOf(text) !== -1) el.textContent = "";
      });
    });
  }

  function paintBlock(from, to) {
    if (!from || to == null) return;
    var wanted = String(from).replace(/\s+/g, " ").trim();
    var next = String(to).replace(/\s+/g, " ").trim();
    if (!wanted || !next || wanted === next) return;
    Array.prototype.forEach.call(document.querySelectorAll("p,div,span"), function (el) {
      var text = el.textContent.replace(/\s+/g, " ").trim();
      if (text !== wanted) return;
      var parent = el.parentElement;
      if (parent && parent.textContent.replace(/\s+/g, " ").trim() === wanted && parent !== el) return;
      el.textContent = next;
    });
  }

  function paintTag(tag, from, to) {
    if (!from || to == null || from === to) return;
    var next = String(to);
    if (!next) return;
    Array.prototype.forEach.call(document.querySelectorAll(tag), function (el) {
      if (el.childElementCount === 0 && el.textContent.trim() === from) el.textContent = next;
    });
  }

  function hideNamed(name) {
    if (!name) return;
    Array.prototype.forEach.call(document.querySelectorAll("[data-framer-name]"), function (el) {
      if (el.getAttribute("data-framer-name") !== name) return;
      var card = el.parentElement;
      if (card) card.style.display = "none";
    });
  }

  function paintNear(anchor, from, to) {
    if (!anchor || !from || to == null || from === to) return;
    var next = String(to);
    if (!next) return;
    leaves(document.body).filter(function (el) { return el.textContent.trim() === anchor; }).forEach(function (el) {
      var node = el;
      for (var i = 0; i < 8 && node.parentElement; i += 1) {
        node = node.parentElement;
        var hits = leaves(node).filter(function (leaf) { return leaf.textContent.trim() === from; });
        if (hits.length === 1) {
          hits[0].textContent = next;
          return;
        }
      }
    });
  }

  function kept(items, from) {
    return (items || []).some(function (item) { return item && item.from === from; });
  }

  function sectionRoot(label) {
    var heads = leaves(document.body).filter(function (el) { return el.textContent.trim() === label; });
    return heads.map(function (head) {
      var node = head;
      for (var i = 0; i < 12 && node.parentElement && node.parentElement !== document.body; i += 1) {
        if (node.parentElement.querySelectorAll("h2").length > 6) break;
        node = node.parentElement;
      }
      return node;
    }).filter(function (node, index, list) { return list.indexOf(node) === index; });
  }

  function rowList(root, samples) {
    var wanted = {};
    samples.forEach(function (sample) { if (sample) wanted[sample] = true; });
    var hits = leaves(root).filter(function (el) { return wanted[el.textContent.trim()]; });
    var lists = [];
    hits.forEach(function (hit) {
      var node = hit;
      for (var i = 0; i < 8 && node.parentElement; i += 1) {
        node = node.parentElement;
        if (node.children.length < 2) continue;
        var rows = Array.prototype.filter.call(node.children, function (child) {
          return leaves(child).some(function (el) { return wanted[el.textContent.trim()]; });
        });
        if (rows.length >= Math.min(2, samples.length)) {
          if (lists.indexOf(node) === -1) lists.push(node);
          return;
        }
      }
    });
    return lists;
  }

  function writeLeaf(row, from, to) {
    if (!from || !to || from === to) return;
    leaves(row).forEach(function (el) {
      if (el.textContent.trim() === from) el.textContent = to;
    });
  }

  function syncTicker(origins, items) {
    var words = (items || []).map(function (item) { return String(item || "").trim(); }).filter(Boolean);
    var known = {};
    (origins || []).concat(words).forEach(function (word) {
      var label = String(word || "").trim();
      if (label) known[label] = true;
    });
    var tracks = Array.prototype.filter.call(document.querySelectorAll('[data-framer-name="Menu Items"]'), function (node) {
      return leaves(node).some(function (el) { return known[el.textContent.trim()]; });
    });
    tracks.forEach(function (track) {
      var rows = Array.prototype.filter.call(track.children, function (child) {
        return leaves(child).some(function (el) { return known[el.textContent.trim()]; });
      });
      if (!rows.length || rows.length > Math.max(words.length * 2, 8)) return;
      while (rows.length < words.length) {
        var last = rows[rows.length - 1];
        var dot = last.previousElementSibling;
        if (dot && !leaves(dot).some(function (el) { return known[el.textContent.trim()]; })) track.appendChild(dot.cloneNode(true));
        var clone = last.cloneNode(true);
        track.appendChild(clone);
        rows.push(clone);
      }
      while (rows.length > words.length) {
        var extra = rows.pop();
        var sep = extra.previousElementSibling;
        extra.remove();
        if (sep && sep.parentNode === track && !leaves(sep).some(function (el) { return known[el.textContent.trim()]; })) sep.remove();
      }
      rows.forEach(function (row, index) {
        var next = words[index];
        leaves(row).forEach(function (el) {
          var current = el.textContent.trim();
          if (known[current] && current !== next) el.textContent = next;
        });
      });
    });
  }

  function syncPlanFeatures(origins, plans) {
    (plans || []).forEach(function (plan, index) {
      var origin = origins[Math.min(index, Math.max(origins.length - 1, 0))] || {};
      var from = (origin.features || []).map(function (line) { return String(line || "").trim(); }).filter(Boolean);
      var next = (plan.features || []).map(function (line) { return String(line || "").trim(); }).filter(Boolean);
      var known = {};
      from.concat(next).forEach(function (line) { known[line] = true; });
      if (!from.length) return;
      var name = String(origin.name || plan.name || "").trim();
      var rowsFor = from.map(function (text) { return { text: text }; });
      var itemsFor = next.map(function (text) { return { text: text }; });
      leaves(document.body).forEach(function (hit) {
        if (!name || hit.textContent.trim() !== name) return;
        var node = hit;
        var card = null;
        for (var i = 0; i < 12 && node.parentElement; i += 1) {
          node = node.parentElement;
          var present = leaves(node).filter(function (el) { return known[el.textContent.trim()]; });
          if (present.length >= Math.min(2, from.length)) { card = node; break; }
        }
        if (!card) return;
        var list = null;
        var best = 0;
        Array.prototype.forEach.call(card.querySelectorAll("div"), function (candidate) {
          var rows = Array.prototype.filter.call(candidate.children, function (child) {
            var hits = leaves(child).filter(function (el) { return known[el.textContent.trim()]; });
            return hits.length === 1;
          });
          if (rows.length >= Math.min(2, from.length) && rows.length <= Math.max(next.length * 2, 8) && rows.length > best) {
            list = candidate;
            best = rows.length;
          }
        });
        if (list) syncRows(list, rowsFor, itemsFor, "text");
      });
    });
  }

  function syncRows(root, origins, items, key) {
    if (!root || !items) return;
    var samples = origins.map(function (item) { return item[key]; }).concat(items.map(function (item) { return item[key]; }));
    rowList(root, samples).forEach(function (list) {
      var rows = Array.prototype.filter.call(list.children, function (child) {
        return leaves(child).some(function (el) { return samples.indexOf(el.textContent.trim()) !== -1; });
      });
      if (!rows.length || rows.length > Math.max(items.length * 2, 8)) return;
      var proto = rows[rows.length - 1];
      while (rows.length < items.length && proto) {
        var clone = proto.cloneNode(true);
        list.appendChild(clone);
        rows.push(clone);
      }
      while (rows.length > items.length) rows.pop().remove();
      rows.forEach(function (row, index) {
        var origin = origins[Math.min(index, origins.length - 1)] || {};
        var item = items[index] || {};
        Object.keys(item).forEach(function (field) {
          if (field === "from" || Array.isArray(item[field])) return;
          writeLeaf(row, origin[field], item[field]);
        });
      });
    });
  }

  function applyStats(origin, home) {
    try {
      var items = home.numbers || [];
      var origins = origin.numbers || [];
      var byTitle = {};
      items.forEach(function (item, index) {
        var baked = origins[index] || {};
        var key = baked.title || item.title;
        var figure = Number(item.value);
        if (!key || item.value == null || String(item.value) === "" || isNaN(figure)) return;
        byTitle[key] = { figure: figure, suffix: item.suffix || baked.suffix || "", same: String(item.value) === String(baked.value) && (item.suffix || "") === (baked.suffix || "") };
        if (item.title) byTitle[item.title] = byTitle[key];
      });
      window.__ARSLAN_STATS = byTitle;
      window.__ARSLAN_STAT = function (node) {
        var card = node;
        for (var i = 0; i < 12 && card; i += 1) {
          var names = leaves(card).map(function (el) { return el.textContent.trim(); }).filter(function (text) { return byTitle[text]; });
          if (names.length === 1) return byTitle[names[0]].figure;
          card = card.parentElement;
        }
        return null;
      };
      Object.keys(byTitle).forEach(function (title) {
        var stat = byTitle[title];
        if (stat.same) return;
        var shown = Number(stat.figure).toLocaleString("en-US");
        leaves(document.body).forEach(function (el) {
          if (el.textContent.trim() !== title) return;
          var node = el;
          for (var i = 0; i < 8 && node.parentElement; i += 1) {
            node = node.parentElement;
            var spans = node.querySelectorAll("span");
            for (var s = 0; s < spans.length; s += 1) {
              var parent = spans[s].parentElement;
              if (!parent) continue;
              var kids = Array.prototype.filter.call(parent.children, function (child) { return child.tagName === "SPAN"; });
              if (kids.length < 2 || !/^[\d,]+$/.test(kids[0].textContent.trim())) continue;
              if (kids[0].textContent !== shown) kids[0].textContent = shown;
              if (stat.suffix && kids[1].textContent !== stat.suffix) kids[1].textContent = stat.suffix;
              return;
            }
          }
        });
      });
    } catch (error) {}
  }

  function applyPages() {
    var pages = data.pages;
    var origins = data.origins;
    if (!pages || !origins) return;
    var home = pages.home || {};
    var homeOrigin = origins.home || {};
    if (home.pageTitle && (document.title === homeOrigin.pageTitle || document.title === home.pageTitle)) document.title = home.pageTitle;
    var meta = document.querySelector('meta[name="description"]');
    if (meta && home.metaDescription && (meta.getAttribute("content") === homeOrigin.metaDescription || meta.getAttribute("content") === home.metaDescription)) meta.setAttribute("content", home.metaDescription);
    paint(homeOrigin.metaDescription, home.metaDescription);
    paint(homeOrigin.wordmark, home.wordmark);
    paint(homeOrigin.wordmarkMark, home.wordmarkMark);
    var heroLines = (home.heroLines || []).filter(function (line) { return line && String(line.text || "").trim(); });
    syncRows(document.body, homeOrigin.heroLines || [], heroLines, "text");
    syncTicker(homeOrigin.ticker || [], home.ticker || []);
    paint(homeOrigin.numbersTitle, home.numbersTitle);
    applyStats(homeOrigin, home);
    sectionRoot(home.numbersTitle || homeOrigin.numbersTitle).forEach(function (root) {
      syncRows(root, homeOrigin.numbers || [], home.numbers || [], "title");
      (homeOrigin.numbers || []).forEach(function (item, index) {
        var next = (home.numbers || [])[index];
        if (next) paint(item.text, next.text, root);
      });
    });
    paint(homeOrigin.servicesIntro, home.servicesIntro);
    paint(homeOrigin.servicesButton, home.servicesButton);
    sectionRoot(home.servicesLabel || homeOrigin.servicesLabel).forEach(function (root) {
      syncRows(root, homeOrigin.services || [], home.services || [], "title");
    });
    if (homeOrigin.pricingTitleParts) paintParts(homeOrigin.pricingTitleParts, home.pricingTitle);
    else paint(homeOrigin.pricingTitle, home.pricingTitle);
    if (homeOrigin.pricingTextParts) paintParts(homeOrigin.pricingTextParts, home.pricingText);
    else paint(homeOrigin.pricingText, home.pricingText);
    paint(homeOrigin.pricingButton, home.pricingButton);
    paint(homeOrigin.pricingIncluded, home.pricingIncluded);
    sectionRoot(home.pricingTitle || homeOrigin.pricingTitle).forEach(function (root) {
      syncRows(root, homeOrigin.plans || [], home.plans || [], "name");
    });
    syncPlanFeatures(homeOrigin.plans || [], home.plans || []);
    paint(homeOrigin.processTitle, home.processTitle);
    paint(homeOrigin.processText, home.processText);
    paint(homeOrigin.processButton, home.processButton);
    sectionRoot(home.processTitle || homeOrigin.processTitle).forEach(function (root) {
      syncRows(root, homeOrigin.steps || [], home.steps || [], "title");
      (homeOrigin.steps || []).forEach(function (step, index) {
        var next = (home.steps || [])[index];
        if (next) paint(step.text, next.text, root);
      });
    });
    if (homeOrigin.storiesTitleParts) paintParts(homeOrigin.storiesTitleParts, home.storiesTitle);
    else paint(homeOrigin.storiesTitle, home.storiesTitle);
    paint(homeOrigin.storiesText, home.storiesText);
    sectionRoot(home.storiesTitle || homeOrigin.storiesTitle).forEach(function (root) {
      syncRows(root, homeOrigin.stories || [], home.stories || [], "name");
      (homeOrigin.stories || []).forEach(function (story, index) {
        var next = (home.stories || [])[index];
        if (!next) return;
        paint(story.quote, next.quote, root);
        paint(story.role, next.role, root);
      });
    });
    paint(homeOrigin.faqTitle, home.faqTitle);
    paint(homeOrigin.faqText, home.faqText);
    paint(homeOrigin.faqButton, home.faqButton);
    sectionRoot(home.faqTitle || homeOrigin.faqTitle).forEach(function (root) {
      syncRows(root, homeOrigin.faqs || [], home.faqs || [], "question");
      (homeOrigin.faqs || []).forEach(function (item, index) {
        var next = (home.faqs || [])[index];
        if (next) paint(item.answer, next.answer, root);
      });
    });
    paint(homeOrigin.goalsKicker, home.goalsKicker);
    paint(homeOrigin.goalsFrom, home.goalsFrom);
    paint(homeOrigin.goalsTo, home.goalsTo);
    paint(homeOrigin.goalsTitle, home.goalsTitle);
    paint(homeOrigin.goalsText, home.goalsText);
    (homeOrigin.goals || []).forEach(function (card) {
      var next = (home.goals || []).find(function (item) { return item && item.from === card.from; });
      if (!next) {
        hideNamed(card.from);
        return;
      }
      paint(card.from, next.title);
      if (card.title2) {
        if (next.title2) paint(card.title2, next.title2);
        else clearText(card.title2);
      }
      if (card.parts) paintParts(card.parts, next.text);
      else paint(card.text, next.text);
    });
    (homeOrigin.goalNotes || []).forEach(function (note) {
      var next = (home.goalNotes || []).find(function (item) { return item && item.from === note.from; });
      if (!next) clearText(note.from);
      else paint(note.from, next.text);
    });
    paint(homeOrigin.workLabel, home.workLabel);
    paint(homeOrigin.workTitle, home.workTitle);
    paint(homeOrigin.workTitleRest, home.workTitleRest);
    paintBlock(homeOrigin.bio, home.bio);
    paint(homeOrigin.statement, home.statement);
    if (homeOrigin.designerHeadingParts) paintParts(homeOrigin.designerHeadingParts, home.designerHeading);
    paint(homeOrigin.statementRoleLong, home.statementRoleLong);
    paint(homeOrigin.statementRole, home.statementRole);
    paint(homeOrigin.resumeButton, home.resumeButton);
    (homeOrigin.storyStats || []).forEach(function (stat) {
      var next = (home.storyStats || []).find(function (item) { return item && item.from === stat.from; });
      if (!next) {
        clearText(stat.from);
        return;
      }
      paintNear(stat.from, stat.label, next.label);
      paint(stat.from, next.value);
    });
    paint(homeOrigin.contactTitle, home.contactTitle);
    paint(homeOrigin.contactText, home.contactText);
    paint(homeOrigin.contactName, home.contactName);
    paint(homeOrigin.contactRole, home.contactRole);
    paint(homeOrigin.contactButton, home.contactButton);
    paint(homeOrigin.contactLabel, home.contactLabel);

    var about = pages.about || {};
    var aboutOrigin = origins.about || {};
    paintTag("h1", aboutOrigin.nameFirst, about.nameFirst);
    paintTag("h1", aboutOrigin.nameSecond, about.nameSecond);
    if (aboutOrigin.openingParts) paintParts(aboutOrigin.openingParts, about.opening);
    paint(aboutOrigin.kicker, about.kicker);
    paint(aboutOrigin.roleLine, about.roleLine);
    paint(aboutOrigin.toolsTitle, about.toolsTitle);
    paint(aboutOrigin.toolsText, about.toolsText);
    paint(aboutOrigin.philosophyTitle, about.philosophyTitle);
    paint(aboutOrigin.philosophyLead, about.philosophyLead);
    paint(aboutOrigin.philosophy, about.philosophy);
    sectionRoot("Experience").concat(sectionRoot(aboutOrigin.jobs && aboutOrigin.jobs[0] ? aboutOrigin.jobs[0].company : "")).forEach(function (root) {
      syncRows(root, aboutOrigin.jobs || [], about.jobs || [], "company");
      (aboutOrigin.jobs || []).forEach(function (job, index) {
        var next = (about.jobs || [])[index];
        if (next) paint(job.role, next.role, root);
      });
    });

    var projects = pages.projects || {};
    var projectsOrigin = origins.projects || {};
    if (location.pathname === "/projects") {
      var heading = document.querySelector("h1");
      if (heading && projects.title && heading.textContent.trim() === projectsOrigin.title) heading.textContent = projects.title;
      paint(projectsOrigin.text, projects.text);
      paint(projectsOrigin.filterAll, projects.filterAll);
      paint(projectsOrigin.filterDashboard, projects.filterDashboard);
      paint(projectsOrigin.filterApp, projects.filterApp);
      paint(projectsOrigin.filterWebsite, projects.filterWebsite);
    }

    var contact = pages.contact || {};
    var contactOrigin = origins.contact || {};
    if (location.pathname === "/contact") {
      var contactHeading = document.querySelector("h1");
      if (contactHeading && contact.title && contactHeading.textContent.trim() === contactOrigin.title) contactHeading.textContent = contact.title;
    }
    paint(contactOrigin.kicker, contact.kicker);
    paint(contactOrigin.intro, contact.intro);
    paint(contactOrigin.formNote, contact.formNote);
    paint(contactOrigin.locationLabel, contact.locationLabel);
    paint(contactOrigin.location, contact.location);
    paint(contactOrigin.hoursLabel, contact.hoursLabel);
    paint(contactOrigin.hours, contact.hours);
    paint(contactOrigin.formHeading, contact.formHeading);
    paint(contactOrigin.nameLabel, contact.nameLabel);
    paintPlaceholder(contactOrigin.nameLabel, contact.nameLabel);
    paint(contactOrigin.emailLabel, contact.emailLabel);
    paintPlaceholder(contactOrigin.emailLabel, contact.emailLabel);
    paint(contactOrigin.phoneLabel, contact.phoneLabel);
    paintPlaceholder(contactOrigin.phoneLabel, contact.phoneLabel);
    paint(contactOrigin.pageMessage, contact.pageMessage);
    paintPlaceholder(contactOrigin.pageMessage, contact.pageMessage);
    paint(contactOrigin.messageLabel, contact.messageLabel);
    paintPlaceholder(contactOrigin.messageLabel, contact.messageLabel);
    paint(contactOrigin.button, contact.button);

    (origins.menu && origins.menu.links || []).forEach(function (link, index) {
      var next = (pages.menu && pages.menu.links || [])[index];
      if (!next) return;
      leaves(document.body).forEach(function (el) {
        var label = el.textContent.trim();
        if (label !== link.from && label !== link.label && label !== link.from + " " + link.from) return;
        if (link.label && label !== next.label && (label === link.from || label === link.label)) el.textContent = next.label;
        var anchor = el.closest ? el.closest("a") : null;
        var href = safeUrl(next.href);
        if (anchor && href) anchor.setAttribute("href", href);
      });
    });

    var menuPage = pages.menu || {};
    var menuOrigin = origins.menu || {};
    paint(menuOrigin.menuLabel, menuPage.menuLabel);
    paint(menuOrigin.talk, menuPage.talk);
    paint(menuOrigin.allCases, menuPage.allCases);
    var sitePage = pages.site || {};
    var siteOrigin = origins.site || {};
    paint(siteOrigin.footerTitle, sitePage.footerTitle);
    paint(siteOrigin.footerNewsletter, sitePage.footerNewsletter);
    paint(siteOrigin.footerBlurb, sitePage.footerBlurb);
    paint(siteOrigin.footerRights, sitePage.footerRights);
    paint(siteOrigin.loaderLine, sitePage.loaderLine);
    paint(siteOrigin.loaderName, sitePage.loaderName);
    paintPlaceholder(siteOrigin.emailPlaceholder, sitePage.emailPlaceholder);

    var profile = data.profile || {};
    var homePage = pages.home || {};
    paint("sriraj", homePage.wordmark || "arslan");
    paint("Sriraj", "Arslan");
    paint("Sriraj Mohan", profile.name || "Arslan Sabir");
    paint("+91 99620 68501", profile.phone || "+92 323 6586188");
    paint("srirajmohan19@gmail.com", profile.email || "marslansabir3322@gmail.com");
    paint("marslansabir3322@gmail.com", profile.email);
    paint("+92 323 6586188", profile.phone);
    if (profile.phoneHref) {
      Array.prototype.forEach.call(document.querySelectorAll('a[href^="tel:"]'), function (anchor) {
        anchor.setAttribute("href", profile.phoneHref);
      });
    }
    if (profile.email) {
      Array.prototype.forEach.call(document.querySelectorAll('a[href^="mailto:"]'), function (anchor) {
        anchor.setAttribute("href", "mailto:" + profile.email);
      });
    }
    paint("Lahore, Punjab, Pakistan", profile.location);
    ((origins.site && origins.site.socials) || []).forEach(function (item, index) {
      var next = (sitePage.socials || [])[index];
      if (!next) return;
      var href = safeUrl(next.href);
      Array.prototype.forEach.call(document.querySelectorAll("a"), function (anchor) {
        var label = anchor.textContent.trim();
        if (label !== item.from && label !== item.label && label !== next.label) return;
        if (next.label && label !== next.label && (label === item.from || label === item.label)) anchor.textContent = next.label;
        if (href) anchor.setAttribute("href", href);
      });
    });
  }

  function settled(projects) {
    if (location.pathname === "/projects") {
      var grid = document.querySelector("[data-arslan-grid]");
      if (!grid || grid.children.length !== projects.length) return false;
      var heading = grid.querySelector("h3");
      return heading && heading.textContent === projects[0].title;
    }
    if (location.pathname === "/") {
      var anchor = document.querySelector("a[data-arslan-card] h3");
      var cardsReady = anchor && anchor.textContent === projects[0].title;
      var certReady = !data.showCertificates || !data.certificates.length || document.getElementById("arslan-certificates");
      return cardsReady && certReady && document.body.textContent.indexOf("(17)") === -1;
    }
    return document.body.textContent.indexOf("(17)") === -1;
  }

  function sameFile(current, next) {
    var a = String(current || "").split("?")[0].split("/").pop().toLowerCase();
    var b = String(next || "").split("?")[0].split("/").pop().toLowerCase();
    return a && a === b;
  }

  function applyMedia() {
    var items = (data.media || []).slice().sort(function (a, b) {
      return (a.match === "/arslan.jpg") - (b.match === "/arslan.jpg");
    });
    if (!items.length) return;
    var nodes = document.querySelectorAll("img, video, source");
    items.forEach(function (item) {
      var next = safeUrl(item.url);
      var match = String(item.match || "").toLowerCase();
      if (!next || !match) return;
      Array.prototype.forEach.call(nodes, function (el) {
        if (el.closest && el.closest("[data-arslan-card], #arslan-certificates")) return;
        var marked = el.getAttribute("data-arslan-media");
        if (marked && marked !== item.id) return;
        var src = el.getAttribute("src") || "";
        if (!marked && src.toLowerCase().indexOf(match) === -1) return;
        el.setAttribute("data-arslan-media", item.id);
        if (item.alt && el.tagName === "IMG") el.setAttribute("alt", item.alt);
        if (sameFile(src, next)) return;
        el.removeAttribute("srcset");
        el.removeAttribute("sizes");
        el.setAttribute("src", next);
      });
    });
  }

  function applyCursor() {
    var list = (data.heroCursor || []).map(safeUrl).filter(Boolean);
    window.__ARSLAN_CURSOR = list;
    var box = document.querySelector(".framer-ondk1f-container");
    if (box) box.style.display = list.length ? "" : "none";
  }

  function rememberCase() {
    if (window.__ARSLAN_CASE_ORIGIN) return;
    var map = {};
    Array.prototype.forEach.call(document.querySelectorAll("[data-arslan]"), function (el) {
      var key = el.getAttribute("data-arslan");
      if (!key || map[key] || el.tagName === "IMG" || el.tagName === "A" || el.tagName === "SECTION") return;
      var value = el.textContent.replace(/\s+/g, " ").trim();
      if (value) map[key] = value;
    });
    window.__ARSLAN_CASE_ORIGIN = map;
  }

  function fillCase(key, value) {
    var next = value == null ? "" : String(value);
    Array.prototype.forEach.call(document.querySelectorAll('[data-arslan="' + key + '"]'), function (el) {
      if (el.tagName === "IMG" || el.tagName === "A" || el.tagName === "SECTION") return;
      if (el.textContent !== next) el.textContent = next;
    });
    var origin = (window.__ARSLAN_CASE_ORIGIN || {})[key];
    if (!origin || origin === next) return;
    if (next) paint(origin, next);
    else clearText(origin);
  }

  function fillImage(img, url) {
    var next = safeUrl(url);
    if (!img || !next) return;
    if (img.getAttribute("src") === next && !img.getAttribute("srcset")) return;
    img.removeAttribute("srcset");
    img.removeAttribute("sizes");
    img.setAttribute("src", next);
  }

  function setCaseText(el, value) {
    if (!el) return;
    var next = value == null ? "" : String(value);
    if (!next) {
      if (el.textContent) el.textContent = "";
      el.style.display = "none";
      return;
    }
    if (el.style.display === "none") el.style.display = "";
    if (el.textContent !== next) el.textContent = next;
  }

  function caseNodes() {
    var main = document.querySelector("#main") || document.body;
    var nodes = Array.prototype.filter.call(main.querySelectorAll("h1, h2, h3, p, img"), function (el) {
      return !el.closest("header, footer");
    });
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].tagName === "H1") return nodes.slice(i);
    }
    return null;
  }

  function applyCase() {
    var parts = location.pathname.split("/").filter(Boolean);
    if (parts[0] !== "projects" || parts.length !== 2) return;
    var slug = decodeURIComponent(parts[1]);
    var projects = data.projects || [];
    var project = null;
    var index = -1;
    projects.forEach(function (item, itemIndex) {
      if (item.slug === slug) {
        project = item;
        index = itemIndex;
      }
    });
    if (!project) {
      if (!window.__ARSLAN_CASE_MISSING) {
        window.__ARSLAN_CASE_MISSING = true;
        location.replace("/projects");
      }
      return;
    }
    revealCase(project);
    var nodes = caseNodes();
    var expect = ["H1", "P", "IMG", "P", "H3", "P", "H3", "P", "H3", "P", "H3", "P", "P", "P", "P", "P", "P", "IMG", "P", "P", "P", "P", "P", "P", "IMG", "IMG", "IMG", "P", "P", "P", "P", "P", "P", "IMG", "P", "P", "P", "H2", "P", "P", "P", "P", "IMG", "P", "P", "P", "IMG"];
    if (!nodes || nodes.length < expect.length) return;
    for (var n = 0; n < expect.length; n++) {
      if (nodes[n].tagName !== expect[n]) return;
    }
    var labels = data.caseLabels || {};
    var shots = [project.image].concat(project.gallery || []).map(safeUrl).filter(Boolean);
    while (shots.length && shots.length < 6) shots.push(shots[shots.length - 1]);
    var values = [
      project.title,
      project.summary,
      null,
      labels.date || "DATE",
      project.date,
      labels.tools || "TOOLS",
      project.tools,
      labels.type || "PRODUCT TYPE",
      project.productType,
      labels.duration || "PROJECT DURATION",
      project.duration,
      labels.context || "context",
      project.context,
      project.contextNote,
      labels.challenge || "challenge",
      project.challenge,
      project.challengeNote,
      null,
      labels.problem || "problem",
      project.problem,
      project.problemNote,
      labels.solution || "solution",
      project.solution,
      project.solutionNote,
      null,
      null,
      null,
      labels.approach || "design approach",
      project.approach,
      project.approachNote,
      labels.features || "key features",
      project.featuresLead,
      project.featuresNote,
      null,
      labels.conclusion || "conclusion",
      project.conclusion,
      project.conclusionNote,
      null,
      labels.more || "More projects"
    ];
    var shot = 0;
    values.forEach(function (value, slot) {
      var el = nodes[slot];
      if (el.tagName === "IMG") {
        if (shots.length) fillImage(el, shots[shot] || shots[shots.length - 1]);
        shot += 1;
        return;
      }
      if (value == null) return;
      setCaseText(el, value);
    });
    var more = [];
    for (var step = 1; more.length < 2 && step <= projects.length; step++) {
      var item = projects[(index + step) % projects.length];
      if (item && item.slug !== project.slug) more.push(item);
    }
    [0, 1].forEach(function (cardIndex) {
      var base = 39 + cardIndex * 4;
      var next = more[cardIndex];
      var link = nodes[base] && nodes[base].closest("a");
      if (!next) {
        if (link) link.style.display = "none";
        return;
      }
      if (link) {
        link.style.display = "";
        if (next.href) link.setAttribute("href", next.href);
      }
      setCaseText(nodes[base], pillLabel(next));
      setCaseText(nodes[base + 1], next.title);
      setCaseText(nodes[base + 2], next.summary);
      fillImage(nodes[base + 3], next.image);
    });
    if (project.title) {
      document.title = project.title + " | Arslan Sabir";
      var live = document.querySelector("[data-arslan='title']");
      if (live) live.textContent = document.title;
    }
    for (var after = expect.length; after < nodes.length; after++) {
      if (nodes[after].tagName === "IMG") {
        fillImage(nodes[after], "/arslan.jpg");
        break;
      }
    }
    var hidden = data.showCase === false;
    var hero = document.querySelector("section[data-framer-name='Hero']");
    var story = document.querySelector("article [data-framer-name='Content']");
    if (hero) hero.style.display = hidden ? "none" : "";
    if (story) story.style.display = hidden ? "none" : "";
    revealCase(project);
  }

  function settleLayout() {
    if (document.getElementById("arslan-layout")) return;
    var style = document.createElement("style");
    style.id = "arslan-layout";
    style.textContent = [
      "header.framer-v-m5ha19, header.framer-v-19vil5u { opacity: 1 !important; transform: none !important; }",
      ".framer-1a4qqw4-container { opacity: 1 !important; transform: none !important; }",
      ".framer-0a8tV > [data-framer-name='Items'] ~ [data-framer-name='Items'] { display: none !important; }"
    ].join("\n");
    document.head.appendChild(style);
    if (!document.querySelector("meta[name='theme-color']")) {
      var theme = document.createElement("meta");
      theme.name = "theme-color";
      theme.content = "#F9452D";
      document.head.appendChild(theme);
    }
  }

  function pillLabel(project) {
    var pages = (data && data.pages && data.pages.projects) || {};
    var key = groupKey(project && (project.filterGroup || project.category));
    if (key === "dashboard") return pages.filterDashboard || "Dashboard";
    if (key === "app") return pages.filterApp || "App";
    return pages.filterWebsite || "Website";
  }

  function groupKey(value) {
    var text = String(value || "").trim().toLowerCase();
    if (text.indexOf("dashboard") !== -1) return "dashboard";
    if (text === "app" || /\bapp\b/.test(text)) return "app";
    return "website";
  }

  function filterMap() {
    var pages = (data && data.pages && data.pages.projects) || {};
    var map = {};
    map[String(pages.filterAll || "All").trim().toLowerCase()] = "all";
    map[String(pages.filterDashboard || "Dashboard").trim().toLowerCase()] = "dashboard";
    map[String(pages.filterApp || "App").trim().toLowerCase()] = "app";
    map[String(pages.filterWebsite || "Website").trim().toLowerCase()] = "website";
    return map;
  }

  function applyFilters() {
    if (location.pathname !== "/projects" || !data) return;
    var active = window.__ARSLAN_FILTER || "all";
    var byHref = {};
    (data.projects || []).forEach(function (item) {
      if (item.href) byHref[item.href] = item;
    });
    grids().forEach(function (grid) {
      Array.prototype.forEach.call(grid.children, function (child) {
        var anchor = child.tagName === "A" ? child : (child.querySelector && (child.querySelector("a[href*='/projects/']") || child.querySelector("a")));
        if (!anchor || !anchor.querySelector || !anchor.querySelector("h3")) return;
        var project = byHref[anchor.getAttribute("href") || ""];
        var show = active === "all" || (project && groupKey(project.filterGroup || project.category) === active);
        var next = show ? "" : "none";
        if (child.style.display !== next) child.style.display = next;
      });
    });
    var map = filterMap();
    Array.prototype.forEach.call(document.querySelectorAll("[data-framer-name='All'] a"), function (link) {
      var key = map[(link.innerText || "").replace(/\s+/g, " ").trim().toLowerCase()];
      if (!key) return;
      var on = key === active;
      link.setAttribute("data-arslan-filter", on ? "on" : "off");
      if (on) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
      Array.prototype.forEach.call(link.querySelectorAll("p"), function (node) {
        node.style.setProperty("color", on ? "#000000" : "rgba(0,0,0,0.38)", "important");
      });
    });
  }

  function bindFilters() {
    window.__ARSLAN_APPLY_FILTERS = applyFilters;
    window.__ARSLAN_FILTER_LABELS = filterMap();
    if (window.__ARSLAN_FILTER_BOUND) return;
    window.__ARSLAN_FILTER_BOUND = true;
    window.addEventListener("click", function (event) {
      if (location.pathname !== "/projects") return;
      var link = event.target && event.target.closest ? event.target.closest("a") : null;
      if (!link || !link.closest("[data-framer-name='All']")) return;
      var label = (link.innerText || "").replace(/\s+/g, " ").trim().toLowerCase();
      var key = data ? filterMap()[label] : { all: "all", dashboard: "dashboard", app: "app", website: "website" }[label];
      if (!key) return;
      event.preventDefault();
      event.stopPropagation();
      window.__ARSLAN_FILTER = key;
      applyFilters();
    }, true);
  }

  function showCaseNow() {
    document.documentElement.setAttribute("data-arslan-case", "ready");
  }

  function revealCase(project) {
    var h1 = document.querySelector("#main h1");
    var ready = !!(project && h1 && h1.textContent.trim() === String(project.title || "").trim());
    if (ready) {
      showCaseNow();
      if (window.__ARSLAN_CASE_REVEAL) {
        clearTimeout(window.__ARSLAN_CASE_REVEAL);
        window.__ARSLAN_CASE_REVEAL = 0;
      }
      return;
    }
    document.documentElement.removeAttribute("data-arslan-case");
    if (!window.__ARSLAN_CASE_REVEAL) {
      window.__ARSLAN_CASE_REVEAL = setTimeout(showCaseNow, 4000);
    }
  }

  function apply() {
    if (!data || applying) return;
    var projects = data.projects || [];
    applying = true;
    try {
      settleLayout();
      if (projects.length && !settled(projects)) {
        if (location.pathname === "/projects") {
          if (data.showProjects) showAll(projects);
          else grids().forEach(function (grid) { grid.style.display = "none"; });
        } else if (location.pathname === "/") {
          hideSelected(!data.showHomeProjects);
          if (data.showHomeProjects) showFeatured(projects);
          certificates(data);
        }
        updateCount(projects.length);
      }
      applyPages();
      applyMedia();
      applyCursor();
      applyCase();
      applyFilters();
    } finally {
      applying = false;
    }
  }

  function start() {
    bindFilters();
    fetch("/api/content", { cache: "no-store" })
      .then(function (response) { return response.json(); })
      .then(function (json) {
        data = json;
        apply();
        [400, 1200, 2500].forEach(function (delay) { setTimeout(apply, delay); });
        var timer;
        new MutationObserver(function () {
          if (/^\/projects\/[^/]+\/?$/.test(location.pathname)) {
            var parts = location.pathname.split("/").filter(Boolean);
            var slug = decodeURIComponent(parts[1] || "");
            var match = (data.projects || []).filter(function (item) { return item.slug === slug; })[0];
            var h1 = document.querySelector("#main h1");
            if (match && h1 && h1.textContent.trim() !== match.title) document.documentElement.removeAttribute("data-arslan-case");
          }
          clearTimeout(timer);
          timer = setTimeout(apply, 300);
        }).observe(document.documentElement, { childList: true, subtree: true, characterData: true });
      })
      .catch(function () {});
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
