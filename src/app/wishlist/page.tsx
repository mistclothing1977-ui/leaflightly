import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { products } from "@/data/products";
import { getWishlist } from "@/lib/wishlist-store";
import BuyNowButton from "@/components/BuyNowButton";
import { buildAmazonLink } from "@/lib/affiliateLinks";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "My Wishlist — Leaf Lightly",
  description: "View your saved favorite sustainable products",
};

export default async function WishlistPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const wishlistIds = await getWishlist(session.user.id);
  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>My Wishlist</h1>

      {wishlistedProducts.length === 0 ? (
        <div className={styles.empty}>
          <p>No saved products yet</p>
          <a href="/products/kitchen" className={styles.browseLink}>
            Browse Products →
          </a>
        </div>
      ) : (
        <>
          <p className={styles.count}>
            {wishlistedProducts.length} item{wishlistedProducts.length !== 1 ? "s" : ""}
          </p>

          <div className={styles.grid}>
            {wishlistedProducts.map((product) => (
              <div key={product.id} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <img src={product.imageUrl} alt={product.name} />
                  <span className={styles.tier}>{product.tier}</span>
                </div>

                <div className={styles.content}>
                  <p className={styles.brand}>{product.brand}</p>
                  <h3 className={styles.name}>{product.name}</h3>

                  <div className={styles.price}>
                    <span className={styles.current}>£{product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className={styles.original}>
                        £{product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className={styles.rating}>
                    <span>★★★★★</span>
                    <span>{product.rating}</span>
                  </div>

                  <BuyNowButton
                    retailers={[
                      {
                        retailer: "Amazon",
                        url: buildAmazonLink(product.name),
                        icon: "🛒",
                      },
                    ]}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
