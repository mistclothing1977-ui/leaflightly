import type { Metadata } from "next";
import { Providers } from "./providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AIChat from "@/components/AIChat";
import "./globals.css";

export const metadata: Metadata = {
  title: "Leaf Lightly — Discover the Good Stuff That Works",
  description: "Curated sustainable products with real ratings. Shop directly from brands and retailers through our affiliate links.",
  openGraph: {
    title: "Leaf Lightly",
    description: "Discover the good stuff that works",
    url: "https://leaflightly.com",
    siteName: "Leaf Lightly",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
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
        <Providers>
          <Header />
          <main className="mainContent">
            {children}
          </main>
          <Footer />
          <AIChat />
        </Providers>
      </body>
    </html>
  );
}
