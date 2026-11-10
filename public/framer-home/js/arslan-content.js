(function () {
  var ORIGINALS = ["AI Habit", "Fintech AI Mobile", "Food Delivery App Design", "3D AI Builder", "Music Player &"];
  var data = null;
  var applying = false;

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
      if (isOriginal(heading.textContent || "")) return true;
      return /\/projects\/[^/?#]+/.test(anchor.getAttribute("href") || "");
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
    var next = "Projects (" + total + ")";
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    var node;
    while ((node = walker.nextNode())) {
      var value = node.nodeValue || "";
      if (value.indexOf("Projects (") !== -1) {
        var replaced = value.replace(/Projects \(\d+\)/g, next);
        if (replaced !== value) node.nodeValue = replaced;
      } else if (/^\s*\(\d+\)\s*$/.test(value)) {
        var fresh = "(" + total + ")";
        if (value.trim() !== fresh) node.nodeValue = value.replace(/\(\d+\)/, fresh);
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

  function storiesSection() {
    return document.querySelector("section.framer-a91qzl, section[data-framer-name='Testimonials']");
  }

  function placeCertificates() {
    var stories = storiesSection();
    var current = document.getElementById("arslan-certificates");
    if (!stories || !current) return;
    var order = getComputedStyle(stories).order;
    if (order && current.style.order !== order) current.style.order = order;
  }

  function hideStories() {
    var stories = storiesSection();
    if (stories) stories.style.setProperty("display", "none", "important");
  }

  function certificates(info) {
    hideStories();
    var stories = storiesSection();
    var current = document.getElementById("arslan-certificates");
    if (location.pathname !== "/" || !info.showCertificates || !info.certificates.length) {
      if (current) current.remove();
      return;
    }
    var signature = "v4|" + (info.certificatesLead || "") + "|" + info.certificates.map(function (item) { return item.image + item.title + item.issuer; }).join("|");
    var inPlace = !stories || (current && current.nextElementSibling === stories);
    placeCertificates();
    if (current && current.getAttribute("data-signature") === signature && inPlace) {
      var existingGrid = current.querySelector(".certs");
      if (existingGrid) existingGrid.style.gridTemplateColumns = window.innerWidth < 810 ? "1fr" : "repeat(2, minmax(0, 1fr))";
      return;
    }
    if (current) current.remove();
    var css = "#arslan-certificates{box-sizing:border-box;display:flex;flex-direction:column;align-items:center;width:100%;padding:160px 36px 0;background:#fff;color:#0c0c0c}#arslan-certificates .wrap{width:100%;max-width:1368px}#arslan-certificates h2{margin:0;font-family:Inter,sans-serif;font-weight:600;font-size:112px;line-height:.96;letter-spacing:-.07em}#arslan-certificates .certs{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;width:100%;margin-top:48px}#arslan-certificates a,#arslan-certificates article{display:flex;flex-direction:column;color:inherit;text-decoration:none}#arslan-certificates .frame{display:flex;align-items:center;justify-content:center;background:#f3f3f3;aspect-ratio:16/11;padding:28px}#arslan-certificates img{display:block;width:100%;height:100%;object-fit:contain}#arslan-certificates h3{margin:18px 0 0;font-family:Inter,sans-serif;font-size:22px;font-weight:600;line-height:1.3;letter-spacing:-.04em}#arslan-certificates .issuer{margin:8px 0 0;font-family:Inter,sans-serif;font-size:16px;font-weight:500;line-height:1.4;letter-spacing:-.04em;color:rgba(12,12,12,.6)}#arslan-certificates .pill{align-self:flex-start;margin-top:16px;border:1px solid rgba(11,11,12,.16);border-radius:50px;padding:7px 14px;font-family:Inter,sans-serif;font-size:11px;font-weight:600;letter-spacing:.04em;text-transform:uppercase}@media(max-width:1199px){#arslan-certificates{padding:130px 32px 0}#arslan-certificates h2{font-size:80px}}@media(max-width:809px){#arslan-certificates{padding:60px 16px 0}#arslan-certificates h2{font-size:42px}#arslan-certificates .certs{grid-template-columns:1fr}}";
    var style = document.getElementById("arslan-cert-style");
    if (!style) {
      style = document.createElement("style");
      style.id = "arslan-cert-style";
      document.head.appendChild(style);
    }
    if (style.textContent !== css) style.textContent = css;

    var section = document.createElement("section");
    section.id = "arslan-certificates";
    section.setAttribute("data-signature", signature);
    var wrap = document.createElement("div");
    wrap.className = "wrap";
    var title = document.createElement("h2");
    title.appendChild(document.createTextNode(info.certificatesLead || "Certificates"));
    wrap.appendChild(title);

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
    wrap.appendChild(grid);
    section.appendChild(wrap);
    if (stories) section.style.order = getComputedStyle(stories).order;
    if (stories && stories.parentElement) stories.parentElement.insertBefore(section, stories);
    else {
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
      if (mount.parentElement) mount.parentElement.insertBefore(section, mount);
    }
  }

  function leaves(root) {
    return Array.prototype.filter.call((root || document).querySelectorAll("h1,h2,h3,p,span,a,button,div"), function (el) {
      return el.childElementCount === 0;
    });
  }

  function norm(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function exactNodes(from, root) {
    var wanted = norm(from);
    if (!wanted) return [];
    var scope = root && root.querySelectorAll ? root : document.body;
    if (scope === document.documentElement) scope = document.body;
    var nodes = scope.querySelectorAll("h1,h2,h3,h4,p,span,a,button,label,li,div");
    var hits = [];
    for (var i = 0; i < nodes.length; i += 1) {
      var el = nodes[i];
      if (norm(el.textContent) !== wanted) continue;
      var tighter = false;
      for (var c = 0; c < el.children.length; c += 1) {
        if (norm(el.children[c].textContent) === wanted) {
          tighter = true;
          break;
        }
      }
      if (!tighter) hits.push(el);
    }
    return hits;
  }

  function paintPlaceholder(from, to) {
    if (!from || to == null || from === to) return;
    var next = String(to);
    if (!next) return;
    Array.prototype.forEach.call(document.querySelectorAll("input, textarea"), function (el) {
      if (el.getAttribute("placeholder") === from) el.setAttribute("placeholder", next);
    });
  }

  var BAKED = {
    Branding: ["UI/UX Design"],
    "Framer Design": ["App Design"],
    Websites: ["Websites Design"],
    "Design support": ["Landing Page Design"],
    "The Hindu": ["DevArion Solution"],
    Optimeye: ["MilestoneZero"],
    Kraftbase: ["Frenco"],
    Coinfantasy: ["Frenco"],
    "Graphic Designer": ["UI/UX & Product Designer", "UI/UX Designer"],
    "Senior UI/UX Designer": ["UI/UX Designer Inter"],
    "AI Habit & Fitness Tracker App": ["TODO Task App"],
    "Fintech AI Mobile Wallet App": ["NexPay"],
    "Food Delivery App Design": ["Food Delivery App"],
    "3D AI Builder Platform": ["Vaultex"],
    "Music Player & Streaming App": ["Portfolio Landing"],
  };

  function paint(from, to, root) {
    var names = [from].concat(BAKED[from] || []);
    names.forEach(function (name) { paintOne(name, to, root); });
  }

  function paintOne(from, to, root) {
    if (!from || to == null || norm(from) === norm(to)) return;
    var next = String(to);
    if (!norm(next)) return;
    exactNodes(from, root).forEach(function (el) {
      if (norm(el.textContent) !== norm(next)) el.textContent = next;
    });
  }

  function clearText(from, root) {
    if (!from) return;
    exactNodes(from, root).forEach(function (el) {
      el.textContent = "";
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
    var heads = exactNodes(label, document.body);
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
    samples.forEach(function (sample) { if (sample) wanted[String(sample).trim()] = true; });
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
    paint(from, to, row);
  }

  function seamDot(node) {
    return !!(node && node.getAttribute && node.getAttribute("data-arslan-ticker-dot") === "1");
  }

  function separateTickerSeam(track) {
    if (!track || track.offsetWidth < 40) return;
    var labels = Array.prototype.filter.call(track.children, function (child) {
      if (seamDot(child)) return false;
      return leaves(child).some(function (el) { return (el.textContent || "").trim(); });
    });
    if (labels.length < 2) return;
    var gap = Math.round(labels[1].getBoundingClientRect().left - labels[0].getBoundingClientRect().right);
    if (gap < 16) return;
    track.style.boxSizing = "content-box";
    var pad = gap + "px";
    if (track.style.paddingRight !== pad) track.style.paddingRight = pad;
    var dot = track.querySelector('[data-arslan-ticker-dot="1"]');
    if (!dot) {
      var sample = null;
      for (var i = 0; i < track.children.length; i += 1) {
        if (track.children[i].getAttribute("data-framer-name") === "Ellipse") {
          sample = track.children[i];
          break;
        }
      }
      if (!sample) return;
      dot = sample.cloneNode(true);
      dot.setAttribute("data-arslan-ticker-dot", "1");
      track.appendChild(dot);
    } else if (track.lastElementChild !== dot) {
      track.appendChild(dot);
    }
    var content = track.clientWidth - gap;
    var left = Math.round(content + (gap - dot.offsetWidth) / 2);
    dot.style.position = "absolute";
    dot.style.top = "50%";
    dot.style.right = "auto";
    dot.style.margin = "0";
    dot.style.transform = "translateY(-50%)";
    var leftPx = left + "px";
    if (dot.style.left !== leftPx) dot.style.left = leftPx;
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
        if (seamDot(child)) return false;
        return leaves(child).some(function (el) { return known[el.textContent.trim()]; });
      });
      if (!rows.length || rows.length > Math.max(words.length * 2, 8)) return;
      while (rows.length < words.length) {
        var last = rows[rows.length - 1];
        var dot = last.previousElementSibling;
        while (seamDot(dot)) dot = dot.previousElementSibling;
        if (dot && !leaves(dot).some(function (el) { return known[el.textContent.trim()]; })) track.appendChild(dot.cloneNode(true));
        var clone = last.cloneNode(true);
        track.appendChild(clone);
        rows.push(clone);
      }
      while (rows.length > words.length) {
        var extra = rows.pop();
        var sep = extra.previousElementSibling;
        while (seamDot(sep)) sep = sep.previousElementSibling;
        extra.remove();
        if (sep && sep.parentNode === track && !seamDot(sep) && !leaves(sep).some(function (el) { return known[el.textContent.trim()]; })) sep.remove();
      }
      rows.forEach(function (row, index) {
        var next = words[index];
        leaves(row).forEach(function (el) {
          var current = el.textContent.trim();
          if (known[current] && current !== next) el.textContent = next;
        });
      });
      separateTickerSeam(track);
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
        var origin = origins[Math.min(index, Math.max(origins.length - 1, 0))] || {};
        var item = items[index] || {};
        Object.keys(item).forEach(function (field) {
          if (field === "from" || Array.isArray(item[field])) return;
          if (index >= origins.length && origins.length) {
            var fallback = origins[origins.length - 1][field];
            var neighbor = items[origins.length - 1] && items[origins.length - 1][field];
            if (neighbor && neighbor !== item[field]) writeLeaf(row, neighbor, item[field]);
            if (fallback && fallback !== item[field]) writeLeaf(row, fallback, item[field]);
          }
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
    if (contact.hours && String(contact.hours).indexOf("(PKT)") !== -1) {
      paint(String(contact.hours).replace("(PKT)", "(IST)"), contact.hours);
    }
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
        if (anchor.getAttribute("href") !== profile.phoneHref) anchor.setAttribute("href", profile.phoneHref);
      });
    }
    if (profile.email) {
      Array.prototype.forEach.call(document.querySelectorAll('a[href^="mailto:"]'), function (anchor) {
        var mailto = "mailto:" + profile.email;
        if (anchor.getAttribute("href") !== mailto) anchor.setAttribute("href", mailto);
      });
    }
    paint("Lahore, Punjab, Pakistan", profile.location);
    applySocials(siteOrigin.socials || [], sitePage.socials || []);
    fitWordmark();
  }

  function fitWordmark() {
    Array.prototype.forEach.call(document.querySelectorAll('svg[data-framer-name="Lyniq"]'), function (svg) {
      var text = svg.querySelector("p");
      if (!text) return;
      var word = norm(text.textContent);
      if (!word || word.length > 24) return;
      var box = svg.viewBox && svg.viewBox.baseVal;
      if (!box || !box.width || !box.height) return;
      var range = document.createRange();
      range.selectNodeContents(text);
      var rect = range.getBoundingClientRect();
      var frame = svg.getBoundingClientRect();
      if (!rect.width || !frame.width) return;
      var units = rect.width * box.width / frame.width;
      var next = Math.ceil(units + 8);
      if (!next || Math.abs(box.width - next) < 4) return;
      svg.setAttribute("viewBox", "0 0 " + next + " " + box.height);
    });
  }

  function applySocials(originItems, nextItems) {
    var known = {};
    (originItems || []).forEach(function (item) {
      if (!item) return;
      if (item.from) known[norm(item.from)] = true;
      if (item.label) known[norm(item.label)] = true;
    });
    var items = (nextItems || []).filter(function (item) {
      return item && norm(item.label) && safeUrl(item.href);
    });
    items.forEach(function (item) { known[norm(item.label)] = true; });
    Array.prototype.forEach.call(document.querySelectorAll('[data-framer-name="Links"], [data-framer-name="Social"]'), function (list) {
      var rows = Array.prototype.filter.call(list.children, function (child) {
        return child.querySelectorAll && child.querySelectorAll("a").length === 1;
      });
      if (rows.length < 2) return;
      var hits = 0;
      rows.forEach(function (row) {
        var anchor = row.querySelector("a");
        if (!anchor) return;
        if (known[norm(anchor.textContent)] || leaves(row).some(function (el) { return known[norm(el.textContent)]; })) hits += 1;
      });
      if (hits < 2) return;
      var proto = rows[0];
      while (rows.length < items.length) {
        var clone = proto.cloneNode(true);
        list.appendChild(clone);
        rows.push(clone);
      }
      while (rows.length > items.length) rows.pop().remove();
      rows.forEach(function (row, index) {
        var item = items[index];
        var anchor = row.querySelector("a");
        if (!anchor || !item) return;
        var label = String(item.label).trim();
        var href = safeUrl(item.href);
        var labeled = leaves(row).filter(function (el) {
          return known[norm(el.textContent)] || norm(el.textContent) === norm(anchor.textContent);
        });
        if (labeled.length) labeled.forEach(function (el) { if (el.textContent !== label) el.textContent = label; });
        else if (anchor.textContent !== label) anchor.textContent = label;
        if (href && anchor.getAttribute("href") !== href) anchor.setAttribute("href", href);
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
      if (!match) return;
      Array.prototype.forEach.call(nodes, function (el) {
        if (el.closest && el.closest("[data-arslan-card], #arslan-certificates")) return;
        var marked = el.getAttribute("data-arslan-media");
        if (marked && marked !== item.id) return;
        var hay = ((el.getAttribute("src") || "") + " " + (el.getAttribute("srcset") || "") + " " + (el.getAttribute("width") || "") + "x" + (el.getAttribute("height") || "")).toLowerCase();
        var signature = item.id === "home-signature" && hay.indexOf("signature-arslan.png") !== -1;
        if (!marked && hay.indexOf(match) === -1 && !signature) return;
        el.setAttribute("data-arslan-media", item.id);
        if (!next) {
          el.style.setProperty("display", "none", "important");
          return;
        }
        if (el.style.display === "none") el.style.removeProperty("display");
        if (item.alt && el.tagName === "IMG") el.setAttribute("alt", item.alt);
        if (sameFile(el.getAttribute("src") || "", next)) return;
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
    var matched = !!(nodes && nodes.length >= expect.length);
    if (matched) {
      for (var n = 0; n < expect.length; n++) {
        if (nodes[n].tagName !== expect[n]) {
          matched = false;
          break;
        }
      }
    }
    if (matched) {
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
      var titles = document.querySelectorAll("[data-arslan='title']");
      Array.prototype.forEach.call(titles, function (live) {
        if (live.textContent !== project.title) live.textContent = project.title;
      });
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
    }
    ownCase(project);
    hideExtraShots(project);
    scrubCase(project);
    revealCase(project);
  }

  function ownCase(project) {
    var heading = project.title + " | Arslan Sabir";
    document.title = heading;
    [
      ["property", "og:title", heading],
      ["property", "og:description", project.summary || ""],
      ["name", "description", project.summary || ""],
      ["name", "twitter:title", heading],
      ["name", "twitter:description", project.summary || ""]
    ].forEach(function (item) {
      var meta = document.querySelector('meta[' + item[0] + '="' + item[1] + '"]');
      if (meta && meta.getAttribute("content") !== item[2]) meta.setAttribute("content", item[2]);
    });
    var h1 = document.querySelector("#main h1");
    setCaseText(h1, project.title);
    var hero = document.querySelector("section[data-framer-name='Hero'] img");
    if (hero && project.image) fillImage(hero, project.image);
    Array.prototype.forEach.call(document.querySelectorAll("#main img"), function (img) {
      var src = img.getAttribute("src") || "";
      if (src.indexOf("framerusercontent.com") === -1) return;
      if (img.closest("a")) return;
      fillImage(img, project.image);
    });
  }

  function hideExtraShots(project) {
    var gallery = (project.gallery || []).map(safeUrl).filter(Boolean);
    var hero = safeUrl(project.image);
    var article = document.querySelector("article");
    if (!article) return;
    var extras = Array.prototype.filter.call(article.querySelectorAll("img"), function (img) {
      return !img.closest("a");
    });
    extras.forEach(function (img, index) {
      var src = gallery[index] || hero;
      var frame = img.parentElement || img;
      if (!src) {
        var block = frame.parentElement;
        if (block) block.style.display = "none";
        return;
      }
      frame.style.display = "block";
      if (frame.parentElement) frame.parentElement.style.display = "";
      fillImage(img, src);
      if (project.title) img.alt = project.title;
    });
  }

  function scrubCase(project) {
    var own = {};
    [project.title, project.summary, project.date, project.tools, project.productType, project.duration, project.context, project.contextNote, project.challenge, project.challengeNote, project.problem, project.problemNote, project.solution, project.solutionNote, project.approach, project.approachNote, project.featuresLead, project.featuresNote, project.conclusion, project.conclusionNote].forEach(function (value) {
      var text = String(value || "").replace(/\s+/g, " ").trim();
      if (text) own[text] = 1;
    });
    var banned = [
      "March 2026",
      "3-4 weeks",
      "Figma",
      "App Design",
      "Food Delivery App",
      "TODO Task App",
      "NexPay",
      "Browse, customize, and track an order in a flow that stays short on a phone.",
      "A task app organized around capturing work quickly and seeing the day at a glance.",
      "A finance app focused on balances, transfers, and trust at the moment of payment.",
      "A modern food delivery experience designed to help users discover restaurants, customize meals, and place orders quickly through a seamless mobile interface."
    ];
    var root = document.querySelector("article") || document.querySelector("#main");
    if (!root) return;
    Array.prototype.forEach.call(root.querySelectorAll("h1, h2, h3, p"), function (el) {
      if (el.closest("a")) return;
      var text = (el.textContent || "").replace(/\s+/g, " ").trim();
      if (!text || own[text]) return;
      if (banned.indexOf(text) !== -1) setCaseText(el, "");
    });
  }

  function unclipInset() {
    var blocks = document.querySelectorAll("[data-framer-name='Primary']");
    Array.prototype.forEach.call(blocks, function (block) {
      var shown = getComputedStyle(block);
      if (shown.display === "none" || shown.visibility === "hidden") return;
      block.style.transform = "";
      var box = block.getBoundingClientRect();
      if (box.width < 24 || box.height < 24 || box.bottom < 0) return;
      var clip = block.parentElement;
      var limit = null;
      while (clip && clip !== document.body) {
        var cs = getComputedStyle(clip);
        var frame = clip.getBoundingClientRect();
        if ((cs.overflowX === "hidden" || cs.overflowX === "clip") && frame.width > 40 && frame.height > 20 && frame.left > box.left + 4) {
          limit = frame;
          break;
        }
        clip = clip.parentElement;
      }
      if (!limit) return;
      var shift = Math.round(limit.left - box.left);
      if (shift < 4 || shift > 72) return;
      if (box.right + shift > limit.right - 4) shift = Math.max(0, Math.floor(limit.right - 4 - box.right));
      if (shift < 4) return;
      block.style.transform = "translateX(" + shift + "px)";
    });
  }

  function fitServiceTitles() {
    var width = window.innerWidth || 0;
    if (!width) return;
    var widthChanged = window.__ARSLAN_FIT_W !== width;
    window.__ARSLAN_FIT_W = width;
    var groups = [];
    var rows = document.querySelectorAll("[data-framer-name='Desktop active'], [data-framer-name='Desktop inactive'], [data-framer-name='Tablet active'], [data-framer-name='Tablet inative'], [data-framer-name='Phone active'], [data-framer-name='Phone inactive']");
    Array.prototype.forEach.call(rows, function (row) {
      var cs = getComputedStyle(row);
      if (cs.display === "none" || cs.visibility === "hidden") return;
      var box = row.getBoundingClientRect();
      if (box.width < 40 || box.height < 8) return;
      var list = row.parentElement;
      var walk = row.parentElement;
      while (walk && walk !== document.body) {
        var count = walk.querySelectorAll("[data-framer-name='Desktop active'], [data-framer-name='Desktop inactive'], [data-framer-name='Tablet active'], [data-framer-name='Tablet inative'], [data-framer-name='Phone active'], [data-framer-name='Phone inactive']").length;
        if (count >= 2) {
          list = walk;
          break;
        }
        walk = walk.parentElement;
      }
      var group = null;
      for (var i = 0; i < groups.length; i += 1) {
        if (groups[i].list === list) group = groups[i];
      }
      if (!group) {
        group = { list: list, rows: [] };
        groups.push(group);
      }
      group.rows.push(row);
    });
    groups.forEach(function (group) {
      var titles = group.rows.map(function (row) {
        return row.querySelector("[data-framer-name='Websites'] p") || row.querySelector("p");
      }).filter(Boolean);
      if (!titles.length) return;
      if (widthChanged) {
        titles.forEach(function (title) {
          title.style.fontSize = title.getAttribute("data-arslan-size") || "";
        });
      }
      function fits(row) {
        var title = row.querySelector("[data-framer-name='Websites'] p") || row.querySelector("p");
        if (!title) return true;
        var num = row.querySelector("[data-framer-name='5']");
        var box = row.getBoundingClientRect();
        var limit = Math.min(box.right, width - 6);
        var edge = title.getBoundingClientRect().right;
        if (num) edge = Math.max(edge, num.getBoundingClientRect().right);
        return edge <= limit - 1;
      }
      var sizes = titles.map(function (title) { return Math.round(parseFloat(getComputedStyle(title).fontSize) || 0); });
      var sameSize = sizes.every(function (size) { return size === sizes[0]; });
      if (!widthChanged && sameSize && group.rows.every(fits)) return;
      var smallest = 0;
      var baseSize = 0;
      group.rows.forEach(function (row) {
        var title = row.querySelector("[data-framer-name='Websites'] p") || row.querySelector("p");
        if (!title) return;
        if (!title.hasAttribute("data-arslan-size")) title.setAttribute("data-arslan-size", title.style.fontSize || "");
        title.style.fontSize = title.getAttribute("data-arslan-size") || "";
        var base = parseFloat(getComputedStyle(title).fontSize) || 0;
        if (base > baseSize) baseSize = base;
        var num = row.querySelector("[data-framer-name='5']");
        var box = row.getBoundingClientRect();
        var limit = Math.min(box.right, width - 6);
        var size = base;
        var guard = 0;
        while (guard < 18) {
          var edge = title.getBoundingClientRect().right;
          if (num) edge = Math.max(edge, num.getBoundingClientRect().right);
          if (edge <= limit - 1) break;
          size = Math.round(size * 0.94);
          if (size < 15) break;
          title.style.fontSize = size + "px";
          guard += 1;
        }
        if (!smallest || size < smallest) smallest = size;
      });
      if (!smallest || !baseSize || smallest >= baseSize - 0.5) {
        titles.forEach(function (title) {
          title.style.fontSize = title.getAttribute("data-arslan-size") || "";
        });
        return;
      }
      titles.forEach(function (title) {
        title.style.fontSize = smallest + "px";
      });
    });
  }

  function settleLayout() {
    if (document.getElementById("arslan-layout")) return;
    var style = document.createElement("style");
    style.id = "arslan-layout";
    style.textContent = [
      "header.framer-v-m5ha19, header.framer-v-19vil5u { opacity: 1 !important; transform: none !important; }",
      ".framer-1a4qqw4-container { opacity: 1 !important; transform: none !important; }",
      "article [data-framer-name='Content'] [data-framer-name='Quote'], article [data-framer-name='Content'] [data-framer-name='Images'], article [data-framer-name='Content'] [data-framer-name='Images'] > div { opacity: 1 !important; transform: none !important; }",
      "article [data-framer-background-image-wrapper='true'] { display: block !important; }",
      "article [data-framer-background-image-wrapper='true'] img { width: 100%; height: 100%; object-fit: cover; }",
      "[data-arslan-sent-note]{display:flex;flex-direction:column;justify-content:center;gap:10px;min-height:140px;padding:12px 0;color:inherit}",
      "[data-arslan-sent-title]{margin:0;font-family:Inter,sans-serif;font-weight:600;font-size:clamp(22px,3vw,32px);line-height:1.15;letter-spacing:-0.04em}",
      "[data-arslan-sent-body]{margin:0;max-width:36em;font-family:Inter,sans-serif;font-size:16px;line-height:1.5;opacity:.75}",
      "[data-arslan-sent-error]{margin:12px 0 0;color:#F9452D;font-family:Inter,sans-serif;font-size:14px;line-height:1.4}",
      ".framer-0a8tV > [data-framer-name='Items'] ~ [data-framer-name='Items'] { display: none !important; }",
      ".framer-fvliW[data-framer-name='All'], .framer-fvliW[data-framer-name='All'] > div { height: auto !important; flex-wrap: wrap !important; overflow: visible !important; row-gap: 8px; }"
    ].join("\n");
    document.head.appendChild(style);
    if (!document.querySelector("meta[name='theme-color']")) {
      var theme = document.createElement("meta");
      theme.name = "theme-color";
      theme.content = "#F9452D";
      document.head.appendChild(theme);
    }
  }

  function filterDefs() {
    var pages = (data && data.pages && data.pages.projects) || {};
    var saved = Array.isArray(pages.filters) ? pages.filters : [];
    var source = saved.length ? saved : [
      { id: "Dashboard", label: pages.filterDashboard || "Dashboard" },
      { id: "App", label: pages.filterApp || "App" },
      { id: "Website", label: pages.filterWebsite || "Website" }
    ];
    return source.map(function (item) {
      return {
        id: String(item && (item.id || item.label) || "").trim(),
        label: String(item && (item.label || item.id) || "").trim()
      };
    }).filter(function (item) { return item.id && item.label; });
  }

  function pillLabel(project) {
    var key = groupKey(project && (project.filterGroup || project.category));
    var hit = filterDefs().filter(function (item) { return item.id === key; })[0];
    return hit ? hit.label : key;
  }

  function groupKey(value) {
    var text = String(value || "").trim().toLowerCase();
    var filters = filterDefs();
    var hit = null;
    filters.forEach(function (item) {
      if (hit) return;
      if (String(item.id).trim().toLowerCase() === text || String(item.label).trim().toLowerCase() === text) hit = item;
    });
    if (hit) return hit.id;
    if (text.indexOf("dashboard") !== -1) {
      var dash = filters.filter(function (item) { return String(item.id).toLowerCase() === "dashboard"; })[0];
      if (dash) return dash.id;
    }
    if (text === "app" || /\bapp\b/.test(text)) {
      var app = filters.filter(function (item) { return String(item.id).toLowerCase() === "app"; })[0];
      if (app) return app.id;
    }
    if (text.indexOf("web") !== -1) {
      var web = filters.filter(function (item) { return String(item.id).toLowerCase() === "website"; })[0];
      if (web) return web.id;
    }
    return filters[0] ? filters[0].id : text || "Website";
  }

  function filterMap() {
    var pages = (data && data.pages && data.pages.projects) || {};
    var map = {};
    map[String(pages.filterAll || "All").trim().toLowerCase()] = "all";
    filterDefs().forEach(function (item) {
      map[item.label.trim().toLowerCase()] = item.id;
    });
    return map;
  }

  function setPillText(node, label) {
    if (!node) return;
    Array.prototype.forEach.call(node.querySelectorAll("p"), function (el) {
      if (el.textContent !== label) el.textContent = label;
    });
  }

  function syncFilterBars() {
    if (location.pathname !== "/projects" || !data) return;
    var pages = (data.pages && data.pages.projects) || {};
    var allLabel = String(pages.filterAll || "All").trim() || "All";
    var filters = filterDefs();
    Array.prototype.forEach.call(document.querySelectorAll(".framer-fvliW[data-framer-name='All']"), function (bar) {
      var track = bar.querySelector(".framer-qae8w8");
      var host = track ? track.parentElement : bar;
      var allLink = track ? track.querySelector("a") : null;
      if (allLink) {
        allLink.setAttribute("data-arslan-filter-id", "all");
        setPillText(allLink, allLabel);
      }
      var originals = Array.prototype.filter.call(host.children, function (node) {
        return node.tagName === "A" && node.getAttribute("data-arslan-filter-pill") !== "1";
      });
      var template = originals[0];
      if (!template) return;
      originals.forEach(function (node) { node.style.display = "none"; });
      var clones = Array.prototype.filter.call(host.children, function (node) {
        return node.getAttribute && node.getAttribute("data-arslan-filter-pill") === "1";
      });
      while (clones.length < filters.length) {
        var clone = template.cloneNode(true);
        clone.setAttribute("data-arslan-filter-pill", "1");
        clone.removeAttribute("target");
        clone.setAttribute("href", "/projects");
        host.appendChild(clone);
        clones.push(clone);
      }
      clones.forEach(function (node, index) {
        var filter = filters[index];
        if (!filter) {
          node.style.display = "none";
          return;
        }
        node.style.display = "";
        node.setAttribute("data-arslan-filter-id", filter.id);
        setPillText(node, filter.label);
      });
    });
  }

  function applyFilters() {
    if (location.pathname !== "/projects" || !data) return;
    syncFilterBars();
    window.__ARSLAN_FILTER_LABELS = filterMap();
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
        var show = String(active).toLowerCase() === "all" || (project && String(groupKey(project.filterGroup || project.category)).toLowerCase() === String(active).toLowerCase());
        var next = show ? "" : "none";
        if (child.style.display !== next) child.style.display = next;
      });
    });
    var map = filterMap();
    Array.prototype.forEach.call(document.querySelectorAll("[data-framer-name='All'] a"), function (link) {
      var key = map[(link.innerText || "").replace(/\s+/g, " ").trim().toLowerCase()];
      if (!key) return;
      var on = String(key).toLowerCase() === String(active).toLowerCase();
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
      var key = link.getAttribute("data-arslan-filter-id") || (data ? filterMap()[label] : { all: "all", dashboard: "dashboard", app: "app", website: "website" }[label]);
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

  function caseHeadingMatches(text, title) {
    var value = String(text || "").trim();
    var next = String(title || "").trim();
    return !!next && (value === next || value.indexOf(next) === 0);
  }

  function revealCase() {
    showCaseNow();
  }

  function apply() {
    if (!data || applying) return;
    var projects = data.projects || [];
    applying = true;
    window.__ARSLAN_ID = {
      name: (data.profile && data.profile.name) || "Arslan Sabir",
      phone: (data.profile && data.profile.phone) || "+92 323 6586188",
      phoneHref: (data.profile && data.profile.phoneHref) || "tel:+923236586188",
      email: (data.profile && data.profile.email) || "marslansabir3322@gmail.com",
      location: (data.profile && data.profile.location) || "Lahore, Punjab, Pakistan",
      signature: "/signature-arslan.png",
    };
    if (window.__arslanScrub) window.__arslanScrub();
    try {
      settleLayout();
      if (projects.length && !settled(projects)) {
        if (location.pathname === "/projects") {
          if (data.showProjects) showAll(projects);
          else grids().forEach(function (grid) { grid.style.display = "none"; });
        } else if (location.pathname === "/") {
          hideSelected(!data.showHomeProjects);
          if (data.showHomeProjects) showFeatured(projects);
        }
      }
      if (projects.length) updateCount(projects.length);
      if (location.pathname === "/") certificates(data);
      applyPages();
      applyMedia();
      applyCursor();
      applyCase();
      applyFilters();
      fitServiceTitles();
      unclipInset();
      keepSentForms();
    } finally {
      applying = false;
    }
  }

  function capSrcset(value) {
    var parts = String(value || "").split(",").map(function (part) { return part.trim(); }).filter(Boolean);
    var parsed = parts.map(function (part) {
      var match = part.match(/(\d+)w\s*$/);
      return { part: part, width: match ? Number(match[1]) : 0 };
    });
    var kept = parsed.filter(function (item) { return item.width && item.width <= 1600; });
    if (!kept.length && parsed.length) {
      parsed.sort(function (a, b) { return (a.width || 99999) - (b.width || 99999); });
      kept = [parsed[0]];
    }
    return kept;
  }

  function tightenImages() {
    Array.prototype.forEach.call(document.querySelectorAll("img"), function (img) {
      var raw = img.getAttribute("srcset");
      if (raw) {
        var kept = capSrcset(raw);
        if (kept.length) {
          var paths = kept.map(function (item) { return item.part.split(/\s+/)[0].split("?")[0]; });
          var local = paths[0].charAt(0) === "/" || paths[0].indexOf("images/") === 0;
          if (local && paths.every(function (path) { return path === paths[0]; })) {
            if (img.getAttribute("src") !== paths[0]) img.setAttribute("src", paths[0]);
            img.removeAttribute("srcset");
            img.removeAttribute("sizes");
          } else {
            var next = kept.map(function (item) { return item.part; }).join(", ");
            if (raw !== next) img.setAttribute("srcset", next);
          }
        }
      }
      if (img.getAttribute("data-arslan-load") !== "1") {
        var rect = img.getBoundingClientRect();
        if (rect.height) {
          img.setAttribute("data-arslan-load", "1");
          if (rect.top > window.innerHeight + 120) img.setAttribute("loading", "lazy");
        }
      }
    });
  }

  function watchImages() {
    if (window.__ARSLAN_IMG) return;
    window.__ARSLAN_IMG = true;
    var frame = 0;
    function schedule() {
      if (frame) return;
      frame = requestAnimationFrame(function () {
        frame = 0;
        tightenImages();
      });
    }
    tightenImages();
    new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ["srcset"] });
  }

  function contentRequest() {
    if (window.__ARSLAN_CONTENT && typeof window.__ARSLAN_CONTENT.then === "function") return window.__ARSLAN_CONTENT;
    window.__ARSLAN_CONTENT = fetch("/api/content", { cache: "no-store", headers: { accept: "application/json" } }).then(function (response) {
      if (!response.ok) throw new Error("content");
      return response.json();
    });
    return window.__ARSLAN_CONTENT;
  }

  function start() {
    bindFilters();
    watchImages();
    if (!window.__ARSLAN_FIT_RESIZE) {
      window.__ARSLAN_FIT_RESIZE = true;
      var fitFrame = 0;
      window.addEventListener("resize", function () {
        if (fitFrame) cancelAnimationFrame(fitFrame);
        fitFrame = requestAnimationFrame(function () {
          fitFrame = 0;
          fitServiceTitles();
          unclipInset();
          placeCertificates();
        });
      });
    }
    contentRequest()
      .then(function (json) {
        data = json;
        window.__arslanApply = function () {
          apply();
        };
        apply();
        [400, 1200, 2500, 5000].forEach(function (delay) { setTimeout(apply, delay); });
        if (!window.__arslanWatch) {
          var timer;
          new MutationObserver(function () {
            clearTimeout(timer);
            timer = setTimeout(apply, 40);
          }).observe(document.documentElement, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["src", "srcset", "href"] });
        }
      })
      .catch(function () {});
  }

  function formSource() {
    var path = location.pathname;
    if (path.indexOf("/contact") === 0) return "Contact page";
    if (path.indexOf("/about") === 0) return "About";
    if (/^\/projects\/[^/]+/.test(path)) return "Project";
    if (path.indexOf("/projects") === 0) return "Projects";
    if (path.indexOf("/services") === 0) return "Services";
    if (path.indexOf("/pricing") === 0) return "Pricing";
    return "Home";
  }

  function sentCopy() {
    var copy = (data && (data.formSent || data.copy)) || {};
    return {
      title: copy.formSentTitle || "Your message is sent.",
      body: copy.formSentBody || "Thank you for writing. Arslan will reply soon."
    };
  }

  function showFormError(form, message) {
    var node = form.querySelector("[data-arslan-sent-error]");
    if (!node) {
      node = document.createElement("p");
      node.setAttribute("data-arslan-sent-error", "1");
      var button = form.querySelector("button");
      if (button && button.parentElement) button.parentElement.appendChild(node);
      else form.appendChild(node);
    }
    node.textContent = message;
    node.style.display = "block";
  }

  function setButtonLabel(form, label) {
    var button = form.querySelector("button");
    if (!button) return;
    var text = button.querySelector("p") || button;
    if (!button.getAttribute("data-arslan-label")) button.setAttribute("data-arslan-label", (text.textContent || "").replace(/\s+/g, " ").trim());
    if ((text.textContent || "").replace(/\s+/g, " ").trim() !== label) text.textContent = label;
    button.disabled = label === "Sending";
  }

  function showFormSent(form) {
    if (!form) return;
    form.setAttribute("data-arslan-sent", "1");
    var copy = sentCopy();
    var note = form.querySelector("[data-arslan-sent-note]");
    if (!note) {
      note = document.createElement("div");
      note.setAttribute("data-arslan-sent-note", "1");
      note.setAttribute("role", "status");
      note.innerHTML = "<p data-arslan-sent-title></p><p data-arslan-sent-body></p>";
      form.insertBefore(note, form.firstChild);
    }
    var title = note.querySelector("[data-arslan-sent-title]");
    var body = note.querySelector("[data-arslan-sent-body]");
    if (title && title.textContent !== copy.title) title.textContent = copy.title;
    if (body && body.textContent !== copy.body) body.textContent = copy.body;
    Array.prototype.forEach.call(form.children, function (child) {
      if (child === note) return;
      child.style.setProperty("display", "none", "important");
    });
    var error = form.querySelector("[data-arslan-sent-error]");
    if (error) error.style.display = "none";
  }

  function keepSentForms() {
    Array.prototype.forEach.call(document.querySelectorAll("form[data-arslan-sent='1']"), showFormSent);
  }

  function sendForm(form) {
    if (!form || form.getAttribute("data-arslan-sending") === "1" || form.getAttribute("data-arslan-sent") === "1") return;
    var name = form.querySelector('input[name="Name"]');
    var email = form.querySelector('input[name="E-mail"]');
    var message = form.querySelector('textarea[name="Message"]');
    if (!name || !email || !message) return;
    var nameValue = name.value.trim();
    var emailValue = email.value.trim();
    var messageValue = message.value.trim();
    if (nameValue.length < 2 || messageValue.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      showFormError(form, "Add your name, a real email, and a message.");
      return;
    }
    form.setAttribute("data-arslan-sending", "1");
    setButtonLabel(form, "Sending");
    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: nameValue, email: emailValue, message: messageValue, source: formSource() })
    }).then(function (response) {
      return response.json().catch(function () { return {}; }).then(function (result) {
        return { ok: response.ok && result.ok, error: result.error };
      });
    }).then(function (result) {
      form.removeAttribute("data-arslan-sending");
      if (!result.ok) {
        var button = form.querySelector("button");
        setButtonLabel(form, (button && button.getAttribute("data-arslan-label")) || "Get in touch");
        var restore = form.querySelector("button");
        if (restore) restore.disabled = false;
        showFormError(form, result.error || "The message could not be sent. Please try again.");
        return;
      }
      showFormSent(form);
      var note = form.querySelector("[data-arslan-sent-note]");
      if (note && note.scrollIntoView) note.scrollIntoView({ block: "center", behavior: "smooth" });
    }).catch(function () {
      form.removeAttribute("data-arslan-sending");
      var button = form.querySelector("button");
      setButtonLabel(form, (button && button.getAttribute("data-arslan-label")) || "Get in touch");
      if (button) button.disabled = false;
      showFormError(form, "The message could not be sent. Please try again.");
    });
  }

  window.__ARSLAN_SEND_FORM = sendForm;

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
