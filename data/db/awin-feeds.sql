CREATE SCHEMA IF NOT EXISTS awin;
CREATE TABLE IF NOT EXISTS awin.feed_products (
  advertiser_id integer NOT NULL,
  product_id text NOT NULL,
  name text,
  brand text,
  category text,
  price numeric,
  currency varchar(3),
  product_url text,
  image_url text,
  price_checked_at timestamp NOT NULL,
  removed boolean NOT NULL DEFAULT false,
  removed_reason text,
  loaded_at timestamp NOT NULL DEFAULT now(),
  PRIMARY KEY (advertiser_id, product_id)
);
CREATE INDEX IF NOT EXISTS awin_feed_products_removed_idx ON awin.feed_products (removed);
