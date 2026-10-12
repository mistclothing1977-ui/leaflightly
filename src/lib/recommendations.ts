import { products, Product } from '@/data/products';

interface UserBehavior {
  userId: string;
  viewedProducts: string[];
  cartProducts: string[];
  purchasedProducts: string[];
  ratings: Map<string, number>;
}

interface RecommendationResult {
  productId: string;
  score: number;
  reason: string;
}

/**
 * Content-based recommendation algorithm
 * Recommends products similar to those the user has interacted with
 */
export function getContentBasedRecommendations(
  userBehavior: UserBehavior,
  limit: number = 6
): Product[] {
  const interactedProducts = [
    ...userBehavior.viewedProducts,
    ...userBehavior.cartProducts,
    ...userBehavior.purchasedProducts,
  ];

  if (interactedProducts.length === 0) {
    // Return top-rated products if no history
    return products
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }

  const scores = new Map<string, RecommendationResult>();

  // Get all products the user hasn't interacted with
  products.forEach((product) => {
    if (interactedProducts.includes(product.id)) {
      return;
    }

    let score = 0;
    let reason = '';

    // Find similar products based on category
    const interactedInCategory = products.filter(
      (p) =>
        p.category === product.category &&
        interactedProducts.includes(p.id)
    );

    if (interactedInCategory.length > 0) {
      score += 50;
      reason = `Similar to products you viewed in ${product.category}`;
    }

    // Find similar products by brand
    const interactedByBrand = products.filter(
      (p) =>
        p.brand === product.brand &&
        interactedProducts.includes(p.id)
    );

    if (interactedByBrand.length > 0) {
      score += 30;
      reason = `From a brand you liked`;
    }

    // Boost by rating
    score += product.rating * 5;

    // Boost by tier match
    const userTiers = [
      ...new Set(
        products
          .filter((p) => interactedProducts.includes(p.id))
          .map((p) => p.tier)
      ),
    ];

    if (userTiers.includes(product.tier)) {
      score += 20;
    }

    if (score > 0) {
      scores.set(product.id, {
        productId: product.id,
        score,
        reason,
      });
    }
  });

  // Sort by score and return top products
  const recommendations = Array.from(scores.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((rec) => products.find((p) => p.id === rec.productId)!)
    .filter(Boolean);

  return recommendations;
}

/**
 * Collaborative filtering recommendation
 * Recommends products based on similar users' preferences
 */
export function getCollaborativeRecommendations(
  userBehavior: UserBehavior,
  allUserBehaviors: UserBehavior[],
  limit: number = 6
): Product[] {
  // Find similar users
  const similarUsers = allUserBehaviors
    .filter((u) => u.userId !== userBehavior.userId)
    .map((u) => {
      // Calculate similarity score based on shared interactions
      const sharedViews = userBehavior.viewedProducts.filter((p) =>
        u.viewedProducts.includes(p)
      ).length;
      const sharedPurchases = userBehavior.purchasedProducts.filter((p) =>
        u.purchasedProducts.includes(p)
      ).length;

      const similarityScore = sharedViews + sharedPurchases * 3;
      return { user: u, score: similarityScore };
    })
    .filter((u) => u.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  // Get products from similar users that current user hasn't seen
  const userInteracted = new Set([
    ...userBehavior.viewedProducts,
    ...userBehavior.cartProducts,
    ...userBehavior.purchasedProducts,
  ]);

  const recommendations = new Map<string, number>();

  similarUsers.forEach((similarUser) => {
    similarUser.user.purchasedProducts.forEach((productId) => {
      if (!userInteracted.has(productId)) {
        recommendations.set(
          productId,
          (recommendations.get(productId) || 0) + similarUser.score
        );
      }
    });
  });

  return Array.from(recommendations.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([productId]) => products.find((p) => p.id === productId)!)
    .filter(Boolean);
}

/**
 * Get trending products (high engagement)
 */
export function getTrendingProducts(limit: number = 6): Product[] {
  return products
    .sort((a, b) => {
      // Sort by rating * review count for popularity
      const aScore = a.rating * a.reviewCount;
      const bScore = b.rating * b.reviewCount;
      return bScore - aScore;
    })
    .slice(0, limit);
}

/**
 * Get personalized feed for user
 */
export function getPersonalizedFeed(
  userBehavior: UserBehavior,
  allUserBehaviors: UserBehavior[],
  limit: number = 12
): Product[] {
  const contentBased = getContentBasedRecommendations(userBehavior, limit / 2);
  const collaborative = getCollaborativeRecommendations(
    userBehavior,
    allUserBehaviors,
    limit / 4
  );
  const trending = getTrendingProducts(limit / 4);

  // Combine and deduplicate
  const combined = [...contentBased, ...collaborative, ...trending];
  const seen = new Set<string>();
  const result: Product[] = [];

  for (const product of combined) {
    if (!seen.has(product.id)) {
      seen.add(product.id);
      result.push(product);
    }
  }

  return result.slice(0, limit);
}

/**
 * Get products user might like based on search query
 */
export function getSmartSearchResults(query: string): Product[] {
  const lowerQuery = query.toLowerCase();

  return products
    .filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.brand.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery)
    )
    .sort((a, b) => {
      // Prioritize exact matches
      const aExactName = a.name.toLowerCase() === lowerQuery ? 1 : 0;
      const bExactName = b.name.toLowerCase() === lowerQuery ? 1 : 0;

      if (aExactName !== bExactName) return bExactName - aExactName;

      // Then by rating
      return b.rating - a.rating;
    });
}
