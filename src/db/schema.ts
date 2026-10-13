import { pgTable, text, timestamp, decimal, jsonb, index, boolean, integer } from 'drizzle-orm/pg-core';

export const users = pgTable(
  'users',
  {
    id: text('id').primaryKey(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => ({
    emailIdx: index('email_idx').on(table.email),
  })
);

export interface Order {
  id: string;
  items: Array<{
    productId: string;
    productName: string;
    brand: string;
    price: number;
    quantity: number;
  }>;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postcode: string;
  };
}

export const orders = pgTable(
  'orders',
  {
    id: text('id').primaryKey(),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    orderNumber: text('order_number').notNull().unique(),
    items: jsonb('items').notNull(),
    subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull(),
    tax: decimal('tax', { precision: 10, scale: 2 }).notNull(),
    shipping: decimal('shipping', { precision: 10, scale: 2 }).notNull(),
    total: decimal('total', { precision: 10, scale: 2 }).notNull(),
    shippingAddress: jsonb('shipping_address').notNull(),
    status: text('status').notNull().default('confirmed'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index('user_id_idx').on(table.userId),
    orderNumberIdx: index('order_number_idx').on(table.orderNumber),
  })
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type OrderRecord = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;

/* Newsletter Tables */

export const newsletterSubscribers = pgTable(
  'newsletter_subscribers',
  {
    id: text('id').primaryKey(),
    email: text('email').notNull().unique(),
    status: text('status').notNull().default('active'), // active, unsubscribed
    subscribedAt: timestamp('subscribed_at').notNull().defaultNow(),
    unsubscribedAt: timestamp('unsubscribed_at'),
    lastEmailAt: timestamp('last_email_at'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => ({
    emailIdx: index('newsletter_email_idx').on(table.email),
    statusIdx: index('newsletter_status_idx').on(table.status),
  })
);

export const newsletterBatches = pgTable(
  'newsletter_batches',
  {
    id: text('id').primaryKey(),
    weekStart: timestamp('week_start').notNull(), // Monday of the week
    dayOfWeek: integer('day_of_week').notNull(), // 0-6 (Mon-Sun)
    scheduledFor: timestamp('scheduled_for').notNull(), // When to send this batch
    status: text('status').notNull().default('pending'), // pending, scheduled, sent, failed
    emailCount: integer('email_count').notNull().default(0), // How many emails in this batch
    contentSnapshot: jsonb('content_snapshot'), // Store curated products for this batch
    createdAt: timestamp('created_at').notNull().defaultNow(),
    sentAt: timestamp('sent_at'),
  },
  (table) => ({
    weekStartIdx: index('batch_week_start_idx').on(table.weekStart),
    statusIdx: index('batch_status_idx').on(table.status),
    scheduledForIdx: index('batch_scheduled_for_idx').on(table.scheduledFor),
  })
);

export const emailLogs = pgTable(
  'email_logs',
  {
    id: text('id').primaryKey(),
    batchId: text('batch_id').notNull().references(() => newsletterBatches.id),
    subscriberId: text('subscriber_id').notNull().references(() => newsletterSubscribers.id),
    email: text('email').notNull(),
    status: text('status').notNull().default('sent'), // sent, bounced, failed
    resendMessageId: text('resend_message_id'), // Resend's message ID for tracking
    sentAt: timestamp('sent_at').notNull().defaultNow(),
    openedAt: timestamp('opened_at'),
    clickedAt: timestamp('clicked_at'),
    bounceReason: text('bounce_reason'),
  },
  (table) => ({
    batchIdIdx: index('email_log_batch_idx').on(table.batchId),
    subscriberIdIdx: index('email_log_subscriber_idx').on(table.subscriberId),
    statusIdx: index('email_log_status_idx').on(table.status),
  })
);

export const newsletterSettings = pgTable(
  'newsletter_settings',
  {
    id: text('id').primaryKey(),
    subscriptionThreshold: integer('subscription_threshold').notNull().default(3500), // When to upgrade (7 days * 100 + buffer)
    paidPlanActive: boolean('paid_plan_active').notNull().default(false),
    resendApiKey: text('resend_api_key'), // Store encrypted API key
    lastThresholdAlertAt: timestamp('last_threshold_alert_at'),
    weeklyScheduleDay: integer('weekly_schedule_day').notNull().default(1), // 0=Mon, 1=Tue, etc. (for cycle start)
    weeklyScheduleTime: text('weekly_schedule_time').notNull().default('09:00'), // UTC time HH:mm
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  }
);

export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type NewNewsletterSubscriber = typeof newsletterSubscribers.$inferInsert;
export type NewsletterBatch = typeof newsletterBatches.$inferSelect;
export type NewNewsletterBatch = typeof newsletterBatches.$inferInsert;
export type EmailLog = typeof emailLogs.$inferSelect;
export type NewEmailLog = typeof emailLogs.$inferInsert;
export type NewsletterSettings = typeof newsletterSettings.$inferSelect;
export type NewNewsletterSettings = typeof newsletterSettings.$inferInsert;
