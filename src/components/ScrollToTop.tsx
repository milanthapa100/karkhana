"use client";

import { useEffect, useState } from "react";
import { scrollToY } from "@/lib/scroll";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => scrollToY(0)}
      aria-label="Back to top"
      className="no-print fixed bottom-6 right-6 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg transition hover:scale-105 hover:bg-brand-700 hover:shadow-xl"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
