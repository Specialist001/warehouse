#!/bin/sh
if [ ! -f ./vendor/bin/rr ]; then
    echo "Installing Laravel Octane dependencies..."
    composer require spiral/roadrunner-cli:^2.6 spiral/roadrunner-http:^3.3
    php artisan octane:install --server=roadrunner
fi

php artisan octane:install --server=roadrunner
php artisan octane:start --server=roadrunner --port=9807 --host=0.0.0.0