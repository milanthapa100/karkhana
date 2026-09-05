"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#fafafa", color: "#18181b" }}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            fontFamily:
              "Poppins, ui-sans-serif, system-ui, -apple-system, sans-serif",
            padding: "24px",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 440,
              borderRadius: 16,
              border: "1px solid #e4e4e7",
              background: "#ffffff",
              padding: "32px",
              boxShadow: "0 4px 20px rgba(9,9,11,0.06)",
            }}
          >
            <div
              style={{
                fontSize: 64,
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: "#2563eb",
              }}
            >
              500
            </div>
            <h1
              style={{
                marginTop: 8,
                fontSize: 20,
                fontWeight: 600,
                letterSpacing: "-0.01em",
              }}
            >
              Something went wrong
            </h1>
            <p style={{ marginTop: 8, fontSize: 14, color: "#71717a" }}>
              An unexpected error occurred while loading this page.
            </p>
            {error.digest && (
              <p
                style={{
                  marginTop: 12,
                  fontSize: 12,
                  color: "#a1a1aa",
                  fontFamily: "ui-monospace, monospace",
                }}
              >
                Error ID: {error.digest}
              </p>
            )}
            <button
              type="button"
              onClick={reset}
              style={{
                marginTop: 20,
                cursor: "pointer",
                border: "none",
                borderRadius: 8,
                background: "#2563eb",
                color: "#ffffff",
                fontSize: 14,
                fontWeight: 500,
                padding: "10px 20px",
              }}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
