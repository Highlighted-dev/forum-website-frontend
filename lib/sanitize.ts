import sanitizeHtml from "sanitize-html";

export function sanitizeHTML(content: string): string {
  return sanitizeHtml(content, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      "img",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "span",
      "div",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "mark",
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      a: ["href", "name", "target", "rel"],
      img: ["src", "alt", "title", "width", "height"],
      th: ["colspan", "rowspan", "style"],
      td: ["colspan", "rowspan", "style"],
      "*": ["class", "style", "data-type"],
    },
    allowedStyles: {
      "*": {
        color: [/^#(0x)?[0-9a-f]+$/i, /^rgb\(/, /^hsl\(/],
        "text-align": [/^left$/, /^right$/, /^center$/, /^justify$/],
        "background-color": [/^#(0x)?[0-9a-f]+$/i, /^rgb\(/, /^hsl\(/],
      },
    },
  });
}
