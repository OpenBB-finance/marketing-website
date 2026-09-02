import { marked } from "marked";

export function parseMarkdown(body: string): string {
  let html = marked.parse(body || "") as string;
  html = html.replace(
    /<p>(<img [^>]+>)<\/p>\s*<p>([^<]{1,150})<\/p>/g,
    "<figure>$1<figcaption>$2</figcaption></figure>",
  );
  html = html.replace(/<source\s+src="([^"]+)"(\s*\/?)>/g, (match, src, close) => {
    if (match.includes('type="')) return match;
    return `<source src="${src}" type="video/mp4"${close}>`;
  });
  return html;
}
