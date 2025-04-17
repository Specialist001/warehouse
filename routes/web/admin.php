<?php

use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\Warehouse;
use App\Http\Controllers\Admin\WarehouseProduct;
use App\Http\Controllers\Admin\Transaction;

Route::middleware('setLang')->as('admin.')->group(function () {
    Route::middleware('guest')->as('auth.')->group(function () {
        Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');

        Route::post('login', [AuthenticatedSessionController::class, 'store'])->name('login.store');
    });

    Route::get('/', function () {
        if (!auth()->check()) {
            return redirect()->route('admin.auth.login');
        }

        // return dashboard if authenticated
        return redirect()->route('admin.dashboard');
    });

    Route::middleware(['web', 'adminAuth', 'verified'])->group(function ($request) {
        // return auth user data
        Route::get('/dashboard', function () {
            return Inertia::render('Dashboard', [
                'users'       => (int)User::count(),
                'roles'       => (int)Role::count(),
                'permissions' => (int)Permission::count(),
            ]);
        })->name('dashboard');

        Route::prefix('profile')->as('profile.')->group(function () {
            Route::get('/', [ProfileController::class, 'edit'])->name('edit');
            Route::patch('/', [ProfileController::class, 'update'])->name('update');
            Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');
        });

        Route::resource('/user', UserController::class)->except('create', 'show', 'edit');
        Route::post('/user/destroy-bulk', [UserController::class, 'destroyBulk'])->name('user.destroy-bulk');

        Route::resource('/role', RoleController::class)->except('create', 'show', 'edit');
        Route::post('/role/destroy-bulk', [RoleController::class, 'destroyBulk'])->name('role.destroy-bulk');

        Route::resource('/permission', PermissionController::class)->except('create', 'show', 'edit');
        Route::post('/permission/destroy-bulk', [PermissionController::class, 'destroyBulk'])->name('permission.destroy-bulk');

        Route::prefix('warehouse')->as('warehouse.')->group(function () {
            Route::get('/', Warehouse\IndexController::class)->name('index');
            Route::get('/show/{warehouse}', Warehouse\ShowController::class)->name('show');
            Route::post('/store', Warehouse\StoreController::class)->name('store');
            Route::get('/edit/{warehouse}', Warehouse\EditController::class)->name('edit');
            Route::put('/update/{warehouse}', Warehouse\UpdateController::class)->name('update');
            Route::delete('/{warehouse}', Warehouse\DeleteController::class)->name('delete');
        });

        Route::prefix('category')->as('category.')->group(function () {
            Route::get('/', App\Http\Controllers\Admin\Category\IndexController::class)->name('index');
            Route::get('/show/{category}', App\Http\Controllers\Admin\Category\ShowController::class)->name('show');
            Route::post('/', App\Http\Controllers\Admin\Category\StoreController::class)->name('store');
            Route::get('/edit/{category}', App\Http\Controllers\Admin\Category\EditController::class)->name('edit');
            Route::put('/update/{category}', App\Http\Controllers\Admin\Category\UpdateController::class)->name('update');
            Route::delete('/{category}', App\Http\Controllers\Admin\Category\DeleteController::class)->name('delete');
        });

        Route::prefix('product')->as('product.')->group(function () {
            Route::get('/', App\Http\Controllers\Admin\Product\IndexController::class)->name('index');
            Route::get('/show/{product}', App\Http\Controllers\Admin\Product\ShowController::class)->name('show');
            Route::post('/', App\Http\Controllers\Admin\Product\StoreController::class)->name('store');
            Route::get('/edit/{product}', App\Http\Controllers\Admin\Product\EditController::class)->name('edit');
            Route::put('/update/{product}', App\Http\Controllers\Admin\Product\UpdateController::class)->name('update');
            Route::delete('/{product}', App\Http\Controllers\Admin\Product\DeleteController::class)->name('delete');
            Route::get('/search-info-by-ean/{barcode}', App\Http\Controllers\Admin\Product\SearchInfoByEanController::class)->name('searchInfoByEan');
            Route::post('/recovery/{product}', App\Http\Controllers\Admin\Product\RecoveryController::class)->name('recovery');
            Route::get('/search', App\Http\Controllers\Admin\Product\SearchController::class)->name('search');
        });

        Route::prefix('warehouse-product')->as('warehouse_product.')->group(function () {
            Route::get('/', WarehouseProduct\IndexController::class)->name('index');
            Route::get('/show/{warehouse_product}', WarehouseProduct\ShowController::class)->name('show');
            Route::post('/store', WarehouseProduct\StoreController::class)->name('store');
            Route::get('/edit/{warehouse_product}', WarehouseProduct\EditController::class)->name('edit');
            Route::put('/update/{warehouse_product}', WarehouseProduct\UpdateController::class)->name('update');
            Route::delete('/{warehouse_product}', WarehouseProduct\DeleteController::class)->name('destroy');
        });

        Route::prefix('transaction')->as('transaction.')->group(function () {
            Route::get('/', Transaction\IndexController::class)->name('index');
            Route::get('/export', Transaction\ExportController::class)->name('export');
            Route::get('/show/{transaction}', Transaction\ShowController::class)->name('show');
            Route::get('/edit/{transaction}', Transaction\EditController::class)->name('edit');
            Route::put('/update/{transaction}', Transaction\UpdateController::class)->name('update');
            Route::delete('/{transaction}', Transaction\DeleteController::class)->name('destroy');
        });

        Route::group(['prefix' => 'laravel-filemanager', 'middleware' => ['web', 'adminAuth']], function () {
            \UniSharp\LaravelFilemanager\Lfm::routes();
        });
    });

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout')->middleware('adminAuth');

});
