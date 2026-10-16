# Linking the Leaf Lightly site to a Shopify store (research, 16 Oct 2026)

Status: research only. Nothing is built. Confirm the Shopify plan and store details before any build.

## Options

| Option | How it works | Effort | Control | Fit for us |
|---|---|---|---|---|
| A. Plain links | Product and "Buy" buttons link to the Shopify product page on the store's own domain. Checkout and cart happen on Shopify. | Very low | Low | Good first step while the store is new |
| B. Storefront API (headless) | Our Next.js site reads Shopify products through the Storefront API using a public access token. A cart is created, and buyers are sent to the cart's `checkoutUrl` to pay on Shopify. | Medium | High | Best long-term fit. Products show on our pages with our layout |
| C. Buy Button / embed | Shopify-provided widget embedded in our pages | Low to medium | Low | Quick, but looks less like our site |

## Recommendation

1. **Now:** option A. Link each owned product to its Shopify page, with a clear "Buy on [store]" label, consistent with the buy-button rule.
2. **When the catalogue grows:** option B. Products come from Shopify through the Storefront API, and the cart hands off to Shopify's checkout.
3. **Avoid** option C unless we need a quick embed for a specific page.

## Technical notes for option B (from Shopify developer docs)

- A public Storefront access token is created with the `storefrontAccessTokenCreate` mutation on the Admin GraphQL API. Requests send it in the `X-Shopify-Storefront-Access-Token` header.
- The public token is visible to browsers, so it is safe to use client-side, but it should only be used for reading products and managing carts.
- Checkout: read the cart's `checkoutUrl` and redirect the buyer there when they are ready. Re-request the URL if it has gone stale.
- Logged-in buyers: set a `customerAccessToken` on the cart before redirecting. Server-side calls need the `Shopify-Storefront-Buyer-IP` header.
- Caching: the third-party guide suggests briefly caching product queries and never caching cart or customer queries. Not confirmed against Shopify's own docs.

## Things to decide before building

1. **Commission rules.** Products from our own store earn no Awin or Amazon commission. Our disclosure and any "earn commission" wording must only apply to partner links. Mark owned products clearly, e.g. "Sold by Leaf Lightly".
2. **Product source of truth.** Should Shopify be the master for owned products (recommended), with the database only holding partner products?
3. **Cart.** Do we keep one cart for owned products only, or let buyers add partner products too? Partner products must keep their tracked links and leave the site, so they can't share the Shopify cart.
4. **Account.** Does a Leaf Lightly login need to map to a Shopify customer account?
5. **Plan.** Confirm the store's Shopify plan includes Storefront API access.

## Sources

- Storefront API reference: https://shopify.dev/docs/api/storefront/latest
- Create and update a cart with the Storefront API: https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/cart/manage
- StorefrontAccessToken (Admin): https://shopify.dev/docs/api/admin-graphql/latest/objects/storefrontaccesstoken
- Authenticate checkouts: https://shopify.dev/docs/storefronts/headless/mobile-apps/checkout-sheet-kit/authenticate-checkouts
- Third-party overview (unverified specifics): https://ecosire.com/blog/shopify-storefront-api-headless-checkout
