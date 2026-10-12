import styles from './AffiliateDisclosure.module.css';

export default function AffiliateDisclosure() {
  return (
    <div className={styles.disclosure}>
      <strong>💡 Affiliate Disclosure:</strong> We earn a small commission when you purchase through
      these links at no extra cost to you. This helps us keep Leaf Lightly free and continue curating
      the best sustainable products.{' '}
      <a href="/affiliate-disclosure">Learn more</a>
    </div>
  );
}
