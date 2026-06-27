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
description: "~155-char summary used for the meta description and the listing card"
date: 2026-06-27          # YYYY-MM-DD
author: Lainie Mayfield   # optional, defaults to Lainie Mayfield
slug: mi-articulo         # optional, defaults to a slug of the title
---

Body in **Markdown**. First `# H1` is optional — the title above is used
for the page <h1> regardless.
```

`meta_description` is accepted as an alias for `description`.

## Build

`npm run build` runs the blog step automatically (after the prerender).
To run only the blog: `npm run build:blog`.

Each post gets an `Article`/`BlogPosting` JSON-LD block, a self-referencing
canonical, `hreflang` alternates, and a sitemap entry. Pages reuse the shared
`/css/style.css` so they match the privacy/terms pages.
