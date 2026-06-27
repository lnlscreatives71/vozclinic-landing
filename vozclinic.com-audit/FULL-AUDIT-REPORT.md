# VozClinic — Full SEO Audit

**URL:** https://vozclinic.com/
**Audited:** 2026-06-23 (against local source + live deployment)
**Business type:** Local SaaS / Local Service hybrid (AI WhatsApp receptionist for clinics, Baja California)
**Stack:** Prerendered React SPA on Vercel, bilingual via client-side toggle

## SEO Health Score: 73 / 100 — **NEEDS OPTIMIZATION**

> **Revised 2026-06-24:** Buyers are Spanish-speaking clinic owners in Tijuana/Baja California. The clinics' *patients* are American, but patients don't buy or search for this product. Therefore Spanish-only indexing is correct, and the previous "English content invisible" Critical finding is retracted (demoted to optional, #1 below). Scores for Technical, Content, and AI Search raised accordingly.

| Category | Weight | Score |
|----------|-------:|------:|
| Technical SEO | 22% | 78 |
| Content Quality | 23% | 78 |
| On-Page SEO | 20% | 70 |
| Schema / Structured Data | 10% | 78 |
| Performance (CWV) | 10% | 58 |
| AI Search Readiness | 10% | 70 |
| Images | 5% | 62 |

---

## What already works (don't break these)

- Real prerendered body content (~2,300 words) — bots and AI crawlers see the page, not an empty `#root`. This is the single biggest thing most React landing pages get wrong, and it's done right here.
- Self-referencing canonical, `robots: index,follow`, HTTPS + HSTS, clean allow-all robots.txt with sitemap reference.
- Rich, mostly-valid JSON-LD graph: SoftwareApplication + 4 Service offers + LocalBusiness + FAQPage.
- Strong E-E-A-T: named founder with photo and real credentials (PMP, Six Sigma, CSM), local operation, a *sourced* market stat (Baja Health Cluster), founder contact.
- Good title length (~45 chars), keyword-relevant.
- Image alt text present on both content images.
- Geo meta (region MX-BCN, coordinates) for local targeting.

---

## Who we're optimizing for (audience correction)

The search target is **Spanish-speaking clinic owners and managers in Tijuana / Baja California** — the people who buy VozClinic. Their patients are American and English-speaking, but patients neither buy the product nor search for it, so they are not an SEO audience. English on the page stays as a *capability demo and credibility asset*; it is not an acquisition channel.

Implication: the real SEO opportunity is **dominating Spanish local search in Tijuana/Baja** (Google Business Profile + local schema + Spanish clinic-owner queries), not multilingual reach. The retracted English finding is now an optional, low-priority item (#1 below).

## CRITICAL

*(none — Spanish-only indexing is correct for this audience; the prior English-indexing finding was retracted)*

## HIGH

### 1. No Google Business Profile / local-pack presence — the biggest miss for this audience
For a Tijuana company selling to Tijuana clinic owners, **local search is the highest-leverage channel**, and the on-page work can't substitute for it. A clinic owner googling "recepcionista virtual Tijuana," "software para citas clínica dental Tijuana," or "contestar WhatsApp clínica automático" sees the local pack and Maps before organic results. Actions: create/claim a **Google Business Profile** for VozClinic (software/SaaS company category, Tijuana), keep NAP consistent with the LocalBusiness schema already on the site (phone +52 663 315 4686, Tijuana BCN), and seek a handful of real reviews. This pairs with the LocalBusiness schema you already ship. *This is now the de-facto top priority.*

### 2. Thin topical footprint for Spanish buyer queries
The site is a single homepage. Clinic owners research in Spanish with intent queries the homepage doesn't target: "cómo dejar de perder pacientes por WhatsApp," "agendar citas dentales automático," "WhatsApp Business API para clínicas," "reducir no-shows clínica dental." Add a few **genuinely unique Spanish pages** (how-it-works deep dive, a pricing/ROI page, 2–3 problem-led articles) — not templated city/keyword swaps. This is where Spanish "keyword" effort actually converts (see keyword note).

### 3. Two `<h1>` tags on the homepage
The page renders two H1s: the live-Sofía widget ("Habla con Sofía ahora mismo") and the hero ("La recepcionista de WhatsApp..."). One H1 per page. Demote the Sofía widget heading to `<h2>` (or `<p>` with heading styling). Confirmed on live HTML (`H1 count: 2`).

---

## HIGH

### 4. FAQPage schema is out of sync with the page (4 of 8 FAQs)
`content.ts` has **8** FAQ items; the JSON-LD in `index.html` lists only **4**. The four missing from structured data: "Does it really speak English…", "What if I want to cancel," "Can it integrate with Dentrix/Eaglesoft," "Can I still become a design partner." You're leaving FAQ rich-result coverage on the table, and the two will keep drifting. Generate the FAQ JSON-LD from the same source as the page, or at minimum add the 4 missing entries now.

### 5. Meta description is ~290 characters — truncated in SERPs
Google shows ~155–160. The current description runs to the clinic-vertical list and gets cut. Tighten to one sharp Spanish sentence with the primary keyword (recepcionista de WhatsApp con IA) + the Tijuana/Baja local hook.

### 6. Dead internal links in the footer
`Sobre nosotros`, `Blog (próximamente)`, `Contacto`, and `Términos` all point to `href="#"`. `Términos` is especially bad — a `/terms/` page exists but isn't linked. Dead `#` links waste internal-link equity and read as unfinished. Wire `Términos`→`/terms/`, and either build or remove the others.

### 7. `lainie.png` is a 2.1 MB PNG loaded eagerly — LCP/CWV risk
2.1 MB, `loading="eager"`, no `width`/`height` (layout shift). Convert to WebP/AVIF (target <150 KB), add intrinsic dimensions, and only keep `eager` if it's actually above the fold (it isn't — it's the founder section, so make it `lazy`).

---

## MEDIUM

### 8. Sitemap is stale and incomplete
`lastmod` is 2026-05-03; one URL only. Add the indexable utility pages (`/aviso-de-privacidad/`, `/privacy/`, `/terms/`, and the waitlist landing if you want it found) plus any new Spanish content pages, and refresh `lastmod` on deploy.

### 9. JS bundle is 887 KB (LiveKit + motion + React)
The live-Sofía widget pulls in `livekit-client` (heavy) on the main bundle. Code-split the LiveKit/agent UI so it loads only when a user clicks "Hablar con Sofía." Cuts TBT/INP on first load.

### 10. Missing security/SEO response headers
No `Content-Security-Policy`, `X-Frame-Options`, or `X-Content-Type-Options` on the Vercel response. Low ranking impact, but trivially fixable in `vercel.json` / `vercel.ts` and good hygiene.

### 11. Schema gaps
- `LocalBusiness.sameAs: []` is empty — add real social/profile URLs (GBP, LinkedIn, Instagram, Facebook) to strengthen the entity / knowledge-panel signals.
- No `Organization` or `WebSite` node (WebSite enables sitelinks-search eligibility later; Organization carries the logo).
- No `aggregateRating` anywhere — add once you have real reviews (don't fake it).
- `Service` nodes' `provider` LocalBusiness has no address (the standalone LocalBusiness node does).

### 12. Thank-you / form pages need consistent `noindex`
`book-demo` and `agendar-demo` correctly carry `noindex,nofollow`. But `waitlist`, `lista-espera`, `waitlist-thanks`, `lista-gracias`, `gracias-referido`, `thanks-referral`, `refer`, `recomienda` have **no robots meta**. Confirmation/thank-you pages should be `noindex`; decide whether the waitlist/refer landing pages should be indexable (if yes, give them canonicals and unique descriptions).

### 13. No canonical tags on any static utility page
None of `/privacy/`, `/terms/`, `/aviso-de-privacidad/`, etc. have a self-referencing canonical. Add them.

---

## LOW

### 14. `keywords` meta tag (line 11) — dead weight
Google and Bing have ignored the meta keywords tag for ranking for over a decade. It does nothing positive and slightly advertises your target terms to competitors. Safe to remove. (See the keyword note below for what actually helps.)

### 15. No `llms.txt`
For AI-search visibility (ChatGPT/Perplexity/AIO), a `/llms.txt` summarizing what VozClinic is, who it's for, pricing, and key URLs is a cheap GEO win. `robots.txt` already allows AI crawlers.

### 16. `<html lang>` doesn't follow the language toggle
Stays `es` even after switching to English in the UI. Minor a11y nicety only — since Spanish is the indexed/default language and that's correct for this audience, this is low priority and needs no action unless you later build the optional `/en/` route.

---

## On the `keywords` question (schema vs. meta)

Short version: **putting keywords into schema won't move rankings.** Neither the `<meta name="keywords">` tag nor a Schema.org `keywords` property is a Google ranking factor. Schema earns you *rich results and entity understanding*, not keyword credit — stuffing terms into it is ignored at best.

Where "keywords" actually pay off (all in Spanish, for the Tijuana clinic-owner buyer):
1. **Visible, indexable copy** — the target Spanish phrases in the H1/H2s, body, title, and alt text. You already do this well on the homepage; the lever is *more* Spanish pages targeting buyer-intent queries (#2 in High), not more terms crammed anywhere.
2. **Entity properties Google does consume** — `applicationCategory`, `serviceType`, `areaServed`, `address`, and the FAQ questions. Tighten these (areaServed already lists the right Baja cities) instead of adding a `keywords` array.
3. **Google Business Profile** — for a local Tijuana buyer, the GBP + local pack carries more "keyword" weight than any on-page tag (#1 in High).

So: remove the dead meta keywords tag, don't add a schema `keywords` blob, and spend that effort on GBP, Spanish content depth, and the entity fields. That's where the SEO benefit actually is.
