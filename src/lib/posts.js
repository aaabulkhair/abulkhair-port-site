import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

export function getPostSlugs() {
    if (!fs.existsSync(POSTS_DIR)) return [];
    return fs
        .readdirSync(POSTS_DIR)
        .filter((file) => file.endsWith('.mdx'))
        .map((file) => file.replace(/\.mdx$/, ''));
}

// Fail the build on a missing/invalid date instead of rendering "Invalid Date".
function parseDate(value, slug, field) {
    const date = new Date(value);
    if (!value || Number.isNaN(date.getTime())) {
        throw new Error(`content/posts/${slug}.mdx: front-matter "${field}" is missing or not a valid date`);
    }
    return date.toISOString();
}

export function getPostBySlug(slug) {
    const fullPath = path.join(POSTS_DIR, `${slug}.mdx`);
    const raw = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(raw);

    return {
        slug,
        title: data.title || slug,
        description: data.description || '',
        // Drafts may omit a date; published posts must have a valid one.
        date: data.draft && !data.date ? null : parseDate(data.date, slug, 'date'),
        updated: data.updated ? parseDate(data.updated, slug, 'updated') : null,
        tags: data.tags || [],
        coverImage: data.coverImage || null,
        draft: Boolean(data.draft),
        readingTime: Math.max(1, Math.round(readingTime(content).minutes)),
        content,
    };
}

export function getAllPosts() {
    return getPostSlugs()
        .map(getPostBySlug)
        .filter((post) => !post.draft)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Slugs that get a page, RSS entry and sitemap URL — drafts are excluded.
export function getPublishedSlugs() {
    return getAllPosts().map((post) => post.slug);
}
