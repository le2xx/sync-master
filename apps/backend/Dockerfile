# Указываем базовый образ для Angular приложения
FROM node:18 as build

# Создаем рабочую директорию в контейнере
WORKDIR /app

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы приложения
COPY . .

# Собираем Angular приложение
RUN npm run build-back

# Шаг 2: Создаем образ для продакшн
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем только production зависимости из первого этапа
COPY --from=build /app/package*.json ./
RUN npm install --only=production

# Копируем собранные файлы из стадии сборки
COPY --from=build /app/dist/apps/backend ./dist

# Устанавливаем переменную окружения для продакшн
ENV NODE_ENV=production

# Экспонируем порт 3000
EXPOSE 3000

# Запускаем приложение
CMD ["node", "dist/main"]
