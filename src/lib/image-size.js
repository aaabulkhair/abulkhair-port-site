import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

// Reads intrinsic width/height from a PNG or JPEG header. Returns null for
// anything else (remote URLs, other formats) so callers can fall back to <img>.
export function getImageSize(src) {
    if (!src || !src.startsWith('/')) return null;
    const file = path.join(PUBLIC_DIR, src);
    if (!file.startsWith(PUBLIC_DIR) || !fs.existsSync(file)) return null;
    const buf = fs.readFileSync(file);

    // PNG: 8-byte signature, then IHDR with width/height as big-endian uint32.
    if (buf.length >= 24 && buf.readUInt32BE(0) === 0x89504e47) {
        return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
    }

    // JPEG: walk segments until a start-of-frame marker.
    if (buf.length >= 4 && buf[0] === 0xff && buf[1] === 0xd8) {
        let offset = 2;
        while (offset + 9 < buf.length) {
            if (buf[offset] !== 0xff) return null;
            const marker = buf[offset + 1];
            const length = buf.readUInt16BE(offset + 2);
            const isSOF = marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker);
            if (isSOF) {
                return { height: buf.readUInt16BE(offset + 5), width: buf.readUInt16BE(offset + 7) };
            }
            offset += 2 + length;
        }
    }
    return null;
}

// Sizes for every local image referenced by Markdown image syntax in `content`.
export function getContentImageSizes(content) {
    const sizes = {};
    for (const [, src] of content.matchAll(/!\[[^\]]*\]\((\/[^\s)]+)/g)) {
        const size = getImageSize(src);
        if (size) sizes[src] = size;
    }
    return sizes;
}
