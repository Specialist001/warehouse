<?php

namespace App\Http\Middleware;

class SetLangMiddleware
{
    public function handle($request, $next)
    {
        if (session()->has('locale')) {
            app()->setLocale(session('locale'));
        }
        return $next($request);
    }
}
