# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`employee-list` — учебный проект из курса по React (репозиторий `react-course-projects`, где каждая папка — отдельное самостоятельное Vite-приложение со своим `package.json` и `node_modules`). Тема: список сотрудников с добавлением, удалением, фильтрацией по отделу и сортировкой по имени.

Весь UI и данные — на русском языке; сохраняй этот язык в новых строках интерфейса.

## Commands

```bash
npm install
npm run dev      # dev-сервер Vite
npm run build    # сборка в dist/
npm run lint     # eslint .
npm run preview  # предпросмотр собранной версии
```

Тестов в проекте нет — тестового раннера и конфигурации не настроено.

## Stack notes

- React 18 + Vite 5 + Sass. Соседние проекты в репозитории уже на React 19 / Vite 8 — версии здесь намеренно отличаются, не «подтягивай» их без запроса.
- Только JSX, без TypeScript. `uuid` (v4) — единственная рантайм-зависимость помимо React.
- ESLint 9 flat config ([eslint.config.js](eslint.config.js)) с `react`, `react-hooks`, `react-refresh`. `react/prop-types` не отключён глобально — вместо этого каждый компонент начинается с `/* eslint-disable react/prop-types */`; следуй тому же приёму в новых компонентах.

## Architecture

**Состояние живёт в [src/App.jsx](src/App.jsx)** и передаётся вниз через props (без Context/редьюсеров — проект учебный и маленький). Хранится только то, что нельзя вычислить:

- `employees` — массив `{ id, name, department, position }`, инициализируется из [src/data/employees.js](src/data/employees.js).
- `filteredDepartment` — выбранный отдел; `sortOrder` — `null | 'asc' | 'desc'`.

**Производные данные считаются при рендере, а не хранятся в состоянии.** Отфильтрованный и отсортированный список (`visibleEmployees`) выводится из `employees` + `filteredDepartment` + `sortOrder` на каждом рендере. Это ключевое правило проекта: не заводи state для того, что выводится из уже имеющегося state.

Остальные договорённости:

- **Список отделов — константы модуля**, не состояние и не значения внутри компонента: `DEPARTMENTS` (реальные отделы) и отдельно `ALL_DEPARTMENTS` («Все отделы») — значение фильтра, а не отдел, поэтому в форму добавления оно не попадает. `FormAdd` и `SelectDepartment` импортируют их напрямую, без прокидывания через props.
- **Вниз передаются колбэки, а не сеттеры**: `onAddEmployee`, `onRemoveEmployee`, `onToggleSort`, `onChange`. Дочерние компоненты не знают, как устроено хранилище родителя.
- **Состояние формы принадлежит форме.** `FormAdd` держит свои поля в одном объекте `form` и обновляет их одним `handleChange` по `e.target.name`; наружу отдаёт готовый объект сотрудника. `id` присваивает `App` при добавлении.
- **Обновления состояния — через функциональную форму** `setEmployees(prev => …)`.
- Ошибка валидации формы — состояние `error` и разметка с `role="alert"`, не `alert()`.
- `EmployeeList` при пустом списке делает ранний возврат с текстом из пропа `emptyMessage` (`App` решает, что это — пустой список или пустая выборка фильтра).
- `sortOrder` циклится по клику: исходный порядок → А→Я → Я→А → исходный порядок; направление отражается классом `sort-btn--asc|desc|none`.
- `react/prop-types` отключён один раз в [eslint.config.js](eslint.config.js) — не добавляй построчные `eslint-disable` в компоненты.

## Styles

- Один компонент = папка `src/components/<kebab-case>/` с `ComponentName.jsx` (PascalCase, default export) и, если стили нужны, `component-name.scss`, импортируемым прямо в JSX-файле (у `EmployeeItem` своего scss нет — он оформляется классом `.table-row` из `employee-list.scss`).
- Глобальный reset, контейнер `.app`, общие стили `button` и переменная `--tr` — в [src/app.scss](src/app.scss), импортируемом в `App.jsx`. Класс `.app` висит на `#root` в [index.html](index.html), поэтому вложенные селекторы `.app button { … }` действуют на всё приложение — учитывай это при добавлении кнопок.
- Адаптив — через `@media (max-width: 768px)` и `(max-width: 550px)` в scss компонентов.
