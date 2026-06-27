// Markdown blog generator.
//
// Reads Markdown posts from content/blog/{es,en}/*.md and writes static HTML
// into dist/ after the main build:
//   content/blog/es/<slug>.md  ->  dist/blog/<slug>/index.html        (/blog/<slug>/)
//   content/blog/en/<slug>.md  ->  dist/en/blog/<slug>/index.html     (/en/blog/<slug>/)
// Plus a listing page per locale (/blog/, /en/blog/) when that locale has posts.
//
// Pages reuse the shared /css/style.css so they match the privacy/terms pages.
// Each post carries Article/BlogPosting JSON-LD, a self-referencing canonical,
// hreflang alternates (when the same slug exists in the other locale), and a
// sitemap entry injected into dist/sitemap.xml.

import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentRoot = path.join(root, 'content', 'blog');
const dist = path.join(root, 'dist');
const publicDir = path.join(root, 'public');
const SITE = 'https://vozclinic.com';
const OG_IMAGE = `${SITE}/og-image.png`;
const DEFAULT_AUTHOR = 'Lainie Mayfield';

// Resolve a frontmatter `image` to a site-absolute path. Bare filenames live
// under /blog-assets/. Returns null when the file isn't in public/ yet, so the
// post still publishes (text + default OG image) instead of shipping a broken
// <img>. A warning is logged so the missing asset is obvious.
function resolveHero(image) {
  if (!image) return null;
  if (/^https?:\/\//.test(image)) return image; // external URL, trust it
  const rel = image.startsWith('/') ? image : `/blog-assets/${image}`;
  if (!existsSync(path.join(publicDir, rel.replace(/^\//, '')))) {
    console.warn(`  ! hero image not found in public${rel} — publishing without it`);
    return null;
  }
  return rel;
}

const LOCALES = {
  es: { urlBase: '/blog', dir: dist, lang: 'es' },
  en: { urlBase: '/en/blog', dir: path.join(dist, 'en'), lang: 'en' },
};

const UI = {
  es: {
    eyebrow: 'Blog',
    blogTitle: 'Blog',
    blogSubhead: 'Ideas para clínicas que quieren dejar de perder pacientes.',
    back: '← Volver al blog',
    by: 'Por',
    toggleLabel: 'EN',
    toggleAria: 'Switch to English',
    metaListDesc: 'Artículos de VozClinic para clínicas dentales y médicas en Baja California.',
    footerText: '¿Preguntas? Escríbeme a',
    footerOr: 'o por',
    footerSig: '— Lainie Mayfield, fundadora de VozClinic',
    footerLegal: 'LNL AI Agency · Hecho en Tijuana, B.C. · Cumple LFPDPPP.',
    monthsShort: ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'],
  },
  en: {
    eyebrow: 'Blog',
    blogTitle: 'Blog',
    blogSubhead: 'Ideas for clinics that want to stop losing patients.',
    back: '← Back to the blog',
    by: 'By',
    toggleLabel: 'ES',
    toggleAria: 'Cambiar a español',
    metaListDesc: 'VozClinic articles for dental and medical clinics in Baja California.',
    footerText: 'Questions? Email me at',
    footerOr: 'or via',
    footerSig: '— Lainie Mayfield, Founder of VozClinic',
    footerLegal: 'LNL AI Agency · Made in Tijuana, B.C. · LFPDPPP-compliant.',
    monthsShort: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  },
};

const FAVICON = "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%23008080%22/><path d=%22M25,25 L45,75 Q50,85 55,75 L75,25 L60,25 L50,55 L40,25 Z%22 fill=%22%23FFFFFF%22/></svg>";
const WA = 'https://wa.me/526633154686';

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function slugify(s) {
  return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function parseFrontmatter(raw) {
  if (!raw.startsWith('---')) return { data: {}, body: raw };
  const end = raw.indexOf('\n---', 3);
  if (end === -1) return { data: {}, body: raw };
  const fm = raw.slice(3, end).trim();
  const body = raw.slice(end + 4).replace(/^\r?\n/, '');
  const data = {};
  for (const line of fm.split('\n')) {
    const m = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!m) continue;
    let v = m[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    data[m[1]] = v;
  }
  return { data, body };
}

function fmtDate(iso, lang) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso || '');
  if (!m) return iso || '';
  const [, y, mo, d] = m;
  const month = UI[lang].monthsShort[Number(mo) - 1] || mo;
  return lang === 'es' ? `${Number(d)} ${month} ${y}` : `${month} ${Number(d)}, ${y}`;
}

function chrome(lang, toggleHref) {
  const u = UI[lang];
  const header = `  <header>
    <div class="nav-container">
      <a href="/" class="logo-link" aria-label="VozClinic Home">
        <svg width="34" height="34" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="20" fill="#008080"/>
          <path d="M 20 25 L 46 80 Q 50 88 54 80 L 80 25 L 64 25 L 50 56 L 36 25 Z" fill="#FFFFFF"/>
        </svg>
        <span class="logo-text">VozClinic</span>
      </a>
      <a href="${toggleHref}" class="lang-toggle" aria-label="${u.toggleAria}">${u.toggleLabel}</a>
    </div>
  </header>`;
  const footer = `  <footer>
    <div class="footer-content">
      <p class="footer-text">${u.footerText} <a href="mailto:hola@vozclinic.com">hola@vozclinic.com</a> ${u.footerOr} <a href="${WA}" target="_blank" rel="noopener">WhatsApp</a>.</p>
      <div class="footer-signature">${u.footerSig}</div>
      <p class="footer-legal">${u.footerLegal}</p>
    </div>
  </footer>
  <a href="${WA}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" style="position:fixed;bottom:20px;right:20px;z-index:9999;display:inline-flex;align-items:center;justify-content:center;width:56px;height:56px;border-radius:50%;background:#25D366;color:#fff;box-shadow:0 4px 12px rgba(0,0,0,0.2);text-decoration:none;">
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" width="28" height="28"><path d="M16.004 3C9.376 3 4 8.376 4 15c0 2.36.69 4.56 1.88 6.42L4 29l7.78-1.84A11.93 11.93 0 0 0 16.004 27C22.633 27 28 21.624 28 15S22.633 3 16.004 3z"/></svg>
  </a>`;
  return { header, footer };
}

const POST_STYLES = `    .post { padding-bottom: 2rem; }
    .post .post-meta { color: #6B7280; font-size: 0.9rem; margin-bottom: 2rem; }
    .post h2 { color: #006666; font-size: 1.4rem; margin: 2.25rem 0 0.75rem; }
    .post h3 { color: #1F2937; font-size: 1.1rem; margin: 1.5rem 0 0.5rem; }
    .post p, .post li { color: #374151; line-height: 1.7; font-size: 1.05rem; }
    .post ul, .post ol { margin: 0.5rem 0 1.25rem 1.25rem; }
    .post li { margin-bottom: 0.4rem; }
    .post a { color: #008080; }
    .post strong { color: #1F2937; }
    .post blockquote { border-left: 3px solid #008080; margin: 1.25rem 0; padding: 0.25rem 0 0.25rem 1rem; color: #4B5563; }
    .post img { max-width: 100%; height: auto; border-radius: 10px; margin: 1.25rem 0; }
    .post .back-link { display: inline-block; margin-top: 2.5rem; color: #008080; font-weight: 600; }
    .blog-list { list-style: none; margin: 0; padding: 0; }
    .blog-list li { border-top: 1px solid #E5E7EB; padding: 1.5rem 0; }
    .blog-list h2 { font-size: 1.25rem; margin: 0 0 0.35rem; }
    .blog-list h2 a { color: #1F2937; text-decoration: none; }
    .blog-list h2 a:hover { color: #008080; }
    .blog-list .post-meta { color: #6B7280; font-size: 0.85rem; margin: 0 0 0.5rem; }
    .blog-list p { color: #374151; margin: 0; line-height: 1.6; }`;

function pageShell({ lang, title, metaTitle, description, canonical, alternates, jsonLd, hero, main, toggleHref, ogImage, ogImageAlt }) {
  const { header, footer } = chrome(lang, toggleHref);
  const headTitle = metaTitle || `${title} · VozClinic`;
  const hreflang = alternates.map(a => `  <link rel="alternate" hreflang="${a.lang}" href="${a.href}" />`).join('\n');
  const social = ogImage || OG_IMAGE;
  const altMeta = ogImageAlt
    ? `\n  <meta property="og:image:alt" content="${esc(ogImageAlt)}" />\n  <meta name="twitter:image:alt" content="${esc(ogImageAlt)}" />`
    : '';
  const og = `  <meta property="og:type" content="article" />
  <meta property="og:title" content="${esc(metaTitle || title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${social}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(metaTitle || title)}" />
  <meta name="twitter:description" content="${esc(description)}" />
  <meta name="twitter:image" content="${social}" />${altMeta}`;
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(headTitle)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${canonical}">
${hreflang}
${og}
  <link rel="icon" type="image/svg+xml" href="${FAVICON}">
  <link rel="stylesheet" href="/css/style.css">
  <style>
${POST_STYLES}
  </style>
${jsonLd ? `  <script type="application/ld+json">\n${jsonLd}\n  </script>\n` : ''}</head>
<body>
${header}
  <main>
${hero}
${main}
  </main>
${footer}
</body>
</html>
`;
}

async function listMarkdown(dir) {
  let entries = [];
  try { entries = await fs.readdir(dir); } catch { return []; }
  return entries.filter(f => f.endsWith('.md')).map(f => path.join(dir, f));
}

async function loadPosts(locale) {
  const dir = path.join(contentRoot, locale);
  const files = await listMarkdown(dir);
  const posts = [];
  for (const file of files) {
    const raw = await fs.readFile(file, 'utf-8');
    const { data, body } = parseFrontmatter(raw);
    const base = path.basename(file, '.md');
    const slug = data.slug ? slugify(data.slug) : slugify(data.title || base);
    const title = data.title || base;
    const metaTitle = data.meta_title || '';
    const description = data.description || data.meta_description || '';
    const author = data.author || DEFAULT_AUTHOR;
    const date = data.date || '';
    const pair = data.pair ? slugify(data.pair) : '';
    const hero = resolveHero(data.image);
    const heroAlt = data.image_alt || '';
    // Social-card image (og:image / twitter:image). Falls back to the hero,
    // then the site default, when not set.
    const ogImage = resolveHero(data.og_image);
    const ogImageAlt = data.og_image_alt || '';
    // The page <h1> comes from `title`; drop a leading "# H1" so it isn't doubled.
    const cleanBody = body.replace(/^\s*#\s+.+\r?\n+/, '');
    posts.push({ slug, title, metaTitle, description, author, date, body: cleanBody, locale, pair, hero, heroAlt, ogImage, ogImageAlt });
  }
  // newest first; undated posts sink to the bottom
  posts.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  return posts;
}

function postUrl(locale, slug) { return `${LOCALES[locale].urlBase}/${slug}/`; }

// Resolve a post's ES/EN sibling URLs. Posts are linked across locales by a
// shared `pair` key (slugs differ per language); falls back to identical slug.
function localeUrls(post, pairIndex, bySlug) {
  let esSlug = null, enSlug = null;
  if (post.pair && pairIndex[post.pair]) {
    esSlug = pairIndex[post.pair].es || null;
    enSlug = pairIndex[post.pair].en || null;
  } else {
    if (bySlug.es?.has(post.slug)) esSlug = post.slug;
    if (bySlug.en?.has(post.slug)) enSlug = post.slug;
  }
  if (post.locale === 'es') esSlug = post.slug;
  if (post.locale === 'en') enSlug = post.slug;
  return {
    es: esSlug ? `${SITE}${postUrl('es', esSlug)}` : null,
    en: enSlug ? `${SITE}${postUrl('en', enSlug)}` : null,
  };
}

function alternatesFrom(urls) {
  const a = [];
  if (urls.es) a.push({ lang: 'es', href: urls.es });
  if (urls.en) a.push({ lang: 'en', href: urls.en });
  a.push({ lang: 'x-default', href: urls.es || urls.en });
  return a;
}

function articleJsonLd(post) {
  const url = `${SITE}${postUrl(post.locale, post.slug)}`;
  const obj = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    inLanguage: post.locale,
    mainEntityOfPage: url,
    url,
    image: post.hero ? `${SITE}${post.hero}` : OG_IMAGE,
    author: { '@type': 'Person', name: post.author },
    publisher: { '@type': 'Organization', name: 'VozClinic' },
  };
  if (/^\d{4}-\d{2}-\d{2}/.test(post.date)) { obj.datePublished = post.date; obj.dateModified = post.date; }
  return JSON.stringify(obj, null, 2);
}

function renderPost(post, pairIndex, bySlug) {
  const u = UI[post.locale];
  const canonical = `${SITE}${postUrl(post.locale, post.slug)}`;
  const other = post.locale === 'es' ? 'en' : 'es';
  const urls = localeUrls(post, pairIndex, bySlug);
  const toggleHref = urls[other] ? urls[other].replace(SITE, '') : LOCALES[other].urlBase + '/';
  const alternates = alternatesFrom(urls);
  const metaBits = [fmtDate(post.date, post.locale), `${u.by} ${esc(post.author)}`].filter(Boolean).join(' · ');
  const heroImg = post.hero ? `        <img class="post-hero" src="${post.hero}" alt="${esc(post.heroAlt)}" />\n` : '';
  const hero = `    <section class="hero-grid" id="hero">
      <div class="hero-text">
        <span class="eyebrow">${u.eyebrow}</span>
        <h1>${esc(post.title)}</h1>
      </div>
    </section>`;
  const main = `    <section>
      <article class="post">
        <p class="post-meta">${metaBits}</p>
${heroImg}${marked.parse(post.body)}
        <a class="back-link" href="${LOCALES[post.locale].urlBase}/">${u.back}</a>
      </article>
    </section>`;
  // Social card priority: explicit og_image > inline hero > site default.
  const social = post.ogImage ? `${SITE}${post.ogImage}` : (post.hero ? `${SITE}${post.hero}` : OG_IMAGE);
  const socialAlt = post.ogImageAlt || post.heroAlt || '';
  return pageShell({ lang: post.locale, title: post.title, metaTitle: post.metaTitle, description: post.description, canonical, alternates, jsonLd: articleJsonLd(post), hero, main, toggleHref, ogImage: social, ogImageAlt: socialAlt });
}

function renderListing(locale, posts, bySlug) {
  const u = UI[locale];
  const canonical = `${SITE}${LOCALES[locale].urlBase}/`;
  const other = locale === 'es' ? 'en' : 'es';
  const toggleHref = (bySlug[other]?.size) ? LOCALES[other].urlBase + '/' : '/';
  const alternates = [
    { lang: 'es', href: `${SITE}/blog/` },
    { lang: 'en', href: `${SITE}/en/blog/` },
    { lang: 'x-default', href: `${SITE}/blog/` },
  ];
  const items = posts.map(p => `        <li>
          <h2><a href="${postUrl(locale, p.slug)}">${esc(p.title)}</a></h2>
          <p class="post-meta">${fmtDate(p.date, locale)}</p>
          <p>${esc(p.description)}</p>
        </li>`).join('\n');
  const hero = `    <section class="hero-grid" id="hero">
      <div class="hero-text">
        <span class="eyebrow">${u.eyebrow}</span>
        <h1>${u.blogTitle}</h1>
        <p class="hero-subhead">${u.blogSubhead}</p>
      </div>
    </section>`;
  const main = `    <section>
      <ul class="blog-list">
${items}
      </ul>
    </section>`;
  return pageShell({ lang: locale, title: u.blogTitle, description: u.metaListDesc, canonical, alternates, jsonLd: '', hero, main, toggleHref });
}

async function writeFile(p, html) {
  await fs.mkdir(path.dirname(p), { recursive: true });
  await fs.writeFile(p, html, 'utf-8');
}

async function injectSitemap(urls) {
  const sitemapPath = path.join(dist, 'sitemap.xml');
  let xml;
  try { xml = await fs.readFile(sitemapPath, 'utf-8'); } catch { return; }
  const blocks = urls.map(({ loc, lastmod, priority }) => `  <url>
    <loc>${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n');
  xml = xml.replace('</urlset>', `${blocks}\n</urlset>`);
  await fs.writeFile(sitemapPath, xml, 'utf-8');
}

async function main() {
  // ensure folders exist so the first run never fails
  await fs.mkdir(path.join(contentRoot, 'es'), { recursive: true });
  await fs.mkdir(path.join(contentRoot, 'en'), { recursive: true });

  const postsByLocale = { es: await loadPosts('es'), en: await loadPosts('en') };
  const bySlug = {
    es: new Set(postsByLocale.es.map(p => p.slug)),
    en: new Set(postsByLocale.en.map(p => p.slug)),
  };
  // pair key -> { es: slug, en: slug } so ES/EN posts with different slugs link
  const pairIndex = {};
  for (const loc of ['es', 'en']) {
    for (const p of postsByLocale[loc]) {
      if (p.pair) (pairIndex[p.pair] ??= {})[loc] = p.slug;
    }
  }

  const total = postsByLocale.es.length + postsByLocale.en.length;
  if (total === 0) {
    console.log('✓ Blog: no posts yet (add Markdown to content/blog/{es,en}/) — nothing generated.');
    return;
  }

  const sitemapUrls = [];
  for (const locale of ['es', 'en']) {
    const posts = postsByLocale[locale];
    if (!posts.length) continue;

    for (const post of posts) {
      const out = path.join(LOCALES[locale].dir, 'blog', post.slug, 'index.html');
      await writeFile(out, renderPost(post, pairIndex, bySlug));
      sitemapUrls.push({ loc: `${SITE}${postUrl(locale, post.slug)}`, lastmod: /^\d{4}-\d{2}-\d{2}/.test(post.date) ? post.date.slice(0, 10) : '', priority: '0.6' });
      console.log(`✓ Blog post: ${postUrl(locale, post.slug)}`);
    }

    const listingOut = path.join(LOCALES[locale].dir, 'blog', 'index.html');
    await writeFile(listingOut, renderListing(locale, posts, bySlug));
    sitemapUrls.push({ loc: `${SITE}${LOCALES[locale].urlBase}/`, lastmod: '', priority: '0.7' });
    console.log(`✓ Blog index: ${LOCALES[locale].urlBase}/`);
  }

  await injectSitemap(sitemapUrls);
  console.log(`✓ Blog: ${total} post(s) generated, sitemap updated.`);
}

await main();
