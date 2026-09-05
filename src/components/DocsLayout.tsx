"use client";

export function DocsLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}) {
  return (
    <div
      className={
        sidebar
          ? "xl:grid xl:grid-cols-[minmax(0,1fr)_260px] xl:gap-8"
          : ""
      }
    >
      <main className="min-w-0">{children}</main>

      {sidebar && (
        <aside className="hidden xl:sticky xl:top-20 xl:block xl:self-start">
          {sidebar}
        </aside>
      )}
    </div>
  );
}
