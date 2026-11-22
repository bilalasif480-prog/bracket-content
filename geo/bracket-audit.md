# Bracket — SEO + GEO audit

## Re-audit 22 Nov 2026

> **PM note (22 Nov):** the favicon 404s (`export/` missing) and the missing font files were caused by the PM's partial copy of the site (it skipped `export/` and `fonts/`). Both exist in Bilal's `Website` folder (checked), so they are NOT real issues. Ignore them.

Task: T-20261122-01 · Agent: bracket-geo · Profile: `business/bracket.md` (software house, 5 services, no prices, no invented proof, EN + Gulf Arabic).
Audited: the FINAL site (read-only copy, not deployed): 15 EN pages at root + 15 AR twins in `ar/` (incl. 404s, `booking.html` redirects), `site.css`, `bracket-3d.css/js`, `loader.css/js`, `robots.txt`, `sitemap.xml`, `llms.txt`, `_headers`, `_redirects`, `vercel.json`.
Method: static parse of every page (titles, metas, H1, canonical, hreflang, OG/Twitter, JSON-LD parse + types, FAQ schema vs visible text, internal links, images) + Playwright (Chromium headless, 390 px) with JS **off** and JS **on** (loader timing, LCP, CLS).
The 18 Nov audit (old site) is in git history.

### Score: 15 / 20 (was 5 / 20 on 18 Nov)

| # | Check | 18 Nov | 22 Nov | Why |
|---|---|---|---|---|
| 1 | Indexing | 0 | 1 | `sitemap.xml` ready, 26 URLs, all exist, EN/AR/x-default alternates correct both ways. Not deployed, so no GSC/Bing yet; every URL still says `DOMAIN` |
| 2 | Crawler access | 0 | 2 | `robots.txt` allows all + GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended, Bingbot, Applebot |
| 3 | llms.txt | 0 | 2 | Matches the real pages (EN + AR list, facts block, no prices, no fake proof) |
| 4 | Schema | 0 | 2 | Valid JSON-LD on all 26 indexable pages: Organization+ProfessionalService (`#org`), Service, FAQPage, BreadcrumbList, WebSite, ContactPage, ItemList, OfferCatalog. `sameAs` only Instagram |
| 5 | Answer-first content | 1 | 2 | Every key page opens with a direct answer; home H1 + lede say "software house in Kuwait" |
| 6 | FAQ EN + AR | 1 | 2 | 52 Q&As per language (104 total) across 22 pages; every schema Q and A is in the visible HTML (checked by script); `<details>` answers are in the HTML without JS |
| 7 | Quotable facts | 0 | 1 | Kuwait, 5 services, languages, contact all stated. Nothing else quotable yet (no founding date, team, city/area) |
| 8 | Trust | 0 | 1 | Same email/WhatsApp/Instagram everywhere. Still no About page, no named person, no reviews; email is Gmail; Work page "no public projects yet" (honest, `noindex`) |
| 9 | Speed + server-rendered HTML | 2 | 1 | HTML is fully server-rendered (JS-off: all text there, body visible). But the new loader hides the page on every first visit (LCP ~3–8 s in test) and `bracket-3d.js` is 612 KB on every page |
| 10 | Freshness | 0 | 1 | `dateModified` on key pages; visible "Updated" only on websites/apps/seo/geo |

### Per-page check (all 30 files)
- Titles + meta descriptions: unique on every page (EN 38–62 chars, AR 41–58; metas 130–155). Only the two `booking.html` redirects have no meta (fine, `noindex`).
- H1: exactly 1 on every real page. Keyword in H1 on home, services, websites, apps, ai-agents, seo, geo (EN + AR). No keyword in H1 on agent pages / contact (title carries it; OK).
- Canonical: absolute, self-referencing on all pages. hreflang en/ar/x-default on all 13 indexable pairs. `work`, `careers` = `noindex` (correctly left out of sitemap and hreflang).
- OG (11 tags) + Twitter (4) on every real page; `og:locale` en_US / ar_KW; `og-image.png` exists.
- Arabic: `lang="ar" dir="rtl"`, real Gulf Arabic copy, own titles/metas/FAQ schema. Indexable.
- Images: no `<img>` in pages, so no alt issues.
- Internal links: all resolve **except favicons** (see #3).
- JS off: body visible, H1 visible, all text present (873 words on home EN, 724 AR). Loader + 3D classes are added only by JS, so non-JS crawlers (GPTBot, ClaudeBot, PerplexityBot, most AI fetchers) see everything. The `<noscript>` reveal fix is in.
- CLS: 0 on every page tested.

### Ranked issues + fixes (owner: websitebuilder, only after Bilal OKs — site is "final, bug fixes only")

| Rank | Issue | File | Fix |
|---|---|---|---|
| 1 | **Loader hides the whole page on every first visit → slow LCP.** `loader.js` adds `bk-loading` (body `visibility:hidden`) and waits for `load` + MIN 1400 ms + 750 ms exit. In test, reveal took 4.2–8.4 s with the 3D layer, 3.1 s with it blocked. LCP = the hero after reveal (5.7–8.3 s headless; real phones will be better but ≥ ~2.3 s floor by design). Google measures LCP on first visits, which is exactly when the loader runs. Googlebot's renderer also gets it every time (fresh sessionStorage) | `loader.js` (+ every `<script src="loader.js">`) | Best: remove the loader (delete the 2 tags in every page head). If Bilal wants to keep it: start the exit at `DOMContentLoaded`, not `load`; MIN ≤ 400 ms; MAX ≤ 1200 ms; skip it for bots: `if (/bot|crawl|spider|Google|Bing|GPT|Claude|Perplexity|facebookexternalhit/i.test(navigator.userAgent)) return;` at the top |
| 2 | **`bracket-3d.js` = 612 KB (156 KB gzip) on all 30 pages incl. 404s.** It is `defer` (not render-blocking) but its WebGL start-up blocks the main thread: it doubled the loader time in test → hurts LCP and INP on mid/low phones | all pages, `bracket-3d.js` | Load it only where it shows (home), only on `(hover:hover) and (pointer:fine)` desktops, after `load` + `requestIdleCallback`; skip when `prefers-reduced-motion` or `navigator.hardwareConcurrency <= 4`. Remove from 404s, contact, privacy |
| 3 | **Favicons 404 on every page** — `export/` folder still not in the site | all 30 `<link rel="icon">` / `apple-touch-icon` | Add `export/bracket-icon.svg`, `export/png/bracket-icon-32.png`, `export/png/bracket-icon-180.png`, or point to files that exist. Google shows the favicon next to results |
| 4 | **Name collision: "Bracket" ≠ unique.** Search for Bracket already returns Bracketworks (UAE, on DesignRush/GoodFirms/LinkedIn), "Brackets" (GoodFirms) and BracketzLab (Clutch). AI may merge or confuse entities | `index.html` + all JSON-LD `#org` | Add `"alternateName": ["Bracket Kuwait", "bracketkw", "براكت"]` (Bilal confirms Arabic spelling); use "Bracket Kuwait" as the listing name everywhere off-site; add GBP/LinkedIn/Clutch URLs to `sameAs` as soon as they exist |
| 5 | **Trust is thin** — no About page, no person, no reviews; Gmail address | new `about.html` + `ar/about.html` | About page: who Bracket is, Kuwait, founder name only if Bilal agrees, how work is checked before launch; AboutPage schema. Email on the launch domain once chosen (then update site, GBP, Instagram, listings together) |
| 6 | Fonts referenced but missing in this copy: only `archivo-latin-800/900` are in `fonts/`; Archivo 400–700, all IBM Plex Sans Arabic and JetBrains Mono woff2 files 404 → Arabic falls back to system font | `site.css` lines 2–16, `fonts/` | Check the Mac folder; if missing there too, add the woff2 files (or remove those `@font-face` lines). Preload the 1–2 hero fonts |
| 7 | `DOMAIN` placeholder in canonicals, hreflang, OG, schema, sitemap, robots, llms.txt | all | One find-and-replace at launch; then submit sitemap to GSC + Bing |
| 8 | Visible "Updated" date only on 4 pages | home, services, ai-agents + agent pages (EN + AR) | Add a small "Updated <date>" line to match `dateModified` |
| 9 | Agent pages have only 3 FAQs; contact H1 has no keyword | `*-agent.html`, `contact.html` (EN + AR) | Optional: 2 more real Qs per agent page; fine to leave |

Top 5 by impact: #1 loader, #2 3D weight, #3 favicons, #4 entity name, #5 About page.

### Already good (keep)
- robots.txt, sitemap.xml (alternates correct, every URL exists, noindex pages left out), llms.txt — all launch-ready apart from `DOMAIN`.
- Full Arabic twin of every page with proper RTL, hreflang both ways and its own schema.
- Valid schema on every page, FAQ schema matches visible text 1:1.
- Server-rendered HTML; AI crawlers that don't run JS get the full text.
- No prices, no invented stats/clients, no "#1 on Google", honest "no public projects yet".
- Security headers in `_headers` + `vercel.json` don't block JSON-LD (non-executing scripts).

### Due
Fixes #1–#3 before deploy (owner websitebuilder, after Bilal's OK). #4–#5 at launch week (PM → Bilal). Re-audit on the live URL right after deploy (GSC/Bing, PageSpeed Insights field + lab).
