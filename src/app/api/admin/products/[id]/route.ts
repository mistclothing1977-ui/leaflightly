import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { products, product_audit_logs } from "@/lib/db/schema";
import { productInputSchema } from "@/lib/validate";
import { withAuth, withSecurityHeaders, withCORS } from "@/lib/api/middleware";
import { adminUpdateRateLimit } from "@/lib/rateLimit";
import { successResponse, errorResponse } from "@/lib/api/handler";

export const dynamic = "force-dynamic";

// Handle CORS preflight
export async function OPTIONS(_req: NextRequest) {
  const response = new NextResponse(null, { status: 204 });
  return withSecurityHeaders(withCORS(response));
}

// GET /api/admin/products/[id] - Get single product
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    return withAuth(req, async (_req, _userId) => {
      const { id } = await params;
      const productId = parseInt(id);
      if (isNaN(productId)) {
        let response = errorResponse("Invalid product ID", "BAD_REQUEST", 400);
        return withSecurityHeaders(withCORS(response));
      }

      const product = await db
        .select()
        .from(products)
        .where(eq(products.id, productId))
        .limit(1)
        .then((rows) => rows[0]);

      if (!product) {
        let response = errorResponse("Product not found", "NOT_FOUND", 404);
        return withSecurityHeaders(withCORS(response));
      }

      let response = successResponse({ product });
      return withSecurityHeaders(withCORS(response));
    });
  } catch (err) {
    console.error("Failed to get product:", err);
    let response = errorResponse("Failed to get product", "INTERNAL_ERROR", 500);
    return withSecurityHeaders(withCORS(response));
  }
}

// PUT /api/admin/products/[id] - Update product
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    return withAuth(req, async (req, userId) => {
      const { id } = await params;

      // Rate limit: 20 updates per hour per user
      const rateLimit = await adminUpdateRateLimit.limit(userId);
      if (!rateLimit.success) {
        let response = errorResponse(
          "Too many updates. Limit: 20 per hour",
          "RATE_LIMIT",
          429
        );
        return withSecurityHeaders(withCORS(response));
      }

      const productId = parseInt(id);
      if (isNaN(productId)) {
        let response = errorResponse("Invalid product ID", "BAD_REQUEST", 400);
        return withSecurityHeaders(withCORS(response));
      }

      // Get existing product
      const existing = await db
        .select()
        .from(products)
        .where(eq(products.id, productId))
        .limit(1)
        .then((rows) => rows[0]);

      if (!existing) {
        let response = errorResponse("Product not found", "NOT_FOUND", 404);
        return withSecurityHeaders(withCORS(response));
      }

      // Validate input
      const body = await req.json();
      const validated = productInputSchema.parse(body);

      // Update product
      const [updated] = await db
        .update(products)
        .set({
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
          updated_at: new Date(),
        })
        .where(eq(products.id, productId))
        .returning();

      // Log audit trail
      const changes = Object.fromEntries(
        Object.entries({
          name: validated.name !== existing.name ? validated.name : undefined,
          description: validated.description !== existing.description ? validated.description : undefined,
          price_gbp: validated.price_gbp?.toString() !== existing.price_gbp ? validated.price_gbp : undefined,
        }).filter(([, v]) => v !== undefined)
      );

      await db.insert(product_audit_logs).values({
        product_id: productId,
        user_id: userId,
        action: "updated",
        changes,
        reason: "Product updated by admin",
        created_at: new Date(),
      });

      let response = successResponse({ product: updated });
      return withSecurityHeaders(withCORS(response));
    });
  } catch (err) {
    console.error("Failed to update product:", err);
    let response = errorResponse("Failed to update product", "INTERNAL_ERROR", 500);
    return withSecurityHeaders(withCORS(response));
  }
}

// DELETE /api/admin/products/[id] - Delete product
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    return withAuth(req, async (_req, userId) => {
      const { id } = await params;
      const productId = parseInt(id);
      if (isNaN(productId)) {
        let response = errorResponse("Invalid product ID", "BAD_REQUEST", 400);
        return withSecurityHeaders(withCORS(response));
      }

      // Get existing product
      const existing = await db
        .select()
        .from(products)
        .where(eq(products.id, productId))
        .limit(1)
        .then((rows) => rows[0]);

      if (!existing) {
        let response = errorResponse("Product not found", "NOT_FOUND", 404);
        return withSecurityHeaders(withCORS(response));
      }

      // Archive instead of delete
      await db
        .update(products)
        .set({
          status: "archived",
          updated_at: new Date(),
        })
        .where(eq(products.id, productId));

      // Log audit trail
      await db.insert(product_audit_logs).values({
        product_id: productId,
        user_id: userId,
        action: "archived",
        reason: "Product archived by admin",
        created_at: new Date(),
      });

      let response = successResponse({ message: "Product archived" });
      return withSecurityHeaders(withCORS(response));
    });
  } catch (err) {
    console.error("Failed to delete product:", err);
    let response = errorResponse("Failed to delete product", "INTERNAL_ERROR", 500);
    return withSecurityHeaders(withCORS(response));
  }
}
