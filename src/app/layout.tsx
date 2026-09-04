import type { Metadata, Viewport } from "next";
import { Poppins, Sora } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { NavigationProgressProvider } from "@/components/NavigationProgress";
import { ScrollToTop } from "@/components/ScrollToTop";
import { CommandPalette } from "@/components/CommandPalette";
import { buildSearchIndex } from "@/lib/search";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
  colorScheme: "light dark",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://karkhana.vercel.app",
  ),
  title: {
    default: "Karkhana",
    template: "%s · Karkhana",
  },
  description:
    "Up-to-date content and standard operating procedures from the Karkhana team.",
  openGraph: {
    title: "Karkhana",
    description: "Content and SOPs from the Karkhana team.",
    type: "website",
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
            __html: `(function(){try{var t=localStorage.getItem('karkhana-theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${poppins.variable} ${sora.variable} font-sans`}
      >
        <NavigationProgressProvider>
          <div className="flex min-h-screen flex-col bg-ink-50 dark:bg-ink-950">
            <Nav />
            <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
              {children}
            </main>
            <Footer />
          </div>
          <CommandPalette items={index} />
          <ScrollToTop />
        </NavigationProgressProvider>
      </body>
    </html>
  );
}
