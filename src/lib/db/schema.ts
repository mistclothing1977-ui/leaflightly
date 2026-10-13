import {
  pgTable,
  serial,
  integer,
  text,
  varchar,
  numeric,
  boolean,
  timestamp,
  jsonb,
  index,
  foreignKey,
  primaryKey,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

// ============================================
// BRANDS
// ============================================
export const brands = pgTable(
  "brands",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 100 }).unique().notNull(),
    name: varchar("name", { length: 200 }).notNull(),
    description: text("description"),
    website: varchar("website", { length: 500 }),
    logo_url: varchar("logo_url", { length: 500 }),
    verified: boolean("verified").default(false),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    slugIdx: index("brands_slug_idx").on(table.slug),
  })
);

// ============================================
// CATEGORIES
// ============================================
export const categories = pgTable(
  "categories",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 100 }).unique().notNull(),
    name: varchar("name", { length: 100 }).notNull(),
    description: text("description"),
    icon: varchar("icon", { length: 50 }),
    parent_id: serial("parent_id"),
    seo_title: varchar("seo_title", { length: 60 }),
    seo_description: varchar("seo_description", { length: 160 }),
    created_at: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    slugIdx: index("categories_slug_idx").on(table.slug),
    parentIdx: index("categories_parent_idx").on(table.parent_id),
  })
);

// ============================================
// PRODUCTS (Core table with approval workflow)
// ============================================
export const products = pgTable(
  "products",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 150 }).unique().notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    brand_id: serial("brand_id"),
    category_id: serial("category_id").notNull(),

    // Content
    description: text("description").notNull(),
    long_description: text("long_description"),
    materials: varchar("materials", { length: 500 }),
    sustainability_notes: text("sustainability_notes"),
    durability: varchar("durability", { length: 50 }),
    care_instructions: text("care_instructions"),
    tags: jsonb("tags").default(sql`'[]'::jsonb`),

    // Pricing
    price_gbp: numeric("price_gbp", { precision: 10, scale: 2 }),
    price_usd: numeric("price_usd", { precision: 10, scale: 2 }),
    price_eur: numeric("price_eur", { precision: 10, scale: 2 }),
    tier: varchar("tier", { length: 1 }),

    // Images (storage paths)
    image_storage_path: varchar("image_storage_path", { length: 500 }),
    images_storage_paths: jsonb("images_storage_paths").default(sql`'[]'::jsonb`),

    // Affiliate (merchant IDs only, no hardcoded URLs)
    affiliate_amazon_enabled: boolean("affiliate_amazon_enabled").default(false),
    affiliate_awin_merchant_id: varchar("affiliate_awin_merchant_id", { length: 100 }),
    affiliate_awin_enabled: boolean("affiliate_awin_enabled").default(false),

    // Status & workflow
    status: varchar("status", { length: 20 }).default("draft"),
    published_at: timestamp("published_at"),
    scheduled_at: timestamp("scheduled_at"),
    featured: boolean("featured").default(false),

    // Review workflow
    created_by: varchar("created_by", { length: 255 }).notNull(),
    submitted_for_review_at: timestamp("submitted_for_review_at"),
    reviewed_by: varchar("reviewed_by", { length: 255 }),
    review_notes: text("review_notes"),
    reviewed_at: timestamp("reviewed_at"),

    // Versioning
    version: integer("version").default(1),
    draft_content: jsonb("draft_content"),

    // SEO
    seo_title: varchar("seo_title", { length: 60 }),
    seo_description: varchar("seo_description", { length: 160 }),

    // Timestamps
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    slugIdx: index("products_slug_idx").on(table.slug),
    categoryIdx: index("products_category_idx").on(table.category_id),
    statusIdx: index("products_status_idx").on(table.status),
    featuredIdx: index("products_featured_idx").on(table.featured),
    brandFk: foreignKey({ columns: [table.brand_id], foreignColumns: [brands.id], name: "products_brand_id_fk" }),
    categoryFk: foreignKey({ columns: [table.category_id], foreignColumns: [categories.id], name: "products_category_id_fk" }),
  })
);

// ============================================
// COLLECTIONS
// ============================================
export const collections = pgTable(
  "collections",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 100 }).unique().notNull(),
    name: varchar("name", { length: 200 }).notNull(),
    description: text("description"),
    image_storage_path: varchar("image_storage_path", { length: 500 }),
    featured: boolean("featured").default(false),
    product_ids: jsonb("product_ids").default(sql`'[]'::jsonb`),
    status: varchar("status", { length: 20 }).default("draft"),
    seo_title: varchar("seo_title", { length: 60 }),
    seo_description: varchar("seo_description", { length: 160 }),
    created_at: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    slugIdx: index("collections_slug_idx").on(table.slug),
  })
);

// ============================================
// BLOG POSTS
// ============================================
export const blog_posts = pgTable(
  "blog_posts",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 150 }).unique().notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    author: varchar("author", { length: 100 }).notNull(),
    excerpt: text("excerpt"),
    body: text("body").notNull(),
    category_id: serial("category_id"),
    featured_image_storage_path: varchar("featured_image_storage_path", { length: 500 }),
    tags: jsonb("tags").default(sql`'[]'::jsonb`),
    status: varchar("status", { length: 20 }).default("draft"),
    published_at: timestamp("published_at"),
    seo_title: varchar("seo_title", { length: 60 }),
    seo_description: varchar("seo_description", { length: 160 }),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    slugIdx: index("blog_slug_idx").on(table.slug),
    statusIdx: index("blog_status_idx").on(table.status),
  })
);

// ============================================
// NEWSLETTER SIGNUPS
// ============================================
export const newsletter_signups = pgTable(
  "newsletter_signups",
  {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    source: varchar("source", { length: 50 }),
    status: varchar("status", { length: 20 }).default("active"),
    subscribed_at: timestamp("subscribed_at").defaultNow(),
    confirmed_at: timestamp("confirmed_at"),
    unsubscribed_at: timestamp("unsubscribed_at"),
    bounce_type: varchar("bounce_type", { length: 50 }),
    last_email_sent: timestamp("last_email_sent"),
  },
  (table) => ({
    emailIdx: index("newsletter_email_idx").on(table.email),
    statusIdx: index("newsletter_status_idx").on(table.status),
  })
);

// ============================================
// SITE USERS (customer accounts — separate from admin_users)
// ============================================
export const users = pgTable(
  "users",
  {
    id: varchar("id", { length: 64 }).primaryKey(),
    email: varchar("email", { length: 255 }).unique().notNull(), // stored lower-case
    name: varchar("name", { length: 100 }).notNull(),
    password_hash: text("password_hash"), // null for OAuth-only accounts
    auth_provider: varchar("auth_provider", { length: 20 }).default("credentials").notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    last_login_at: timestamp("last_login_at"),
  },
  (table) => ({
    emailIdx: index("users_email_idx").on(table.email),
  })
);

// ============================================
// WISHLIST
// ============================================
export const wishlist_items = pgTable(
  "wishlist_items",
  {
    user_id: varchar("user_id", { length: 64 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    product_id: varchar("product_id", { length: 100 }).notNull(),
    added_at: timestamp("added_at").defaultNow().notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.user_id, table.product_id] }),
    userIdx: index("wishlist_items_user_idx").on(table.user_id),
  })
);

// ============================================
// NEWSLETTER BATCHES
// One row per day's send. Recipients are snapshotted at schedule time so each
// subscriber is emailed exactly once per week, regardless of later list changes.
// ============================================
export const newsletter_batches = pgTable(
  "newsletter_batches",
  {
    id: serial("id").primaryKey(),
    week_start: timestamp("week_start").notNull(),
    day_of_week: integer("day_of_week").notNull(),
    scheduled_for: timestamp("scheduled_for").notNull(),
    status: varchar("status", { length: 20 }).default("scheduled").notNull(),
    recipients: jsonb("recipients").$type<string[]>().notNull(),
    content: jsonb("content"),
    sent_count: integer("sent_count").default(0),
    failed_count: integer("failed_count").default(0),
    sent_at: timestamp("sent_at"),
    created_at: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    statusScheduledIdx: index("newsletter_batches_status_sched_idx").on(table.status, table.scheduled_for),
    weekIdx: index("newsletter_batches_week_idx").on(table.week_start),
  })
);

// ============================================
// ADMIN USERS
// ============================================
export const admin_users = pgTable(
  "admin_users",
  {
    id: serial("id").primaryKey(),
    user_id: varchar("user_id", { length: 255 }).unique().notNull(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    role: varchar("role", { length: 50 }).default("editor"),
    permissions: jsonb("permissions").default(sql`'[]'::jsonb`),
    active: boolean("active").default(true),
    last_login: timestamp("last_login"),
    created_at: timestamp("created_at").defaultNow(),
  }
);

// ============================================
// PRODUCT AUDIT LOG
// ============================================
export const product_audit_logs = pgTable(
  "product_audit_logs",
  {
    id: serial("id").primaryKey(),
    product_id: serial("product_id"),
    user_id: varchar("user_id", { length: 255 }).notNull(),
    action: varchar("action", { length: 50 }).notNull(),
    changes: jsonb("changes"),
    reason: text("reason"),
    created_at: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    productIdx: index("audit_product_idx").on(table.product_id),
    userIdx: index("audit_user_idx").on(table.user_id),
    productFk: foreignKey({ columns: [table.product_id], foreignColumns: [products.id], name: "audit_logs_product_id_fk" }),
  })
);

// ============================================
// EMAIL QUEUE
// ============================================
export const email_queue = pgTable(
  "email_queue",
  {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 255 }).notNull(),
    subject: varchar("subject", { length: 255 }).notNull(),
    html: text("html").notNull(),
    type: varchar("type", { length: 50 }),
    status: varchar("status", { length: 20 }).default("pending"),
    attempts: integer("attempts").default(0),
    max_attempts: integer("max_attempts").default(5),
    next_retry_at: timestamp("next_retry_at"),
    error_message: text("error_message"),
    sent_at: timestamp("sent_at"),
    created_at: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    emailIdx: index("email_queue_email_idx").on(table.email),
    statusIdx: index("email_queue_status_idx").on(table.status),
  })
);

// ============================================
// WEBHOOK EVENTS LOG
// ============================================
export const webhook_events = pgTable(
  "webhook_events",
  {
    id: serial("id").primaryKey(),
    event_type: varchar("event_type", { length: 50 }).notNull(),
    payload: jsonb("payload").notNull(),
    status: varchar("status", { length: 20 }).default("pending"),
    processed_at: timestamp("processed_at"),
    error_message: text("error_message"),
    retry_count: integer("retry_count").default(0),
    received_at: timestamp("received_at").defaultNow(),
  },
  (table) => ({
    eventTypeIdx: index("webhook_event_type_idx").on(table.event_type),
    statusIdx: index("webhook_status_idx").on(table.status),
  })
);

// ============================================
// RELATIONS
// ============================================
export const brandsRelations = relations(brands, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  brand: one(brands, {
    fields: [products.brand_id],
    references: [brands.id],
  }),
  category: one(categories, {
    fields: [products.category_id],
    references: [categories.id],
  }),
  auditLogs: many(product_audit_logs),
}));
