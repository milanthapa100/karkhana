import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { SidebarLayout } from "@/components/SidebarLayout";
import { ScrollToTop } from "@/components/ScrollToTop";
import { CommandPalette } from "@/components/CommandPalette";
import { buildSearchIndex } from "@/lib/search";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  colorScheme: "light dark",
};

const poppinsSans = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
});

const poppinsDisplay = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "DPK",
    template: "%s · DPK",
  },
  description:
    "Up-to-date content and standard operating procedures from the DPK team.",
  icons: {
    icon: [
      { url: "/dpk.png", type: "image/png" },
      { url: "/dpk_logo.png", type: "image/png" },
    ],
    shortcut: "/dpk.png",
  },
  openGraph: {
    title: "DPK",
    description: "Content and SOPs from the DPK team.",
    type: "website",
    images: [{ url: "/dpk.png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const index = buildSearchIndex();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('karkhana-theme');var m=(s==='light'||s==='dark')?s:'system';var mql=window.matchMedia('(prefers-color-scheme: dark)');var apply=function(){var d=(m==='dark')||(m==='system'&&mql.matches);document.documentElement.classList.toggle('dark',d);};apply();if(mql.addEventListener){mql.addEventListener('change',apply);}else if(mql.addListener){mql.addListener(apply);}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${poppinsSans.variable} ${poppinsDisplay.variable} font-sans`}
      >
        <div className="flex min-h-screen flex-col bg-ink-50 dark:bg-ink-950">
          <SidebarLayout>
            {children}
          </SidebarLayout>
        </div>
        <CommandPalette items={index} />
        <ScrollToTop />
      </body>
    </html>
  );
}
