# OpenTask

[![Deploy](https://github.com/Ameverise/OpenTask/actions/workflows/deploy.yml/badge.svg)](https://github.com/Ameverise/OpenTask/actions/workflows/deploy.yml)
[![Maintainability](https://qlty.sh/badges/4a9cd119-f973-40a5-b9f7-7dd794f48886/maintainability.svg)](https://qlty.sh/gh/Ameverise/projects/OpenTask)

OpenTask — учебное веб-приложение для управления задачами. Проект позволяет создавать задачи, редактировать их, отслеживать выполнение, работать с подзадачами и сохранять данные после перезагрузки страницы. Интерфейс поддерживает фильтрацию, поиск, сортировку, темную тему, экспорт задач и быстрый откат удаления через toast-уведомление.

## Деплой

Сайт: [https://ameverise.github.io/OpenTask/](https://ameverise.github.io/OpenTask/)

Деплой выполняется через GitHub Pages после пуша в ветку `master`.

## Стек

- Frontend: React, JavaScript, CSS
- Backend: не используется
- DB: localStorage в браузере
- Build/deploy: Vite, GitHub Actions, GitHub Pages

## Возможности

- добавление задач с названием, описанием, категорией, приоритетом и сроком;
- создание подзадач и отображение прогресса выполнения;
- просмотр полного списка задач;
- редактирование существующих задач;
- удаление задач с возможностью отмены последнего удаления;
- отметка задачи как выполненной;
- удаление всех выполненных задач после подтверждения;
- фильтрация по статусу, категории и приоритету;
- сортировка по сроку, приоритету, дате создания и названию;
- поиск по названию задачи;
- статистика по общему количеству, активным и выполненным задачам;
- подсветка просроченных задач;
- переключение светлой и темной темы;
- экспорт задач в JSON;
- сохранение данных в localStorage.

## Запуск локально

Установите зависимости:

```bash
npm install
```

Запустите проект в режиме разработки:

```bash
npm run dev
```

Соберите production-версию:

```bash
npm run build
```

Проверьте собранную версию:

```bash
npm run preview
```

## Qlty

Проект подключен к Qlty. Бейдж Maintainability показывает текущую оценку качества кода по результатам анализа Qlty.

## Структура

```text
src/
  components/
    FilterBar.jsx
    StatsPanel.jsx
    TaskForm.jsx
    TaskItem.jsx
    TaskList.jsx
    Toast.jsx
  utils/
    storage.js
    tasks.js
  App.jsx
  constants.js
  main.jsx
  styles.css
```

## Лицензия

Проект доступен для учебного и личного использования по лицензии MIT.
