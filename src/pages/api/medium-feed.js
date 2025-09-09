import { parseStringPromise } from 'xml2js';

export default async function handler(req, res) {
    try {
        const mediumUsername = 'aaabulkhair';
        const rssUrl = `https://medium.com/@${mediumUsername}/feed`;
        
        // Fetch RSS feed from Medium
        const response = await fetch(rssUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; RSS reader)',
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const xmlData = await response.text();
        
        // Parse XML to JSON
        const result = await parseStringPromise(xmlData);
        
        if (!result.rss || !result.rss.channel || !result.rss.channel[0].item) {
            throw new Error('Invalid RSS structure');
        }
        
        // Transform RSS items to match the expected blog format
        const articles = result.rss.channel[0].item.map((item, index) => {
            // Extract image from content or use a default Medium image
            let coverImage = '/images/medium-logo.webp'; // Default fallback
            
            // Try to extract image from content
            if (item['content:encoded'] && item['content:encoded'][0]) {
                const imgMatch = item['content:encoded'][0].match(/<img[^>]+src="([^"]+)"/);
                if (imgMatch) {
                    coverImage = imgMatch[1];
                }
            }
            
            // Clean up description by removing HTML tags
            let description = '';
            if (item.description && item.description[0]) {
                description = item.description[0]
                    .replace(/<[^>]*>/g, '') // Remove HTML tags
                    .substring(0, 150) + '...'; // Truncate to 150 chars
            }
            
            return {
                id: index + 1,
                title: item.title ? item.title[0] : 'Untitled',
                description: description,
                published_at: item.pubDate ? item.pubDate[0] : new Date().toISOString(),
                cover_image: coverImage,
                canonical_url: item.link ? item.link[0] : '#',
                url: item.link ? item.link[0] : '#'
            };
        });
        
        res.status(200).json({
            success: true,
            articles: articles.slice(0, 10) // Return latest 10 articles
        });
        
    } catch (error) {
        console.error('Medium RSS fetch error:', error);
        
        // Return fallback data if RSS fails
        const fallbackArticles = [
            {
                id: 1,
                title: 'Latest Medium Articles',
                description: 'Check out my latest technical articles and insights on Medium covering data science, machine learning, and AI.',
                published_at: new Date().toISOString(),
                cover_image: '/images/medium-logo.webp',
                canonical_url: 'https://medium.com/@aaabulkhair',
                url: 'https://medium.com/@aaabulkhair'
            }
        ];
        
        res.status(200).json({
            success: false,
            articles: fallbackArticles,
            error: 'Failed to fetch Medium RSS feed'
        });
    }
}