// Post-build prerender step: imports the SSR bundle, renders the React tree to
// a string per locale, and writes that string into the `<div id="root">`
// placeholder. The client hydrates that content on load (see main.tsx), so bots
// and AI crawlers see real body content while users get a fully interactive SPA.
//
// Two indexable routes are emitted:
//   /            -> Spanish (default + x-default)
//   /en/         -> English
// Each gets a localized <head> (lang, title, description, canonical, OG/Twitter,
// og:locale). Reciprocal hreflang alternates live in the source index.html and
// are therefore present on both pages.

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const clientDist = path.join(root, 'dist');
const serverDist = path.join(root, 'dist-server');

const template = await fs.readFile(path.join(clientDist, 'index.html'), 'utf-8');

const serverEntry = path.join(serverDist, 'entry-server.js');
const { render, faqJsonLd } = await import(serverEntry);

const placeholder = '<div id="root"></div>';
if (!template.includes(placeholder)) {
  throw new Error(`prerender: could not find "${placeholder}" in dist/index.html`);
}

// The FAQPage JSON-LD is generated per-locale from content.ts (never hardcoded
// in index.html) so it cannot drift from the rendered FAQ. swap() asserts the
// marker exists, so a template change fails loudly.
const FAQ_MARKER =
  '<!-- FAQPAGE_JSONLD: prerender injects a per-locale FAQPage here from content.ts (scripts/prerender.mjs) -->';
if (!template.includes(FAQ_MARKER)) {
  throw new Error(`prerender: could not find FAQ JSON-LD marker in dist/index.html`);
}

// Exact, asserted string swaps so a template change fails loudly instead of
// silently shipping a half-localized English page.
function swap(html, from, to) {
  if (!html.includes(from)) {
    throw new Error(`prerender: expected to find and replace:\n  ${from}`);
  }
  return html.replaceAll(from, to);
}

// English <head> overrides (the source template is Spanish).
const EN_HEAD = [
  ['<html lang="es">', '<html lang="en">'],
  [
    '<title>VozClinic: agente de voz y WhatsApp con IA para clínicas</title>',
    '<title>VozClinic: AI voice agent for dental & medical clinics</title>',
  ],
  [
    '<meta name="description" content="Agente de voz y WhatsApp con IA para clínicas: agenda citas 24/7, recordatorios, verifica seguros, reactiva pacientes y lanza promociones. Hecho en Tijuana." />',
    '<meta name="description" content="AI voice & WhatsApp agent for clinics: 24/7 appointment booking, reminders, insurance verification, patient reactivation, and promotions. Tijuana + San Diego." />',
  ],
  [
    '<link rel="canonical" href="https://www.vozclinic.com/" />',
    '<link rel="canonical" href="https://www.vozclinic.com/en/" />',
  ],
  [
    '<meta property="og:url" content="https://www.vozclinic.com/" />',
    '<meta property="og:url" content="https://www.vozclinic.com/en/" />',
  ],
  [
    '<meta property="og:title" content="VozClinic — Tu recepcionista de WhatsApp que nunca duerme" />',
    '<meta property="og:title" content="VozClinic: AI voice agent for dental & medical clinics" />',
  ],
  [
    '<meta property="og:description" content="Sofía contesta a tus pacientes en segundos, agenda citas y envía recordatorios — en español e inglés, 24/7. Hecho en Tijuana para clínicas en Baja California." />',
    '<meta property="og:description" content="Sofía books appointments 24/7, sends reminders, verifies insurance, and reactivates patients, in English and Spanish. Built in Tijuana for cross-border clinics." />',
  ],
  [
    '<meta property="og:locale" content="es_MX" />',
    '<meta property="og:locale" content="en_US" />',
  ],
  [
    '<meta property="og:locale:alternate" content="en_US" />',
    '<meta property="og:locale:alternate" content="es_MX" />',
  ],
  [
    '<meta name="twitter:title" content="VozClinic — Tu recepcionista de WhatsApp que nunca duerme" />',
    '<meta name="twitter:title" content="VozClinic: AI voice agent for dental & medical clinics" />',
  ],
  [
    '<meta name="twitter:description" content="Sofía contesta a tus pacientes en segundos, agenda citas y envía recordatorios — en español e inglés, 24/7." />',
    '<meta name="twitter:description" content="Sofía books appointments 24/7, sends reminders, verifies insurance, and reactivates patients, in English and Spanish." />',
  ],
];

// --- Spanish: dist/index.html (canonical default route) ---
const esBody = render('es');
await fs.writeFile(
  path.join(clientDist, 'index.html'),
  swap(template, FAQ_MARKER, faqJsonLd('es')).replace(placeholder, `<div id="root">${esBody}</div>`),
  'utf-8',
);
console.log(`✓ Prerendered / (es) — ${esBody.length} chars`);

// --- English: dist/en/index.html ---
let enTemplate = template;
for (const [from, to] of EN_HEAD) enTemplate = swap(enTemplate, from, to);
enTemplate = swap(enTemplate, FAQ_MARKER, faqJsonLd('en'));
const enBody = render('en');
await fs.mkdir(path.join(clientDist, 'en'), { recursive: true });
await fs.writeFile(
  path.join(clientDist, 'en', 'index.html'),
  enTemplate.replace(placeholder, `<div id="root">${enBody}</div>`),
  'utf-8',
);
console.log(`✓ Prerendered /en/ (en) — ${enBody.length} chars`);
