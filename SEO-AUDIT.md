# SEO Audit - ketocontractor.com Marketing Site

> Generated 2026-04-23 by Claude using the marketing-skill/seo-audit framework.
> Supersedes the 2026-04-16 audit.
> Repo: `jbertus/keto-landing-page`
> Files audited: `index.html`, `sunday-prep-method.html`, `privacy.html`, `terms.html`, `trial.html`, `profit_forge.html` (6 pages)
> Live site: `https://ketocontractor.com`
> Data sources: Playwright live audit (homepage + all 6 pages + extensionless variants + robots.txt + sitemap.xml), seo_checker.py script, `netlify.toml` analysis.

---

## Executive Summary

### Overall Health

Netlify-hosted static site with excellent network performance (TTFB 39ms, FCP 292ms, networkIdle 727ms). Three structural blockers prevent meaningful organic growth: the Netlify catch-all rewrite breaks robots.txt and sitemap.xml delivery, 4 of 6 pages lack canonical tags creating duplicate-URL signals, and the homepage ships 10.4MB of unoptimized PNG images with no lazy loading. Underlying infrastructure is healthy; the gaps are configuration and asset hygiene, not architecture.

### Top 5 Priority Issues (Impact x Effort)

1. **robots.txt and sitemap.xml serve HTML instead of the actual files.** Netlify catch-all `/* -> /index.html` rewrite intercepts both requests and returns the homepage markup. Critical crawl blocker. Fix requires a netlify.toml exclusion plus creating both files at the repo root. Low effort, high impact.
2. **4 pages missing canonical tags:** privacy.html, terms.html, sunday-prep-method.html, profit_forge.html. Each page is reachable at both `/page` and `/page.html`, so search engines see duplicate URLs with no preferred version declared. 15-minute fix across 4 files.
3. **Homepage ships 10.4MB in 5 unoptimized PNGs.** No `loading="lazy"`, no `srcset`, no WebP or AVIF variants. Biggest perceivable performance issue once images enter the viewport. Multi-stage fix (compress, convert, add responsive markup) with high ROI on mobile and Core Web Vitals.
4. **index.html and trial.html share an identical H1** ("One Sunday. Seven days of food."). Keyword cannibalization on trial-intent queries; trial.html cannot differentiate itself in SERPs. 5-minute copy fix on trial.html to a conversion-focused variant.
5. **Zero og:image, zero Twitter Card tags, zero JSON-LD across all 6 pages.** Social shares render blank previews and search engines have no structured data to parse (no Product, FAQ, Organization, or BreadcrumbList). Produce one 1200x630 social card asset, then compound the win across every page in a single pass.

### Quick Wins (ship today, under 30 min each)

- Add `loading="lazy"` to below-the-fold images on index.html
- Add canonical tags (extensionless form) to privacy.html, terms.html, sunday-prep-method.html, profit_forge.html
- Add missing meta descriptions to privacy.html and terms.html
- Trim trial.html meta description from 174 to roughly 155 characters
- Normalize trial.html canonical from the `.html` form to the extensionless form

### Strategic Decision Required (not urgent but blocks long-term)

Profit Forge sells tool-arbitrage service-business blueprints, a product unrelated to keto meal-prep. Hosting two unrelated product entities on one domain fragments topical authority and confuses both search engines and visitors about what ketocontractor.com is about. Recommendation: move Profit Forge to a subdomain (`profitforge.ketocontractor.com`) or a separate TLD before investing further SEO effort into that page. Flag this as a decision required from ownership; all downstream SEO work on profit_forge.html should pause until the domain strategy is settled.

---

## Per-Page Findings

### `index.html` — https://ketocontractor.com/

**Role:** Homepage / primary marketing landing page.

**Findings:**

1. **Title too short, missing primary keyword** — *Impact: High*
   - **Evidence:** line 6 `<title>Keto Contractor — AI Meal Prep for Busy People</title>` is 46 chars (target 50-60).
   - **Fix:** expand to 55-58 chars with "Keto Meal Prep" front-loaded. Example: "AI Keto Meal Prep for Contractors - Plan Your Week."
   - **Priority:** 1

2. **H1 contains no primary keyword** — *Impact: High*
   - **Evidence:** line 580 H1 is "One Sunday. Seven days of food." - no "keto," "meal prep," or audience.
   - **Fix:** restructure to include keyword + benefit. Example: "Keto Meal Prep in One Sunday - Seven Days of Food."
   - **Priority:** 1

3. **H2s under-utilize primary keywords** — *Impact: Medium*
   - **Evidence:** section H2s are benefit-focused, not keyword-aligned.
   - **Fix:** weave "keto meal prep" or "AI meal planner" into 2-3 of the 6 H2s naturally.
   - **Priority:** 2

4. **og:description diverges from meta description and omits audience** — *Impact: Medium*
   - **Evidence:** og:description says "people who don't have time" (line 9); meta description (line 7) explicitly names "contractors, nurses."
   - **Fix:** align og:description to include audience.
   - **Priority:** 2

5. **Missing JSON-LD structured data** — *Impact: Medium*
   - **Evidence:** no script type application/ld+json.
   - **Fix:** add SoftwareApplication schema referencing the app + Organization schema for brand + FAQPage schema if/when an FAQ section is added.
   - **Priority:** 2

6. **Alt text generic, misses keyword opportunity** — *Impact: Low*
   - **Evidence:** alts like "Organized meals, save money, more energy" and "AI-generated meal plans and recipes" work for accessibility but are weak for image SEO.
   - **Fix:** include "keto" in alts where natural.
   - **Priority:** 3

7. **No FAQ section or FAQPage schema** — *Impact: Medium*
   - **Evidence:** landing page has no Q&A block; competitors capture featured snippets for "how long does keto meal prep take," "is AI meal prep accurate," etc.
   - **Fix:** add 4-6 FAQ block before pricing, wire FAQPage JSON-LD.
   - **Priority:** 3

8. **Hero subheading frontloads "AI" before "keto"** — *Impact: Low*
   - **Evidence:** line 581 "The AI meal prep planner built for people who work hard..." mentions "AI meal prep" but "keto" first appears later.
   - **Fix:** frontload "keto" in the subhead.
   - **Priority:** 4

### `sunday-prep-method.html` — https://ketocontractor.com/sunday-prep-method.html

**Role:** Lead-magnet landing page for Sunday Prep Method email capture.

**Findings:**

1. **Critically thin content (124 words)** — *Impact: High*
   - **Evidence:** body copy totals ~124 words across H1, lead paragraph, and bullet list. Well below 300-word SEO minimum.
   - **Fix:** either (a) expand to 400+ words with H2 subheadings covering the 5-step system OR (b) add `<meta name="robots" content="noindex, follow">` to prevent cannibalizing the homepage for "sunday meal prep" queries.
   - **Priority:** 1

2. **Missing canonical link** — *Impact: High*
   - **Evidence:** no `<link rel="canonical">` in head; page serves at both `/sunday-prep-method` and `/sunday-prep-method.html`.
   - **Fix:** add `<link rel="canonical" href="https://ketocontractor.com/sunday-prep-method" />`.
   - **Priority:** 1

3. **Meta description too short (117 chars)** — *Impact: Medium*
   - **Evidence:** current description is 117 chars; ideal is 150-160.
   - **Fix:** expand by 40-45 chars with secondary keyword coverage.
   - **Priority:** 2

4. **No heading hierarchy beyond H1** — *Impact: Medium*
   - **Evidence:** seo_checker.py confirms only 1 H1, no H2/H3. Compounds thin-content issue.
   - **Fix:** add H2 subheadings for "The 5-Step System," "What You Get," "Who This Is For."
   - **Priority:** 2

5. **Weak keyword targeting** — *Impact: Medium*
   - **Evidence:** title targets branded "Sunday Prep Method" only; body never uses high-volume variants like "one-day meal prep" or "sunday meal prep."
   - **Fix:** rewrite H1 and lead paragraph to naturally include variant keywords.
   - **Priority:** 2

6. **No internal linking back to main product** — *Impact: Medium*
   - **Evidence:** only external link is to homepage URL in footer; no contextual CTA linking back to trial or homepage.
   - **Fix:** add inline "Ready to automate this? Start your free trial" link mid-page.
   - **Priority:** 2

7. **No robots/noindex decision documented** — *Impact: Medium*
   - **Evidence:** page has no robots meta. Ambiguous whether this should rank independently or be a lead-magnet funnel only.
   - **Fix:** make the call per finding 1.
   - **Priority:** 1

8. **No structured data** — *Impact: Low*
   - **Evidence:** no JSON-LD.
   - **Fix:** add HowTo schema for the 5-step system OR FAQPage if Q&A section is added.
   - **Priority:** 3

9. **Missing og:image** — *Impact: Low*
   - **Evidence:** page shares on social without preview.
   - **Fix:** add og:image (see site-wide findings for asset gap).
   - **Priority:** 3

10. **Form success state does not offer next-step CTA** — *Impact: Medium*
    - **Evidence:** after email submit the success div shows "Check your inbox for the Sunday Prep Method" no follow-up action.
    - **Fix:** append "Ready to stop thinking about food every day? Start your free trial" with link to `/trial`.
    - **Priority:** 3

### `trial.html` — https://ketocontractor.com/trial.html

**Role:** Dedicated free-trial signup landing page.

**Findings:**

1. **Duplicate H1 with index.html** — *Impact: High*
   - **Evidence:** trial.html H1 is "One Sunday. Seven days of food." identical to index.html H1. Keyword cannibalization risk for trial-intent queries.
   - **Fix:** rewrite trial H1 to emphasize trial mechanics. Example: "7-Day Free Trial. No Credit Card." or "Start Your Keto Trial. 20 AI Credits Free."
   - **Priority:** 1

2. **Meta description 174 chars, will truncate in SERPs** — *Impact: High*
   - **Evidence:** line 7 description is 174 chars; Google displays ~155-160 on desktop, ~120 on mobile. Key phrase "no credit card needed" sits at the tail and gets cut.
   - **Fix:** shorten to ~155 chars, frontload the no-credit-card benefit.
   - **Priority:** 1

3. **Title slightly underpowered for trial-intent queries** — *Impact: Medium*
   - **Evidence:** "Start Your 7-Day Free Trial - Keto Contractor" (45 chars) missing "keto" or "meal prep" keyword modifiers.
   - **Fix:** expand to 55-60 chars. Example: "Free Keto Meal Prep Trial - 7 Days, No Credit Card."
   - **Priority:** 2

4. **Canonical uses `.html` form (inconsistent with rest of site)** — *Impact: Medium*
   - **Evidence:** canonical is `https://ketocontractor.com/trial.html` but pretty-URL `/trial` serves identical content. index.html uses extensionless canonical.
   - **Fix:** standardize canonical to `https://ketocontractor.com/trial` across all pages.
   - **Priority:** 2

5. **No JSON-LD schema** — *Impact: Medium*
   - **Evidence:** no structured data.
   - **Fix:** add BreadcrumbList (Home > Free Trial) + Product schema with Offer (price 0, priceValidUntil) + aggregateRating if review data available.
   - **Priority:** 2

6. **Weak internal linking to/from homepage** — *Impact: Medium*
   - **Evidence:** only 1 link back to homepage (nav logo). No contextual body link.
   - **Fix:** add 1-2 inline links with keyword-rich anchor text back to `/` (e.g., "See the full meal prep planner").
   - **Priority:** 3

7. **Missing og:image** — *Impact: Medium*
   - **Evidence:** has og:title and og:description but no og:image; trial page shared in DMs shows no preview.
   - **Fix:** create trial-specific 1200x630 social card and add og:image tag (covered in site-wide findings).
   - **Priority:** 3

8. **H2 tags generic and keyword-weak** — *Impact: Low*
   - **Evidence:** H2s like "Full access for 7 days. No credit card." and "Simple. Honest. No tricks." are punchy but don't reference trial-intent keywords.
   - **Fix:** consider "What You Get in Your Free Keto Trial" and "How the 7-Day Keto Trial Works."
   - **Priority:** 3

### `privacy.html` — https://ketocontractor.com/privacy.html

**Role:** legal / privacy policy

**Findings:**

1. **Missing meta description** — *Impact: High*
   - **Evidence:** no `<meta name="description">` in head. SERP snippet will auto-generate, reducing CTR control.
   - **Fix:** add `<meta name="description" content="Privacy Policy for Keto Contractor. Learn how we collect, use, and protect your personal data.">` (100 chars).
   - **Priority:** 1

2. **Missing canonical tag** — *Impact: High*
   - **Evidence:** page serves at both `/privacy` and `/privacy.html`. No canonical. Duplicate URL.
   - **Fix:** add `<link rel="canonical" href="https://ketocontractor.com/privacy">`.
   - **Priority:** 1

3. **Title too short (32 chars)** — *Impact: Medium*
   - **Evidence:** "Privacy Policy - Keto Contractor" is 32 chars; 50-60 is target.
   - **Fix:** expand to "Keto Contractor Privacy Policy - How We Protect Your Data" (57 chars) or similar.
   - **Priority:** 3

4. **No robots meta tag, noindex not considered** — *Impact: Medium*
   - **Evidence:** page indexable by default. Legal pages are often noindexed to reduce crawl waste and avoid ranking for low-intent legal queries.
   - **Fix:** decide - (a) add `<meta name="robots" content="noindex, follow">` OR (b) keep indexable with canonical as the only protection. Recommend (a).
   - **Priority:** 2

5. **Internal footer links mix formats** — *Impact: Low*
   - **Evidence:** footer links use relative paths (`/`, `/terms`) which are fine but should match the canonical extensionless convention once canonical is added.
   - **Fix:** none needed after canonical is set.
   - **Priority:** 4

### `terms.html` — https://ketocontractor.com/terms.html

**Role:** legal / terms of service

**Findings:**

1. **Missing meta description** — *Impact: High*
   - **Evidence:** no description tag.
   - **Fix:** add `<meta name="description" content="Terms of Service for Keto Contractor. Review subscription terms, AI credit usage, and user agreements.">`.
   - **Priority:** 1

2. **Missing canonical tag** — *Impact: High*
   - **Evidence:** `/terms` and `/terms.html` both serve same content.
   - **Fix:** add `<link rel="canonical" href="https://ketocontractor.com/terms">`.
   - **Priority:** 1

3. **Title too short (34 chars)** — *Impact: Low*
   - **Evidence:** "Terms of Service - Keto Contractor" is 34 chars.
   - **Fix:** leave as-is for legal-page clarity OR expand to "Keto Contractor Terms of Service and Subscription Policy."
   - **Priority:** 4

4. **No noindex decision** — *Impact: Medium*
   - **Evidence:** same as privacy.
   - **Fix:** add `<meta name="robots" content="noindex, follow">` to prevent legal-page ranking but preserve link equity.
   - **Priority:** 2

5. **Footer link format consistency** — *Impact: Low*
   - **Evidence:** same as privacy.
   - **Fix:** align with canonical extensionless convention once canonical is set.
   - **Priority:** 4

### `profit_forge.html` — https://ketocontractor.com/profit_forge.html

**Role:** sales page for Profit Forge - unrelated product, NOT keto meal prep

**Findings:**

1. **Domain misalignment (strategic)** — *Impact: High*
   - **Evidence:** page sells tool-arbitrage service businesses on the keto meal-prep domain. Two unrelated products on one domain fragments topical authority.
   - **Fix:** move Profit Forge to a subdomain (`profitforge.ketocontractor.com`) or separate TLD. Escalate to Jeremy as a business decision before further SEO work on this page.
   - **Priority:** 1

2. **Title too long (61 chars)** — *Impact: High*
   - **Evidence:** "Profit Forge - 8 Service Businesses Powered by Tool Arbitrage" is 61 chars. SERP truncates past ~60 on desktop, ~40 on mobile.
   - **Fix:** shorten to 55 chars. Example: "Profit Forge - 8 Service Businesses via Tool Arbitrage."
   - **Priority:** 1

3. **Missing canonical tag** — *Impact: Medium*
   - **Evidence:** serves at `/profit_forge` and `/profit_forge.html`.
   - **Fix:** add canonical to preferred form.
   - **Priority:** 2

4. **URL uses underscore instead of hyphen** — *Impact: Medium*
   - **Evidence:** file is `profit_forge.html`. Google treats underscores less reliably than hyphens as word separators.
   - **Fix:** rename file to `profit-forge.html`, add 301 redirect from `/profit_forge` to `/profit-forge`.
   - **Priority:** 2

5. **Meta description too short (127 chars)** — *Impact: Medium*
   - **Evidence:** 127 chars, target 150-160. Missing keywords "arbitrage," "playbook," "blueprint."
   - **Fix:** expand to 155 chars with secondary keyword coverage.
   - **Priority:** 2

6. **Missing og:url, og:type, og:image** — *Impact: Medium*
   - **Evidence:** has og:title and og:description only.
   - **Fix:** add all three.
   - **Priority:** 2

7. **H1 missing primary keyword "tool arbitrage"** — *Impact: Medium*
   - **Evidence:** H1 is "Buy the tool for $50/month. Sell the output for $2,000/month." - strong copy but keyword-weak.
   - **Fix:** weave keyword in. Example: "Tool Arbitrage: Buy $50/mo Tools, Sell for $2,000/mo."
   - **Priority:** 3

8. **No Schema.org Product or SoftwareApplication schema** — *Impact: Low*
   - **Evidence:** no JSON-LD.
   - **Fix:** add Product schema with price, priceCurrency, availability.
   - **Priority:** 4


---

## Site-Wide Technical SEO Findings

### 1. Indexation and Crawlability

**robots.txt returns HTML instead of plain text** — *Impact: Critical*
- **Evidence:** no physical robots.txt; Netlify catch-all serves index.html at `/robots.txt` (status 200, title "Keto Contractor - AI Meal Prep for Busy People").
- **Fix:** create `/robots.txt` at repo root with `User-agent: *\nAllow: /\nSitemap: https://ketocontractor.com/sitemap.xml`.
- **Priority:** Critical

**sitemap.xml returns HTML instead of XML** — *Impact: Critical*
- **Evidence:** same catch-all rewrite; `/sitemap.xml` returns index.html content.
- **Fix:** create `/sitemap.xml` listing all 6 canonical URLs with lastmod dates and changefreq.
- **Priority:** Critical

**Catch-all rewrite breaks static file serving (root cause)** — *Impact: Critical*
- **Evidence:** `netlify.toml` rewrites `/*` to `/index.html` with status 200, intercepting all paths.
- **Fix:** update netlify.toml to exclude static files.
  ```toml
  [[redirects]]
    from = "/*"
    to = "/index.html"
    status = 200
    conditions = { path = ["!/robots.txt", "!/sitemap.xml", "!/*.png", "!/*.jpg", "!/*.css", "!/*.js"] }
  ```
  OR add explicit `[[redirects]]` rules for robots.txt and sitemap.xml before the catch-all.
- **Priority:** Critical

### 2. Duplicate Content and URL Structure

**4 pages missing canonical tags** — *Impact: High*
- **Evidence:** privacy.html, terms.html, sunday-prep-method.html, profit_forge.html each accessible at both `/page` and `/page.html`.
- **Fix:** add canonical tags pointing to extensionless form on each.
- **Priority:** 1

**Canonical format inconsistent across site** — *Impact: Medium*
- **Evidence:** index.html canonical uses `https://ketocontractor.com/` (extensionless with trailing slash); trial.html canonical uses `https://ketocontractor.com/trial.html` (with extension).
- **Fix:** standardize everywhere to extensionless form.
- **Priority:** 2

### 3. Structured Data (JSON-LD)

**Zero JSON-LD on any page** — *Impact: High*
- **Evidence:** no `<script type="application/ld+json">` blocks found.
- **Fix:** add per page type:
  - `index.html`: SoftwareApplication + Organization
  - `trial.html`: Product + Offer + BreadcrumbList
  - `sunday-prep-method.html`: HowTo or FAQPage
  - `profit_forge.html`: Product
  - `privacy.html` and `terms.html`: WebPage (minimal, optional)
- **Priority:** 2

### 4. Social Sharing (Open Graph and Twitter Card)

**No og:image on any page** — *Impact: High*
- **Evidence:** no og:image tag across all 6 pages. `Banner.png` (1536x138) is wrong aspect ratio for a 1200x630 social card.
- **Fix:** commission or create 4 proper 1200x630 social card PNGs (homepage, trial, sunday-prep, profit_forge); add og:image + og:image:width + og:image:height tags to all pages.
- **Priority:** 2

**No Twitter Card tags on any page** — *Impact: Medium*
- **Evidence:** no twitter:card meta.
- **Fix:** add `<meta name="twitter:card" content="summary_large_image">` to all pages (X falls back to OG tags for the rest).
- **Priority:** 3

### 5. Cross-Page Keyword Cannibalization

**Duplicate H1 on index.html and trial.html** — *Impact: Medium*
- **Evidence:** both use "One Sunday. Seven days of food."
- **Fix:** rewrite trial H1 with trial-specific messaging (see trial.html per-page findings).
- **Priority:** 1

**sunday-prep-method.html may cannibalize homepage for "sunday prep" queries** — *Impact: Low*
- **Evidence:** thin page (124 words) competes with homepage for similar terms without enough body to rank.
- **Fix:** either beef content to 400+ words OR add noindex (see sunday-prep per-page findings).
- **Priority:** 1

### 6. Site Architecture and Internal Linking

**Internal link format should match canonical convention** — *Impact: Medium*
- **Evidence:** footer links use extensionless form (correct) but no documented convention.
- **Fix:** add convention to CLAUDE.md - "all internal links use extensionless pretty-URL form."
- **Priority:** 3

**No breadcrumb schema** — *Impact: Low*
- **Evidence:** flat 6-page site; breadcrumbs not essential but nice for trial.html (Home > Free Trial).
- **Fix:** add BreadcrumbList JSON-LD on trial + sunday-prep only.
- **Priority:** 4


---

## Performance and Core Web Vitals Findings

**Current state:** Excellent network performance (TTFB 39ms, FCP 292ms, DOMContentLoaded 206ms, loadEvent 276ms, networkIdle 727ms) thanks to Netlify CDN. One major blocker: 10.4 MB of unoptimized PNG images across 5 homepage assets with no lazy loading, no responsive variants, no modern format. Core Web Vitals (LCP, INP, CLS) were not directly measured; requires Lighthouse or RUM for production values.

**Findings:**

1. **Unoptimized image format (PNG instead of WebP or AVIF)** — *Impact: High*
   - **Evidence:** 5 homepage images total 10.4 MB delivered as PNG. WebP typically saves 25-35% at identical quality; AVIF saves 40-50%.
   - **Fix:** Convert all PNGs to WebP with PNG fallback via `<picture>` element. Test quality 75-80.
   - **Priority:** 1

2. **Missing image lazy loading** — *Impact: High*
   - **Evidence:** Zero `loading="lazy"` attributes on any `<img>` tag. All homepage images load eagerly, blocking LCP and initial critical path.
   - **Fix:** Add `loading="lazy"` to all images below the fold. Keep hero image loading eager (or omit for default) and consider `fetchpriority="high"`.
   - **Priority:** 1

3. **Missing responsive image variants** — *Impact: High*
   - **Evidence:** All `<img>` elements use fixed `src` attributes; no `srcset` or `sizes`. Mobile viewport (375px) downloads desktop-width images, wasting ~70% bandwidth.
   - **Fix:** Generate 3 sizes per asset (400px, 800px, 1200px widths); implement `srcset` with `sizes="(max-width: 640px) 100vw, 50vw"`.
   - **Priority:** 1

4. **No LCP image preload or explicit dimensions** — *Impact: High*
   - **Evidence:** Hero image has no `<link rel="preload" as="image">` and no width/height attributes. Risks CLS on slow networks.
   - **Fix:** Add preload hint in `<head>` for the hero image and explicit width/height on the `<img>` tag OR set `aspect-ratio` CSS.
   - **Priority:** 2

5. **Canvas particle animation may impact INP on mobile** — *Impact: Medium*
   - **Evidence:** Hero runs a requestAnimationFrame loop with 70 particles doing O(n²) distance calculations. Low-end mobile CPUs may see frame drops during scroll, degrading INP.
   - **Fix:** Reduce particle count to 40 on mobile via matchMedia; pause animation when hero scrolls out of view via IntersectionObserver.
   - **Priority:** 2

6. **No cache-control headers configured** — *Impact: Medium*
   - **Evidence:** netlify.toml has no `[[headers]]` section. Netlify defaults are reasonable but not optimal for immutable assets.
   - **Fix:** Add headers block setting `Cache-Control: public, max-age=31536000, immutable` for images (requires content-hashed filenames for safe long-cache) and `max-age=3600` for HTML.
   - **Priority:** 3

7. **No image aspect-ratio CSS (CLS risk)** — *Impact: Medium*
   - **Evidence:** Image wrappers use `width: 100%; display: block` but no aspect-ratio declaration. Images loading asynchronously cause layout shift.
   - **Fix:** Add `aspect-ratio: 1536/1024` (or actual image ratio) to image wrapper classes.
   - **Priority:** 2

8. **No Core Web Vitals instrumentation** — *Impact: Medium*
   - **Evidence:** No web-vitals library, no GA4 Web Vitals reporting, no RUM provider detected. Production LCP/INP/CLS values unknown.
   - **Fix:** Add the `web-vitals` npm library (or standalone script) and log results to Supabase `page_metrics` table or analytics backend.
   - **Priority:** 2

9. **Particle animation runs below viewport** — *Impact: Low*
   - **Evidence:** `animateParticles()` uses requestAnimationFrame unconditionally; keeps running after user scrolls past hero. Wastes CPU.
   - **Fix:** Wrap animation loop in IntersectionObserver on `#hero`. Pause on exit, resume on entry.
   - **Priority:** 3

**Recommended next steps (out of audit scope, requires new tooling):**

- Run Lighthouse (desktop + mobile) on ketocontractor.com to capture actual LCP, INP, CLS. Compare before/after image optimization.
- Install real-user monitoring (Cloudflare Web Analytics, GA4 Web Vitals reporting, or DataDog RUM) for production CWV from real traffic.
- Profile the particle animation on throttled low-end mobile (Moto G4 profile in Chrome DevTools) to quantify INP risk before optimization work.


---

## Prioritized Action Plan

### Critical (Week 1 - unblock crawlers)

1. **Create `/robots.txt`** at repo root. Content:
   ```
   User-agent: *
   Allow: /
   Sitemap: https://ketocontractor.com/sitemap.xml
   ```
   Effort: 5 min.

2. **Create `/sitemap.xml`** at repo root listing all 6 canonical URLs (extensionless form) with `<lastmod>2026-04-23</lastmod>`. Effort: 15 min.

3. **Fix Netlify catch-all rewrite** in `netlify.toml` to exclude static files. Add exclusion conditions OR explicit `[[redirects]]` rules for robots.txt and sitemap.xml BEFORE the catch-all. Effort: 10 min + Netlify deploy verification.

4. **Add canonical tags to 4 pages:** privacy.html, terms.html, sunday-prep-method.html, profit_forge.html. Use extensionless form. Effort: 10 min.

5. **Normalize trial.html canonical** from `.html` form to extensionless form. Effort: 2 min.

### High Priority (Week 1-2 - stop the bleeding)

6. **Add meta descriptions to privacy.html and terms.html** (currently empty). Effort: 10 min.

7. **Trim trial.html meta description** from 174 to ~155 chars. Front-load "no credit card." Effort: 5 min.

8. **Rewrite trial.html H1** to remove duplication with index.html. Example: "7-Day Free Trial. No Credit Card." Effort: 5 min.

9. **Decide sunday-prep-method.html content strategy:** either (a) expand to 400+ words with H2/H3 subheadings OR (b) add noindex. Expansion recommended if the page can rank for "sunday meal prep" queries. Effort: 2 hours (expansion) OR 2 min (noindex).

10. **Add `loading="lazy"` to below-the-fold images on index.html.** Effort: 15 min.

11. **Normalize internal link URL format** across all pages to extensionless form. Effort: 20 min.

### Medium Priority (Week 2-4 - compound wins)

12. **Commission or create 4 proper 1200×630 social card PNGs** (homepage, trial, sunday-prep, profit_forge). Add og:image, og:image:width, og:image:height tags to all 6 pages. Effort: 2-4 hours depending on asset production.

13. **Add `<meta name="twitter:card" content="summary_large_image">` to all pages.** One line per page. Effort: 10 min.

14. **Add JSON-LD schemas:** SoftwareApplication + Organization on index.html, Product + Offer + BreadcrumbList on trial.html, HowTo or FAQPage on sunday-prep-method.html, Product on profit_forge.html. Effort: 2-3 hours total.

15. **Convert hero/content images to WebP with PNG fallback** via `<picture>` element. Run through imagemin or squoosh CLI. Effort: 1-2 hours.

16. **Add `srcset` and `sizes` for responsive images.** Effort: 2 hours.

17. **Add `aspect-ratio` CSS to image wrappers** to prevent CLS. Effort: 30 min.

18. **Shorten profit_forge.html title** to 55 chars. Effort: 2 min.

19. **Expand meta descriptions on sunday-prep-method (117 to ~155) and profit_forge (127 to ~155).** Effort: 15 min.

20. **Rewrite index.html title to include "Keto Meal Prep" front-loaded** (current 46 chars is short). Effort: 5 min.

21. **Add noindex meta to privacy.html and terms.html.** Effort: 2 min.

### Long-Term (Quarter 1-2)

22. **Profit Forge domain decision.** Escalate business question: move to subdomain or separate TLD. Blocks further SEO investment on that page.

23. **Set up real-user monitoring** (Cloudflare Web Analytics, GA4 Web Vitals, or DataDog RUM) for production Core Web Vitals.

24. **Add web-vitals library instrumentation** to capture LCP, INP, CLS on every page load.

25. **Optimize particle canvas animation** - reduce mobile particle count, pause via IntersectionObserver when hero scrolls out.

26. **Rename `profit_forge.html` to `profit-forge.html`** with 301 redirect if keeping on current domain.

27. **Run Lighthouse CI** on every PR to catch perf regressions.

### Not Required (flagged for completeness)

- Breadcrumb schema on homepage/legal pages (flat site, not essential).
- Hreflang tags (site is English-only, single region).
- External link `rel="noopener noreferrer"` hygiene (minor security, zero SEO impact).

---

## Data Appendix

### seo_checker.py scores

| Page | Score | Notes |
|---|---|---|
| `index.html` | 88/100 | Title short (46 chars), otherwise strong |
| `sunday-prep-method.html` | 84/100 | Thin content (124 words), no H2/H3 |
| `profit_forge.html` | 82/100 | Title long (61 chars), URL underscore |
| `privacy.html` | 75/100 | Missing description and canonical |
| `terms.html` | 75/100 | Missing description and canonical |

### Playwright measurements (homepage, live)

- **TTFB:** 39 ms (excellent, target <200 ms)
- **FCP:** 292 ms (excellent, target <1.8 s)
- **DOMContentLoaded:** 206 ms
- **loadEvent:** 276 ms
- **networkIdle:** 727 ms
- **Total requests:** 6 (1 HTML document + 5 images)
- **HTML transfer size:** ~10 KB
- **Image transfer size:** ~10.4 MB across 5 PNGs
- **Third-party resources:** none detected (no Google Analytics, no Meta Pixel, no Segment, no fonts, no chat widgets)

### Duplicate URL matrix (live, verified)

| Pretty URL | .html URL | Canonical set? |
|---|---|---|
| `/` | (N/A) | Yes (`/`) |
| `/privacy` | `/privacy.html` | No |
| `/terms` | `/terms.html` | No |
| `/sunday-prep-method` | `/sunday-prep-method.html` | No |
| `/trial` | `/trial.html` | Yes (points to `.html` - inconsistent) |
| `/profit_forge` | `/profit_forge.html` | No |

### Files on site that return the wrong content type

| Requested path | Expected | Actual |
|---|---|---|
| `/robots.txt` | `text/plain` | `text/html` (serves index.html) |
| `/sitemap.xml` | `application/xml` | `text/html` (serves index.html) |

