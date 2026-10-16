CREATE TABLE IF NOT EXISTS sourcing_companies (
  id serial PRIMARY KEY,
  name varchar(255) NOT NULL,
  slug varchar(255) NOT NULL UNIQUE,
  country varchar(2) DEFAULT 'GB',
  website_url text,
  status varchar(20) NOT NULL DEFAULT 'unverified',
  notes text,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS sourcing_company_sectors (
  company_id integer NOT NULL REFERENCES sourcing_companies(id) ON DELETE CASCADE,
  sector varchar(50) NOT NULL,
  PRIMARY KEY (company_id, sector)
);
CREATE TABLE IF NOT EXISTS sourcing_certifications (
  id serial PRIMARY KEY,
  company_id integer NOT NULL REFERENCES sourcing_companies(id) ON DELETE CASCADE,
  certification varchar(50) NOT NULL,
  database_name varchar(100) NOT NULL,
  database_url text,
  certificate_ref varchar(255),
  status varchar(20) NOT NULL DEFAULT 'unknown',
  date_checked timestamp NOT NULL
);
CREATE TABLE IF NOT EXISTS sourcing_products (
  id serial PRIMARY KEY,
  company_id integer NOT NULL REFERENCES sourcing_companies(id) ON DELETE CASCADE,
  name varchar(255) NOT NULL,
  category varchar(50),
  product_url text,
  status varchar(20) NOT NULL DEFAULT 'to_check',
  notes text,
  created_at timestamp NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS sourcing_products_company_idx ON sourcing_products (company_id);
CREATE TABLE IF NOT EXISTS sourcing_listings (
  id serial PRIMARY KEY,
  product_id integer NOT NULL REFERENCES sourcing_products(id) ON DELETE CASCADE,
  channel varchar(20) NOT NULL DEFAULT 'amazon',
  tracked_link text,
  tier varchar(1),
  price_note text,
  date_checked timestamp NOT NULL
);
CREATE INDEX IF NOT EXISTS sourcing_listings_product_idx ON sourcing_listings (product_id);
