#!/bin/bash

# Переходим в директорию с проектом
cd /var/www/warehouse

# Скачиваем последние изменения из репозитория
git pull origin main

# Если используется Docker
docker-compose down
docker-compose up -d --build

# Или если используется другой способ развертывания
php artisan migrate --force

# Прочие команды для деплоя, например очистка кеша или запуск серверов
