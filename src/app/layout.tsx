import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Karkhana Content",
  description: "Up-to-date content from the Karkhana team.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <a href="/" className="brand">
            Karkhana
          </a>
        </header>
        <main className="container">{children}</main>
        <footer className="site-footer">
          Content managed on GitHub.
        </footer>
      </body>
    </html>
  );
}
