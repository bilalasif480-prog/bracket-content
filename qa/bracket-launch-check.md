# Launch check: Bracket website (18 Nov 2026)
Verdict: **Not ready: 3 blockers** (1 content, 2 deploy-time). Nothing found that is unsafe in the code itself.
Platforms checked: web only (static HTML/CSS/JS, `/home/claude/site-build/`, served locally). App-store sections skipped: no mobile app.
Task: T-20261118-08 · Agent: websiteqa · Read-only, nothing changed.

The site is static: no backend, no database, no login, no admin, no payments, no uploads, no AI calls. The contact form builds a `mailto:` link in the browser; WhatsApp is a `wa.me` link. So most of the attack surface in the checklist doesn't exist. What's left is hosting setup, privacy basics and the placeholder domain.

## Attack test (1A)

| # | Attack | Result | Evidence |
|---|---|---|---|
| 1 | Read the API map | N/A | Network on every page: only `site.css`, `site.js`, `bracket-config.js` + Google Fonts. No API, no DB URL, no webhook. |
| 2 | Find secrets in the code | PASS | Grep of all HTML/JS for key/secret/token/password/`sk_`/`sk-`/analytics: nothing. `bracket-config.js` holds only the public WhatsApp number. |
| 3 | Read the whole database | N/A | No database. |
| 4 | Change an id (IDOR) | N/A | No user data or ids. |
| 5 | Open admin without login | N/A | No admin pages or APIs (no `/admin`, `/dashboard`). |
| 6 | Bot sign-ups | N/A | No sign-up. Form sends nothing to a server (opens the visitor's email app), so no spam endpoint. |
| 7 | Fake a payment | N/A | No payments. |
| 8 | Make yourself admin | N/A | No accounts. |
| 9 | Break the rules | N/A | No business logic server-side. `?service=` only preselects a dropdown option by exact match; unknown values are ignored (tested). |
| 10 | Brute force | N/A | No login/OTP. |

## Blockers

1. **No privacy page** — footer has no privacy link; site collects name/email/message via the visitor's email app, links to WhatsApp/Instagram, and loads Google Fonts (sends visitor IP to Google). — Add a short `privacy.html` + `ar/privacy.html` (what's collected, why, who receives it, how to ask for deletion, contact email), link it in the footer, add to sitemap/llms.txt. Bilal approves the wording; check Kuwait data rules with a lawyer if unsure. (Same as QA report M5.)
2. **`https://DOMAIN/` placeholder in 34 files** (canonicals, hreflang, OG, JSON-LD, sitemap, robots, llms.txt). — Run the replace in `README-LAUNCH.md` §1 once the domain is chosen; `grep -r DOMAIN .` must return nothing.
3. **Hosting security not set yet** (deploy-time; can't be tested before deploy) — HTTPS with HTTP→HTTPS redirect and HSTS; headers `Content-Security-Policy` (allow self + fonts.googleapis.com + fonts.gstatic.com; no inline scripts needed except the contact page handler and JSON-LD — move the handler to a file or use a hash), `X-Content-Type-Options: nosniff`, `frame-ancestors 'none'` / `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`; real 301 for `booking.html` → `contact.html`; custom 404 page. Re-run this check on staging after deploy.

## Full checklist

| Section | Item | Result | Evidence / note |
|---|---|---|---|
| 1B Secrets | No secret keys in front-end | PASS | Only public WhatsApp number in `bracket-config.js`. |
| 1B Secrets | No secrets in git history; rotated | N/A | Site folder is not a git repo here; nothing secret exists to leak. |
| 1B Secrets | Least-power server keys | N/A | No server. |
| 1B Access | Server-side checks, IDOR, RLS, admin, mass assignment | N/A | No server, data or accounts. |
| 1B Login | Hashing, rate limits, bot protection, reset links, cookies, CSRF | N/A | No login, no cookies set by the site. |
| 1B Input/output | Server validation, escaping | PASS / N/A | No server. Client: form values only go into an `encodeURIComponent` mailto; nothing user-supplied is written into the page (no XSS sink). |
| 1B Input/output | Uploads, SSRF, open redirect | N/A | None. `booking.html` meta-refresh goes to a fixed local page. |
| 1B Transport | HTTPS, redirect, HSTS | Blocker (deploy) | Set at the host — blocker 3. |
| 1B Transport | Security headers | Blocker (deploy) | Set at the host — blocker 3. |
| 1B Transport | CORS | N/A | No API. |
| 1B Payments | Webhooks, server prices, transactions | N/A | No payments; no prices on the site at all. |
| 1B Abuse | Rate/size limits, paid-API caps | N/A | No API, no paid calls. |
| 1B AI | Keys, permissions, prompt injection | N/A | No AI features on the site (the WhatsApp agent chat is a static illustrated demo, labelled as such). |
| 1B Deps | No vulnerable dependencies | PASS | No npm/runtime dependencies; only Google Fonts CSS. |
| 1B Deps | Debug/test routes, default passwords off | PASS | None found. |
| 1B Deps | Errors don't leak | PASS | 0 console errors on 28 pages × 3 viewports. |
| 1B Logging | Logs, alerts, backups | N/A | Static site; keep the repo as the backup. |
| 1B Links | External links safe | PASS | WhatsApp links `target=_blank rel=noopener`; Instagram link same tab with `rel=noopener`. |
| 1C Mobile | All items | N/A | No app. |
| 2 Stores | All items | N/A | No app. |
| 3 Privacy | Privacy policy / terms linked in footer | FAIL (blocker 1) | No privacy page. Terms optional for a brochure site. |
| 3 Privacy | List of data collected and third parties | FAIL (blocker 1) | Goes in the privacy page: email (Gmail), WhatsApp (Meta), Instagram, Google Fonts. |
| 3 Privacy | Cookie / tracking consent | PASS | No analytics, pixels or cookies. If analytics are added later, add consent first. |
| 3 Privacy | Data deletion on request | FAIL (blocker 1) | State in the privacy page: email bracketkw@gmail.com to delete. |
| 3 Privacy | Marketing only with consent | PASS | Site sends nothing; nothing subscribes visitors. |
| 3 Privacy | Age rules | N/A | B2B site. |
| 3 Privacy | No fake reviews/testimonials/stats/logos | PASS | None anywhere; honest "no public case studies yet" line; work page empty state. One soft generalisation on customer-agent ("Most businesses lose customers…") — QA report L6. |
| 4 Prod | Env separation, `.env.example` | N/A | No secrets/config beyond the WhatsApp number. |
| 4 Prod | Automated tests / CI | N/A (note) | QA scripts exist in `/tmp/qa/` (static checks + Playwright sweep); worth keeping in the repo for re-runs. |
| 4 Prod | Error tracking / uptime | FAIL (minor) | Add a free uptime check on the home page after deploy. Not a blocker. |
| 4 Prod | Backups | PASS | Static files; keep in git. |
| 4 Prod | Friendly 404 / 500 | FAIL (deploy) | No `404.html`. Add a bilingual 404 with links to home/services/contact. Part of blocker 3. |
| 4 Prod | Fast on a phone on 4G | PASS | ~50–70 KB per page before fonts, no images. Only flag: render-blocking Google Fonts CSS (QA report L11). |
| 4 Prod | Limits on uploads/lists | N/A | None. |
| 4 Prod | README | PASS | `README-LAUNCH.md` covers domain replace, sitemap submission, GBP. Don't upload it or `.gitignore` to the public host (QA report L10). |

## Before Bilal says yes to deploy

- Fix the QA report High/Medium items (hero CTA at 1440, CTA-band contrast + focus ring, tap targets, long titles) and blocker 1.
- Choose the domain → replace `DOMAIN` → deploy to staging with the headers in blocker 3 → re-run websiteqa + this launch check on the staging URL.
- Deploying needs Bilal's approval in that run's chat.
