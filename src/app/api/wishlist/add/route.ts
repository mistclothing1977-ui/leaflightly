import { auth } from "@/auth";
import { addToWishlist, isKnownProduct, UnknownUserError } from "@/lib/wishlist-store";

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { productId } = await req.json().catch(() => ({}));

  if (typeof productId !== "string" || !isKnownProduct(productId)) {
    return Response.json({ error: "Valid product ID required" }, { status: 400 });
  }

  try {
    await addToWishlist(session.user.id, productId);
  } catch (err) {
    if (err instanceof UnknownUserError) {
      return Response.json({ error: "Please sign in again" }, { status: 401 });
    }
    console.error("Wishlist add failed:", err);
    return Response.json({ error: "Could not update wishlist" }, { status: 500 });
  }

  return Response.json({ success: true });
}
