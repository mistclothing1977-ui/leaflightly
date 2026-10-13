'use client';

import Link from 'next/link';
import styles from './MegaMenu.module.css';

interface MegaMenuProps {
  category: string;
}

interface MenuSection {
  name: string;
  items: { label: string; href: string }[];
}

interface CategoryMenu {
  featured: MenuSection;
  filters: MenuSection;
  links: MenuSection;
}

export default function MegaMenu({ category }: MegaMenuProps) {
  const menus: Record<string, CategoryMenu> = {
    kitchen: {
      featured: {
        name: 'Bestsellers',
        items: [
          { label: 'Beeswax Wraps', href: '/products/kitchen?cert=organic' },
          { label: 'Bamboo Utensils', href: '/products/kitchen?cert=plastic-free' },
          { label: 'Stainless Steel Bottles', href: '/products/kitchen?tier=A' },
        ],
      },
      filters: {
        name: 'Materials',
        items: [
          { label: 'Organic', href: '/products/kitchen?cert=organic' },
          { label: 'Recycled', href: '/products/kitchen?cert=fsc' },
          { label: 'Plastic-Free', href: '/products/kitchen?cert=plastic-free' },
        ],
      },
      links: {
        name: 'Quick Links',
        items: [
          { label: 'View All', href: '/products/kitchen' },
          { label: 'Top Rated', href: '/products/kitchen?sort=rating' },
          { label: 'New Arrivals', href: '/products/kitchen?sort=new' },
        ],
      },
    },
    fashion: {
      featured: {
        name: 'Trending',
        items: [
          { label: 'Sustainable Sneakers', href: '/products/fashion?brand=veja' },
          { label: 'Organic Cotton', href: '/products/fashion?cert=organic' },
          { label: 'Eco-Friendly Fabrics', href: '/products/fashion?cert=organic' },
        ],
      },
      filters: {
        name: 'Materials',
        items: [
          { label: 'Organic Cotton', href: '/products/fashion?cert=organic' },
          { label: 'Recycled Polyester', href: '/products/fashion?cert=recycled' },
          { label: 'Plant-Based', href: '/products/fashion?cert=vegan' },
        ],
      },
      links: {
        name: 'Quick Links',
        items: [
          { label: 'View All', href: '/products/fashion' },
          { label: 'Top Rated', href: '/products/fashion?sort=rating' },
          { label: 'New Arrivals', href: '/products/fashion?sort=new' },
        ],
      },
    },
    lifestyle: {
      featured: {
        name: 'Home Essentials',
        items: [
          { label: 'Bamboo Sheets', href: '/products/lifestyle?brand=bampure' },
          { label: 'Eco Cleaning', href: '/products/lifestyle?cert=plastic-free' },
          { label: 'Sustainable Décor', href: '/products/lifestyle?tier=A' },
        ],
      },
      filters: {
        name: 'Materials',
        items: [
          { label: 'Bamboo', href: '/products/lifestyle?material=bamboo' },
          { label: 'Recycled', href: '/products/lifestyle?cert=fsc' },
          { label: 'Plastic-Free', href: '/products/lifestyle?cert=plastic-free' },
        ],
      },
      links: {
        name: 'Quick Links',
        items: [
          { label: 'View All', href: '/products/lifestyle' },
          { label: 'Top Rated', href: '/products/lifestyle?sort=rating' },
          { label: 'New Arrivals', href: '/products/lifestyle?sort=new' },
        ],
      },
    },
    beauty: {
      featured: {
        name: 'Natural Beauty',
        items: [
          { label: 'Clean Skincare', href: '/products/beauty?cert=organic' },
          { label: 'Non-Toxic', href: '/products/beauty?cert=vegan' },
          { label: 'Eco Packaging', href: '/products/beauty?cert=plastic-free' },
        ],
      },
      filters: {
        name: 'Types',
        items: [
          { label: 'Skincare', href: '/products/beauty?type=skincare' },
          { label: 'Haircare', href: '/products/beauty?type=haircare' },
          { label: 'Bath & Body', href: '/products/beauty?type=bath' },
        ],
      },
      links: {
        name: 'Quick Links',
        items: [
          { label: 'View All', href: '/products/beauty' },
          { label: 'Top Rated', href: '/products/beauty?sort=rating' },
          { label: 'New Arrivals', href: '/products/beauty?sort=new' },
        ],
      },
    },
    wellness: {
      featured: {
        name: 'Wellness Products',
        items: [
          { label: 'Yoga & Fitness', href: '/products/wellness?type=yoga' },
          { label: 'Meditation', href: '/products/wellness?type=meditation' },
          { label: 'Wellness Gear', href: '/products/wellness?tier=A' },
        ],
      },
      filters: {
        name: 'Activities',
        items: [
          { label: 'Yoga', href: '/products/wellness?type=yoga' },
          { label: 'Fitness', href: '/products/wellness?type=fitness' },
          { label: 'Meditation', href: '/products/wellness?type=meditation' },
        ],
      },
      links: {
        name: 'Quick Links',
        items: [
          { label: 'View All', href: '/products/wellness' },
          { label: 'Top Rated', href: '/products/wellness?sort=rating' },
          { label: 'New Arrivals', href: '/products/wellness?sort=new' },
        ],
      },
    },
  };

  const menu = menus[category];
  if (!menu) return null;

  return (
    <div className={styles.megaMenu}>
      <div className={styles.column}>
        <h3 className={styles.heading}>{menu.featured.name}</h3>
        <ul className={styles.list}>
          {menu.featured.items.map((item) => (
            <li key={item.label}>
              <Link href={item.href} className={styles.link}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.column}>
        <h3 className={styles.heading}>{menu.filters.name}</h3>
        <ul className={styles.list}>
          {menu.filters.items.map((item) => (
            <li key={item.label}>
              <Link href={item.href} className={styles.link}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.column}>
        <h3 className={styles.heading}>{menu.links.name}</h3>
        <ul className={styles.list}>
          {menu.links.items.map((item) => (
            <li key={item.label}>
              <Link href={item.href} className={styles.link}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
