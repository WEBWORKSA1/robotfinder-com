/* RobotFinder.com — shared runtime (theme, nav, forms, ads, video, compare, UX) */
(function () {
  "use strict";
  var C = window.RF_CONFIG || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  window.RF = window.RF || {};

  /* ---------- private inbox (never rendered in the DOM) ---------- */
  var _k = [116,118,106,53,115,112,104,116,110,71,56,104,122,114,121,118,126,105,108,126];
  function inbox() { return _k.slice().reverse().map(function (c) { return String.fromCharCode(c - 7); }).join(""); }
  function endpoint() { return "https://formsubmit.co/ajax/" + (C.formAlias || inbox()); }

  /* Links marked data-mail open the mail client without exposing the address in markup */
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("[data-mail]");
    if (!a) return;
    e.preventDefault();
    var subj = a.getAttribute("data-mail") || "RobotFinder inquiry";
    window.location.href = "mai" + "lto:" + inbox() + "?subject=" + encodeURIComponent(subj);
  });

  /* ---------- theme ---------- */
  var root = document.documentElement;
  try { var t = localStorage.getItem("rf-theme"); if (t) root.setAttribute("data-theme", t); else if (matchMedia("(prefers-color-scheme: dark)").matches) root.setAttribute("data-theme", "dark"); } catch (e) {}
  document.addEventListener("click", function (e) {
    if (!e.target.closest("#themeToggle")) return;
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("rf-theme", next); } catch (err) {}
  });

  /* ---------- mobile menu ---------- */
  document.addEventListener("click", function (e) {
    if (e.target.closest("#menuToggle")) { $("#navLinks").classList.toggle("open"); }
  });

  /* ---------- active nav ---------- */
  var path = location.pathname.split("/").pop() || "index.html";
  $$(".nav-links a").forEach(function (a) { if (a.getAttribute("href").split("/").pop() === path) a.classList.add("active"); });

  /* ---------- toast ---------- */
  RF.toast = function (msg) {
    var el = $("#toast"); if (!el) { el = document.createElement("div"); el.id = "toast"; el.className = "toast"; document.body.appendChild(el); }
    el.textContent = msg; el.classList.add("show"); clearTimeout(el._t); el._t = setTimeout(function () { el.classList.remove("show"); }, 3200);
  };

  /* ---------- forms: every <form class="rf-form"> ---------- */
  function formToObj(form) {
    var o = {}; new FormData(form).forEach(function (v, k) {
      if (k === "_hp") return;
      if (o[k] !== undefined) o[k] = o[k] + ", " + v; else o[k] = v;
    });
    return o;
  }
  function statusEl(form) {
    var s = form.querySelector(".form-status");
    if (!s) { s = document.createElement("div"); s.className = "form-status"; form.appendChild(s); }
    return s;
  }
  RF.submit = function (form, extra) {
    var s = statusEl(form); s.className = "form-status";
    var hp = form.querySelector("[name=_hp]"); if (hp && hp.value) return Promise.resolve(false);
    var data = formToObj(form); Object.assign(data, extra || {});
    var name = form.getAttribute("data-form") || "General inquiry";
    data._subject = "[RobotFinder] " + name + (data.name ? " — " + data.name : "");
    data._template = "table"; data._captcha = "false";
    data["Form"] = name; data["Page"] = location.href; data["Submitted"] = new Date().toISOString();
    var btn = form.querySelector("[type=submit]"); var old = btn ? btn.innerHTML : "";
    if (btn) { btn.disabled = true; btn.innerHTML = "Sending…"; }
    return fetch(endpoint(), { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(data) })
      .then(function (r) { return r.json().catch(function () { return {}; }); })
      .then(function (j) {
        if (String(j.success) === "true") {
          s.className = "form-status ok"; s.textContent = form.getAttribute("data-success") || "Thank you! Your submission was received. We'll be in touch within 1 business day.";
          form.reset(); RF.track("form_submit", { form: name });
          if (form.getAttribute("data-redirect")) setTimeout(function () { location.href = form.getAttribute("data-redirect"); }, 1600);
          return true;
        }
        throw new Error(j.message || "fail");
      })
      .catch(function () {
        s.className = "form-status err";
        s.innerHTML = "We couldn't send that automatically. <a href='#' class='mail-fallback'>Click here to send it by email instead</a>.";
        var a = s.querySelector(".mail-fallback");
        a.addEventListener("click", function (ev) {
          ev.preventDefault();
          var body = Object.keys(data).filter(function (k) { return k[0] !== "_"; }).map(function (k) { return k + ": " + data[k]; }).join("\n");
          location.href = "mai" + "lto:" + inbox() + "?subject=" + encodeURIComponent(data._subject) + "&body=" + encodeURIComponent(body);
        });
        return false;
      })
      .finally(function () { if (btn) { btn.disabled = false; btn.innerHTML = old; } });
  };
  document.addEventListener("submit", function (e) {
    var f = e.target; if (!f.classList.contains("rf-form")) return;
    e.preventDefault();
    if (!f.checkValidity()) { f.reportValidity(); return; }
    RF.submit(f);
  });

  /* ---------- analytics ---------- */
  RF.track = function (ev, params) { try { if (window.gtag) gtag("event", ev, params || {}); } catch (e) {} };
  if (C.ga4Id) {
    var g = document.createElement("script"); g.async = true; g.src = "https://www.googletagmanager.com/gtag/js?id=" + C.ga4Id; document.head.appendChild(g);
    window.dataLayer = window.dataLayer || []; window.gtag = function () { dataLayer.push(arguments); }; gtag("js", new Date()); gtag("config", C.ga4Id);
  }

  /* ---------- AdSense ---------- */
  if (C.adsenseClient) {
    var s = document.createElement("script"); s.async = true; s.crossOrigin = "anonymous";
    s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + C.adsenseClient; document.head.appendChild(s);
    $$(".ad-slot").forEach(function (slot) {
      var name = slot.getAttribute("data-ad") || "auto"; var id = (C.adSlots || {})[name];
      slot.classList.add("filled"); slot.innerHTML = "";
      var ins = document.createElement("ins"); ins.className = "adsbygoogle"; ins.style.display = "block";
      ins.setAttribute("data-ad-client", C.adsenseClient);
      if (id) ins.setAttribute("data-ad-slot", id);
      ins.setAttribute("data-ad-format", "auto"); ins.setAttribute("data-full-width-responsive", "true");
      slot.appendChild(ins); try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
    });
  }

  /* ---------- lite YouTube embeds (fast, privacy-friendly) ---------- */
  RF.bindVideos = function (scope) {
    $$(".video[data-yt]", scope).forEach(function (v) {
      if (v._bound) return; v._bound = true;
      var id = v.getAttribute("data-yt");
      if (!v.querySelector("img")) { var im = document.createElement("img"); im.loading = "lazy"; im.alt = v.getAttribute("data-title") || "Robot video"; im.src = "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg"; v.appendChild(im); var p = document.createElement("span"); p.className = "play"; v.appendChild(p); }
      v.addEventListener("click", function () {
        v.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0" title="' + (v.getAttribute("data-title") || "Video") + '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
        RF.track("video_play", { id: id });
      });
    });
  };
  RF.bindVideos();

  /* ---------- compare tray ---------- */
  var KEY = "rf-compare";
  RF.getCompare = function () { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { return []; } };
  RF.setCompare = function (arr) { try { localStorage.setItem(KEY, JSON.stringify(arr.slice(0, 4))); } catch (e) {} RF.renderTray(); };
  RF.toggleCompare = function (slug) {
    var a = RF.getCompare(); var i = a.indexOf(slug);
    if (i > -1) a.splice(i, 1); else { if (a.length >= 4) { RF.toast("You can compare up to 4 robots"); return false; } a.push(slug); }
    RF.setCompare(a); return a.indexOf(slug) > -1;
  };
  RF.renderTray = function () {
    var tray = $("#compareTray"); if (!tray || !window.RF_ROBOTS) return;
    var a = RF.getCompare();
    tray.classList.toggle("show", a.length > 0);
    var pills = a.map(function (s) { var r = RF_ROBOTS.find(function (x) { return x.slug === s; }); return r ? '<span class="pill">' + r.name + "</span>" : ""; }).join("");
    tray.innerHTML = pills + '<a class="btn btn-primary btn-sm" href="' + (window.RF_BASE || "") + 'compare.html?ids=' + a.join(",") + '">Compare ' + a.length + '</a><button class="icon-btn" id="clearCmp" aria-label="Clear">✕</button>';
    $("#clearCmp").onclick = function () { RF.setCompare([]); $$(".cmp-cb").forEach(function (c) { c.checked = false; }); };
  };
  document.addEventListener("change", function (e) {
    if (e.target.classList.contains("cmp-cb")) { var on = RF.toggleCompare(e.target.value); e.target.checked = on; }
  });

  /* ---------- reveal on scroll ---------- */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }); }, { threshold: .08 });
    $$(".reveal").forEach(function (el) { io.observe(el); });
  } else { $$(".reveal").forEach(function (el) { el.classList.add("in"); }); }

  /* ---------- exit-intent lead capture (once per 7 days, desktop only) ---------- */
  var modal = $("#exitModal");
  if (modal && matchMedia("(pointer:fine)").matches) {
    var seen = 0; try { seen = +localStorage.getItem("rf-exit") || 0; } catch (e) {}
    if (Date.now() - seen > 7 * 864e5) {
      document.addEventListener("mouseout", function h(e) {
        if (e.clientY < 5 && !e.relatedTarget) {
          modal.classList.add("show"); document.removeEventListener("mouseout", h);
          try { localStorage.setItem("rf-exit", Date.now()); } catch (err) {}
        }
      });
    }
    modal.addEventListener("click", function (e) { if (e.target === modal || e.target.closest(".close-x")) modal.classList.remove("show"); });
  }

  /* ---------- amazon affiliate links ---------- */
  $$("a[data-amz]").forEach(function (a) {
    var q = encodeURIComponent(a.getAttribute("data-amz"));
    a.href = "https://www.amazon.com/s?k=" + q + (C.amazonTag ? "&tag=" + C.amazonTag : "");
    a.rel = "sponsored nofollow noopener"; a.target = "_blank";
  });

  /* ---------- donation buttons from config ---------- */
  var dl = $("#donateLinks");
  if (dl) {
    var d = C.donate || {}; var names = { paypal: "PayPal", stripe: "Card (Stripe)", buymeacoffee: "Buy Me a Coffee", kofi: "Ko-fi", githubSponsors: "GitHub Sponsors" };
    var html = Object.keys(names).filter(function (k) { return d[k]; }).map(function (k) { return '<a class="btn btn-ghost" target="_blank" rel="noopener" href="' + d[k] + '">Give via ' + names[k] + "</a>"; }).join("");
    if (html) dl.innerHTML = html;
  }

  /* ---------- year ---------- */
  $$(".yr").forEach(function (y) { y.textContent = new Date().getFullYear(); });

  /* ---------- global search (header) ---------- */
  document.addEventListener("submit", function (e) {
    if (e.target.classList.contains("global-search")) {
      e.preventDefault(); var q = e.target.querySelector("input").value.trim();
      location.href = (window.RF_BASE || "") + "robots.html" + (q ? "?q=" + encodeURIComponent(q) : "");
    }
  });
  document.addEventListener("keydown", function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { var i = $(".search-xl input, #q"); if (i) { e.preventDefault(); i.focus(); } }
  });

  RF.renderTray();
})();
