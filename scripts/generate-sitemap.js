/**
 * Generate sitemap.xml from markdown posts
 * Run after build: node scripts/generate-sitemap.js
 */
import { readdirSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_URL = 'https://sunghun05.github.io';

const postsDir = resolve(__dirname, '../src/assets/posts');
const distDir = resolve(__dirname, '../dist');

const mdFiles = readdirSync(postsDir).filter(f => f.endsWith('.md'));

const today = new Date().toISOString().split('T')[0];

const urls = [
    // Home page
    `  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <priority>1.0</priority>
  </url>`,
    // Individual posts
    ...mdFiles.map(f => {
        const slug = f.replace('.md', '');
        return `  <url>
    <loc>${SITE_URL}/post/${slug}</loc>
    <lastmod>${today}</lastmod>
    <priority>0.8</priority>
  </url>`;
    })
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemlan.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

writeFileSync(resolve(distDir, 'sitemap.xml'), sitemap);
console.log(`✅ Generated sitemap.xml with ${urls.length} URLs`);
