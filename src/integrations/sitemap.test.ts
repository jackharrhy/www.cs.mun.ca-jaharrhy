import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { pathToFileURL } from "node:url";
import { test } from "node:test";
import { DOMParser } from "@xmldom/xmldom";
import { generateSitemap } from "./sitemap.ts";

const site = new URL("https://example.com/~jack/");

test("finds unlinked pages, PHP, documents and images while excluding non-content and private files", async (context) => {
  const root = await mkdtemp(join(tmpdir(), "website-sitemap-"));
  context.after(() => rm(root, { recursive: true, force: true }));
  const files = {
    "index.html": '<img src="images/cat%20%26%20tea.png"><picture><source srcset="/_outside.png 1x, images/cat.webp?width=2 2x"></picture>',
    "unlinked/index.html": "<p>Still public</p>",
    "phap/index.php": "<?php throw new Exception('must never execute'); ?>",
    "play/game.html": "<p>A game</p>",
    "downloads/猫 & tea.pdf": "document",
    "downloads/game.zip": "archive",
    "images/cat & tea.png": "image",
    "images/cat.webp": "image",
    "_astro/photo.webp": "image",
    "_astro/client.js": "script",
    "fonts/font.woff2": "font",
    "josh.pem": "key",
    "phap/bot/index.php": "webhook",
    "private/index.html": "private",
    "protected/.htaccess": "AuthType Basic\nRequire valid-user",
    "protected/secret.pdf": "private",
    "blocked/.htaccess": "Require all denied",
    "blocked/index.html": "private",
    "noindex.html": '<meta name="robots" content="noindex, follow">',
    "none.html": '<meta name="googlebot" content="none">',
    "alias.html": '<link rel="canonical" href="/~jack/">',
    "offsite.html": '<link rel="canonical" href="https://other.example/">',
    "404.html": "Not found",
    ".hidden/index.html": "private",
  };
  for (const [path, content] of Object.entries(files)) {
    await mkdir(dirname(join(root, path)), { recursive: true });
    await writeFile(join(root, path), content);
  }
  await symlink(join(root, "index.html"), join(root, "symlink.html"));
  const directory = pathToFileURL(root + "/");
  const result = await generateSitemap(directory, site);
  const document = new DOMParser().parseFromString(result.xml, "application/xml");
  const urls = Array.from(document.getElementsByTagName("url"));
  const locations = urls.map((url) => url.getElementsByTagName("loc").item(0)!.textContent);
  assert.deepEqual(locations, [
    "https://example.com/~jack/",
    "https://example.com/~jack/_astro/photo.webp",
    "https://example.com/~jack/downloads/%E7%8C%AB%20%26%20tea.pdf",
    "https://example.com/~jack/downloads/game.zip",
    "https://example.com/~jack/images/cat%20%26%20tea.png",
    "https://example.com/~jack/images/cat.webp",
    "https://example.com/~jack/phap/index.php",
    "https://example.com/~jack/play/game.html",
    "https://example.com/~jack/unlinked/",
  ].sort());
  assert.equal(document.documentElement!.namespaceURI, "http://www.sitemaps.org/schemas/sitemap/0.9");
  const associatedImages = Array.from(urls[0]!.getElementsByTagName("image:loc")).map((image) => image.textContent);
  assert.deepEqual(associatedImages, [
    "https://example.com/~jack/images/cat%20%26%20tea.png",
    "https://example.com/~jack/images/cat.webp",
  ]);
  assert.equal(result.pageCount, 4);
  assert.equal(result.assetCount, 5);
  assert.equal(result.xml, (await generateSitemap(directory, site)).xml);
  assert.equal(document.getElementsByTagName("lastmod").length, 0);
});

test("uses HTML parsing rather than finding fake tags in scripts and comments", async (context) => {
  const root = await mkdtemp(join(tmpdir(), "website-sitemap-"));
  context.after(() => rm(root, { recursive: true, force: true }));
  await writeFile(join(root, "index.html"), `
    <!-- <meta name="robots" content="noindex"> -->
    <script>const x = '<meta name="robots" content="noindex">';</script>
    <img src="https://other.example/remote.png">
  `);
  const result = await generateSitemap(pathToFileURL(root + "/"), site);
  assert.equal(result.pageCount, 1);
  assert.ok(result.xml.includes("<loc>https://example.com/~jack/</loc>"));
  assert.ok(!result.xml.includes("<image:image>"));
});
