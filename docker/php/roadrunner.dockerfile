FROM ghcr.io/roadrunner-server/roadrunner:2024.3.5 AS roadrunner

FROM php:8.3-cli

RUN docker-php-ext-install pcntl sockets pdo pdo_mysql

RUN apt-get update && apt-get install git -y bash

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

WORKDIR /var/www

COPY . .

RUN chown -R www-data:www-data .
RUN php artisan optimize:clear
RUN php artisan optimize

ENTRYPOINT ["sh", "roadrunner-entrypoint.sh"]