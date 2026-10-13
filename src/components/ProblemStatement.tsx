'use client';

import styles from './ProblemStatement.module.css';

export default function ProblemStatement() {
  return (
    <section className={styles.problemSection}>
      <div className={styles.problemContainer}>
        <div className={styles.problemContent}>
          <h2 className={styles.problemHeading}>The Problem</h2>
          <p className={styles.problemText}>
            Sustainable shopping is overwhelming. Certification labels contradict. Brands claim green credentials without proof. You're left guessing whether your purchases actually align with your values. That friction costs you time, money, and peace of mind.
          </p>
          <p className={styles.problemThesis}>
            <strong>Leaf Lightly solves this by doing the hard work of vetting—so you don't have to.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
