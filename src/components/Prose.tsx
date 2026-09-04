import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { createHeadingIdResolver, headingPlainText } from "@/lib/toc";

function collectText(node: React.ReactNode): string {
  if (node == null) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(collectText).join("");
  if (typeof node === "object" && "props" in node) {
    return collectText((node as { props: { children?: React.ReactNode } }).props
      .children);
  }
  return "";
}

export function Prose({ markdown }: { markdown: string }) {
  const resolveId = createHeadingIdResolver();

  const makeHeading = (level: 2 | 3 | 4) => {
    const Tag = `h${level}` as const;
    const Heading = ({
      children,
      ...props
    }: React.ComponentPropsWithoutRef<"h2">) => {
      const text = collectText(children);
      const plain = headingPlainText(text);
      return (
        <Tag id={resolveId(plain || "section")} {...props}>
          {children}
        </Tag>
      );
    };
    Heading.displayName = `Prose${Tag.toUpperCase()}`;
    return Heading;
  };

  return (
    <div
      className="prose prose-ink max-w-none text-base leading-relaxed prose-headings:font-display prose-headings:font-semibold prose-headings:tracking-tight prose-h2:mb-4 prose-h2:mt-11 prose-h2:text-2xl prose-h2:text-ink-900 prose-h3:mt-8 prose-h3:text-xl prose-h3:text-ink-900 prose-p:my-4 prose-p:leading-[1.85] prose-a:font-medium prose-a:text-brand-600 prose-a:underline-offset-4 hover:prose-a:text-brand-700 prose-strong:font-semibold prose-strong:text-ink-900 prose-blockquote:border-l-4 prose-blockquote:border-brand-300 prose-blockquote:bg-ink-50 prose-blockquote:px-5 prose-blockquote:py-3 prose-blockquote:not-italic prose-blockquote:text-ink-600 prose-code:rounded-md prose-code:bg-ink-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[0.875em] prose-code:font-medium prose-code:text-brand-700 prose-pre:rounded-2xl prose-pre:bg-ink-950 prose-pre:shadow-inner dark:prose-invert dark:prose-headings:text-white dark:prose-p:text-ink-200 dark:prose-a:text-brand-300 dark:hover:prose-a:text-brand-200 dark:prose-strong:text-white dark:prose-blockquote:border-brand-500 dark:prose-blockquote:bg-ink-800/60 dark:prose-blockquote:text-ink-300 dark:prose-code:bg-ink-800 dark:prose-code:text-brand-300 dark:prose-pre:bg-ink-900 [&_li]:py-1 [&_li]:leading-relaxed [&_input[type=checkbox]]:h-4 [&_input[type=checkbox]]:w-4 [&_input[type=checkbox]]:rounded [&_input[type=checkbox]]:border-ink-300 [&_input[type=checkbox]]:accent-brand-600 [&_ul]:mt-4 [&_ol]:mt-4 [&_hr]:my-8 [&_hr]:border-ink-200 dark:[&_hr]:border-ink-800"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: makeHeading(2),
          h3: makeHeading(3),
          h4: makeHeading(4),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
