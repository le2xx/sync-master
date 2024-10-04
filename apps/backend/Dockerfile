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

# Используем nginx для статической отдачи фронтенда
FROM nginx:alpine

# Копируем собранное приложение в nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Экспонируем порт для сервера
EXPOSE 80
