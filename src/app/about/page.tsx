export const metadata = {
  title: 'About Leaf Lightly',
  description: 'Learn about Leaf Lightly\'s mission to make sustainable shopping simple, transparent, and accessible.',
};

export default function AboutPage() {
  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 2rem' }}>
      <h1>About Leaf Lightly</h1>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Our Mission</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
          We believe sustainable shopping shouldn't be overwhelming. At Leaf Lightly, we're on a mission to make eco-friendly living accessible, transparent, and beautiful.
        </p>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>What We Do</h2>
        <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#666' }}>
          Leaf Lightly curates and reviews sustainable products from verified brands. We cut through the greenwashing, highlight real certifications, and connect you with products that truly align with your values.
        </p>
        <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#666' }}>
          Each product in our collection has been vetted for sustainability, quality, and impact. We partner with transparent brands and provide honest reviews from real users.
        </p>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Our Values</h2>
        <ul style={{ fontSize: '1rem', lineHeight: '1.8', color: '#666' }}>
          <li><strong>Transparency:</strong> No greenwashing. We show you exactly why we recommend each product.</li>
          <li><strong>Accessibility:</strong> Sustainable products for every budget and lifestyle.</li>
          <li><strong>Community:</strong> Built by people who genuinely care about the planet.</li>
          <li><strong>Impact:</strong> Every recommendation is chosen to make a real difference.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Our Story</h2>
        <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#666' }}>
          Leaf Lightly was founded on the belief that sustainable living shouldn't require a PhD in environmental science. We started by asking simple questions: What does "sustainable" really mean? Which certifications actually matter? How do I find products that align with my values without endless research?
        </p>
        <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#666' }}>
          Today, we help thousands of conscious shoppers discover products they love while supporting the brands making a positive impact.
        </p>
      </section>

      <section style={{ padding: '2rem', background: '#f8f6f3', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>Let's Stay Connected</h2>
        <p style={{ fontSize: '1rem', lineHeight: '1.8' }}>
          Have questions or ideas? We'd love to hear from you. <a href="/contact" style={{ color: '#1a472a', fontWeight: '600' }}>Get in touch</a>.
        </p>
      </section>
    </main>
  );
}
