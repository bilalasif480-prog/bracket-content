# Week 3 extras: founding offer + website trials (instamake T-20261123-10, 23 Nov 2026)

Bilal: keep the 21 week-03 reels as they are; add ONE new main on the launch offer and new trial reels from the updated website. Nothing here is posted until Bilal says yes in chat. `POSTING-PLAN.md` is not changed; placement below is a suggestion for PM/Bilal.

- **Source:** only the website facts the PM read from the live site files on 23 Nov (founding offer, "we write the text", ready for Google, phones first, real-phone checks, "nothing goes live without your yes", written scope, websites from £655, 4 steps). No invented clients, results, reviews or prices. No "guaranteed", no rankings, no reply-time promises, no UK office.
- **Look / length / audio:** same as week-03 (`_engine/kit.js` parts, paper bg, kinetic Archivo, white UI cards, dark `[ BRACKET ]` end card "SOFTWARE HOUSE · BASED IN KUWAIT"). Every reel 14.95 s: hook 0–2.5 → proof 2.5–6.8 → payoff 6.8–12.4 → end card 12.4–14.95. Voice `af_heart` 1.0, 3 story lines + spoken closing CTA over the end card, never says "Bracket". New original track per reel (logged in `audio-kit/MUSIC-LOG.md`), mixed with `/home/claude/scr/mix.py`.
- **End card pill:** "Comment START" on all 7 (approved keyword). Topic line: "We'll build it for you." (offer-main, trials 02–05), "We'll write it for you." (trial-01), "Ask for a founding place." (trial-06, the site's CTA wording).
- **Demo screens:** generic mock sites, labelled DEMO where a business name or text appears ("Your Café", "Your Plumbing Co").
- **Engine:** `week-03/extra/_engine/extra.js` (scenes), `lines.json` (voice lines, track per reel), `build_extra.py` (render + audio + mux). Render: from `week-03/_engine`, `X=<id> OUTNAME=extra-<id> node render.js ../extra/_engine/extra`; full build: `python3 -I week-03/extra/_engine/build_extra.py <repo> /home/claude/kmodel [ids]`.
- **Hook check (all 7): passed.** Frame 0 already moving (headline blurring in + a recognisable UI: browser preview, blank page, search bar, go-live switch, phones), claim lands by ~1.2 s, voice starts at 0.2 s on the subject, works on mute, about the viewer's website.
- **Checked:** preview frames at hook / middle / payoff / end card of every final mp4; headline sizes reduced so nothing clips or sits on the background stars; long search-result title shortened; DEMO tag moved off the phone.

Core hashtags (every post): #ManchesterBusiness #ManchesterSmallBusiness #UKSmallBusiness.

---

## A) MAIN · `offer-main.mp4` · 14.95 s · Websites · founding offer
Track: house 139. CTA: Comment START (pill on the end card + caption).
- **Hook:** "Your website first. Payment after." (on screen + voice) with a preview-link browser building itself and a "£0 UPFRONT" chip.
- **Proof:** "We build it. You review it." Preview link (not live yet) → site builds → "Review" tapped → green "Happy? Then pay."
- **Payoff:** "First 5 clients only." Five empty numbered slots + "5 FOUNDING PLACES" (none shown as taken). Card: "No upfront payment. / Pay when you're happy." Honest line: "Scope agreed in writing first."
- **Voice:** "Your website first. Payment after." / "We build it on a preview link. You review it. Happy? Then you pay." / "No upfront payment for our first five clients. Scope agreed in writing first." / "We'll build it for you. Comment start."

**Caption:**
Website first, payment after. No upfront payment for our first 5 clients. Website design Manchester.
How the founding offer works:
1. We agree the scope in writing.
2. We write and build your full website.
3. You review it on our preview link.
4. You pay only when you're happy. Until then it stays on our preview link.
After payment we hand over the files, domain and logins. Changes outside the agreed scope are quoted separately. If you're happy, we ask for an honest public review.
Websites for UK small businesses. Based in Kuwait, working remotely by WhatsApp, email and video call.
Comment START and we'll DM you about a founding place.

#ManchesterBusiness #ManchesterSmallBusiness #UKSmallBusiness #WebsiteDesign #WebDesignManchester #SmallBusinessWebsite #NewWebsite #WebDesignUK #SmallBusinessUK #ManchesterStartups #ShopLocalManchester

- First comment: "What's stopped you getting a website so far: the cost, the time or the writing?"
- Search phrase: "Website design Manchester".
- Cover (pick 1): **"Website first. Pay after."** · alt: "5 founding places"
- Alt text: "Animated reel: a website is built on a preview link, the owner reviews it and pays only when happy; five founding places for the first clients."

## B) TRIALS (Trial switch on, non-followers only). Caption CTA = share line; end card shows "Comment START".

### `trial-01.mp4` · 14.95 s · "Not sure what to write? We write it." · Track: lofi 149
- Hook: "Not sure what to write?" (blank page with dashed placeholders, "TEXT GOES HERE?"). Proof: "One short call. We write the text." (video-call card → page text types itself, DEMO café). Payoff: "You review it first." ✓ Page text written for you ✓ From one short call ✓ You check it on our preview link. End: "We'll write it for you."
- Voice: "Not sure what to write on your website?" / "One short call, and we write the page text for you." / "You check it on our preview link before anything goes live." / "We'll write it for you. Comment start."
- Caption: Stuck on what to write for your website? We write it for you. Website copywriting for small businesses. One short call, we write your page text, and you review it on our preview link before anything goes live. Send this to someone whose website has been "nearly done" for months. #ManchesterBusiness #ManchesterSmallBusiness #UKSmallBusiness #WebsiteCopy #Copywriting #WebDesignManchester #SmallBusinessWebsite #WebsiteDesign #SmallBusinessUK
- First comment: "Which page is hardest to write: home, about or services?"
- Cover: **"Not sure what to write?"** · alt: "We write it." Alt text: "Animated reel: a blank website page fills with text written from one short call, then the owner reviews it on a preview link."

### `trial-02.mp4` · 14.95 s · "Ready for Google from day one" · Track: piano 151
- Hook: "Ready for Google from day one." (search bar types "cafe near me", results appear). Proof: "Built in from the start." (DEMO search result for "Your Café" + ✓ Clear titles ✓ Fast pages ✓ Sensible structure). Payoff: "SEO basics from day one." card "ONGOING SEO · Optional. · Local SEO from £325/month".
- Voice: "Ready for Google from day one?" / "Clear titles, fast pages, a sensible structure. All built in." / "SEO basics from day one. Ongoing SEO is optional." / "We'll build it for you. Comment start."
- Caption: Is your new website ready for Google from day one? SEO-ready website Manchester. Every site we build has clear titles, fast pages and a sensible structure from the start. Ongoing SEO is optional (local SEO from £325/month). Send this to someone launching a new website. #ManchesterBusiness #ManchesterSmallBusiness #UKSmallBusiness #SEO #LocalSEO #SEOManchester #WebDesignManchester #SmallBusinessWebsite #GoogleSearch
- First comment: "Have you ever searched your own business on Google? What came up?"
- Cover: **"Ready for Google?"** · alt: "SEO from day one". Alt text: "Animated reel: a search result is built with clear titles, fast pages and a sensible structure; ongoing local SEO shown as optional."

### `trial-03.mp4` · 14.95 s · "Nothing goes live without your yes" · Track: pluck 157
- Hook: "Nothing goes live without your yes." (GO LIVE switch, locked, "WAITING FOR YOUR YES"). Proof: "You see it first." (preview link site → "Ready to launch?" → tap "Yes" → status PREVIEW → LIVE). Payoff: "Written scope before any work." (scope checklist stamped AGREED).
- Voice: "Nothing goes live without your yes." / "You see the whole site on a preview link. You say yes. Then it goes live." / "And the scope is written down before any work starts." / "We'll build it for you. Comment start."
- Caption: Nothing goes live without your yes. Website design for small businesses. You see the whole site on a preview link first, and the scope is agreed in writing before any work starts. Send this to someone who's been burnt by a web designer before. #ManchesterBusiness #ManchesterSmallBusiness #UKSmallBusiness #WebsiteDesign #WebDesignManchester #SmallBusinessWebsite #WebDesignUK #SmallBusinessUK #NewWebsite
- First comment: "What would you check first on a preview of your new site?"
- Cover: **"Nothing live without your yes"** · alt: "You approve it." Alt text: "Animated reel: a website on a preview link waits for the owner's yes before going live; a written scope is stamped agreed."

### `trial-04.mp4` · 14.95 s · "Checked on real phones before launch" · Track: ambient 163
- Hook: "Checked on real phones." (three phones of different sizes, ticks pop, "BEFORE LAUNCH"). Proof: "Built for phones first." (sites build on each phone, ticks, "CHECKED BEFORE IT GOES LIVE"). Payoff: "What's built in:" ✓ Contact, WhatsApp or booking built in ✓ Card payments: Stripe, PayPal, Square ✓ Easy to edit yourself.
- Voice: "Checked on real phones before launch." / "Built for phones first, and checked on real ones before it goes live." / "WhatsApp or booking built in, card payments, and easy to edit yourself." / "We'll build it for you. Comment start."
- Caption: Most of your customers will see your website on a phone. Mobile-friendly website Manchester. We build for phones first and check every site on real phones before launch, with contact, WhatsApp or booking built in, card payments (Stripe, PayPal, Square) and pages you can edit yourself. Send this to someone whose site is hard to use on a phone. #ManchesterBusiness #ManchesterSmallBusiness #UKSmallBusiness #MobileFriendly #WebDesignManchester #SmallBusinessWebsite #WebsiteDesign #SmallBusinessUK #BookingWebsite
- First comment: "Open your website on your phone now. What's the first thing that annoys you?"
- Cover: **"Checked on real phones"** · alt: "Phones first". Alt text: "Animated reel: a website appears on three phones of different sizes and each gets a tick before launch."

### `trial-05.mp4` · 14.95 s · "Websites from £655" (trades: plumber in Stockport) · Track: house 167
- Hook: "Plumber in Stockport? No website yet?" (search "plumber stockport", results, "Not your business."). Proof: "A site built for the phone." (DEMO "Your Plumbing Co" phone site: Call now / WhatsApp us / Book a visit). Payoff: "Websites FROM £655", "Exact price in a written scope and quote." "TRADES · HOME SERVICES · ANY SMALL BUSINESS". From-price only.
- Voice: "Plumber in Stockport with no website yet?" / "A site built for the phone, with call, WhatsApp or booking built in." / "Websites from six hundred and fifty-five pounds. Exact price in a written quote." / "We'll build it for you. Comment start."
- Caption: Plumber in Stockport with no website yet? Websites for trades from £655. A site built for the phone, with call, WhatsApp or booking built in. The exact price comes in a written scope and quote. Send this to a tradesperson who only gets work by word of mouth. #ManchesterBusiness #ManchesterSmallBusiness #UKSmallBusiness #Stockport #StockportBusiness #PlumberStockport #TradesWebsite #WebsiteForTrades #SmallBusinessWebsite #WebDesignManchester
- First comment: "Tradespeople: where do most of your jobs come from right now?"
- Cover: **"Websites from £655"** · alt: "Plumber in Stockport?". Alt text: "Animated reel: a search for a plumber in Stockport shows other businesses, then a demo plumber website on a phone and a 'from £655' price card."

### `trial-06.mp4` · 14.95 s · "Founding offer", second angle · Track: lofi 173
- Hook: "See your website before you pay." (phone preview building, "PAID: £0"). Proof: "How it works:" 1 Tell us about your business · 2 Scope agreed in writing · 3 We write and build it · 4 Launch after your yes. Payoff: "Pay only when you're happy." ✓ Files, domain and logins handed over after payment ✓ Extra changes outside the scope quoted separately · "FIRST 5 CLIENTS ONLY". End: "Ask for a founding place."
- Voice: "See your new website before you pay a penny." / "Tell us about your business. Agree the scope in writing. We write and build it." / "You pay only when you're happy. First five clients only." / "Ask for a founding place. Comment start."
- Caption: See your new website before you pay a penny. No upfront payment for our first 5 clients. Scope agreed in writing, we write and build the full site, you review it on our preview link and pay only when you're happy. Files, domain and logins are handed over after payment; changes outside the scope are quoted separately; if you're happy, we ask for an honest public review. Send this to a business owner who's been putting off their website. #ManchesterBusiness #ManchesterSmallBusiness #UKSmallBusiness #WebsiteDesign #WebDesignManchester #SmallBusinessWebsite #NewWebsite #SmallBusinessUK #ManchesterStartups
- First comment: "Would you rather see the site first or pay a deposit first?"
- Cover: **"See it before you pay"** · alt: "Founding places". Alt text: "Animated reel: a website preview on a phone with nothing paid, four steps from brief to launch, and payment only when the owner is happy."

---

## Suggested placement (PM/Bilal decide; POSTING-PLAN.md not edited)
- **offer-main:** post as an **extra main on Tue 24 Nov at 20:00 Kuwait (17:00 UK)**, before the 22:00 Quick maths #01 main, and **pin it** to the grid so the offer is the first thing profile visitors see. Alternative: replace the Thu 26 main (`day3-main-rented-shop`, also websites, no maths card).
- **trials 01–06:** run as a **third trial slot, 12:00 Kuwait (09:00 UK), Wed 25 – Mon 30**: Wed trial-03 · Thu trial-01 · Fri trial-04 · Sat trial-02 · Sun trial-05 · Mon trial-06 (offer second angle, after offer-main has had a week). Or hold them for week 4 (Tue 1 – Mon 7 Dec) if 3 trials a day is too much.
- **What to learn (Instapulse):** trial-06 vs offer-main hook ("See your website before you pay" vs "Your website first. Payment after.") on 3 s hold; which website promise (we write it / Google / your yes / real phones / from £655) holds best for the next websites hooks.
