<?php

namespace App\Providers;

use App\Models\User;
use App\Observers\UserObserver;
use Domains\Product\Contracts\ProductInterface;
use Domains\Product\Models\Product;
use Domains\Product\Observers\ProductObserver;
use Domains\Product\Repositories\EloquentProductRepository;
use Domains\Transaction\Contracts\TransactionInterface;
use Domains\Transaction\Repositories\EloquentTransactionRepository;
use Domains\Warehouse\Contracts\WarehouseInterface;
use Domains\Warehouse\Repositories\EloquentWarehouseRepository;
use Domains\WarehouseProduct\Contracts\WarehouseProductInterface;
use Domains\WarehouseProduct\Repositories\EloquentWarehouseProductRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use UniSharp\LaravelFilemanager\Events\ImageWasUploaded;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->app->bind(WarehouseProductInterface::class, EloquentWarehouseProductRepository::class);
        $this->app->bind(WarehouseInterface::class, EloquentWarehouseRepository::class);
        $this->app->bind(ProductInterface::class, EloquentProductRepository::class);
        $this->app->bind(TransactionInterface::class, EloquentTransactionRepository::class);

        Product::observe(ProductObserver::class);
        User::observe(UserObserver::class);

        Inertia::share([
            'locale' => function () {
                return app()->getLocale();
            },
        ]);

        event(new ImageWasUploaded(function ($filePath) {
            $userFolder = 'user_' . Auth::id();
            return "{$userFolder}/" . basename($filePath);
        }));

        Event::listen(function (\SocialiteProviders\Manager\SocialiteWasCalled $event) {
            $event->extendSocialite('telegram', \SocialiteProviders\Telegram\Provider::class);
        });

//        URL::forceScheme(env('APP_SCHEME', 'https'));

        Http::globalOptions([
            'timeout' => 60,
        ]);
    }
}
