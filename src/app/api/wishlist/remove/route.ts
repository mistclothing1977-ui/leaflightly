import { auth } from "@/auth";
import { removeFromWishlist } from "@/lib/wishlist-store";

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { productId } = await req.json().catch(() => ({}));

  if (typeof productId !== "string" || !productId) {
    return Response.json({ error: "Product ID required" }, { status: 400 });
  }

  try {
    await removeFromWishlist(session.user.id, productId);
  } catch (err) {
    console.error("Wishlist remove failed:", err);
    return Response.json({ error: "Could not update wishlist" }, { status: 500 });
  }

  return Response.json({ success: true });
}
