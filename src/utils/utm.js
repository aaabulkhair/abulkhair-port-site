// Tag an external URL with UTM params. Uses URLSearchParams.set so an existing
// utm_* value is overwritten, never duplicated, and existing query params
// (e.g. YouTube's ?v=) are preserved.
export function withUtm(url, { medium, campaign, source = 'abulkhair.ai' } = {}) {
    if (!url || !/^https?:\/\//.test(url)) return url;
    const u = new URL(url);
    u.searchParams.set('utm_source', source);
    if (medium) u.searchParams.set('utm_medium', medium);
    if (campaign) u.searchParams.set('utm_campaign', campaign);
    return u.toString();
}
