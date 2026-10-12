import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
  icons: {
    icon: "/favicon.ico",
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
        <Header />
        <main style={{ padding: "2rem" }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
