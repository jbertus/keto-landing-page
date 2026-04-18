# SEO Audit — ketocontractor.com Marketing Site

> Generated 2026-04-16 by Claude/FireFlex agent audit.
> Repo: `jbertus/keto-landing-page`
> Files audited: `index.html`, `sunday-prep-method.html`, `privacy.html`, `terms.html`, `profit_forge.html`
> **Missing from repo:** `robots.txt`, `sitemap.xml` (neither exists)

---

## Per-Page Findings

### index.html
- ✅ Title: "Keto Contractor — AI Meal Prep for Busy People" (52 chars, good)
- ⚠️ Description: 170 chars (trim to 155-160)
- ⚠️ OG: title/description/url/type present; **missing `og:image`**
- ❌ Twitter Card: completely missing
- ❌ Canonical: missing
- ❌ JSON-LD: none (no Organization, SoftwareApplication, Product, or FAQPage schema)
- ✅ Headings: H1 once, H2/H3/H4 logical, no skips
- ✅ Alt text: present on all hero/feature images

### sunday-prep-method.html
- ✅ Title + description present and well-sized
- ❌ Missing: OG tags, Twitter card, canonical, JSON-LD
- ⚠️ H1 is good, but no H2/H3 structure
- ⚠️ Lead-magnet page with **no `noindex`** — could cannibalize index.html for "sunday prep" terms

### privacy.html
- ⚠️ Title present; **no meta description, no OG, no Twitter, no canonical**
- ✅ H1/H2 structure fine
- Low SEO priority but should have `noindex` or minimal meta to avoid thin-content penalty

### terms.html
- Same as privacy: title only, no description/OG/Twitter/canonical
- ✅ H1/H2 fine

### profit_forge.html
- ✅ Title + description + og:title + og:description present
- ❌ Missing: og:image, og:url, og:type, Twitter card, canonical, JSON-LD
- ✅ H1 logical, H2/H3 hierarchy good
- ⚠️ Hero SVG has no `<title>`/`aria-label` — invisible to search
- ❌ Zero internal links from ketocontractor.com / index.html — **orphaned page**
- ❌ FAQ section (6 Q&As) **not marked up as FAQPage JSON-LD** — big missed opportunity

---

## Cross-Site Issues

- ❌ **No `robots.txt`** in repo root
- ❌ **No `sitemap.xml`** in repo root
- ⚠️ No favicon PNG in repo — all pages reference `https://app.ketocontractor.com/kc-logo.png` (cross-domain, app may block)
- ❌ **`sunday-prep-method.html` and `profit_forge.html` are orphaned** (no inbound links from index/footer)
- ⚠️ Image filenames use spaces ("Workers with Keto meals.png") — cleaner hyphenated slugs preferred

---

## Priority Fix List (Top 10)

1. **Add `robots.txt` + `sitemap.xml`** to repo root (submit sitemap to Google Search Console)
2. **Add canonical tag** to every page
3. **Add Twitter Card tags** to index, sunday-prep-method, profit_forge
4. **Add `og:image`** (all pages) + `og:url`/`og:type` on profit_forge; create 1200x630 social share images
5. **Add JSON-LD Organization + SoftwareApplication schema** to index.html
6. **Add FAQPage JSON-LD** to profit_forge.html (6 Q&As already written)
7. **Link profit_forge.html from index footer/nav** so it's not orphaned
8. **Add Product/Offer JSON-LD** to profit_forge.html ($99 price, Gumroad offer)
9. **Tighten index.html meta description** to ~155 chars, inject "contractors, tradesmen, shift workers"
10. **Add `<meta name="robots" content="noindex">`** to sunday-prep-method.html + optionally privacy/terms

---

## Quick Wins (5 min each)

- [ ] Add canonical links to all 5 pages
- [ ] Add Twitter Card block on index.html
- [ ] Add meta description + canonical to privacy.html + terms.html
- [ ] Link profit_forge from index.html footer
- [ ] Add `noindex` to sunday-prep-method.html
- [ ] Rename image files to lowercase-hyphenated slugs
- [ ] Add `aria-label` to profit_forge hero SVG

---

## What's Already Good

- ✅ Semantic HTML5 structure (`<nav>`, `<section>`, `<footer>`)
- ✅ Clean H1 per page, no skipped levels
- ✅ Descriptive alt text on content images
- ✅ Good title length + keyword targeting on index.html
- ✅ Mobile viewport meta on all pages
- ✅ Privacy/terms linked bidirectionally
- ✅ Audience language in body copy aligns with target keywords

---

## Recommended Next Step

Hit the top 10 priority fixes in one focused session. Estimated time: 2-3 hours for all 10. Quick wins alone are ~30 minutes and would move the needle significantly.
