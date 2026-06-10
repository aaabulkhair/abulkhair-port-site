import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BASE_URL = 'https://abulkhair.ai';
const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');
const OUT_FILE = path.join(process.cwd(), 'public', 'rss.xml');

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const posts = fs.existsSync(POSTS_DIR)
  ? fs
      .readdirSync(POSTS_DIR)
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => {
        const { data } = matter(fs.readFileSync(path.join(POSTS_DIR, file), 'utf8'));
        return { slug: file.replace(/\.mdx$/, ''), ...data };
      })
      .filter((post) => !post.draft && post.date)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  : [];

const items = posts
  .map(
    (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${BASE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/blog/${post.slug}</guid>
      <description>${escapeXml(post.description || '')}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`
  )
  .join('\n');

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Ahmed Abulkhair — Blog</title>
    <link>${BASE_URL}/blog</link>
    <description>Technical articles on data science, machine learning, LLMs, and AI by Ahmed Abulkhair.</description>
    <language>en</language>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;

fs.writeFileSync(OUT_FILE, rss);
console.log(`rss.xml written with ${posts.length} post(s)`);
