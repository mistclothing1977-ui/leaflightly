import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { compare } from "bcryptjs";
import { createUser, findUserByEmail, touchLastLogin, type AuthProvider } from "@/lib/users";

// Compared against when the email is unknown, so response time doesn't reveal which emails have accounts.
const DUMMY_HASH = "$2a$12$qI/in7ysUt/43P4avfwH8OGmFcfxvpVfirq/eZMOsjJWv9opIvx2i";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
    };
  }
}

const authConfig = {
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

        const user = await findUserByEmail(credentials.email);

        const isPasswordValid = await compare(
          credentials.password as string,
          user?.password_hash ?? DUMMY_HASH
        );

        if (!user || !user.password_hash || !isPasswordValid) {
          return null;
        }

        await touchLastLogin(user.id);

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
    async signIn({ user, account }: { user?: any; account?: any }) {
      // OAuth: find or create the DB user and always use the DB id (not the provider's id).
      if (account?.provider !== "credentials") {
        if (!user?.email) return false;
        const existing =
          (await findUserByEmail(user.email)) ??
          (await createUser({
            email: user.email,
            name: user.name || user.email.split("@")[0],
            provider: account.provider as AuthProvider,
          }));
        user.id = existing.id;
        await touchLastLogin(existing.id);
      }

      return true;
    },

    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

// Create auth wrapper using getServerSession
export async function auth() {
  return await getServerSession(authConfig);
}

export { authConfig };

// Helper to register user (credentials only)
export async function registerUser(email: string, name: string, password: string) {
  return createUser({ email, name, password, provider: "credentials" });
}
