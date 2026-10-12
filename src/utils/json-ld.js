// Serialize a schema.org object for a <script type="application/ld+json"> tag.
// Escapes "<" so content like "</script>" in a title can't break out of the tag.
export function jsonLd(schema) {
    return JSON.stringify(schema).replace(/</g, '\\u003c');
}
