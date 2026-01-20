import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({ 
  weight: ['300', '400', '500', '700'],
  subsets: ["latin", "cyrillic"],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "SumCalc — калькулятор сумм к оплате",
  description: "Калькулятор расчета сумм к оплате (USD/RUB, USDT/RUB) с комиссией",
  icons: {
    icon: [
      { url: '/images/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/images/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/images/favicon/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        rel: 'mask-icon',
        url: '/images/favicon/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
  manifest: '/images/favicon/site.webmanifest',
  themeColor: '#098E57',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" type="image/x-icon" href="/images/favicon/favicon.ico" />
      </head>
      <body className={roboto.className}>
        <main className="min-h-screen bg-white text-gray-900">{children}</main>
      </body>
    </html>
  )
} 