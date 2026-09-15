import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Фуршет-банкет — Фуршеты и банкеты с доставкой в Бийске',
    short_name: 'Фуршет-банкет',
    description: 'Закажите фуршет и банкет с доставкой в Бийске и Малоугренево. Бесплатная доставка от 3000₽.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1a1a1a',
    lang: 'ru',
    categories: ['food', 'shopping'],
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
