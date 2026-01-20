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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={roboto.className}>
        <main className="min-h-screen bg-white text-gray-900">{children}</main>
      </body>
    </html>
  )
} 