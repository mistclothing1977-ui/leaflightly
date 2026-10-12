import { pgTable, text, timestamp, integer, decimal, jsonb, boolean, index } from 'drizzle-orm/pg-core';

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
