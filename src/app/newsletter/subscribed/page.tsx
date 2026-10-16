import type { Metadata } from "next";
import Link from "next/link";
import { getAllProducts } from '@/lib/catalogue';

export const metadata: Metadata = {
  title: "You're subscribed — Leaf Lightly",
  description: "Your Leaf Lightly newsletter subscription is confirmed.",
  robots: { index: false, follow: false },
};

export default async function SubscribedPage() {
  const products = await getAllProducts();
  const picks = products.filter((p) => p.featured).slice(0, 3);

  return (
    <main
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 20px",
        textAlign: "center",
        background: "#F8F6F3",
        color: "#2A2A26",
      }}
    >
      <img src="/assets/logos/logo-mark.png" width={72} height={72} alt="" aria-hidden="true" />
      <p style={{ margin: "12px 0 0", fontSize: 13, letterSpacing: 2, textTransform: "uppercase", color: "#1a472a", fontWeight: 700 }}>
        Leaf Lightly
      </p>
      <h1 style={{ margin: "24px 0 12px", fontFamily: "Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.4rem)", color: "#1a472a" }}>
        You&apos;re subscribed
      </h1>
      <p style={{ maxWidth: 480, margin: "0 0 28px", fontSize: 17, lineHeight: 1.6 }}>
        Thanks for confirming. Each week we&apos;ll send you our favourite vetted sustainable picks.
      </p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        <Link
          href="/products"
          style={{ padding: "14px 28px", borderRadius: 8, background: "#FF6B35", color: "#fff", fontWeight: 700, textDecoration: "none" }}
        >
          Browse products
        </Link>
        <Link
          href="/"
          style={{ padding: "14px 28px", borderRadius: 8, background: "#fff", color: "#1a472a", fontWeight: 700, textDecoration: "none", border: "1px solid #1a472a" }}
        >
          Back to home
        </Link>
      </div>
      {picks.length > 0 && (
        <section style={{ marginTop: 40, maxWidth: 640, width: "100%" }}>
          <p style={{ fontSize: 13, letterSpacing: 1.5, textTransform: "uppercase", color: "#6B6B63", margin: "0 0 12px" }}>
            Start with these
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
            {picks.map((p) => (
              <li key={p.id}>
                <Link href={`/products/${p.id}`} style={{ display: "block", padding: "14px 18px", background: "#fff", borderRadius: 10, color: "#2A2A26", textDecoration: "none", textAlign: "left" }}>
                  <span style={{ display: "block", fontSize: 12, color: "#6B6B63", textTransform: "uppercase", letterSpacing: 1 }}>{p.brand}</span>
                  <span style={{ fontWeight: 700 }}>{p.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
