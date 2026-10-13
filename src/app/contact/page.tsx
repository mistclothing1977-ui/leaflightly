export const metadata = {
  title: 'Contact Us — Leaf Lightly',
  description: 'Get in touch with Leaf Lightly. We\'d love to hear from you about sustainable products and partnerships.',
};

export default function ContactPage() {
  return (
    <main style={{ maxWidth: '800px', margin: '4rem auto', padding: '0 2rem' }}>
      <h1>Contact Us</h1>
      <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#666' }}>
        We'd love to hear from you! Whether you have questions about our products, want to recommend a sustainable brand, or have partnership inquiries, reach out below.
      </p>

      <form style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '1rem',
            }}
          />
        </div>

        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '1rem',
            }}
          />
        </div>

        <div>
          <label htmlFor="subject" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '1rem',
            }}
          />
        </div>

        <div>
          <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '1rem',
              fontFamily: 'inherit',
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: '1rem 2rem',
            background: '#1a472a',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
        >
          Send Message
        </button>
      </form>

      <div style={{ marginTop: '4rem', padding: '2rem', background: '#f8f6f3', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>Other Ways to Reach Us</h2>
        <p>
          <strong>Email:</strong> hello@leaflightly.com
        </p>
        <p>
          <strong>For partnerships:</strong> partnerships@leaflightly.com
        </p>
      </div>
    </main>
  );
}
