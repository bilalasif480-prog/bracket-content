# Bracket website — software house redesign plan

Task: T-20261118-05 · Owner: bracket-designer · 18 Nov 2026
Source checked: `/home/claude/site/` (static, 9 pages + 2 redirects), served locally, screenshots at 1440 and 390.
Profile: `business/bracket.md` (18 Nov 2026): software house, 5 equal services, no prices, no QA sold, no invented proof, EN + Gulf Arabic.

---

## 1. Critique of the current site

**First impression:** clean, confident, honest. But every page says one thing: "we build AI agents". A visitor who wants a website, app, SEO or GEO has no page, no card, no nav item and no option in the contact form. Bilal is right.

### What works (keep it)
1. **Honesty already built in.** "No public case studies yet", "Illustrative demo — not a real customer chat", "We don't claim certifications we don't have". No testimonials, no client logos. Keep this tone everywhere.
2. **Brand is close to the profile.** Ink `#201e1d`, red `#ec3013`, peach `#ff8360` on dark, paper `#f3f2f2`, `[ BRACKET ]` wordmark, Archivo headings. Tokens live in `:root` on each page.
3. **Good building blocks.** Sticky header + mobile menu, `.tier-card` grid, numbered steps with "You get …", FAQ `<details>`, dark CTA band, footer, WhatsApp float wired to config (hidden while `whatsapp: ""`). Skip link and reduced-motion friendly reveals.
4. **The WhatsApp demo chat** (Gulf Arabic) on the home page is the best thing on the site. Keep it, inside the AI agents section.
5. **"Clear limits" block** (does / never does). Strong trust device; reuse the idea for every service.

### What's wrong (ranked)
| # | Severity | Issue | Where |
|---|---|---|---|
| 1 | Critical | **AI-agents-only positioning.** Nav = "AI Agents · Work · Careers · Contact". Home H1/kicker/lede, all meta descriptions, footer tagline ("We build AI agents for companies"), contact form ("Tell us which job an AI agent should take over"), `services.html` and `booking.html` both redirect to `ai-agents.html`. Websites, apps, SEO, GEO appear nowhere. | all pages |
| 2 | Critical | **"Studio" used 35 times** (see list below). Profile says always "software house". The email `hello@bracket.studio` itself contains "studio". | 9 pages |
| 3 | High | **Prices in config.** `bracket-config.js`: `priceFrom: 350`, `carePlan: 20`, plus the `.js-price` / `.js-care` wiring. No page uses those classes today (dead code), but it must go before anyone re-enables it. | `bracket-config.js` |
| 4 | High | **No Arabic.** Only the demo chat is Arabic. `lang="en"` only, no IBM Plex Sans Arabic loaded. Profile requires EN + Gulf Arabic. | all pages |
| 5 | High | **Home H1 is just "[Bracket]"** (typed-in animation). No service words in the H1 = weak for SEO/GEO, and on desktop the right half of the hero is empty. The CTA only fades in ~1–2 s after load. | `index.html` hero |
| 6 | High | **No SEO/GEO basics on a site that will sell SEO/GEO.** No `canonical`, no Open Graph, no JSON-LD (Organization, Service, FAQPage), no `sitemap.xml`, `robots.txt` or `llms.txt`. | all pages |
| 7 | Medium | **Outcome promises we can't back yet** (soft, but rewrite): "Customers get a reply in minutes, at any hour" and "Bookings land straight in your calendar" (customer-agent), "Send reminders so fewer people no-show" (index). Reply-time promises: "We reply within one business day, with a full scope and price to follow inside two" (contact), "scope and a price within two business days" (index, ai-agents, contact). Keep only if Bilal confirms he can hold them. | customer-agent, index, ai-agents, contact |
| 8 | Medium | **Careers copy breaks the voice/profile:** "an AI agents studio", "small studio", "people who build AI agents", "Ship it or explain why… A missed date… happens rarely" (implies a track record + "ship date" is a word to avoid), "We're paid for the outcome, not the clock" (pricing model claim), "Fully remote, async by default" (true?). Also a duplicated phrase: "close to the client and close to the client and the agent". | careers.html |
| 9 | Low | **Mono font is IBM Plex Mono**, profile says JetBrains Mono. | all pages `<link>` |
| 10 | Low | **Work page is an empty state indexed by Google** ("No public projects yet") and sits in the main nav. Honest, but thin content in prime nav space. | work.html |
| 11 | Low | CSS copied inline into every page (≈18 hard-coded hexes per page). Every change = 9 edits. | all pages |

Not found (good): no testimonials, no client names/logos, no stats, no percentages, no "guaranteed", no "#1 on Google". "Agencies" appears once (index L383, "Agencies, contractors…") — that means *real estate agencies as customers*, not Bracket; fine to keep.

### Every "studio" (35)
| File | Line | Text |
|---|---|---|
| index.html | 434 | footer heading `<h4>Studio</h4>` |
| index.html | 452 | `mailto:hello@bracket.studio` + link text (2) |
| ai-agents.html | 260 | "We are a new **studio** and have no public case studies yet…" |
| ai-agents.html | 292 | footer `<h4>Studio</h4>` |
| ai-agents.html | 301 | footer email (2) |
| customer-agent / sales-agent / marketing-agent / custom-agent .html | 269 | footer `<h4>Studio</h4>` (×4) |
| same four files | 278 | footer email (2 each = 8) |
| work.html | 7 | meta: "Bracket is a new AI agents **studio**…" |
| work.html | 164 | "Bracket is a new **studio** building AI agents for companies…" |
| work.html | 177, 187 | footer heading + email (3) |
| careers.html | 7 | meta: "…an AI agents **studio** built around quality and craft." |
| careers.html | 165 | "We're a small **studio** that would rather…" |
| careers.html | 231, 241 | footer heading + email (3) |
| contact.html | 209 | `hello@bracket.studio` in "Prefer email?" (2) |
| contact.html | 238, 248 | footer heading + email (3) |
| contact.html | 297 | JS `mailto:hello@bracket.studio` for the form |

Totals: 9 footer headings, 5 copy/meta lines, 21 email occurrences.

### Every price
- `bracket-config.js`: `priceFrom: 350`, `carePlan: 20`, and the two `.js-price` / `.js-care` lines. Delete all four.
- No KD amounts are printed on any page. FAQ "How much…?" already answers "It depends on the job" — keep that pattern, CTA "Get a quote".

---

## 2. New sitemap and nav

```
/                      index.html        Home (software house, 5 services)
/services.html         NEW real page     Services overview (was redirect)
  /websites.html       NEW
  /apps.html           NEW
  /ai-agents.html      KEEP, reframed as one of 5 (hub for 4 agents)
     /customer-agent.html  KEEP
     /sales-agent.html     KEEP
     /marketing-agent.html KEEP
     /custom-agent.html    KEEP
  /seo.html            NEW
  /geo.html            NEW
/work.html             KEEP, footer only, noindex until first approved case study
/careers.html          KEEP, footer only, copy rewritten
/contact.html          KEEP, form covers all 5 services
/booking.html          redirect -> contact.html (not ai-agents)
/sitemap.xml /robots.txt /llms.txt   NEW
```

**Header nav (desktop):** `[ BRACKET ]` · Services ▾ (Websites · Mobile apps · AI agents · SEO · GEO · All services) · How we work (→ `/#process`) · Contact · button **Get a quote** / اطلب عرض سعر
**Mobile menu:** Services (5 links listed flat, no nested dropdown), How we work, Contact, full-width **Get a quote** button.
**Footer columns:** `Bracket` (Services, How we work, Work, Careers, Contact) · `Services` (5) · `AI agents` (4 agents) · `Contact` (email, Get a quote).
**Footer tagline:** "Bracket is a Kuwait software house. Websites, apps, AI agents, SEO and GEO. Checked before launch." / "Bracket شركة برمجيات في الكويت. مواقع، تطبيقات، وكلاء ذكاء اصطناعي، SEO و GEO. نفحص كل شي قبل الإطلاق."

**work.html:** no fake case studies. Keep the honest empty state, rewritten (copy below), out of the main nav, `noindex`. When a client agrees to be shown, add one card and remove `noindex`. Demo/pitch builds for prospects don't go here unless the prospect agrees.

**Bilingual approach (phase 1):** English headline with Gulf Arabic under it at ~70% size (`<p class="ar" lang="ar" dir="rtl">`), same as Instagram. Body copy EN, with Arabic for H1, H2s, service cards, CTAs and FAQ questions. Phase 2 (later): full `/ar/` mirror with `hreflang` — best for Arabic SEO/GEO. See open questions.

---

## 3. Homepage — section by section

Slogan options (Bilal picks; current "AI that gets it done." stays as the AI agents line):
1. **Software that gets it done.** / **برامج تخلّص الشغل.** — continuity with the agents line. *(my pick)*
2. **Built right. Found everywhere.** / **مبني صح. وينلقى بكل مكان.** — says build + SEO/GEO in four words.
3. **We build it. Your customers find it.** / **إحنا نبنيه، وزباينك يلقونه.** — plainest, most customer-centred.

### 3.1 Hero
- Kicker: `SOFTWARE HOUSE · KUWAIT` / `شركة برمجيات · الكويت`
- H1: **Websites, apps and AI agents — and we get you found.**
  AR: **مواقع، تطبيقات ووكلاء ذكاء اصطناعي — ونخلي الناس تلقاك.**
- Lede: "Bracket is a Kuwait software house. One team builds your website, app or AI agent, then gets your business found on Google and in AI answers."
  AR: "Bracket شركة برمجيات في الكويت. فريق واحد يبني موقعك أو تطبيقك أو وكيلك الذكي، وبعدها يخلي نشاطك يطلع على Google وفي أجوبة الذكاء الاصطناعي."
- Buttons: **Get a quote** / اطلب عرض سعر (solid) · **See services** / شوف خدماتنا (outline)
- Under buttons (mono): `Checked before launch.` / `نفحص كل شي قبل الإطلاق.`
- Layout: CTA visible on first paint (no fade delay). Desktop right column: the 5 service names as a stacked bracket list (`[ Websites ]`, `[ Mobile apps ]`…), each a link. Keep the `[Bracket]` big wordmark out of the H1 (logo already in header).
- Marquee: `Websites // Mobile apps // AI agents // SEO // GEO // Checked before launch`

### 3.2 Five service cards (`#services`)
H2: **Five services. One team.** / **خمس خدمات. فريق واحد.**
Sub: "Pick one, or let us join them up." / "اختار وحدة، أو خلنا نربطهم لك ببعض."

| Card | EN | AR | Bullets (EN) | Link |
|---|---|---|---|---|
| Websites / مواقع إلكترونية | Business websites, landing pages, online stores and web apps. | مواقع شركات، صفحات هبوط، متاجر إلكترونية وتطبيقات ويب. | Arabic and English · Fast on phones · Easy to update | websites.html |
| Mobile apps / تطبيقات جوال | iOS and Android apps for your customers or your staff. | تطبيقات iOS و Android لزباينك أو لموظفينك. | Customer and staff apps · App Store and Google Play · Admin dashboard | apps.html |
| AI agents / وكلاء ذكاء اصطناعي | Agents that answer and book on WhatsApp, find leads and prepare posts. | وكلاء يردّون ويحجزون على الواتساب، يدورون لك عملاء ويجهزون منشوراتك. | Customer, sales, marketing, custom · Hands over to a person · You approve | ai-agents.html |
| SEO | Get found on Google: structure, speed, titles, content, Google Business Profile. | خلّ الناس تلقاك على Google: ترتيب الموقع، السرعة، العناوين، المحتوى وملفك على Google. | Technical fixes · Content that answers searches · Google Business Profile | seo.html |
| GEO | Get found and cited in AI answers: ChatGPT, Perplexity, Gemini, Google AI Overviews. | خلّ اسمك يطلع في أجوبة الذكاء الاصطناعي: ChatGPT و Perplexity و Gemini وملخصات Google. | AI crawler access · Clear facts and schema · Monthly AI visibility check | geo.html |

Grid: 3 + 2 on desktop (or 5 equal at ≥1280), 1 column on phone. Equal card size, no "featured" card (services are equal weight). Card link text: "See details" / "التفاصيل".

### 3.3 AI agent demo (keep)
Keep the current "A customer writes at 2 a.m." WhatsApp demo block as-is (it's labelled illustrative). Add H2 Arabic: "زبون يكتب الساعة ٢ الفجر. الوكيل يرد." Button: "See AI agents" / "شوف الوكلاء".

### 3.4 How we work (`#process`) — same for every service
H2: **Four steps, whatever we build.** / **أربع خطوات، مهما كان اللي نبنيه.**
| Step | EN | AR | You get |
|---|---|---|---|
| 01 Tell us the job | Describe what you need in a few lines, by form or email. | قول لنا شنو تحتاج بسطرين، بالفورم أو الإيميل. | — |
| 02 Scope & quote | We write down what we build, what's included and what isn't. | نكتب شنو بنبني، شنو داخل وشنو مو داخل. | A written scope and a quote / نطاق مكتوب وعرض سعر |
| 03 Build & check | We build it and check it on real cases before launch. | نبنيه ونفحصه على حالات حقيقية قبل الإطلاق. | A working build to try / نسخة شغالة تجربها |
| 04 Launch & hand over | It goes live after your yes. You get a plain guide and a support window. | ينطلق بعد موافقتك. تاخذ دليل واضح وفترة دعم. | Live product, guide, support / المنتج شغال، دليل، دعم |

### 3.5 Why Bracket (only true things)
H2: **Why Bracket.** / **ليش Bracket.**
- **Build and be found, one team.** The people who build your site also make it findable on Google and in AI answers. / **نبني ونخليك تنلقى، فريق واحد.**
- **Arabic and English from day one.** Gulf Arabic, right-to-left done properly. / **عربي وإنجليزي من أول يوم.**
- **Checked before launch.** Every build is checked before your customers see it. / **نفحص قبل الإطلاق.**
- **You approve.** Nothing goes live, posts or sends without your yes. / **إنت توافق.** ما ينطلق شي بدون موافقتك.
- **Clear scope first.** You know what you get before we start. / **النطاق واضح من البداية.**
- Honesty line (small, under the grid): "Bracket is a new software house. We have no public case studies yet, so we don't show any." / "Bracket شركة برمجيات جديدة، وما عندنا دراسات حالة منشورة للحين، فما نعرض شي."

### 3.6 FAQ (home, 5)
1. **Do you only build AI agents?** No. We build websites, mobile apps and AI agents, and we do SEO and GEO. / **تسوون بس وكلاء ذكاء اصطناعي؟** لا. نبني مواقع وتطبيقات ووكلاء، ونسوي SEO و GEO.
2. **How much does it cost?** It depends on the job. Tell us what you need and we send a quote. / **كم التكلفة؟** حسب الشغل. قول لنا شنو تحتاج ونرسل لك عرض سعر.
3. **What's the difference between SEO and GEO?** SEO helps you show up in Google results. GEO helps AI assistants like ChatGPT find and mention your business. / **شنو الفرق بين SEO و GEO؟**
4. **Can you work on my existing website?** Yes. We can improve it, add SEO and GEO, or rebuild it if that's the better option. We tell you which before you pay. / **تقدرون تشتغلون على موقعي الحالي؟**
5. **Do you work in Arabic?** Yes. Everything we build works in Gulf Arabic and English. / **تشتغلون بالعربي؟** إي، كل شي نبنيه بالعربي الخليجي والإنجليزي.

### 3.7 CTA band
- Kicker: `Let's start` / `يلا نبدأ`
- H2: **What should we build for you?** / **شنو تبينا نبني لك؟**
- Lede: "Tell us in a few lines. We reply with a scope and a quote." / "اكتب لنا بسطرين. نرد عليك بالنطاق وعرض السعر."
- Buttons: **Get a quote** / اطلب عرض سعر · **See services** / شوف خدماتنا

Home meta — title: `Bracket — Software house in Kuwait | Websites, apps, AI agents, SEO, GEO` · description: `Bracket is a Kuwait software house. We build websites, mobile apps and AI agents, and get businesses found on Google and in AI answers. Arabic and English.`

---

## 4. Service page template + copy

### Template (same for websites / apps / seo / geo; reuse agent-page layout)
1. Breadcrumb: Services › {Service}
2. Hero: kicker (service) · H1 · AR line · lede · **Get a quote** + "All services"
3. **What it is** — 2 short paragraphs (`.prose`)
4. **Who it's for** — chips (`.chips`)
5. **What you get** — 4–6 deliverables (`.outs` ticks)
6. **How it works** — the same 4 steps as home, service-specific wording (`.steps4`)
7. **What we don't do** — 2–3 honest limits (reuse "Clear limits" idea)
8. **FAQ** — 5 Qs, marked up as FAQPage JSON-LD
9. **Pairs well with** — 2 other services (`.cross`)
10. CTA band → contact.html?service={slug} (pre-selects form option)
JSON-LD per page: `Service` (name, provider = Organization Bracket, areaServed Kuwait) + `FAQPage`.

### 4.1 websites.html
- Meta title: `Website design and development in Kuwait — Bracket` · desc: `Business websites, landing pages, online stores and web apps in Arabic and English, built and checked before launch by Bracket, a Kuwait software house.`
- Kicker: `Websites` / `مواقع إلكترونية`
- H1: **A website that works as hard as you do.** / **موقع يشتغل مثل ما تشتغل.**
- Lede: "Business websites, landing pages, online stores and web apps — in Arabic and English, fast on phones, and easy for your team to update." / "مواقع شركات، صفحات هبوط، متاجر ووب أبس — بالعربي والإنجليزي، سريعة على الجوال، وفريقك يقدر يعدّلها بسهولة."
- What it is: "Most of your customers will see your website on a phone, often after finding you on Instagram or Google. We build sites that load fast, read well in both languages and make the next step obvious: call, WhatsApp, book or buy. / If you already have a site, we can fix it or rebuild it. We tell you which makes more sense before you pay."
- Who it's for: Clinics · Salons & gyms · Real estate · Contractors · Shops & online stores · Service businesses
- What you get: Design for phone and desktop · Arabic and English (right-to-left done properly) · A way to edit text and images yourself · Contact, WhatsApp or booking built in · SEO basics from day one (titles, speed, structure) · Checked on real phones before launch
- How it works: 01 Tell us what the site is for · 02 Scope, pages and quote · 03 Design, build, check · 04 Launch after your yes, plain guide, support window
- What we don't do: we don't copy another company's site; we don't promise rankings.
- FAQ:
  1. **How long does a website take?** We agree a timeline in the scope, based on the number of pages and features. / **كم ياخذ وقت الموقع؟**
  2. **Can I edit the website myself?** Yes. We set it up so your team can change text and images without a developer. / **أقدر أعدّل الموقع بنفسي؟**
  3. **Do you build online stores?** Yes, including products, cart and payment. Tell us which payment options you need and we confirm what's possible. / **تسوون متاجر إلكترونية؟**
  4. **Will my website be in Arabic and English?** Yes, both, with Arabic laid out right-to-left. / **الموقع بيكون عربي وإنجليزي؟**
  5. **Do you host the website?** We set up hosting and the domain with you, in your name. / **تستضيفون الموقع؟** *(confirm with Bilal)*
- Pairs well with: SEO · GEO

### 4.2 apps.html
- Meta title: `Mobile app development in Kuwait — iOS and Android | Bracket` · desc: `iOS and Android apps for your customers or your staff, in Arabic and English, built and checked before launch by Bracket, a Kuwait software house.`
- Kicker: `Mobile apps` / `تطبيقات جوال`
- H1: **An app your customers actually open.** / **تطبيق زباينك يفتحونه فعلاً.**
- Lede: "iOS and Android apps for your customers or your staff — bookings, orders, loyalty, field work — with an admin dashboard for your team." / "تطبيقات iOS و Android لزباينك أو لموظفينك — حجوزات، طلبات، ولاء، شغل ميداني — مع لوحة تحكم لفريقك."
- What it is: "An app makes sense when people use you again and again: book, order, track, or check in. For staff, an app replaces paper, group chats and spreadsheets. / We start with what the app must do on day one, keep the first version focused, and add the rest after people use it."
- Who it's for: Clinics & salons · Gyms · Restaurants & shops · Real estate · Contractors & field teams
- What you get: iOS and Android app · Admin dashboard for your team · Arabic and English · Sign-in, notifications and payments where needed · Checked on real devices before launch · Help publishing to the App Store and Google Play
- How it works: 01 Tell us what the app is for · 02 Screens, scope and quote · 03 Design, build, check · 04 Store submission after your yes, guide, support window
- What we don't do: we don't promise App Store approval dates (Apple and Google decide); we don't build an app when a website would do the job — we'll say so.
- FAQ:
  1. **Do I need an app or a website?** If customers use you often (book, order, track), an app helps. If they mostly look you up once, start with a website. We'll tell you which. / **أحتاج تطبيق ولا موقع؟**
  2. **Do you build for both iPhone and Android?** Yes, both. / **تسوون آيفون وأندرويد؟**
  3. **Will you publish it to the App Store and Google Play?** We prepare and submit it with you, under your developer accounts. / **تنزلونه على المتجر؟**
  4. **Can the app take payments?** Yes, where the stores allow it. Tell us the payment methods you need and we confirm what's possible. / **التطبيق يقبل الدفع؟**
  5. **How much does an app cost?** It depends on the screens and features. Send us what it should do and we reply with a quote. / **كم يكلف التطبيق؟**
- Pairs well with: Websites · AI agents

### 4.3 seo.html
- Meta title: `SEO in Kuwait — get found on Google | Bracket` · desc: `SEO for Kuwait businesses: site structure, speed, titles, content and Google Business Profile, in Arabic and English. No guaranteed rankings — clear work and monthly checks.`
- Kicker: `SEO`
- H1: **Get found on Google.** / **خلّ الناس تلقاك على Google.**
- Lede: "When someone in Kuwait searches for what you do, your business should be there — in Arabic and English." / "لما أحد في الكويت يدوّر على اللي تسويه، لازم نشاطك يطلع — بالعربي والإنجليزي."
- What it is: "SEO is the work that helps Google understand your website and show it to the right people. Most of it is basic and often missing: clear page titles, fast pages, a sensible structure, content that answers what customers search, and a complete Google Business Profile. / We fix what's broken first, then add content that answers real questions in both languages."
- Who it's for: Any business customers search for — clinics, salons, gyms, real estate, contractors, shops.
- What you get: SEO check of your site (structure, speed, titles, indexing) · Fixes done or a fix list for your developer · Keyword list in Arabic and English · Pages or articles that answer what customers search · Google Business Profile set-up or clean-up · Monthly report in plain language
- How it works: 01 Send your website and what you sell · 02 Check, plan and quote · 03 Fix and write · 04 Monthly check and report
- What we don't do: we don't guarantee rankings or "#1 on Google"; we don't buy links or use tricks that put your site at risk.
- FAQ:
  1. **How long does SEO take to work?** Usually months, not days. Technical fixes count quickly; content takes longer to build up. / **متى يبين أثر الـ SEO؟**
  2. **Can you guarantee first place on Google?** No. Nobody honest can. We do the work that helps and show you what changed each month. / **تضمنون المركز الأول؟**
  3. **Do you do SEO in Arabic?** Yes. Arabic and English searches are different, so we plan for both. / **تسوون SEO بالعربي؟**
  4. **Do I need a new website for SEO?** Not always. We check your site first and tell you if fixing it is enough. / **لازم موقع جديد؟**
  5. **What is a Google Business Profile?** It's your listing on Google Maps and Search, with hours, location, photos and reviews. For local businesses it matters a lot. / **شنو Google Business Profile؟**
- Pairs well with: GEO · Websites

### 4.4 geo.html
- Meta title: `GEO in Kuwait — get found in ChatGPT and AI answers | Bracket` · desc: `GEO (generative engine optimisation) helps AI assistants like ChatGPT, Perplexity, Gemini and Google AI Overviews find and mention your business. Arabic and English.`
- Kicker: `GEO`
- H1: **Get found in AI answers.** / **خلّ اسمك يطلع في أجوبة الذكاء الاصطناعي.**
- Lede: "More people now ask ChatGPT, Perplexity, Gemini or Google's AI for a recommendation. GEO helps those answers find and mention your business." / "ناس واجد صاروا يسألون ChatGPT و Perplexity و Gemini عن توصية. الـ GEO يساعد هالأجوبة تلقى نشاطك وتذكره."
- What it is: "GEO stands for generative engine optimisation. AI assistants build their answers from websites, directories and listings they can read and trust. If your site blocks their crawlers, hides key facts behind images, or doesn't say clearly what you do and where, you get left out. / We make your business easy for AI to read: clear facts, structured data, an llms.txt file, and a consistent presence on the listings these tools read."
- Who it's for: Businesses people ask AI about — "best clinic in Salmiya", "contractor in Kuwait", "perfume shop that delivers".
- What you get: AI visibility check (what ChatGPT, Perplexity, Gemini and Google AI say about you today) · Crawler access check (robots.txt, pages readable without JavaScript) · Structured data (schema.org) and llms.txt · Clear "facts" pages: services, areas, hours, FAQs in Arabic and English · Listings and directories cleaned up · Monthly AI visibility check
- How it works: 01 Send your website and what you sell · 02 AI visibility check, plan and quote · 03 Fix and publish · 04 Monthly check of AI answers
- What we don't do: we don't guarantee that any AI will mention or cite you; we don't publish fake reviews or fake listings.
- FAQ:
  1. **What is GEO?** Making your business easy for AI assistants to find, understand and mention in their answers. / **شنو الـ GEO؟**
  2. **Is GEO different from SEO?** They overlap. SEO targets Google's results page; GEO targets the answers AI tools write. Good SEO helps GEO, but GEO adds AI-specific work. / **يختلف عن الـ SEO؟**
  3. **Can you guarantee ChatGPT will recommend us?** No. We improve what AI can read about you and check every month what it says. / **تضمنون ChatGPT يرشحنا؟**
  4. **Which AI tools do you check?** ChatGPT, Perplexity, Gemini, Claude and Google AI Overviews. / **أي أدوات تشيكون؟**
  5. **Does GEO work in Arabic?** Yes. We check answers to Arabic and English questions. / **ينفع بالعربي؟**
- Pairs well with: SEO · Websites

### 4.5 services.html (overview, real page)
- Meta title: `Services — websites, apps, AI agents, SEO, GEO | Bracket Kuwait`
- H1: **Everything we build, in one place.** / **كل اللي نسويه، بمكان واحد.**
- Lede: "Five services, one team. Start with one, add the others when you need them." / "خمس خدمات، فريق واحد. ابدأ بوحدة وزيد الباقي وقت ما تحتاج."
- Body: the 5 service cards (same component as home, plus "Good first step if…" line):
  Websites — "…you have no site, or one you're embarrassed to share." / Apps — "…customers book, order or check in with you often." / AI agents — "…your team answers the same messages all day." / SEO — "…customers search Google for what you do." / GEO — "…customers ask ChatGPT for recommendations in your field."
- Then "How we work" (4 steps), "Not sure which?" block: "Tell us the problem, not the service. We'll suggest where to start." / "قول لنا المشكلة مو الخدمة، وإحنا نقترح من وين تبدأ." → Get a quote.

### 4.6 ai-agents.html (keep, small changes)
- Kicker stays "AI that gets it done." (agents line). Add breadcrumb Services › AI agents.
- Replace L260 → "Bracket is a new software house with no public case studies yet, so we don't show any. We tell you plainly what an agent can and can't do for your business before you pay."
- Add AR under H1: "وكلاء ذكاء اصطناعي يشتغلون عن شركتك." and "Pairs well with: Websites · Apps".

### 4.7 work.html (rewrite)
- H1: **No public projects yet.** / **ما عندنا مشاريع منشورة للحين.**
- Lede: "Bracket is a new software house. We only show work a client has agreed to share, so this page stays empty until then." / "Bracket شركة برمجيات جديدة. ما نعرض أي شغل إلا بموافقة العميل، فهالصفحة بتظل فاضية لين ذاك الوقت."
- Buttons: Get a quote · See services. Meta desc: "Bracket is a new Kuwait software house. Client work appears here once clients agree to be shown." Add `<meta name="robots" content="noindex">`.

### 4.8 careers.html (rewrite lines)
- Meta: "Careers at Bracket, a Kuwait software house building websites, apps and AI agents."
- Lede: "We're a small software house that would rather do fewer things well than many things loosely…"
- Values: keep 01 "Say the hard thing", keep "Hold the line" but without "deadlines"; replace "Ship it or explain why" with **"Checked before launch"** — "Nothing goes to a client before we've checked it." Drop "Craft over hours / paid for the outcome" unless Bilal confirms.
- "people who build AI agents" → "people who build websites, apps and AI agents, or do SEO and GEO".
- Fix duplicate "close to the client and close to the client".
- CTA band: "Got a project instead?" → button "See services".
- Confirm "Fully remote / async" bullets are true, else remove.

### 4.9 contact.html (changes)
- H1: **Tell us what you need.** / **قول لنا شنو تحتاج.** Lede: "Tell us what you need built or fixed. We reply with a scope and a quote." (reply-time promise only if Bilal confirms)
- Project type options: Website · Mobile app · AI agent — customer (WhatsApp, booking) · AI agent — sales · AI agent — marketing · AI agent — custom · SEO · GEO · Not sure yet. Pre-select from `?service=`.
- Textarea label: "What do you need?" helper: "The more detail — what it's for, who uses it, tools you use, your deadline — the faster we can quote."
- Meta desc: "Tell Bracket what you need — website, app, AI agent, SEO or GEO — and we'll reply with a quote."

---

## 5. Handoff notes for websitebuilder

**Files that change**
| File | Change |
|---|---|
| `bracket-config.js` | Delete `priceFrom`, `carePlan`, both `.js-price`/`.js-care` lines. Default WhatsApp text → "Hi Bracket, I'd like a quote." |
| `index.html` | New hero, 5 service cards, demo kept, process `#process`, why Bracket, FAQ, CTA (section 3) |
| `services.html` | Replace redirect with real page (4.5) |
| `booking.html` | Redirect target → `contact.html` |
| `websites.html`, `apps.html`, `seo.html`, `geo.html` | NEW, from `custom-agent.html` as base (4.1–4.4) |
| `ai-agents.html` + 4 agent pages | Header/footer swap, L260 rewrite, breadcrumb, AR lines |
| `work.html`, `careers.html`, `contact.html` | Copy per 4.7–4.9 |
| all pages | New nav + footer, fonts, meta/OG/canonical, JSON-LD |
| NEW `sitemap.xml`, `robots.txt` (allow GPTBot, PerplexityBot, ClaudeBot, Google-Extended), `llms.txt` | SEO/GEO basics — we sell them, the site must have them |

**Components to reuse (already in the pages):** `.site-header`, `.nav-links`, `.mobile-nav`, `.btn` / `.btn--solid`, `.kicker`, `.lede`, `.tier-card` (service cards; drop `.is-featured` on the 5-grid), `.deliverables`, `.steps4`, `.outs`, `.chips`, `.cross`, `.faq-item` `<details>`, `.cta-band`, footer `.foot-col`, `.wa-float`, `.reveal`/`.reveal-stagger`, demo chat block from index.
**New pieces:** nav dropdown "Services" (button with `aria-expanded`, keyboard + Esc; flat list in mobile menu); `.ar` helper: `font-family:'IBM Plex Sans Arabic'; font-weight:700; font-size:.7em; direction:rtl; text-align:start` with `lang="ar" dir="rtl"`; breadcrumb.
**Tokens/fonts:** keep `:root` colours as they are. Swap IBM Plex Mono → JetBrains Mono; add IBM Plex Sans Arabic 700. Recommend moving shared CSS into one `site.css` (optional, but cuts 9 copies to 1). Hero CTA must be visible without waiting for the reveal animation.

**Find and replace (whole site)**
| Find | Replace |
|---|---|
| `<h4>Studio</h4>` | `<h4>Bracket</h4>` |
| `hello@bracket.studio` (21×, incl. contact.html JS L297) | `[EMAIL]` — waiting on Bilal's real address/domain |
| "a new studio" / "a small studio" / "AI agents studio" | "a new software house" / "a small software house" / "a software house" |
| "We build AI agents for companies — customer, sales, marketing and custom agents. Checked before launch." (footer, all pages) | "Bracket is a Kuwait software house. Websites, apps, AI agents, SEO and GEO. Checked before launch." |
| Nav "AI Agents · Work · Careers · Contact · Start a project" | "Services ▾ · How we work · Contact · Get a quote" |
| "Start a project" (buttons/footer) | "Get a quote" |
| "Tell us the job" (index/contact hero) | "Get a quote" (keep "Tell us the job" on agent pages only) |
| "Which job should an agent take over?" (index CTA) | "What should we build for you?" |
| "scope and a price within two business days" | "a scope and a quote" (unless Bilal confirms the 2-day promise) |
| "Customers get a reply in minutes, at any hour" | "Customers get a reply at any hour, not just office hours" |
| "Bookings land straight in your calendar" | "Bookings go into the calendar you choose" |
| "Send reminders so fewer people no-show" | "Send reminders before each visit" |
| `<title>AI Agents — Bracket</title>` in services.html | `Services — Bracket` |
| page titles "… — Bracket" | keep pattern; home = "Bracket — Software house in Kuwait" |

**QA after build (websiteqa):** zero hits for `studio|priceFrom|carePlan|js-price|js-care`; all 5 services reachable in ≤1 click from every page; contact form lists all 5; hero CTA in first viewport at 390 and 1440; Arabic lines render in IBM Plex Sans Arabic RTL; JSON-LD validates; no number/stat/testimonial anywhere.
