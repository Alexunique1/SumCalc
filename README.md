# SumCalc

Минималистичный калькулятор сумм к оплате (USD/RUB и USDT/RUB) с комиссией.

## Настройка

### Переменные окружения

Создайте файл `.env.local` в корне проекта и добавьте:

- **OPENEXCHANGERATES_APP_ID**: App ID для OpenExchangeRates (используем курс USD→RUB).
- **NEXT_PUBLIC_USDT_TRC20_WALLET**: адрес кошелька для отображения на странице (пока можно оставить заглушку).

Пример лежит в `docs/env.example`.

## Запуск

```bash
npm install
npm run dev
```


Веб-сайт для системы самозаселения гостей в отели.

## Технологии

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion

## Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/your-username/hostassist-website.git
cd hostassist-website
```

2. Установите зависимости:
```bash
npm install
```

3. Запустите проект в режиме разработки:
```bash
npm run dev
```

4. Откройте [http://localhost:3000](http://localhost:3000) в вашем браузере.

## Сборка для продакшена

```bash
npm run build
npm start
```

## Лицензия

MIT 