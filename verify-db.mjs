import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL, {
  ssl: "require",
  max: 1,
  idle_timeout: 20,
  connect_timeout: 10,
});

(async () => {
  try {
    const results = await sql`SELECT * FROM newsletter_signups ORDER BY subscribed_at DESC LIMIT 5`;
    console.log("✓ Newsletter signups in database:");
    console.log(JSON.stringify(results, null, 2));
    process.exit(0);
  } catch (err) {
    console.error("✗ Error:", err.message);
    process.exit(1);
  }
})();
