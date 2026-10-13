import { registerUser } from "@/auth";
import { UserExistsError } from "@/lib/users";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: { name?: unknown; email?: unknown; password?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!name || !email || !password) {
    return Response.json({ error: "Name, email, and password required" }, { status: 400 });
  }
  if (name.length > 100) {
    return Response.json({ error: "Name must be 100 characters or fewer" }, { status: 400 });
  }
  if (email.length > 255 || !EMAIL_RE.test(email)) {
    return Response.json({ error: "Please enter a valid email address" }, { status: 400 });
  }
  if (password.length < 8) {
    return Response.json({ error: "Password must be 8+ characters" }, { status: 400 });
  }
  // bcrypt ignores bytes beyond 72, so longer passwords would give a false sense of strength.
  if (Buffer.byteLength(password, "utf8") > 72) {
    return Response.json({ error: "Password must be 72 bytes or fewer" }, { status: 400 });
  }

  try {
    const user = await registerUser(email, name, password);
    return Response.json({
      success: true,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    if (error instanceof UserExistsError) {
      return Response.json({ error: error.message }, { status: 409 });
    }
    console.error("Signup failed:", error);
    return Response.json({ error: "Signup failed. Please try again." }, { status: 500 });
  }
}
