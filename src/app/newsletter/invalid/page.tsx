import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Link not valid — Leaf Lightly",
  robots: { index: false, follow: false },
};

export default function InvalidConfirmationPage() {
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
      <h1 style={{ margin: "0 0 12px", fontFamily: "Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.4rem)", color: "#1a472a" }}>
        This link isn&apos;t valid
      </h1>
      <p style={{ maxWidth: 480, margin: "0 0 28px", fontSize: 17, lineHeight: 1.6 }}>
        It may have been copied incorrectly or already used. Sign up again from our homepage and we&apos;ll send a fresh link.
      </p>
      <Link href="/" style={{ padding: "14px 28px", borderRadius: 8, background: "#1a472a", color: "#fff", fontWeight: 700, textDecoration: "none" }}>
        Back to Leaf Lightly
      </Link>
    </main>
  );
}
