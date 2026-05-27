// Post-build prerender step: imports the SSR bundle, renders the React tree to
// a string, and writes that string into dist/index.html where the empty
// <div id="root"></div> placeholder sits. The client then hydrates that
// content on load, so bots and AI crawlers see real body content while users
// still get a fully interactive SPA.

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const clientDist = path.join(root, 'dist');
const serverDist = path.join(root, 'dist-server');

const template = await fs.readFile(path.join(clientDist, 'index.html'), 'utf-8');

const serverEntry = path.join(serverDist, 'entry-server.js');
const { render } = await import(serverEntry);
const appHtml = render();

const placeholder = '<div id="root"></div>';
if (!template.includes(placeholder)) {
  throw new Error(`prerender: could not find "${placeholder}" in dist/index.html`);
}

const finalHtml = template.replace(placeholder, `<div id="root">${appHtml}</div>`);
await fs.writeFile(path.join(clientDist, 'index.html'), finalHtml, 'utf-8');

console.log(`✓ Prerendered index.html (${appHtml.length} chars of body content)`);
