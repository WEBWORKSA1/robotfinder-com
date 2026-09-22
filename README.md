# RobotFinder.com

**The search engine for robots.** Visitors can search a robot directory, compare models, run an ROI calculator, request quotes from several vendors, watch videos and read guides. There are also sections for jobs, contests, events and donations.

The site is plain static HTML/CSS/JS, so it runs on the **free GitHub Pages** plan with no build step at deploy time. Each page is a light SEO stub (title, description, canonical URL, domain banner). `render.js` then renders the page from one data file, which makes adding a robot a one-line edit.

> Interested in this website/domain? → https://web.works/contact

## Structure
| Path | What |
|---|---|
| `index.html` | Homepage: hero search, matchmaker, categories, trending robots, videos, guides, lead CTAs |
| `robots.html`, `robots/*.html` | Directory with filters, plus one SEO page per robot with a quote form |
| `categories.html`, `categories/*.html` | 16 robot categories |
| `get-quotes.html` | **Lead generation**: 7-step RFQ wizard with lead scoring |
| `compare.html`, `roi-calculator.html` | Buyer tools |
| `videos.html`, `guides.html`, `guides/*.html` | Content, video and SEO |
| `advertise.html`, `list-your-robot.html` | Vendor monetization |
| `donate.html`, `jobs.html`, `contests.html`, `events.html` | Donations, hiring, contests and prizes, events |
| `assets/js/config.js` | **Switch on AdSense, GA4, Amazon tag and donation links here** |
| `assets/js/site-data.js` | **All content**: robots, categories, videos, guides, FAQ |
| `assets/js/render.js` | Page templates (header, footer, every page type) |
| `_src/build.js` | After adding robots/guides/categories run `node _src/build.js` to regenerate page stubs + sitemap |
| `docs/BUILD-PROMPT.md` | Business idea and phase-wise build prompt |

## Forms & email
Every form posts through FormSubmit's AJAX API to the site's private inbox. The address is stored obfuscated in `assets/js/main.js` and never appears in the HTML.

The first submission sends an activation email to that inbox. Click the link in it. FormSubmit then gives you a random alias string: paste it into `formAlias` in `config.js`, and the address is no longer used at all.

## Monetization checklist
1. Apply for AdSense and put the `ca-pub-…` id in `config.js`. Also fix `ads.txt`.
2. Join Amazon Associates and set `amazonTag`.
3. Add PayPal, Stripe or Buy Me a Coffee links under `donate`.
4. Add a GA4 id.

## Custom domain
Point DNS for robotfinder.com at GitHub Pages:
- A records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- `www` CNAME → `webworksa1.github.io`

Then add a `CNAME` file containing `robotfinder.com`, or set the domain under Settings → Pages.
