export type NavGroup = {
  label?: string;
  items: NavItem[];
};

export type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

export const NAV_GROUPS: NavGroup[] = [
  {
    label: "General",
    items: [
      {
        href: "/",
        label: "Overview",
        icon: (
          <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
            <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </svg>
        ),
      },
    ],
  },
  {
    label: "Knowledge",
    items: [
      {
        href: "/updates",
        label: "Updates",
        icon: (
          <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 8v4l3 3" />
            <circle cx="12" cy="12" r="10" />
          </svg>
        ),
      },
      {
        href: "/sops",
        label: "SOPs",
        icon: (
          <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 12l2 2 4-4" />
            <circle cx="12" cy="12" r="10" />
          </svg>
        ),
      },
    ],
  },
  {
    label: "Team",
    items: [
      {
        href: "/members",
        label: "Members",
        icon: (
          <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        ),
      },
      {
        href: "/about",
        label: "About",
        icon: (
          <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
        ),
      },
    ],
  },
];

export const NAV_ITEMS: NavItem[] = NAV_GROUPS.flatMap((g) => g.items);

export function isNavActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}