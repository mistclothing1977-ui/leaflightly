import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { compare, hash } from "bcryptjs";

// Simple in-memory user store (replace with DB in production)
const users: Record<string, { id: string; email: string; name: string; passwordHash?: string }> = {};

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    // Credentials provider (email/password)
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = Object.values(users).find(
          (u) => u.email === credentials.email
        );

        if (!user || !user.passwordHash) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password as string,
          user.passwordHash
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),

    // Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),

    // GitHub OAuth
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
  ],

  pages: {
    signIn: "/login",
    error: "/auth/error",
  },

  callbacks: {
    async signIn({ user, account }) {
      // Create user if doesn't exist (OAuth)
      if (account?.provider !== "credentials") {
        const existingUser = Object.values(users).find(
          (u) => u.email === user.email
        );

        if (!existingUser && user.email && user.name) {
          const userId = `user_${Date.now()}`;
          users[userId] = {
            id: userId,
            email: user.email,
            name: user.name,
          };
          user.id = userId;
        }
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});

// Helper to register user (credentials only)
export async function registerUser(
  email: string,
  name: string,
  password: string
) {
  const existingUser = Object.values(users).find((u) => u.email === email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  const userId = `user_${Date.now()}`;
  const passwordHash = await hash(password, 10);

  users[userId] = {
    id: userId,
    email,
    name,
    passwordHash,
  };

  return users[userId];
}
