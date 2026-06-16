import {
  isHtmlContent,
  sanitizeArticleHtml,
} from "@/lib/sanitize/html";

export function ArticleContent({ content }: { content: string }) {
  if (!isHtmlContent(content)) {
    return (
      <div className="max-w-none leading-relaxed whitespace-pre-wrap">
        {content}
      </div>
    );
  }

  const html = sanitizeArticleHtml(content);

  return (
    <div
      className="prose prose-neutral max-w-none leading-relaxed dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
