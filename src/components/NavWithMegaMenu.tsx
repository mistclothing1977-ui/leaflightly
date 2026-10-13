'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import MegaMenu from './MegaMenu';
import styles from './NavWithMegaMenu.module.css';

interface NavWithMegaMenuProps {
  label: string;
  href: string;
  category: string;
  onClick?: () => void;
}

export default function NavWithMegaMenu({
  label,
  href,
  category,
  onClick,
}: NavWithMegaMenuProps) {
  const [showMenu, setShowMenu] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowMenu(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setShowMenu(false), 150);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowMenu(false);
      (e.currentTarget as HTMLElement).blur();
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setShowMenu(true);
    }
  };

  const handleFocus = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowMenu(true);
  };

  const handleBlur = () => {
    timeoutRef.current = setTimeout(() => setShowMenu(false), 150);
  };

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={href}
        className={styles.link}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-expanded={showMenu}
        aria-haspopup="menu"
      >
        {label}
      </Link>
      {showMenu && (
        <div className={styles.menuContainer} role="menu">
          <MegaMenu category={category} />
        </div>
      )}
    </div>
  );
}
