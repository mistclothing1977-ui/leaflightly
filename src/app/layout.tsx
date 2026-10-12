import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Leaf Lightly — Discover the Good Stuff That Works",
  description: "An editorial discovery platform for sustainable, thoughtfully-made products across kitchen, fashion, home, beauty, and wellness.",
  openGraph: {
    title: "Leaf Lightly",
    description: "Discover the good stuff that works",
    url: "https://leaflightly.com",
    siteName: "Leaf Lightly",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: "1rem", borderBottom: "1px solid #ddd" }}>
          <h1 style={{ margin: 0, fontSize: "1.5rem" }}>🌿 Leaf Lightly</h1>
        </header>
        <main style={{ padding: "2rem" }}>
          {children}
        </main>
        <footer style={{ padding: "2rem", borderTop: "1px solid #ddd", textAlign: "center", color: "#666" }}>
          <p>&copy; 2026 Leaf Lightly. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
