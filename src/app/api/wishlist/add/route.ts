import { auth } from "@/auth";
import { addToWishlist } from "@/lib/wishlist-store";

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { productId } = await req.json();

  if (!productId) {
    return Response.json({ error: "Product ID required" }, { status: 400 });
  }

  await addToWishlist(session.user.id, productId);

  return Response.json({ success: true });
}
