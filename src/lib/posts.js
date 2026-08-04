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

export function getPostBySlug(slug) {
    const fullPath = path.join(POSTS_DIR, `${slug}.mdx`);
    const raw = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(raw);

    return {
        slug,
        title: data.title || slug,
        description: data.description || '',
        date: data.date ? new Date(data.date).toISOString() : null,
        updated: data.updated ? new Date(data.updated).toISOString() : null,
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
