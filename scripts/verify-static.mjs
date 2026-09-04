// Development/CI checks only. This file is never included in the static site.
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { createServer } from 'node:http';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runInNewContext } from 'node:vm';
import { after, test } from 'node:test';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const html = await readFile(join(dist, 'index.html'), 'utf8');
const source = await readFile(join(root, 'src/components/PortfolioExperience.tsx'), 'utf8');
const css = await readFile(join(root, 'app/globals.css'), 'utf8');
const profile = JSON.parse(await readFile(join(root, 'src/data/portfolio.json'), 'utf8'));
const assets = [];
async function collect(directory, prefix = '') {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const name = prefix + entry.name;
    if (entry.isDirectory()) await collect(join(directory, entry.name), name + '/');
    else assets.push(name);
  }
}
await collect(dist);

// Serve the *same* output at a project prefix and a domain root, without SPA fallback.
const server = createServer(async (request, response) => {
  const pathname = new URL(request.url, 'http://localhost').pathname;
  let local = pathname.replace(/^\/portfolio\//, '/').replace(/^\//, '') || 'index.html';
  if (!assets.includes(local)) { response.writeHead(404).end(); return; }
  const type = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.pdf': 'application/pdf', '.png': 'image/png', '.svg': 'image/svg+xml' }[extname(local)];
  response.setHeader('Content-Type', type || 'application/octet-stream');
  response.end(await readFile(join(dist, local)));
});
await new Promise((ready) => server.listen(0, '127.0.0.1', ready));
const origin = 'http://127.0.0.1:' + server.address().port;
after(() => new Promise((done) => server.close(done)));

test('production HTML has a static entry point and relative runtime assets', async () => {
  assert.match(html, /id="root"/);
  const urls = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map((match) => match[1]);
  const local = urls.filter((url) => !/^(https?:|mailto:|#)/.test(url));
  assert(local.length >= 4);
  for (const url of local) {
    assert(url.startsWith('./'), 'Non-relative asset: ' + url);
    assert(assets.includes(url.slice(2)), 'Missing asset: ' + url);
    for (const prefix of ['/', '/portfolio/']) {
      const response = await fetch(new URL(url, origin + prefix));
      assert.equal(response.status, 200, prefix + url);
      assert((await response.arrayBuffer()).byteLength > 0);
    }
  }
});

test('every generated asset is served under the GitHub Pages project path', async () => {
  for (const name of assets) {
    const response = await fetch(origin + '/portfolio/' + name);
    assert.equal(response.status, 200, name);
    await response.arrayBuffer();
  }
  assert.equal((await fetch(origin + '/portfolio/missing-file.js')).status, 404);
});

test('all bundled module dependencies resolve to generated relative assets', async () => {
  for (const name of assets.filter((file) => file.endsWith('.js'))) {
    const code = await readFile(join(dist, name), 'utf8');
    for (const match of code.matchAll(/(?:from\s*|import\s*\(?)["'](\.\.?\/[^"']+)["']/g)) {
      const dependency = new URL(match[1], 'https://test.invalid/' + name).pathname.slice(1);
      assert(assets.includes(dependency), 'Missing module: ' + dependency);
    }
    assert.doesNotMatch(code, /chatgpt\.site|\/api\/|_next\/image|node:fs|node:http/);
  }
});

test('social metadata uses the verified production URL and existing preview image', () => {
  for (const property of ['og:type', 'og:locale', 'og:site_name', 'og:url', 'og:title', 'og:description', 'og:image', 'og:image:width', 'og:image:height', 'og:image:alt']) assert(html.includes('property="' + property + '"'), property);
  assert(html.includes('href="' + profile.links.site + '"'));
  assert(html.includes('content="' + profile.links.site + 'og.png"'));
  assert(assets.includes('og.png'));
});

test('navigation uses existing section anchors, not server routes', () => {
  for (const id of ['main', 'education', 'projects', 'skills', 'involvement', 'contact']) assert(source.includes('id="' + id + '"'), id);
  assert.equal((source.match(/<h1\s/g) || []).length, 1);
  assert.doesNotMatch(source, /BrowserRouter|next\/|fetch\(/);
  assert.match(source, /Skip to content/);
  assert.match(source, /aria-expanded=\{menuOpen\}/);
  assert.match(source, /event\.key === 'Escape'/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /focus-visible/);
  for (const breakpoint of [1100, 850, 640, 520, 380]) assert(css.includes('max-width: ' + breakpoint + 'px'));
});

test('CV is a real, static PDF and contact information is complete', async () => {
  const pdf = await readFile(join(dist, profile.links.cv.slice(2)));
  assert.equal(pdf.subarray(0, 5).toString(), '%PDF-');
  assert.doesNotMatch(pdf.toString('latin1'), /\/JavaScript|\/AcroForm/);
  assert.match(profile.links.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  assert.equal(new URL(profile.links.linkedin).hostname, 'www.linkedin.com');
  assert.equal(profile.person.school, 'International Pioneers School');
  assert.equal(profile.person.graduation, 2027);
  assert.doesNotMatch(JSON.stringify(profile), /your name|example\.com|lorem ipsum|placeholder/i);
});

test('theme startup respects saved preference and handles blocked storage', () => {
  const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
  for (const [saved, systemDark, expected] of [['dark', false, 'dark'], ['light', true, 'light'], [null, true, 'dark'], [null, false, 'light'], ['invalid', true, 'dark']]) {
    const document = { documentElement: { dataset: {} }, querySelector: () => ({ setAttribute() {} }) };
    runInNewContext(script, { document, localStorage: { getItem: () => saved }, window: { matchMedia: () => ({ matches: systemDark }) } });
    assert.equal(document.documentElement.dataset.theme, expected);
  }
  const document = { documentElement: { dataset: {} } };
  runInNewContext(script, { document, localStorage: { getItem() { throw Error('blocked'); } } });
  assert.equal(document.documentElement.dataset.theme, 'light');
});

test('copy email reports success and a useful failure state', async () => {
  const copyFunction = source.match(/async function copyEmail\(\) \{[\s\S]*?\n  \}/)[0];
  for (const fails of [false, true]) {
    let copied;
    let status;
    const copy = runInNewContext('(' + copyFunction + ')', {
      links: profile.links,
      navigator: { clipboard: { async writeText(value) { if (fails) throw Error('denied'); copied = value; } } },
      setCopyStatus(value) { status = value; },
    });
    await copy();
    assert.equal(status, fails ? 'failed' : 'copied');
    if (!fails) assert.equal(copied, profile.links.email);
  }
  assert(source.includes('<output'));
});

function luminance(hex) {
  const channels = hex.match(/[\da-f]{2}/gi).map((part) => parseInt(part, 16) / 255).map((part) => part <= .04045 ? part / 12.92 : ((part + .055) / 1.055) ** 2.4);
  return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
}
test('light and dark theme text colors meet WCAG AA contrast', () => {
  for (const block of [css.match(/:root \{([\s\S]*?)\}/)[1], css.match(/:root\[data-theme='dark'\] \{([\s\S]*?)\}/)[1]]) {
    const tokens = Object.fromEntries([...block.matchAll(/--([\w-]+): (#[\da-f]{6});/g)].map((match) => [match[1], match[2]]));
    for (const [foreground, background] of [['foreground', 'background'], ['muted-foreground', 'background'], ['muted-foreground', 'surface'], ['primary', 'background'], ['primary-foreground', 'primary']]) {
      const levels = [luminance(tokens[foreground]), luminance(tokens[background])].sort((a, b) => a - b);
      const ratio = (levels[1] + .05) / (levels[0] + .05);
      assert(ratio >= 4.5, foreground + ' on ' + background + ': ' + ratio.toFixed(2));
    }
  }
});
