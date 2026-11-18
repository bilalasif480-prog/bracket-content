# Bracket — SEO + GEO audit (pre-launch)

Task: T-20261118-06 · Agent: bracket-geo · Date: 18 Nov 2026
Audited: read-only copy of the static site (`index.html`, `ai-agents.html`, `customer-agent.html`, `sales-agent.html`, `marketing-agent.html`, `custom-agent.html`, `work.html`, `careers.html`, `contact.html`, redirects `services.html` + `booking.html`, `bracket-config.js`). Site is not deployed, so this is a code audit. Search Console / Bing / live AI-answer checks wait for launch.
Profile used: `business/bracket.md` (18 Nov 2026): software house, five equal services (Websites, Mobile apps, AI agents, SEO, GEO), no prices, no invented proof, EN + Gulf Arabic.

---

## 1. Score + ranked issues

### Score: 5 / 20 (GEO checklist, 0–2 each)

| # | Check | Score | Why |
|---|---|---|---|
| 1 | Indexing (GSC, Bing, sitemap submitted) | 0 | Not deployed; no sitemap.xml |
| 2 | Crawler access (robots.txt for GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended, Bingbot) | 0 | No robots.txt |
| 3 | llms.txt | 0 | Missing |
| 4 | Schema (Organization/LocalBusiness/Service/FAQPage, `sameAs`) | 0 | No JSON-LD on any page |
| 5 | Answer-first content | 1 | Hero paragraph is clear, but home H1 is just "[Bracket]" and nothing says Kuwait or "software house" |
| 6 | FAQ (EN + AR) | 1 | Good English FAQs in `<details>` (index 5, ai-agents 8, each agent page 1+); no Arabic, no FAQPage schema |
| 7 | Quotable facts | 0 | The word "Kuwait" appears **0 times** on the whole site; no location, no service list beyond agents |
| 8 | Trust (About, names, contact, consistent NAP) | 0 | No About, no person, no city, email on `bracket.studio` domain, Work page empty |
| 9 | Speed + server-rendered HTML | 2 | Plain static HTML, no images, ~16–45 KB pages; text is in the HTML (not JS-built). Small fixes below |
| 10 | Freshness (updated dates) | 0 | No dates anywhere |

### Ranked issues (fix in this order)

| Rank | Issue | Files | Fix | Owner |
|---|---|---|---|---|
| 1 | **Site sells only AI agents** — no Websites, Apps, SEO, GEO pages; `services.html` redirects to ai-agents | all, `services.html` | Build `services.html` (real hub page, not a redirect), `websites.html`, `apps.html`, `seo.html`, `geo.html`; add all five to nav + footer on every page (see section 2) | websitebuilder |
| 2 | **"Kuwait" never appears**; no "software house" | all | Put "software house in Kuwait" in home H1/intro, every title, footer ("Bracket — software house, Kuwait"), and schema `areaServed` | websitebuilder |
| 3 | **"Studio" wording** (banned word) in metas + copy | `work.html` (meta + body), `careers.html` (meta + lede), footer heading "Studio" on `contact.html`, `ai-agents.html`, `customer-agent.html`, `marketing-agent.html`, `careers.html` (and likely all pages) | Replace with "software house"; footer heading → "Bracket" or "Company" | websitebuilder |
| 4 | **Email domain `hello@bracket.studio`** on every page + contact form mailto | all | Confirm Bilal owns this domain. If the launch domain differs, use an email on the launch domain — name/contact must match everywhere (site, GBP, Instagram, directories) | PM → Bilal |
| 5 | **No Arabic content** except the WhatsApp demo bubbles on index (Arabic in 1 of 11 files); `lang="en"` only; no `hreflang` | all | Add Arabic mirror pages under `/ar/` with `<html lang="ar" dir="rtl">`, real Gulf Arabic copy (not machine-translated), `hreflang="en"`, `hreflang="ar"`, `hreflang="x-default"` on both versions. Load IBM Plex Sans Arabic (currently not loaded — Google Fonts link only has Archivo + IBM Plex Mono) | websitebuilder (+ Bilal checks Arabic) |
| 6 | **No schema.org JSON-LD** | all | Org/ProfessionalService on every page, Service on each service page, FAQPage where FAQs exist, BreadcrumbList on sub-pages (drafts in section 2) | websitebuilder |
| 7 | **No canonical, no Open Graph / Twitter tags** | all real pages | Add `<link rel="canonical" href="https://DOMAIN/<page>">` (absolute), `og:title`, `og:description`, `og:url`, `og:image` (1200×630 PNG of the lockup), `og:locale` (`en_US` / `ar_KW`), `twitter:card=summary_large_image` | websitebuilder |
| 8 | **Weak titles / H1s** | `index.html` (title "Bracket — AI that gets it done.", H1 "[Bracket]"), agent pages ("Customer agent — Bracket") | Use keyword titles + H1s from section 2. Keep the "[Bracket]" lockup as a visual, but make the H1 text say what Bracket is | websitebuilder |
| 9 | **Redirect pages use meta refresh + relative canonical** | `services.html`, `booking.html` | `services.html` becomes a real page. `booking.html`: server 301 to `/contact.html` (or `/ai-agents.html`) at the host; if only static, keep meta refresh but make canonical absolute and leave it out of the sitemap | websitebuilder |
| 10 | **Hidden price leftovers** `priceFrom: 350`, `carePlan: 20` in config; WhatsApp default text says "an AI agent" | `bracket-config.js` | No page uses `.js-price`/`.js-care` now — delete both values so a price can't leak. Change default WhatsApp text to neutral "Hi Bracket, I'd like to talk about a project." | websitebuilder |
| 11 | **Broken favicon / icon paths** — `export/` folder is not in the site copy | all `<link rel="icon">` | Ship `export/bracket-icon.svg`, `export/png/bracket-icon-32.png`, `-180.png`, or fix paths | websitebuilder |
| 12 | **Content starts at `opacity:0`** (`[data-anim]`, `.reveal`) and only shows after JS | all | Text is in the HTML, so crawlers can read it, but add `<noscript><style>[data-anim],.reveal,.reveal-stagger{opacity:1;transform:none}</style></noscript>` and respect `prefers-reduced-motion` | websitebuilder |
| 13 | **Thin trust pages** — Work page empty, no About | `work.html` | Add `about.html`: who Bracket is, city (Kuwait), founder name (Bilal, if he agrees), how work is checked before launch. Work page: keep honest "no public projects yet" until a client agrees — do **not** add demo/pitch work as case studies | websitebuilder + PM |
| 14 | **No dates** | key pages | Add "Updated: <date>" line on service pages + `dateModified` in schema | websitebuilder |
| 15 | **Contact form is mailto-only** (JS builds a mailto) | `contact.html` | Fine for SEO; for enquiries add a WhatsApp number once Bilal sets one (`bracket-config.js` `whatsapp:""`). Add contact details as plain text (email, Instagram, city) for AI to quote | websitebuilder (after Bilal gives number) |
| 16 | Render-blocking Google Fonts CSS | all | Self-host the fonts (woff2, `font-display:swap`) or at least preload; inline CSS (~21 KB on index) is fine | websitebuilder |
| 17 | Decorative SVG icons | all | Keep `aria-hidden="true"` on decorative icons (only 2 of 32 on index have it); no `<img>` exist, so no alt text problem today. Every future image (lockup, OG image, screenshots) needs `alt` in EN/AR | websitebuilder |

Top 5 by impact: #1 (new service pages), #2 (Kuwait + software house), #5 (Arabic pages), #6 (schema), robots/sitemap/llms.txt at launch (section 3).

---

## 2. New pages: keywords, titles, H1, schema, FAQs

Rules for every page:
- First paragraph = a 40–60 word direct answer ("Bracket is a software house in Kuwait that builds … "), then detail, then H2 questions.
- "Get a quote" CTA, no prices, no stats, no client names, no "guaranteed"/"#1 on Google".
- Footer on every page: "Bracket — software house in Kuwait · Websites · Mobile apps · AI agents · SEO · GEO" + Instagram @bracketkw + email.
- Each page links to the other four services and to contact.
- Each EN page has an AR twin at `/ar/<same-name>.html` with hreflang both ways.

Shared JSON-LD (every page, in `<head>`; only true fields — no address/phone until Bilal confirms them):

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://DOMAIN/#org",
  "name": "Bracket",
  "alternateName": "براكت",
  "description": "Bracket is a software house in Kuwait that builds websites, mobile apps and AI agents, and gets businesses found on Google and in AI answers.",
  "url": "https://DOMAIN/",
  "logo": "https://DOMAIN/bracket-lockup-1A.png",
  "email": "EMAIL-ON-LAUNCH-DOMAIN",
  "areaServed": [{"@type": "Country", "name": "Kuwait"}, {"@type": "Place", "name": "Gulf Cooperation Council"}],
  "address": {"@type": "PostalAddress", "addressCountry": "KW"},
  "knowsLanguage": ["en", "ar"],
  "sameAs": ["https://www.instagram.com/bracketkw/"],
  "makesOffer": [
    {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Website development", "url": "https://DOMAIN/websites.html"}},
    {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Mobile app development", "url": "https://DOMAIN/apps.html"}},
    {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "AI agents for businesses", "url": "https://DOMAIN/ai-agents.html"}},
    {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "SEO", "url": "https://DOMAIN/seo.html"}},
    {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "GEO (AI search visibility)", "url": "https://DOMAIN/geo.html"}}
  ]
}
```
Add Google Business Profile and LinkedIn URLs to `sameAs` once they exist. (Arabic alternateName spelling: Bilal to confirm.) Switch `@type` to `LocalBusiness` subtype only if a real address is published.

Per service page add:
```json
{"@context":"https://schema.org","@type":"Service","name":"<service>","serviceType":"<service>",
 "provider":{"@id":"https://DOMAIN/#org"},"areaServed":{"@type":"Country","name":"Kuwait"},
 "availableLanguage":["en","ar"],"url":"https://DOMAIN/<page>.html"}
```
+ `FAQPage` built from the exact visible Q&As on that page (same text, both languages on their own page) + `BreadcrumbList` (Home > Services > page).

### index.html (home)
- **Keywords EN:** software house Kuwait, software company Kuwait, website and app development Kuwait, AI agents Kuwait
- **Keywords AR:** شركة برمجة في الكويت، شركة برمجيات الكويت، تصميم مواقع وتطبيقات الكويت، وكلاء ذكاء اصطناعي الكويت
- **Title:** Bracket — Software House in Kuwait | Websites, Apps, AI Agents, SEO & GEO
- **Meta:** Bracket is a software house in Kuwait. We build websites, mobile apps and AI agents, and get your business found on Google and in AI answers. Arabic and English. Get a quote.
- **H1:** A software house in Kuwait for websites, apps and AI agents. (keep the `[ Bracket ]` lockup above it as a visual)
- **Schema:** ProfessionalService (shared) + WebSite + FAQPage
- **FAQ:** What does Bracket do? · Do you work with small businesses in Kuwait? · Do you build in Arabic and English? · How much does a project cost? (answer: depends on the job, get a quote) · How long does a project take? · Is everything checked before launch? · Can one team do my website, app and Google visibility together?

### services.html (hub — replace the redirect)
- **Keywords EN:** software development services Kuwait, IT services Kuwait, digital services Kuwait
- **Keywords AR:** خدمات برمجة الكويت، خدمات تقنية المعلومات الكويت، تطوير برمجيات الكويت
- **Title:** Services — Websites, Mobile Apps, AI Agents, SEO & GEO in Kuwait | Bracket
- **Meta:** Five services from one software house in Kuwait: websites, iOS and Android apps, AI agents, SEO for Google, and GEO for AI answers. Pick one or combine them. Get a quote.
- **H1:** Our services
- **Schema:** ItemList of the 5 Service pages + BreadcrumbList + FAQPage
- **FAQ:** Which service do I need first? · Can I combine services? · Do you work outside Kuwait (GCC)? · Who owns the code and accounts? · What happens after launch?

### websites.html
- **Keywords EN:** website development Kuwait, web design Kuwait, business website Kuwait, online store Kuwait, landing page Kuwait, web app development Kuwait
- **Keywords AR:** تصميم مواقع الكويت، تصميم مواقع إلكترونية في الكويت، برمجة مواقع الكويت، تصميم متجر إلكتروني الكويت، شركة تصميم مواقع
- **Title:** Website Development in Kuwait — Business Sites, Online Stores & Web Apps | Bracket
- **Meta:** Bracket builds fast, bilingual (Arabic + English) business websites, landing pages, online stores and web apps in Kuwait — built for Google and checked before launch. Get a quote.
- **H1:** Website development in Kuwait
- **Schema:** Service (`serviceType`: "Web development") + FAQPage + BreadcrumbList
- **FAQ:** How long does a website take? · Do you build Arabic (RTL) and English sites? · Can you build an online store with KNET/payments? (only answer what Bracket really supports) · Will my site show on Google? (no ranking promise) · Do I own the domain and site? · Can you redesign my existing site? · Do you host and maintain it?

### apps.html
- **Keywords EN:** app development Kuwait, mobile app development Kuwait, iOS app development Kuwait, Android app developer Kuwait, booking app Kuwait
- **Keywords AR:** برمجة تطبيقات الكويت، تطوير تطبيقات الجوال الكويت، تصميم تطبيقات الكويت، شركة برمجة تطبيقات، تطبيق حجوزات
- **Title:** Mobile App Development in Kuwait — iOS & Android Apps | Bracket
- **Meta:** Bracket builds iOS and Android apps in Kuwait for customers or staff — bookings, ordering, loyalty and internal tools — in Arabic and English, checked before launch. Get a quote.
- **H1:** Mobile app development in Kuwait
- **Schema:** Service (`serviceType`: "Mobile app development") + FAQPage + BreadcrumbList
- **FAQ:** iOS, Android or both? · How long does an app take? · Do you publish it on the App Store and Google Play? · Can the app work in Arabic? · Do I need a website too? · Who owns the app and its code? · What support is there after launch?

### seo.html
- **Keywords EN:** SEO Kuwait, SEO company Kuwait, SEO services Kuwait, Google ranking Kuwait, Google Business Profile Kuwait, Arabic SEO
- **Keywords AR:** سيو الكويت، تحسين محركات البحث الكويت، شركة سيو في الكويت، الظهور في جوجل، تحسين ظهور الموقع في جوجل
- **Title:** SEO in Kuwait — Get Found on Google in Arabic & English | Bracket
- **Meta:** Bracket's SEO service in Kuwait fixes site structure, speed, titles and content, and sets up your Google Business Profile so customers find you on Google. No fake promises. Get a quote.
- **H1:** SEO in Kuwait: get found on Google
- **Schema:** Service (`serviceType`: "Search engine optimization") + FAQPage + BreadcrumbList
- **FAQ:** What is SEO? · How long until I see results? (honest: weeks to months, no guarantee) · Do you guarantee first place on Google? (No — nobody honest can) · Do you do Arabic SEO? · What is a Google Business Profile and do I need one? · Can you do SEO on a site you didn't build? · What do I get each month?

### geo.html
- **Keywords EN:** GEO Kuwait, generative engine optimization, AI search optimization, show up in ChatGPT, AI Overviews optimization, AEO
- **Keywords AR:** الظهور في ChatGPT، تحسين الظهور في الذكاء الاصطناعي، تحسين محركات البحث التوليدية، الظهور في إجابات الذكاء الاصطناعي
- **Title:** GEO in Kuwait — Get Cited in ChatGPT, Gemini & AI Answers | Bracket
- **Meta:** GEO gets your business found and cited when customers ask ChatGPT, Perplexity, Gemini or Google AI Overviews. Bracket sets up the site, schema and listings AI assistants read. Get a quote.
- **H1:** GEO: get your business cited in AI answers
- **Schema:** Service (`serviceType`: "Generative engine optimization") + FAQPage + BreadcrumbList (+ `DefinedTerm` for "GEO" optional)
- **FAQ:** What is GEO? · How is GEO different from SEO? · Which AI assistants does it cover? · Can you guarantee ChatGPT will mention me? (No) · How do you check if AI mentions my business? · Does it work for Arabic questions? · Do I need SEO first?
- Note: this is the page AI assistants are most likely to quote as a definition, so the opening 40–60 word answer to "What is GEO?" matters most. Low competition in Kuwait for this term today — strong opportunity.

### ai-agents.html (keep, re-position as 1 of 5 services)
- **Keywords EN:** AI agents Kuwait, AI agent for business Kuwait, WhatsApp AI agent Kuwait, WhatsApp chatbot Kuwait, AI automation Kuwait
- **Keywords AR:** وكيل ذكاء اصطناعي الكويت، رد آلي واتساب الكويت، شات بوت واتساب الكويت، أتمتة الأعمال بالذكاء الاصطناعي
- **Title:** AI Agents for Businesses in Kuwait — WhatsApp, Sales & Marketing | Bracket
- **Meta:** Bracket builds AI agents for businesses in Kuwait: WhatsApp replies and bookings, lead finding, social media and custom agents, in Gulf Arabic and English. You approve. Get a quote.
- **H1:** AI agents for businesses in Kuwait
- **Schema:** Service + `hasOfferCatalog` listing the 4 agent pages + FAQPage (8 existing Qs) + BreadcrumbList
- **FAQ:** keep the 8 existing; add "What is an AI agent vs a chatbot?" and "Does it work with WhatsApp Business?"

### Agent pages (customer / sales / marketing / custom)
| Page | Keywords EN / AR | Title | H1 |
|---|---|---|---|
| customer-agent.html | WhatsApp booking bot Kuwait, AI customer service Kuwait / رد آلي واتساب، حجز مواعيد عبر واتساب | WhatsApp AI Customer Agent in Kuwait — Replies & Bookings 24/7 \| Bracket | An AI agent that answers your customers on WhatsApp, day and night |
| sales-agent.html | AI lead generation Kuwait, B2B lead finding / إيجاد عملاء محتملين بالذكاء الاصطناعي | AI Sales Agent in Kuwait — Finds Leads, Drafts First Messages \| Bracket | An AI agent that finds clients and starts the conversation |
| marketing-agent.html | AI social media agent Kuwait, Instagram content AI / وكيل تسويق بالذكاء الاصطناعي، محتوى انستقرام | AI Marketing Agent in Kuwait — Hooks, Captions & Posts \| Bracket | An AI agent that keeps your social media moving |
| custom-agent.html | custom AI automation Kuwait / أتمتة مخصصة بالذكاء الاصطناعي | Custom AI Agent for Your Business in Kuwait \| Bracket | Describe the job. We build an agent for it. |

Meta descriptions: keep the current ones (good, plain) and add "in Kuwait" + "Arabic and English" + "Get a quote". Schema: Service (provider → `#org`) + FAQPage (existing Qs — each page needs 3+ FAQs; several have only 1) + BreadcrumbList (Home > AI agents > page).

### Other pages
- `about.html` (new): Title "About Bracket — Software House in Kuwait"; schema AboutPage + Organization (`founder` only if Bilal agrees).
- `contact.html`: Title "Contact Bracket — Get a Quote for a Website, App, AI Agent, SEO or GEO in Kuwait"; schema ContactPage; form "service" dropdown must list all 5 services.
- `work.html`, `careers.html`: remove "studio"; `careers.html` add `noindex` while "Nothing posted right now" (thin page).

---

## 3. Files to add at launch (replace `DOMAIN`)

### `/robots.txt`
```
# Bracket — https://DOMAIN/
User-agent: *
Allow: /

# Search and AI assistants: explicitly allowed
User-agent: Googlebot
Allow: /
User-agent: Bingbot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Perplexity-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Claude-SearchBot
Allow: /
User-agent: Claude-User
Allow: /
User-agent: Applebot
Allow: /
User-agent: Applebot-Extended
Allow: /

Sitemap: https://DOMAIN/sitemap.xml
```
(No `Disallow` lines on purpose. Keep `booking.html` out of the sitemap and give it `<meta name="robots" content="noindex">` instead.)

### `/sitemap.xml`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <!-- Repeat this block for each page; lastmod = launch date -->
  <url>
    <loc>https://DOMAIN/</loc>
    <lastmod>2026-12-01</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="https://DOMAIN/"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://DOMAIN/ar/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://DOMAIN/"/>
  </url>
  <url>
    <loc>https://DOMAIN/ar/</loc>
    <lastmod>2026-12-01</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="https://DOMAIN/"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://DOMAIN/ar/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://DOMAIN/"/>
  </url>
  <url><loc>https://DOMAIN/services.html</loc><lastmod>2026-12-01</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="https://DOMAIN/services.html"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://DOMAIN/ar/services.html"/></url>
  <url><loc>https://DOMAIN/websites.html</loc><lastmod>2026-12-01</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="https://DOMAIN/websites.html"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://DOMAIN/ar/websites.html"/></url>
  <url><loc>https://DOMAIN/apps.html</loc><lastmod>2026-12-01</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="https://DOMAIN/apps.html"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://DOMAIN/ar/apps.html"/></url>
  <url><loc>https://DOMAIN/ai-agents.html</loc><lastmod>2026-12-01</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="https://DOMAIN/ai-agents.html"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://DOMAIN/ar/ai-agents.html"/></url>
  <url><loc>https://DOMAIN/customer-agent.html</loc><lastmod>2026-12-01</lastmod></url>
  <url><loc>https://DOMAIN/sales-agent.html</loc><lastmod>2026-12-01</lastmod></url>
  <url><loc>https://DOMAIN/marketing-agent.html</loc><lastmod>2026-12-01</lastmod></url>
  <url><loc>https://DOMAIN/custom-agent.html</loc><lastmod>2026-12-01</lastmod></url>
  <url><loc>https://DOMAIN/seo.html</loc><lastmod>2026-12-01</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="https://DOMAIN/seo.html"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://DOMAIN/ar/seo.html"/></url>
  <url><loc>https://DOMAIN/geo.html</loc><lastmod>2026-12-01</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="https://DOMAIN/geo.html"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://DOMAIN/ar/geo.html"/></url>
  <url><loc>https://DOMAIN/about.html</loc><lastmod>2026-12-01</lastmod></url>
  <url><loc>https://DOMAIN/work.html</loc><lastmod>2026-12-01</lastmod></url>
  <url><loc>https://DOMAIN/contact.html</loc><lastmod>2026-12-01</lastmod></url>
  <!-- Each /ar/ page also gets its own <url> block with the same alternates.
       Leave out: booking.html (redirect), careers.html while noindex. -->
</urlset>
```
(`2026-12-01` is a placeholder launch date; set the real one. Add hreflang alternates for agent pages once their `/ar/` twins exist.)

### `/llms.txt`
```
# Bracket

> Bracket is a software house in Kuwait. It builds websites, mobile apps and AI agents for small and medium businesses, and gets them found on Google (SEO) and cited in AI answers (GEO). Work is in Arabic and English, and every build is checked before launch. Prices are quoted per project.

Bracket works with businesses in Kuwait and the Gulf: clinics, salons, gyms, repair and home services, real estate agencies, contractors, shops and online stores. Contact: EMAIL-ON-LAUNCH-DOMAIN · Instagram: https://www.instagram.com/bracketkw/

## Services
- [Services overview](https://DOMAIN/services.html): the five services and how they combine
- [Websites](https://DOMAIN/websites.html): business websites, landing pages, online stores and web apps, Arabic and English
- [Mobile apps](https://DOMAIN/apps.html): iOS and Android apps for customers or staff
- [AI agents](https://DOMAIN/ai-agents.html): agents that take repeat work off a team; the business approves what they do
- [SEO](https://DOMAIN/seo.html): site structure, speed, titles, content and Google Business Profile
- [GEO](https://DOMAIN/geo.html): getting found and cited in ChatGPT, Perplexity, Gemini and Google AI Overviews

## AI agents
- [Customer agent](https://DOMAIN/customer-agent.html): answers and books on WhatsApp and website chat in Gulf Arabic and English, hands hard cases to a person
- [Sales agent](https://DOMAIN/sales-agent.html): finds companies that fit, drafts a first message for approval
- [Marketing agent](https://DOMAIN/marketing-agent.html): niche research, hooks, captions, prepares posts for approval
- [Custom agent](https://DOMAIN/custom-agent.html): any repeat task that follows rules

## Company
- [About](https://DOMAIN/about.html): who Bracket is
- [Contact / get a quote](https://DOMAIN/contact.html)
- [Arabic site](https://DOMAIN/ar/)
```

Also at launch: `og-image.png` (1200×630), working favicons, absolute canonicals, submit sitemap in Google Search Console **and** Bing Webmaster Tools (Bing feeds ChatGPT search), request indexing of home + 5 service pages.

---

## 4. Off-site launch checklist (short)

What AI answers cite today for these queries (web search 18 Nov 2026): directory/ranking lists dominate — Clutch (`clutch.co/kw/web-developers`, `/kw/developers`, `/kw/seo-firms`), DesignRush (Kuwait SEO + agency profiles), GoodFirms, TechBehemoths, Krowdbase "best X in Kuwait 2026" lists. For "AI agents / WhatsApp chatbot Kuwait" it's vendor pages with country + industry landing pages (e.g. LetsBot, Edesy) and small Kuwait-specific sites. Competitors named here for reference only; none of their numbers are Bracket's.

- [ ] **Google Business Profile**: category "Software company" (secondary: Website designer, Internet marketing service); service-area business (Kuwait, no public address unless Bilal wants one); all 5 services listed; EN+AR description; logo, cover, a few real photos; website link. Ask first real clients for reviews that name the service. (Bilal must create/verify.)
- [ ] **Bing Places**: import from GBP.
- [ ] **Directories** (free profiles, same name/description/email/site everywhere, no invented clients or numbers): Clutch, GoodFirms, DesignRush, TechBehemoths, Krowdbase; LinkedIn company page "Bracket — software house, Kuwait". Add each to schema `sameAs` once live.
- [ ] **Instagram @bracketkw bio**: "Software house in Kuwait 🇰🇼" → plain text: "Software house · Kuwait | Websites · Apps · AI agents · SEO · GEO | شركة برمجة في الكويت" + website link; category "Software company"; pinned posts = services / how we work / how to contact; alt text on every post. (instamake drafts, Bilal approves.)
- [ ] Same name "Bracket" + handle `bracketkw` + one email on every platform.
- [ ] Month 1 after launch: run the AI visibility prompt set (EN + AR, e.g. "software house in Kuwait", "شركة برمجة في الكويت", "who builds AI agents for businesses in Kuwait", "SEO company Kuwait", "what is GEO") in ChatGPT, Perplexity, Gemini, Google AI Overviews → `geo/bracket-visibility.md`.

---

## Owners + due dates

| Fix | Owner | Due |
|---|---|---|
| New pages (services, websites, apps, seo, geo, about) + nav/footer, "Kuwait"/"software house" wording, remove "studio", titles/H1/meta | websitebuilder | 25 Nov 2026 |
| JSON-LD, canonical, OG, hreflang, favicons, noscript, config cleanup | websitebuilder | 25 Nov 2026 |
| Arabic `/ar/` pages (copy checked by Bilal) | websitebuilder + Bilal | 2 Dec 2026 |
| Confirm domain, email (`bracket.studio`?), WhatsApp number, founder name on About | PM → Bilal | 22 Nov 2026 |
| robots.txt, sitemap.xml, llms.txt live; GSC + Bing submitted | websitebuilder (deploy after Bilal's yes) | launch day |
| GBP, directories, LinkedIn | PM → Bilal | launch + 7 days |
| Instagram bio + pinned posts | instamake (draft) → Bilal | launch day |
| First AI visibility check | bracket-geo | launch + 30 days |
