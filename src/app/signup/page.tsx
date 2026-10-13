import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SignupForm from "@/components/SignupForm";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sign Up — Leaf Lightly",
  description: "Create your Leaf Lightly account",
};

export default async function SignupPage() {
  const session = await auth();
  if (session) {
    redirect("/wishlist");
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Create Account</h1>
        <p className={styles.subtitle}>Sign up to save your favorite products</p>

        <SignupForm />

        <div className={styles.divider}>OR</div>

        <div className={styles.socialLogin}>
          <form action="/api/auth/signin/google" method="POST">
            <button type="submit" className={styles.googleButton}>
              <span>🔍</span> Sign up with Google
            </button>
          </form>

          <form action="/api/auth/signin/github" method="POST">
            <button type="submit" className={styles.githubButton}>
              <span>🐙</span> Sign up with GitHub
            </button>
          </form>
        </div>

        <p className={styles.login}>
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
  );
}
