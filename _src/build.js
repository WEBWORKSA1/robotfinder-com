#!/usr/bin/env node
/* RobotFinder.com — regenerates page stubs, sitemap and SEO files from assets/js/site-data.js.
   Usage: node _src/build.js   (no dependencies). Pages are rendered in the browser by assets/js/render.js. */
const fs = require("fs"), path = require("path"), vm = require("vm");
const ROOT = path.join(__dirname, "..");
const SITE = "https://robotfinder.com";
const ctx = {}; ctx.window = ctx; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, "assets/js/site-data.js"), "utf8"), ctx);
const D = ctx.RF_DATA;
const E = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const pages = [];

function stub(file, page, title, desc, h1, slug) {
  const b = "../".repeat(file.split("/").length - 1);
  const canon = SITE + "/" + (file === "index.html" ? "" : file);
  const base404 = file === "404.html" ? '<script>document.write(\'<base href="\'+(location.hostname.endsWith("github.io")?"/"+location.pathname.split("/")[1]+"/":"/")+\'">\')</script>' : "";
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">${base404}<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${E(title)}</title><meta name="description" content="${E(desc)}"><link rel="canonical" href="${canon}">
<link rel="icon" href="${b}assets/img/favicon.svg"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap"><link rel="stylesheet" href="${b}assets/css/style.css"></head>
<body data-page="${page}"${slug ? ` data-slug="${slug}"` : ""} data-base="${b}"><div class="domain-bar"><a href="https://web.works/contact" target="_blank" rel="noopener">Contact, if you are interested in this website/domain name</a></div>
<div id="app"><noscript><h1>${E(h1)}</h1><p>${E(desc)}</p></noscript></div>
<script src="${b}assets/js/config.js"></script><script src="${b}assets/js/site-data.js"></script><script src="${b}assets/js/render.js"></script><script src="${b}assets/js/main.js"></script><script src="${b}assets/js/pages.js"></script></body></html>
`;
  const full = path.join(ROOT, file); fs.mkdirSync(path.dirname(full), { recursive: true }); fs.writeFileSync(full, html);
  if (file !== "404.html") pages.push(file);
}

const TOP = [
  ["index.html", "home", "RobotFinder — Find, Compare & Get Quotes on Robots", "The robot search engine: compare humanoids, cobots, robot vacuums, drones, STEM kits and industrial robots. Free quotes from vetted vendors.", "Find the right robot for any job"],
  ["robots.html", "directory", "Robot Directory — Search & Filter Every Robot | RobotFinder", "Search every robot by category, price and availability: humanoids, cobots, quadrupeds, vacuums, drones, STEM kits and more.", "Robot Directory"],
  ["categories.html", "categories", "All Robot Categories | RobotFinder", "Browse robots by category: humanoids, cobots, industrial arms, AMRs, vacuums, mowers, drones, STEM kits, medical and more.", "Robot Categories"],
  ["compare.html", "compare", "Compare Robots Side by Side | RobotFinder", "Compare robots head-to-head: price, specs, payload, runtime and availability for humanoids, cobots, vacuums and more.", "Compare Robots"],
  ["get-quotes.html", "quotes", "Get Free Robot Quotes from Up to 3 Vendors | RobotFinder", "Describe your robot project in 60 seconds and get competing quotes from vetted robot manufacturers, integrators and RaaS providers — free.", "Get up to 3 robot quotes"],
  ["roi-calculator.html", "roi", "Robot ROI & Payback Calculator (Free) | RobotFinder", "Free robot ROI calculator: estimate payback period, 3-year ROI and 5-year savings for cobots, AMRs and automation projects.", "Robot ROI Calculator"],
  ["videos.html", "videos", "Robot Videos — Humanoids, Robot Dogs, Cobots & More | RobotFinder", "Watch the best robot videos: Atlas, Spot, Unitree G1, Figure 02, Optimus, Digit, UR20 and more.", "Robot Video Hub"],
  ["guides.html", "guides", "Robot Buying Guides & Price Guides | RobotFinder", "Robot price guides, cobot vs industrial comparisons, humanoid buyer's guide, robot vacuum features, ROI and RaaS explained.", "Robot Buying Guides"],
  ["jobs.html", "jobs", "Robotics Jobs, Careers & Talent Network | RobotFinder", "Robotics jobs and talent: join the RobotFinder team, join our talent network, or post robotics jobs to reach engineers and technicians.", "Robotics Jobs & Talent"],
  ["contests.html", "contests", "Robot Contests, Challenges & Prizes | RobotFinder", "Enter the RobotFinder Video Challenge, Student Build Challenge and Robot Idea Prize, and discover major robotics competitions worldwide.", "Robot Contests & Prizes"],
  ["events.html", "events", "Robotics Events, Trade Shows & Conferences | RobotFinder", "Robotics events calendar: CES, Hannover Messe, Automate, ICRA, IROS, RoboBusiness, iREX and more. Submit your event.", "Robotics Events"],
  ["advertise.html", "advertise", "Advertise on RobotFinder — Sponsorships & Robot Buyer Leads", "Featured listings, category sponsorships, newsletter ads, video reviews and pay-per-lead programs for robot makers and integrators.", "Advertise on RobotFinder"],
  ["list-your-robot.html", "list", "List Your Robot on RobotFinder (Free) | For Manufacturers", "Robot makers and integrators: list your robot free, claim your profile and receive quote requests from qualified buyers.", "List Your Robot"],
  ["donate.html", "donate", "Donate & Support RobotFinder", "Support independent robot research: donations fund operations, marketing, new talent and contest prize pools.", "Support RobotFinder"],
  ["contact.html", "contact", "Contact RobotFinder", "Contact the RobotFinder team for questions, corrections, partnerships and press.", "Contact RobotFinder"],
  ["about.html", "about", "About RobotFinder", "RobotFinder is the independent search engine for robots: directory, comparisons, guides, videos and free vendor quotes.", "About RobotFinder"],
  ["privacy.html", "privacy", "Privacy Policy | RobotFinder", "RobotFinder privacy policy.", "Privacy Policy"],
  ["terms.html", "terms", "Terms of Use | RobotFinder", "RobotFinder terms of use and contest rules.", "Terms of Use"],
  ["disclosure.html", "disclosure", "Affiliate & Advertising Disclosure | RobotFinder", "How RobotFinder earns money: affiliate links, advertising and sponsored listings.", "Affiliate Disclosure"],
  ["404.html", "404", "Page not found | RobotFinder", "Page not found.", "Page not found"],
];
TOP.forEach(p => stub(p[0], p[1], p[2], p[3], p[4]));
const catName = {}; D.cats.forEach(c => catName[c.slug] = c.name);
D.robots.forEach(r => stub(`robots/${r.slug}.html`, "robot", `${r.maker} ${r.name}: Price, Specs & Quotes | RobotFinder`, `${r.maker} ${r.name} — ${r.summary} Price, specs, videos and free quotes.`, `${r.maker} ${r.name}`, r.slug));
D.cats.forEach(c => stub(`categories/${c.slug}.html`, "category", `${c.name} — Compare Models & Prices | RobotFinder`, `${c.desc} Compare models, prices and specs, watch videos and get free quotes.`, c.name, c.slug));
D.guides.forEach(g => stub(`guides/${g.slug}.html`, "guide", `${g.title} | RobotFinder`, g.desc, g.title, g.slug));

const w = (f, s) => fs.writeFileSync(path.join(ROOT, f), s);
w("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` + pages.map(p => `<url><loc>${SITE}/${p === "index.html" ? "" : p}</loc></url>`).join("\n") + "\n</urlset>\n");
w("robots.txt", `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);
w("ads.txt", "# Google AdSense: replace pub-0000000000000000 with your publisher id after approval\n# google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0\n");
w(".nojekyll", "");
console.log(`Built ${pages.length + 1} page stubs`);
