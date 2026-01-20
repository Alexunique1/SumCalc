'use client'

import { motion } from "framer-motion"
import Image from "next/image"

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-start justify-between p-4 sm:p-8 md:p-12 lg:p-24 bg-background">
      {/* Фоновое изображение */}
      <div className="absolute inset-0 z-0">
        <div className="relative right-0 top-0 h-full w-full md:w-1/2">
          <div className="absolute inset-0">
            <Image
              src="/images/Updated_background.jpg"
              alt="Background"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="object-cover"
              style={{ zIndex: -1 }}
            />
          </div>
        </div>
      </div>
      
      {/* Контент */}
      <div className="relative z-10 w-full max-w-2xl items-start justify-between font-mono text-sm mt-16 sm:mt-24 md:mt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-extrabold mb-6 sm:mb-8 md:mb-12 text-brand">
            HostAssist
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">
            Современное решение для автоматизации процесса заселения гостей в отели
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-brand hover:bg-brand-light text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base"
          >
            Начать использовать
          </motion.button>
        </motion.div>
      </div>
    </main>
  )
} 