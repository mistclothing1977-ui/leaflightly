/**
 * Weekly Newsletter Email Template
 * Renders as React component, converted to HTML for sending via Resend
 */

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
  category: string;
  rating: number;
  reviewCount: number;
  tier: number;
  description?: string;
}

interface NewsletterEmailProps {
  recipientEmail: string;
  curatedProducts: Product[];
  unsubscribeUrl: string;
  weekNumber: number;
}

export function NewsletterEmailTemplate({
  recipientEmail,
  curatedProducts,
  unsubscribeUrl,
  weekNumber,
}: NewsletterEmailProps) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <title>Leaf Lightly - Week {weekNumber} Picks</title>
        <style>{`
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
              'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            line-height: 1.6;
            color: #2A2A26;
            margin: 0;
            padding: 0;
            background-color: #F8F6F3;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: white;
          }
          .header {
            background: linear-gradient(135deg, #1a472a 0%, #2d6d42 100%);
            color: white;
            padding: 40px 20px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 800;
            letter-spacing: -0.5px;
          }
          .header p {
            margin: 10px 0 0 0;
            font-size: 14px;
            opacity: 0.9;
          }
          .content {
            padding: 40px 20px;
          }
          .intro {
            margin-bottom: 40px;
            font-size: 16px;
            line-height: 1.6;
          }
          .products-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin: 40px 0;
          }
          .product-card {
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            overflow: hidden;
            transition: all 0.3s ease;
          }
          .product-image {
            width: 100%;
            height: 150px;
            object-fit: cover;
            display: block;
          }
          .product-info {
            padding: 12px;
          }
          .product-brand {
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            color: #8B7355;
            letter-spacing: 0.3px;
            margin-bottom: 4px;
          }
          .product-name {
            font-size: 14px;
            font-weight: 700;
            color: #2A2A26;
            margin-bottom: 6px;
            line-height: 1.3;
          }
          .product-price {
            font-size: 16px;
            font-weight: 800;
            color: #1a472a;
            margin-bottom: 6px;
          }
          .product-rating {
            font-size: 12px;
            color: #8B8B7E;
          }
          .cta-button {
            display: inline-block;
            background-color: #1a472a;
            color: white;
            padding: 12px 24px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 700;
            font-size: 14px;
            text-align: center;
            width: 100%;
            box-sizing: border-box;
            margin-top: 10px;
          }
          .cta-button:hover {
            background-color: #FF6B35;
          }
          .divider {
            border: 0;
            border-top: 1px solid #e0e0e0;
            margin: 40px 0;
          }
          .footer {
            padding: 20px;
            background-color: #F8F6F3;
            border-top: 1px solid #e0e0e0;
            font-size: 12px;
            color: #8B8B7E;
            text-align: center;
          }
          .footer-links {
            margin: 15px 0;
          }
          .footer-links a {
            color: #1a472a;
            text-decoration: none;
            margin: 0 10px;
          }
          .footer-links a:hover {
            text-decoration: underline;
          }
          @media (max-width: 600px) {
            .products-grid {
              grid-template-columns: 1fr;
            }
            .header {
              padding: 30px 20px;
            }
            .header h1 {
              font-size: 24px;
            }
          }
        `}</style>
      </head>
      <body>
        <div className="container">
          {/* Header */}
          <div className="header">
            <h1>🌱 Leaf Lightly</h1>
            <p>Your Weekly Sustainable Picks</p>
          </div>

          {/* Content */}
          <div className="content">
            <div className="intro">
              <p>Hi there,</p>
              <p>
                Here are our top curated sustainable product picks for this week ({currentDate}).
                Each item has been vetted for quality, sustainability, and impact.
              </p>
            </div>

            {/* Products by Category */}
            {curatedProducts.length > 0 && (
              <>
                <h2 style={{ fontSize: '20px', marginBottom: '20px', color: '#1a472a' }}>
                  This Week's Essentials
                </h2>
                <div className="products-grid">
                  {curatedProducts.map((product) => (
                    <div key={product.id} className="product-card">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="product-image"
                      />
                      <div className="product-info">
                        <div className="product-brand">{product.brand}</div>
                        <div className="product-name">{product.name}</div>
                        <div className="product-price">£{product.price.toFixed(2)}</div>
                        <div className="product-rating">
                          ★★★★★ {product.rating} ({product.reviewCount} reviews)
                        </div>
                        <a
                          href={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://leaflightly.com'}/products/${product.id}`}
                          className="cta-button"
                        >
                          View Details →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            <hr className="divider" />

            {/* Call to Action */}
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <p>
                Discover all our vetted sustainable brands and products.
              </p>
              <a
                href={process.env.NEXT_PUBLIC_BASE_URL || 'https://leaflightly.com'}
                className="cta-button"
                style={{ display: 'inline-block', width: 'auto' }}
              >
                Explore All Products
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="footer">
            <p style={{ margin: '0 0 10px 0' }}>
              © 2026 Leaf Lightly. All rights reserved.
            </p>
            <div className="footer-links">
              <a href={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://leaflightly.com'}`}>
                Home
              </a>
              <a href={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://leaflightly.com'}/about`}>
                About
              </a>
              <a href={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://leaflightly.com'}/privacy`}>
                Privacy
              </a>
            </div>
            <p style={{ margin: '10px 0 0 0', fontSize: '11px' }}>
              <a href={unsubscribeUrl} style={{ color: '#8B7355', textDecoration: 'none' }}>
                Unsubscribe from newsletters
              </a>
            </p>
            <p style={{ margin: '5px 0 0 0', fontSize: '11px', color: '#999' }}>
              Sent to: {recipientEmail}
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}

/**
 * Render email template to HTML string
 */
export function renderNewsletterEmail(props: NewsletterEmailProps): string {
  const { unsubscribeUrl } = props;

  // Simple JSX to HTML conversion
  // In production, use @react-email/render or similar
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Leaf Lightly - Week ${props.weekNumber} Picks</title>
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
          'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        line-height: 1.6;
        color: #2A2A26;
        margin: 0;
        padding: 0;
        background-color: #F8F6F3;
      }
      .container { max-width: 600px; margin: 0 auto; background-color: white; }
      .header { background: linear-gradient(135deg, #1a472a 0%, #2d6d42 100%); color: white; padding: 40px 20px; text-align: center; }
      .header h1 { margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px; }
      .header p { margin: 10px 0 0 0; font-size: 14px; opacity: 0.9; }
      .content { padding: 40px 20px; }
      .intro { margin-bottom: 40px; font-size: 16px; line-height: 1.6; }
      .products-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 40px 0; }
      .product-card { border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; }
      .product-image { width: 100%; height: 150px; object-fit: cover; }
      .product-info { padding: 12px; }
      .product-brand { font-size: 12px; font-weight: 600; text-transform: uppercase; color: #8B7355; letter-spacing: 0.3px; margin-bottom: 4px; }
      .product-name { font-size: 14px; font-weight: 700; color: #2A2A26; margin-bottom: 6px; }
      .product-price { font-size: 16px; font-weight: 800; color: #1a472a; margin-bottom: 6px; }
      .product-rating { font-size: 12px; color: #8B8B7E; }
      .cta-button { display: inline-block; background-color: #1a472a; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 700; font-size: 14px; text-align: center; margin-top: 10px; }
      .cta-button:hover { background-color: #FF6B35; }
      .divider { border: 0; border-top: 1px solid #e0e0e0; margin: 40px 0; }
      .footer { padding: 20px; background-color: #F8F6F3; border-top: 1px solid #e0e0e0; font-size: 12px; color: #8B8B7E; text-align: center; }
      .footer-links { margin: 15px 0; }
      .footer-links a { color: #1a472a; text-decoration: none; margin: 0 10px; }
      @media (max-width: 600px) {
        .products-grid { grid-template-columns: 1fr; }
        .header { padding: 30px 20px; }
        .header h1 { font-size: 24px; }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>🌱 Leaf Lightly</h1>
        <p>Your Weekly Sustainable Picks</p>
      </div>
      <div class="content">
        <div class="intro">
          <p>Hi there,</p>
          <p>Here are our top curated sustainable product picks for this week. Each item has been vetted for quality, sustainability, and impact.</p>
        </div>
        ${
          props.curatedProducts.length > 0
            ? `
          <h2 style="font-size: 20px; margin-bottom: 20px; color: #1a472a;">This Week's Essentials</h2>
          <div class="products-grid">
            ${props.curatedProducts
              .map(
                (product) => `
              <div class="product-card">
                <img src="${product.imageUrl}" alt="${product.name}" class="product-image" />
                <div class="product-info">
                  <div class="product-brand">${product.brand}</div>
                  <div class="product-name">${product.name}</div>
                  <div class="product-price">£${product.price.toFixed(2)}</div>
                  <div class="product-rating">★★★★★ ${product.rating} (${product.reviewCount} reviews)</div>
                  <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://leaflightly.com'}/products/${product.id}" class="cta-button">View Details →</a>
                </div>
              </div>
            `
              )
              .join('')}
          </div>
        `
            : ''
        }
        <hr class="divider" />
        <div style="text-align: center; margin-bottom: 30px;">
          <p>Discover all our vetted sustainable brands and products.</p>
          <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://leaflightly.com'}" class="cta-button" style="display: inline-block; width: auto;">Explore All Products</a>
        </div>
      </div>
      <div class="footer">
        <p style="margin: 0 0 10px 0;">© 2026 Leaf Lightly. All rights reserved.</p>
        <div class="footer-links">
          <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://leaflightly.com'}">Home</a>
          <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://leaflightly.com'}/about">About</a>
          <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://leaflightly.com'}/privacy">Privacy</a>
        </div>
        <p style="margin: 10px 0 0 0; font-size: 11px;">
          <a href="${unsubscribeUrl}" style="color: #8B7355; text-decoration: none;">Unsubscribe from newsletters</a>
        </p>
        <p style="margin: 5px 0 0 0; font-size: 11px; color: #999;">Sent to: ${props.recipientEmail}</p>
      </div>
    </div>
  </body>
</html>
  `.trim();
}
