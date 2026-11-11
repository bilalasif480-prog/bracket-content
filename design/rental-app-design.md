# Rental app: full mobile design

Task T-20261111-02 · bracket-designer · 2026-11-11 · business: `rental-app`
Built from: `clients/rental-app/research/screens.md` (T-20261111-01).

**Canvas:** https://claude.ai/artifact/TNDb3yAidZvqYjzvzyxQx7 (private to Bilal, not shared)

50 phone artboards (390 px wide), English, Kuwait. They cover all 44 screens in the research inventory. Some screens are split across two boards: welcome / choose role, apply steps 1 and 2, decision / message preview, repairs inbox / detail, and tenant / owner versions of Profile and Messages. Buttons link between artboards, so Play mode works as a prototype.
Everything in [BRACKETS] is a placeholder. There are no real listings, prices, names, reviews or counts.

## The look: "Teal & Sand"

| Role | Hex |
|---|---|
| Background (warm off-white) | `#F7F6F2` |
| Cards | `#FFFFFF`, 1px line `#E2E0D8` |
| Brand teal (buttons, links, active tab) | `#0F6E6A` (hover `#0A4F4C`, tint `#E2F0EE`) |
| Sand accent (money actions such as Pay rent, and "families" notes) | `#E9A23B` (tint `#FCEFD9`, text on tint `#8A4B05`) |
| Success green (verified, accepted, paid) | `#157A3F` (tint `#E3F3E8`) |
| Error / overdue | `#B42318` (tint `#FDE8E6`) |
| Text / secondary text | `#13201F` / `#4F5B59` |

- Font: Plus Jakarta Sans 500–800.
- Corner radius: 16 px for cards and buttons, 14 px for inputs.
- Accessibility: text contrast is at least 4.5:1, touch targets are at least 44 px, and the screens use real buttons, links, inputs and labels.
- Tenant tabs: Search, Saved, Applications, My home, Messages. Profile opens from the avatar on Search and My home.
- Owner tabs: Dashboard, Properties, Applicants, Messages, Profile.

## Screens (artboard files under `project/`)

**Shared · onboarding & account (13)**
- S1 Welcome: `Main.dc.html`
- S1 Choose role: `Role.dc.html`
- S2 Sign up / log in: `SignUp.dc.html`
- S3 Identity verification (Kuwait Mobile ID or Civil ID + selfie): `Verify.dc.html`
- S4 Profile, tenant: `Profile.dc.html`
- S4 Profile, owner: `OwnerProfile.dc.html`
- S5 Messages, tenant: `Messages.dc.html`
- S5 Messages, owner: `OwnerMessages.dc.html`
- S6 Chat thread (phone hidden, safety banner): `Chat.dc.html`
- S7 Notifications: `Notifications.dc.html`
- S8 Documents vault: `Vault.dc.html`
- S9 Settings (notifications, KNET card, language): `Settings.dc.html`
- S10 Help & report listing: `Help.dc.html`

**Tenant · find a home (7)**
- T1 Search results: `TenantSearch.dc.html`
- T2 Filters (governorate → area, rent KD, beds, furnished, rents to, included, verified only): `TenantFilters.dc.html`
- T3 Map view: `TenantMap.dc.html`
- T4 Listing detail (verified badge with date, Rents to, what's included, all move-in costs, exact address after acceptance): `Listing.dc.html`
- T5 Favourites: `TenantSaved.dc.html`
- T6 Saved searches & alerts: `TenantAlerts.dc.html`
- T7 Request a viewing: `TenantViewing.dc.html`

**Tenant · apply (6)**
- T8 Rental profile (apply once, reuse): `RentalProfile.dc.html`
- T9 Step 1, about you & household: `ApplyAbout.dc.html`
- T9 Step 2, employment & salary: `ApplyWork.dc.html`
- T10 Step 3, documents (Civil ID front/back, passport, salary certificate, bank statement, work permit, marriage certificate if asked): `ApplyDocs.dc.html`
- T11 Step 4, review & consent: `ApplyReview.dc.html`
- T12 My applications (statuses): `TenantApplications.dc.html`

**Tenant · living there (5)**
- T13 Lease review & e-sign: `LeaseSign.dc.html`
- T14 My home: `TenantHome.dc.html`
- T15 Pay rent (KNET) & history: `PayRent.dc.html`
- T16 New maintenance request: `NewRepair.dc.html`
- T17 Maintenance requests list: `TenantRepairs.dc.html`

**Owner · listings (8)**
- O1 Dashboard: `OwnerDashboard.dc.html`
- O2 My properties: `OwnerProperties.dc.html`
- O3 New listing 1, basics (type, governorate → area → block → street → building → floor → flat, rent KD, Rents to: families / anyone): `ListBasics.dc.html`
- O4 New listing 2, photos & video: `ListPhotos.dc.html`
- O5 New listing 3, details, included items & all costs: `ListDetails.dc.html`
- O6 New listing 4, screening setup: `ListScreening.dc.html`
- O7 New listing 5, verification: `ListVerify.dc.html`
- O8 New listing 6, preview & publish: `ListPublish.dc.html`

**Owner · applicants & lease (7)**
- O9 Applicants list: `OwnerApplicants.dc.html`
- O10 Applicant summary: `OwnerApplicant.dc.html`
- O11 Document viewer: `OwnerDocs.dc.html`
- O12 Decision (accept / accept with conditions / decline + reasons): `OwnerDecision.dc.html`
- O12 Decision message preview: `OwnerDecisionSend.dc.html`
- O13 Invite to apply: `OwnerInvite.dc.html`
- O14 Create & send lease: `OwnerSendLease.dc.html`

**Owner · running the rental (4)**
- O15 Rent & payments: `OwnerRent.dc.html`
- O16 Maintenance inbox: `OwnerRepairs.dc.html`
- O16 Maintenance detail: `OwnerRepairDetail.dc.html`
- O17 Viewing requests: `OwnerViewings.dc.html`

## Main tap-through flows (Play mode)

- **Tenant:** Welcome → Get started → Choose role → Sign up → Identity check → Search → listing card → Listing → Apply → Rental profile → Step 1 → Step 2 → Step 3 documents → Step 4 review → Send application → My applications → Review lease → Sign with Mobile ID → My home → Pay with KNET.
- **Tenant extras:**
  - Search → Filters / Map
  - Listing → Viewing → Chat
  - My home → Request a repair → My repairs
- **Owner:** Identity check → Continue as owner → Dashboard → New listing → Basics → Photos → Details & costs → Screening → Verification → Publish → Properties → listing → Applicants → applicant → Applicant summary (→ Documents) → Decide → Preview message → Send decision → Send the lease → Send for e-signature → Rent & payments.
- **Owner extras:**
  - Dashboard → Viewing requests / Repairs → Repair detail
  - Applicants → Invite

## Open questions for Bilal

1. **App name and logo.** The design uses [APP NAME] and a key icon as the logo for now.
2. **Arabic / RTL.** Is Arabic in v1 or later? The layout would need mirroring and an Arabic font such as Readex Pro.
3. **Payments provider.** KNET through which gateway? Do payouts go to the owner's IBAN? Does the app take a fee?
4. **Who verifies documents and listings?** An in-house team, a partner, or PACI Mobile ID only? How long does review take?
5. **Identity check.** Can we use PACI Kuwait Mobile ID (Hawiyti) for sign-in and e-signing? This needs an official integration.
6. **Lease template.** Who writes it and has it legally reviewed? Do we help with notarisation (needed by expats for PACI)?
7. **Agency / commission fees.** Can agents and building caretakers list too, or only owners?
8. **Document access.** The design proposes view-only access with no downloads, and access ends when the application closes. Is that OK?
9. **Exact address.** It is hidden until the owner accepts a tenant (privacy). Is that OK?
10. **Fees to apply.** Free for tenants?
11. **Out of scope.** Rooms, shared flats and commercial property are left out.
