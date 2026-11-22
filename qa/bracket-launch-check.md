# Launch check: Bracket website, UK retarget (22 Nov 2026)
Verdict: **Not ready: 3 blockers.** 1 content fix (share image) and 2 deploy-time items (domain; HTTPS/headers on staging).
Platforms checked: web only. Static HTML/CSS/JS from `/Users/bilal/Desktop/bilal copy/Website/`, copied to the cloud and served locally, once plain and once with the site's own `_headers`. No mobile app, so the App Store / Google Play sections don't apply.
Task: T-20261122-17 (QA half) · Agent: websiteqa · Read-only, no site file changed. Full QA findings: `qa/bracket-report.md`.

The site is still static: no backend, database, login, admin, payments, uploads or AI calls. The contact form builds a `mailto:` in the browser; WhatsApp is a `wa.me` link. What changed since 18 Nov: Arabic and `/ar/` removed, UK copy, `manchester.html`, 5 renamed articles, 36 × 301 redirects, loader + deferred 3D (`loader.js`).

## Blockers

1. **Share image is Arabic + "KUWAIT".** `og-image.png` is used as `og:image`/`twitter:image` on 24 pages and as the schema image. It shows "SOFTWARE HOUSE · KUWAIT" and "برمجيات تنجز الشغل.". Fix: re-render it in English only with a UK kicker, same file name (report H1).
2. **Domain not chosen.** Pick a `.co.uk` or `.com` (not `.kw`), run `./build-dist.sh https://<domain>`, deploy only `dist/`. Deploying needs Bilal's yes in that run's chat.
3. **Verify on staging** (`README-LAUNCH.md` §0):
   - `curl -sI https://<domain>/` shows CSP, HSTS, X-Frame-Options, nosniff, Referrer-Policy and Permissions-Policy.
   - HTTP redirects to HTTPS.
   - `/.git/HEAD`, `/.gitignore`, `/README-LAUNCH.md`, `/build-dist.sh` return 404.
   - `/nope` shows `404.html`.
   - `/ar/`, `/ar/contact.html`, `/ar/anything` and `/articles/website-cost-kuwait.html` return 301 to the English pages.
   - `booking.html` forwards to contact.

   Then re-run websiteqa on the staging URL.

Not blockers, but do before launch: Bilal confirms the ownership line, the "Bracket Software House" listing name and dropping article #6 (report M1); privacy page gets a UK GDPR block (report M2).

## Attack test (1A)

| # | Attack | Result | Evidence |
|---|---|---|---|
| 1 | Read the API map | N/A | Only same-origin files load. 0 requests to other domains on 26 pages × 2 viewports. No API, DB URL or webhook |
| 2 | Find secrets in the code | PASS | No `key`/`secret`/`sk_`/`service_role`/`password`/`token` in HTML or JS. `bracket-config.js` holds only the public WhatsApp number |
| 3 | Read the whole database | N/A | No database |
| 4 | Change an id (IDOR) | N/A | No user data or ids |
| 5 | Open admin without login | N/A | No admin |
| 6 | Bot sign-ups | N/A | No sign-up; the form sends nothing to a server |
| 7 | Fake a payment | N/A | No payments |
| 8 | Make yourself admin | N/A | No accounts |
| 9 | Break the rules | N/A | `?service=` only preselects a dropdown option by exact `data-slug` match (`?service=geo` → GEO) |
| 10 | Brute force | N/A | No login/OTP |

## Full checklist

| Section | Item | Result | Evidence / note |
|---|---|---|---|
| 1B Secrets | No secret keys in front-end | PASS | See 1A #2 |
| 1B Secrets | Git history / rotation | N/A | Nothing secret exists |
| 1B Access / Login / Payments / AI | All items | N/A | No server, accounts, payments or AI calls |
| 1B Input/output | Escaping, no XSS sink | PASS | Form values only go into an `encodeURIComponent` mailto; no inline scripts or `on…=` handlers |
| 1B Input/output | Uploads, SSRF, open redirect | N/A | None. `booking.html` meta-refresh goes to a fixed local page. All 36 redirect targets are fixed local pages |
| 1B Transport | HTTPS, redirect, HSTS | Deploy-time (blocker 3) | HSTS in `_headers` + `vercel.json` |
| 1B Transport | Security headers | Config PASS, live check pending | Same CSP in `_headers` and `vercel.json`. Served locally with that CSP: 0 violations, 0 errors on 26 pages; loader, 3D, WhatsApp float and mailto all work |
| 1B Transport | CORS | N/A | No API |
| 1B Deps | No vulnerable dependencies | PASS | No runtime dependencies; no third-party CSS/JS/fonts (fonts self-hosted) |
| 1B Deps | Debug/test routes off | PASS | `build-dist.sh https://example.co.uk` → 56 files: pages, 5 articles, assets, fonts, 3 icons. No `_backups/`, `ar/`, README, `.gitignore`, `.git`, or `DOMAIN` left |
| 1B Deps | Errors don't leak | PASS | 0 console errors in 52 page/viewport runs + CSP run |
| 1B Links | External links safe | PASS | WhatsApp links + float `target=_blank rel=noopener`; Instagram `rel=noopener` |
| 1C / 2 | Mobile app / stores | N/A | No app |
| 3 Privacy | Privacy page linked in footer | PASS | Footer of every page; in sitemap |
| 3 Privacy | Data collected + third parties listed | PASS | Gmail (Google), WhatsApp/Instagram (Meta), host logs |
| 3 Privacy | UK visitors (UK GDPR transparency) | OPEN (Medium, not legal advice) | Missing: lawful basis, data handled outside the UK (Kuwait), retention, right to complain to the ICO; still dated 18 Nov. See report M2 |
| 3 Privacy | Cookie / tracking consent | PASS | No cookies, analytics or pixels. If analytics are added later: privacy page, CSP and a consent banner first |
| 3 Privacy | Data deletion on request | PASS | By email, stated on the page |
| 3 Privacy | Marketing only with consent | PASS | Site subscribes nobody |
| 3 Privacy | No fake reviews/stats/logos | PASS | None. "Examples — not client stories"; "No client case studies yet" on `work.html` |
| 3 Honesty (UK) | No implied UK office / address | PASS | "Kuwait (no UK office)", "We don't have a UK office"; schema `address` is KW only, no `LocalBusiness`, no Manchester address |
| 4 Prod | Env separation / `.env.example` | N/A | No secrets/config |
| 4 Prod | Automated tests / CI | N/A (note) | QA scripts were run from the session scratchpad; not kept in the repo |
| 4 Prod | Error tracking / uptime | Open (minor, after deploy) | Add a free uptime check on the home page |
| 4 Prod | Backups | PASS | Pre-UK copy in `_backups/before-uk-2026-11-22/` (never deployed) |
| 4 Prod | Friendly 404 | PASS (routing verified at deploy) | `404.html` noindex. `vercel.json` sends misses to `/404.html`; Netlify/Cloudflare serve it by default |
| 4 Prod | Fast on a phone | PASS | The loader hands over at ~1.9 s. 3D (600 KB) loads only after the page shows, for people only; bots get no loader and no 3D (tested with Googlebot UA). No horizontal scroll at 390 |
| 4 Prod | SEO basics | PASS (2 Lows) | `en-GB`, one H1 per page, canonical, sitemap (23 URLs, all exist), `robots.txt`, `llms.txt`, valid JSON-LD. Lows: manchester title 62 chars; schema logo is a design sheet |
| 4 Prod | README / deploy steps | PASS (1 stale line) | `README-LAUNCH.md` is up to date for UK/no-Arabic, but still says `work.html` is noindex (it isn't) |

## Before Bilal says yes to deploy
1. websitebuilder: new `og-image.png` (blocker 1). Optional at the same time: report M2 privacy block and Lows L1, L4, L5, L6.
2. PM → Bilal: confirm report M1 (ownership line, listing name, article #6) and choose the domain.
3. `./build-dist.sh https://<domain>` → staging deploy (with Bilal's yes) → blocker-3 checks → re-run websiteqa on the staging URL.
