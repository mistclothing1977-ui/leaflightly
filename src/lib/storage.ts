import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Supabase credentials not configured");
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function uploadProductImage(
  file: File,
  productId: number
): Promise<string | null> {
  try {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      throw new Error("Invalid file type");
    }

    // Limit file size to 5MB
    if (file.size > 5 * 1024 * 1024) {
      throw new Error("File size exceeds 5MB limit");
    }

    // Convert to WebP using Sharp
    const buffer = await file.arrayBuffer();
    const webpBuffer = await sharp(buffer)
      .resize(1200, 1200, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();

    // Upload to Supabase Storage
    const filename = `${productId}-${Date.now()}.webp`;
    const { error } = await supabase.storage
      .from("product-images")
      .upload(filename, webpBuffer, {
        contentType: "image/webp",
      });

    if (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }

    return `product-images/${filename}`;
  } catch (err) {
    console.error("Image upload error:", err);
    return null;
  }
}

export async function deleteProductImage(path: string): Promise<boolean> {
  try {
    const filename = path.replace("product-images/", "");
    const { error } = await supabase.storage.from("product-images").remove([filename]);

    if (error) {
      throw new Error(`Delete failed: ${error.message}`);
    }

    return true;
  } catch (err) {
    console.error("Image delete error:", err);
    return false;
  }
}

export function getPublicImageUrl(path: string): string {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${path}`;
}

export async function validateImagePath(path: string): Promise<boolean> {
  try {
    const filename = path.replace("product-images/", "");
    const { data } = await supabase.storage.from("product-images").list("", {
      search: filename,
    });

    return data ? data.some((file) => file.name === filename) : false;
  } catch (err) {
    console.error("Image validation error:", err);
    return false;
  }
}
