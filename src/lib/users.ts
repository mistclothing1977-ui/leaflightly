import { randomUUID } from 'crypto';
import { eq } from 'drizzle-orm';
import { hash } from 'bcryptjs';
import { db } from '@/lib/db/client';
import { users } from '@/lib/db/schema';

export type AuthProvider = 'credentials' | 'google' | 'github';

export const normalizeEmail = (email: string) => email.trim().toLowerCase();

/** Postgres error code; Drizzle wraps driver errors, so check `cause` too. */
export function pgErrorCode(err: unknown): string | undefined {
  const e = err as { code?: string; cause?: { code?: string } };
  return e?.code ?? e?.cause?.code;
}

export async function findUserByEmail(email: string) {
  const rows = await db.select().from(users).where(eq(users.email, normalizeEmail(email))).limit(1);
  return rows[0] ?? null;
}

export class UserExistsError extends Error {
  constructor() {
    super('An account with this email already exists');
  }
}

export async function createUser(input: {
  email: string;
  name: string;
  password?: string;
  provider: AuthProvider;
}) {
  const id = `user_${randomUUID()}`;
  const passwordHash = input.password ? await hash(input.password, 12) : null;
  try {
    const [row] = await db
      .insert(users)
      .values({
        id,
        email: normalizeEmail(input.email),
        name: input.name.trim().slice(0, 100),
        password_hash: passwordHash,
        auth_provider: input.provider,
      })
      .returning();
    return row;
  } catch (err) {
    // Postgres unique violation (concurrent signup with the same email)
    if (pgErrorCode(err) === '23505') throw new UserExistsError();
    throw err;
  }
}

export async function touchLastLogin(id: string) {
  await db.update(users).set({ last_login_at: new Date() }).where(eq(users.id, id));
}
