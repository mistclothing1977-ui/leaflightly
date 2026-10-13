import crypto from 'crypto';

// Hash password using SHA-256
export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Verify password
export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

// Generate user ID
export function generateUserId(): string {
  return `user_${crypto.randomBytes(12).toString('hex')}`;
}

// Generate order number
export function generateOrderNumber(): string {
  return `LL-${Date.now().toString().slice(-8).toUpperCase()}`;
}

// Create session token
export function createSessionToken(_userId: string): string {
  return crypto.randomBytes(32).toString('hex');
}
