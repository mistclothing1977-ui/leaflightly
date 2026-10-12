import { auth } from "@/auth";
import { getWishlist } from "@/lib/wishlist-store";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const wishlist = await getWishlist(session.user.id);

  return Response.json({ wishlist });
}
