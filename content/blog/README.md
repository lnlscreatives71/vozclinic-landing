# Blog content

Drop one Markdown file per post in the locale folder:

- `content/blog/es/<slug>.md`  →  publishes to `/blog/<slug>/`
- `content/blog/en/<slug>.md`  →  publishes to `/en/blog/<slug>/`

If the same `slug` exists in both `es/` and `en/`, the two pages are linked
to each other with `hreflang` automatically.

## Frontmatter

```markdown
---
title: "Post title"
meta_title: "SEO <title> tag, ~60 chars | VozClinic"   # optional; falls back to title
description: "~155-char summary used for the meta description and the listing card"
date: 2026-06-27          # YYYY-MM-DD
author: Lainie Mayfield   # optional, defaults to Lainie Mayfield
slug: mi-articulo         # optional, defaults to a slug of the title
pair: shared-key          # same value in the es + en files -> hreflang-linked
image: hero.webp          # optional inline hero, lives in public/blog-assets/
image_alt: "Describe the hero image"
og_image: social-card.webp        # optional social card; falls back to image, then site default
og_image_alt: "Describe the social card"
---

Body in **Markdown**. First `# H1` is optional — the title above is used
for the page <h1> regardless.
```

`meta_description` is accepted as an alias for `description`. Images referenced
by `image`/`og_image` must live in `public/blog-assets/`; a missing file just
omits that image (the post still builds). Keep them small (WebP, well under
1 MB) — `og_image` is the link-preview card, ideally ~1200×630.

## Build

`npm run build` runs the blog step automatically (after the prerender).
To run only the blog: `npm run build:blog`.

Each post gets an `Article`/`BlogPosting` JSON-LD block, a self-referencing
canonical, `hreflang` alternates, and a sitemap entry. Pages reuse the shared
`/css/style.css` so they match the privacy/terms pages.
