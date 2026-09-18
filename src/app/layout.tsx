import type { Metadata, Viewport } from "next";
import { Playfair_Display, Jost } from "next/font/google";
import "./globals.css";

const bodoniModa = Playfair_Display({
  variable: "--font-bodoni",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a1a1a",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://furshetoria.ru"),
  title: {
    default: "Фуршет-банкет — Кейтеринг и фуршеты с доставкой в Бийске",
    template: "%s | Фуршет-банкет",
  },
  description:
    "Фуршеты и банкеты с доставкой в Бийске, Заречье, Малоугренево. Горячее, десерты, салаты, гастробоксы, детское меню. Бесплатная доставка от 3000₽. Без выходных.",
  keywords: [
    "фуршет Бийск",
    "банкет Бийск",
    "кейтеринг Бийск",
    "доставка фуршета Бийск",
    "выездной банкет Бийск",
    "фуршетное меню Бийск",
    "гастробоксы Бийск",
    "кейтеринг Малоугренево",
    "фуршет на дом Бийск",
    "праздничное меню Бийск",
    "заказать фуршет Бийск",
    "доставка еды Бийск",
    "корпоративный фуршет Бийск",
    "свадебный банкет Бийск",
    "детский фуршет Бийск",
    "кофе-брейк Бийск",
    "выездное обслуживание Бийск",
    "кейтеринг под ключ Бийск",
    "фуршет Заречье",
    "фуршет Боровой",
    "фуршет Первомайское",
    "банкет с доставкой Бийск",
    "фуршет Алтайский край",
    "заказать кейтеринг Бийск",
    "организация фуршета Бийск",
  ],
  authors: [{ name: "Коробова Анна Николаевна" }],
  creator: "Коробова Анна Николаевна",
  publisher: "Фуршет-банкет",
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "U4BUiIjG5rIdlDBZwgQOXwd1hiZjkLGg3VoQwcR7Yzo",
    yandex: "aa909345b6394142",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://furshetoria.ru",
    siteName: "Фуршет-банкет",
    title: "Фуршет-банкет — Кейтеринг и фуршеты с доставкой в Бийске",
    description:
      "Фуршеты и банкеты с доставкой в Бийске. Горячее, десерты, салаты, гастробоксы, детское меню. Бесплатная доставка от 3000₽.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Фуршет-банкет — праздничные фуршеты с доставкой в Бийске",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Фуршет-банкет — Фуршеты и банкеты с доставкой в Бийске",
    description:
      "Закажите фуршет и банкет с доставкой в Бийске. Бесплатная доставка от 3000₽. Без выходных.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "food",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${bodoniModa.variable} ${jost.variable} antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
