# QA report: Bracket website — Retest 18 Nov 2026 (T-20261118-12)

Agent: websiteqa · Build: `/home/claude/site-build/` after websitebuilder's fix round (not deployed, served locally with `python3 -m http.server`, plus a second local server that sends the site's own `_headers` CSP) · Profile: `business/bracket.md` · Read-only: no site files changed.
Previous round: T-20261118-08 (FAIL: 0 critical, 1 high, 5 medium, 11 low).

## Overall: PASS

| Severity | Open now |
|---|---|
| Critical | 0 |
| High | 0 |
| Medium | 0 |
| Low | 5 (1 of them is what is left of M4) |

All 17 earlier issues: **16 fixed, 1 partly fixed** (M4 tap targets, now Low). No new High/Medium issues. 0 console errors, 0 failed requests, 0 external requests (fonts are self-hosted), 0 broken links, no horizontal scroll on any page at any size. The Lows below are polish and one Arabic word; none block launch.

## What was tested

- 32 pages (16 EN + 16 AR, incl. new `privacy.html` and `404.html` in both languages; `booking.html` redirects checked separately) × 4 viewports = 128 runs with Playwright (Chromium headless): 1440×900, 1280×720, 390×844 (mobile/touch), 768×1024 spot check. Console errors, failed requests, external requests, fonts loaded, horizontal scroll, off-screen elements, hero CTA position, contrast, tap targets, WhatsApp and mailto hrefs.
- Same 34 HTML files served with the site's real CSP/security headers from `_headers`: 0 CSP violations, 0 console errors, contact form still opens the mailto. No inline scripts or `on…=` handlers anywhere.
- Nav dropdown (click, outside click, Enter, Space, Esc, tab-out, `aria-expanded`, `aria-current`) EN + AR; mobile menu (tap, Esc, link tap, labels EN/AR, scroll lock); language switch on every page and with `?service=`.
- Contact form EN + AR: empty, bad email, valid submit (mailto), `?service=` for all slugs + a bogus one; JS turned off.
- Static: titles, descriptions, H1, heading order, canonical, hreflang reciprocity, OG/Twitter, JSON-LD parse + types, robots meta, `sitemap.xml`, `robots.txt`, `llms.txt`, labels.
- Content rules grep + reading the Arabic on `ar/index`, `ar/contact`, `ar/privacy`, `ar/404` and the changed lines on other pages.
- `build-dist.sh` run in a /tmp copy (with a planted `.DS_Store`), with and without a domain.

## Earlier issues

| # | Issue | Status | Evidence now |
|---|---|---|---|
| H1 | Home EN hero CTA below the fold at 1440 | **Fixed** | "Get a quote" bottom 819px at 1440×900, 633px at 1280×720, 692px at 390×844. Service list now sits beside the H1. |
| M1 | 12 EN titles > 60 chars | **Fixed** | All 32 titles ≤ 58; all descriptions ≤ 155; no duplicates. |
| M2 | Red CTA band text 4.20:1 | **Fixed** | Band is `#d4290f`, all text solid white = 5.09:1. 0 contrast failures on any page/viewport. |
| M3 | Focus ring invisible on red band | **Fixed** | Focused buttons in the band show a 3px white outline. |
| M4 | Tap targets < 44px on phone | **Partly fixed** | Footer links, Back to top, See details, menu sub-links, logo now ≥ 44px. Still small: see L-A below. |
| M5 | No privacy page | **Fixed** | `privacy.html` + `ar/privacy.html`, linked in the footer of every page (not the 2 redirect stubs), in sitemap + llms.txt, indexable, hreflang reciprocal. Wording matches the real setup (no cookies, no analytics, fonts self-hosted, mailto form, Gmail/Meta, deletion by email). Bilal should still OK the wording. |
| L1 | Heading levels skip | **Fixed** | 0 heading skips on 32 pages. |
| L2 | Mobile menu doesn't lock scroll | **Fixed** | `html{overflow:hidden}` while open; wheel/scroll behind it moves 0px (EN + AR). |
| L3 | Browser-language validation on AR form | **Fixed** | AR shows "عبّ هالخانة لو سمحت" / "اكتب إيميل صحيح"; focus goes to the first empty field. (Small wording nit for the dropdown in L-D.) |
| L4 | Language switch drops `?service=` | **Fixed** | `contact.html?service=geo` → `ar/contact.html?service=geo` and lands with GEO selected; AR → EN same. |
| L5 | Arabic nits | **Fixed, one follow-up** | "يؤكد / نؤكد" fixed; digits now all Western ("2 الفجر", "4:00"). The "ولا ينْشر" fix became "يننشر" — see L-C. "شركة برمجة" (H1) vs "شركة برمجيات" (kicker/footer) still mixed: Bilal's call, not a bug. |
| L6 | Unsupported "Most businesses lose customers…" | **Fixed** | Now "Slow replies lose customers." / "الرد المتأخر يضيّع زبائن." |
| L7 | Reveal content blank in print/capture | **Fixed** | `@media print` forces all reveal content visible. |
| L8 | "(optional)" label 3.0:1 | **Fixed** | No contrast failures on contact EN/AR. |
| L9 | WhatsApp float covers hero "See details" | **Fixed** | `.svc-stack a` gets `padding-inline-end:4.5rem` under 860px. |
| L10 | README/.gitignore would be published | **Fixed** | `build-dist.sh` builds `dist/` with site files only (see below). |
| L11 | Google Fonts render-blocking | **Fixed** | Fonts in `fonts/` (woff2 + licences), 0 requests leave the site, no `googleapis`/`gstatic` anywhere. |

## Open issues (all Low)

**L-A. Some tap targets still under 44px on phones (rest of M4)**
- Breadcrumb links ("Home", "Services", "AI agents" / "الرئيسية", "خدماتنا") are 16–18px tall on every inner page at 390.
- Contact page side card: email 26px, WhatsApp number 26px, "@bracketkw" 23px tall (EN + AR).
- Mobile menu main links: "How we work" / "طريقة شغلنا" 31–36px, "Contact" / "تواصل معنا" 31–36px, language link 31–36px (the service sub-links are now 44px).
- Fix: add `.crumbs a, .side-block a, .mobile-nav > a:not(.btn)` (or whatever selects the menu's top-level links) to the existing `@media (max-width:860px){ … min-height:44px }` rule, with `display:inline-flex; align-items:center`.

**L-B. EN service-page hero CTA falls just below the fold on small laptops**
- Pages: all 8 EN service pages at 1280×720 (CTA bottom 745–806px); `services.html`, `customer-agent.html`, `sales-agent.html` also at 1366×768 (775–807px). 1440×900 and 390 pass; all AR pages pass (H1 is smaller); home passes.
- Why Low: the header "Get a quote" button is always on screen, so a CTA is still in the first viewport.
- Cause: EN service H1 is 88px and starts at 240px.
- Fix: cap the service-page H1, e.g. `clamp(2.5rem, 5.2vw, 4.75rem)`, and/or trim the hero top padding ~40px. Re-check CTA bottom < 720 at 1280×720.

**L-C. The word "يننشر" on `ar/index.html` (the "بموافقتك" card)**
- Line now: «ما ينطلق شي ولا **يننشر** ولا ينرسل بدون موافقتك.» (EN: "Nothing goes live, posts or sends without your yes.")
- It isn't a keyboard typo: it's the spoken Gulf passive (yinnashar, same pattern as "ينرسل" next to it), and it came from my own first-round suggestion. But written with two nūns most readers will see it as a typo.
- Should be: «ما ينطلق شي ولا **يُنشر** ولا **يُرسل** بدون موافقتك.» (written passive with the damma, clear to every reader). If websitebuilder wants to keep it spoken Gulf instead: «ما ينطلق شي، ولا ينزل منشور، ولا تطلع رسالة بدون موافقتك.»

**L-D. Smaller Arabic wording nits** (the Arabic otherwise reads natural and Gulf)
- `ar/apps.html` FAQ: «تحت أي حسابات مطورين **ينشر** التطبيق» → «**يُنشر** التطبيق» (should be passive).
- `ar/404.html`: «الصفحة اللي **تدورها**» → «الصفحة اللي **تدوّر عليها**».
- `ar/contact.html` (contact.js): the dropdown's empty message is «عبّ هالخانة لو سمحت» ("fill this field"), which doesn't fit a dropdown → for the select use «اختار من القائمة لو سمحت».
- `ar/index.html` demo chat: «**راح** أرسل لك تذكير» → «**برسل** لك تذكير» (more Kuwaiti); label «وكيل ذكاء اصطناعي **تجربة**» → «**تجريبي**».
- `ar/privacy.html`: «إذا أضفنا يوم أدوات تحليل» → «إذا يوم أضفنا أدوات تحليل».

**L-E. Contact form with JavaScript off**
- It works (form `action="mailto:bracketkw@gmail.com"`, opens the email app with name/email/company/type/message), but:
  1. `novalidate` on the form means an empty form can be sent with JS off (tested: empty mailto opens).
  2. In Chromium the AR form's Arabic arrives garbled (`Ù…ÙˆÙ‚Ø¹…`) — Chromium double-encodes UTF-8 in `text/plain` mailto submissions. Browser behaviour, not a site bug.
- Fix: remove `novalidate` (contact.js still catches `submit`, and the browser validates first; the Arabic `invalid` messages still apply), and add a `<noscript>` line under the button: "Or email us at bracketkw@gmail.com" / «أو راسلنا على bracketkw@gmail.com». With JS on (nearly everyone) both EN and AR are clean.

## Regression results (all pass)

- **Console / network:** 128 runs, 0 JS errors, 0 failed requests, 0 requests to other domains. Fonts load from `/fonts/` (Archivo, IBM Plex Sans Arabic, JetBrains Mono). Pages ~7–200 KB transferred incl. fonts.
- **CSP:** served with `_headers` policy (`script-src 'self'`, `font-src 'self'`, `form-action 'self' mailto:` …): 0 violations on all 34 HTML files; contact mailto still fires.
- **Links:** every internal href, anchor, icon, CSS, JS and font resolves (404 pages use root paths `/site.css` etc. so they work at any URL depth). All mailto = `bracketkw@gmail.com` (careers adds `?subject=Careers`).
- **Layout:** no horizontal scroll and no element off-screen on any page at 1440 / 1280 / 390 / 768. (The script's "overlap" hits are text inside closed FAQ `<details>`, not visible — same as last round.)
- **Hero CTA:** home EN/AR in the first viewport at 1440, 1280, 390. 404 pages: button at 403–489px. Service pages: see L-B.
- **Nav:** dropdown opens by click/Enter/Space, closes on outside click, Esc (focus back to button) and tab-out; `aria-expanded` right; current page has `aria-current`; 3px focus ring on every item. Mobile menu opens/closes, label switches (Open/Close menu, افتح/سكّر القائمة), Esc closes, links close it, page behind is locked, closed menu not focusable.
- **Language switch:** correct twin on every page both ways; keeps `?service=` on contact.
- **WhatsApp:** float on every page, `https://wa.me/96599494186?text=Hi Bracket, I'd like a quote.` / `هلا Bracket، أبي عرض سعر.`, `target=_blank`, aria-label in both languages; every `.js-wa` link correct.
- **Contact form (JS on):** EN uses the browser's English messages, AR uses Arabic ones; focus to first invalid field; bad email rejected; valid submit opens `mailto:bracketkw@gmail.com` with subject "Project brief from …" / "طلب مشروع من …" and a clean body; status line shows. `?service=` preselects (websites, apps, all 4 agent types + ai-agents → "not sure which", seo, geo); bogus slug leaves the placeholder.
- **Contrast / focus:** 0 failures; red band 5.09:1; white focus ring on the band.
- **SEO/GEO:** 1 H1 per page; titles ≤ 58, descriptions ≤ 155, all unique; absolute canonicals on all indexable pages; hreflang en/ar/x-default reciprocal on all 26 indexable pages; OG + Twitter on all except the 404s (fine, noindex); JSON-LD parses everywhere (Organization+ProfessionalService, WebPage, WebSite, Service, FAQPage, BreadcrumbList, ItemList, ContactPage). `noindex, follow` only on work, careers, booking, 404 (EN + AR). `sitemap.xml`: 26 URLs, all exist, alternates exist, none of the noindex pages listed. `robots.txt` allows all + named AI crawlers, points to the sitemap. `llms.txt` matches the profile (5 services, no prices, no case studies, privacy link, AR section). `https://DOMAIN/` placeholder still in source by design — `build-dist.sh <domain>` fills it.
- **Content rules:** 0 "studio"; "agency/agencies" only as a customer type ("real estate agencies"); 0 prices; 0 stats/percentages/testimonials/client names; every "guarantee"/"ضمان" is a "we don't guarantee"; no reply-time or turnaround promises. Privacy page promises nothing beyond what the site really does.
- **build-dist.sh:** ran in `/tmp` copy with planted `.DS_Store` files → `dist/` has 66 files: 34 HTML, `site.css`, `site.js`, `contact.js`, `bracket-config.js`, `og-image.png`, `bracket-lockup-1A.png`, `robots.txt`, `sitemap.xml`, `llms.txt`, `_headers`, `vercel.json`, 15 woff2 + 3 font licences, 3 icons. **No** `README-LAUNCH.md`, `.gitignore`, `build-dist.sh`, `.DS_Store` or other dot-files. Every file the pages and CSS reference is present. `build-dist.sh https://example.com` leaves 0 `DOMAIN` strings in `dist/`.

## Notes for websitebuilder

One short pass: L-C (one word) → L-A (one CSS selector list) → L-B (H1 clamp) → L-D/L-E. None of these block a staging deploy. Scripts for the next re-run are in `/tmp/qa2/` (static.py, sweep.js, interact.js, csp.js, cspserver.py) if the sandbox is still up.
