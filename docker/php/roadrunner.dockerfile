FROM ghcr.io/roadrunner-server/roadrunner:2024.3.5 AS roadrunner

FROM php:8.3-cli

RUN docker-php-ext-install pcntl sockets pdo pdo_mysql

RUN apt-get update && apt-get install -y \
    git \
    bash \
    unzip \
    libjpeg-dev \
    libpng-dev \
    libwebp-dev \
    libfreetype6-dev \
    libzip-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install -j$(nproc) \
        pcntl \
        sockets \
        pdo \
        pdo_mysql \
        gd \
        exif \
        zip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

WORKDIR /var/www

COPY . .

RUN composer install --no-interaction --prefer-dist --optimize-autoloader

RUN chown -R www-data:www-data .
RUN php artisan optimize:clear
RUN php artisan optimize

ENTRYPOINT ["sh", "roadrunner-entrypoint.sh"]
