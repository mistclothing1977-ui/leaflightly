-- Catalogue: products loaded from affiliate feeds (Awin for now).
-- Additive only. Safe to run more than once.
--
-- Lifecycle of a row:
--   sync (scripts/intake/feed-sync.mjs)   -> inserted/updated with approved = false
--   approve (scripts/intake/approve-product.mjs) -> approved = true, category and tier set
--   feed no longer lists it               -> removed = true (kept for history, never shown)
-- The site only shows rows where approved = true and removed = false.

CREATE TABLE IF NOT EXISTS catalogue_products (
  id              bigserial PRIMARY KEY,
  network         varchar(20)  NOT NULL DEFAULT 'awin',
  advertiser_id   integer      NOT NULL,
  product_id      text         NOT NULL,          -- the feed's own product ID
  slug            varchar(200) UNIQUE,            -- set on approval; used in /products/[slug]
  brand           varchar(200) NOT NULL,
  name            varchar(300) NOT NULL,
  category        varchar(20),                    -- kitchen | fashion | lifestyle | beauty | wellness (set on approval)
  tier            varchar(1),                     -- A | B | C (set on approval)
  certifications  jsonb        NOT NULL DEFAULT '[]'::jsonb,
  price           numeric(10,2),
  currency        varchar(3),
  product_url     text,                           -- Awin tracked link (aw_deep_link)
  image_url       text,                           -- only if the feed/programme permits it
  in_stock        boolean,
  price_checked_at timestamp   NOT NULL,
  approved        boolean      NOT NULL DEFAULT false,
  removed         boolean      NOT NULL DEFAULT false,
  approved_at     timestamp,
  first_seen_at   timestamp    NOT NULL DEFAULT now(),
  loaded_at       timestamp    NOT NULL DEFAULT now(),
  UNIQUE (network, advertiser_id, product_id)
);

CREATE INDEX IF NOT EXISTS catalogue_products_public_idx ON catalogue_products (approved, removed);
CREATE INDEX IF NOT EXISTS catalogue_products_brand_idx ON catalogue_products (brand);

-- Record of each sync run, so a failed or suspicious feed is visible.
CREATE TABLE IF NOT EXISTS catalogue_sync_runs (
  id              bigserial PRIMARY KEY,
  network         varchar(20) NOT NULL,
  advertiser_id   integer     NOT NULL,
  source          text        NOT NULL,           -- file name or URL host (no keys)
  rows_in_feed    integer     NOT NULL,
  rows_inserted   integer     NOT NULL,
  rows_updated    integer     NOT NULL,
  rows_removed    integer     NOT NULL,
  status          varchar(20) NOT NULL,           -- ok | aborted
  message         text,
  ran_at          timestamp   NOT NULL DEFAULT now()
);

-- Variants: one product with several options (colour, bristle, pack). Only the primary row of a group is listed.
ALTER TABLE catalogue_products ADD COLUMN IF NOT EXISTS group_key text;
ALTER TABLE catalogue_products ADD COLUMN IF NOT EXISTS variant_label text;
ALTER TABLE catalogue_products ADD COLUMN IF NOT EXISTS is_primary boolean NOT NULL DEFAULT true;
CREATE INDEX IF NOT EXISTS catalogue_products_group_idx ON catalogue_products (network, advertiser_id, group_key);

-- Awin application status per brand we have applied to.
CREATE TABLE IF NOT EXISTS awin_programme_status (
  programme_name  varchar(200) PRIMARY KEY,
  advertiser_id   integer,
  status          varchar(20) NOT NULL,   -- applied | pending | joined | rejected
  applied_on      date,
  status_checked  date,
  notes           text
);
