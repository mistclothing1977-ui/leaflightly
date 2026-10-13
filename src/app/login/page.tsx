import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LoginForm from "@/components/LoginForm";
import OAuthButtons from "@/components/OAuthButtons";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Login — Leaf Lightly",
  description: "Sign in to your Leaf Lightly account",
};

export default async function LoginPage() {
  const session = await auth();
  if (session) {
    redirect("/wishlist");
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Welcome Back</h1>
        <p className={styles.subtitle}>Sign in to access your wishlist</p>

        <LoginForm />

        <div className={styles.divider}>OR</div>

        <OAuthButtons />

        <p className={styles.signup}>
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
}
