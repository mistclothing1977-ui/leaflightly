import { registerUser } from "@/auth";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return Response.json(
        { error: "Name, email, and password required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return Response.json(
        { error: "Password must be 8+ characters" },
        { status: 400 }
      );
    }

    const user = await registerUser(email, name, password);

    return Response.json({
      success: true,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error: any) {
    return Response.json(
      { error: error.message || "Signup failed" },
      { status: 400 }
    );
  }
}
