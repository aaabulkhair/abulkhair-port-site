const Parser = require('rss-parser');
const parser = new Parser();

export default async function handler(req, res) {
    try {
        const channelId = 'UC27eutkOJU045MWeoFlzGYw';
        const channelHandle = '7adid_elsafina';
        
        // Try different RSS URL formats with proper channel ID
        const rssUrls = [
            `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
            `https://www.youtube.com/feeds/videos.xml?channel_id=@${channelHandle}`,
            `https://rsshub.app/youtube/channel/${channelId}`
        ];
        
        let feed = null;
        let lastError = null;
        
        for (const url of rssUrls) {
            try {
                console.log(`Trying RSS URL: ${url}`);
                feed = await parser.parseURL(url);
                if (feed && feed.items && feed.items.length > 0) {
                    console.log(`Success with URL: ${url}, found ${feed.items.length} items`);
                    break;
                }
            } catch (error) {
                console.log(`Failed with URL: ${url}`, error.message);
                lastError = error;
                continue;
            }
        }
        
        if (!feed || !feed.items || feed.items.length === 0) {
            throw lastError || new Error('No feed data found');
        }
        
        // Transform RSS items to our format
        const videos = feed.items.slice(0, 3).map(item => {
            // Extract video ID from different URL patterns
            let videoId = null;
            
            // Try multiple patterns for video ID extraction
            const patterns = [
                /watch\?v=([^&]+)/,           // Regular videos: /watch?v=VIDEO_ID
                /shorts\/([^?&]+)/,           // Shorts: /shorts/VIDEO_ID  
                /embed\/([^?&]+)/,            // Embedded: /embed/VIDEO_ID
                /v\/([^?&]+)/,                // Old format: /v/VIDEO_ID
                /youtu\.be\/([^?&]+)/         // Short URL: youtu.be/VIDEO_ID
            ];
            
            for (const pattern of patterns) {
                const match = item.link.match(pattern);
                if (match) {
                    videoId = match[1];
                    break;
                }
            }
            
            // Fallback: try to extract from guid if link fails
            if (!videoId && item.guid) {
                for (const pattern of patterns) {
                    const match = item.guid.match(pattern);
                    if (match) {
                        videoId = match[1];
                        break;
                    }
                }
            }
            
            // Use a fallback thumbnail if no video ID found
            const thumbnailUrl = videoId 
                ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
                : 'https://img.youtube.com/vi/lE1vA0sQMzA/mqdefault.jpg'; // Your known good video as fallback
            
            return {
                id: videoId || `fallback-${Date.now()}`,
                title: item.title,
                description: item.contentSnippet || item.content || 'Data science tutorial in Arabic',
                thumbnail: thumbnailUrl,
                url: item.link,
                publishedAt: new Date(item.pubDate).toISOString().split('T')[0]
            };
        });
        
        res.status(200).json({ videos });
        
    } catch (error) {
        console.error('YouTube RSS API Error:', error);
        
        // Return fallback data on error
        const fallbackVideos = [
            {
                id: 'lE1vA0sQMzA',
                title: '3 Resources to Prepare for Data Science Interview | In Arabic',
                thumbnail: 'https://img.youtube.com/vi/lE1vA0sQMzA/mqdefault.jpg',
                publishedAt: '2024-12-15',
                description: 'Three essential resources to help you prepare for data science interviews in Arabic.',
                url: 'https://www.youtube.com/watch?v=lE1vA0sQMzA'
            }
        ];
        
        res.status(200).json({ videos: fallbackVideos });
    }
}