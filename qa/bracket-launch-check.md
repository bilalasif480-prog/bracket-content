# Launch check: Bracket website (retest 18 Nov 2026)
Verdict: **Not ready: 2 blockers, both deploy-time only** (pick the domain + check HTTPS/headers on staging). Nothing left to fix in the code before a staging deploy.
Platforms checked: web only (static HTML/CSS/JS, `/home/claude/site-build/`, served locally, once plain and once with the site's own `_headers`). App-store sections skipped: no mobile app.
Task: T-20261118-12 (first run T-20261118-08) · Agent: websiteqa · Read-only, nothing changed.

The site is static: no backend, database, login, admin, payments, uploads or AI calls. The contact form builds a `mailto:` link in the browser; WhatsApp is a `wa.me` link. Since the first run: privacy page added, fonts self-hosted, security headers + 404 routing written for Netlify/Cloudflare (`_headers`) and Vercel (`vercel.json`), 404 pages added, and `build-dist.sh` builds a clean `dist/`.

## What changed since the first run

| First-run blocker | Now |
|---|---|
| 1. No privacy page | **Fixed.** `privacy.html` + `ar/privacy.html`, linked in every footer, in sitemap + llms.txt. Says what is collected (nothing stored by the site; mailto form; Gmail/Meta), no cookies/analytics, fonts self-hosted, host server logs, deletion by email. Bilal approves the wording (check Kuwait rules with a lawyer if he wants certainty). |
| 2. `https://DOMAIN/` placeholder | **Handled at build time.** `./build-dist.sh https://<domain>` fills every placeholder in `dist/` and fails if any `DOMAIN` is left (tested with example.com: 0 left). Still a blocker until the domain is chosen. |
| 3. Hosting security not set | **Config written, not yet verifiable.** `_headers` / `vercel.json` set CSP (`default-src 'self'`, `script-src 'self'`, `font-src 'self'`, `form-action 'self' mailto:`, `frame-ancestors 'none'`, `object-src 'none'`, `upgrade-insecure-requests`), HSTS, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, COOP. Tested locally with that CSP: 0 violations on all 34 HTML files, contact mailto still works. Bilingual 404 pages exist and `vercel.json` routes `/ar/*` misses to `ar/404.html`. HTTPS, HSTS and the headers actually being sent can only be checked on the deployed URL. |

## Blockers (deploy-time only)

1. **Domain not chosen** → choose it, run `./build-dist.sh https://<domain>`, deploy only `dist/` (needs Bilal's yes in that run's chat).
2. **Verify on staging** (from `README-LAUNCH.md` §0): `curl -sI https://<domain>/` shows CSP, HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy; HTTP redirects to HTTPS; `/.git/HEAD`, `/.gitignore`, `/README-LAUNCH.md`, `/build-dist.sh` return 404; `/nope` and `/ar/nope` show the right 404 page; `booking.html` forwards to contact. Then re-run websiteqa on the staging URL.

## Attack test (1A)

| # | Attack | Result | Evidence |
|---|---|---|---|
| 1 | Read the API map | N/A | Only same-origin files load (HTML, CSS, 3 small JS files, woff2 fonts, icons). 0 requests to other domains. No API, DB URL or webhook. |
| 2 | Find secrets in the code | PASS | Nothing secret in HTML/JS; `bracket-config.js` holds only the public WhatsApp number. |
| 3 | Read the whole database | N/A | No database. |
| 4 | Change an id (IDOR) | N/A | No user data or ids. |
| 5 | Open admin without login | N/A | No admin. |
| 6 | Bot sign-ups | N/A | No sign-up; the form sends nothing to a server. |
| 7 | Fake a payment | N/A | No payments. |
| 8 | Make yourself admin | N/A | No accounts. |
| 9 | Break the rules | N/A | `?service=` only preselects a dropdown option by exact match; unknown values ignored (tested). |
| 10 | Brute force | N/A | No login/OTP. |

## Full checklist

| Section | Item | Result | Evidence / note |
|---|---|---|---|
| 1B Secrets | No secret keys in front-end | PASS | Only the public WhatsApp number. |
| 1B Secrets | Git history / rotation | N/A | Nothing secret exists. |
| 1B Access / Login / Payments / AI | All items | N/A | No server, accounts, payments or AI calls. |
| 1B Input/output | Escaping, no XSS sink | PASS | Form values only go into an `encodeURIComponent` mailto; nothing user-supplied is written into the page. No inline scripts or `on…=` handlers (CSP-safe). |
| 1B Input/output | Uploads, SSRF, open redirect | N/A | None; `booking.html` meta-refresh goes to a fixed local page. |
| 1B Transport | HTTPS, redirect, HSTS | Deploy-time (blocker 2) | HSTS in config; HTTPS/redirect set by the host. |
| 1B Transport | Security headers | Config PASS, live check pending | `_headers` + `vercel.json`; CSP tested locally with 0 violations. |
| 1B Transport | CORS | N/A | No API. |
| 1B Deps | No vulnerable dependencies | PASS | No runtime dependencies; no third-party CSS/JS/fonts. |
| 1B Deps | Debug/test routes off | PASS | None. `dist/` excludes README, `.gitignore`, `build-dist.sh`, dot-files. |
| 1B Deps | Errors don't leak | PASS | 0 console errors, 128 page/viewport runs. |
| 1B Links | External links safe | PASS | WhatsApp `target=_blank rel=noopener`. |
| 1C / 2 | Mobile app / stores | N/A | No app. |
| 3 Privacy | Privacy page linked in footer | PASS | EN + AR, every page. Bilal to approve wording. |
| 3 Privacy | Data collected + third parties listed | PASS | Gmail (Google), WhatsApp/Instagram (Meta), host server logs. |
| 3 Privacy | Cookie / tracking consent | PASS | No cookies, analytics or pixels; Google Fonts removed. If analytics are added later: update privacy page + CSP first, add consent. |
| 3 Privacy | Data deletion on request | PASS | Email bracketkw@gmail.com, stated on the page. |
| 3 Privacy | Marketing only with consent | PASS | Site subscribes nobody. |
| 3 Privacy | No fake reviews/stats/logos | PASS | None; honest "no case studies yet" line; the old "Most businesses…" generalisation is gone. |
| 4 Prod | Env separation / `.env.example` | N/A | No secrets/config. |
| 4 Prod | Automated tests / CI | N/A (note) | QA scripts in `/tmp/qa2/`; worth keeping in a repo for re-runs. |
| 4 Prod | Error tracking / uptime | Open (minor, after deploy) | Add a free uptime check on the home page. Not a blocker. |
| 4 Prod | Backups | PASS | Static files in git. |
| 4 Prod | Friendly 404 | PASS (routing verified at deploy) | `404.html` + `ar/404.html`, noindex, root-relative paths so they render at any URL depth. |
| 4 Prod | Fast on a phone | PASS | Small pages, no images except icons/OG; fonts are local woff2 subsets. |
| 4 Prod | README / deploy steps | PASS | `README-LAUNCH.md` covers dist build, domain fill, header checks, sitemap submission, GBP. |
| 4 Prod | Only site files published | PASS | `build-dist.sh` → 66 files, all public site files, everything referenced present. |

## Before Bilal says yes to deploy

- Optional polish first (all Low, see `qa/bracket-report.md`): the "يننشر" word on the Arabic home, remaining small tap targets, service-page H1 size at 1280×720, Arabic nits, the no-JS form.
- Bilal approves the privacy page wording.
- Choose the domain → `./build-dist.sh https://<domain>` → deploy `dist/` to staging (with Bilal's yes) → run the blocker-2 checks → re-run websiteqa + this launch check on the staging URL.
