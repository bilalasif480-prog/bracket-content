# Rental app: how real rental apps structure screens and flows

Task T-20261111-01 · research agent · 2026-11-11 · business: `rental-app`
For: bracket-designer (T-20261111-02). Links use short tags; the full URLs are in section 7.
Rules followed: every fact has a source; anything marked **(suggestion)** is a design idea, not a fact.
No real people's data, no invented numbers.

---

## 1. Summary: the core flows every app has

1. **Find**: search, then filters, then listing detail, then save or alert. Seen in [BAYUT-APP], [ZUMPER].
2. **Apply once, reuse**: the tenant fills one profile (identity, home history, job, income, documents) and sends it to listings. Seen in [APTS], [ZL-FAQ], [RS-REUSE].
3. **List**: the owner enters basics, then photos, description and policies, then screening rules, then publishes. Seen in [AVAIL], [TT-APP], [TT-PMS].
4. **Review and decide**: an applicant list per listing, then a summary with docs and checks, then accept, accept on condition or deny, then the tenant is notified. Seen in [RS-DEC], [ZL-HELP].
5. **Live tenancy**: e-sign the lease, then rent payments and reminders, maintenance requests and messaging in one portal. Seen in [TT-PMS], [TC-MAINT].

---

## 2. Screen inventory

Tags: T = tenant, O = owner, S = shared. "(suggestion)" in a row means no source showed that exact screen and it is our design idea.

### 2a. Tenant screens (17)

| # | Screen | Purpose | Key elements / fields | Seen in |
|---|---|---|---|---|
| T1 | Home / search results | Browse listings | Result cards (photo, rent, beds, area); sort by area, price, date posted, popularity | [BAYUT-APP] |
| T2 | Filters sheet | Narrow results | Price, bedrooms, neighbourhood, amenities, pet policy; "verified only" toggle (Bayut's "TruCheck First" filter). Kuwait: governorate, then area (suggestion, see section 6) | [ZUMPER], [BAYUT-APP] |
| T3 | Map view | Search by location | Pins on a map. Evidence is thin: Zumper's store page doesn't describe its map, and one review there says it "could be better" | [ZUMPER] |
| T4 | Listing detail | Decide whether to apply | Photo gallery, floor plan, 360° / video tour, all key info on one page, categorised amenities, price-trend chart, "last verified" timestamp | [BAYUT-APP], [BAYUT-FEAT], [BAYUT-TC] |
| T5 | Favourites | Shortlist homes | Saved listings; get back to listings saved or messaged | [BAYUT-APP], [ZUMPER] |
| T6 | Saved searches & alerts | Get told about new homes | Saved filter sets, real-time new-listing alerts | [BAYUT-APP], [ZUMPER] |
| T7 | Request a viewing | Book a visit | Choose in-person or virtual tour, preferred time | [ZUMPER] |
| T8 | Rental profile (reusable application) | Fill in once, apply many times | Saved application data, reused across listings | [APTS], [RS-REUSE] |
| T9 | Application form (multi-step) | Apply to a listing | Steps for identity, household, residence history, employment & income, references, extras (full list in section 3) | [TT-APP], [APTS] |
| T10 | Document upload | Prove income and identity | Upload slots: ID, payslips, bank statements, offer letter; Zillow caps it at 5 income documents | [ZL-FAQ], [ZL-HELP], [TT-APP] |
| T11 | Review & consent | Check, agree, submit | Summary of answers; consent to share data and to contact listed parties | [ZL-HELP] |
| T12 | My applications | Track status | List of started and submitted applications and whether each was accepted; edit info | [APTS], [TT-APP] |
| T13 | Lease review & e-sign | Sign the contract | Lease document, sign button, signed copy stored | [TT-PMS], [RS-DEC] |
| T14 | My home (tenant portal) | Hub after moving in | Lease access, pay rent, messages, maintenance | [TT-PMS] |
| T15 | Pay rent & history | Pay and get receipts | Online payment, autopay, digital receipts. Kuwait: KNET debit cards (see section 6) | [TT-PMS], [KNET] |
| T16 | New maintenance request | Report a problem | Property, priority, up to 10 photos and a short video, category / sub-category, title, details, permission to enter, preferred visit day and time | [TC-MAINT] |
| T17 | Maintenance requests list | Follow up on repairs | Request list, track status, print or PDF copy | [TT-PMS], [TC-MAINT] |

### 2b. Owner screens (17)

| # | Screen | Purpose | Key elements / fields | Seen in |
|---|---|---|---|---|
| O1 | Owner dashboard | Overview at a glance | Rent stats, money owed by tenants, incoming deposits, rentals; leads and interest per property | [TT-PMS], [DALLAL] |
| O2 | My properties | Manage units | Property list; each opens its own applications dashboard | [TT-APP] |
| O3 | New listing, step 1: basics | Core facts | Address, bedrooms, bathrooms, size, monthly rent, availability date. Property type (apartment / house) to fit this app's scope (suggestion) | [AVAIL] |
| O4 | New listing, step 2: photos & video | Show the home | Photo upload (Avail advises at least 5 rooms), optional virtual tour / video | [AVAIL], [BOSH] |
| O5 | New listing, step 3: description & policies | Sell and set terms | Title, 4–6 sentence description, deposit, utilities included, pet policy, amenities, rent specials; optional AI description | [AVAIL], [TT-PMS] |
| O6 | New listing, step 4: screening setup | Choose what to ask | Turn optional application sections on or off, custom questions, which reports and docs, who pays any fee | [TT-APP], [RS-SCR] |
| O7 | Listing / owner verification | Build trust before going live | Upload ownership and ID documents for review; verified badge after approval | [DALLAL], [BAYUT-TC] |
| O8 | Preview & publish | Final check | Preview card and detail, publish. Avail builds the listing title from rent, beds, type, area and one feature | [AVAIL] |
| O9 | Applicants list (per listing) | See who applied | Applications tab per listing, row per applicant, menu for actions | [ZL-HELP], [RS-DEC] |
| O10 | Applicant summary | Judge one applicant | Application, income verification, references and any checks in one view (section 4) | [RS-DEC], [ZL-FAQ] |
| O11 | Document viewer | Open uploaded proofs | Payslips, bank statements, ID; fraud flags on fake docs (TurboTenant premium) | [ZL-FAQ], [TT-APP] |
| O12 | Decision flow | Accept or reject | Accept / Accept on condition / Deny, reason checkboxes, preview of the generated message, send | [RS-DEC] |
| O13 | Invite to apply | Bring in a lead | Send an invite by email or text, or share a unique application link per property | [ZL-FAQ], [TT-APP] |
| O14 | Create & send lease | Close the deal | Lease builder, send for e-signature, alert when signed, reminders for unsigned docs | [TT-PMS], [RS-DEC] |
| O15 | Rent & payments | Track income | Payments received, owed, receipts, custom late fees, automatic rent reminders | [TT-PMS] |
| O16 | Maintenance inbox & detail | Handle repairs | New-request feed plus email alert, request detail with photos, entry permission, record of work done | [TC-MAINT], [TT-PMS] |
| O17 | Viewing requests | Manage visits | Incoming tour requests, accept or propose a time (suggestion: owner side of T7) | [ZUMPER] (tenant side only) |

### 2c. Shared screens (10)

| # | Screen | Purpose | Key elements / fields | Seen in |
|---|---|---|---|---|
| S1 | Welcome & role choice | Pick tenant or owner | Two clear options. TurboTenant asks applicants to choose tenant or co-signer; Dallal lets users apply to become verified listers | [TT-APP], [DALLAL] |
| S2 | Sign up / log in | Create account | Register and log in (Boshamlan has accounts; fields not listed); phone or email (suggestion) | [BOSH] |
| S3 | Identity verification (KYC) | Prove who you are | Identity check before reports or listing. Kuwait option: PACI's Kuwait Mobile ID ("Hawiyti") does ID authentication and digital signature | [TT-APP], [ZL-HELP], [PACI-ID] |
| S4 | Profile | Who I am | Name, photo, short bio (TurboTenant applicant profile), verified badge | [TT-APP] |
| S5 | Messages inbox | All conversations | Threads per listing or applicant; history kept | [TT-PMS], [DALLAL] |
| S6 | Chat thread | Talk safely | In-app chat that hides phone numbers, photo attachments | [TT-PMS], [DALLAL] |
| S7 | Notifications | Alerts | New listing matches, application status, decision, lease signed, rent due, maintenance updates | [ZUMPER], [TT-PMS], [RS-DEC] |
| S8 | Documents vault | Stored papers | Lease, applications, condition reports in one "filing cabinet" | [TT-PMS] |
| S9 | Settings | Preferences | Notification toggles, language (KNET pay pages run in Arabic or English), payment methods | [KNET] |
| S10 | Help & report listing | Safety | Report a suspicious listing; scam-warning tips (suggestion, based on FTC red flags) | [FTC] |

**Totals:** Tenant 17 · Owner 17 · Shared 10 = **44 screens**.

---

## 3. The rental application: fields and documents apps collect

**Applicant type**
- Tenant or co-signer [TT-APP]; co-applicants and guarantors invited by email, and the owner sees the group together [APTS].

**Identity & contact**
- Full name, date of birth, email, phone, emergency contact [TT-APP].
- Legal name, date of birth, current address, identity questions [ZL-HELP].
- Photo ID such as a driving licence [TT-APP]; ID plus vehicle information [APTS].
- Kuwait equivalent: Civil ID copy, passport copy, work permit copy [EXPX] (section 6).

**Household**
- Co-applicants, minors, guarantors and pets living with the applicant; preferred move-in date [APTS].
- Household makeup [ZL-FAQ].

**Residence history**
- Current and past addresses, reason for moving, current living situation [TT-APP].
- Previous landlord contacts and references [TT-APP].

**Employment & income**
- Current and past employers, income, other income sources, current bank [TT-APP].
- Income section with optional uploads: pay stubs, W-2s, tax returns, bank statements, offer letters [ZL-HELP]; up to 5 documents [ZL-FAQ].
- Kuwait equivalent: proof of income; some landlords want an employer letter stating position and salary [EXPX].

**References**
- Personal references [TT-APP]; references [APTS], [RS-SCR].

**Extras & background**
- Pets (with type: pet, emotional support or service animal), vehicles, smoking [TT-APP].
- Criminal history, evictions, foreclosures, special needs [TT-APP].
- Landlord's custom questions [TT-APP].

**Consent & submit**
- Agree to share data with landlords and allow contact with listed parties [ZL-HELP].
- Identity check right after the form [TT-APP].
- Fixing a document later: on Zillow, renters must withdraw and resubmit [ZL-HELP].

**Effort and reuse**
- TurboTenant says applicants usually finish in 5–15 minutes on any device [TT-APP].
- One Apartments.com application covers up to 10 listings for 30 days [APTS]; Zillow allows unlimited participating rentals for 30 days [ZL-FAQ].

> **(suggestion)** For Kuwait, map the US items to: Civil ID (front and back), passport, work permit, salary certificate / employer letter, recent bank statements, marital status document where a family building requires it ([AT-WOMEN], [KT-FLAT]). Drop US credit and criminal checks: no source here shows an equivalent tenant check in Kuwait.

---

## 4. Owner review: what the owner sees and can do

**Where:** Applications tab on each listing, then select the applicant [ZL-HELP], [RS-DEC].

**What they see per applicant**
- One summary view with application, credit, criminal background, evictions, income verification and references [RS-DEC].
- Household makeup, prior homes, contact info, income details, and up to 5 income documents [ZL-FAQ].
- Identity-verified application [ZL-HELP]; the owner also has to verify their own identity before viewing reports [ZL-HELP].
- Fraud flags on falsified documents and fake employers (TurboTenant premium) [TT-APP].
- An applicant summary on a per-property dashboard; data arrives the moment it is submitted [TT-APP].

**Actions**
- **Accept**, **Accept on condition**, **Deny**, with checkboxes for the reasons [RS-DEC].
- Preview the generated email, then send. Applicant gets a result email; owner is BCC'd [RS-DEC].
- After accepting: **Set up payments** or **send lease for signature** [RS-DEC].
- Invite more applicants by email, text or a shared link [ZL-FAQ], [TT-APP].
- Message the applicant in-app [TT-PMS].

**Fairness guidance from the sources**
- Apply the same written criteria to every applicant [RS-DEC], [RS-SCR].
- Make sure the chosen reasons match the real reasons for the decision [RS-DEC].

> **(suggestion)** Statuses for our app: New, Viewed, Info requested, Accepted, Accepted with conditions, Declined, Lease sent, Signed. Sources show the decision options but not a full status list ([RS-SCR] says it does not describe statuses).

---

## 5. Patterns worth copying, and pitfalls to avoid

### Copy
1. **Apply once, reuse.** One saved profile sent to many listings saves renters time and repeat fees [RS-REUSE], [APTS].
2. **One summary per applicant** with everything on one screen, and the decision button beside it [RS-DEC].
3. **Decision with reasons and a message preview**, so the tenant always gets a clear answer [RS-DEC].
4. **Verified badges with a "last checked" date.** Bayut shows when a listing was last authenticated, and verified listings rank higher [BAYUT-TC], [BAYUT-FEAT]. Dallal checks listers and properties before they go live [DALLAL].
5. **In-app chat that hides phone numbers** [TT-PMS]; Dallal treats private messaging as a core feature [DALLAL].
6. **Short, chunked steps**: TurboTenant says a listing takes under 10 minutes [TT-PMS], and TenantCloud splits maintenance into details, problem and visit settings [TC-MAINT].
7. **Owner controls the form**: optional sections on or off, plus custom questions [TT-APP].
8. **Photo guidance inside the upload step**: lead with the living room or kitchen, not the lobby; at least 5 rooms; natural light [AVAIL].
9. **Saved searches with alerts** [BAYUT-APP], [ZUMPER].
10. **Reminders built in**: automatic rent reminders and one-tap nudges for unsigned documents [TT-PMS].
11. **Empty states as a starting point**: NN/g says empty states can build trust, teach the system and help users start key tasks [NNG]. **(suggestion)** Each empty list gets one line plus one button, for example no applicants yet with a "Share listing link" button.

### Avoid
1. **Asking for sensitive documents too early.** The FTC lists early requests for ID or pay stubs, before you agree to rent, as a scam sign [FTC]. **(suggestion)** Collect documents inside a real application to a verified listing, never in chat.
2. **Payment outside the app by wire or gift card**, a scam sign [FTC].
3. **Owners who can't show the home**, also a scam sign [FTC]. **(suggestion)** Make "Request viewing" prominent.
4. **Re-submitting to fix one document.** Zillow makes renters withdraw and resubmit [ZL-HELP]. **(suggestion)** Let tenants replace a single file, and let owners ask for one missing doc.
5. **Hidden costs found late.** A Kuwait renter learned at deposit time that she had to buy her own ACs and pay a commission [KT-FLAT]. **(suggestion)** Show what is included (ACs, utilities, parking) and all fees on the listing.
6. **Discriminatory listing text.** Avail warns against saying who the unit is "perfect for" (a US Fair Housing rule) [AVAIL]. Kuwait has its own occupancy rules (section 6).
7. **Weak map search.** Zumper's store reviews include a complaint that the map could be better [ZUMPER]. Treat the map as a main feature, not an add-on (suggestion).

---

## 6. Kuwait notes (sourced facts only)

**Currency & payment**
- Rent is stated in Kuwaiti Dinars (KD), in numbers and words, with a set payment date [LG-LEASE].
- KNET lets merchants accept debit cards from Kuwait's member banks, settles in KWD and has Arabic and English pages [KNET]. The same page says nearly 80% of online transactions in Kuwait use a KNET card [KNET].

**Identity**
- Leases should list both parties' Civil ID numbers; the tenant may be a citizen or an expatriate [LG-LEASE].
- Expatriates need a notarised, dated lease as proof of residence for PACI when getting a Civil ID [LG-LEASE].
- PACI's Kuwait Mobile ID app ("Hawiyti") shows the Civil ID digitally with QR verification, authenticates identity for government and private transactions, and gives an approved digital signature [PACI-ID].

**Tenant documents asked for**
- Passport copy, Civil ID copy, work permit copy, proof of income; some landlords also want an employer letter stating position and salary [EXPX].
- A working woman with valid residency and a work permit can rent in her own name. The article advises attested marriage documents to show family status [AT-WOMEN].

**Address structure (for listing form and filters)**
- Kuwait has 6 governorates: Ahmadi, Asimah (Capital), Farwaniya, Hawalli, Jahra, Mubarak Al-Kabeer [GOV].
- A lease should describe the unit by governorate, area, block, street, plot or building number, floor and apartment number [LG-LEASE].

**Lease rules**
- Law: Decree Law No. 35 of 1978. Leases are presumed written, rent is fixed in KD, and the law extends the contract automatically [LG-LEASE].
- Rent can't go up until 5 years have passed since the contract or the last increase [LG-LEASE].
- A notarised lease can become an "Executive Deed" for faster enforcement (Decree Law No. 95 of 2024) [LG-LEASE].
- Subletting needs the landlord's written consent [LG-LEASE].
- Renting to single men ("bachelors") is banned in "Model" or "Private" residential areas (Decree Law No. 125 of 1992) [LG-LEASE]. Family buildings generally don't rent to bachelors [KT-FLAT]. **(suggestion)** Add a listing field: who the owner rents to (families / any), shown before a tenant applies.

**Money norms (as the sources state them)**
- Deposit is usually one month's rent and is refundable if there is no damage [EXPX]. Landager says one month is standard for unfurnished flats and villas, one to two months for premium furnished units, and there is no legal cap [LG-DEP]. (Landager's own FAQ contradicts its guide on the cap.)
- Deposit is usually returned 7–14 days after keys are handed back with an MEW clearance certificate [LG-DEP].
- First month's rent is paid up front; an agency fee of about half a month's rent may apply; leases are typically one year; utilities are not included [EXPX].
- Landager recommends a signed move-in/move-out condition report with photos [LG-DEP]. This supports a condition-report screen (suggestion).

**Market context**
- Most listings one renter found came from agencies, and building caretakers (haris) sometimes asked for commission [KT-FLAT].
- Kuwait listing platforms: Boshamlan (free ads with photos or video, website plus apps) [BOSH]; Dallal (verifies listers and properties, private messaging, owner lead dashboard) [DALLAL].

---

## 7. Sources

- [TT-APP] TurboTenant, free online rental application: https://www.turbotenant.com/free-online-rental-application/
- [TT-PMS] TurboTenant, property management software: https://www.turbotenant.com/property-management-software
- [ZL-HELP] Zillow help, rental applications & screening reports: https://zillow.zendesk.com/hc/en-us/articles/32873619235091-Rental-Applications-Screening-Reports
- [ZL-FAQ] Zillow Rental Manager, rental applications FAQ: https://www.zillow.com/rental-manager/rental-applications-faq
- [RS-DEC] RentSpree help, accept or deny an applicant: https://support.rentspree.com/en/ll-how-to-accept-or-deny-an-applicant
- [RS-SCR] RentSpree help, screening tenants overview: https://support.rentspree.com/en/ll-screening-tenants-overview?hsLang=en
- [RS-REUSE] RentSpree blog, reusable applications (vendor source): https://www.rentspree.com/blog/reusable-applications-for-renters
- [APTS] Apartments.com renter help, how to apply: https://renterhelp.apartments.com/article/136-how-to-apply-to-rentals-on-apartmentscom
- [AVAIL] Avail, 7 steps to listing your rental online: https://www.avail.com/education/articles/7-steps-to-listing-your-rental-property-online
- [TC-MAINT] TenantCloud help, submit a maintenance request: https://intercom.help/tenantcloud/en/articles/11932604-how-do-i-submit-a-maintenance-request-to-my-landlord
- [ZUMPER] Zumper, App Store listing: https://apps.apple.com/app/id678683201
- [BAYUT-APP] Bayut, App Store listing: https://apps.apple.com/app/id923263211
- [BAYUT-TC] Bayut, Checked and TruCheck explained: https://www.bayut.com/mybayut/trucheck-bayut-uae
- [BAYUT-FEAT] Bayut, features article: https://bayut.com/mybayut/bayut-features
- [DALLAL] Kuwait Times, Dallal launches in Kuwait: https://kuwaittimes.com/article/50583/business/dallal-launches-in-kuwait-bringing-peace-of-mind-to-property-search/
- [BOSH] Boshamlan, about us: https://boshamlan.com/en/about-us
- [KT-FLAT] Kuwait Times, finding a flat in Kuwait: https://kuwaittimes.com/nightmare-finding-flat-kuwait
- [LG-LEASE] Landager, Kuwait lease requirements: https://landager.com/en/property-compliance/kuwait/national/lease-requirements
- [LG-DEP] Landager, Kuwait security deposits: https://landager.com/en/property-compliance/kuwait/national/security-deposits
- [EXPX] Expat Exchange, renting in Kuwait: https://expatexchange.com/article/18314/Renting-in-Kuwait-How-to-Rent-a-Home-in-Kuwait
- [AT-WOMEN] Arab Times, working women renting in their own name: https://www.arabtimesonline.com/news/did-you-know-single-working-women-in-kuwait-can-legally-rent-flats-in-their-own-name
- [PACI-ID] Kuwait e-Gov, Kuwait Mobile ID (PACI): https://e.gov.kw/sites/kgoenglish/Pages/ApplicationPages/Application-PACI.aspx
- [GOV] Wikipedia, Governorates of Kuwait: https://en.wikipedia.org/wiki/Governorates_of_Kuwait
- [KNET] Checkout.com, KNET payment method: https://www.checkout.com/payment-methods/knet
- [FTC] US FTC, rental listing scams: https://consumer.ftc.gov/articles/rental-listing-scams
- [NNG] Nielsen Norman Group, empty states video: https://www.nngroup.com/videos/empty-states-in-application-design-guidelines/

Limits: Property Finder, Dubizzle, SpareRoom and Rightmove pages were not fetched, so they are not cited. No source showed a Kuwait-specific rental-application app with salary upload; Kuwait items above come from guides, law summaries and news. Map-search evidence is thin (T3).

<!-- link definitions so the [TAG] references render as links -->
[TT-APP]: https://www.turbotenant.com/free-online-rental-application/
[TT-PMS]: https://www.turbotenant.com/property-management-software
[ZL-HELP]: https://zillow.zendesk.com/hc/en-us/articles/32873619235091-Rental-Applications-Screening-Reports
[ZL-FAQ]: https://www.zillow.com/rental-manager/rental-applications-faq
[RS-DEC]: https://support.rentspree.com/en/ll-how-to-accept-or-deny-an-applicant
[RS-SCR]: https://support.rentspree.com/en/ll-screening-tenants-overview?hsLang=en
[RS-REUSE]: https://www.rentspree.com/blog/reusable-applications-for-renters
[APTS]: https://renterhelp.apartments.com/article/136-how-to-apply-to-rentals-on-apartmentscom
[AVAIL]: https://www.avail.com/education/articles/7-steps-to-listing-your-rental-property-online
[TC-MAINT]: https://intercom.help/tenantcloud/en/articles/11932604-how-do-i-submit-a-maintenance-request-to-my-landlord
[ZUMPER]: https://apps.apple.com/app/id678683201
[BAYUT-APP]: https://apps.apple.com/app/id923263211
[BAYUT-TC]: https://www.bayut.com/mybayut/trucheck-bayut-uae
[BAYUT-FEAT]: https://bayut.com/mybayut/bayut-features
[DALLAL]: https://kuwaittimes.com/article/50583/business/dallal-launches-in-kuwait-bringing-peace-of-mind-to-property-search/
[BOSH]: https://boshamlan.com/en/about-us
[KT-FLAT]: https://kuwaittimes.com/nightmare-finding-flat-kuwait
[LG-LEASE]: https://landager.com/en/property-compliance/kuwait/national/lease-requirements
[LG-DEP]: https://landager.com/en/property-compliance/kuwait/national/security-deposits
[EXPX]: https://expatexchange.com/article/18314/Renting-in-Kuwait-How-to-Rent-a-Home-in-Kuwait
[AT-WOMEN]: https://www.arabtimesonline.com/news/did-you-know-single-working-women-in-kuwait-can-legally-rent-flats-in-their-own-name
[PACI-ID]: https://e.gov.kw/sites/kgoenglish/Pages/ApplicationPages/Application-PACI.aspx
[GOV]: https://en.wikipedia.org/wiki/Governorates_of_Kuwait
[KNET]: https://www.checkout.com/payment-methods/knet
[FTC]: https://consumer.ftc.gov/articles/rental-listing-scams
[NNG]: https://www.nngroup.com/videos/empty-states-in-application-design-guidelines/
