export const metadata = {
  title: 'How It Works — Leaf Lightly',
  description: 'Learn how Leaf Lightly vets, curates, and recommends sustainable products.',
};

export default function HowItWorksPage() {
  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 2rem' }}>
      <h1>How It Works</h1>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Our Curation Process</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
          Every product on Leaf Lightly goes through a rigorous vetting process to ensure it meets our sustainability standards and delivers real value to conscious shoppers.
        </p>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h3>Step 1: Research & Vetting</h3>
        <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#666' }}>
          We research brands thoroughly, checking certifications, supply chains, and manufacturing practices. We look for B Corp status, FSC certification, Fair Trade standards, and transparency about materials and sourcing.
        </p>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h3>Step 2: Tier Classification</h3>
        <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#666' }}>
          We assign each product to one of three tiers based on sustainability credentials:
        </p>
        <div style={{ marginLeft: '1rem', borderLeft: '3px solid #1a472a', paddingLeft: '1rem' }}>
          <p><strong>Tier A - Certified Eco:</strong> B Corp certified, FSC certified, or equivalent recognized standards.</p>
          <p><strong>Tier B - Eco-Community Validated:</strong> Verified by our community as genuinely sustainable.</p>
          <p><strong>Tier C - Plastic-Free + Material-Transparent:</strong> No plastic packaging and clear material sourcing.</p>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h3>Step 3: User Reviews</h3>
        <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#666' }}>
          We collect verified reviews from real customers who've purchased through our links. These ratings help you understand not just sustainability, but actual product quality and performance.
        </p>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h3>Step 4: Continuous Updates</h3>
        <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#666' }}>
          We regularly review and update our product database. When brands improve their practices or new certifications are earned, we reflect those changes immediately.
        </p>
      </section>

      <section style={{ marginBottom: '3rem', padding: '2rem', background: '#f8f6f3', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>Our Transparency Commitment</h2>
        <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#666' }}>
          We earn a small commission when you purchase through Leaf Lightly links—at no extra cost to you. This helps us operate sustainably while keeping product curation free and transparent. We're upfront about this because trust matters.
        </p>
      </section>

      <section>
        <h2>Still Have Questions?</h2>
        <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#666' }}>
          Check our <a href="/affiliate-disclosure" style={{ color: '#1a472a', fontWeight: '600' }}>affiliate disclosure</a> for more details, or <a href="/contact" style={{ color: '#1a472a', fontWeight: '600' }}>contact us</a> anytime.
        </p>
      </section>
    </main>
  );
}
