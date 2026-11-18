# QA report: Bracket website rebuild (T-20261118-08)

Agent: websiteqa · Date: 18 Nov 2026 · Build: `/home/claude/site-build/` (not deployed, served locally with `python3 -m http.server`)
Profile: `business/bracket.md` · Checklists: `design/bracket-design.md` §5 "QA after build", `geo/bracket-audit.md` per-page targets
Read-only: no site files were changed.

## Overall: FAIL (small fixes, no blockers in function)

| Severity | Count |
|---|---|
| Critical | 0 |
| High | 1 |
| Medium | 5 |
| Low | 11 |

The site works: 28 pages (14 EN + 14 AR) plus 2 redirects, all load with zero console errors (the only failures are the blocked Google Fonts requests, which is expected in this sandbox), zero broken links/anchors/assets, no horizontal scroll or off-screen elements at 1440 / 390 / 768, nav dropdown + mobile menu + language switch + WhatsApp + contact form all behave correctly in EN and AR. It fails on one explicit design QA rule (home hero CTA not in the first viewport at 1440) and a handful of contrast / tap-target / title-length items. One websitebuilder pass should clear everything.

## What was tested

- 28 pages × 3 viewports (1440×900, 390×844 mobile/touch, 768×1024) with Playwright (Chromium headless): console errors, failed requests, horizontal scroll, elements outside the viewport, overlap, hidden content, tap targets, text contrast, page weight. Screenshots looked at for home EN/AR (1440 + 390), websites EN/AR (390), services EN (768) and AR (390), contact EN (1440) and AR (390), customer-agent AR (1440).
- Nav: Services dropdown by click, outside click, keyboard (Tab, Enter, Space, Esc, tab-out), `aria-expanded`, `aria-current`; mobile menu tap/Esc/link-tap; language switch on all 28 pages.
- WhatsApp float + `.js-wa` links, mailto links, contact form EN + AR (empty, bad email, valid submit → mailto, `?service=` for all 9 slugs + a bogus one).
- Content rules grep + read (prices, studio/agency, stats, testimonials, guarantees, reply-time promises), Arabic copy read on index, websites, contact, customer-agent.
- SEO/GEO: titles, descriptions, H1, canonical, hreflang reciprocity, OG/Twitter, JSON-LD parse + types, robots meta, robots.txt, sitemap.xml (every URL + alternates vs page tags), llms.txt, og-image.
- Accessibility: contrast (computed), focus-visible, labels, heading order, tap targets, `prefers-reduced-motion`, no-JS.

## Bugs

### High

**H1. Home (EN) hero CTA is below the fold at 1440**
- Page: `index.html` · Viewport: 1440×900
- Steps: open `/index.html` at 1440×900, don't scroll.
- Expected: "Get a quote" visible on first paint at 390 and 1440 (design §5 QA rule, §3.1 "CTA visible on first paint").
- Actual: H1 renders at ~80px over 6 lines (bottom at 691px); the CTA sits at 994–1046px, below the 900px fold. The right-hand service list is pushed to the bottom, leaving a big empty block top-right. At 390 the CTA is visible (bottom 712/844). The Arabic home at 1440 is fine (CTA at ~790px).
- Fix: cap the EN hero H1 size, e.g. `.hero-h1{ font-size:clamp(2.25rem, 4.4vw, 4rem) }` (the AR override already uses 3.875rem max), and set `.hero-split{ align-items:start }` (or `align-self:start` on `.svc-stack`) so the service list sits beside the H1. Re-check that CTA bottom < 900px at 1440×900 and 1280×720.

### Medium

**M1. 12 English titles are over 60 characters (Google truncates)**
- Pages / lengths: `websites.html` 82, `contact.html` 80, `ai-agents.html` 74, `services.html` 74, `index.html` 73, `sales-agent.html` 71, `customer-agent.html` 67, `geo.html` 67, `seo.html` 65, `marketing-agent.html` 64, `apps.html` 63. (`custom-agent.html` 53 OK; all 14 AR titles are ≤58.) Descriptions are all ≤155.
- Expected: ≤60 characters, unique.
- Fix (suggested, keep the keyword first; update `<title>`, `og:title`, `twitter:title` and JSON-LD `WebPage.name` together):
  - index: `Bracket — Software House in Kuwait | Websites, Apps & AI` (56)
  - services: `Services: Websites, Apps, AI Agents, SEO & GEO | Bracket` (56)
  - websites: `Website Development in Kuwait | Bracket` (39)
  - apps: `Mobile App Development in Kuwait — iOS & Android | Bracket` (57)
  - ai-agents: `AI Agents for Businesses in Kuwait | Bracket` (44)
  - seo: `SEO in Kuwait — Get Found on Google | Bracket` (45)
  - geo: `GEO in Kuwait — Get Cited in AI Answers | Bracket` (49)
  - customer-agent: `WhatsApp AI Customer Agent in Kuwait | Bracket` (46)
  - sales-agent: `AI Sales Agent in Kuwait — Leads & Outreach | Bracket` (52)
  - marketing-agent: `AI Marketing Agent in Kuwait | Bracket` (37)
  - contact: `Contact Bracket — Get a Quote | Kuwait` (38)

**M2. Text on the red CTA band fails contrast (4.20:1)**
- Pages: every page with the red `.cta-band` (all except contact, work), EN + AR, all viewports.
- Expected: ≥4.5:1 for normal-size text.
- Actual: white / white-85% on `#ec3013` = 4.20:1 for the kicker ("Let's start" / "يلا نبدأ"), the lede line, and the outline button label ("See services", "All services", "Get a quote" on careers).
- Fix: give the band its own darker red, e.g. `.cta-band{ background:#d4290f }` (5.09:1 with white) or `#cf280e` (5.3:1), and use solid `#fff` (not 85–88% alpha) for kicker and lede. Keep `--accent` as is elsewhere.

**M3. Focus ring is invisible on the red CTA band**
- Pages: all pages with `.cta-band` · any viewport · keyboard
- Steps: Tab to the "Get a quote" / "See services" buttons inside the red band.
- Expected: visible focus indicator (≥3:1 against the background).
- Actual: global `:focus-visible{ outline:3px solid var(--accent) }` draws a red ring on a red background.
- Fix: `.cta-band :focus-visible{ outline-color:#fff }` (and the same for any other red-background area).

**M4. Tap targets under 44px on phone (390)**
- Pages: all, 390 viewport.
- Actual: footer links 17px tall with ~10px gaps (Services, Websites, agents, email, Instagram, "Get a quote"); "Back to top" 15px; service-card "See details" links 17px; mobile-menu service links 23px (EN) / 26px (AR); header logo 28px. Buttons, menu button (44×44), FAQ rows and form fields are fine.
- Expected: ≥44×44px (brief) — at minimum 24px with spacing (WCAG 2.5.8).
- Fix: `@media (max-width:860px){ .foot-col a, .back-top, .alink, .mobile-nav .m-sub a{ display:inline-flex; align-items:center; min-height:44px } }` and reduce the list gaps to compensate; `.brand{ min-height:44px; display:inline-flex; align-items:center }`.

**M5. No privacy page**
- Pages: site-wide footer.
- Expected (launch-check §3): a privacy page in EN + AR linked in the footer, saying what the form/email/WhatsApp collects, that Google Fonts is loaded from Google, and how to ask for deletion.
- Actual: none. The form doesn't store anything (it opens the user's email app), so the page can be short.
- Fix: add `privacy.html` + `ar/privacy.html` (plain, no legal promises Bilal hasn't confirmed), link in the footer "Bracket" column, add to sitemap + llms.txt. Bilal to confirm wording; flag to check Kuwait's data rules with a lawyer if he wants certainty.

### Low

**L1. Heading levels skip.** Footer column titles are `<h4>` straight after `<h2>` on every page (and after `<h1>` on work); contact sidebar uses `<h3>` after `<h1>`. Fix: footer titles → `<h2 class="foot-h">` (styled the same) or `<p>`; contact side-card titles → `<h2>`.

**L2. Mobile menu doesn't lock the page behind it.** At 390, with the menu open the body still scrolls (`overflow-y:auto`). Fix: in `setOpen()` toggle `document.documentElement.style.overflow = open ? 'hidden' : ''`.

**L3. Contact form validation messages are the browser's own.** On `ar/contact.html` they show in the browser's language (English in an English-locale browser: "Please fill out this field."). Required fields, email check, focus on first invalid field and the success line all work. Fix (optional): `setCustomValidity` with Arabic text on AR, e.g. "عبّ هالخانة لو سمحت" / "اكتب إيميل صحيح".

**L4. Language switch drops `?service=`.** On `contact.html?service=geo` the "العربية" link goes to `ar/contact.html` without the preselect. Fix: in site.js, append `location.search` to `a.lang` hrefs on contact pages.

**L5. Arabic copy nits** (overall the Arabic reads natural and Gulf, not machine-translated; Bilal should still skim):
- `ar/index.html` demo list "يحجز، يأكد، ويذكّر" and `ar/websites.html` FAQ "ونأكد لك" → "يأكّد"/"نأكّد" is colloquial spelling; standard is "يؤكد" / "نؤكد لك".
- `ar/index.html` "ولا ينْشر" → "ولا يننشر".
- Digits mixed: "الساعة ٢ الفجر" uses Arabic-Indic, the chat uses "4:00 / 5:30". Pick one (Western digits match the rest of the site).
- Home H1 says "شركة برمجة" while kicker/footer say "شركة برمجيات". Fine for SEO (both are search terms), just confirm it's intended.

**L6. One unsupported general claim.** `customer-agent.html` "Most businesses lose customers because replies come too late." (and its AR twin) reads like a stat with no source. Fix: "Slow replies lose customers." / "الرد المتأخر يضيّع زبائن."

**L7. Content hidden until scrolled.** `.reveal` sections start at opacity 0 and only show when the IntersectionObserver fires. In real browsers it works (and reduced-motion + no-JS both show everything — checked), but full-page capture tools and printing show blank blocks, and a very fast fling can leave a section blank for a moment. Fix: `@media print{ .reveal,.reveal-stagger>*,[data-anim]{opacity:1!important;transform:none!important} }`; optionally reveal anything already above the viewport on load.

**L8. `.opt` "(optional)" label contrast 3.0:1** (`--muted-soft #9a948f` on white) on contact EN + AR. Fix: use `--muted` (#6b6663).

**L9. WhatsApp float covers the hero "See details/التفاصيل" link** at 390 on home (EN right, AR left) when the page is at the top. Minor; add `padding-inline-end:4.5rem` to `.svc-stack` on small screens or accept.

**L10. Non-site files would be published.** `README-LAUNCH.md` and `.gitignore` sit in the site root and would be public on deploy. Fix: exclude them from the upload (or move to the repo root).

**L11. Google Fonts is a render-blocking third-party stylesheet** (Archivo 6 weights + Plex Arabic + JetBrains Mono 3 weights). `display=swap` and preconnect are there. Fix later: self-host woff2 subsets for the weights actually used (900/800/600/500 Archivo, 700 Plex Arabic, 500/600 Mono) and preload the hero weight; also removes the Google request from the privacy page.

## Passed checks (evidence)

- **Load / console:** 28 pages × 3 viewports, 0 JS errors, 0 failed requests except blocked Google Fonts (expected here). Redirects `booking.html` / `ar/booking.html` → contact (noindex, follow).
- **Links:** every internal href, anchor (`index.html#process`, `#main`, `#top`), icon, CSS and JS path resolves. All mailto = `bracketkw@gmail.com` (careers adds `?subject=Careers`). No `<img>` on the site, so no alt gaps; decorative SVGs are `aria-hidden`; og:image has alt.
- **Layout:** no horizontal scroll and no element outside the viewport at 1440 / 390 / 768 on any page; sampled screenshots show clean layouts, RTL mirrored correctly (nav, dropdown opening from the right, step dividers, arrows flipped, breadcrumbs), brackets around Arabic service names render as `[ … ]`, phone `+965 9949 4186` is not reversed in AR.
- **Nav:** dropdown opens on click / Enter / Space, closes on outside click, Esc (focus returns to the button) and tabbing out; `aria-expanded` correct; current page marked with `aria-current`. Mobile menu opens/closes, label switches (Open/Close menu, افتح/سكّر القائمة), Esc closes, links close it, hidden menu is not focusable. Language switch goes to the matching page on all 28 pages both ways.
- **WhatsApp:** float on every page (`inset-inline-end`, so left in AR), href `https://wa.me/96599494186?text=Hi Bracket, I'd like a quote.` / `هلا Bracket، أبي عرض سعر.`, opens in new tab, aria-label in both languages. `.js-wa` links rewritten the same way; with no JS they still go to `wa.me/96599494186`.
- **Contact form (EN + AR):** labels on every field; name/email/type/message required; empty submit shows validation and focuses Name; bad email rejected; valid submit opens `mailto:bracketkw@gmail.com` with subject "Project brief from …" / "طلب مشروع من …" and a clean body, and shows the status line. Options cover all 5 services (website, app, 4 agent types + "not sure which", SEO, GEO, not sure). `?service=` preselects correctly for all 9 slugs; unknown slug leaves the placeholder.
- **Content rules:** 0 "studio"; "agency" only as a customer type ("real estate agencies"); 0 prices, `priceFrom`/`carePlan`/`js-price`/`js-care` gone; 0 stats/percentages/testimonials/client names; every "guarantee"/"نضمن" is a "we don't guarantee"; no reply-time or turnaround promise (only "a reply from a person", "a scope and a quote"); honesty line about no case studies present; work page is the honest empty state. Every service has its own page and is reachable in 1 click from every page (nav dropdown + footer + mobile menu).
- **SEO/GEO:** 1 H1 per page; unique titles and descriptions; descriptions ≤155; absolute canonicals; hreflang en/ar/x-default present and reciprocal on all 24 indexable pages; `noindex, follow` only on work, careers (+ booking redirects); OG + Twitter on all pages, `og:locale` en_US / ar_KW; JSON-LD parses on all 28 pages: Organization+ProfessionalService (email, telephone, areaServed Kuwait/GCC, sameAs Instagram, 5 offers), WebPage (`dateModified`), WebSite, Service, FAQPage, BreadcrumbList, ItemList (services), ContactPage. `sitemap.xml`: 24 URLs, all exist, all alternates match the page tags, noindex pages left out. `robots.txt` allows all + named AI crawlers, points to the sitemap. `llms.txt` matches the business profile (5 services, no prices, no case studies, correct email/WhatsApp, AR section). `og-image.png` 1200×630, on-brand, bilingual. All URLs use the `https://DOMAIN/` placeholder (34 files) — replace at deploy per `README-LAUNCH.md`.
- **Accessibility:** skip link (EN + AR), visible 3px focus ring everywhere except the red band (M3), `prefers-reduced-motion` stops the marquee and shows all reveal content immediately, no-JS shows all content via `<noscript>`. Body text, buttons and nav pass contrast except M2/L8.
- **Performance:** pages 11–33 KB HTML, one shared `site.css` (39 KB) and two small scripts (~5 KB), no images except the OG image; total ~50–70 KB per page before fonts. No huge inline assets. Only red flag is the Google Fonts CSS (L11).

## Notes for websitebuilder

Fix order: H1 → M2 + M3 (same CSS block) → M4 → M1 → M5 (needs Bilal's OK on wording) → Lows. Re-run websiteqa after; scripts are in `/tmp/qa/` (static.py, sweep.js, interact.js) if this sandbox is still up.
