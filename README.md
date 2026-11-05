# saidburhon.khojaev.932420.lab5# 
Лабораторная работа №5. DOM и взаимодействие с элементами страницы

**Вариант 12.** Тема: «Техногик и обзорщик гаджетов» (список гаджетов с характеристиками)

## 👤 Автор

- **Студент:** Ходжаев С. Д.
- **Группа:** 932420
- **Дисциплина:** Веб-разработка

## 📌 Цель работы

Научиться манипулировать DOM-деревом, находить элементы, изменять содержимое и стили, а также сохранять состояние страницы между перезагрузками через `localStorage`.

## ✅ Реализованные требования

### 1. Поиск элементов

| Метод | Где используется в `dom.js` |
|-------|-----------------------------|
| `getElementById` | `document.getElementById('gadget-list')` |
| `querySelector` | `document.querySelector('#theme-toggle')`, `#add-gadget`, `#delete-last`, `#toggle-list` |
| `querySelectorAll` | `document.querySelectorAll('.nav a')` |

### 2. Манипуляции с DOM

- **Изменение текста**: `title.textContent = gadget.name`
- **Изменение атрибутов**: `card.setAttribute('data-id', gadget.id)`
- **Изменение классов**: `classList.add('gadget-item')`, `classList.toggle('hidden')`, `classList.add('light-theme')`
- **Добавление элементов**: `document.createElement`, `appendChild`
- **Удаление элементов**: `gadgetList.innerHTML = ''`, `gadgets.pop()`, `gadgets.filter(...)`

### 3. Переключение темы

- Кнопка `#theme-toggle` переключает класс `light-theme` на `<body>`.
- Стили светлой темы описаны в `style.css` через переопределение CSS-переменных.
- Тема сохраняется в `localStorage` под ключом `theme`.

### 4. Скрытие/показ блоков

- Кнопка `#toggle-list` скрывает/показывает контейнер с гаджетами.
- Используется класс `.hidden` (`display: none !important;`) и метод `classList.toggle('hidden')`.

### 5. Обработка ошибок

- Проверка наличия контейнера перед работой:
  ```javascript
  if (!gadgetList) {
      console.error('Ошибка: элемент #gadget-list не найден на странице.');
      return;
  }
  ```

### 6. LocalStorage

- **Сохранение**:
  - `localStorage.setItem('gadgets_data', JSON.stringify(gadgets))` — при добавлении, удалении и удалении последнего.
  - `localStorage.setItem('theme', isLightTheme ? 'light' : 'dark')` — при переключении темы.
- **Восстановление**:
  - `JSON.parse(localStorage.getItem('gadgets_data'))` — при загрузке страницы.
  - `localStorage.getItem('theme') === 'light'` — для применения сохранённой темы.

## 📊 Логика Варианта 12

### Контент

Карточки гаджетов содержат:
- Название гаджета.
- Список характеристик (`<ul><li>...</li></ul>`).
- Кнопку «Удалить» для конкретной карточки.

### Кнопки управления

| Кнопка | ID | Действие |
|--------|-----|----------|
| Сменить тему | `theme-toggle` | Переключает светлую/тёмную тему, сохраняет в `localStorage` |
| Добавить гаджет | `add-gadget` | Запрашивает название и характеристики через `prompt`, создаёт карточку |
| Удалить последний | `delete-last` | Удаляет последнюю добавленную карточку |
| Скрыть/Показать список | `toggle-list` | Переключает класс `.hidden` у контейнера с карточками |
