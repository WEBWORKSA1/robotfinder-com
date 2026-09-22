/* ============================================================
   RobotFinder.com — SITE CONFIG
   Edit these values to switch on monetization. Nothing else
   needs to change: every page reads from this file.
   ============================================================ */
window.RF_CONFIG = {
  siteName: "RobotFinder",
  domain: "robotfinder.com",

  /* Google AdSense — paste your publisher id (e.g. "ca-pub-1234567890123456").
     When empty, the site shows neutral placeholder ad boxes. */
  adsenseClient: "",
  /* Optional: map slot names to AdSense ad-unit ids. Unmapped slots use auto ads. */
  adSlots: { leaderboard: "", inArticle: "", sidebar: "", footer: "" },

  /* Google Analytics 4 measurement id, e.g. "G-XXXXXXX" */
  ga4Id: "",

  /* Affiliate: Amazon Associates tracking tag (e.g. "robotfinder-20").
     "Check price" buttons on consumer robots become affiliate links. */
  amazonTag: "",

  /* Donations — paste any/all hosted payment links. Buttons appear automatically.
     (PayPal donate link, Stripe Payment Link, Buy Me a Coffee, Ko-fi, GitHub Sponsors…) */
  donate: {
    paypal: "",
    stripe: "",
    buymeacoffee: "",
    kofi: "",
    githubSponsors: ""
  },

  /* Form delivery. By default forms post to FormSubmit's AJAX API using the
     site's private inbox (kept obfuscated in main.js). After the first
     submission FormSubmit emails an activation link + a random alias string —
     paste that alias here to stop using the address entirely. */
  formAlias: "",

  /* YouTube channel for the "Subscribe" buttons (e.g. "https://www.youtube.com/@RobotFinder") */
  youtubeChannel: "https://www.youtube.com/results?search_query=robotfinder+robots",

  /* Domain-for-sale banner target */
  domainContactUrl: "https://web.works/contact"
};
