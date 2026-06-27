# VozClinic SEO — Prioritized Action Plan

Score today: **73/100 (NEEDS OPTIMIZATION)**.

**Audience:** Spanish-speaking clinic owners/managers in Tijuana / Baja California (the buyers). Their American patients are not an SEO audience. Optimize for **Spanish local search**, not multilingual reach.

## Phase 1 — Highest leverage (this week)
1. **Google Business Profile.** Create/claim a GBP for VozClinic (software/SaaS, Tijuana), NAP matching the LocalBusiness schema (+52 663 315 4686). Local pack is the top channel for a Tijuana-to-Tijuana sale. Seek a few real reviews.
2. **Single H1.** Demote the live-Sofía widget `<h1>` to `<h2>`; hero stays the only H1.
3. **Sync FAQ schema.** Add the 4 missing FAQs to the JSON-LD (or generate it from `content.ts` so it can't drift).
4. **Trim meta description** to ~155 chars — Spanish, primary keyword + Tijuana/Baja hook.

## Phase 2 — Spanish content & on-page (weeks 2–3)
5. **Build 2–4 unique Spanish pages** for buyer-intent queries ("cómo dejar de perder pacientes por WhatsApp," WhatsApp Business API para clínicas, ROI/pricing deep-dive, how-it-works). Unique content only — no templated swaps.
6. Fix footer dead links: `Términos` → `/terms/`; build or remove `Sobre nosotros` / `Blog` / `Contacto`.
7. Optimize `lainie.png`: WebP/AVIF, <150 KB, add `width`/`height`, `loading="lazy"`.

## Phase 3 — Technical & schema (month 2)
8. Code-split the LiveKit/agent UI so it loads on click, not on page load.
9. Expand sitemap (indexable utility + new Spanish pages); refresh `lastmod` on deploy.
10. `noindex` on thank-you/confirmation pages; self-referencing canonicals on all static pages.
11. Schema: populate `LocalBusiness.sameAs` (GBP + socials), add `Organization` + `WebSite` nodes, add `address` to `Service.provider`, add `aggregateRating` once real reviews exist.
12. Remove dead `<meta name="keywords">` tag.
13. Add `/llms.txt`; add security headers (CSP, X-Frame-Options, X-Content-Type-Options) in `vercel.json`/`vercel.ts`.

## Phase 4 — Ongoing
14. Stand up Google Search Console; track Spanish impressions/clicks and indexation.
15. Local citations / NAP consistency across MX directories.
16. **Optional, low priority:** an English `/en/` route + hreflang — only worth it to chase English-speaking *buyers* (US agencies/clinic groups for White-label), not patients. Skip unless you target that segment.
