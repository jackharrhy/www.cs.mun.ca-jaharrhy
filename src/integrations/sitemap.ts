import { readdir, readFile, writeFile } from "node:fs/promises";
import { extname } from "node:path";
import type { AstroIntegration } from "astro";
import { unescape as decode } from "html-escaper";
import { ELEMENT_NODE, parse, walkSync } from "ultrahtml";

const images = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".svg", ".webp"]);
const documents = new Set([
  ".pdf", ".txt", ".md", ".csv", ".doc", ".docx", ".odt", ".ods",
  ".xls", ".xlsx", ".ppt", ".pptx", ".epub", ".zip", ".7z", ".tar",
  ".gz", ".bz2", ".xz", ".mp3", ".wav", ".ogg", ".flac", ".mp4",
  ".webm", ".mov", ".obj", ".glb", ".gltf",
]);
const excludedDirectories = new Set(["private", "phap/bot"]);
const namespace = "http://www.sitemaps.org/schemas/sitemap/0.9";

function escapeXml(value: string): string {
  return value.replace(/[<>&"']/g, (character) => ({
    "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;",
  })[character]!);
}

function fileUrl(path: string, site: URL): URL {
  return new URL(path.split("/").map(encodeURIComponent).join("/"), site);
}

function pageUrl(path: string, site: URL): URL {
  return fileUrl(path.replace(/(^|\/)index\.html?$/i, "$1"), site);
}

async function contentFiles(directory: URL, prefix = ""): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const accessFile = entries.find((entry) => entry.name === ".htaccess" && entry.isFile());
  if (accessFile) {
    const access = await readFile(new URL(".htaccess", directory), "utf8");
    if (/^\s*(?:AuthType\s+|Require\s+(?:valid-user|user\s|group\s|all\s+denied)|Deny\s+from\s+all)/im.test(access)) {
      return [];
    }
  }
  const files: string[] = [];
  for (const entry of entries) {
    const path = prefix + entry.name;
    if (entry.name.startsWith(".") || excludedDirectories.has(path)) continue;
    if (entry.isDirectory()) {
      files.push(...await contentFiles(new URL(encodeURIComponent(entry.name) + "/", directory), path + "/"));
    } else if (entry.isFile()) {
      files.push(path);
    }
  }
  return files.sort();
}

export async function generateSitemap(directory: URL, site: URL) {
  if (!site.pathname.endsWith("/") || !["http:", "https:"].includes(site.protocol)) {
    throw new Error("Sitemap site must be an absolute HTTP(S) URL ending in a slash");
  }
  const files = await contentFiles(directory);
  const available = new Map(files.map((path) => [fileUrl(path, site).href, path]));
  const entries = new Map<string, Set<string>>();
  let pageCount = 0;
  let assetCount = 0;

  for (const path of files) {
    const extension = extname(path).toLowerCase();
    if (images.has(extension) || documents.has(extension)) {
      entries.set(fileUrl(path, site).href, new Set());
      assetCount++;
      continue;
    }
    if (![".html", ".htm", ".php"].includes(extension) || path === "404.html") continue;

    const url = pageUrl(path, site);
    const pageImages = new Set<string>();
    let noindex = false;
    let canonical: string | undefined;
    // PHP is listed by its URL, never executed or parsed as static HTML.
    if (extension !== ".php") {
      const html = await readFile(new URL(path.split("/").map(encodeURIComponent).join("/"), directory), "utf8");
      walkSync(parse(html), (node) => {
        if (node.type !== ELEMENT_NODE) return;
        const attributes = node.attributes;
        if (node.name === "meta" && /^(robots|googlebot)$/i.test(attributes.name ?? "")) {
          noindex ||= /\b(noindex|none)\b/i.test(attributes.content ?? "");
        }
        if (node.name === "link" && /\bcanonical\b/i.test(attributes.rel ?? "") && attributes.href) {
          canonical = new URL(decode(attributes.href), url).href;
        }
        const references: string[] = [];
        if (node.name === "img" && attributes.src) references.push(attributes.src);
        if (["img", "source"].includes(node.name) && attributes.srcset) {
          references.push(...attributes.srcset.split(",").map((candidate) => candidate.trim().split(/\s+/)[0]!));
        }
        if (node.name === "video" && attributes.poster) references.push(attributes.poster);
        for (const reference of references) {
          const image = new URL(decode(reference), url);
          image.hash = "";
          image.search = "";
          if (available.has(image.href) && images.has(extname(image.pathname).toLowerCase())) {
            pageImages.add(image.href);
          }
        }
      });
    }
    if (noindex || (canonical && canonical !== url.href)) continue;
    entries.set(url.href, pageImages);
    pageCount++;
  }

  const urls = [...entries].sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0).map(([url, associatedImages]) => {
    const imageTags = [...associatedImages].sort().slice(0, 1000).map((image) =>
      `    <image:image><image:loc>${escapeXml(image)}</image:loc></image:image>`
    );
    return ["  <url>", `    <loc>${escapeXml(url)}</loc>`, ...imageTags, "  </url>"].join("\n");
  });
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<urlset xmlns="${namespace}" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`,
    ...urls,
    "</urlset>\n",
  ].join("\n");
  if (entries.size > 50_000 || Buffer.byteLength(xml, "utf8") > 52_428_800) {
    throw new Error("Sitemap exceeds the protocol limits; split it into a sitemap index");
  }
  return { xml, pageCount, assetCount };
}

export default function sitemap(): AstroIntegration {
  let site: URL;
  return {
    name: "complete-sitemap",
    hooks: {
      "astro:config:done": ({ config }) => {
        if (!config.site) throw new Error("Sitemap requires Astro's site setting");
        site = new URL(config.base.replace(/\/?$/, "/"), config.site);
      },
      "astro:build:done": async ({ dir, logger }) => {
        const { xml, pageCount, assetCount } = await generateSitemap(dir, site);
        await writeFile(new URL("sitemap.xml", dir), xml);
        logger.info(`sitemap.xml: ${pageCount} pages, ${assetCount} images and downloads`);
      },
    },
  };
}
