#!/bin/bash

# Переходим в директорию с проектом
cd /var/www/warehouse

git config --global --add safe.directory /var/www/warehouse

# Скачиваем последние изменения из репозитория
git pull origin main

# Если используется Docker
docker compose down
docker compose up -d --build

# Ждем, пока контейнер поднимется (по желанию)
sleep 5

docker compose exec laravel_octane_roadrunner php artisan migrate --force

# Прочие команды для деплоя, например очистка кеша или запуск серверов
