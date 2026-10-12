'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './CompareButton.module.css';

interface CompareButtonProps {
  productId: string;
  productName: string;
}

export default function CompareButton({ productId, productName }: CompareButtonProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [compareList, setCompareList] = useState<string[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('compareList');
    if (saved) {
      const list = JSON.parse(saved);
      setCompareList(list);
      setIsAdded(list.includes(productId));
    }
  }, [productId]);

  const handleAddToCompare = () => {
    let newList = [...compareList];

    if (newList.includes(productId)) {
      newList = newList.filter((id) => id !== productId);
      setIsAdded(false);
    } else {
      if (newList.length >= 4) {
        newList.pop();
      }
      newList = [productId, ...newList];
      setIsAdded(true);
    }

    setCompareList(newList);
    localStorage.setItem('compareList', JSON.stringify(newList));
  };

  const compareUrl = compareList.length > 0 ? `/compare?products=${compareList.join(',')}` : '/compare';

  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${isAdded ? styles.active : ''}`}
        onClick={handleAddToCompare}
        title={isAdded ? 'Remove from comparison' : 'Add to comparison'}
      >
        ⚖️ {isAdded ? 'Remove from Compare' : 'Add to Compare'}
      </button>

      {compareList.length > 0 && (
        <Link href={compareUrl} className={styles.viewCompare}>
          Compare ({compareList.length})
        </Link>
      )}
    </div>
  );
}
