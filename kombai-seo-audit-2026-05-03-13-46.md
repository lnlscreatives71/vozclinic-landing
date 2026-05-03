# SEO Audit — VozClinic Landing Page
**Date:** 2026-05-03  
**URL:** http://localhost:5173/  
**Overall Score:** 71 / 100

---

## ❌ Critical Issues (Failing)

### 1. `robots.txt` — Invalid / Missing
**Severity:** High  
`/robots.txt` returns the SPA HTML page instead of a real robots file. The Lighthouse audit found 19 parse errors.  
**Fix:** Create `public/robots.txt` with proper directives and a sitemap pointer.

### 2. Uncrawlable Hidden Link
**Severity:** Medium  
The TopBar CTA (`<a href="...calendly...">`) has `display: none` on mobile via Tailwind's `hidden sm:inline-flex` class. Googlebot sees a hidden link and flags it.  
**Fix:** Make the button visible at all viewport sizes (remove the `hidden` class).

---

## ⚠️ Missing SEO Elements (Not Audited by Lighthouse but Critical)

### 3. No Open Graph / Social Meta Tags
The page has no `og:title`, `og:description`, `og:image`, or `og:url`. Every WhatsApp/Facebook/LinkedIn share will show a blank or broken preview — especially damaging for a WhatsApp-first product.  
**Fix:** Add full OG + Twitter Card meta tags to `index.html`.

### 4. No Structured Data (JSON-LD)
No machine-readable schema. Google cannot understand the business type, location, or contact details.  
**Fix:** Add `LocalBusiness` + `SoftwareApplication` JSON-LD schema.

### 5. No `sitemap.xml`
Search engines cannot discover pages without a sitemap.  
**Fix:** Create `public/sitemap.xml`.

### 6. No Canonical URL
No `<link rel="canonical">` tag. Risk of duplicate-content penalties if the domain is accessible via both www and non-www.  
**Fix:** Add canonical once production domain is confirmed.

---

## ℹ️ Contrast Warnings (Informational)

10 contrast issues detected, all inside the **WhatsApp phone mockup** (timestamps `#999` on white, double-check marks `#53BDEB` on green). These are intentional UI simulation choices and do not affect real patient-facing text. Noted but not changed.

---

## ✅ Passing

| Check | Status |
|---|---|
| Meta description present | ✓ |
| HTTP 200 status | ✓ |
| All visible link texts descriptive | ✓ (26/26) |
| Page crawlable by major bots | ✓ (Google, Bing, DuckDuckGo, Archive.org) |
| Mobile viewport tag | ✓ |
| Language attribute on `<html>` | ✓ (`lang="es"`) |
| Descriptive page title | ✓ |

---

## Changes Applied

| File | Change |
|---|---|
| `public/robots.txt` | Created with `Allow: /` and sitemap pointer |
| `public/sitemap.xml` | Created with placeholder production URL |
| `index.html` | Added OG tags, Twitter card, JSON-LD, canonical |
| `src/components/TopBar.tsx` | Removed `hidden` so CTA is crawlable on all viewports |
