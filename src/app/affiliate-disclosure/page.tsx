import { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Affiliate Disclosure — Leaf Lightly",
  description: "Learn about our affiliate partnerships and how we earn commissions.",
};

export default function AffiliateDisclosure() {
  return (
    <div className={styles.container}>
      <h1>Affiliate Disclosure</h1>

      <section>
        <h2>How We Work</h2>
        <p>
          Leaf Lightly is a curation platform dedicated to helping you discover genuinely sustainable,
          thoughtfully-made products. We don't sell products directly — we link you to trusted brands
          and retailers where you can purchase them.
        </p>
      </section>

      <section>
        <h2>Affiliate Partnerships</h2>
        <p>
          When you click a "Buy Now" link on Leaf Lightly and make a purchase, we may earn a small
          commission from the retailer or brand. <strong>This does not affect the price you pay.</strong>
        </p>

        <h3>Our Affiliate Programs:</h3>
        <ul>
          <li>
            <strong>Amazon Associates:</strong> Affiliate links to products available on Amazon.co.uk
            (commission varies by product category, typically 4-5%)
          </li>
          <li>
            <strong>Direct Brand Partnerships:</strong> Affiliate agreements with individual sustainable
            brands (commission rates vary)
          </li>
        </ul>
      </section>

      <section>
        <h2>Our Promise</h2>
        <p>
          The affiliate commission model lets us keep Leaf Lightly completely free and ad-free.
          In exchange:
        </p>
        <ul>
          <li>✅ We only recommend products we genuinely believe in</li>
          <li>✅ We thoroughly vet brands for sustainability credibility</li>
          <li>✅ We provide honest ratings and reviews</li>
          <li>✅ We disclose our affiliate relationships clearly</li>
          <li>✅ We never recommend a product just because it pays the highest commission</li>
        </ul>
      </section>

      <section>
        <h2>Transparency</h2>
        <p>
          Every product page displays an affiliate disclosure notice. When you click a "Buy Now" button,
          you'll be taken directly to the retailer's site where you can complete your purchase.
        </p>
        <p>
          <strong>We never:</strong>
        </p>
        <ul>
          <li>Collect payment information (retailers handle that)</li>
          <li>Track your purchases beyond what's needed for commission verification</li>
          <li>Sell your data to third parties</li>
        </ul>
      </section>

      <section>
        <h2>Questions?</h2>
        <p>
          If you have questions about our affiliate partnerships or our business model,
          please <a href="/">contact us</a>.
        </p>
      </section>

      <section className={styles.legal}>
        <h3>Legal Compliance</h3>
        <p>
          Leaf Lightly complies with the Federal Trade Commission (FTC) Guides Concerning the Use of
          Endorsements and Testimonials in Advertising, as well as relevant UK advertising standards
          (ASA, PECR).
        </p>
      </section>
    </div>
  );
}
