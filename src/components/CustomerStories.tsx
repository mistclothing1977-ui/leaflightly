'use client';

import styles from './CustomerStories.module.css';

export default function CustomerStories() {
  const stories = [
    {
      id: 1,
      name: 'Sarah M.',
      quote: 'I used to spend hours researching certifications. Now I trust Leaf Lightly to do that for me. I feel good about every purchase.',
    },
    {
      id: 2,
      name: 'James T.',
      quote: 'The transparency here is unreal. They tell you exactly where products come from and why they matter. That\'s the trust I was looking for.',
    },
    {
      id: 3,
      name: 'Emma L.',
      quote: 'Finally, a platform that respects both my values and my wallet. Quality sustainable products without the greenwashing.',
    },
  ];

  return (
    <section className={styles.storiesSection}>
      <div className={styles.storiesContainer}>
        <div className={styles.storiesHeader}>
          <h2 className={styles.sectionLabel}>Community Voices</h2>
          <h3 className={styles.storiesTitle}>Why People Love Leaf Lightly</h3>
        </div>

        <div className={styles.storiesGrid}>
          {stories.map((story) => (
            <div key={story.id} className={styles.storyCard}>
              <p className={styles.quote}>"{story.quote}"</p>
              <div className={styles.storyAuthor}>
                <span className={styles.authorImage} aria-hidden="true">
                  {story.name.split(/\s+/).map((w) => w[0]).join('')}
                </span>
                <p className={styles.authorName}>{story.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
