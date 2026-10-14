import { pgErrorCode } from '@/lib/users';

/**
 * Loggable summary of an error with no query text or parameters.
 * Drizzle errors embed the full query and its params (emails, hashes, recipient lists).
 */
export function safeError(err: unknown) {
  const e = err as { name?: string; message?: string };
  const firstLine = (e?.message ?? String(err)).split('\n')[0];
  const message = firstLine.startsWith('Failed query') ? 'Failed query' : firstLine.slice(0, 200);
  return { name: e?.name ?? 'Error', code: pgErrorCode(err), message };
}
