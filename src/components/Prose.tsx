import { Children, cloneElement, isValidElement } from "react";
import type { TableHTMLAttributes } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { createHeadingIdResolver, headingPlainText } from "@/lib/toc";
import { CodeBlock } from "./CodeBlock";

type TableEl = React.ReactElement<{ children?: React.ReactNode; className?: string }>;

function collectText(node: React.ReactNode): string {
  if (node == null) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(collectText).join("");
  if (isValidElement(node)) {
    return collectText((node.props as { children?: React.ReactNode }).children);
  }
  return "";
}

function collectHeaderCells(tableChildren: React.ReactNode): string[] {
  const parts = Children.toArray(tableChildren);
  for (const part of parts) {
    if (!isValidElement(part) || part.type !== "thead") continue;
    const rows = Children.toArray(
      (part.props as { children?: React.ReactNode }).children,
    );
    const row = rows.find((r): r is TableEl => isValidElement(r));
    if (!row) return [];
    const cells = Children.toArray(
      (row.props as { children?: React.ReactNode }).children,
    );
    return cells.map((c) => collectText(c as React.ReactNode).toLowerCase().trim());
  }
  return [];
}

const TH_CLS =
  "border-b border-ink-200 bg-ink-50 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-ink-600 dark:border-ink-800 dark:bg-ink-900 dark:text-ink-300";
const TD_CLS =
  "px-4 py-3 align-middle text-sm leading-relaxed text-ink-700 dark:text-ink-200";

function ProseTable({
  children,
}: TableHTMLAttributes<HTMLTableElement> & { children?: React.ReactNode }) {
  const colTypes = collectHeaderCells(children);

  const decorated = Children.map(children, (child) => {
    if (!isValidElement(child)) return child;

    if (child.type === "thead") {
      const rows = Children.map(
        (child.props as { children?: React.ReactNode }).children,
        (row) => {
          if (!isValidElement(row)) return row;
          const cells = Children.map(
            (row.props as { children?: React.ReactNode }).children,
            (cell) =>
              isValidElement(cell)
                ? cloneElement(cell as TableEl, {
                    className: [TH_CLS, (cell.props as { className?: string }).className]
                      .filter(Boolean)
                      .join(" "),
                  })
                : cell,
          );
          return cloneElement(row as TableEl, { children: cells });
        },
      );
      return cloneElement(child as TableEl, { children: rows });
    }

    if (child.type === "tbody") {
      const rows = Children.map(
        (child.props as { children?: React.ReactNode }).children,
        (row) => {
          if (!isValidElement(row)) return row;
          const cells = Children.map(
            (row.props as { children?: React.ReactNode }).children,
            (cell, ci) => {
              if (!isValidElement(cell)) return cell;
              const isVersion = (colTypes[ci] ?? "").includes("version");
              const body = isVersion ? (
                <span className="inline-flex items-center rounded-md bg-brand-50 px-2 py-0.5 font-mono text-xs font-semibold text-brand-700 ring-1 ring-inset ring-brand-200/70 dark:bg-brand-500/10 dark:text-brand-300 dark:ring-brand-500/30">
                  {(cell.props as { children?: React.ReactNode }).children}
                </span>
              ) : (
                (cell.props as { children?: React.ReactNode }).children
              );
              return cloneElement(cell as TableEl, {
                className: [TD_CLS, (cell.props as { className?: string }).className]
                  .filter(Boolean)
                  .join(" "),
                children: body,
              });
            },
          );
          return cloneElement(row as TableEl, { children: cells });
        },
      );
      return cloneElement(child as TableEl, { children: rows });
    }

    return child;
  });

  return (
    <div className="my-6 overflow-x-auto rounded-2xl border border-ink-200 bg-white shadow-2xs dark:border-ink-800 dark:bg-ink-900">
      <table className="w-full border-collapse text-sm [&_tbody_tr]:border-b [&_tbody_tr]:border-ink-100 [&_tbody_tr]:transition-colors [&_tbody_tr:hover]:bg-brand-50/40 [&_tbody_tr:last-child]:border-0 dark:[&_tbody_tr]:border-ink-800 dark:[&_tbody_tr:hover]:bg-brand-500/5">
        {decorated}
      </table>
    </div>
  );
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
      className="prose prose-ink max-w-none text-base leading-relaxed prose-headings:font-display prose-headings:font-semibold prose-headings:tracking-tight prose-h2:mb-4 prose-h2:mt-11 prose-h2:text-2xl prose-h2:text-ink-900 dark:prose-h2:text-white prose-h3:mt-8 prose-h3:text-xl prose-h3:text-ink-900 dark:prose-h3:text-white prose-p:my-4 prose-p:leading-[1.85] prose-a:font-medium prose-a:text-brand-600 prose-a:no-underline hover:prose-a:text-brand-500 prose-strong:font-semibold prose-strong:text-ink-900 prose-blockquote:border-l-4 prose-blockquote:border-brand-500 prose-blockquote:bg-brand-50/50 prose-blockquote:px-5 prose-blockquote:py-3 prose-blockquote:not-italic prose-blockquote:text-ink-700 prose-code:rounded-md prose-code:bg-ink-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[0.875em] prose-code:font-medium prose-code:text-ink-800 dark:prose-invert dark:prose-headings:text-white dark:prose-p:text-ink-200 dark:prose-a:text-brand-400 dark:hover:prose-a:text-brand-300 dark:prose-strong:text-white dark:prose-blockquote:border-brand-400 dark:prose-blockquote:bg-brand-500/10 dark:prose-blockquote:text-ink-200 dark:prose-code:bg-ink-800 dark:prose-code:text-ink-200 [&_li]:py-1 [&_li]:leading-relaxed [&_ul]:mt-4 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_hr]:my-8 [&_hr]:border-ink-200 dark:[&_hr]:border-ink-800"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: makeHeading(2),
          h3: makeHeading(3),
          h4: makeHeading(4),
          pre: CodeBlock,
          table: ProseTable,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}