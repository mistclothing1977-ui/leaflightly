import { z } from "zod";

// Kept separate from validate.ts: that file imports isomorphic-dompurify (→ jsdom),
// which crashes on Vercel at module load and took the newsletter route down with it.

const DISPOSABLE_DOMAINS = [
  "tempmail.com",
  "10minutemail.com",
  "guerrillamail.com",
  "mailinator.com",
  "temp-mail.org",
  "throwaway.email",
  "yopmail.com",
];

function isDisposableEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase();
  return DISPOSABLE_DOMAINS.includes(domain);
}

export const emailSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .toLowerCase()
    .refine((email) => !isDisposableEmail(email), "Disposable email addresses are not allowed"),
  source: z.string().optional(),
});

export type EmailInput = z.infer<typeof emailSchema>;
