import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL, {
  ssl: "require",
  max: 1,
  idle_timeout: 20,
  connect_timeout: 10,
});

(async () => {
  try {
    console.log("Attempting connection...");
    const result = await sql`SELECT 1 as test`;
    console.log("Connection successful:", result);
    process.exit(0);
  } catch (err) {
    console.error("Connection failed:", err.message);
    process.exit(1);
  }
})();
