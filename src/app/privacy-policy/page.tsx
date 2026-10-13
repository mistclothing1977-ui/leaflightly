export const metadata = {
  title: 'Privacy Policy — Leaf Lightly',
  description: 'Leaf Lightly\'s privacy policy. Learn how we protect your data.',
};

export default function PrivacyPolicyPage() {
  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 2rem' }}>
      <h1>Privacy Policy</h1>

      <p style={{ fontSize: '0.95rem', color: '#666', marginBottom: '2rem' }}>
        Last updated: 2026
      </p>

      <section style={{ marginBottom: '2rem' }}>
        <h2>1. Introduction</h2>
        <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#666' }}>
          Leaf Lightly ("we," "us," "our," or "Company") operates the website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our service and the choices you have associated with that data.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>2. Information Collection and Use</h2>
        <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#666' }}>
          We collect several different types of information for various purposes to provide and improve our service to you.
        </p>
        <h3>Types of Data Collected:</h3>
        <ul style={{ fontSize: '1rem', lineHeight: '1.8', color: '#666' }}>
          <li><strong>Personal Data:</strong> Name, email address, phone number, address, profile information</li>
          <li><strong>Usage Data:</strong> Browser information, pages visited, time and date of visits, time spent on pages</li>
          <li><strong>Cookies and Tracking:</strong> We use cookies to track activity and enhance user experience</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>3. Use of Data</h2>
        <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#666' }}>
          Leaf Lightly uses the collected data for various purposes:
        </p>
        <ul style={{ fontSize: '1rem', lineHeight: '1.8', color: '#666' }}>
          <li>To provide and maintain our service</li>
          <li>To notify you about changes to our service</li>
          <li>To allow you to participate in interactive features</li>
          <li>To provide customer care and support</li>
          <li>To gather analysis or valuable information to improve our service</li>
          <li>To monitor the usage of our service</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>4. Security of Data</h2>
        <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#666' }}>
          The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>5. Changes to This Privacy Policy</h2>
        <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#666' }}>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this page.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>6. Contact Us</h2>
        <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#666' }}>
          If you have any questions about this Privacy Policy, please <a href="/contact" style={{ color: '#1a472a', fontWeight: '600' }}>contact us</a>.
        </p>
      </section>

      <div style={{ marginTop: '4rem', padding: '2rem', background: '#f8f6f3', borderRadius: '8px' }}>
        <p style={{ fontSize: '0.95rem', color: '#666', margin: 0 }}>
          This is a standard privacy policy template. For a complete and legally binding privacy policy, consult with a legal professional to ensure compliance with applicable laws in your jurisdiction.
        </p>
      </div>
    </main>
  );
}
