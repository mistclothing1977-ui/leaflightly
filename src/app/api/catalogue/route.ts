import { getAllProducts } from '@/lib/catalogue';

// Full catalogue for client-side search, compare and wishlist.
export const revalidate = 3600;

export async function GET() {
  const products = await getAllProducts();
  return Response.json(products, {
    headers: { 'Cache-Control': 'public, max-age=300, s-maxage=3600' },
  });
}
