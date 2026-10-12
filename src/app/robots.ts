import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
        disallow: ['/api/', '/admin/', '/account/', '/checkout/'],
      },
      {
        userAgent: 'Googlebot',
        allow: ['/'],
        disallow: ['/api/', '/admin/', '/account/', '/checkout/'],
      },
    ],
    sitemap: 'https://leaflightly.com/sitemap.xml',
    host: 'https://leaflightly.com',
  };
}
