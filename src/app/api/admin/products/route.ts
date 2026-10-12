import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { products, product_audit_logs } from "@/lib/db/schema";
import { productInputSchema } from "@/lib/validate";
import { withAuth, withSecurityHeaders, withCORS } from "@/lib/api/middleware";
import { adminProductRateLimit } from "@/lib/rateLimit";
import { successResponse, errorResponse } from "@/lib/api/handler";

export const dynamic = "force-dynamic";

// Handle CORS preflight
export async function OPTIONS(_req: NextRequest) {
  const response = new NextResponse(null, { status: 204 });
  return withSecurityHeaders(withCORS(response));
}

// GET /api/admin/products - List all products
export async function GET(req: NextRequest) {
  try {
    return withAuth(req, async (_req, _userId) => {
      const allProducts = await db
        .select()
        .from(products)
        .limit(100);

      let response = successResponse({ products: allProducts });
      return withSecurityHeaders(withCORS(response));
    });
  } catch (err) {
    console.error("Failed to list products:", err);
    let response = errorResponse("Failed to list products", "INTERNAL_ERROR", 500);
    return withSecurityHeaders(withCORS(response));
  }
}

// POST /api/admin/products - Create new product
export async function POST(req: NextRequest) {
  try {
    return withAuth(req, async (req, userId) => {
      // Rate limit: 10 products per hour per user
      const rateLimit = await adminProductRateLimit.limit(userId);
      if (!rateLimit.success) {
        let response = errorResponse(
          "Too many product creations. Limit: 10 per hour",
          "RATE_LIMIT",
          429
        );
        return withSecurityHeaders(withCORS(response));
      }

      // Validate input
      const body = await req.json();
      const validated = productInputSchema.parse(body);

      // Generate slug if not provided
      const slug =
        validated.slug ||
        validated.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");

      // Check slug uniqueness
      const existing = await db
        .select()
        .from(products)
        .where(eq(products.slug, slug))
        .limit(1)
        .then((rows) => rows[0]);

      if (existing) {
        let response = errorResponse("Product slug already exists", "DUPLICATE", 400);
        return withSecurityHeaders(withCORS(response));
      }

      // Create product with pending_review status
      const [newProduct] = await db
        .insert(products)
        .values({
          slug,
          name: validated.name,
          brand_id: validated.brand_id,
          category_id: validated.category_id,
          description: validated.description,
          long_description: validated.long_description,
          price_gbp: validated.price_gbp ? validated.price_gbp.toString() : undefined,
          price_usd: validated.price_usd ? validated.price_usd.toString() : undefined,
          price_eur: validated.price_eur ? validated.price_eur.toString() : undefined,
          tier: validated.tier,
          image_storage_path: validated.image_storage_path,
          materials: validated.materials,
          sustainability_notes: validated.sustainability_notes,
          durability: validated.durability,
          care_instructions: validated.care_instructions,
          tags: validated.tags || [],
          affiliate_amazon_enabled: validated.affiliate_amazon_enabled,
          affiliate_awin_enabled: validated.affiliate_awin_enabled,
          affiliate_awin_merchant_id: validated.affiliate_awin_merchant_id,
          seo_title: validated.seo_title,
          seo_description: validated.seo_description,
          status: "draft",
          created_by: userId,
          created_at: new Date(),
          updated_at: new Date(),
        })
        .returning();

      // Log audit trail
      await db.insert(product_audit_logs).values({
        product_id: newProduct.id,
        user_id: userId,
        action: "created",
        changes: { ...newProduct },
        reason: "Product created by admin",
        created_at: new Date(),
      });

      let response = successResponse({ product: newProduct }, 201);
      return withSecurityHeaders(withCORS(response));
    });
  } catch (err) {
    console.error("Failed to create product:", err);
    let response = errorResponse("Failed to create product", "INTERNAL_ERROR", 500);
    return withSecurityHeaders(withCORS(response));
  }
}
