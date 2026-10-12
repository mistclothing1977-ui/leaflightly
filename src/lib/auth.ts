import { jwtVerify } from "jose";

export async function verifySupabaseToken(token: string) {
  if (!process.env.SUPABASE_JWT_SECRET) {
    throw new Error("SUPABASE_JWT_SECRET not configured");
  }

  try {
    const secret = new TextEncoder().encode(process.env.SUPABASE_JWT_SECRET);
    const verified = await jwtVerify(token, secret);
    return verified.payload;
  } catch (err) {
    return null;
  }
}

export async function getUserIdFromToken(token: string) {
  const payload = await verifySupabaseToken(token);
  return payload?.sub as string | null;
}

export function checkAdminPermission(
  permissions: string[],
  requiredPermission: string
): boolean {
  return permissions.includes(requiredPermission) || permissions.includes("*");
}

export const adminPermissions = {
  CREATE_PRODUCT: "product:create",
  EDIT_PRODUCT: "product:edit",
  DELETE_PRODUCT: "product:delete",
  REVIEW_PRODUCT: "product:review",
  PUBLISH_PRODUCT: "product:publish",
  CREATE_COLLECTION: "collection:create",
  EDIT_COLLECTION: "collection:edit",
  CREATE_BLOG: "blog:create",
  EDIT_BLOG: "blog:edit",
  VIEW_ANALYTICS: "analytics:view",
  MANAGE_USERS: "users:manage",
  MANAGE_SETTINGS: "settings:manage",
};
