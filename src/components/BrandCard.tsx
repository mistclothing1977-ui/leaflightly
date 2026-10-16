import Link from 'next/link';
import type { Brand } from '@/data/brands';
import styles from './BrandCard.module.css';

export default function BrandCard({ brand, productCount }: { brand: Brand; productCount: number }) {
  return (
    <Link href={`/brands/${brand.slug}`} className={styles.card}>
      <div className={styles.logo}>
        {brand.logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={brand.logoUrl} alt={`${brand.name} logo`} />
        ) : (
          <span className={styles.placeholder}>{brand.name}</span>
        )}
      </div>
      <div className={styles.body}>
        <h3>{brand.name}</h3>
        <p>{brand.description}</p>
        <span className={styles.link}>
          {productCount > 0 ? `View ${productCount} product${productCount === 1 ? '' : 's'}` : 'View brand'}
        </span>
      </div>
    </Link>
  );
}
