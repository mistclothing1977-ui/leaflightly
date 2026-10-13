import { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Affiliate Disclosure — Leaf Lightly",
  description: "Learn about our affiliate partnerships and how we earn commissions.",
};

export default function AffiliateDisclosure() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Affiliate Disclosure</h1>

      <section className={styles.section}>
        <h2 className={styles.subheading}>How We Work</h2>
        <p className={styles.text}>
          Leaf Lightly is a curation platform dedicated to helping you discover genuinely sustainable,
          thoughtfully-made products. We don't sell products directly — we link you to trusted brands
          and retailers where you can purchase them.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subheading}>Affiliate Partnerships</h2>
        <p className={styles.text}>
          When you click a "Buy Now" link on Leaf Lightly and make a purchase, we may earn a small
          commission from the retailer or brand. <strong className={styles.bold}>This does not affect the price you pay.</strong>
        </p>

        <h3 className={styles.tertiaryHeading}>Our Affiliate Programs:</h3>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <strong className={styles.bold}>Amazon Associates:</strong> Affiliate links to products available on Amazon.co.uk
            (commission varies by product category, typically 4-5%)
          </li>
          <li className={styles.listItem}>
            <strong className={styles.bold}>Direct Brand Partnerships:</strong> Affiliate agreements with individual sustainable
            brands (commission rates vary)
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subheading}>Our Promise</h2>
        <p className={styles.text}>
          The affiliate commission model lets us keep Leaf Lightly completely free and ad-free.
          In exchange:
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>✅ We only recommend products we genuinely believe in</li>
          <li className={styles.listItem}>✅ We thoroughly vet brands for sustainability credibility</li>
          <li className={styles.listItem}>✅ We provide honest ratings and reviews</li>
          <li className={styles.listItem}>✅ We disclose our affiliate relationships clearly</li>
          <li className={styles.listItem}>✅ We never recommend a product just because it pays the highest commission</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subheading}>Transparency</h2>
        <p className={styles.text}>
          Every product page displays an affiliate disclosure notice. When you click a "Buy Now" button,
          you'll be taken directly to the retailer's site where you can complete your purchase.
        </p>
        <p className={styles.text}>
          <strong className={styles.bold}>We never:</strong>
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>Collect payment information (retailers handle that)</li>
          <li className={styles.listItem}>Track your purchases beyond what's needed for commission verification</li>
          <li className={styles.listItem}>Sell your data to third parties</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subheading}>Questions?</h2>
        <p className={styles.text}>
          If you have questions about our affiliate partnerships or our business model,
          please <a href="/" className={styles.link}>contact us</a>.
        </p>
      </section>

      <section className={styles.legal}>
        <h3 className={styles.tertiaryHeading}>Legal Compliance</h3>
        <p className={styles.text}>
          Leaf Lightly complies with the Federal Trade Commission (FTC) Guides Concerning the Use of
          Endorsements and Testimonials in Advertising, as well as relevant UK advertising standards
          (ASA, PECR).
        </p>
      </section>
    </div>
  );
}
