# QA report: Bracket website — UK retarget, 22 Nov 2026 (T-20261122-17, QA half)

Agent: websiteqa · Site: `/Users/bilal/Desktop/bilal copy/Website/` (final site, not deployed), read through the device shell and copied into the cloud (no `_backups/`, `_build/`; `export/` only for the 3 icon files the pages use, checksums matched) · Served with `python3 -m http.server`, plus a second server sending the site's own `_headers` CSP · Profile: `business/bracket.md` (22 Nov UK update) · Spec: `geo/bracket-uk-plan.md` · **Read-only: no site file was changed.**

## Overall: FAIL (1 High)

| Severity | Count |
|---|---|
| Critical | 0 |
| High | 1 |
| Medium | 2 |
| Low | 7 |

The page code itself is clean: 0 console errors, 0 failed requests, 0 requests to other sites, 0 broken internal links, no horizontal scroll, 0 Arabic characters, no RTL styling, no KD/KWD/KNET/Gulf, no "studio"/"agency" (only "not an agency" in `llms.txt`), no prices, no reply-time promises, no invented stats, clients or reviews. What fails is the **share image**: `og-image.png` still says "SOFTWARE HOUSE · KUWAIT" and has an Arabic slogan, and every page uses it.

## UK retarget findings

### High

**H1. Share image (`og-image.png`) has Arabic text and "Kuwait" as the label — every page**
- Proof: `og-image.png` (1200×630, dated 18 Nov) shows the kicker "SOFTWARE HOUSE · KUWAIT" and the Arabic line "برمجيات تنجز الشغل." under "Software that gets it done.". 24 HTML files use it as `og:image` / `twitter:image`, and it is also the schema `image` on `#org`. So every WhatsApp, LinkedIn, Facebook or X share of any page shows Arabic and "Kuwait" as the market, while the `og:image:alt` text describes a UK image.
- Breaks: English only / no Arabic (profile §4), UK target (profile §1).
- Fix (websitebuilder): re-render `og-image.png` at 1200×630 with the same layout: no Arabic line; kicker e.g. "SOFTWARE HOUSE · FOR UK BUSINESSES" (or "BASED IN KUWAIT · UK CLIENTS"). Keep the file name so no page has to change.

### Medium

**M1. Lines published that the geo plan said need Bilal's OK first**
- `geo/bracket-uk-plan.md` "Decisions for Bilal" 3, 5 and 6, and §3 ("Only include the … 'you own the domain' … answers once Bilal confirms"). No confirmation is recorded on the task board or in `business/bracket.md`.
- Proof:
  - Decision 3, ownership: `about.html` "You own your domain, code and accounts."; `manchester.html` list "You own your domain, code and accounts, set up in your name" and FAQ "Who owns the website and domain? You do. The domain, code and accounts are set up in your name and handed over at launch." (also in the FAQPage schema). Note that it says "code" too, which is more than the plan's wording.
  - Decision 5, listing name: `alternateName` "Bracket Software House" in the schema on all 25 pages.
  - Decision 6, article #6: dropped (301 to `articles.html`). This matches the plan's recommendation.
- Why Medium: if Bilal doesn't agree to the ownership promise, the site makes a promise he hasn't made. 
- Fix: PM asks Bilal to confirm 3, 5 and 6. If he says no to 3, remove those 3 lines plus the matching FAQPage entry.
- "UK-friendly hours" is fine: `business/bracket.md` §3 already says it.

**M2. Privacy page wasn't updated for UK visitors (UK GDPR basics)**
- Proof: `privacy.html` still says "Last updated 18 Nov 2026". It doesn't mention: the lawful basis for using enquiry data (replying to an enquiry or preparing a quote); that data is handled from Kuwait, i.e. outside the UK; how long emails and WhatsApp chats are kept; the right to complain to the ICO. Since 22 Nov the site targets UK businesses, so UK GDPR rules on transparency apply.
- Fix: websitebuilder adds a short "If you're in the UK" block covering those four points and updates the date. Bilal checks the wording with an adviser if he wants certainty (this is not legal advice). It's not a code bug, so not a blocker, but it should be done before launch.

### Low

**L1. `manchester.html` title is 62 characters (plan rule: ≤ 60).** "Websites, Apps & AI Agents for Manchester Businesses | Bracket". Google may cut it. It is the plan's own string. Fix: "Websites, Apps & AI Agents for Manchester | Bracket" (51).

**L2. Home H1 is longer than the plan.** `index.html` H1 is "Websites, apps and AI agents for UK businesses — and we get you found." Plan: "Websites, apps and AI agents for UK businesses". The keyword is still there at the start, so this is a style call for Bilal, not a bug.

**L3. `careers.html` meta description is 109 characters** (others are 140–155). The page is `noindex`, so it hardly matters.

**L4. `README-LAUNCH.md` is out of date.** It says "`work.html` and `careers.html` are `noindex`", but `work.html` has no robots meta and is in `sitemap.xml`. That was already true before this change (the 22 Nov backup's `work.html` has no robots meta either). Fix the README, or add `noindex` to work.html if Bilal still wants it hidden.

**L5. Some tap targets on phone are under 44px (left over from the 18 Nov L-A).** At 390px: `contact.html` side card email 39px, WhatsApp 41px, Instagram 42px; `articles/website-cost-uk.html` "Related" link "How long does it take to build…" 17px, and the Manchester link 43px. Home, manchester, about and websites have none.

**L6. Schema logo is a design sheet, not a logo.** The `#org` `logo` is `bracket-lockup-1A.png`. That file is a presentation board with "1A · FLANK" and "BRACKETS HOLD THE LINE" written on it, so Google could show that as Bracket's logo. This predates the retarget. Fix: export a clean square `[ BRACKET ]` PNG (at least 112×112) and point `logo` at it.

**L7. Harmless leftovers from the bilingual site.** `about.html` has one `dir="ltr"` span (the [ B ] mark). `bracket-3d.js` still checks `document.documentElement.dir==="rtl"`, which is now never true. Neither changes anything on screen. Clean up next time the files are touched.

### Passed (UK retarget checklist)

| Check | Result | Evidence |
|---|---|---|
| Pages load, desktop 1440×900 + phone 390×844 | PASS | 25 pages + `booking.html` × 2 viewports: all 200, 0 console errors (only 2 WebGL "GPU stall" *warnings* from headless Chromium on 404/about, not site errors), 0 failed requests, 0 external requests |
| Same with the real CSP from `_headers` | PASS | 26 pages, 0 errors/violations; 3D + WhatsApp float load on every page |
| Nav + Services dropdown | PASS | Hover opens, click on SEO goes to `seo.html`, Enter opens (`aria-expanded=true`), Esc closes. Items: Websites, Mobile apps, AI agents, SEO, GEO, All services |
| Mobile menu | PASS | Hamburger shows at 390 and the desktop nav hides. Tap opens it (`aria-expanded=true`, page scroll locked) with 10 links, every one 44px tall and hit-tested. Taps go to articles/how-we-work/geo/contact and the menu closes. No language link |
| Internal links / anchors | PASS | Every `<a href>` on 26 pages resolves to an existing file; `#` anchors exist |
| Manchester page reachable | PASS | Linked from 25 pages: the footer everywhere, plus the body of home, services, websites, apps, ai-agents, seo, geo and about. 890 words in `<main>`. Honest: "Kuwait (no UK office)", no Manchester address, no `LocalBusiness` |
| 5 articles reachable | PASS | All 5 are listed on `articles.html` (in the top nav, mobile menu and footer) and cross-linked from 2–4 pages each. Old Kuwait slugs are gone and 301 |
| No language switch / Arabic / RTL | PASS | 0 Arabic characters in HTML/CSS/JS/txt/xml/json; 0 `hreflang`; no `og:locale:alternate`; `<html lang="en-GB">` with no `dir`; 0 elements with computed `direction: rtl`; Arabic font gone from `site.css` |
| KD/KWD/KNET/Gulf, prices | PASS | None. £ isn't used anywhere either. "No prices" is stated plainly (manchester side card "Written scope and quote per job"). No `Offer` has a price |
| "Kuwait" only as location / time difference | PASS | All 186 matches checked: "based in Kuwait", "Kuwait (no UK office)", "from Kuwait", "Kuwait is 3 hours ahead…", schema `addressCountry: KW`, redirect source slugs |
| studio / agency | PASS | Only `llms.txt` "software house (not an agency)" |
| Reply-time / turnaround promises | PASS | None. "We agree a timeline in the scope" and "We don't give a number of weeks". The customer-agent line "Customers get a reply at any hour" describes the agent, not Bracket |
| Invented stats / clients / testimonials | PASS | No %, multipliers, client names, logos, reviews or ratings. Use cases say "examples — not client stories" |
| British spelling (visible text, meta, JSON-LD) | PASS | 0 hits for -ize/-yze, color, center, inquiry, license (noun), program, catalog, favorite, behavior, etc. in rendered text. US spellings appear only in CSS property names (`color`, `center`) |
| Titles / metas / H1 vs plan | PASS except L1, L2 | 16 plan rows compared. All titles and metas match word for word (only differences: curly ’ for ', and the contact H1 has a full stop). One H1 on every page |
| JSON-LD | PASS | Every block parses. `#org`: `areaServed` UK + Manchester, `address` KW only, `knowsLanguage` en, `availableLanguage` English, `contactPoint.areaServed` GB. `inLanguage` en-GB, `dateModified` 2026-11-22. 79 FAQ Q&As, all matching visible text word for word |
| Sitemap | PASS | 23 URLs, all files exist. Leaves out only 404, booking (redirect) and careers (noindex). No `/ar/` and no `xhtml:link` |
| `_redirects` vs `vercel.json` | PASS | 36 = 36 rules, same sources and targets, catch-all `/ar/*` last in both. Every target exists. In `vercel.json` the redirects sit before `handle: filesystem` |
| `llms.txt`, `robots.txt` | PASS | `llms.txt` matches plan §5a with the 5 new article slugs; `robots.txt` is unchanged and has its Sitemap line |
| Loader | PASS, same as before | `loader.js`/`loader.css` are unchanged since before this task. First visit: `[ BRACKET ]` 000→100. The `bk:loaded` event fires at ~1.88–1.90 s on home, manchester and articles at both sizes (matches the 22 Nov PM note "~1.9 s"). Not shown again in the same session. Googlebot UA gets no loader and no 3D |
| 3D | PASS | `bracket-3d.js` loads after the loader on all 26 pages; 1 canvas per page (1440×933 on desktop); 0 errors |
| Phone layout | PASS | `scrollWidth` = 390 on all 26 pages, no element past the right edge |
| Contact WhatsApp / email | PASS | Every `wa.me` link and the floating button → `https://wa.me/96599494186?text=Hi%20Bracket%2C%20I%27d%20like%20a%20quote.` (new tab, noopener). mailto → `bracketkw@gmail.com` (careers: `?subject=Careers`). Form: `?service=geo` preselects GEO; empty submit is blocked (3 invalid fields); a valid submit opens `mailto:bracketkw@gmail.com?subject=Project%20brief%20from%20…` and shows the status line |
| `booking.html` | PASS | Forwards to `contact.html`, `noindex` |
| `build-dist.sh` | PASS | In a copy, with `https://example.co.uk`: 56 files, includes `manchester.html` + 5 articles, no `ar/` or `_backups/`, 0 `DOMAIN` left |

## How it was tested
- Playwright 1.64.1 driving the cloud's headless Chromium. Navigator `webdriver` was hidden and a desktop/iPhone UA set, so the loader and 3D run as they do for real visitors. A separate run used the Googlebot UA.
- 52 page runs (26 × 2 viewports), then targeted runs for the dropdown, mobile menu, contact form, loader timing, CSP and tap targets.
- Static checks in Python: regex scans of source and rendered text, JSON-LD parse plus FAQ matching against visible text, link and anchor resolution, sitemap, redirect parity, plan comparison.
- Not covered: real Safari/iOS, and anything that needs a deployed URL (HTTPS, headers actually sent, redirects actually served). Those are in `qa/bracket-launch-check.md`.

## Earlier rounds
- 18 Nov 2026 retest (T-20261118-12): PASS, 0C/0H/0M/5L. Of those Lows, L-A (tap targets) is partly still open as L5 above. The others were Arabic-only or have been superseded by the redesign and the UK retarget.
