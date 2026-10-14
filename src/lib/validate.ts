import { z } from "zod";
import DOMPurify from "isomorphic-dompurify";

// ============================================
// PRODUCT INPUT SCHEMA
// ============================================
export const productInputSchema = z.object({
  name: z
    .string()
    .min(3, "Product name must be at least 3 characters")
    .max(255, "Product name must not exceed 255 characters")
    .transform((v) => v.trim()),

  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format")
    .optional(),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must not exceed 500 characters")
    .transform((v) => sanitizeHtml(v)),

  long_description: z
    .string()
    .max(5000, "Long description must not exceed 5000 characters")
    .transform((v) => sanitizeHtml(v))
    .optional(),

  brand_id: z.number().int().positive().optional(),

  category_id: z.number().int().positive("Category is required"),

  price_gbp: z.number().positive("Price must be greater than 0").optional(),
  price_usd: z.number().positive().optional(),
  price_eur: z.number().positive().optional(),

  tier: z.enum(["A", "B", "C"]),

  image_storage_path: z
    .string()
    .regex(/^product-images\//, "Invalid image path")
    .optional(),

  materials: z.string().max(500).optional(),
  sustainability_notes: z.string().max(5000).optional(),
  durability: z.enum(["Years", "Decades", "Lifetime"]).optional(),
  care_instructions: z.string().max(2000).optional(),

  tags: z.array(z.string().max(50)).max(10).optional(),

  affiliate_amazon_enabled: z.boolean().default(false),
  affiliate_awin_enabled: z.boolean().default(false),
  affiliate_awin_merchant_id: z.string().regex(/^\d+$/).optional(),

  seo_title: z.string().max(60).optional(),
  seo_description: z.string().max(160).optional(),
});

export type ProductInput = z.infer<typeof productInputSchema>;

// Email schema lives in validate-email.ts (no DOMPurify/jsdom dependency).
export { emailSchema, type EmailInput } from "./validate-email";

// ============================================
// BLOG POST SCHEMA
// ============================================
export const blogPostInputSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(255)
    .transform((v) => v.trim()),

  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .optional(),

  excerpt: z
    .string()
    .min(10)
    .max(300)
    .transform((v) => sanitizeHtml(v)),

  body: z
    .string()
    .min(100, "Blog post must be at least 100 characters")
    .max(50000, "Blog post must not exceed 50,000 characters"),

  category_id: z.number().int().positive().optional(),

  featured_image_storage_path: z
    .string()
    .regex(/^product-images\//)
    .optional(),

  tags: z.array(z.string().max(50)).max(10).optional(),

  seo_title: z.string().max(60).optional(),
  seo_description: z.string().max(160).optional(),
});

export type BlogPostInput = z.infer<typeof blogPostInputSchema>;

// ============================================
// SANITIZATION
// ============================================
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ["p", "br", "strong", "em", "u", "a", "ul", "ol", "li", "blockquote", "code", "pre"],
    ALLOWED_ATTR: ["href", "target", "rel"],
    KEEP_CONTENT: true,
  });
}

// ============================================
// VALIDATION ERROR HANDLER
// ============================================
export function handleValidationError(error: z.ZodError) {
  return error.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
    code: issue.code,
  }));
}
