"use client";

import { useEffect, useRef, useState } from "react";

export function CodeBlock({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLPreElement>) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const copyCode = () => {
    const text = (props as { children?: React.ReactNode })?.children
      ? String((props as { children?: React.ReactNode }).children)
      : "";
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 2000);
  };

  const lang = (className ?? "").match(/language-(\w+)/)?.[1] ?? "";

  return (
    <div className="group/code my-6 overflow-hidden rounded-xl border border-ink-700 bg-ink-900 shadow-lg shadow-ink-900/10 dark:border-ink-800">
      <div className="flex items-center justify-between border-b border-ink-800 bg-ink-950/70 px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <span className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-ink-700" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink-700" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink-700" />
          </span>
          <span className="ml-1 text-xs font-medium tracking-wide text-ink-400">
            {lang ? `${lang}.md` : "template.md"}
          </span>
        </div>
        <button
          type="button"
          onClick={copyCode}
          className="inline-flex items-center gap-1.5 rounded-md border border-ink-700 bg-ink-800/80 px-2.5 py-1 text-[11px] font-medium text-ink-300 transition-colors hover:border-ink-600 hover:bg-ink-700 hover:text-white"
        >
          {copied ? (
            <>
              <svg className="h-3 w-3 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <svg className="h-3 w-3 text-ink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span>Copy template</span>
            </>
          )}
        </button>
      </div>
      <pre
        className={`overflow-x-auto p-5 text-[13px] leading-[1.75] text-ink-100 [&_code]:bg-transparent ${className ?? ""}`}
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}