# Bracket — AI visibility log

## Check #1 — baseline, 22 Nov 2026

Task: T-20261122-01 · Agent: bracket-geo
Method: web search (the index AI assistants with search pull from) for 10 buyer prompts, logging which brands and which **sources** come up. Direct ChatGPT / Perplexity / Gemini / AI Overviews runs were not possible from the cloud; the cited sources below are what those assistants typically draw on. Site is not live, so Bracket is expected to be absent.
No competitor numbers are copied here — they are not Bracket's.

### Baseline table

| # | Prompt | Bracket shown? | Brands that come up | Sources cited / ranking |
|---|---|---|---|---|
| 1 | software house Kuwait | No | Apptunix, Appinventiv, Markup Designs, Walnut Software Solutions, Concetto Labs, Sapphire Solutions, Fluper | Clutch (KW developers), TechBehemoths (Kuwait custom software), "Top 20 / Top 10 software companies in Kuwait" listicles (apptunix.com blog, dev.to, molecularcloud.org, zindi.africa), Odoo partner directory, IBM partner directory |
| 2 | best website development company Kuwait | No | (lists only) | Clutch (KW web developers, web designers, e-commerce, digital agencies), TechBehemoths, The Manifest (KW web dev), GoodFirms (Kuwait web dev), Semrush Agency Partners (Kuwait City), dev.to posts |
| 3 | app development company Kuwait | No | Appinventiv, Apptunix, Suffescom, Square House | Clutch (KW app developers, healthcare apps), GoodFirms profiles, dev.to, HackMD, vendor "app development company in Kuwait" landing pages |
| 4 | AI agents for business Kuwait | No | KuwaitAI, Markup Designs, Appinventiv, Boundev, Noqta, Autonoly | AI Superior ("AI agencies in Kuwait", "chatbot companies Kuwait"), Kuwait Times article, vendor blogs |
| 5 | WhatsApp AI chatbot Kuwait | No | LetsBot (one page per industry × Kuwait), Edesy, Chrisans Solution | letsbot.net industry pages, edesy.in country pages, 248am.com, Arab Times, dev.to |
| 6 | SEO company Kuwait | No | SEO Sherpa, Redberries, iMark Infotech, Istizada, GoingUp Digital, Nuoptima | Clutch (KW SEO firms), DesignRush (KW SEO), TechBehemoths (KW SEO), The Manifest (KW SEO), Semrush Agency Partners, Krowdbase, Nuoptima list |
| 7 | GEO / AI search optimization Kuwait | No | Magneto IT Solutions, AppLabx, DevCommX, SEO Sherpa, Global Media Insight | Vendor pages "GEO agency in Kuwait", AppLabx "Top 10 GEO agencies in Kuwait" blog, Wikipedia (GEO definition), Search Engine Land — **thin field, mostly non-Kuwait firms** |
| 8 | شركة برمجة في الكويت | No | Xcode LLC, One Iteration (Odoo partner) | Clutch (English pages rank even for Arabic query), dev.to, TechBehemoths, Litslink blog, Jobbers |
| 9 | تصميم مواقع الكويت | No | Creative4all Kuwait, KuwaitCoding, Kuwait Next | Khamsat (freelance marketplace), Mostaql, Trustpilot, Webrate — **almost no proper Arabic company pages** |
| 10 | برمجة تطبيقات الكويت | No | Creative4all Kuwait | Mostly off-topic results (jobs, books, gov guides) — **Arabic app query is wide open** |

Brand check: searching "Bracket" + Kuwait returns other firms with similar names — **Bracketworks** (UAE; LinkedIn, DesignRush, GoodFirms), **Brackets** (GoodFirms), **BracketzLab** (Clutch). Bracket needs a distinct listing name ("Bracket Kuwait") and consistent handle (bracketkw) so AI doesn't merge them.

### What it means
- AI answers for these prompts are built from **directory lists** (Clutch first, then TechBehemoths, GoodFirms, The Manifest, DesignRush, Semrush Agency Partners) and **"Top N companies in Kuwait" listicles**. Being listed there matters more than ranking our own page.
- **Openings:** GEO in Kuwait (only a few, mostly foreign, pages) and **Arabic** queries (results are weak or off-topic). Bracket's Arabic service pages + GEO page can win here once live.
- WhatsApp-bot results are won by programmatic "industry × Kuwait" pages (LetsBot). Later idea: a few honest industry pages (clinics, salons, real estate) for the customer agent — not before launch.

### Action list for Bilal (dated)

Nothing here gets posted, published or created without Bilal's yes.

| By | Action | Owner |
|---|---|---|
| Before deploy | Websitebuilder fixes from `geo/bracket-audit.md` #1–#3 (loader, 3D weight, favicons) | websitebuilder (after Bilal OK) |
| Launch day | Pick the domain → replace `DOMAIN` everywhere → deploy → add site to **Google Search Console** + **Bing Webmaster Tools** (Bing feeds ChatGPT search), submit `sitemap.xml`, request indexing of `/`, `/ar/`, 5 service pages | Bilal + websitebuilder |
| Launch week | **Google Business Profile**: name "Bracket Kuwait", category "Software company" (+ "Website designer", "Internet marketing service"), service-area business (Kuwait, no public address unless real), website, WhatsApp, hours, 5 services, EN + AR description from the site, logo + cover | Bilal |
| Launch week | **Instagram bio** (@bracketkw): "Software house in Kuwait · Websites · Apps · AI agents · SEO · GEO — شركة برمجة في الكويت" + website link; category "Software company" | Bilal (instamake drafts) |
| Week 1–2 | Free listings, all as **"Bracket Kuwait"**, same email/WhatsApp/website/description: **Clutch**, **TechBehemoths**, **GoodFirms**, **The Manifest** (via Clutch), **DesignRush**, **LinkedIn company page** | Bilal (PM drafts the profile text) |
| Week 2–4 | Kuwait/Arabic listings: Odoo-style partner pages only if real; Kuwait business directories (e.g. Yellow Pages Kuwait / Kuwait business directory sites) | Bilal / salesman |
| After each listing | Add its URL to `sameAs` in the site's `#org` schema | websitebuilder |
| First clients | Ask each happy client for a Google + Clutch review naming the service (no fake reviews) | Bilal / PM |

### Re-check next month (check #2, ~22 Dec 2026)
- Same 10 prompts + add: "who builds AI agents for businesses in Kuwait", "best software house in Kuwait for small business", "website and app company Kuwait Arabic", "وكيل ذكاء اصطناعي واتساب الكويت", "شركة سيو في الكويت".
- If the site is live: run them in ChatGPT, Perplexity, Gemini and Google AI Overviews (Bilal's browser or manual), log mentioned / linked.
- Is Bracket's site indexed (`site:DOMAIN` on Google + Bing)? Do `/geo.html` and `/ar/` pages rank for the "openings" above?
- Which listings are live; is GBP verified; any reviews.
- Does a "Bracket" search still confuse us with Bracketworks / BracketzLab?
