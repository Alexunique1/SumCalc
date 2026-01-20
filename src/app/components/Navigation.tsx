'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { title: 'Главная', href: '/' },
    { title: 'Возможности', href: '/features' },
    { title: 'Тарифы', href: '/pricing' },
    { title: 'Блог', href: '/blog' },
    { title: 'Партнерская программа', href: '/partners' },
    { title: 'О компании', href: '/about' },
    { title: 'Контакты', href: '/contacts' },
  ];

  return (
    <nav className="bg-white shadow-lg fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="relative w-48 sm:w-80 h-16">
                <Image
                  src="/images/Logo.png"
                  alt="HostAssist"
                  fill
                  sizes="(max-width: 640px) 192px, 320px"
                  priority
                  className="object-contain"
                />
              </Link>
            </div>
            <div className="hidden md:ml-1 md:flex md:space-x-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center px-1 pt-1 text-sm md:text-base font-medium text-gray-900 hover:text-gray-500 whitespace-nowrap"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-4 md:space-x-80">
            {/* Кнопка CTA для звонка */}
            <a
              href="tel:+79809008300"
              className="hidden md:inline-flex items-center px-3 py-2 border border-transparent text-sm md:text-base font-medium rounded-md text-white bg-brand hover:bg-brand-light transition-colors whitespace-nowrap"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="hidden sm:inline">+7 (980) 900-83-00</span>
              <span className="sm:hidden">Позвонить</span>
            </a>
            
            {/* Мобильное меню */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span className="sr-only">Открыть главное меню</span>
                {!isOpen ? (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Мобильное меню */}
      {isOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            ))}
            {/* Кнопка CTA для звонка в мобильном меню */}
            <a
              href="tel:+79809008300"
              className="block pl-3 pr-4 py-2 text-base font-medium text-white bg-brand hover:bg-brand-light whitespace-nowrap"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +7 (980) 900-83-00
              </div>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation; 