// app/JsonLd.tsx (server component)
export default function JsonLd() {
    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'RealEstateAgent',
        name: 'Luxury Real Estate',
        url: 'https://yourdomain.com',
        logo: 'https://yourdomain.com/logo.png',
        sameAs: [
            'https://www.facebook.com/yourpage',
            'https://www.instagram.com/yourpage',
            'https://www.linkedin.com/company/yourpage',
        ],
        address: {
            '@type': 'PostalAddress',
            streetAddress: '123 Luxury Ave',
            addressLocality: 'Beverly Hills',
            addressRegion: 'CA',
            postalCode: '90210',
            addressCountry: 'US',
        },
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+1-800-555-1234',
            contactType: 'customer service',
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
    );
}