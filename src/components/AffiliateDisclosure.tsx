import styles from './AffiliateDisclosure.module.css';

export default function AffiliateDisclosure({ amazon = true }: { amazon?: boolean }) {
  return (
    <div className={styles.disclosure}>
      <strong>💡 Affiliate Disclosure:</strong> We earn a small commission when you purchase through
      these links at no extra cost to you. This helps us keep Leaf Lightly free and continue curating
      the best sustainable products.{amazon ? ' As an Amazon Associate I earn from qualifying purchases.' : ''}{' '}
      <a href="/affiliate-disclosure">Learn more</a>
    </div>
  );
}
