import { parseStringPromise } from 'xml2js';

// Build-time (ISR) fetchers for the homepage widgets. Both return [] on any
// failure so a feed outage never breaks the page build.

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

export async function fetchYouTubeVideos(max = 3) {
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
        console.warn(`YouTube feed unavailable: ${error.message}`);
        return [];
    }
}

// Only hosts allowed by images.remotePatterns in next.config.js can go through next/image.
function safeCoverImage(src) {
    try {
        const { protocol, hostname } = new URL(src);
        return protocol === 'https:' && (hostname === 'medium.com' || hostname.endsWith('.medium.com'))
            ? src
            : MEDIUM_FALLBACK_COVER;
    } catch {
        return MEDIUM_FALLBACK_COVER;
    }
}

export async function fetchMediumArticles() {
    try {
        const xml = await fetchXml(`https://medium.com/@${MEDIUM_USERNAME}/feed`);
        const items = xml?.rss?.channel?.[0]?.item || [];
        return items.map((item) => {
            const html = first(item['content:encoded']) || '';
            const imgMatch = html.match(/<img[^>]+src="([^"]+)"/);
            const description = (first(item.description) || '').replace(/<[^>]*>/g, '');
            const link = first(item.link) || '';
            return {
                id: `medium-${first(item.guid)?._ || first(item.guid) || link}`,
                title: first(item.title) || 'Untitled',
                description: description ? `${description.substring(0, 150)}...` : '',
                published_at: toIsoDate(first(item.pubDate)),
                cover_image: imgMatch ? safeCoverImage(imgMatch[1]) : MEDIUM_FALLBACK_COVER,
                url: link || `https://medium.com/@${MEDIUM_USERNAME}`,
                internal: false,
            };
        });
    } catch (error) {
        console.warn(`Medium feed unavailable: ${error.message}`);
        return [];
    }
}
