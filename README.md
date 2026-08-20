# Персональный тренер — лендинг

Одностраничный лендинг персонального тренера. Вёрстка построена по Figma-макету
[Personal Gym Trainer Website Design](https://www.figma.com/design/893iupuJr7hDgCUWuOGeEx/).

## Стек

- **React 19** + **Vite** — сборка и dev-сервер
- **CSS Modules** — изоляция стилей на уровне компонентов
- **@fontsource/oxanium**, **@fontsource/outfit** — шрифты, self-hosted (без внешнего запроса к Google Fonts)
- **oxlint** — линтер

## Структура проекта

```
src/
├── components/
│   ├── layout/       # Header, Footer — сквозные элементы
│   ├── sections/      # Секции лендинга (Hero, About, Programs, FAQ, ...)
│   └── ui/            # Переиспользуемые примитивы (Button, Container, SectionTitle)
├── data/               # Контент секций вынесен из компонентов (навигация, тарифы, отзывы, FAQ)
├── hooks/              # Кастомные хуки (например useCarousel)
├── styles/
│   ├── tokens.css      # Дизайн-токены: цвета, типографика, отступы — взяты из Figma
│   └── global.css      # Reset и базовые стили
├── App.jsx
└── main.jsx
```

**Принцип:** каждая секция — независимый компонент со своим CSS-модулем и (если есть list-контент)
файлом данных в `src/data`. Правки текста делаются в `data/*.js`, не в JSX.

## Дизайн-токены (из Figma)

| Токен | Значение |
|---|---|
| Фон страницы | `#1A1A1A` |
| Поверхности (карточки, навбар) | `#1F1F1F` |
| Акцент (кнопки, цены) | `#FF2332` |
| Текст основной / вторичный | `#FFFFFF` / `#909090` |
| Шрифт заголовков | Oxanium (700/800) |
| Шрифт текста | Outfit (400/500/600) |
| Радиус кнопок | 16px |

Все значения — в `src/styles/tokens.css`, доступны как CSS custom properties (`var(--color-accent)` и т.д.).

## Изображения — важно!

В `public/images/` сейчас лежат **сгенерированные плейсхолдеры** (SVG с подписями и размерами) —
их нужно заменить на реальные экспорты из Figma:

1. В Figma выделите нужный слой/изображение
2. Внизу правой панели — секция **Export** → выберите формат (PNG/JPG) → **Export**
3. Замените файл в `public/images/` с тем же именем (`hero-photo`, `about-photo`, `cta-photo`,
   `testimonial-1/2/3`), либо обновите путь в соответствующем компоненте (`src/components/sections/*`)

## Разработка

```bash
npm install       # установка зависимостей
npm run dev       # dev-сервер (http://localhost:5173)
npm run build     # прод-сборка в dist/
npm run preview   # локальный просмотр прод-сборки
npm run lint      # проверка линтером
```
