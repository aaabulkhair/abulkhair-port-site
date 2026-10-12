import { parseStringPromise } from 'xml2js';

// Build-time (ISR) fetchers for the homepage widgets. By default they return []
// on failure so a feed outage never breaks the initial build. Pass
// { throwOnError: true } during ISR revalidation instead: a thrown error makes
// Next keep serving the last good page rather than caching an empty feed.

const YOUTUBE_CHANNEL_ID = 'UC27eutkOJU045MWeoFlzGYw';
const MEDIUM_USERNAME = 'aaabulkhair';
const MEDIUM_FALLBACK_COVER = '/images/medium-logo.webp';

const first = (value) => (Array.isArray(value) ? value[0] : value);

async function fetchXml(url) {
    const response = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; abulkhair.ai feed reader)' },
    });
    if (!response.ok) throw new Error(`${url} responded ${response.status}`);
    return parseStringPromise(await response.text());
}

function toIsoDate(value) {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

export async function fetchYouTubeVideos(max = 3, { throwOnError = false } = {}) {
    try {
        const xml = await fetchXml(`https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`);
        const entries = xml?.feed?.entry || [];
        return entries
            .map((entry) => {
                const id = first(entry['yt:videoId']);
                const group = first(entry['media:group']) || {};
                return id && {
                    id,
                    title: first(entry.title) || '',
                    description: first(group['media:description']) || '',
                    thumbnail: `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
                    url: `https://www.youtube.com/watch?v=${id}`,
                    publishedAt: toIsoDate(first(entry.published)),
                };
            })
            .filter(Boolean)
            .slice(0, max);
    } catch (error) {
        if (throwOnError) throw error;
        console.warn(`YouTube feed unavailable: ${error.message}`);
        return [];
    }
}

// First real image in a Medium post. Only subdomains match images.remotePatterns
// ('**.medium.com'); bare medium.com is the 1x1 tracking pixel every item ends with.
export function pickMediumCover(html) {
    for (const [, src] of (html || '').matchAll(/<img[^>]+src="([^"]+)"/g)) {
        try {
            const { protocol, hostname } = new URL(src);
            if (protocol === 'https:' && hostname.endsWith('.medium.com')) return src;
        } catch {
            // not a URL — keep looking
        }
    }
    return MEDIUM_FALLBACK_COVER;
}

export async function fetchMediumArticles({ throwOnError = false } = {}) {
    try {
        const xml = await fetchXml(`https://medium.com/@${MEDIUM_USERNAME}/feed`);
        const items = xml?.rss?.channel?.[0]?.item || [];
        return items.map((item) => {
            const description = (first(item.description) || '').replace(/<[^>]*>/g, '');
            const link = first(item.link) || '';
            return {
                id: `medium-${first(item.guid)?._ || first(item.guid) || link}`,
                title: first(item.title) || 'Untitled',
                description: description ? `${description.substring(0, 150)}...` : '',
                published_at: toIsoDate(first(item.pubDate)),
                cover_image: pickMediumCover(first(item['content:encoded'])),
                url: link || `https://medium.com/@${MEDIUM_USERNAME}`,
                internal: false,
            };
        });
    } catch (error) {
        if (throwOnError) throw error;
        console.warn(`Medium feed unavailable: ${error.message}`);
        return [];
    }
}
