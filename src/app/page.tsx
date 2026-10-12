export default function Home() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <section style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
          Discover the good stuff that works.
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#666", maxWidth: "600px", margin: "0 auto" }}>
          An editorial discovery platform for sustainable, thoughtfully-made products across kitchen, fashion, home, beauty, and wellness.
        </p>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2>Featured Categories</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
          {["Kitchen", "Fashion", "Home", "Beauty", "Wellness"].map((cat) => (
            <div
              key={cat}
              style={{
                padding: "1rem",
                border: "1px solid #ddd",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              <h3>{cat}</h3>
              <p style={{ color: "#999", fontSize: "0.9rem" }}>Coming soon</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ backgroundColor: "#f9f9f9", padding: "2rem", borderRadius: "4px" }}>
        <h2>Admin Area</h2>
        <p style={{ marginBottom: "1rem" }}>
          <a href="/admin/dashboard" style={{ color: "#6B8E5F", fontWeight: "bold" }}>
            Go to Admin Dashboard →
          </a>
        </p>
        <p style={{ fontSize: "0.9rem", color: "#666" }}>
          (You'll need to log in with Supabase Auth)
        </p>
      </section>

      <section style={{ marginTop: "3rem", textAlign: "center", color: "#999" }}>
        <p>This is a placeholder homepage. Full design coming with Phase 5.</p>
      </section>
    </div>
  );
}
