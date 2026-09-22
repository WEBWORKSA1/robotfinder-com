/* RobotFinder.com — page-specific interactivity */
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var page = document.body.getAttribute("data-page");
  var B = window.RF_BASE || "";
  var qs = new URLSearchParams(location.search);
  var money = function (n) { return (n < 0 ? "-$" : "$") + Math.abs(Math.round(n)).toLocaleString(); };

  /* sync compare checkboxes everywhere */
  var sel = (window.RF.getCompare && RF.getCompare()) || [];
  $$(".cmp-cb").forEach(function (c) { c.checked = sel.indexOf(c.value) > -1; });

  /* ---------- Home: matchmaker ---------- */
  if (page === "home") {
    $("#mmGo").addEventListener("click", function () {
      location.href = "robots.html?market=" + $("#mmWho").value + "&max=" + $("#mmBudget").value;
    });
  }

  /* ---------- Directory ---------- */
  if (page === "directory") {
    var grid = $("#robotGrid"), cards = $$(".robot-card", grid), q = $("#q"), sort = $("#sort"), mp = $("#maxPrice"), inc = $("#incQuote");
    var original = cards.slice();
    if (qs.get("q")) q.value = qs.get("q");
    if (qs.get("market")) $$("input[name=market]").forEach(function (c) { if (c.value === qs.get("market")) c.checked = true; });
    if (qs.get("cat")) $$("input[name=cat]").forEach(function (c) { if (c.value === qs.get("cat")) c.checked = true; });
    if (qs.get("max") && +qs.get("max") > 0) mp.value = qs.get("max");
    function checked(n) { return $$("input[name=" + n + "]:checked").map(function (c) { return c.value; }); }
    function apply() {
      var terms = q.value.toLowerCase().trim();
      // natural-language helpers: "under $20k"
      var m = terms.match(/under\s*\$?(\d+)\s*(k)?/); var cap = null;
      if (m) { cap = +m[1] * (m[2] ? 1000 : 1); terms = terms.replace(m[0], "").trim(); }
      var words = terms.split(/\s+/).filter(Boolean);
      var cats = checked("cat"), mk = checked("market"), st = checked("status");
      var max = +mp.value; $("#maxPriceLbl").textContent = max >= 100000 ? "any" : "$" + max.toLocaleString();
      var shown = 0;
      cards.forEach(function (c) {
        var price = +c.dataset.price, ok = true;
        if (words.length) ok = words.every(function (w) { return c.dataset.search.indexOf(w.replace(/s$/, "")) > -1; });
        if (ok && cats.length) ok = cats.indexOf(c.dataset.cat) > -1;
        if (ok && mk.length) ok = mk.indexOf(c.dataset.market) > -1;
        if (ok && st.length) ok = st.indexOf(c.dataset.status) > -1;
        if (ok && price === 0 && !inc.checked) ok = false;
        if (ok && price > 0 && max < 100000 && price > max) ok = false;
        if (ok && cap !== null && (price === 0 || price > cap)) ok = false;
        c.style.display = ok ? "" : "none"; if (ok) shown++;
      });
      var s = sort.value, arr = original.slice();
      var pv = function (c, hi) { var p = +c.dataset.price; return p === 0 ? (hi ? -1 : 1e12) : p; };
      if (s === "new") arr.sort(function (a, b) { return b.dataset.year - a.dataset.year; });
      if (s === "plh") arr.sort(function (a, b) { return pv(a) - pv(b); });
      if (s === "phl") arr.sort(function (a, b) { return pv(b, 1) - pv(a, 1); });
      if (s === "az") arr.sort(function (a, b) { return a.dataset.name.localeCompare(b.dataset.name); });
      arr.forEach(function (c) { grid.appendChild(c); });
      $("#resultCount").textContent = shown + " robot" + (shown === 1 ? "" : "s") + " found";
      $("#noResults").style.display = shown ? "none" : "block";
    }
    ["input", "change"].forEach(function (ev) { document.querySelector(".dir-layout").addEventListener(ev, function (e) { if (!e.target.classList.contains("cmp-cb")) apply(); }); });
    $("#resetF").addEventListener("click", function () { $$(".filters input[type=checkbox]").forEach(function (c) { c.checked = c.id === "incQuote"; }); mp.value = 100000; q.value = ""; apply(); });
    apply();
  }

  /* ---------- Compare ---------- */
  if (page === "compare") {
    var sels = $$(".cmp-sel"); var ids = (qs.get("ids") || RF.getCompare().join(",")).split(",").filter(Boolean).slice(0, 4);
    ids.forEach(function (id, i) { if (sels[i]) sels[i].value = id; });
    function render() {
      var list = sels.map(function (s) { return s.value; }).filter(Boolean);
      var robots = list.map(function (s) { return RF_ROBOTS.find(function (r) { return r.slug === s; }); }).filter(Boolean);
      var out = $("#cmpOut");
      if (!robots.length) { out.innerHTML = '<div class="card center"><p class="muted">Pick robots above, or tick “Compare” anywhere on the site.</p></div>'; return; }
      history.replaceState(null, "", "?ids=" + list.join(","));
      var keys = []; robots.forEach(function (r) { Object.keys(r.specs).forEach(function (k) { if (keys.indexOf(k) < 0) keys.push(k); }); });
      var row = function (label, fn) { return "<tr><th>" + label + "</th>" + robots.map(function (r) { return "<td>" + fn(r) + "</td>"; }).join("") + "</tr>"; };
      var h = '<div class="table-wrap"><table><tr><th></th>' + robots.map(function (r) {
        return '<th><a href="' + B + 'robots/' + r.slug + '.html">' + r.maker + " " + r.name + "</a></th>"; }).join("") + "</tr>";
      h += row("Category", function (r) { return r.icon + " " + r.catName; });
      h += row("Price", function (r) { return r.price ? "<b>~$" + r.price.toLocaleString() + "</b>" : "Request quote"; });
      h += row("Availability", function (r) { return r.status; });
      h += row("Launched", function (r) { return r.year; });
      h += row("Origin", function (r) { return r.country; });
      h += row("Best for", function (r) { return { home: "Home", business: "Business", education: "Education", research: "Research" }[r.market]; });
      keys.forEach(function (k) { h += row(k, function (r) { return r.specs[k] || "—"; }); });
      h += row("", function (r) { return '<a class="btn btn-primary btn-sm" href="' + B + 'robots/' + r.slug + '.html#quote">Get quote</a>'; });
      out.innerHTML = h + "</table></div>";
    }
    sels.forEach(function (s) { s.addEventListener("change", render); }); render();
  }

  /* ---------- Quote wizard ---------- */
  if (page === "quotes") {
    var steps = $$("#wizard .step"), cur = 0, total = steps.length;
    function show() {
      steps.forEach(function (s, i) { s.classList.toggle("active", i === cur); });
      $("#wizBar").style.width = ((cur + 1) / total * 100) + "%";
      $("#wizLbl").textContent = "Step " + (cur + 1) + " of " + total;
      $("#wizBack").style.visibility = cur ? "visible" : "hidden";
      $("#wizNext").style.display = cur < total - 1 ? "" : "none";
      $("#wizSubmit").style.display = cur === total - 1 ? "" : "none";
    }
    function valid() {
      var ok = true;
      $$("input,select,textarea", steps[cur]).forEach(function (el) { if (ok && !el.checkValidity()) { el.reportValidity(); ok = false; } });
      return ok;
    }
    $("#wizNext").addEventListener("click", function () { if (valid()) { cur++; show(); RF.track("rfq_step", { step: cur + 1 }); } });
    $("#wizBack").addEventListener("click", function () { cur--; show(); });
    // auto-advance on single-choice steps
    $$("#wizard .opt input[type=radio]").forEach(function (r) { r.addEventListener("change", function () { setTimeout(function () { if (cur < total - 1 && valid()) { cur++; show(); } }, 250); }); });
    // lead score before submit (budget + timeline + role)
    $("#wizard").addEventListener("submit", function () {
      var f = new FormData($("#wizard")); var s = 0;
      var b = f.get("budget") || ""; if (/100,000|500,000|RaaS/.test(b)) s += 40; else if (/25,000/.test(b)) s += 30; else if (/5,000 –/.test(b)) s += 15; else s += 5;
      var t = f.get("timeline") || ""; if (/Immediately/.test(t)) s += 35; else if (/3–6/.test(t)) s += 25; else if (/6–12/.test(t)) s += 12;
      if (f.get("role") === "Decision maker") s += 15; if (f.get("phone")) s += 10;
      $("#leadScore").value = s + "/100 " + (s >= 70 ? "(HOT)" : s >= 45 ? "(WARM)" : "(NURTURE)");
    }, true);
    // prefill from robot/category
    if (qs.get("cat")) { var o = $$("select[name=category] option").find(function (x) { return x.text.toLowerCase().indexOf(qs.get("cat").replace(/-/g, " ")) > -1; }); if (o) o.selected = true; }
    show();
  }

  /* ---------- ROI calculator ---------- */
  if (page === "roi") {
    var ids = ["rCost", "rInt", "rMaint", "rWage", "rOps", "rShifts", "rHours", "rDays", "rGain"];
    function calc() {
      var v = {}; ids.forEach(function (i) { v[i] = +$("#" + i).value || 0; });
      $("#rGainLbl").textContent = v.rGain;
      var invest = v.rCost + v.rInt;
      var labor = v.rOps * v.rShifts * v.rHours * v.rDays * v.rWage;
      var annual = labor * (1 + v.rGain / 100) - v.rMaint;
      var monthly = annual / 12;
      var payback = monthly > 0 ? invest / monthly : Infinity;
      var roi3 = invest ? ((annual * 3 - invest) / invest) * 100 : 0;
      $("#oPayback").textContent = isFinite(payback) ? payback.toFixed(1) + " months" : "No payback";
      $("#oAnnual").textContent = money(annual); $("#oInvest").textContent = money(invest);
      $("#oRoi").textContent = Math.round(roi3) + "%"; $("#oFive").textContent = money(annual * 5 - invest);
      $("#roiSummary").value = "Invest " + money(invest) + " | annual net " + money(annual) + " | payback " + (isFinite(payback) ? payback.toFixed(1) + " mo" : "n/a") + " | 3yr ROI " + Math.round(roi3) + "%";
    }
    ids.forEach(function (i) { $("#" + i).addEventListener("input", calc); }); calc();
  }

  /* ---------- Videos filter ---------- */
  if (page === "videos") {
    $$("[data-vf]").forEach(function (b) {
      b.addEventListener("click", function () {
        $$("[data-vf]").forEach(function (x) { x.classList.remove("on"); }); b.classList.add("on");
        var f = b.getAttribute("data-vf");
        $$("#videoGrid > .card").forEach(function (c) { c.style.display = f === "all" || c.dataset.cat === f ? "" : "none"; });
      });
    });
    var yt = $("#ytSub"); if (yt) yt.href = (window.RF_CONFIG || {}).youtubeChannel || "#";
  }

  /* ---------- Contests countdown & preselect ---------- */
  var cd = $("#countdown");
  if (cd) {
    var end = new Date(cd.getAttribute("data-deadline")).getTime();
    var tick = function () {
      var d = Math.max(0, end - Date.now());
      var parts = [[Math.floor(d / 864e5), "days"], [Math.floor(d / 36e5) % 24, "hrs"], [Math.floor(d / 6e4) % 60, "min"], [Math.floor(d / 1e3) % 60, "sec"]];
      cd.innerHTML = parts.map(function (p) { return "<div><b>" + p[0] + "</b><span class='small muted'>" + p[1] + "</span></div>"; }).join("");
    };
    tick(); setInterval(tick, 1000);
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest("[data-contest]"); if (a && $("#contestSel")) $("#contestSel").value = a.getAttribute("data-contest");
    var p = e.target.closest("[data-pkg]"); if (p && $("#pkgSel")) $("#pkgSel").value = p.getAttribute("data-pkg");
    var r = e.target.closest("[data-role]"); if (r && $("#roleSel")) $("#roleSel").value = r.getAttribute("data-role");
  });

  /* ---------- Donate ---------- */
  if (page === "donate") {
    var form = $("#donateForm");
    form.addEventListener("change", function (e) { if (e.target.name === "amount") $("#customAmt").style.display = e.target.value === "custom" ? "" : "none"; });
    $$(".pick-amt").forEach(function (b) {
      b.addEventListener("click", function () {
        var a = b.getAttribute("data-amt"); var r = $$("input[name=amount]", form).find(function (x) { return x.value === "$" + a; });
        if (r) r.checked = true; form.querySelector("select[name=frequency]").value = "Monthly";
        form.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    });
    if (qs.get("fund")) $("#fundSel").value = qs.get("fund");
  }

  /* ---------- Contact topic prefill ---------- */
  if (page === "contact" && qs.get("topic")) {
    var map = { correction: "Correction / data update", "sourcing-call": "Robot sourcing call" };
    if (map[qs.get("topic")]) $("#topicSel").value = map[qs.get("topic")];
  }
})();
