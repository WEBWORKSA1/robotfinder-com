/* RobotFinder.com — page renderer. Every HTML page is a light stub (SEO head + domain bar);
   this file renders header, content and footer from RF_DATA. Page type: <body data-page data-slug data-base>. */
(function () {
  "use strict";
  var D = window.RF_DATA, CAT = D.catMap, R = D.robots;
  var body = document.body, page = body.getAttribute("data-page"), slug = body.getAttribute("data-slug"), b = body.getAttribute("data-base") || "";
  window.RF_BASE = b;
  var BY = {}; R.forEach(function (r) { BY[r.slug] = r; });
  function E(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function each(a, f) { return a.map(f).join(""); }
  function count(cat) { return R.filter(function (r) { return r.cat === cat; }).length; }
  function priceLabel(r) { return r.price ? "From ~$" + r.price.toLocaleString("en-US") : (r.status === "Not for sale" ? "Not for sale" : "Request quote"); }
  function stCls(s) { return { "Available": "ok", "Pre-order": "pre", "Pilot": "pilot", "Invite only": "pre" }[s] || ""; }
  var HP = '<input class="hp" name="_hp" tabindex="-1" autocomplete="off" aria-hidden="true">';
  var MARKET = { home: "households and consumers", business: "businesses and industrial operators", education: "schools, students and makers", research: "universities, labs and R&amp;D teams" };
  function schema(o) { var s = document.createElement("script"); s.type = "application/ld+json"; s.textContent = JSON.stringify(o); document.head.appendChild(s); }
  var SITE = "https://robotfinder.com";

  /* ---------------- chrome ---------------- */
  var NAV = [["robots.html", "Robots"], ["categories.html", "Categories"], ["compare.html", "Compare"], ["videos.html", "Videos"], ["guides.html", "Guides"], ["roi-calculator.html", "ROI"], ["jobs.html", "Jobs"], ["contests.html", "Contests"], ["events.html", "Events"], ["advertise.html", "Advertise"]];
  function header() {
    return '<header class="site-header"><div class="container nav">' +
      '<a class="logo" href="' + b + 'index.html" aria-label="RobotFinder home"><span class="logo-mark"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="4" y="7" width="16" height="12" rx="3"/><circle cx="9" cy="13" r="1.5" fill="currentColor"/><circle cx="15" cy="13" r="1.5" fill="currentColor"/><path d="M12 3v4M8 19v2M16 19v2"/></svg></span><span>Robot<b>Finder</b></span></a>' +
      '<nav class="nav-links" id="navLinks" aria-label="Main">' + each(NAV, function (n) { return '<a href="' + b + n[0] + '">' + n[1] + "</a>"; }) +
      '<a class="btn btn-primary btn-sm" href="' + b + 'get-quotes.html" style="color:#fff">Get Free Quotes</a></nav>' +
      '<div class="nav-cta"><a class="btn btn-accent btn-sm btn-sm-hide" href="' + b + 'donate.html">♥ Support</a><button class="icon-btn" id="themeToggle" aria-label="Toggle dark mode">◐</button><button class="icon-btn menu-toggle" id="menuToggle" aria-label="Menu">☰</button></div>' +
      "</div></header>";
  }
  function footer() {
    var cats = each(D.cats.slice(0, 7), function (c) { return '<li><a href="' + b + "categories/" + c.slug + '.html">' + E(c.name) + "</a></li>"; });
    return '<footer class="site-footer"><div class="container"><div class="foot-grid">' +
      '<div><a class="logo" href="' + b + 'index.html" style="color:#fff"><span class="logo-mark">R</span><span>Robot<b>Finder</b></span></a>' +
      '<p class="small" style="margin-top:12px">The independent search engine for robots. Discover, compare and get quotes on robots for home, business, education and research.</p>' +
      '<form class="rf-form newsletter-inline" data-form="Newsletter signup" data-success="You\'re in! Watch your inbox for the weekly RobotFinder Brief.">' + HP +
      '<label class="sr-only" for="nlf">Your email</label><input id="nlf" type="email" name="email" placeholder="Your email — weekly robot brief" required><button class="btn btn-primary" type="submit">Join</button></form></div>' +
      '<div><h4>Categories</h4><ul>' + cats + '<li><a href="' + b + 'categories.html">All categories →</a></li></ul></div>' +
      '<div><h4>Buyers</h4><ul><li><a href="' + b + 'get-quotes.html">Get free quotes</a></li><li><a href="' + b + 'robots.html">Robot directory</a></li><li><a href="' + b + 'compare.html">Compare robots</a></li><li><a href="' + b + 'roi-calculator.html">ROI calculator</a></li><li><a href="' + b + 'guides.html">Buying guides</a></li><li><a href="' + b + 'videos.html">Video hub</a></li></ul></div>' +
      '<div><h4>Vendors</h4><ul><li><a href="' + b + 'list-your-robot.html">List your robot</a></li><li><a href="' + b + 'advertise.html">Advertise &amp; sponsor</a></li><li><a href="' + b + 'advertise.html#leads">Buy qualified leads</a></li><li><a href="' + b + 'jobs.html#post">Post a job</a></li><li><a href="' + b + 'events.html#submit">Submit an event</a></li></ul></div>' +
      '<div><h4>Community</h4><ul><li><a href="' + b + 'contests.html">Contests &amp; prizes</a></li><li><a href="' + b + 'jobs.html">Jobs &amp; talent</a></li><li><a href="' + b + 'donate.html">Support RobotFinder</a></li><li><a href="' + b + 'about.html">About</a></li><li><a href="' + b + 'contact.html">Contact</a></li></ul></div>' +
      '</div><div class="foot-bottom"><span>© <span class="yr"></span> RobotFinder.com · <a href="' + b + 'privacy.html">Privacy</a> · <a href="' + b + 'terms.html">Terms</a> · <a href="' + b + 'disclosure.html">Affiliate disclosure</a></span>' +
      '<span><a href="https://web.works/contact" target="_blank" rel="noopener">This domain may be available — inquire</a></span></div></div></footer>' +
      '<div class="compare-tray" id="compareTray" aria-live="polite"></div>' +
      '<div class="exit-modal" id="exitModal" role="dialog" aria-modal="true" aria-labelledby="exitTitle"><div class="form-card"><button class="icon-btn close-x" aria-label="Close">✕</button><span class="badge hot">Free download</span>' +
      '<h3 id="exitTitle" style="margin-top:10px">Before you go — get the 2026 Robot Buyer\'s Checklist</h3><p class="muted small">The 27-point checklist buyers use to avoid overpaying for robots, plus our weekly brief.</p>' +
      '<form class="rf-form" data-form="Lead magnet — Buyer\'s Checklist" data-success="Check your inbox — your checklist is on its way.">' + HP +
      '<div class="field"><input name="name" placeholder="First name" required></div><div class="field"><input type="email" name="email" placeholder="Work or personal email" required></div>' +
      '<div class="field"><select name="interest"><option>Home robots</option><option>Business / industrial</option><option>Education / STEM</option><option>Research</option></select></div>' +
      '<button class="btn btn-grad btn-block" type="submit">Send me the checklist</button></form></div></div>';
  }

  /* ---------------- components ---------------- */
  function ad(name, cls) { return '<div class="container"><div class="ad-slot ' + (cls || "") + '" data-ad="' + (name || "leaderboard") + '">Advertisement</div></div>'; }
  function adRaw(name, cls) { return '<div class="ad-slot ' + (cls || "") + '" data-ad="' + name + '">Advertisement</div>'; }
  function robotCard(r) {
    var c = CAT[r.cat];
    var thumb = r.video ? '<img loading="lazy" src="https://i.ytimg.com/vi/' + r.video + '/hqdefault.jpg" alt="' + E(r.name) + " by " + E(r.maker) + '">' : '<span aria-hidden="true">' + c.icon + "</span>";
    return '<article class="card robot-card reveal" data-cat="' + r.cat + '" data-price="' + r.price + '" data-year="' + r.year + '" data-status="' + E(r.status) + '" data-market="' + r.market + '" data-name="' + E(r.name.toLowerCase()) + '" data-search="' + E((r.name + " " + r.maker + " " + c.name + " " + r.summary).toLowerCase()) + '">' +
      '<a class="robot-thumb" href="' + b + "robots/" + r.slug + '.html">' + thumb + '<span class="badge ' + stCls(r.status) + '">' + E(r.status) + "</span></a>" +
      '<div class="robot-body"><div class="robot-meta"><span class="badge">' + E(c.name) + "</span></div>" +
      '<h3><a href="' + b + "robots/" + r.slug + '.html">' + E(r.name) + "</a></h3>" +
      '<div class="muted small">' + E(r.maker) + " · " + r.year + " · " + E(r.country) + "</div>" +
      '<p class="small" style="margin:0">' + E(r.summary) + "</p>" +
      '<div class="robot-actions"><span class="price">' + priceLabel(r) + '</span><label class="cmp-toggle"><input type="checkbox" class="cmp-cb" value="' + r.slug + '"> Compare</label></div></div></article>';
  }
  function leadBand(t, s) {
    t = t || "Buying a robot? Get up to 3 competing quotes — free.";
    s = s || "Tell us what you need in 60 seconds. We match you with vetted manufacturers and integrators, including Robots-as-a-Service options.";
    return '<section><div class="container"><div class="cta-band reveal"><div><h2 style="color:#fff">' + t + "</h2><p>" + s + '</p><div class="trust" style="color:#fff"><span>✓ 100% free for buyers</span><span>✓ Replies in ~1 business day</span><span>✓ No spam, ever</span></div></div>' +
      '<div style="display:flex;flex-direction:column;gap:10px"><a class="btn btn-block" style="background:#fff;color:#1b2a55" href="' + b + 'get-quotes.html">Start my free quote →</a><a class="btn btn-ghost btn-block" href="' + b + 'roi-calculator.html">Calculate ROI first</a></div></div></div></section>';
  }
  function hero(title, sub, crumbs) {
    var cr = crumbs ? '<div class="breadcrumb"><a href="' + b + 'index.html">Home</a> / ' + crumbs.join(" / ") + "</div>" : "";
    return '<section class="page-hero"><div class="container">' + cr + "<h1>" + title + "</h1><p>" + sub + "</p></div></section>";
  }
  function videoTile(v) {
    return '<div class="card reveal" style="padding:12px" data-cat="' + v.cat + '"><div class="video" data-yt="' + v.id + '" data-title="' + E(v.title) + '"></div><h3 style="font-size:1rem;margin:12px 4px 2px">' + E(v.title) + '</h3><div class="muted small" style="margin:0 4px">' + E(v.channel) + " · " + E(CAT[v.cat].name) + "</div></div>";
  }
  function guideCard(g) {
    return '<a class="card reveal" href="' + b + "guides/" + g.slug + '.html" style="color:var(--text)"><span class="badge">' + g.cat + '</span><h3 style="margin:10px 0 6px">' + E(g.title) + '</h3><p class="muted small">' + E(g.desc) + '</p><span class="small">' + g.mins + " min read →</span></a>";
  }
  function catCard(c, long) {
    return '<a class="card cat-card reveal" href="' + b + "categories/" + c.slug + '.html"><span class="cat-ico">' + c.icon + '</span><div><h3 style="margin:0 0 4px;font-size:1.02rem">' + E(c.name) + "</h3><small>" +
      (long ? E(c.desc) + '</small><div class="small" style="margin-top:6px">' + count(c.slug) + " robots →</div>" : count(c.slug) + " robots · " + E(c.desc.slice(0, 62)) + "…</small>") + "</div></a>";
  }
  function opts(name, items) {
    return '<div class="opt-grid">' + items.map(function (it, i) { return '<label class="opt"><input type="radio" name="' + name + '" value="' + E(it[1]) + '"' + (i === 0 ? " required" : "") + "><span>" + it[0] + " " + E(it[1]) + "</span></label>"; }).join("") + "</div>";
  }
  function f(name, ph, extra) { return '<div class="field"><input name="' + name + '" placeholder="' + ph + '"' + (extra || "") + "></div>"; }
  function sel(name, list, id) { return '<div class="field"><select name="' + name + '"' + (id ? ' id="' + id + '"' : "") + ">" + each(list, function (o) { return "<option>" + o + "</option>"; }) + "</select></div>"; }
  function row2(a, c) { return '<div class="row2">' + a + c + "</div>"; }
  function formCard(name, success, inner, attrs) { return '<form class="form-card rf-form" data-form="' + name + '" data-success="' + success + '"' + (attrs || "") + ">" + HP + inner + "</form>"; }
  function faqs(list) { return each(list, function (x) { return "<details><summary>" + E(x[0]) + "</summary><p>" + x[1] + "</p></details>"; }); }

  /* ---------------- pages ---------------- */
  var P = {};
  P.home = function () {
    var feat = ["unitree-g1", "boston-dynamics-spot", "figure-02", "universal-robots-ur5e", "roborock-s8-maxv-ultra", "agility-digit", "1x-neo", "lego-spike-prime"].map(function (s) { return BY[s]; });
    var chips = each(["humanoid", "cobot", "robot vacuum", "robot dog", "lawn mower", "STEM kit", "warehouse"], function (q) { return '<a class="chip" href="robots.html?q=' + encodeURIComponent(q) + '">' + q + "</a>"; });
    schema({ "@context": "https://schema.org", "@type": "Organization", name: "RobotFinder", url: SITE, logo: SITE + "/assets/img/favicon.svg" });
    schema({ "@context": "https://schema.org", "@type": "WebSite", name: "RobotFinder", url: SITE, potentialAction: { "@type": "SearchAction", target: SITE + "/robots.html?q={query}", "query-input": "required name=query" } });
    return '<section class="hero"><div class="container hero-grid"><div>' +
      '<span class="eyebrow"><span class="dot"></span> ' + R.length + "+ robots · " + D.cats.length + " categories · updated weekly</span>" +
      '<h1>Find the right <span class="grad-text">robot</span> for any job.</h1>' +
      '<p class="lead">Search, compare and get quotes on humanoids, cobots, robot vacuums, drones, STEM kits and more — for home, business, education and research.</p>' +
      '<form class="search-xl global-search" role="search"><input aria-label="Search robots" placeholder="Try “humanoid under $20k” or “cobot 20 kg payload”"><button class="btn btn-primary" type="submit">Search</button></form>' +
      '<div class="chips">' + chips + "</div></div>" +
      '<div class="hero-card reveal"><h3>Robot Matchmaker</h3><p class="muted small">Answer 2 questions — we\'ll point you to the right robots.</p>' +
      '<div class="field"><label class="f" for="mmWho">I\'m buying for…</label><select id="mmWho"><option value="home">My home</option><option value="business">My business</option><option value="education">A school / STEM</option><option value="research">Research / R&amp;D</option></select></div>' +
      '<div class="field"><label class="f" for="mmBudget">Budget</label><select id="mmBudget"><option value="2000">Under $2,000</option><option value="20000">$2,000 – $20,000</option><option value="100000">$20,000 – $100,000</option><option value="0">$100,000+ / quote</option></select></div>' +
      '<button class="btn btn-grad btn-block" id="mmGo">Show my matches →</button>' +
      '<div class="stats" style="margin-top:16px"><div class="stat"><b>' + R.length + '+</b><span class="muted small">robots profiled</span></div><div class="stat"><b>Free</b><span class="muted small">quotes for buyers</span></div></div></div></div></section>' +
      ad("leaderboard") +
      '<section><div class="container"><div class="section-head"><div><h2>Browse by category</h2><p>From $150 coding robots to industrial humanoids.</p></div><a class="btn btn-ghost" href="categories.html">All ' + D.cats.length + ' categories →</a></div><div class="grid g3">' + each(D.cats.slice(0, 12), function (c) { return catCard(c); }) + "</div></div></section>" +
      '<section class="alt"><div class="container"><div class="section-head"><div><h2>Trending robots</h2><p>The most-searched robots on RobotFinder this month.</p></div><a class="btn btn-ghost" href="robots.html">Full directory →</a></div><div class="grid g4">' + each(feat, robotCard) + "</div></div></section>" +
      leadBand() +
      '<section><div class="container"><div class="section-head"><div><h2>Watch robots in action</h2><p>Curated demos and launches from the world\'s top robot makers.</p></div><a class="btn btn-ghost" href="videos.html">Video hub →</a></div><div class="grid g3">' + each(D.videos.slice(0, 3), videoTile) + "</div></div></section>" +
      '<section class="alt"><div class="container"><div class="grid g3">' +
      '<div class="card reveal"><span class="cat-ico">🧮</span><h3 style="margin-top:12px">Robot ROI Calculator</h3><p class="muted">See payback period, 3-year ROI and 5-year savings in seconds.</p><a href="roi-calculator.html">Calculate ROI →</a></div>' +
      '<div class="card reveal"><span class="cat-ico">⚖️</span><h3 style="margin-top:12px">Side-by-side compare</h3><p class="muted">Put up to 4 robots head-to-head on price, specs and availability.</p><a href="compare.html">Compare robots →</a></div>' +
      '<div class="card reveal"><span class="cat-ico">🏆</span><h3 style="margin-top:12px">Contests &amp; prizes</h3><p class="muted">Enter the RobotFinder video, build and idea challenges.</p><a href="contests.html">See contests →</a></div></div></div></section>' +
      '<section><div class="container"><div class="section-head"><div><h2>Buying guides</h2><p>Independent, practical advice before you spend a dollar.</p></div><a class="btn btn-ghost" href="guides.html">All guides →</a></div><div class="grid g3">' + each(D.guides.slice(0, 3), guideCard) + "</div></div></section>" +
      ad("footer") +
      '<section class="alt"><div class="container grid g2" style="align-items:center"><div><h2>Are you a robot maker or integrator?</h2><p class="muted">Reach buyers who are actively searching. List your robots free, upgrade to a featured listing, sponsor a category or buy exclusive, pre-qualified leads.</p>' +
      '<ul class="list-check"><li>Free &amp; verified vendor profiles</li><li>Featured placement in search and categories</li><li>Pay-per-lead RFQ program</li><li>Newsletter &amp; video sponsorships</li></ul>' +
      '<a class="btn btn-primary" href="list-your-robot.html">List your robot</a> <a class="btn btn-ghost" href="advertise.html">Advertising options</a></div>' +
      '<div class="card"><h3>Keep RobotFinder independent</h3><p class="muted">RobotFinder is reader-supported. Donations fund operations, marketing, new talent and the prize pools for our community contests.</p><a class="btn btn-accent" href="donate.html">♥ Support RobotFinder</a></div></div></section>' +
      '<section><div class="container"><h2 class="center">Frequently asked questions</h2><div style="max-width:800px;margin:20px auto 0">' + faqs([
        ["What is RobotFinder?", "RobotFinder is an independent robot search engine and marketplace guide. We profile robots across " + D.cats.length + " categories, publish buying guides and videos, and connect serious buyers with vetted vendors for free quotes."],
        ["Is RobotFinder free to use?", "Yes — browsing, comparing, calculators and quotes are free for buyers. We earn from advertising, affiliate links, sponsored listings and vendor lead programs."],
        ["Can I buy robots directly on RobotFinder?", "We link to official stores and authorized retailers, and for business robots we route your request to vendors who can quote you directly."],
        ["How accurate are prices and specs?", "They're compiled from public manufacturer information and updated regularly, but always confirm with the vendor before purchasing."]]) + "</div></div></section>";
  };

  P.directory = function () {
    var catf = each(D.cats, function (c) { return '<label><input type="checkbox" name="cat" value="' + c.slug + '"> ' + c.icon + " " + E(c.name) + "</label>"; });
    schema({ "@context": "https://schema.org", "@type": "ItemList", itemListElement: R.map(function (r, i) { return { "@type": "ListItem", position: i + 1, url: SITE + "/robots/" + r.slug + ".html", name: r.name }; }) });
    return hero("Robot Directory", "Search and filter " + R.length + "+ robots by category, price, availability and buyer type. Tick “Compare” on up to 4 robots.", ["Robots"]) +
      '<section><div class="container dir-layout"><aside class="filters" aria-label="Filters"><h4 style="margin-top:0">Buyer type</h4>' +
      '<label><input type="checkbox" name="market" value="home"> Home</label><label><input type="checkbox" name="market" value="business"> Business &amp; industry</label><label><input type="checkbox" name="market" value="education"> Education</label><label><input type="checkbox" name="market" value="research"> Research</label>' +
      '<h4>Availability</h4><label><input type="checkbox" name="status" value="Available"> Available now</label><label><input type="checkbox" name="status" value="Pre-order"> Pre-order</label><label><input type="checkbox" name="status" value="Pilot"> Pilot programs</label>' +
      '<h4>Max price</h4><input type="range" id="maxPrice" min="0" max="100000" step="1000" value="100000"><div class="small muted">Up to <b id="maxPriceLbl">any</b> · <label style="display:inline-flex"><input type="checkbox" id="incQuote" checked> incl. quote-only</label></div>' +
      "<h4>Category</h4>" + catf + '<button class="btn btn-ghost btn-sm btn-block" id="resetF" style="margin-top:14px">Reset filters</button>' + adRaw("sidebar", "sidebar") + "</aside>" +
      '<div><div class="toolbar"><input id="q" type="search" placeholder="Search robots, makers, uses… (Ctrl/⌘ K)" aria-label="Search"><select id="sort" aria-label="Sort" style="max-width:220px"><option value="relevance">Sort: Featured</option><option value="new">Newest first</option><option value="plh">Price: low → high</option><option value="phl">Price: high → low</option><option value="az">Name A–Z</option></select></div>' +
      '<p class="muted small" id="resultCount"></p><div class="grid g3" id="robotGrid">' + each(R, robotCard) + "</div>" +
      '<div class="card center" id="noResults" style="display:none"><h3>No exact matches</h3><p class="muted">Tell us what you need and we\'ll find it for you — free.</p><a class="btn btn-primary" href="get-quotes.html">Get matched with vendors</a></div></div></div></section>' +
      leadBand("Can't find the perfect robot?", "Our team and vendor network will source options for your exact application — free for buyers.");
  };

  P.robot = function () {
    var r = BY[slug]; if (!r) return P["404"]();
    var c = CAT[r.cat];
    var rows = '<tr><th>Manufacturer</th><td>' + E(r.maker) + '</td></tr><tr><th>Category</th><td><a href="../categories/' + c.slug + '.html">' + E(c.name) + "</a></td></tr><tr><th>Launched</th><td>" + r.year + "</td></tr><tr><th>Price</th><td>" + priceLabel(r) + "</td></tr><tr><th>Availability</th><td>" + E(r.status) + "</td></tr><tr><th>Origin</th><td>" + E(r.country) + "</td></tr>" +
      each(Object.keys(r.specs), function (k) { return "<tr><th>" + E(k) + "</th><td>" + E(r.specs[k]) + "</td></tr>"; });
    var media = r.video ? '<div class="video" data-yt="' + r.video + '" data-title="' + E(r.name) + ' video"></div>' : '<div class="robot-thumb" style="border-radius:16px;font-size:5rem">' + c.icon + "</div>";
    var sim = R.filter(function (x) { return x.cat === r.cat && x.slug !== r.slug; }).slice(0, 3);
    if (sim.length < 3) sim = sim.concat(R.filter(function (x) { return x.market === r.market && x.slug !== r.slug && sim.indexOf(x) < 0; }).slice(0, 3 - sim.length));
    var cmp = "../compare.html?ids=" + [r.slug].concat(sim.slice(0, 2).map(function (s) { return s.slug; })).join(",");
    var sc = { "@context": "https://schema.org", "@type": "Product", name: r.maker + " " + r.name, brand: { "@type": "Brand", name: r.maker }, description: r.summary, category: c.name, url: SITE + "/robots/" + r.slug + ".html" };
    if (r.video) sc.image = "https://i.ytimg.com/vi/" + r.video + "/hqdefault.jpg";
    if (r.price) sc.offers = { "@type": "Offer", priceCurrency: "USD", price: r.price, availability: r.status === "Available" ? "https://schema.org/InStock" : "https://schema.org/PreOrder" };
    schema(sc);
    var nm = E(r.maker) + " " + E(r.name);
    return '<section class="page-hero"><div class="container"><div class="breadcrumb"><a href="../index.html">Home</a> / <a href="../robots.html">Robots</a> / <a href="../categories/' + c.slug + '.html">' + E(c.name) + "</a> / " + E(r.name) + "</div>" +
      '<div class="robot-meta" style="margin-bottom:10px"><span class="badge ' + stCls(r.status) + '">' + E(r.status) + '</span><span class="badge">' + E(c.name) + "</span></div><h1>" + nm + "</h1><p>" + E(r.summary) + "</p></div></section>" +
      '<section><div class="container two-col"><div>' + media + adRaw("inArticle") +
      '<h2>Specifications</h2><div class="table-wrap"><table class="spec-table">' + rows + "</table></div>" +
      '<p class="small muted" style="margin-top:8px">Specs and pricing are approximate, compiled from public manufacturer information. Confirm with the vendor before purchase. <a href="../contact.html?topic=correction&robot=' + r.slug + '">Suggest a correction</a>.</p>' +
      "<h2>Who is the " + E(r.name) + " for?</h2><p>The " + E(r.name) + " from " + E(r.maker) + " is a " + E(c.name.toLowerCase()) + " option aimed primarily at <b>" + MARKET[r.market] + "</b>. " + E(c.desc) + "</p>" +
      '<div class="callout"><b>Comparing options?</b> See how it stacks up: <a href="' + cmp + '">compare ' + E(r.name) + " with similar robots →</a></div>" +
      '<h2>Similar robots</h2><div class="grid g3">' + each(sim, robotCard) + "</div></div>" +
      '<aside class="sticky"><div class="form-card" id="quote"><h3>' + (r.price ? "Get the best price" : "Get a price quote") + '</h3><p class="muted small">Free, no-obligation quotes from ' + E(r.maker) + " partners and alternative vendors.</p>" +
      '<form class="rf-form" data-form="Robot quote — ' + nm + '" data-success="Request received! Vendors typically respond within 1 business day.">' + HP + '<input type="hidden" name="robot" value="' + nm + '">' +
      f("name", "Full name", " required") + f("email", "Email", ' type="email" required') + f("company", "Company / school (optional)") +
      row2(sel("quantity", ["Qty: 1", "2–5", "6–20", "20+"]), sel("timeline", ["Timeline: 0–3 mo", "3–6 months", "6–12 months", "Just researching"])) +
      '<div class="field"><textarea name="message" rows="3" placeholder="What will you use it for?"></textarea></div>' +
      '<label class="small" style="display:flex;gap:8px"><input type="checkbox" name="consent" value="yes" required> I agree to be contacted by up to 3 matched vendors.</label>' +
      '<button class="btn btn-grad btn-block" type="submit" style="margin-top:12px">Get my free quote</button></form></div>' +
      '<div class="card" style="margin-top:16px">' + (r.amz ? '<a class="btn btn-accent btn-block" data-amz="' + E(r.amz) + '" href="#">Check price on Amazon</a>' : "") +
      '<a class="btn btn-ghost btn-block" href="' + r.url + '" target="_blank" rel="noopener nofollow" style="margin-top:8px">Official ' + E(r.maker) + " site ↗</a>" +
      '<label class="cmp-toggle" style="margin:12px 0 0"><input type="checkbox" class="cmp-cb" value="' + r.slug + '"> Add to compare</label></div>' + adRaw("sidebar", "sidebar") + "</aside></div></section>";
  };

  P.categories = function () {
    return hero("Robot Categories", "Every type of robot, organised the way buyers actually search.", ["Categories"]) + '<section><div class="container"><div class="grid g3">' + each(D.cats, function (c) { return catCard(c, true); }) + "</div></div></section>" + leadBand();
  };
  P.category = function () {
    var c = CAT[slug]; if (!c) return P["404"]();
    var items = R.filter(function (r) { return r.cat === c.slug; }), vids = D.videos.filter(function (v) { return v.cat === c.slug; }).slice(0, 3);
    var grid = items.length ? each(items, robotCard) : '<div class="card"><h3>New listings coming soon</h3><p class="muted">Are you a maker in this category? <a href="../list-your-robot.html">List your robot free</a>.</p></div>';
    return hero(c.icon + " " + E(c.name), E(c.desc) + " Compare " + items.length + " models, prices and specs, or get free quotes.", ['<a href="../categories.html">Categories</a>', E(c.name)]) + ad("leaderboard") +
      '<section><div class="container"><div class="grid g3">' + grid + "</div>" + (vids.length ? '<h2 style="margin-top:40px">Videos</h2><div class="grid g3">' + each(vids, videoTile) + "</div>" : "") + "</div></section>" +
      leadBand("Need a " + E(c.name.toLowerCase().replace(/s$/, "")) + " recommendation?", "Share your use case and budget — we'll match you with up to 3 vendors for free.");
  };

  P.compare = function () {
    var sorted = R.slice().sort(function (a, c) { return a.maker.localeCompare(c.maker); });
    var o = each(sorted, function (r) { return '<option value="' + r.slug + '">' + E(r.maker) + " " + E(r.name) + "</option>"; });
    var sels = ""; for (var i = 1; i <= 4; i++) sels += '<select class="cmp-sel" aria-label="Robot ' + i + '"><option value="">+ Add robot ' + i + "</option>" + o + "</select>";
    var pop = [["unitree-g1", "figure-02", "agility-digit"], ["universal-robots-ur5e", "standard-bots-core", "fanuc-crx-10ia"], ["roborock-s8-maxv-ultra", "irobot-roomba-combo-j7"], ["unitree-go2", "boston-dynamics-spot"]];
    return hero("Compare Robots", "Put up to 4 robots side by side on price, availability and specifications.", ["Compare"]) +
      '<section><div class="container"><div class="grid g4" style="margin-bottom:18px">' + sels + '</div><div class="chips" style="margin-bottom:22px"><span class="muted small" style="align-self:center">Popular:</span>' +
      each(pop, function (p) { return '<a class="chip" href="compare.html?ids=' + p.join(",") + '">' + p.map(function (s) { return BY[s].name; }).join(" vs ") + "</a>"; }) +
      '</div><div id="cmpOut"></div></div></section>' + ad("footer") + leadBand();
  };

  P.quotes = function () {
    var catopts = each(D.cats, function (c) { return "<option>" + E(c.name) + "</option>"; }) + "<option>Not sure — recommend one</option>";
    schema({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: D.faq.map(function (x) { return { "@type": "Question", name: x.q, acceptedAnswer: { "@type": "Answer", text: x.a } }; }) });
    var step = function (n, h, inner) { return '<div class="step' + (n === 1 ? " active" : "") + '" data-step="' + n + '"><h3>' + h + "</h3>" + inner + "</div>"; };
    var lab = function (l, inner) { return inner.replace('<div class="field">', '<div class="field"><label class="f">' + l + "</label>"); };
    return '<section class="hero" style="padding:56px 0 30px"><div class="container two-col" style="position:relative;z-index:1"><div>' +
      '<span class="eyebrow"><span class="dot"></span> Free robot sourcing service</span><h1>Get up to 3 robot quotes in <span class="grad-text">60 seconds</span>.</h1>' +
      '<p class="lead">Tell us about your project. We match you with vetted manufacturers, distributors and integrators — including leasing and Robots-as-a-Service — so vendors compete for your business.</p>' +
      '<div class="form-card" style="margin-top:22px"><div class="wizard-progress"><span id="wizBar"></span></div><div class="small muted" id="wizLbl">Step 1 of 7</div>' +
      '<form class="rf-form" id="wizard" data-form="RFQ — Multi-vendor quote request" data-success="🎉 Request received! Your matched vendors will reach out within ~1 business day. Check your inbox for a confirmation.">' + HP +
      step(1, "Who is this robot for?", opts("buyer_type", [["🏠", "Home / personal"], ["🏢", "Business / industrial"], ["🎓", "School / education"], ["🔬", "Research / university"], ["🏥", "Healthcare / hospitality"], ["🏛️", "Government / public sector"]])) +
      step(2, "What kind of robot do you need?", '<div class="field"><select name="category" required><option value="">Choose a category…</option>' + catopts + "</select></div>" + lab("Main application", f("application", "e.g. palletizing boxes, cleaning a 2,000 m² floor, teaching coding…", " required"))) +
      step(3, "Scale &amp; environment", row2(lab("Units needed", sel("units", ["1", "2–5", "6–20", "21–100", "100+"])), lab("Sites / locations", sel("sites", ["1", "2–5", "6+"]))) + row2(lab("Payload (if known)", f("payload", "e.g. 15 kg")), lab("Shifts per day", sel("shifts", ["N/A", "1", "2", "3 / 24-7"])))) +
      step(4, "What's your budget?", opts("budget", [["💵", "Under $5,000"], ["💰", "$5,000 – $25,000"], ["🏦", "$25,000 – $100,000"], ["🚀", "$100,000 – $500,000"], ["🏗️", "$500,000+"], ["🔁", "RaaS / monthly lease"]])) +
      step(5, "When do you plan to buy?", opts("timeline", [["⚡", "Immediately (0–3 months)"], ["📅", "3–6 months"], ["🗓️", "6–12 months"], ["🔍", "12+ months / researching"]]) + lab("Your role in the decision", sel("role", ["Decision maker", "Influencer / evaluator", "Researching for someone else", "Student / personal"]))) +
      step(6, "About your organization", row2(lab("Company / school", f("company", "Organization name")), lab("Industry", sel("industry", ["Manufacturing", "Logistics / warehousing", "Retail / e-commerce", "Food &amp; beverage", "Healthcare", "Hospitality", "Agriculture", "Construction", "Energy / utilities", "Education", "Other"]))) + row2(lab("Company size", sel("company_size", ["Just me", "2–50", "51–250", "251–1,000", "1,000+"])), lab("Country / region", f("country", "e.g. USA — Texas", " required")))) +
      step(7, "Where should we send your quotes?", row2(f("name", "Full name", " required"), f("job_title", "Job title")) + row2(f("email", "Email address", ' type="email" required'), f("phone", "Phone (for faster quotes)", ' type="tel"')) +
        '<div class="field"><textarea name="details" rows="3" placeholder="Anything else vendors should know? (current process, constraints, preferred brands)"></textarea></div>' +
        '<label class="small" style="display:flex;gap:8px;margin-bottom:6px"><input type="checkbox" name="consent" value="yes" required> I agree RobotFinder may share my request with up to 3 matched vendors.</label><label class="small" style="display:flex;gap:8px"><input type="checkbox" name="newsletter" value="yes" checked> Send me the weekly RobotFinder Brief.</label>') +
      '<input type="hidden" name="lead_score" id="leadScore"><div class="wizard-nav"><button type="button" class="btn btn-ghost" id="wizBack" style="visibility:hidden">← Back</button><button type="button" class="btn btn-primary" id="wizNext">Continue →</button><button type="submit" class="btn btn-grad" id="wizSubmit" style="display:none">Get my free quotes</button></div></form></div>' +
      '<div class="trust"><span>🔒 Your data is never sold publicly</span><span>✓ 100% free for buyers</span><span>⏱ Avg. response ~1 business day</span></div></div>' +
      '<aside class="sticky"><div class="card"><h3>How it works</h3><ol class="muted" style="padding-left:18px"><li><b>Describe your project</b> — 7 quick steps.</li><li><b>We match</b> you with up to 3 vetted vendors or integrators.</li><li><b>Compare quotes</b> and choose — no obligation.</li></ol></div>' +
      '<div class="card" style="margin-top:16px"><h3>Why buyers use RobotFinder</h3><ul class="list-check small"><li>Independent — we don\'t manufacture robots</li><li>Purchase, lease &amp; RaaS options</li><li>Consumer to industrial, one place</li><li>Expert help choosing the right category</li></ul></div>' +
      '<div class="card" style="margin-top:16px"><h3>Prefer to talk?</h3><p class="muted small">Book a free 15-minute robot sourcing call.</p><a class="btn btn-ghost btn-block" href="contact.html?topic=sourcing-call">Request a call</a> <a class="btn btn-ghost btn-block" style="margin-top:8px" href="#" data-mail="Robot sourcing inquiry">Email our team</a></div></aside></div></section>' +
      '<section class="alt"><div class="container"><h2 class="center">Quote request FAQ</h2><div style="max-width:800px;margin:20px auto 0">' + faqs(D.faq.map(function (x) { return [x.q, E(x.a)]; })) + "</div></div></section>" +
      '<section><div class="container grid g3"><div class="card"><h3>🧮 Not sure about ROI?</h3><p class="muted">Model payback before you talk to vendors.</p><a href="roi-calculator.html">Open ROI calculator →</a></div>' +
      '<div class="card"><h3>📘 Robot price guide</h3><p class="muted">Realistic price ranges by category.</p><a href="guides/how-much-does-a-robot-cost.html">Read the guide →</a></div>' +
      '<div class="card"><h3>🏭 Are you a vendor?</h3><p class="muted">Receive pre-qualified buyer requests.</p><a href="advertise.html#leads">Join the lead program →</a></div></div></section>';
  };

  P.roi = function () {
    var n = function (l, id, v, ex) { return '<div class="field"><label class="f" for="' + id + '">' + l + '</label><input type="number" id="' + id + '" value="' + v + '" min="0"' + (ex || "") + "></div>"; };
    return hero("Robot ROI &amp; Payback Calculator", "Estimate payback period, 3-year ROI and 5-year net savings for a cobot, AMR, cleaning robot or any automation project.", ["ROI Calculator"]) +
      '<section><div class="container two-col"><div class="form-card"><h3>Your project</h3>' +
      row2(n("Robot hardware cost ($)", "rCost", 37000), n("Tooling + integration ($)", "rInt", 25000)) + row2(n("Annual maintenance/software ($)", "rMaint", 4000), n("Loaded labor cost ($/hour)", "rWage", 28, ' step="0.5"')) +
      row2(n("Operators replaced / redeployed per shift", "rOps", 1, ' step="0.25"'), n("Shifts per day", "rShifts", 2, ' max="3"')) + row2(n("Hours per shift", "rHours", 8, ' max="12"'), n("Working days per year", "rDays", 250, ' max="365"')) +
      '<div class="field"><label class="f" for="rGain">Extra gains from throughput / quality (%) — <span id="rGainLbl">10</span>%</label><input type="range" id="rGain" min="0" max="50" value="10"></div></div>' +
      '<aside class="sticky"><div class="result-box"><div class="muted small">Payback period</div><div class="kpi" id="oPayback">—</div><div class="grid g2" style="margin-top:12px">' +
      '<div><div class="muted small">Annual net savings</div><b id="oAnnual">—</b></div><div><div class="muted small">3-year ROI</div><b id="oRoi">—</b></div><div><div class="muted small">Total investment</div><b id="oInvest">—</b></div><div><div class="muted small">5-year net savings</div><b id="oFive">—</b></div></div></div>' +
      '<div class="form-card" style="margin-top:16px"><h3>Get a vendor-validated ROI report</h3><p class="muted small">We\'ll send your numbers to up to 3 vendors who will validate them with real quotes.</p>' +
      '<form class="rf-form" id="roiForm" data-form="ROI report request" data-success="Got it! Your ROI report request is on its way to matched vendors.">' + HP + '<input type="hidden" name="roi_summary" id="roiSummary">' +
      f("name", "Name", " required") + f("email", "Work email", ' type="email" required') + f("application", "Application (e.g. machine tending)") + '<button class="btn btn-grad btn-block" type="submit">Send my ROI report</button></form></div></aside></div></section>' +
      '<section><div class="container article"><h2>How this calculator works</h2><p>Annual savings = operators × shifts × hours × days × labor rate, increased by your throughput/quality gain, minus annual maintenance. Payback = total investment ÷ monthly net savings. It\'s a planning estimate — vendor quotes and a site assessment will refine it. Read the full method in our <a href="guides/robot-roi-payback.html">ROI guide</a>.</p></div></section>' + ad("footer");
  };

  P.videos = function () {
    var used = []; D.videos.forEach(function (v) { if (used.indexOf(v.cat) < 0) used.push(v.cat); });
    schema({ "@context": "https://schema.org", "@type": "ItemList", itemListElement: D.videos.map(function (v, i) { return { "@type": "VideoObject", position: i + 1, name: v.title, thumbnailUrl: "https://i.ytimg.com/vi/" + v.id + "/hqdefault.jpg", embedUrl: "https://www.youtube-nocookie.com/embed/" + v.id }; }) });
    return hero("Robot Video Hub", "The best robot demos, launches and deep-dives — curated from the world's leading robot makers.", ["Videos"]) +
      '<section><div class="container"><div class="chips" style="margin-bottom:20px"><button class="chip on" data-vf="all">All</button>' + each(used, function (c) { return '<button class="chip" data-vf="' + c + '">' + E(CAT[c].name) + "</button>"; }) + "</div>" +
      '<div class="grid g3" id="videoGrid">' + each(D.videos, videoTile) + "</div>" + adRaw("inArticle") +
      '<div class="grid g2" style="margin-top:20px"><div class="card"><h3>▶ Subscribe on YouTube</h3><p class="muted">Weekly robot news, reviews and “Robot of the Week”.</p><a class="btn btn-primary" id="ytSub" href="#" target="_blank" rel="noopener">Subscribe</a></div>' +
      '<div class="card"><h3>🎬 Get your robot reviewed</h3><p class="muted">Makers: book a sponsored video review or a feature in our weekly roundup.</p><a class="btn btn-ghost" href="advertise.html#video">Video sponsorship</a></div></div></div></section>' +
      '<section class="alt"><div class="container grid g2" style="align-items:start"><div><h2>Submit a robot video</h2><p class="muted">Built something amazing or spotted a great demo? Send it in — the best submissions are featured and entered into our monthly Video Challenge.</p></div>' +
      formCard("Video submission", "Thanks! Our editors review every submission.", row2(f("name", "Your name", " required"), f("email", "Email", ' type="email" required')) + f("video_url", "YouTube / video URL", ' type="url" required') + '<div class="field"><textarea name="about" rows="3" placeholder="What\'s in the video?"></textarea></div><button class="btn btn-primary" type="submit">Submit video</button>') + "</div></section>";
  };

  P.guides = function () {
    return hero("Robot Buying Guides", "Independent, practical guides to choosing, budgeting and deploying robots.", ["Guides"]) + '<section><div class="container"><div class="grid g3">' + each(D.guides, guideCard) + "</div></div></section>" + ad("footer") + leadBand();
  };
  P.guide = function () {
    var g = D.guides.filter(function (x) { return x.slug === slug; })[0]; if (!g) return P["404"]();
    schema({ "@context": "https://schema.org", "@type": "Article", headline: g.title, description: g.desc, author: { "@type": "Organization", name: "RobotFinder" }, publisher: { "@type": "Organization", name: "RobotFinder" }, datePublished: "2026-09-22" });
    return '<section class="page-hero"><div class="container article" style="max-width:900px"><div class="breadcrumb"><a href="../index.html">Home</a> / <a href="../guides.html">Guides</a> / ' + E(g.cat) + "</div><h1>" + E(g.title) + "</h1><p>" + E(g.desc) + '</p><div class="muted small">By the RobotFinder Editorial Team · ' + g.mins + " min read · Updated 2026</div></div></section>" +
      '<section><div class="container two-col"><article class="article" style="margin:0">' + g.body + adRaw("inArticle") +
      '<div class="form-card" style="margin-top:24px"><h3>Get the weekly RobotFinder Brief</h3><p class="muted small">New robots, price drops and buying tips — every week.</p><form class="rf-form row2" data-form="Newsletter signup (guide)">' + HP + '<input type="email" name="email" placeholder="Your email" required><button class="btn btn-primary" type="submit">Subscribe</button></form></div></article>' +
      '<aside class="sticky"><div class="form-card"><h3>Need quotes?</h3><p class="muted small">Get up to 3 competing quotes, free.</p><a class="btn btn-grad btn-block" href="../get-quotes.html">Start free quote</a></div>' +
      '<div class="card" style="margin-top:16px"><h3>More guides</h3><ul class="small" style="padding-left:18px">' + each(D.guides.filter(function (o) { return o.slug !== g.slug; }), function (o) { return '<li><a href="' + o.slug + '.html">' + E(o.title) + "</a></li>"; }) + "</ul></div>" + adRaw("sidebar", "sidebar") + "</aside></div></section>";
  };

  P.jobs = function () {
    var roles = [["Robotics Content Writer / Reviewer", "Freelance · Remote", "Write buying guides, robot reviews and comparisons."], ["YouTube Video Editor & Host", "Freelance · Remote", "Produce Robot of the Week, reviews and shorts."], ["Partnerships & Vendor Sales", "Commission · Remote", "Sign robot makers to listings, sponsorships and lead programs."], ["Robotics Data Researcher", "Part-time · Remote", "Maintain specs, prices and new-robot launches in our database."], ["Community & Contest Manager", "Part-time · Remote", "Run our video, build and idea challenges and judge panels."], ["Front-end Developer (JS)", "Contract · Remote", "Ship new directory, compare and lead-gen features."]];
    var ext = [["LinkedIn — robotics engineer jobs", "https://www.linkedin.com/jobs/search/?keywords=robotics%20engineer"], ["Indeed — robotics jobs", "https://www.indeed.com/q-robotics-jobs.html"], ["Wellfound — robotics startups", "https://wellfound.com/role/robotics-engineer"], ["A3 Career Center", "https://www.automate.org/"]];
    return hero("Robotics Jobs &amp; Talent", "Hire robotics talent, join the RobotFinder team, or get discovered by robotics employers.", ["Jobs &amp; Talent"]) +
      '<section><div class="container"><div class="section-head"><div><h2>We\'re hiring — join RobotFinder</h2><p>Help build the world\'s most useful robot search engine.</p></div></div><div class="grid g3">' +
      each(roles, function (x) { return '<div class="card reveal"><span class="badge ok">Hiring</span><h3 style="margin:10px 0 4px">' + E(x[0]) + '</h3><div class="muted small">' + x[1] + '</div><p class="small" style="margin-top:8px">' + x[2] + '</p><a href="#apply" class="small" data-role="' + E(x[0]) + '">Apply →</a></div>'; }) + "</div></div></section>" +
      '<section class="alt" id="apply"><div class="container grid g2" style="align-items:start"><div><h2>Apply / join our talent network</h2><p class="muted">Roboticists, engineers, technicians, writers, creators — join the talent pool. We share candidates with hiring partners (with your permission) and hire for our own team.</p><h3 style="margin-top:24px">Browse more robotics jobs</h3><ul>' +
      each(ext, function (x) { return '<li><a href="' + x[1] + '" target="_blank" rel="noopener nofollow">' + x[0] + " ↗</a></li>"; }) + "</ul></div>" +
      formCard("Talent application", "Thanks! Your profile is in our talent network.", row2(f("name", "Full name", " required"), f("email", "Email", ' type="email" required')) +
        sel("role", ["Talent network (any role)"].concat(roles.map(function (x) { return E(x[0]); }), ["Robotics engineer", "Field service technician", "Robot integrator / PLC", "AI / ML (robotics)"]), "roleSel") +
        row2(f("location", "Location / time zone"), sel("experience", ["0–2 years", "3–5 years", "6–10 years", "10+ years"])) + f("portfolio", "LinkedIn / portfolio / GitHub URL", ' type="url"') +
        '<div class="field"><textarea name="about" rows="3" placeholder="Tell us about your skills"></textarea></div><button class="btn btn-primary" type="submit">Submit application</button>') + "</div></section>" +
      '<section id="post"><div class="container grid g2" style="align-items:start"><div><h2>Employers: post a robotics job</h2><p class="muted">Reach engineers, technicians and robotics enthusiasts who visit RobotFinder every day.</p>' +
      '<div class="grid g2"><div class="card tier"><b>Standard</b><div class="amt">$99</div><span class="muted small">30-day listing + newsletter mention</span></div><div class="card tier featured"><b>Featured</b><div class="amt">$249</div><span class="muted small">Top placement, logo, social push, 60 days</span></div></div></div>' +
      formCard("Job posting request", "Thanks! We'll confirm your listing and send an invoice.", row2(f("company", "Company", " required"), f("email", "Email", ' type="email" required')) + row2(f("job_title", "Job title", " required"), f("location", "Location / remote")) +
        row2(f("salary", "Salary range"), sel("package", ["Standard — $99", "Featured — $249"])) + f("apply_url", "Application URL", ' type="url"') + '<button class="btn btn-primary" type="submit">Submit job</button>') + "</div></section>";
  };

  P.contests = function () {
    var cs = [["🎬", "Robot Video Challenge", "Monthly", "Film your robot doing something useful, funny or impressive. Top 3 featured on our homepage and YouTube.", "$500 prize pool + featured placement", "Rolling / monthly"], ["🛠️", "Student Build Challenge", "Each semester", "Students and teams build a robot that solves a real problem at home or school. Judged on impact, creativity and documentation.", "$2,500 in prizes + robot kits", "2027-01-31"], ["💡", "Robot Idea Prize", "Quarterly", "Pitch the robot the world needs next. No hardware required — just a great idea and a one-page concept.", "$1,000 grand prize", "2026-12-15"], ["📸", "Robot Photo of the Month", "Monthly", "Share the best robot photo you've taken — at work, at home or at an event.", "Gift cards + social feature", "Rolling / monthly"]];
    var ext = [["FIRST Robotics (FLL, FTC, FRC)", "https://www.firstinspires.org/", "K–12 team competitions worldwide"], ["VEX Robotics Competition", "https://www.vexrobotics.com/competition", "Middle school to university"], ["RoboCup", "https://www.robocup.org/", "International robot soccer & rescue"], ["World Robot Olympiad", "https://wro-association.org/", "Global youth robotics olympiad"], ["XPRIZE", "https://www.xprize.org/", "Large incentive prizes for breakthroughs"]];
    return hero("Robot Contests &amp; Prizes", "Compete, get featured and win. Prize pools are funded by sponsors and community supporters.", ["Contests"]) +
      '<section><div class="container"><div class="card" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:18px;margin-bottom:24px"><div><span class="badge hot">Next deadline</span><h3 style="margin:8px 0 0">Robot Idea Prize — closes Dec 15, 2026</h3></div><div class="countdown" id="countdown" data-deadline="2026-12-15T23:59:59"></div></div>' +
      '<div class="grid g2">' + each(cs, function (x) { return '<div class="card tier reveal"><span class="cat-ico">' + x[0] + '</span><h3 style="margin:10px 0 0">' + x[1] + '</h3><span class="badge">' + x[2] + '</span><p class="muted">' + E(x[3]) + "</p><div><b>Prize:</b> " + x[4] + '</div><div class="small muted">Deadline: ' + x[5] + '</div><a class="btn btn-primary btn-sm" href="#enter" data-contest="' + x[1] + '">Enter now</a></div>'; }) + "</div>" +
      '<p class="small muted" style="margin-top:14px">Prize amounts are funded by sponsors and supporters and confirmed in each contest\'s official rules. <a href="terms.html#contests">Official rules</a>.</p></div></section>' +
      '<section class="alt" id="enter"><div class="container grid g2" style="align-items:start"><div><h2>Enter a contest</h2><p class="muted">One form for every challenge. Entrants must be 13+ (under 18 with parental consent). Free to enter.</p>' +
      '<h3 style="margin-top:24px">Sponsor a prize</h3><p class="muted">Put your brand in front of builders, students and buyers. Sponsors get logo placement, a winners\' feature and social promotion.</p><a class="btn btn-ghost" href="advertise.html#contest">Become a contest sponsor</a> <a class="btn btn-accent" href="donate.html?fund=prizes">Donate to the prize pool</a></div>' +
      formCard("Contest entry", "You're entered! Watch your inbox for confirmation and judging updates.", sel("contest", cs.map(function (x) { return x[1]; }), "contestSel") + row2(f("name", "Name / team name", " required"), f("email", "Email", ' type="email" required')) +
        row2(f("country", "Country"), sel("category", ["Individual", "Student team", "School / club", "Company"])) + f("entry_url", "Link to video / photos / docs", ' type="url"') +
        '<div class="field"><textarea name="description" rows="3" placeholder="Describe your entry" required></textarea></div><label class="small" style="display:flex;gap:8px"><input type="checkbox" required> I accept the official contest rules.</label><button class="btn btn-grad btn-block" type="submit" style="margin-top:12px">Submit entry</button>') + "</div></section>" +
      '<section><div class="container"><h2>Major robotics competitions worldwide</h2><div class="grid g3" style="margin-top:16px">' + each(ext, function (x) { return '<div class="card"><h3 style="font-size:1rem">' + x[0] + '</h3><p class="muted small">' + E(x[2]) + '</p><a href="' + x[1] + '" target="_blank" rel="noopener nofollow" class="small">Visit ↗</a></div>'; }) + "</div></div></section>";
  };

  P.events = function () {
    var ev = [["CES", "January", "Las Vegas, USA", "Consumer tech — home, companion and mobility robots", "https://www.ces.tech/"], ["Hannover Messe", "April", "Hannover, Germany", "Industrial automation & robotics", "https://www.hannovermesse.de/"], ["Robotics Summit & Expo", "Spring", "Boston, USA", "Commercial robot development", "https://www.roboticssummit.com/"], ["Automate (A3)", "Spring", "North America", "The largest automation show in North America", "https://www.automateshow.com/"], ["ICRA (IEEE)", "May / June", "Rotates globally", "Top academic robotics conference", "https://www.ieee-ras.org/conferences-workshops/fully-sponsored/icra"], ["automatica", "June", "Munich, Germany", "Smart automation & robotics", "https://automatica-munich.com/"], ["World Robot Conference", "August", "Beijing, China", "Humanoids and China's robot ecosystem", "https://www.worldrobotconference.com/"], ["IROS (IEEE/RSJ)", "October", "Rotates globally", "Intelligent robots & systems research", "https://www.ieee-ras.org/conferences-workshops/financially-co-sponsored/iros"], ["RoboBusiness", "October", "Santa Clara, USA", "Business of commercial robotics", "https://www.robobusiness.com/"], ["iREX", "Biennial (Nov/Dec)", "Tokyo, Japan", "International Robot Exhibition", "https://biz.nikkan.co.jp/eve/irex/english/"]];
    return hero("Robotics Events Calendar", "Trade shows, conferences and expos where the robotics industry meets.", ["Events"]) +
      '<section><div class="container"><div class="table-wrap"><table><tr><th>Event</th><th>Typical month</th><th>Location</th><th></th></tr>' + each(ev, function (x) { return "<tr><td><b>" + x[0] + '</b><div class="small muted">' + E(x[3]) + "</div></td><td>" + x[1] + "</td><td>" + x[2] + '</td><td><a href="' + x[4] + '" target="_blank" rel="noopener nofollow">Website ↗</a></td></tr>'; }) + "</table></div>" +
      '<p class="small muted" style="margin-top:8px">Dates vary each year — check the official website for exact dates and registration.</p></div></section>' + ad("leaderboard") +
      '<section class="alt" id="submit"><div class="container grid g2" style="align-items:start"><div><h2>Submit your event</h2><p class="muted">Organizing a robotics meetup, webinar, demo day or trade show? Get it in front of our audience. Free listings, plus featured and newsletter promotion options.</p></div>' +
      formCard("Event submission", "Thanks! We'll review and publish your event.", row2(f("event_name", "Event name", " required"), f("email", "Organizer email", ' type="email" required')) + row2(f("date", "Date", ' type="date" required'), f("location", "City / online")) + f("url", "Event website", ' type="url"') +
        sel("promotion", ["Free listing", "Featured listing ($149)", "Featured + newsletter ($349)"]) + '<button class="btn btn-primary" type="submit">Submit event</button>') + "</div></section>";
  };

  P.advertise = function () {
    var pk = [["Featured Listing", "$199/mo", ["Top placement in category + search", "“Featured” badge & logo", "Direct quote button", "Monthly performance report"], 0, "featured"], ["Category Sponsor", "$599/mo", ["Exclusive banner on one category", "Sponsored guide mention", "3 featured listings", "Newsletter logo"], 1, "category"], ["Newsletter Sponsor", "$299/issue", ["Top slot in the weekly Brief", "150-word native ad + link", "Click reporting"], 0, "newsletter"], ["Sponsored Video Review", "$1,500", ["Dedicated YouTube review", "Embedded on your robot page", "Shorts cut-downs", "Usage rights"], 0, "video"]];
    return hero("Advertise, Sponsor &amp; Buy Leads", "Reach high-intent robot buyers — homeowners, schools, researchers and industrial decision-makers.", ["Advertise"]) +
      '<section><div class="container"><div class="grid g4">' + each(pk, function (x) { return '<div class="card tier' + (x[3] ? " featured" : "") + '" id="' + x[4] + '">' + (x[3] ? '<span class="badge hot ribbon">Most popular</span>' : "") + "<h3>" + x[0] + '</h3><div class="amt">' + x[1] + "</div><ul>" + each(x[2], function (l) { return "<li>" + E(l) + "</li>"; }) + '</ul><a class="btn ' + (x[3] ? "btn-grad" : "btn-ghost") + ' btn-block" href="#adform" data-pkg="' + x[0] + '">Choose</a></div>'; }) + "</div></div></section>" +
      '<section class="alt" id="leads"><div class="container grid g2" style="align-items:center"><div><span class="badge ok">Performance</span><h2 style="margin-top:10px">Pay-per-lead RFQ program</h2><p class="muted">Receive buyer requests that match your categories, regions and deal size. Every lead is qualified on budget, timeline, application and decision role — you only pay for leads you accept.</p>' +
      '<ul class="list-check"><li>Exclusive or shared (max 3 vendors) leads</li><li>Filters by category, region, budget and industry</li><li>Instant email delivery</li><li>Credit for invalid leads</li></ul></div>' +
      '<div class="card" id="contest"><h3>🏆 Contest &amp; event sponsorship</h3><p class="muted">Fund a prize pool for our Video, Build or Idea challenges. Includes logo on contest pages, winner features and social promotion.</p><h3 style="margin-top:18px">🤝 Partnerships</h3><p class="muted">Affiliate programs, data partnerships, co-branded reports and webinars.</p></div></div></section>' +
      '<section id="adform"><div class="container grid g2" style="align-items:start"><div><h2>Tell us your goals</h2><p class="muted">We\'ll reply with a media kit, audience stats and a custom proposal within 1 business day.</p></div>' +
      formCard("Advertising inquiry", "Thanks! Our partnerships team will send a proposal shortly.", row2(f("name", "Name", " required"), f("email", "Work email", ' type="email" required')) + row2(f("company", "Company", " required"), f("website", "Website", ' type="url"')) +
        sel("package", ["Featured Listing", "Category Sponsor", "Newsletter Sponsor", "Sponsored Video Review", "Pay-per-lead RFQ program", "Contest / event sponsorship", "Custom / partnership"], "pkgSel") +
        row2(sel("budget", ["Monthly budget: &lt;$500", "$500–$2,000", "$2,000–$10,000", "$10,000+"]), f("categories", "Target categories")) + '<div class="field"><textarea name="goals" rows="3" placeholder="Goals (awareness, leads, launches…)"></textarea></div><button class="btn btn-grad" type="submit">Request media kit</button>') + "</div></section>";
  };

  P.list = function () {
    return hero("List Your Robot — Free", "Get your robot in front of buyers actively searching. Free basic listings; upgrade anytime.", ["List your robot"]) +
      '<section><div class="container two-col">' + formCard("New robot listing / claim profile", "Thanks! Our editors will review and publish your listing within 3–5 business days.", "<h3>Robot &amp; company details</h3>" +
        row2(f("company", "Company / manufacturer", " required"), f("website", "Company website", ' type="url" required')) + row2(f("robot_name", "Robot / product name", " required"), sel("category", D.cats.map(function (c) { return E(c.name); }))) +
        row2(f("price", "Price (or 'quote')"), sel("availability", ["Available", "Pre-order", "Pilot", "Coming soon"])) + '<div class="field"><textarea name="specs" rows="4" placeholder="Key specs (payload, reach, runtime, speed, sensors, DoF…)"></textarea></div>' +
        f("media", "Link to images / video / spec sheet", ' type="url"') + row2(f("name", "Your name", " required"), f("email", "Work email", ' type="email" required')) +
        sel("listing_type", ["Free listing", "Claim an existing profile", "Featured listing ($199/mo)", "Join pay-per-lead program"]) + '<button class="btn btn-grad" type="submit">Submit listing</button>') +
      '<aside class="sticky"><div class="card"><h3>What you get</h3><ul class="list-check small"><li>SEO-optimized robot profile page</li><li>Direct quote requests from buyers</li><li>Inclusion in compare &amp; category pages</li><li>Eligible for “RobotFinder 50” awards</li></ul></div></aside></div></section>';
  };

  P.donate = function () {
    var tiers = [["Supporter", 5, ["Name on supporters wall", "Our thanks every month"], 0], ["Builder", 25, ["Everything in Supporter", "Early access to guides", "Contest voting rights"], 1], ["Sponsor", 100, ["Everything in Builder", "Logo/name on donor page", "Quarterly impact report"], 0], ["Patron", 500, ["Everything in Sponsor", "Name a contest prize", "Annual strategy call"], 0]];
    var funds = [["⚙️", "Operations", "Hosting, data research and keeping the directory accurate."], ["📣", "Promotions & marketing", "Growing the audience that makes robots easier to find."], ["🧑‍💻", "Hiring talent", "Writers, video creators, researchers and developers."], ["🏆", "Contests & prizes", "Prize pools for builders, students and creators."]];
    return hero("Support RobotFinder ♥", "RobotFinder is independent and reader-supported. Your donation keeps it free, funds new talent and powers our community prize pools.", ["Donate"]) +
      '<section><div class="container"><h2>Where your support goes</h2><div class="grid g4" style="margin-top:16px">' + each(funds, function (x) { return '<div class="card"><span class="cat-ico">' + x[0] + '</span><h3 style="margin-top:10px">' + E(x[1]) + '</h3><p class="muted small">' + x[2] + "</p></div>"; }) + "</div></div></section>" +
      '<section class="alt"><div class="container"><h2>Choose a monthly tier</h2><div class="grid g4" style="margin-top:16px">' + each(tiers, function (x) { return '<div class="card tier' + (x[3] ? " featured" : "") + '">' + (x[3] ? '<span class="badge hot ribbon">Popular</span>' : "") + "<h3>" + x[0] + '</h3><div class="amt">$' + x[1] + '<span class="small muted">/mo</span></div><ul>' + each(x[2], function (l) { return "<li>" + l + "</li>"; }) + '</ul><button class="btn ' + (x[3] ? "btn-grad" : "btn-ghost") + ' btn-block pick-amt" data-amt="' + x[1] + '">Choose $' + x[1] + "</button></div>"; }) + "</div></div></section>" +
      '<section><div class="container two-col"><form class="form-card rf-form" id="donateForm" data-form="Donation pledge" data-success="Thank you! We\'ve received your pledge and will send a secure payment link to your email shortly.">' + HP + "<h3>Make a donation</h3>" +
      '<div class="opt-grid" style="grid-template-columns:repeat(4,1fr)">' + each([10, 25, 50, 100, 250, 500, 1000], function (a) { return '<label class="opt"><input type="radio" name="amount" value="$' + a + '"' + (a === 25 ? " checked" : "") + '><span style="justify-content:center">$' + a + "</span></label>"; }) + '<label class="opt"><input type="radio" name="amount" value="custom"><span style="justify-content:center">Other</span></label></div>' +
      '<div class="field" id="customAmt" style="display:none"><input type="number" name="custom_amount" min="1" placeholder="Custom amount (USD)"></div>' +
      row2(sel("frequency", ["One-time", "Monthly", "Yearly"]), '<div class="field"><select name="fund" id="fundSel"><option value="general">Where it\'s needed most</option><option value="operations">Operations</option><option value="marketing">Promotions &amp; marketing</option><option value="hiring">Hiring talent</option><option value="prizes">Contests &amp; prizes</option></select></div>') +
      row2(f("name", "Full name", " required"), f("email", "Email (for receipt &amp; payment link)", ' type="email" required')) + f("dedication", "Message or dedication (optional)") +
      '<label class="small" style="display:flex;gap:8px"><input type="checkbox" name="public" value="yes" checked> List my name on the supporters wall</label><button class="btn btn-accent btn-block" type="submit" style="margin-top:12px">♥ Donate</button>' +
      '<div id="donateLinks" style="display:flex;flex-wrap:wrap;gap:8px;margin-top:12px"></div><p class="form-note">Secure payment is completed via our payment partner. Donations to RobotFinder are not tax-deductible.</p></form>' +
      '<aside class="sticky"><div class="card"><h3>Other ways to help</h3><ul class="list-check small"><li><a href="contests.html">Sponsor a contest prize</a></li><li><a href="jobs.html">Volunteer or join the team</a></li><li><a href="videos.html">Share our videos</a></li><li><a href="list-your-robot.html">Suggest a robot</a></li></ul></div>' +
      '<div class="card" style="margin-top:16px"><h3>Corporate giving</h3><p class="muted small">Companies can support RobotFinder as a founding sponsor.</p><a class="btn btn-ghost btn-block" href="advertise.html#adform">Become a founding sponsor</a></div></aside></div></section>';
  };

  P.contact = function () {
    return hero("Contact RobotFinder", "Questions, corrections, partnerships or press — we reply within 1 business day.", ["Contact"]) +
      '<section><div class="container two-col">' + formCard("Contact form", "Thanks! We'll get back to you within 1 business day.", row2(f("name", "Name", " required"), f("email", "Email", ' type="email" required')) +
        sel("topic", ["General question", "Robot sourcing call", "Correction / data update", "Partnership", "Press", "Domain / website acquisition"], "topicSel") + f("subject_line", "Subject") +
        '<div class="field"><textarea name="message" rows="6" placeholder="How can we help?" required></textarea></div><button class="btn btn-primary" type="submit">Send message</button>') +
      '<aside class="sticky"><div class="card"><h3>Other ways to reach us</h3><p class="muted small">Prefer email? <a href="#" data-mail="RobotFinder inquiry">Send us an email</a>.</p><p class="muted small">Buying a robot? The fastest route is the <a href="get-quotes.html">free quote form</a>.</p></div>' +
      '<div class="card" style="margin-top:16px"><h3>Interested in this domain?</h3><p class="muted small">RobotFinder.com may be available for acquisition or partnership.</p><a class="btn btn-ghost btn-block" href="https://web.works/contact" target="_blank" rel="noopener">Inquire at web.works</a></div></aside></div></section>';
  };

  P.about = function () {
    return hero("About RobotFinder", "The independent search engine for robots.", ["About"]) + '<section><div class="container article">' +
      "<p>Robots are arriving everywhere — in homes, classrooms, warehouses, hospitals and farms. Yet finding the right one is still hard: specs are scattered, prices are hidden behind “contact sales”, and categories change every month.</p>" +
      "<p><b>RobotFinder fixes that.</b> We organise the world's robots into one searchable, comparable directory, publish independent guides and videos, and connect serious buyers with vetted vendors — for free.</p>" +
      '<h2>What we do</h2><ul class="list-check"><li>Profile robots across ' + D.cats.length + " categories with standardised specs</li><li>Side-by-side comparisons and an ROI calculator</li><li>Free multi-vendor quote matching</li><li>Video hub, buying guides, events and community contests</li></ul>" +
      '<h2>How we make money</h2><p>We\'re free for readers. We earn from display advertising, affiliate links, sponsored listings (always labelled), and vendor lead programs. Editorial content is never for sale. See our <a href="disclosure.html">disclosure</a>.</p>' +
      '<h2>Work with us</h2><p><a href="jobs.html">Join the team</a>, <a href="advertise.html">advertise</a>, <a href="list-your-robot.html">list a robot</a> or <a href="donate.html">support us</a>.</p></div></section>';
  };

  function legal(t, c) { return hero(t, "", [t]) + '<section><div class="container article">' + c + "</div></section>"; }
  P.privacy = function () {
    return legal("Privacy Policy", '<p>Last updated: September 2026.</p><h2>What we collect</h2><p>Information you submit in forms (such as name, email, company and project details), and standard analytics data (pages viewed, device, approximate location) collected via cookies.</p>' +
      "<h2>How we use it</h2><p>To respond to inquiries, deliver newsletters you request, match quote requests with up to three vendors <b>only with your consent</b>, improve the site and show advertising.</p>" +
      '<h2>Advertising &amp; cookies</h2><p>We use Google AdSense. Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this and other websites. Google\'s use of advertising cookies enables it and its partners to serve ads based on your visits. You may opt out of personalised advertising at <a href="https://www.google.com/settings/ads" rel="noopener" target="_blank">Google Ads Settings</a> or <a href="https://www.aboutads.info" target="_blank" rel="noopener">aboutads.info</a>.</p>' +
      "<h2>Form processing</h2><p>Form submissions are delivered through a third-party form-to-email processor. We do not sell personal information.</p>" +
      '<h2>Your rights</h2><p>You can request access, correction or deletion of your data at any time via our <a href="contact.html">contact form</a>. Residents of the EU/UK (GDPR), California (CCPA/CPRA) and Canada (PIPEDA) have additional rights, which we honour.</p>');
  };
  P.terms = function () {
    return legal("Terms of Use", "<p>Last updated: September 2026.</p><h2>Use of the site</h2><p>RobotFinder provides information for general purposes. Specifications and prices are approximate and may change; verify with vendors before purchase.</p>" +
      "<h2>Quotes &amp; vendors</h2><p>RobotFinder is not a party to transactions between buyers and vendors and makes no warranty about third-party products or services.</p>" +
      '<h2 id="contests">Contest official rules (summary)</h2><p>No purchase necessary. Void where prohibited. Entrants must be 13+; entrants under 18 require parental consent. Entries must be original work. Judging criteria, prize values and timelines are published with each contest; prizes are funded by sponsors and supporters and may be substituted with equal value. Winners are notified by email and must respond within 14 days. By entering, entrants grant RobotFinder a non-exclusive license to feature their entry.</p>' +
      "<h2>Donations</h2><p>Donations support RobotFinder's operations, marketing, hiring and contest prizes. They are voluntary, not tax-deductible, and non-refundable except where required by law.</p>" +
      "<h2>Intellectual property</h2><p>Product names and trademarks belong to their respective owners. Videos are embedded from YouTube under YouTube's terms.</p>");
  };
  P.disclosure = function () {
    return legal("Affiliate &amp; Advertising Disclosure", "<p>RobotFinder is reader-supported. Some links are affiliate links (for example, Amazon Associates): if you buy through them we may earn a commission at no extra cost to you. As an Amazon Associate we earn from qualifying purchases.</p>" +
      "<p>Sponsored listings and sponsored content are always labelled “Featured” or “Sponsored”. Vendors in our quote program pay for leads; this never affects editorial rankings or guide recommendations.</p>");
  };
  P["404"] = function () {
    return '<section class="hero"><div class="container center" style="position:relative;z-index:1"><h1>404 — This robot wandered off.</h1><p class="lead" style="margin:0 auto 20px">The page you\'re looking for doesn\'t exist. Try searching the directory.</p><form class="search-xl global-search" style="margin:0 auto"><input placeholder="Search robots…"><button class="btn btn-primary">Search</button></form><p style="margin-top:20px"><a href="' + b + 'index.html">← Back home</a></p></div></section>';
  };

  /* ---------------- mount ---------------- */
  var app = document.getElementById("app");
  var html = (P[page] || P["404"])();
  var bar = document.querySelector(".domain-bar");
  var wrap = document.createElement("div");
  wrap.innerHTML = header();
  bar.parentNode.insertBefore(wrap.firstChild, bar.nextSibling);
  app.outerHTML = '<main id="main">' + html + "</main>";
  document.body.insertAdjacentHTML("beforeend", footer());
})();
