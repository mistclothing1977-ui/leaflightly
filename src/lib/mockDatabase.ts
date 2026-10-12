import { hashPassword, generateUserId } from '@/db/auth';

// Mock in-memory database (in production, use Neon + Drizzle)
interface MockUser {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
}

interface MockOrder {
  id: string;
  orderNumber: string;
  userId: string;
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
  status: string;
  createdAt: Date;
}

interface MockReview {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  text: string;
  helpful: number;
  createdAt: Date;
}

// Global in-memory storage
let users: Map<string, MockUser> = new Map();
let orders: Map<string, MockOrder> = new Map();
let reviews: Map<string, MockReview> = new Map();

export const mockDatabase = {
  // User operations
  getUserByEmail(email: string): MockUser | undefined {
    return users.get(email);
  },

  getUserById(id: string): MockUser | undefined {
    for (const user of users.values()) {
      if (user.id === id) return user;
    }
    return undefined;
  },

  createUser(email: string, password: string, firstName: string, lastName: string): MockUser {
    if (users.has(email)) {
      throw new Error('Email already exists');
    }

    const user: MockUser = {
      id: generateUserId(),
      email,
      password: hashPassword(password),
      firstName,
      lastName,
      createdAt: new Date(),
    };

    users.set(email, user);
    return user;
  },

  // Order operations
  getOrdersByUserId(userId: string): MockOrder[] {
    const userOrders: MockOrder[] = [];
    for (const order of orders.values()) {
      if (order.userId === userId) {
        userOrders.push(order);
      }
    }
    return userOrders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  },

  createOrder(orderData: Omit<MockOrder, 'id' | 'createdAt'>): MockOrder {
    const order: MockOrder = {
      ...orderData,
      id: `order_${Date.now()}`,
      createdAt: new Date(),
    };
    orders.set(order.id, order);
    return order;
  },

  getOrderByNumber(orderNumber: string): MockOrder | undefined {
    for (const order of orders.values()) {
      if (order.orderNumber === orderNumber) return order;
    }
    return undefined;
  },

  // Review operations
  getReviewsForProduct(productId: string): MockReview[] {
    const productReviews: MockReview[] = [];
    for (const review of reviews.values()) {
      if (review.productId === productId) {
        productReviews.push(review);
      }
    }
    return productReviews.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  },

  createReview(
    productId: string,
    userId: string,
    userName: string,
    rating: number,
    title: string,
    text: string
  ): MockReview {
    const review: MockReview = {
      id: `review_${Date.now()}`,
      productId,
      userId,
      userName,
      rating,
      title,
      text,
      helpful: 0,
      createdAt: new Date(),
    };
    reviews.set(review.id, review);
    return review;
  },

  hasUserReviewedProduct(productId: string, userId: string): boolean {
    for (const review of reviews.values()) {
      if (review.productId === productId && review.userId === userId) {
        return true;
      }
    }
    return false;
  },

  getAverageRating(productId: string): number {
    const productReviews = this.getReviewsForProduct(productId);
    if (productReviews.length === 0) return 0;
    const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
    return Math.round((sum / productReviews.length) * 10) / 10;
  },

  // Reset for testing
  reset() {
    users.clear();
    orders.clear();
    reviews.clear();
  },
};
