import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL, {
  ssl: "require",
  max: 1,
  idle_timeout: 20,
  connect_timeout: 10,
});

(async () => {
  try {
    console.log("Testing database schema...");
    
    // Test newsletter_signups table
    const result = await sql`SELECT COUNT(*) as count FROM newsletter_signups`;
    console.log("✓ newsletter_signups table accessible:", result);
    
    // Test inserting a record
    const inserted = await sql`INSERT INTO newsletter_signups (email, status) VALUES (${"test@example.com"}, ${"pending"}) RETURNING *`;
    console.log("✓ Insert successful:", inserted);
    
    // Test selecting the record
    const selected = await sql`SELECT * FROM newsletter_signups WHERE email = ${"test@example.com"}`;
    console.log("✓ Select successful:", selected);
    
    console.log("\n✓ Database connection and schema validation successful!");
    process.exit(0);
  } catch (err) {
    console.error("✗ Error:", err.message);
    process.exit(1);
  }
})();
