"use client";

import { useCallback, useState } from "react";
import { Sidebar } from "./Sidebar";
import { MobileSidebar } from "./MobileSidebar";
import { Nav } from "./Nav";

export function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const toggleMobile = useCallback(() => setMobileOpen((v) => !v), []);

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <MobileSidebar
        open={mobileOpen}
        onClose={closeMobile}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Nav onMenuToggle={toggleMobile} />
        <main className="flex-1 px-4 py-10 sm:px-6 sm:py-14">
          {children}
        </main>
      </div>
    </div>
  );
}
