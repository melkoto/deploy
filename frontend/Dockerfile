# Используем официальный образ Node.js версии 20 для сборки приложения
FROM node:14 as build

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json в рабочую директорию
COPY package*.json ./

# Устанавливаем зависимости приложения
RUN npm install

# Копируем все файлы в рабочую директорию контейнера
COPY . .

# Собираем приложение для продакшена
RUN npm run build

# Добавляем диагностику для проверки содержимого директории после сборки
RUN echo "Содержимое директории после сборки:" && ls -la /app

# Используем nginx для сервировки статических файлов
FROM nginx:alpine

# Копируем собранные файлы из предыдущего контейнера в директорию nginx
COPY --from=build /app/build /usr/share/nginx/html

# Копируем файл конфигурации nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Указываем, что nginx будет использовать порт 80
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
