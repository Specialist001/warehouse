<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;

Route::as('setLang.')->group(function () {
    Route::get('/setLang/{locale}', function ($locale) {
        Session::put('locale', $locale);

        return back();
    })->name('set');
});
