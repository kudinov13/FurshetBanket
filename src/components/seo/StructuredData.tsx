import { prisma } from '@/lib/db'

const BASE_URL = 'https://furshetoria.ru'

export async function StructuredData() {
  const [categories, products] = await Promise.all([
    prisma.category.findMany({
      select: { id: true, name: true, description: true, image: true },
      orderBy: { name: 'asc' },
    }),
    prisma.product.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        image: true,
        categoryId: true,
      },
      orderBy: { createdAt: 'desc' },
    }),
  ])

  // LocalBusiness schema for local SEO
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'FoodEstablishment',
    '@id': `${BASE_URL}/#business`,
    name: 'Фуршет-банкет',
    description:
      'Фуршеты и банкеты с доставкой в Бийске, Заречье, Малоугренево. Горячее, десерты, салаты, гастробоксы, детское меню. Бесплатная доставка от 3000₽.',
    url: BASE_URL,
    telephone: ['+79619777115', '+79059800611'],
    email: 'nyusha-korobova@mail.ru',
    image: `${BASE_URL}/og-image.jpg`,
    servesCuisine: ['Фуршет', 'Банкет', 'Кейтеринг', 'Русская'],
    priceRange: '₽₽',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'с. Малоугренево',
      addressRegion: 'Алтайский край',
      addressCountry: 'RU',
    },
    areaServed: [
      { '@type': 'City', name: 'Бийск' },
      { '@type': 'City', name: 'Заречье' },
      { '@type': 'City', name: 'с. Малоугренево' },
      { '@type': 'City', name: 'п. Боровой' },
      { '@type': 'City', name: 'с. Первомайское' },
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
    makesOffer: products.map((p) => ({
      '@type': 'Offer',
      priceCurrency: 'RUB',
      price: p.price,
      itemOffered: {
        '@type': 'MenuItem',
        name: p.name,
        description: p.description,
        image: p.image ? `${BASE_URL}${p.image}` : undefined,
      },
    })),
    founder: {
      '@type': 'Person',
      name: 'Коробова Анна Николаевна',
    },
  }

  // Menu schema for the catering menu
  const menuSchema = {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': `${BASE_URL}/#menu`,
    name: 'Меню фуршета-банкета',
    hasMenuSection: categories.map((cat) => ({
      '@type': 'MenuSection',
      name: cat.name,
      description: cat.description,
      image: cat.image ? `${BASE_URL}${cat.image}` : undefined,
      hasMenuItem: products
        .filter((p) => p.categoryId === cat.id)
        .map((p) => ({
          '@type': 'MenuItem',
          name: p.name,
          description: p.description,
          image: p.image ? `${BASE_URL}${p.image}` : undefined,
          offers: {
            '@type': 'Offer',
            price: p.price,
            priceCurrency: 'RUB',
          },
        })),
    })),
  }

  // WebSite schema for sitelinks search box
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: 'Фуршет-банкет',
    description:
      'Фуршеты и банкеты с доставкой в Бийске и Малоугренево',
    inLanguage: 'ru',
    publisher: {
      '@type': 'FoodEstablishment',
      '@id': `${BASE_URL}/#business`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(menuSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  )
}
