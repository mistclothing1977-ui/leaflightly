# Linking the Leaf Lightly site to an Etsy shop (research, 16 Oct 2026)

Status: research only. Nothing is built.

## Options

| Option | How it works | Effort | Control | Fit |
|---|---|---|---|---|
| A. Plain links | Product and "Buy" buttons link to the Etsy listing URL. Checkout and payment happen on Etsy. | Very low | Low | Good first step |
| B. Etsy Open API v3 | Our site reads listings and shop data with an API key (keystring and shared secret). Write access (creating or editing listings) also needs OAuth. | Medium to high | High | Possible, with rules to follow |
| C. Etsy Affiliate Program | We link to Etsy listings and earn commission on qualifying sales. Separate from owning a shop. | Low | Low | Relevant if we sell other sellers' items, not our own |

## Recommendation

1. **Now:** option A for the owned shop. Each product links to its Etsy listing, labelled "Buy on Etsy (leaves Leaf Lightly)". Note that the buy-button label rule was removed earlier; we'd want the label only where the destination is a different site and the buyer might not expect it. Decide this with the owner.
2. **Only if we need live data** (stock, price, listing photos): option B. Read-only use needs the public API key and must follow Etsy's API Terms of Use, including caching limits and attribution.
3. **Affiliate programme (option C)** only makes sense for other sellers' items, and only once we have applied and been accepted. Owned shop sales earn no affiliate commission.

## Things to check before building

1. **API Terms of Use.** The full text wasn't retrieved. Check caching periods, display and attribution rules before any build that reads listings.
2. **Attribution.** Etsy's developer documentation says apps must clearly distinguish themselves from Etsy and show a specific disclaimer. The exact wording is in the developer docs.
3. **Affiliate rates and cookies.** Rates aren't published as a fixed number; they are set case by case. The cookie window is described as 30 days on the website and 7 days in the app. Third-party listings quoting a 4% commission are not verified.
4. **Creator Collective.** A separate programme for creators (10% per the August 2026 handbook). Probably not relevant unless we promote creator shops.
5. **Commission vs own sales.** Our own Etsy sales earn no affiliate commission, so disclosure wording must match whether the product is owned or partner.

## Sources

- Etsy Open API v3 documentation: https://developers.etsy.com/documentation/
- Listings tutorial: https://developers.etsy.com/documentation/tutorials/listings/
- Authentication: https://developers.etsy.com/documentation/essentials/authentication/
- Etsy Affiliates: https://www.etsy.com/affiliates
- Affiliates policy: https://www.etsy.com/in-en/legal/affiliates/
- Affiliate Programme help: https://help.etsy.com/hc/en-gb/articles/360000335987-The-Affiliate-Programme?segment=selling
