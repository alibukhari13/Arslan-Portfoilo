(function () {
  if (window.__arslanGuard) return;
  window.__arslanGuard = true;
  var id = window.__ARSLAN_ID || {
    name: "Arslan Sabir",
    phone: "+92 323 6586188",
    phoneHref: "tel:+923236586188",
    email: "marslansabir3322@gmail.com",
    location: "Lahore, Punjab, Pakistan",
    signature: "/signature-arslan.png",
  };
  window.__ARSLAN_ID = id;

  function freshRules() {
    var next = window.__ARSLAN_ID || id;
    var name = next.name || id.name;
    var phone = next.phone || id.phone;
    var email = next.email || id.email;
    var location = next.location || id.location;
    return [
      ["(IST)", "(PKT)"],
      ["srirajmohan19@gmail.com", email],
      ["hello@lyniqstudio.com", email],
      ["Sriraj Mohan", name],
      ["sriraj mohan", name],
      ["+91 99620 68501", phone],
      ["+91 9962068501", phone],
      ["99620 68501", "323 6586188"],
      ["Chennai, Tamil Nadu, India", location],
      ["based in India", "based in Lahore"],
      ["based in india", "based in Lahore"],
      ["Sriraj", "Arslan"],
      ["sriraj", "arslan"],
      ["Mohan", "Sabir"],
    ];
  }

  function fixHref(value) {
    var next = window.__ARSLAN_ID || id;
    var v = String(value || "");
    if (/srirajmohan\.com|arslanmohan\.com/i.test(v)) {
      if (/\/contact/i.test(v)) return "/contact";
      if (/\/about/i.test(v)) return "/about";
      if (/\/projects\/[^/?#]+/i.test(v)) return "/projects";
      if (/\/projects/i.test(v)) return "/projects";
      return "/";
    }
    if (/linkedin\.com\/in\/arslan-mohan/i.test(v)) return "https://www.linkedin.com/in/marslansabir/";
    if (/instagram\.com\/arslan_mohan/i.test(v)) return "https://www.behance.net/marslansabir";
    if (/dribbble\.com\/arslanmohan/i.test(v)) return "https://dribbble.com/marslansabir";
    if (/mailto:srirajmohan19@gmail\.com|mailto:hello@lyniqstudio\.com/i.test(v)) return "mailto:" + (next.email || id.email);
    if (/tel:/i.test(v) && /99620|68501/.test(v)) return next.phoneHref || id.phoneHref;
    return v;
  }

  function fixElement(el) {
    if (!el || !el.getAttribute) return;
    var next = window.__ARSLAN_ID || id;
    ["href", "src", "srcset"].forEach(function (attr) {
      var value = el.getAttribute(attr);
      if (!value) return;
      if (/wldshtvzafbowdkjxdow8oxv6a/i.test(value)) {
        if (el.getAttribute("src") !== next.signature) {
          el.removeAttribute("srcset");
          el.removeAttribute("sizes");
          el.setAttribute("src", next.signature);
        }
        return;
      }
      var href = attr === "href" || attr === "src" ? fixHref(value) : value;
      if (href !== value) el.setAttribute(attr, href);
    });
  }

  function rewrite(host) {
    var list = [];
    var walker = document.createTreeWalker(host, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        var parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        var tag = parent.tagName;
        if (tag === "SCRIPT" || tag === "STYLE" || tag === "TEXTAREA") return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    while (walker.nextNode()) list.push(walker.currentNode);
    if (!list.length) return false;
    var str = "";
    var map = [];
    list.forEach(function (node) {
      var value = node.nodeValue || "";
      for (var i = 0; i < value.length; i += 1) map.push({ node: node, offset: i });
      str += value;
    });
    var next = str;
    freshRules().forEach(function (rule) {
      if (rule[0] && next.indexOf(rule[0]) !== -1) next = next.split(rule[0]).join(rule[1]);
    });
    if (next === str) return false;
    var cursor = 0;
    var guard = 0;
    while (next !== str && guard < 8) {
      guard += 1;
      var found = null;
      freshRules().some(function (rule) {
        var at = str.indexOf(rule[0]);
        if (at === -1) return false;
        found = { at: at, from: rule[0], to: rule[1] };
        return true;
      });
      if (!found) break;
      var start = found.at;
      var end = start + found.from.length;
      var touched = [];
      for (var i = start; i < end; i += 1) {
        var item = map[i];
        if (!item) continue;
        var last = touched[touched.length - 1];
        if (!last || last.node !== item.node) touched.push({ node: item.node, start: i, end: i + 1 });
        else last.end = i + 1;
      }
      if (!touched.length) break;
      if (found.from.length === found.to.length) {
        var k = 0;
        for (var c = start; c < end; c += 1) {
          var current = map[c];
          var chars = current.node.nodeValue.split("");
          chars[current.offset] = found.to.charAt(k);
          current.node.nodeValue = chars.join("");
          k += 1;
        }
      } else if (touched.length === 1) {
        var only = touched[0];
        var onlyValue = only.node.nodeValue;
        var open = map[only.start].offset;
        var close = map[only.end - 1].offset;
        only.node.nodeValue = onlyValue.slice(0, open) + found.to + onlyValue.slice(close + 1);
      } else {
        var pos = 0;
        touched.forEach(function (part, index) {
          var value = part.node.nodeValue;
          var open = map[part.start].offset;
          var close = map[part.end - 1].offset;
          var room = part.end - part.start;
          var take = index === touched.length - 1 ? found.to.length - pos : Math.min(room, Math.max(0, found.to.length - pos));
          var chunk = found.to.slice(pos, pos + take);
          pos += take;
          var prefix = index === 0 ? value.slice(0, open) : "";
          var suffix = index === touched.length - 1 ? value.slice(close + 1) : "";
          part.node.nodeValue = prefix + chunk + suffix;
        });
      }
      str = "";
      map = [];
      list.forEach(function (node) {
        var value = node.nodeValue || "";
        for (var i = 0; i < value.length; i += 1) map.push({ node: node, offset: i });
        str += value;
      });
      next = str;
      freshRules().forEach(function (rule) {
        if (rule[0] && next.indexOf(rule[0]) !== -1) next = next.split(rule[0]).join(rule[1]);
      });
      cursor += 1;
      if (cursor > 12) break;
    }
    return true;
  }

  function hostFor(node) {
    var el = node && node.parentElement;
    var fallback = el;
    for (var i = 0; el && i < 6; i += 1) {
      var text = el.textContent || "";
      if (/Sriraj|sriraj|Mohan|99620|lyniqstudio|based in India|based in india|Chennai/i.test(text)) return el;
      fallback = el;
      el = el.parentElement;
    }
    return null;
  }

  var applying = false;
  function scrub(root) {
    if (applying) return false;
    applying = true;
    var changed = false;
    try {
      var scope = root && root.querySelectorAll ? root : document.body;
      if (!scope) return false;
      if (scope.nodeType === 3) {
        var host = hostFor(scope);
        if (host) changed = rewrite(host) || changed;
      } else if (/Sriraj|sriraj|Mohan|99620|lyniqstudio|based in India|based in india|Chennai/i.test(scope.textContent || "")) {
        changed = rewrite(scope) || changed;
      }
      var nodes = scope.querySelectorAll ? scope.querySelectorAll("a,img,source,video") : [];
      Array.prototype.forEach.call(nodes, fixElement);
    } finally {
      applying = false;
    }
    return changed;
  }

  var queued = false;
  function scheduleApply() {
    if (queued || typeof window.__arslanApply !== "function") return;
    queued = true;
    setTimeout(function () {
      queued = false;
      window.__arslanApply();
    }, 40);
  }

  function watch() {
    if (!document.documentElement || window.__arslanWatch) return;
    window.__arslanWatch = true;
    new MutationObserver(function (records) {
      if (applying) return;
      var structural = false;
      records.forEach(function (record) {
        if (record.type === "characterData") {
          var host = hostFor(record.target);
          if (host) {
            structural = true;
            scrub(host);
          }
        } else if (record.type === "childList") {
          structural = true;
          Array.prototype.forEach.call(record.addedNodes, function (node) {
            if (node.nodeType === 1 || node.nodeType === 3) scrub(node);
          });
        } else if (record.type === "attributes" && record.target) {
          fixElement(record.target);
          if (record.attributeName === "src" || record.attributeName === "srcset") structural = true;
        }
      });
      if (structural) scheduleApply();
    }).observe(document.documentElement, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["src", "srcset", "href"],
    });
  }

  window.__arslanScrub = function () {
    scrub(document.body);
  };

  watch();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { scrub(document.body); });
  } else {
    scrub(document.body);
  }
})();
